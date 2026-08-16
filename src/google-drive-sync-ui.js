// Mission Learning OS — Cloud & Sync UI v1.1
(() => {
  function esc(v){return String(v||'').replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))}
  function showCloud(){
    document.querySelectorAll('.section').forEach(s=>s.classList.remove('active'));
    const sec=document.getElementById('cloud-sync');if(sec)sec.classList.add('active');
    document.querySelectorAll('.nav button').forEach(b=>b.classList.toggle('active',b.dataset.page==='cloud-sync'));
    refresh();
  }
  function render(){
    if(document.getElementById('cloudSyncPanel'))return;
    const main=document.querySelector('.main'); if(!main)return;
    const sec=document.createElement('section');sec.id='cloud-sync';sec.className='section';
    sec.innerHTML=`<div class="top"><div><div class="eyebrow">Cloud & Sync</div><div class="title">Google Cloud</div><div class="subtitle">Local-first data with Google Drive backup and multi-device sync.</div></div></div><div class="panel" id="cloudSyncPanel"><div class="statgrid"><div class="stat"><div class="num" id="cloudState">—</div><div class="label">Connection</div></div><div class="stat"><div class="num" id="cloudRevision">0</div><div class="label">Revision</div></div><div class="stat"><div class="num" id="cloudLastSync">Never</div><div class="label">Last sync</div></div></div><div class="toolbar" style="margin-top:16px"><button class="primary" id="googleConnect">Connect Google</button><button class="ghost" id="cloudSyncNow">Sync now</button><button class="ghost" id="cloudBackupNow">Backup now</button></div><div class="detail" id="cloudMessage" style="margin-top:12px">Google Drive is not configured yet.</div></div>`;
    main.appendChild(sec);
    const nav=document.querySelector('.nav');
    if(nav){
      let b=nav.querySelector('[data-page="cloud-sync"]');
      if(!b){b=document.createElement('button');b.dataset.page='cloud-sync';b.innerHTML='☁ <span>Cloud & Sync</span>';nav.appendChild(b)}
      b.onclick=showCloud;
    }
    document.getElementById('googleConnect').onclick=async()=>{try{await window.missionOSGoogleDrive.connect();msg('Google connected.');refresh()}catch(e){msg(e.message)}};
    document.getElementById('cloudSyncNow').onclick=async()=>{try{const r=await window.missionOSGoogleDrive.sync();msg(`Sync complete: ${r.direction}.`);refresh()}catch(e){msg(e.message)}};
    document.getElementById('cloudBackupNow').onclick=async()=>{try{await window.missionOSGoogleDrive.backup();msg('Backup created in Google Drive.');refresh()}catch(e){msg(e.message)}};
    refresh();
  }
  function msg(t){const e=document.getElementById('cloudMessage');if(e)e.textContent=t}
  function refresh(){const api=window.missionOSGoogleDrive;if(!api)return;const s=api.status();const a=document.getElementById('cloudState');const r=document.getElementById('cloudRevision');const l=document.getElementById('cloudLastSync');if(a)a.textContent=s.connected?'Connected':s.configured?'Ready':'Not configured';if(r)r.textContent=s.revision||0;if(l)l.textContent=s.lastSync?new Date(s.lastSync).toLocaleString():'Never'}
  function boot(){render();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
