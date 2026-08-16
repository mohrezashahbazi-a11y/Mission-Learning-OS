// Mission Learning OS — Execution Policy v0.1
// User preference: missions should have generous fixed execution windows.
// The Director may choose WHAT to do, but it must not invent a "sufficient" time limit.
(() => {
  const durationById = {
    'GE-01': 60,
    'EN-GRAMMAR-01': 50,
    'TECH-01': 45,
    'SYS-01': 60,
    'PY-01': 60
  };

  function apply() {
    let missions;
    try { missions = Function('return MISSIONS')(); } catch (_) { return; }
    if (!Array.isArray(missions)) return;

    missions.forEach(m => {
      if (durationById[m.id]) m.mins = durationById[m.id];
    });

    // Time is no longer a hidden constraint on the Director's queue.
    // The user receives the planned mission duration; the system chooses the order.
    try {
      const s = Function('return state')();
      s.availableMinutes = 999;
      localStorage.setItem('missionOSState', JSON.stringify(s));
    } catch (_) {}

    // Keep ranking focused on strategic factors, not an arbitrary time budget.
    window.missionOSExecutionPolicy = {
      version: '0.1',
      fixedMissionDurations: durationById,
      timeBudgetMode: 'none',
      note: 'Director chooses order; mission duration is fixed and generous.'
    };

    const subtitle = document.querySelector('#missions .top .subtitle');
    if (subtitle) subtitle.textContent = 'Priority is calculated from deadlines, requiredness, prerequisites and energy. Mission duration is fixed.';

    if (typeof window.render === 'function') window.render();
    if (window.missionOSNextAction?.render) window.missionOSNextAction.render();
    if (window.missionOSDirector?.render) window.missionOSDirector.render();
  }

  const boot = () => { apply(); setTimeout(apply, 200); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
