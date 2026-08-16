// Mission Learning OS — Adaptive Preview v1.0
// Preview-only layer: never mutates the mission queue. The user must explicitly apply a decision.
(() => {
  const KEY='missionOSAdaptivePreview';
  const getEngine=()=>window.missionOSAdaptive;
  const safeDays=()=>{
    try{const s=JSON.parse(localStorage.getItem('missionOSDailyState')||'{}');return Object.values(s.days||{}).sort((a,b)=>String(a.date).localeCompare(String(b.date))).slice(-7).map(d=>({
      targetMinutes:Number(d.targetMinutes||60),studyMinutes:Math.floor(Number(d.studySeconds||0)/60),energy:Number(d.energy||0),difficulty:Number(d.report?.difficulty||d.difficulty||0),
      missionsStarted:Array.isArray(d.missionsStarted)?d.missionsStarted:[],missionsCompleted:Array.isArray(d.missionsCompleted)?d.missionsCompleted:[],blockers:d.report?.blockers||d.blockers||''
    }))}catch{return []}
  };
  function build(){
    const engine=getEngine();if(!engine) return null;
    const decision=engine.build({days:safeDays()});
    const preview={version:'1.0',generatedAt:new Date().toISOString(),decision,applied:false};
    try{localStorage.setItem(KEY,JSON.stringify(preview))}catch{}
    return preview;
  }
  function get(){try{return JSON.parse(localStorage.getItem(KEY)||'null')}catch{return null}}
  function apply(){
    const p=get();if(!p?.decision)return {ok:false,reason:'no_preview'};
    const current=JSON.parse(localStorage.getItem('missionOSAdaptiveApplied')||'null');
    const applied={...p,applied:true,appliedAt:new Date().toISOString(),previous:current};
    localStorage.setItem('missionOSAdaptiveApplied',JSON.stringify(applied));
    return {ok:true,applied};
  }
  function discard(){localStorage.removeItem(KEY);return {ok:true}}
  window.missionOSAdaptivePreview={build,get,apply,discard};
})();
