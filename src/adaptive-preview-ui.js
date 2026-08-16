// Mission Learning OS — Adaptive Preview UI v1.1
// Robust standalone UI. Preview is read-only until the user explicitly applies a decision.
(() => {
  const toast=t=>{const e=document.getElementById('toast');if(e){e.textContent=t;e.classList.add('show');setTimeout(()=>e.classList.remove('show'),2200)}};
  const ensure=()=>{
    const nav=document.querySelector('.nav');const main=document.querySelector('.main');
    if(!nav||!main)return false;
    let b=document.getElementById('adaptiveNav');
    if(!b){
      b=document.createElement('button');b.id='adaptiveNav';b.dataset.page='adaptive';b.innerHTML='◉ <span>Adaptive Plan</span>';b.type='button';
      b.style.display='block';b.style.width='100%';b.style.textAlign='left';b.style.background='transparent';b.style.color='var(--muted)';b.style.padding='11px 12px';b.style.borderRadius='10px';b.style.cursor='pointer';
      nav.appendChild(b);
    }
    let sec=document.getElementById('adaptive');
    if(!sec){
      sec=document.createElement('section');sec.id='adaptive';sec.className='section';
      sec.innerHTML=`<div class="top"><div><div class="eyebrow">Learning Director</div><div class="title">Adaptive Plan</div><div class="subtitle">The system analyzes recent execution, then waits for your approval before changing tomorrow’s queue.</div></div><div class="date">Preview only</div></div><div class="panel"><div class="statgrid" id="adaptiveStats"></div><div class="mission-detail"><div class="detail"><b>Recommendation</b><div id="adaptiveRecommendation" class="mission-meta"></div></div><div class="detail"><b>Why</b><div id="adaptiveReason" class="mission-meta"></div></div><div class="detail"><b>Actions</b><div id="adaptiveActions" class="mission-meta"></div></div><div class="detail"><b>Patterns</b><div id="adaptivePatterns" class="mission-meta"></div></div></div><div class="actions" style="margin-top:14px"><button class="primary" id="adaptiveApply">Apply to Tomorrow</button><button class="ghost" id="adaptiveKeep">Keep Current Queue</button><button class="ghost" id="adaptiveRefresh">Re-analyze</button></div><div class="detail" style="margin-top:13px"><b>Safety</b><div class="mission-meta">Curriculum is never redesigned here. History is never deleted. Queue changes are limited to one bounded step.</div></div></div>`;
      main.appendChild(sec);
    }
    b.onclick=show;
    document.getElementById('adaptiveApply').onclick=apply;
    document.getElementById('adaptiveKeep').onclick=()=>{const d=window.missionOSAdaptivePreview?.get?.()?.decision||null;localStorage.setItem('missionOSAdaptiveApplied',JSON.stringify({version:'1.1',decision:d,applied:false,choice:'keep_current_queue',at:new Date().toISOString()}));toast('Current queue kept.');};
    document.getElementById('adaptiveRefresh').onclick=render;
    return true;
  };
  function show(){if(!ensure())return;document.querySelectorAll('.section').forEach(s=>s.classList.remove('active'));document.getElementById('adaptive').classList.add('active');document.querySelectorAll('.nav button').forEach(x=>x.classList.remove('active'));document.getElementById('adaptiveNav').classList.add('active');render();}
  function render(){if(!ensure())return;const p=window.missionOSAdaptivePreview?.build?.();if(!p){toast('Adaptive engine is not ready yet.');return;}const d=p.decision||{};const m=d.metrics||{},r=d.recommendation||{},pat=d.patterns||{};document.getElementById('adaptiveStats').innerHTML=`<div class="stat"><div class="num">${Math.round((m.timeRate||0)*100)}%</div><div class="label">Time attainment</div></div><div class="stat"><div class="num">${Math.round((m.completionRate||0)*100)}%</div><div class="label">Mission completion</div></div><div class="stat"><div class="num">${m.avgEnergy?m.avgEnergy.toFixed(1):'—'}</div><div class="label">Avg energy</div></div>`;document.getElementById('adaptiveRecommendation').textContent=`${r.workload||'maintain'} · ${r.intensity||'maintain'}`;document.getElementById('adaptiveReason').textContent=r.reason||'No recommendation.';document.getElementById('adaptiveActions').textContent=(r.actions||[]).join(' · ')||'Keep current queue';const blockers=(pat.topBlockers||[]).map(x=>`${x.label} (${x.count})`).join(' · ')||'No recurring blockers detected';const unfinished=(pat.unfinishedMissions||[]).join(', ')||'None';document.getElementById('adaptivePatterns').textContent=`Blockers: ${blockers} | Unfinished: ${unfinished}`;}
  function apply(){const result=window.missionOSAdaptivePreview?.apply?.();if(!result?.ok){toast('No preview available.');return;}toast('Adaptive decision approved for tomorrow.');}
  function boot(){if(ensure()){setTimeout(ensure,300);setTimeout(ensure,1000);}}
  window.missionOSAdaptiveUI={show,render,ensure};
  if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',boot);window.addEventListener('load',boot);}else{boot();window.addEventListener('load',boot);}
})();
