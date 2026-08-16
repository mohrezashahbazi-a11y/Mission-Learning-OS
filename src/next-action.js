// Mission Learning OS — Next Action controller v0.2
// Turns the Director's ranked mission into one explicit action. The user executes; the system decides.
(() => {
  const q = sel => document.querySelector(sel);
  const text = el => el?.textContent?.trim() || '';

  function ensureRoot() {
    let root = document.getElementById('nextAction');
    if (root) return root;
    const hero = q('#dashboard .hero');
    if (!hero) return null;
    root = document.createElement('div');
    root.id = 'nextAction';
    root.style.cssText = 'margin-top:18px;padding:16px;border:1px solid #34436a;border-radius:14px;background:#0d1523';
    hero.appendChild(root);
    return root;
  }

  function render() {
    const root = ensureRoot();
    const mission = q('#missionList .mission');
    if (!root || !mission) return;

    const title = text(mission.querySelector('.mission-title'));
    const meta = text(mission.querySelector('.mission-meta'));
    const score = text(mission.querySelector('.score'));
    const id = mission.dataset.runtimeId || '';
    const planned = Number((meta.match(/(\d+) min/) || [])[1] || 0);
    root.innerHTML = `
      <div style="font-size:10px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:#7c8cff">YOUR NEXT ACTION</div>
      <div style="font-size:19px;font-weight:800;margin-top:6px">${title}</div>
      <div class="subtitle" style="margin-top:4px">${meta}</div>
      <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-top:10px">
        <span class="chip">${score || 'Selected by Director'}</span>
        <button id="startNextAction" class="primary" style="margin-left:auto">START MISSION</button>
      </div>`;

    const btn = q('#startNextAction');
    if (btn) btn.onclick = () => {
      window.missionOSExecutionHistory?.start(id, planned);
      mission.click();
    };
  }

  window.missionOSNextAction = { render };
  const boot = () => {
    render();
    setTimeout(render, 250);
    setInterval(render, 1500);
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
