// Mission Learning OS — Director Decision Engine v0.1
// Explains the already-ranked queue using the same observable signals: deadline, application-core value, dependencies, review urgency, energy and progress.
(() => {
  const state = () => JSON.parse(localStorage.getItem('missionOSState') || '{}');
  const readiness = () => JSON.parse(localStorage.getItem('missionOSApplicationReadiness') || '{}');
  const energyBand = e => e >= 8 ? 'high' : e >= 5 ? 'normal' : e >= 3 ? 'low' : 'recovery';
  const topMission = () => document.querySelector('#missionList .mission');
  const text = el => el?.textContent?.trim() || '';
  function decide() {
    const s = state();
    const top = topMission();
    if (!top) return {status:'no_queue'};
    const title = text(top.querySelector('.mission-title'));
    const meta = text(top.querySelector('.mission-meta'));
    const priority = text(top.querySelector('.score'));
    const factors = [];
    if (/due/i.test(meta)) factors.push('review is due');
    if (/application core/i.test(meta)) factors.push('required before application');
    if (priority) factors.push(priority.toLowerCase());
    const band = energyBand(Number(s.energy) || 7);
    factors.push(`${band} energy fit`);
    if (s.done?.length) factors.push(`${s.done.length} completed mission${s.done.length === 1 ? '' : 's'} preserved`);
    const r = readiness();
    if (r.paper === 'in_progress') factors.push('research paper is active');
    if (r.language === 'in_progress') factors.push('language target is active');
    return {status:'decided', title, meta, priority, factors, energy:band};
  }
  function render() {
    const root = document.getElementById('directorDecision');
    if (!root) return;
    const d = decide();
    if (d.status !== 'decided') { root.innerHTML = ''; return; }
    root.innerHTML = `<div class="subtitle" style="margin-top:12px"><b>Director decision:</b> ${d.title} — ${d.factors.join(' · ')}.</div>`;
  }
  window.missionOSDirector = { decide, render };
  const boot = () => { render(); setTimeout(render, 120); setInterval(render, 30000); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
