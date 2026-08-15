// Mission Learning OS — strategic deadline display sync v0.2
// Single display source for Dashboard Strategic Deadlines.
(() => {
  const TARGETS = [
    {label:'Third mentoring session', sub:'Execution rhythm + blockers', date:'2026-09-04T00:00:00'},
    {label:'Application-ready target', sub:'TOEFL/IELTS + paper + required subjects · end of Shahrivar 1406', date:'2027-09-22T23:59:59'},
    {label:'Atlas horizon', sub:'End of Mehr 1406', date:'2027-10-01T00:00:00'},
    {label:'Deepening horizon', sub:'Strengthen selected advanced areas · end of Mordad 1407', date:'2028-08-21T23:59:59'}
  ];
  const daysUntil = d => Math.max(0, Math.ceil((new Date(d) - new Date()) / 86400000));
  function render(){
    const root=document.getElementById('deadlineList');
    if(!root)return;
    root.innerHTML=TARGETS.map(r=>`<div class="deadline"><div><div class="dlabel">${r.label}</div><div class="dsub">${r.sub}</div></div><div class="when">${daysUntil(r.date)} days</div></div>`).join('');
  }
  const boot=()=>{render();setInterval(render,60000);};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
  window.missionOSDeadlineSync={render,targets:TARGETS};
})();
