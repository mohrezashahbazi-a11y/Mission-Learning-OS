// Mission Learning OS — Google Drive Authorization scaffold v1.0
// Uses Google Identity Services authorization-code flow. No Google secret is stored in the browser.
(() => {
  const CONFIG='missionOSGoogleConfig';
  const DEFAULT_SCOPES=['https://www.googleapis.com/auth/drive.file'];
  const cfg=()=>{try{return JSON.parse(localStorage.getItem(CONFIG)||'{}')}catch{return {}}};
  function setClientId(clientId){localStorage.setItem(CONFIG,JSON.stringify({clientId:String(clientId||'').trim(),scopes:DEFAULT_SCOPES}));return status()}
  function status(){const c=cfg();return {configured:!!c.clientId,clientId:c.clientId||null,scopes:c.scopes||DEFAULT_SCOPES,flow:'authorization_code_pkce'}}
  function requestCode(){
    const c=cfg();
    if(!c.clientId) throw new Error('Google OAuth Client ID is not configured yet.');
    if(!window.google?.accounts?.oauth2) throw new Error('Google Identity Services is not loaded.');
    return new Promise((resolve,reject)=>{
      const client=google.accounts.oauth2.initCodeClient({
        client_id:c.clientId,
        scope:c.scopes.join(' '),
        ux_mode:'popup',
        callback:(response)=>response?.code?resolve(response.code):reject(new Error(response?.error||'Google authorization failed'))
      });
      client.requestCode();
    });
  }
  window.missionOSGoogleAuth={version:'1.0',setClientId,status,requestCode,scopes:DEFAULT_SCOPES};
})();
