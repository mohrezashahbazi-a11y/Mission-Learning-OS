// Mission Learning OS — Director Decision Engine v0.1
// Explains the already-ranked queue using deadline, application-core value, dependencies, review urgency, energy and progress.
(() => {
  const state = () => JSON.parse(localStorage.getItem('missionOSState') || '{}');
  const readiness = () => JSON.parse(localStorage.getItem('missionOSApplicationReadiness') || '{}');
  const energyBand = e => e >= 8 ? 'high' : e >= 5 ? 'normal' : e >= 3 ? 'low' : 'recovery';
  const topMission = () => document.querySelector('#missionList .mission');
  const text = el => el?.textContent?.trim() || '';
  function ensureRoot() {
    let root = document.getElementById('directorDecision');
    if (root) return root;
    const hero = document.querySelector('#dashboard .hero');
    if (!hero) return null;
    root = document.createElement('div');
    root.id = 'directorDecision';
    hero.appendChild(root);
    return root;
  }
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
    factors.push(`${energyBand(Number(s.energy) || 7)} energy fit`);
    if (s.done?.length) factors.push(`${s.done.length} completed`);
    const r = readiness();
    if (r.paper === 'in_progress') factors.push('research paper active');
    if (r.language === 'in_progress') factors.push('language target active');
    return {status:'decided', title, meta, priority, factors, energy:energyBand(Number(s.energy) || 7)};
  }
  function render() {
    const root = ensureRoot();
    if (!root) return;
    const d = decide();
    root.innerHTML = d.status === 'decided'
      ? `<div class="subtitle" style="margin-top:12px"><b>Director decision:</b> ${d.title} — ${d.factors.join(' · ')}.</div>`
      : '';
  }
  window.missionOSDirector = { decide, render };
  const boot = () => { render(); setTimeout(render, 150); setInterval(render, 30000); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
