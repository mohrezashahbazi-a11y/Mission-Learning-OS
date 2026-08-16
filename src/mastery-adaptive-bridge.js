// Mission Learning OS — Mastery ↔ Adaptive Bridge v1.0
// Read-only decision bridge. It never mutates curriculum or the mission queue.
(() => {
  const E='missionOSMasteryEvidence', M='missionOSMastery', C='missionOSLearningCycle', A='missionOSAdaptiveDecision';
  const active=()=>{try{const c=JSON.parse(localStorage.getItem(C)||'null');return !!(c&&c.active===true&&c.id)}catch{return false}};
  const get=(k,d)=>{try{return JSON.parse(localStorage.getItem(k)||'null')??d}catch{return d}};
  function build(){
    if(!active()) return {version:'1.0',active:false,reason:'No active Learning Cycle.'};
    const evidence=get(E,[]); const mastery=get(M,{}); const adaptive=get(A,null);
    const needsReview=Object.entries(mastery).filter(([,v])=>v&&v.level==='needs_review').map(([id])=>id);
    const learning=Object.entries(mastery).filter(([,v])=>v&&['learning','practicing'].includes(v.level)).map(([id])=>id);
    const recommendation=[];
    if(needsReview.length) recommendation.push('prioritize_mastery_review');
    if(learning.length) recommendation.push('continue_active_learning');
    if(!needsReview.length&&!learning.length&&evidence.length===0) recommendation.push('collect_first_learning_evidence');
    if(adaptive?.recommendation?.actions) recommendation.push(...adaptive.recommendation.actions);
    const result={version:'1.0',generatedAt:new Date().toISOString(),active:true,signals:{evidenceCount:evidence.length,needsReview,learning},adaptiveRecommendation:adaptive?.recommendation||null,recommendation:[...new Set(recommendation)],guardrails:{queueMutation:false,curriculumMutation:false,historyDeletion:false}};
    localStorage.setItem('missionOSMasteryAdaptiveBridge',JSON.stringify(result)); return result;
  }
  function getBridge(){return get('missionOSMasteryAdaptiveBridge',null)}
  window.missionOSMasteryAdaptive={build,get:getBridge};
})();
