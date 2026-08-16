// Mission Learning OS — Adaptive Preview v1.1
// Preview-only layer. Historical evidence is preserved; current-day reset never erases the 7-day evidence window.
(() => {
  const KEY='missionOSAdaptivePreview';
  const getEngine=()=>window.missionOSAdaptive;
  const safeDays=()=>{
    try{
      const s=JSON.parse(localStorage.getItem('missionOSDailyState')||'{}');
      return Object.values(s.days||{}).sort((a,b)=>String(a.date).localeCompare(String(b.date))).slice(-7).map(d=>({
        date:String(d.date||''),
        targetMinutes:Number(d.targetMinutes||60),
        studyMinutes:Math.floor(Number(d.studySeconds||0)/60),
        energy:Number(d.energy||0),
        difficulty:Number(d.report?.difficulty||d.difficulty||0),
        missionsStarted:Array.isArray(d.missionsStarted)?d.missionsStarted:[],
        missionsCompleted:Array.isArray(d.missionsCompleted)?d.missionsCompleted:[],
        blockers:d.report?.blockers||d.blockers||''
      }));
    }catch{return []}
  };
  function build(){
    const engine=getEngine();if(!engine)return null;
    const days=safeDays();
    const decision=engine.build({days});
    const todayKey=new Date().toISOString().slice(0,10);
    const today=days.find(d=>d.date===todayKey)||{studyMinutes:0,targetMinutes:60};
    const preview={
      version:'1.1',generatedAt:new Date().toISOString(),applied:false,
      today:{studyMinutes:today.studyMinutes,targetMinutes:today.targetMinutes,timeRate:today.targetMinutes?today.studyMinutes/today.targetMinutes:0},
      decision
    };
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
