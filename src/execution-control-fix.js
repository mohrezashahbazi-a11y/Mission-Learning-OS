// Mission Learning OS — Execution Control Fix v1.1
// Uses event delegation so controls survive Execution Engine re-renders.
(() => {
  const run = (fn) => { try { if (typeof fn === 'function') fn(); } catch (e) { console.error('Execution Control:', e); } };

  document.addEventListener('click', (event) => {
    const button = event.target?.closest?.('#executionEnginePanel button');
    if (!button) return;

    if (button.id === 'engineStart') {
      event.preventDefault();
      event.stopImmediatePropagation();
      const api = window.missionOSExecutionEngine;
      run(() => api?.start?.());
      return;
    }

    if (button.id === 'engineDone') {
      event.preventDefault();
      event.stopImmediatePropagation();
      if (button.disabled) return;
      const api = window.missionOSExecutionEngine;
      run(() => api?.completeStep?.());
    }
  }, true);

  window.missionOSExecutionControlFix = { version: '1.1' };
})();
