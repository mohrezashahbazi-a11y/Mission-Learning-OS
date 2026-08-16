// Mission Learning OS — Execution History v0.1
// Observes actual execution time without changing the user's planned mission duration.
(() => {
  const KEY = 'missionOSState';
  const read = () => JSON.parse(localStorage.getItem(KEY) || '{}');
  const write = state => localStorage.setItem(KEY, JSON.stringify(state));
  const activeKey = 'missionOSActiveSession';

  function start(id, plannedMinutes) {
    localStorage.setItem(activeKey, JSON.stringify({ id, startedAt: new Date().toISOString(), plannedMinutes }));
  }

  function finishIfNeeded(state) {
    const raw = localStorage.getItem(activeKey);
    if (!raw) return;
    let active;
    try { active = JSON.parse(raw); } catch { return; }
    if (!active?.id || !state.done?.includes(active.id)) return;

    state.executionHistory = Array.isArray(state.executionHistory) ? state.executionHistory : [];
    if (!state.executionHistory.some(x => x.id === active.id && x.startedAt === active.startedAt)) {
      const elapsedMinutes = Math.max(1, Math.round((Date.now() - new Date(active.startedAt).getTime()) / 60000));
      state.executionHistory.push({
        id: active.id,
        startedAt: active.startedAt,
        completedAt: new Date().toISOString(),
        plannedMinutes: Number(active.plannedMinutes || 0),
        actualMinutes: elapsedMinutes
      });
      write(state);
    }
    localStorage.removeItem(activeKey);
  }

  window.missionOSExecutionHistory = { start };

  const boot = () => setInterval(() => finishIfNeeded(read()), 1500);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
