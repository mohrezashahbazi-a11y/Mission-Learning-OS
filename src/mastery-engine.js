// Mission Learning OS — Mastery Engine v1.1
// Evidence-based mastery state. Study time alone never becomes mastery evidence.
(() => {
  const KEY='missionOSMastery';
  const CYCLE='missionOSLearningCycle';
  const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
  const n=(v,d=0)=>Number.isFinite(Number(v))?Number(v):d;
  const read=k=>{try{return JSON.parse(localStorage.getItem(k)||'null')}catch{return null}};
  const write=(k,v)=>localStorage.setItem(k,JSON.stringify(v));

  function cycle(){return read(CYCLE)||null}
  function cycleActive(){const c=cycle();return !!(c&&c.active===true&&c.id)}
  function startCycle(id='LC-1'){
    const existing=cycle();
    if(existing?.active===true&&existing.id)return existing;
    const c={id,active:true,startedAt:new Date().toISOString(),version:'1.1'};
    write(CYCLE,c);return c;
  }
  function stopCycle(){const c=cycle();if(!c)return null;c.active=false;c.stoppedAt=new Date().toISOString();write(CYCLE,c);return c}

  function level(score){
    if(score<=0)return 'not_started';
    if(score<40)return 'learning';
    if(score<70)return 'practicing';
    if(score<85)return 'needs_review';
    return 'mastered';
  }

  function scoreEvidence(e={}){
    const deliverable=e.deliverable?25:0;
    const reassessment=e.reassessment?30:0;
    const review=e.review?15:0;
    const difficulty=n(e.difficulty,5);
    const difficultyFactor=clamp((10-difficulty)/10,0,1)*10;
    const quality=clamp(n(e.quality,0),0,10)*2;
    return clamp(deliverable+reassessment+review+difficultyFactor+quality,0,100);
  }

  function record(subjectId,e={}){
    if(!subjectId)return null;
    if(!cycleActive())return {active:false,reason:'No active Learning Cycle'};
    const data=read(KEY)||{};
    const prev=data[subjectId]||{score:0,evidenceCount:0,history:[]};
    const gain=scoreEvidence(e);
    const score=clamp(Math.round(prev.score*0.7+gain*0.3),0,100);
    const at=new Date().toISOString();
    data[subjectId]={score,level:level(score),evidenceCount:n(prev.evidenceCount)+1,lastUpdated:at,history:[...(prev.history||[]),{at,gain,score,type:e.type||'mission'}].slice(-30)};
    write(KEY,data);
    return data[subjectId];
  }

  function build(subjects=[]){
    if(!cycleActive())return {version:'1.1',active:false,reason:'No active Learning Cycle. Test data excluded.',subjects:{}};
    const out=read(KEY)||{};
    subjects.forEach(s=>{if(s?.id)record(s.id,s)});
    return {version:'1.1',active:true,subjects:out};
  }

  function get(subjectId){const d=read(KEY)||{};return subjectId?d[subjectId]||null:d}
  function resetTestData(){localStorage.removeItem(KEY);return {ok:true}}

  window.missionOSMastery={version:'1.1',build,get,level,scoreEvidence,record,cycle,cycleActive,startCycle,stopCycle,resetTestData};
})();
