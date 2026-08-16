// Mission Learning OS — Execution History v0.3
// Tracks active study time only. Pauses are excluded from actual execution time.
(() => {
  const KEY = 'missionOSState';
  const ACTIVE = 'missionOSActiveSession';
  const read = () => JSON.parse(localStorage.getItem(KEY) || '{}');
  const write = state => localStorage.setItem(KEY, JSON.stringify(state));

  const loadActive = () => {
    try { return JSON.parse(localStorage.getItem(ACTIVE) || 'null'); } catch { return null; }
  };
  const saveActive = x => localStorage.setItem(ACTIVE, JSON.stringify(x));
  const clearActive = () => localStorage.removeItem(ACTIVE);

  function start(id, plannedMinutes) {
    const current = loadActive();
    if (current?.id === id && current.status === 'running') return current;
    const session = {
      id,
      plannedMinutes: Number(plannedMinutes || 0),
      startedAt: new Date().toISOString(),
      activeStartedAt: new Date().toISOString(),
      accumulatedMs: 0,
      status: 'running'
    };
    saveActive(session);
    renderTimer();
    return session;
  }

  function pause() {
    const s = loadActive();
    if (!s || s.status !== 'running') return;
    s.accumulatedMs += Date.now() - new Date(s.activeStartedAt).getTime();
    s.status = 'paused';
    s.pausedAt = new Date().toISOString();
    saveActive(s);
    renderTimer();
  }

  function resume() {
    const s = loadActive();
    if (!s || s.status !== 'paused') return;
    s.activeStartedAt = new Date().toISOString();
    s.status = 'running';
    delete s.pausedAt;
    saveActive(s);
    renderTimer();
  }

  function activeMs(s) {
    if (!s) return 0;
    const base = Number(s.accumulatedMs || 0);
    return base + (s.status === 'running' && s.activeStartedAt ? Date.now() - new Date(s.activeStartedAt).getTime() : 0);
  }

  function finish() {
    const s = loadActive();
    if (!s) return null;
    const actualMinutes = Math.max(1, Math.round(activeMs(s) / 60000));
    const state = read();
    state.executionHistory = Array.isArray(state.executionHistory) ? state.executionHistory : [];
    state.executionHistory.push({
      id: s.id,
      startedAt: s.startedAt,
      completedAt: new Date().toISOString(),
      plannedMinutes: s.plannedMinutes,
      actualMinutes,
      activeMilliseconds: activeMs(s)
    });
    write(state);
    clearActive();
    renderTimer();
    renderHistory();
    return actualMinutes;
  }

  function missionTitle(id) {
    const mission = window.MISSIONS?.find?.(m => m.id === id);
    return mission?.title || id;
  }

  function formatMs(ms) {
    const total = Math.floor(ms / 1000);
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;
    return h ? `${h}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}` : `${m}:${String(s).padStart(2,'0')}`;
  }

  function ensureTimerPanel() {
    const dashboard = document.getElementById('dashboard');
    if (!dashboard || document.getElementById('executionTimerPanel')) return document.getElementById('executionTimerPanel');
    const panel = document.createElement('div');
    panel.id = 'executionTimerPanel';
    panel.className = 'panel';
    panel.style.marginTop = '18px';
    const grid = dashboard.querySelector('.grid');
    if (grid) grid.insertAdjacentElement('afterend', panel);
    return panel;
  }

  function renderTimer() {
    const panel = ensureTimerPanel();
    if (!panel) return;
    const s = loadActive();
    if (!s) { panel.innerHTML = '<h2>Execution Timer</h2><div class="empty">No active mission. Start a mission to begin tracking active study time.</div>'; return; }
    const elapsed = activeMs(s);
    const paused = s.status === 'paused';
    panel.innerHTML = `<h2>Execution Timer</h2>
      <div class="subtitle">${missionTitle(s.id)}</div>
      <div style="font-size:38px;font-weight:800;margin:12px 0">${formatMs(elapsed)}</div>
      <div class="chips"><span class="chip">${paused ? 'Paused' : 'Running'}</span><span class="chip">Planned ${s.plannedMinutes} min</span></div>
      <div class="actions" style="margin-top:14px">
        <button class="${paused ? 'primary' : 'ghost'}" id="execPauseResume">${paused ? 'Resume' : 'Pause'}</button>
        <button class="primary" id="execFinish">Finish Mission</button>
      </div>`;
    document.getElementById('execPauseResume').onclick = paused ? resume : pause;
    document.getElementById('execFinish').onclick = finish;
  }

  function renderHistory() {
    const review = document.getElementById('review');
    if (!review) return;
    let panel = document.getElementById('executionHistoryPanel');
    if (!panel) {
      panel = document.createElement('div'); panel.id = 'executionHistoryPanel'; panel.className = 'panel'; panel.style.marginTop = '18px';
      const grid = review.querySelector('.grid'); if (grid) grid.insertAdjacentElement('afterend', panel);
    }
    const history = Array.isArray(read().executionHistory) ? read().executionHistory : [];
    if (!history.length) { panel.innerHTML = '<h2>Execution History</h2><div class="empty">No completed execution sessions recorded yet.</div>'; return; }
    const totalActual = history.reduce((sum,x)=>sum+Number(x.actualMinutes||0),0);
    const totalPlanned = history.reduce((sum,x)=>sum+Number(x.plannedMinutes||0),0);
    const ratio = totalPlanned ? Math.round(totalActual/totalPlanned*100) : 0;
    const recent = history.slice(-8).reverse();
    panel.innerHTML = `<h2>Execution History</h2><div class="statgrid" style="margin-bottom:14px"><div class="stat"><div class="num">${history.length}</div><div class="label">Sessions</div></div><div class="stat"><div class="num">${totalActual}m</div><div class="label">Active time</div></div><div class="stat"><div class="num">${ratio}%</div><div class="label">Active / planned</div></div></div><div>${recent.map(x=>`<div class="deadline"><div><div class="dlabel">${missionTitle(x.id)}</div><div class="dsub">Planned ${x.plannedMinutes} min · Active ${x.actualMinutes} min</div></div><div class="when">${new Date(x.completedAt).toLocaleDateString('en-GB')}</div></div>`).join('')}</div>`;
  }

  window.missionOSExecutionHistory = { start, pause, resume, finish, render: renderHistory, active: loadActive };
  const boot = () => { renderTimer(); renderHistory(); setInterval(() => { renderTimer(); renderHistory(); }, 1000); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();