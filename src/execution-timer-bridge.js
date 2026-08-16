// Mission Learning OS — Execution Timer Bridge v1.0
// Connects Mission modal events to the isolated timer without observing the DOM.
(() => {
  function sync() {
    try { window.missionOSExecutionHistory?.render?.(); } catch (_) {}
  }
  document.addEventListener('click', (event) => {
    if (event.target.closest('[data-runtime-id]')) {
      setTimeout(sync, 0);
    }
  });
  document.getElementById('close')?.addEventListener('click', () => setTimeout(sync, 0));
  window.missionOSTimerBridge = { version: '1.0', sync };
})();
