// Mission Learning OS — Application Readiness Engine v0.2
// Target: END of Shahrivar 1406 / 22 Sep 2027.
// Deepening horizon: END of Mordad 1407 / 21 Aug 2028.
(() => {
  const KEY = 'missionOSApplicationReadiness';
  const TARGET = new Date('2027-09-22T23:59:59');
  const DEEPENING = new Date('2028-08-21T23:59:59');
  const state = JSON.parse(localStorage.getItem(KEY) || '{}');
  state.language = state.language || 'not_started';
  state.paper = state.paper || 'not_started';
  // Core readiness is Director-controlled, not a user toggle.
  state.core = 'in_progress';
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
      <div class="subtitle" style="margin-bottom:12px">Target: end of Shahrivar 1406 · Deepening horizon: end of Mordad 1407</div>
      <div id="readinessRows"></div>
      <div class="subtitle" style="margin-top:12px">The Director controls readiness. You execute the queue; no curriculum decision is required here.</div>`;
    hero.parentNode.insertBefore(panel, hero.nextSibling);
    render();
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
