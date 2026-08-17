// Mission Learning OS — Production Fresh Start v1.0
// Clears only pre-launch/test state on the first production launch.
(() => {
  const VERSION='1.0';
  const SENTINEL='missionOSFreshStartVersion';
  const GOOGLE_CLIENT='missionOSGoogleClientId';
  const TOKEN='missionOSDriveAccessToken';
  const TOKEN_EXP='missionOSDriveAccessTokenExpiry';
  const shouldRun=localStorage.getItem(SENTINEL)!==VERSION;
  if(!shouldRun)return;
  const keep=new Set([GOOGLE_CLIENT,TOKEN,TOKEN_EXP]);
  const keys=[];
  for(let i=0;i<localStorage.length;i++){
    const k=localStorage.key(i);
    if(k&&k.startsWith('missionOS')&&!keep.has(k))keys.push(k);
  }
  keys.forEach(k=>localStorage.removeItem(k));
  localStorage.setItem(SENTINEL,VERSION);
  localStorage.setItem('missionOSLearningCycle',JSON.stringify({active:false,ready:true,productionStart:new Date().toISOString()}));
})();
