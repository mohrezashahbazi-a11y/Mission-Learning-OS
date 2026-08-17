// Mission Learning OS — Production Fresh Start v1.1
// Clears pre-launch/test state once, then forces the clean local snapshot to win over the old test cloud file.
(() => {
  const VERSION='1.1';
  const SENTINEL='missionOSFreshStartVersion';
  const GOOGLE_CLIENT='missionOSGoogleClientId';
  const TOKEN='missionOSDriveAccessToken';
  const TOKEN_EXP='missionOSDriveAccessTokenExpiry';
  if(localStorage.getItem(SENTINEL)===VERSION)return;
  const keep=new Set([GOOGLE_CLIENT,TOKEN,TOKEN_EXP,SENTINEL]);
  const keys=[];
  for(let i=0;i<localStorage.length;i++){
    const k=localStorage.key(i);
    if(k&&k.startsWith('missionOS')&&!keep.has(k))keys.push(k);
  }
  keys.forEach(k=>localStorage.removeItem(k));
  localStorage.setItem(SENTINEL,VERSION);
  localStorage.setItem('missionOSLearningCycle',JSON.stringify({active:false,ready:true,productionStart:new Date().toISOString()}));
  // The first production cloud sync uses a deliberately higher revision so the empty production state
  // overwrites the old test data file instead of downloading it back.
  localStorage.setItem('missionOSCloudMeta',JSON.stringify({revision:1000000,lastSync:null,lastBackup:null,cloudFileId:null,folderId:null,connected:false}));
})();
