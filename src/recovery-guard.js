// Mission Learning OS — Recovery Guard v0.1
// Clears only the legacy execution-session key left by the unstable timer.
(() => {
  try { localStorage.removeItem('missionOSActiveSession'); } catch (_) {}
})();
