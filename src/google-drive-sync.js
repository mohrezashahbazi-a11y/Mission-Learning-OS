// Mission Learning OS — Google Drive Sync v1.0
// Cloud data layer. Local-first, revisioned, backup-safe. Requires a Google OAuth Web Client ID.
(() => {
  const NS='missionOSCloud';
  const DATA_KEY='missionOSCloudData';
  const META_KEY='missionOSCloudMeta';
  const FOLDER='Mission Learning OS';
  const FILE='mission-os-data.json';
  const BACKUP_PREFIX='mission-os-backup-';
  const SCOPES='https://www.googleapis.com/auth/drive.file';
  const DISCOVERY='https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';
  const get=(k,d)=>{try{return JSON.parse(localStorage.getItem(k)||'null')??d}catch{return d}};
  const put=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
  const now=()=>new Date().toISOString();
  const meta=()=>get(META_KEY,{revision:0,lastSync:null,lastBackup:null,cloudFileId:null,folderId:null,connected:false});
  const setMeta=(patch)=>put(META_KEY,{...meta(),...patch});

  function clientId(){return window.MISSION_GOOGLE_CLIENT_ID||localStorage.getItem('missionOSGoogleClientId')||''}
  function configured(){return !!clientId()}
  function localSnapshot(){
    const data={};
    for(let i=0;i<localStorage.length;i++){
      const k=localStorage.key(i); if(!k)continue;
      if(k.startsWith('missionOS')||k.startsWith('missionOS')) data[k]=get(k,null);
    }
    const m=meta();
    return {schemaVersion:1,revision:m.revision+1,updatedAt:now(),data};
  }
  function saveLocalRevision(){const snap=localSnapshot();put(DATA_KEY,snap);setMeta({revision:snap.revision});return snap}

  let tokenClient=null, accessToken=null;
  function loadGIS(){return new Promise((resolve,reject)=>{if(window.google?.accounts?.oauth2)return resolve();const s=document.createElement('script');s.src='https://accounts.google.com/gsi/client';s.onload=()=>resolve();s.onerror=reject;document.head.appendChild(s)})}
  async function connect(){
    if(!configured()) throw new Error('Google OAuth Client ID is not configured.');
    await loadGIS();
    return new Promise((resolve,reject)=>{
      tokenClient=google.accounts.oauth2.initTokenClient({client_id:clientId(),scope:SCOPES,callback:(r)=>{if(r.error)return reject(r);accessToken=r.access_token;setMeta({connected:true});resolve({ok:true})}});
      tokenClient.requestAccessToken({prompt:'consent'});
    });
  }
  function authHeaders(){if(!accessToken)throw new Error('Connect Google Drive first.');return {Authorization:`Bearer ${accessToken}`,'Content-Type':'application/json'}}
  async function api(url,opts={}){const r=await fetch(url,{...opts,headers:{...authHeaders(),...(opts.headers||{})}});if(!r.ok)throw new Error(`${r.status} ${await r.text()}`);return r.status===204?null:r.json()}
  async function findFolder(){const q=`name='${FOLDER.replace(/'/g,"\\'")}' and mimeType='application/vnd.google-apps.folder' and trashed=false`;const r=await api(`https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(q)}&spaces=drive&fields=files(id,name)`);return r.files?.[0]||null}
  async function ensureFolder(){let f=await findFolder();if(f)return f;return api('https://www.googleapis.com/drive/v3/files',{method:'POST',body:JSON.stringify({name:FOLDER,mimeType:'application/vnd.google-apps.folder'})})}
  async function findFile(folderId){const q=`name='${FILE}' and '${folderId}' in parents and trashed=false`;const r=await api(`https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(q)}&spaces=drive&fields=files(id,name,modifiedTime,version)`);return r.files?.[0]||null}
  async function uploadJson(fileId,folderId,snapshot){
    const boundary='mission-os-boundary';
    const body=`--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify({name:FILE,mimeType:'application/json',parents:[folderId]})}\r\n--${boundary}\r\nContent-Type: application/json\r\n\r\n${JSON.stringify(snapshot)}\r\n--${boundary}--`;
    const url=fileId?`https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=multipart&fields=id,name,modifiedTime,version`:'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,modifiedTime,version';
    const headers={Authorization:`Bearer ${accessToken}`,'Content-Type':`multipart/related; boundary=${boundary}`};
    const r=await fetch(url,{method:fileId?'PATCH':'POST',headers,body});if(!r.ok)throw new Error(`${r.status} ${await r.text()}`);return r.json();
  }
  async function backup(){
    const folder=await ensureFolder();const snapshot=saveLocalRevision();const name=`${BACKUP_PREFIX}${snapshot.updatedAt.replace(/[:.]/g,'-')}.json`;
    const boundary='mission-os-backup-boundary';
    const body=`--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify({name,mimeType:'application/json',parents:[folder.id]})}\r\n--${boundary}\r\nContent-Type: application/json\r\n\r\n${JSON.stringify(snapshot)}\r\n--${boundary}--`;
    const r=await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,modifiedTime',{method:'POST',headers:{Authorization:`Bearer ${accessToken}`,'Content-Type':`multipart/related; boundary=${boundary}`},body});
    if(!r.ok)throw new Error(`${r.status} ${await r.text()}`);const out=await r.json();setMeta({lastBackup:now(),folderId:folder.id});return out;
  }
  async function sync(){
    const folder=await ensureFolder();const file=await findFile(folder.id);const local=saveLocalRevision();
    if(!file){const created=await uploadJson(null,folder.id,local);setMeta({cloudFileId:created.id,folderId:folder.id,lastSync:now(),connected:true});return {direction:'upload',revision:local.revision};}
    const r=await api(`https://www.googleapis.com/drive/v3/files/${file.id}?alt=media`);const remote=await r;
    const rr=Number(remote?.revision||0), lr=Number(local.revision||0);
    if(rr>lr){put(DATA_KEY,remote);setMeta({cloudFileId:file.id,folderId:folder.id,lastSync:now(),connected:true,revision:rr});return {direction:'download',revision:rr,conflict:false};}
    const uploaded=await uploadJson(file.id,folder.id,local);setMeta({cloudFileId:uploaded.id,folderId:folder.id,lastSync:now(),connected:true,revision:lr});return {direction:'upload',revision:lr,conflict:false};
  }
  function status(){const m=meta();return {configured,connected:!!m.connected,revision:m.revision,lastSync:m.lastSync,lastBackup:m.lastBackup,cloudFileId:m.cloudFileId}}
  window.missionOSGoogleDrive={version:'1.0',connect,sync,backup,status,saveLocalRevision,configured};
})();
