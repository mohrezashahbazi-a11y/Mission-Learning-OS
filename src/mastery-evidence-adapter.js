// Mission Learning OS — Mastery Evidence Adapter v1.0
// Converts a Daily Report into learning evidence without changing the report itself.
// Evidence is emitted only during an active, real Learning Cycle.
(() => {
  const CYCLE='missionOSLearningCycle';
  const KEY='missionOSMasteryEvidence';
  const active=()=>{try{const c=JSON.parse(localStorage.getItem(CYCLE)||'null');return !!(c&&c.active===true&&c.id)}catch{return false}};
  const arr=v=>Array.isArray(v)?v:[];
  const clean=v=>String(v||'').trim();

  function fromReport(report={}){
    if(!active()) return {active:false,evidence:[],reason:'No active Learning Cycle; report treated as test/development data.'};
    const learning=clean(report.learning||report.learned||report.learningNotes);
    if(!learning) return {active:true,evidence:[],reason:'No learning evidence recorded.'};

    const missions=arr(report.missionsCompleted||report.completedMissions);
    const difficulty=Number(report.difficulty||0);
    const evidence=[{
      id:`${report.date||new Date().toISOString().slice(0,10)}-${Date.now()}`,
      date:report.date||new Date().toISOString().slice(0,10),
      cycleId:(()=>{try{return JSON.parse(localStorage.getItem(CYCLE)).id}catch{return null}})(),
      learning,
      missionsCompleted:missions,
      difficulty:Number.isFinite(difficulty)?difficulty:0,
      blocker:clean(report.blockers||report.friction),
      deliverable:!!report.deliverable,
      review:!!report.review,
      reassessment:!!report.reassessment,
      source:'daily_report'
    }];
    const old=(()=>{try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch{return []}})();
    const next=[...old,...evidence].slice(-100);
    localStorage.setItem(KEY,JSON.stringify(next));
    return {active:true,evidence,storedCount:next.length};
  }

  function get(){try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch{return []}}
  function clearTestEvidence(){localStorage.removeItem(KEY);return {ok:true}}
  window.missionOSMasteryEvidence={fromReport,get,clearTestEvidence,active};
})();
