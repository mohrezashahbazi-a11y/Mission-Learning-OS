// Mission Learning OS — Mastery Engine v1.0
// Evidence-based mastery state. Test/development data is excluded unless a real Learning Cycle is active.
(() => {
  const KEY='missionOSMastery';
  const CYCLE='missionOSLearningCycle';
  const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
  const n=(v,d=0)=>Number.isFinite(Number(v))?Number(v):d;

  function cycleActive(){
    try{const c=JSON.parse(localStorage.getItem(CYCLE)||'null');return !!(c&&c.active===true&&c.id)}catch{return false}
  }

  function level(score){
    if(score<=0)return 'not_started';
    if(score<40)return 'learning';
    if(score<70)return 'practicing';
    if(score<85)return 'needs_review';
    return 'mastered';
  }

  function scoreEvidence(e={}){
    // Completion alone is intentionally weak evidence.
    const deliverable=e.deliverable?25:0;
    const reassessment=e.reassessment?30:0;
    const review=e.review?15:0;
    const difficulty=n(e.difficulty,5);
    const difficultyFactor=clamp((10-difficulty)/10,0,1)*10;
    const quality=clamp(n(e.quality,0),0,10)*2;
    return clamp(deliverable+reassessment+review+difficultyFactor+quality,0,100);
  }

  function build(subjects=[]){
    if(!cycleActive()) return {version:'1.0',active:false,reason:'No active Learning Cycle. Test data excluded.',subjects:{}};
    const prior=(()=>{try{return JSON.parse(localStorage.getItem(KEY)||'{}')}catch{return {}}})();
    const out={...prior};
    subjects.forEach(s=>{
      if(!s?.id)return;
      const prev=out[s.id]||{score:0,evidenceCount:0,history:[]};
      const gain=scoreEvidence(s);
      const score=clamp(Math.round(prev.score*0.7+gain*0.3),0,100);
      out[s.id]={score,level:level(score),evidenceCount:n(prev.evidenceCount)+1,lastUpdated:new Date().toISOString(),history:[...(prev.history||[]),{at:new Date().toISOString(),gain,score}].slice(-30)};
    });
    localStorage.setItem(KEY,JSON.stringify(out));
    return {version:'1.0',active:true,subjects:out};
  }

  function get(subjectId){
    try{const d=JSON.parse(localStorage.getItem(KEY)||'{}');return subjectId?d[subjectId]||null:d}catch{return null}}
  function resetTestData(){localStorage.removeItem(KEY);return {ok:true}}

  window.missionOSMastery={build,get,level,scoreEvidence,cycleActive,resetTestData};
})();
