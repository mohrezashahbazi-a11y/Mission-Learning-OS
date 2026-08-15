// Mission Learning OS — Application Readiness Engine v0.1
// Strategic milestone: by Shahrivar 1406 / Sep 2027, language score + paper status + application-core study should be ready.
(() => {
  const KEY = 'missionOSApplicationReadiness';
  const TARGET = new Date('2027-09-01T00:00:00');
  const DEEPENING = new Date('2028-08-01T00:00:00');
  const state = JSON.parse(localStorage.getItem(KEY) || '{}');
  state.language = state.language || 'not_started';
  state.paper = state.paper || 'not_started';
  state.core = state.core || 'in_progress';
  const save = () => localStorage.setItem(KEY, JSON.stringify(state));
  const days = d => Math.max(0, Math.ceil((d - new Date()) / 86400000));
  const labels = {
    language: {not_started:'Not started',in_progress:'In progress',ready:'Score obtained'},
    paper: {not_started:'Not started',in_progress:'In progress',ready:'Submit-ready / Under review'},
    core: {in_progress:'In progress',ready:'Application-core ready'}
  };
  function statusText(k){ return labels[k][state[k]] || state[k]; }
  function readiness(){
    const ready = state.language === 'ready' && state.paper === 'ready' && state.core === 'ready';
    return {ready, targetDays:days(TARGET), deepeningDays:days(DEEPENING)};
  }
  function mount(){
    if(document.getElementById('applicationReadinessPanel')) return;
    const hero = document.querySelector('#dashboard .hero');
    if(!hero) return;
    const panel = document.createElement('div');
    panel.id='applicationReadinessPanel';
    panel.className='panel';
    panel.style.marginTop='14px';
    panel.innerHTML=`<h2 style="margin-bottom:8px">Application Readiness</h2>
      <div class="subtitle" style="margin-bottom:12px">Target: Sep 2027 · Deepening horizon: Aug 2028</div>
      <div id="readinessRows"></div>
      <div class="actions" style="margin-top:12px">
        <button class="ghost" data-readiness="language">Language</button>
        <button class="ghost" data-readiness="paper">Paper</button>
        <button class="ghost" data-readiness="core">Core curriculum</button>
      </div>`;
    hero.parentNode.insertBefore(panel, hero.nextSibling);
    render();
    panel.addEventListener('click', e => {
      const b=e.target.closest('[data-readiness]'); if(!b) return;
      const k=b.dataset.readiness;
      const options=k==='core'?['in_progress','ready']:['not_started','in_progress','ready'];
      const current=options.indexOf(state[k]);
      state[k]=options[(current+1)%options.length]; save(); render();
    });
  }
  function render(){
    const root=document.getElementById('readinessRows'); if(!root) return;
    const r=readiness();
    root.innerHTML=`<div class="deadline"><div><div class="dlabel">TOEFL / IELTS</div><div class="dsub">${statusText('language')}</div></div><div class="when">${r.targetDays} days</div></div>
      <div class="deadline"><div><div class="dlabel">Research paper</div><div class="dsub">${statusText('paper')}</div></div><div class="when">${r.targetDays} days</div></div>
      <div class="deadline"><div><div class="dlabel">Application-core curriculum</div><div class="dsub">${statusText('core')}</div></div><div class="when">${r.targetDays} days</div></div>
      <div class="deadline"><div><div class="dlabel">Deepening horizon</div><div class="dsub">Strengthen advanced areas after application readiness</div></div><div class="when">${r.deepeningDays} days</div></div>
      <div class="subtitle" style="margin-top:10px">${r.ready?'Application-ready target achieved.':'The Director must protect these three outcomes before the target.'}</div>`;
  }
  window.missionOSApplicationReadiness = {state, readiness, save, render};
  const boot=()=>{mount();render();};
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot); else boot();
})();
