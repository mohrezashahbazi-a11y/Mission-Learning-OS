// Mission Learning OS — Cloud Foundation v1.1
// Public Google OAuth client ID may live in the frontend; no client secret is embedded.
(() => {
  const KEY='missionOSGoogleConfig';
  const GOOGLE_CLIENT_ID='924158402200-ik5iqtfhaqmg0e209nf75rkelk49tjof.apps.googleusercontent.com';
  const load=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'{}')}catch{return {}}};
  const save=v=>localStorage.setItem(KEY,JSON.stringify(v));
  const ensure=()=>{const c=load(); if(c.clientId!==GOOGLE_CLIENT_ID) save({...c,clientId:GOOGLE_CLIENT_ID}); window.MISSION_GOOGLE_CLIENT_ID=GOOGLE_CLIENT_ID; return load()};
  function status(){const c=ensure();return {googleClientConfigured:!!c.clientId,authFlow:'google_identity_services',driveScope:'https://www.googleapis.com/auth/drive.file',supabaseConfigured:!!window.MISSION_SUPABASE_CONFIG?.url&&!!window.MISSION_SUPABASE_CONFIG?.publishableKey};}
  function setGoogleClientId(id){const c=load();save({...c,clientId:String(id||'').trim()});window.MISSION_GOOGLE_CLIENT_ID=String(id||'').trim();return status();}
  ensure();
  window.missionOSCloudFoundation={version:'1.1',status,setGoogleClientId,clientId:GOOGLE_CLIENT_ID};
})();
