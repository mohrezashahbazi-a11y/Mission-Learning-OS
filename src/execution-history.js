// Mission Learning OS — Execution History v0.2
// Observes actual execution time without changing the user's planned mission duration.
// Also exposes a compact history view so execution data becomes visible and useful.
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

  function missionTitle(id) {
    const mission = window.MISSIONS?.find?.(m => m.id === id);
    if (mission) return mission.title;
    return id;
  }

  function renderHistory() {
    const review = document.getElementById('review');
    if (!review) return;
    let panel = document.getElementById('executionHistoryPanel');
    if (!panel) {
      panel = document.createElement('div');
      panel.id = 'executionHistoryPanel';
      panel.className = 'panel';
      panel.style.marginTop = '18px';
      const grid = review.querySelector('.grid');
      if (grid) grid.insertAdjacentElement('afterend', panel);
    }

    const history = Array.isArray(read().executionHistory) ? read().executionHistory : [];
    if (!history.length) {
      panel.innerHTML = '<h2>Execution History</h2><div class="empty">No completed execution sessions recorded yet.</div>';
      return;
    }

    const totalActual = history.reduce((sum, x) => sum + Number(x.actualMinutes || 0), 0);
    const totalPlanned = history.reduce((sum, x) => sum + Number(x.plannedMinutes || 0), 0);
    const recent = history.slice(-8).reverse();
    const ratio = totalPlanned ? Math.round((totalActual / totalPlanned) * 100) : 0;

    panel.innerHTML = `<h2>Execution History</h2>
      <div class="statgrid" style="margin-bottom:14px">
        <div class="stat"><div class="num">${history.length}</div><div class="label">Sessions</div></div>
        <div class="stat"><div class="num">${totalActual}m</div><div class="label">Actual time</div></div>
        <div class="stat"><div class="num">${ratio}%</div><div class="label">Actual / planned</div></div>
      </div>
      <div>${recent.map(x => `<div class="deadline">
        <div><div class="dlabel">${missionTitle(x.id)}</div><div class="dsub">Planned ${Number(x.plannedMinutes || 0)} min · Actual ${Number(x.actualMinutes || 0)} min</div></div>
        <div class="when">${new Date(x.completedAt).toLocaleDateString('en-GB')}</div>
      </div>`).join('')}</div>`;
  }

  window.missionOSExecutionHistory = { start, render: renderHistory };

  const boot = () => {
    setInterval(() => {
      const state = read();
      finishIfNeeded(state);
      renderHistory();
    }, 1500);
    renderHistory();
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
