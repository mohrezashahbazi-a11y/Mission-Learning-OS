// Mission Learning OS — Adaptive Mission Engine v1.0
// Pure decision engine. It does not mutate missions, timers, curriculum, or UI.
// It reads recent evidence and returns a bounded recommendation for the next queue.
(() => {
  const KEY = 'missionOSAdaptiveDecision';
  const clamp = (n,min,max) => Math.max(min,Math.min(max,n));
  const num = (v,d=0) => Number.isFinite(Number(v)) ? Number(v) : d;

  function classifyCompletion(completed, started){
    if(started<=0) return 'no_data';
    const r=completed/started;
    if(r>=0.9) return 'strong';
    if(r>=0.7) return 'healthy';
    if(r>=0.45) return 'strained';
    return 'weak';
  }

  function build(evidence={}){
    const days=Array.isArray(evidence.days)?evidence.days.slice(-7):[];
    const target=Math.max(1,days.reduce((s,d)=>s+num(d.targetMinutes,60),0));
    const study=days.reduce((s,d)=>s+num(d.studyMinutes),0);
    const started=days.reduce((s,d)=>s+num(d.missionsStarted),0);
    const completed=days.reduce((s,d)=>s+num(d.missionsCompleted),0);
    const energyValues=days.map(d=>num(d.energy)).filter(v=>v>0);
    const difficultyValues=days.map(d=>num(d.difficulty)).filter(v=>v>0);
    const avgEnergy=energyValues.length?energyValues.reduce((a,b)=>a+b,0)/energyValues.length:0;
    const avgDifficulty=difficultyValues.length?difficultyValues.reduce((a,b)=>a+b,0)/difficultyValues.length:0;
    const completionRate=started?completed/started:0;
    const timeRate=study/target;
    const completionClass=classifyCompletion(completed,started);

    // Bounded adaptation: change workload by at most one step per decision.
    let workload='maintain';
    let intensity='maintain';
    let reason='Insufficient evidence; maintain the current queue.';

    if(days.length===0){
      reason='No recent evidence; maintain the current queue.';
    }else if(completionRate>=0.9 && timeRate>=0.9 && (avgEnergy===0 || avgEnergy>=6) && (avgDifficulty===0 || avgDifficulty<=7)){
      workload='increase_slightly';
      intensity='maintain';
      reason='Strong completion and time consistency with adequate energy.';
    }else if(completionRate<0.7 || timeRate<0.6 || (avgEnergy>0 && avgEnergy<=4)){
      workload='reduce_slightly';
      intensity='protect_focus';
      reason='Recent execution shows strain, low time attainment, or low energy.';
    }else if(avgDifficulty>=8){
      workload='maintain';
      intensity='add_review';
      reason='Difficulty is high; preserve progress and add review/support rather than increasing workload.';
    }else{
      workload='maintain';
      intensity='maintain';
      reason='Performance is mixed but does not justify a structural change.';
    }

    const decision={
      version:'1.0',
      generatedAt:new Date().toISOString(),
      windowDays:days.length,
      metrics:{studyMinutes:study,targetMinutes:target,timeRate,started,completed,completionRate,completionClass,avgEnergy,avgDifficulty},
      recommendation:{workload,intensity,reason,maxQueueAdjustment:1},
      guardrails:{curriculumMutation:false,maxWorkloadStep:1,doNotRedesignCurriculum:true}
    };
    try{localStorage.setItem(KEY,JSON.stringify(decision));}catch{}
    return decision;
  }

  function get(){try{return JSON.parse(localStorage.getItem(KEY)||'null')}catch{return null}}
  window.missionOSAdaptive={build,get};
})();
