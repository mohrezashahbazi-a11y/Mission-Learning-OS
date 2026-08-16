// Mission Learning OS — Priority Display v1.0
// Keeps the Director's internal blocked sentinel out of the UI.
(() => {
  const INTERNAL_BLOCKED = -1000000000;
  function clean(root=document) {
    root.querySelectorAll('.mission .score').forEach(el => {
      const raw = (el.textContent || '').trim();
      const match = raw.match(/^Priority\s+(-?\d+)$/i);
      if (!match) return;
      const value = Number(match[1]);
      if (value <= INTERNAL_BLOCKED) {
        el.textContent = 'Locked';
        el.title = 'This Mission is locked until its prerequisite is completed.';
      }
    });
  }
  function boot() {
    clean();
    const observer = new MutationObserver(() => clean());
    observer.observe(document.body, {childList:true, subtree:true});
    window.missionOSPriorityDisplay = {version:'1.0', clean};
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
