// Mission Learning OS — Execution Control Fix v1.2
// Uses event delegation so controls survive Execution Engine re-renders.
(() => {
  const missionId = () => {
    const title = document.getElementById('mtitle')?.textContent?.trim() || '';
    const map = {
      'The Beginning of Geotechnical Engineering':'GE-01',
      'Soil Mechanics — Three-Phase System':'GE-02',
      'Soil Mechanics — Unit Weights':'GE-03',
      'Present Simple':'EN-GRAMMAR-01',
      'Present Continuous':'EN-GRAMMAR-02',
      'Geotechnical Vocabulary Set 01':'TECH-01',
      'Geotechnical Vocabulary Set 02':'TECH-02',
      'System → Elements → Interconnections → Purpose':'SYS-01',
      'Systems Thinking × Geotechnics':'SYS-02',
      'Python — Session 1':'PY-01',
      'Python — Session 2':'PY-02'
    };
    return map[title] || null;
  };
  const run = (fn) => { try { if (typeof fn === 'function') fn(); } catch (e) { console.error('Execution Control:', e); } };

  document.addEventListener('click', (event) => {
    const button = event.target?.closest?.('#executionEnginePanel button');
    if (!button) return;

    if (button.id === 'engineStart') {
      event.preventDefault();
      event.stopImmediatePropagation();
      const api = window.missionOSExecutionEngine;
      const id = missionId();
      if (id) run(() => api?.start?.(id));
      return;
    }

    if (button.id === 'engineDone') {
      event.preventDefault();
      event.stopImmediatePropagation();
      if (button.disabled) return;
      const api = window.missionOSExecutionEngine;
      const id = missionId();
      if (id) run(() => api?.completeStep?.(id));
    }
  }, true);

  window.missionOSExecutionControlFix = { version: '1.2' };
})();
