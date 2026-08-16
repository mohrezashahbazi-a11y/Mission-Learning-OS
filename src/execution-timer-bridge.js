// Mission Learning OS — Execution Timer Bridge v1.1
// Connects Mission modal state to the isolated timer.
// Deliberately avoids MutationObserver and DOM-wide rendering loops.
(() => {
  let wasOpen = false;
  let lastTitle = '';

  function sync(force = false) {
    try {
      const modal = document.getElementById('modal');
      const open = !!modal?.classList.contains('open');
      const title = document.getElementById('mtitle')?.textContent?.trim() || '';
      if (open && (force || !wasOpen || title !== lastTitle)) {
        window.missionOSExecutionHistory?.render?.();
      }
      if (!open && wasOpen) {
        window.missionOSExecutionHistory?.render?.();
      }
      wasOpen = open;
      lastTitle = title;
    } catch (_) {}
  }

  // Lightweight state polling: only reacts when modal state/title changes.
  setInterval(() => sync(false), 250);
  document.addEventListener('visibilitychange', () => sync(true));

  window.missionOSTimerBridge = { version: '1.1', sync: () => sync(true) };
})();
