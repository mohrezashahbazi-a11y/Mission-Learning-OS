// Mission Learning OS — Adaptive Preview UI v1.2
// Robust controls with explicit event listeners and visible state feedback.
(() => {
  const toast=t=>{const e=document.getElementById('toast');if(e){e.textContent=t;e.classList.add('show');setTimeout(()=>e.classList.remove('show'),2200)}};
  const setStatus=t=>{const e=document.getElementById('adaptiveStatus');if(e)e.textContent=t;};

  function ensure(){
    const nav=document.querySelector('.nav');
    const main=document.querySelector('.main');
    if(!nav||!main)return false;

    let b=document.getElementById('adaptiveNav');
    if(!b){
      b=document.createElement('button');
      b.id='adaptiveNav';
      b.dataset.page='adaptive';
      b.type='button';
      b.innerHTML='◉ <span>Adaptive Plan</span>';
      b.style.cssText='display:block;width:100%;text-align:left;background:transparent;color:var(--muted);padding:11px 12px;border-radius:10px;cursor:pointer;';
      nav.appendChild(b);
      b.addEventListener('click',show);
    }

    let sec=document.getElementById('adaptive');
    if(!sec){
      sec=document.createElement('section');
      sec.id='adaptive';
      sec.className='section';
      sec.innerHTML=`
        <div class="top">
          <div><div class="eyebrow">Learning Director</div><div class="title">Adaptive Plan</div><div class="subtitle">Analyze recent execution and approve a bounded change for tomorrow.</div></div>
          <div class="date">Adaptive v1.2</div>
        </div>
        <div class="panel">
          <div class="statgrid" id="adaptiveStats"></div>
          <div class="mission-detail">
            <div class="detail"><b>Recommendation</b><div id="adaptiveRecommendation" class="mission-meta"></div></div>
            <div class="detail"><b>Why</b><div id="adaptiveReason" class="mission-meta"></div></div>
            <div class="detail"><b>Actions</b><div id="adaptiveActions" class="mission-meta"></div></div>
            <div class="detail"><b>Patterns</b><div id="adaptivePatterns" class="mission-meta"></div></div>
          </div>
          <div class="actions" style="margin-top:14px">
            <button type="button" class="primary" id="adaptiveApply">Apply to Tomorrow</button>
            <button type="button" class="ghost" id="adaptiveKeep">Keep Current Queue</button>
            <button type="button" class="ghost" id="adaptiveRefresh">Re-analyze</button>
          </div>
          <div class="detail" style="margin-top:13px"><b>Status</b><div id="adaptiveStatus" class="mission-meta">Ready.</div></div>
          <div class="detail" style="margin-top:9px"><b>Safety</b><div class="mission-meta">Curriculum is never redesigned. History is never deleted. Queue changes are limited to one bounded step.</div></div>
        </div>`;
      main.appendChild(sec);

      document.getElementById('adaptiveApply').addEventListener('click',apply);
      document.getElementById('adaptiveKeep').addEventListener('click',keep);
      document.getElementById('adaptiveRefresh').addEventListener('click',()=>{render();setStatus('Analysis refreshed.');});
    }
    return true;
  }

  function show(e){
    if(e)e.preventDefault();
    if(!ensure())return;
    document.querySelectorAll('.section').forEach(s=>s.classList.remove('active'));
    document.getElementById('adaptive').classList.add('active');
    document.querySelectorAll('.nav button').forEach(x=>x.classList.remove('active'));
    document.getElementById('adaptiveNav').classList.add('active');
    render();
  }

  function render(){
    if(!ensure())return;
    const p=window.missionOSAdaptivePreview?.build?.();
    if(!p){setStatus('Adaptive engine is not ready.');toast('Adaptive engine is not ready yet.');return;}
    const d=p.decision||{};
    const m=d.metrics||{},r=d.recommendation||{},pat=d.patterns||{};
    document.getElementById('adaptiveStats').innerHTML=`<div class="stat"><div class="num">${Math.round((m.timeRate||0)*100)}%</div><div class="label">Time attainment</div></div><div class="stat"><div class="num">${Math.round((m.completionRate||0)*100)}%</div><div class="label">Mission completion</div></div><div class="stat"><div class="num">${m.avgEnergy?m.avgEnergy.toFixed(1):'—'}</div><div class="label">Avg energy</div></div>`;
    document.getElementById('adaptiveRecommendation').textContent=`${r.workload||'maintain'} · ${r.intensity||'maintain'}`;
    document.getElementById('adaptiveReason').textContent=r.reason||'No recommendation.';
    document.getElementById('adaptiveActions').textContent=(r.actions||[]).join(' · ')||'Keep current queue';
    const blockers=(pat.topBlockers||[]).map(x=>`${x.label} (${x.count})`).join(' · ')||'No recurring blockers detected';
    const unfinished=(pat.unfinishedMissions||[]).join(', ')||'None';
    document.getElementById('adaptivePatterns').textContent=`Blockers: ${blockers} | Unfinished: ${unfinished}`;
    const applied=JSON.parse(localStorage.getItem('missionOSAdaptiveApplied')||'null');
    if(applied?.choice==='keep_current_queue')setStatus('Current queue is locked for tomorrow.');
    else if(applied?.applied) setStatus('Adaptive decision approved for tomorrow.');
    else setStatus('New analysis ready. Choose an action.');
  }

  function apply(){
    const result=window.missionOSAdaptivePreview?.apply?.();
    if(!result?.ok){toast('Run Re-analyze first.');setStatus('Nothing to apply yet.');return;}
    setStatus('Adaptive decision approved for tomorrow.');
    toast('Applied for tomorrow.');
  }

  function keep(){
    const d=window.missionOSAdaptivePreview?.get?.()?.decision||null;
    localStorage.setItem('missionOSAdaptiveApplied',JSON.stringify({version:'1.2',decision:d,applied:false,choice:'keep_current_queue',at:new Date().toISOString()}));
    setStatus('Current queue will remain unchanged tomorrow.');
    toast('Current queue kept.');
  }

  function boot(){ensure();setTimeout(ensure,300);setTimeout(ensure,1000);}
  window.missionOSAdaptiveUI={show,render,ensure};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
  window.addEventListener('load',boot);
})();
