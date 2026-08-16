// Mission Learning OS — Adaptive Mission Engine v1.1
// Pure decision engine. It does not mutate missions, timers, curriculum, or UI.
// It reads recent evidence, recurring blockers, and unfinished missions and returns a bounded recommendation.
(() => {
  const KEY = 'missionOSAdaptiveDecision';
  const num = (v,d=0) => Number.isFinite(Number(v)) ? Number(v) : d;
  const text = v => String(v||'').trim();

  function classifyCompletion(completed, started){
    if(started<=0) return 'no_data';
    const r=completed/started;
    if(r>=0.9) return 'strong';
    if(r>=0.7) return 'healthy';
    if(r>=0.45) return 'strained';
    return 'weak';
  }

  function blockerCounts(days){
    const counts={};
    days.forEach(d=>{
      const raw=[d.blockers,d.friction,d.report?.blockers].filter(Boolean).join(' ');
      if(!raw)return;
      raw.split(/[\n,;|]+/).map(text).filter(Boolean).forEach(x=>{
        const key=x.toLowerCase();counts[key]=(counts[key]||0)+1;
      });
    });
    return Object.entries(counts).sort((a,b)=>b[1]-a[1]).map(([label,count])=>({label,count}));
  }

  function unfinishedIds(days){
    const started=new Set();const completed=new Set();
    days.forEach(d=>{
      (d.missionsStarted||[]).forEach(x=>started.add(String(x)));
      (d.missionsCompleted||[]).forEach(x=>completed.add(String(x)));
    });
    return [...started].filter(x=>!completed.has(x));
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
    const blockers=blockerCounts(days);
    const unfinished=unfinishedIds(days);
    const streak=days.reduce((n,d)=>num(d.studyMinutes)>0?n+1:0,0);

    let workload='maintain';
    let intensity='maintain';
    let reason='Recent evidence does not justify a structural change.';
    let actions=[];

    if(days.length===0){
      reason='No recent evidence; maintain the current queue.';
      actions.push('keep_current_queue');
    } else if(completionRate>=0.9 && timeRate>=0.9 && (avgEnergy===0 || avgEnergy>=6) && (avgDifficulty===0 || avgDifficulty<=7)){
      workload='increase_slightly';
      reason='Strong completion and time consistency with adequate energy.';
      actions.push('add_one_small_next_step');
    } else if(completionRate<0.7 || timeRate<0.6 || (avgEnergy>0 && avgEnergy<=4)){
      workload='reduce_slightly';
      intensity='protect_focus';
      reason='Recent execution shows strain, low time attainment, or low energy.';
      actions.push('shorten_or_split_next_mission');
    } else if(avgDifficulty>=8){
      intensity='add_review';
      reason='Difficulty is high; preserve progress and add review/support.';
      actions.push('insert_review_before_new_content');
    } else {
      actions.push('keep_current_queue');
    }

    if(unfinished.length){actions.push('surface_unfinished_missions_first');}
    if(blockers[0] && blockers[0].count>=2){actions.push('address_recurring_blocker');}
    if(streak>=3){actions.push('protect_consistency');}

    const decision={
      version:'1.1',
      generatedAt:new Date().toISOString(),
      windowDays:days.length,
      metrics:{studyMinutes:study,targetMinutes:target,timeRate,started,completed,completionRate,completionClass,avgEnergy,avgDifficulty,streak},
      patterns:{topBlockers:blockers.slice(0,5),unfinishedMissions:unfinished},
      recommendation:{workload,intensity,reason,actions,maxQueueAdjustment:1},
      guardrails:{curriculumMutation:false,maxWorkloadStep:1,doNotRedesignCurriculum:true,doNotDeleteHistory:true}
    };
    try{localStorage.setItem(KEY,JSON.stringify(decision));}catch{}
    return decision;
  }

  function get(){try{return JSON.parse(localStorage.getItem(KEY)||'null')}catch{return null}}
  window.missionOSAdaptive={build,get};
})();
