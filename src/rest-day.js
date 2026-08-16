// Mission Learning OS — rest day policy v0.1
// A missed day never creates a catch-up debt. Rest is an explicit, valid state.
(() => {
  const KEY = 'missionOSRestDays.v1';
  const read = () => {
    try { const x = JSON.parse(localStorage.getItem(KEY) || '[]'); return Array.isArray(x) ? x : []; }
    catch { return []; }
  };
  const save = x => localStorage.setItem(KEY, JSON.stringify(x));
  const today = () => window.missionOSClock?.dateKey?.() || new Date().toISOString().slice(0,10);
  const isRest = () => read().includes(today());

  function setRest(value) {
    const key = today();
    const rows = read().filter(x => x !== key);
    if (value) rows.push(key);
    save(rows);
    render();
    window.missionOSNextAction?.render?.();
  }

  function ensureButton() {
    const toolbar = document.querySelector('#missions .toolbar');
    if (!toolbar || document.getElementById('restDayBtn')) return;
    const btn = document.createElement('button');
    btn.id = 'restDayBtn';
    btn.className = 'ghost';
    toolbar.appendChild(btn);
    btn.onclick = () => setRest(!isRest());
  }

  function render() {
    ensureButton();
    const rest = isRest();
    const btn = document.getElementById('restDayBtn');
    if (btn) btn.textContent = rest ? 'Resume today' : 'Rest day today';

    const objective = document.getElementById('objective');
    const list = document.getElementById('missionList');
    const next = document.getElementById('nextAction');
    if (rest) {
      if (objective) objective.textContent = 'Rest day. No catch-up required.';
      if (list) list.innerHTML = '<div class="empty">Today is intentionally off. The Director will resume the queue tomorrow.</div>';
      if (next) next.style.display = 'none';
    } else {
      if (next) next.style.display = '';
    }
  }

  window.missionOSRestDay = { isRest, setRest, today, read };
  const boot = () => { render(); setInterval(render, 1500); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
