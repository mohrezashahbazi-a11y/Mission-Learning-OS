// Mission Learning OS — Cloud Foundation v1.2
// Public Google OAuth client ID may live in the frontend; no client secret is embedded.
// Analytics bootstrap is loaded here so it remains compatible with the existing Pages injector.
(() => {
  const KEY='missionOSGoogleConfig';
  const GOOGLE_CLIENT_ID='924158402200-ik5iqtfhaqmg0e209nf75rkelk49tjof.apps.googleusercontent.com';
  const load=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'{}')}catch{return {}}};
  const save=v=>localStorage.setItem(KEY,JSON.stringify(v));
  const ensure=()=>{const c=load(); if(c.clientId!==GOOGLE_CLIENT_ID) save({...c,clientId:GOOGLE_CLIENT_ID}); window.MISSION_GOOGLE_CLIENT_ID=GOOGLE_CLIENT_ID; return load()};
  function status(){const c=ensure();return {googleClientConfigured:!!c.clientId,authFlow:'google_identity_services',driveScope:'https://www.googleapis.com/auth/drive.file',supabaseConfigured:!!window.MISSION_SUPABASE_CONFIG?.url&&!!window.MISSION_SUPABASE_CONFIG?.publishableKey};}
  function setGoogleClientId(id){const c=load();save({...c,clientId:String(id||'').trim()});window.MISSION_GOOGLE_CLIENT_ID=String(id||'').trim();return status();}
  function loadScript(src){return new Promise((resolve,reject)=>{if(document.querySelector(`script[src="${src}"]`))return resolve();const s=document.createElement('script');s.src=src;s.onload=resolve;s.onerror=reject;document.head.appendChild(s)})}
  async function bootstrapAnalytics(){try{await loadScript('src/analytics-engine.js?v=1.0');await loadScript('src/analytics-ui.js?v=1.0');window.missionOSAnalyticsUI?.render?.()}catch(e){console.warn('Analytics bootstrap failed',e)}}
  ensure();
  window.missionOSCloudFoundation={version:'1.2',status,setGoogleClientId,clientId:GOOGLE_CLIENT_ID};
  bootstrapAnalytics();
})();
