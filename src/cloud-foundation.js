// Mission Learning OS — Cloud Foundation v1.0
// Keeps cloud configuration explicit and safe. No secrets are embedded in the frontend.
(() => {
  const KEY='missionOSGoogleConfig';
  const load=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'{}')}catch{return {}}};
  const save=v=>localStorage.setItem(KEY,JSON.stringify(v));
  function status(){const c=load();return {googleClientConfigured:!!c.clientId,authFlow:'authorization_code_pkce',driveScope:'https://www.googleapis.com/auth/drive.file',supabaseConfigured:!!window.MISSION_SUPABASE_CONFIG?.url&&!!window.MISSION_SUPABASE_CONFIG?.publishableKey};}
  function setGoogleClientId(id){const c=load();save({...c,clientId:String(id||'').trim()});return status();}
  window.missionOSCloudFoundation={version:'1.0',status,setGoogleClientId};
})();
