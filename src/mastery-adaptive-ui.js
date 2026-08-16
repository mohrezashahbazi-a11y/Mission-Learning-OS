// Mission Learning OS — Mastery Adaptive UI v1.0
// Adds a read-only Mastery signal block to the existing Adaptive Plan.
(() => {
  function mount(){
    const host=document.querySelector('#adaptivePlan,#adaptive-plan,[data-adaptive-plan],.adaptive-plan');
    if(!host || !window.missionOSMasteryAdaptive) return;
    let box=document.getElementById('masteryAdaptiveSignals');
    if(!box){box=document.createElement('section');box.id='masteryAdaptiveSignals';box.className='detail';host.appendChild(box)}
    const data=window.missionOSMasteryAdaptive.build();
    if(!data.active){box.innerHTML='<b>Mastery signal</b><div class="dsub" style="margin-top:6px">Learning Cycle has not started. Test data is excluded from Adaptive decisions.</div>';return}
    const s=data.signals||{}; const labels=(data.recommendation||[]).map(x=>x==='prioritize_mastery_review'?'Prioritize mastery review':x==='continue_active_learning'?'Continue active learning':x==='collect_first_learning_evidence'?'Collect first learning evidence':x).join(' · ')||'No new mastery signal';
    box.innerHTML=`<div style="display:flex;justify-content:space-between;gap:12px;align-items:center"><b>Mastery → Adaptive</b><span class="chip">${s.evidenceCount||0} evidence</span></div><div class="dsub" style="margin-top:7px">${labels}</div>${s.needsReview?.length?`<div class="chips" style="margin-top:8px">${s.needsReview.map(x=>`<span class="chip">Review: ${x}</span>`).join('')}</div>`:''}<div class="dsub" style="margin-top:8px">Queue and curriculum are not changed automatically.</div>`;
  }
  window.missionOSMasteryAdaptiveUI={version:'1.0',mount};
  const boot=()=>{mount();setInterval(mount,1000)};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
