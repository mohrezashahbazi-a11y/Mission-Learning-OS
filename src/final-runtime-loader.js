// Mission Learning OS — Final Web Runtime Loader v1.0
// Loads the full production runtime used by the web build before packaging.
(() => {
  const files = [
    'luxury-theme.js','supabase-config.js','supabase-client.js','application-core.js','application-dependencies.js','curriculum-source-of-truth.js','data-versioning.js','daily-state.js','date-display.js','deadline-sync.js','strategic-deadlines.js','timeline.js','execution-policy.js','execution-control-fix.js','recovery-guard.js','runtime.js','review-engine.js','review-runtime.js','execution-engine.js','execution-history.js','execution-guide.js','execution-guide-v2.js','execution-guide-help.js','execution-timer-bridge.js','next-action.js','priority-display.js','mastery-engine.js','mastery-evidence-adapter.js','mastery-ui.js','cloud-foundation.js','google-drive-auth.js','google-drive-sync.js','google-drive-sync-ui.js','application-readiness.js','mentoring-manager.js','director-engine.js','daily-log-editor.js','rest-day.js','fresh-start.js','time-aware-greeting.js','iran-clock.js','ui-cleanup.js'
  ];
  const load = src => new Promise((resolve) => {
    const normalized = `src/${src}`;
    if (document.querySelector(`script[data-final-runtime="${src}"]`) || document.querySelector(`script[src="${normalized}"]`)) return resolve();
    const s = document.createElement('script');
    s.src = normalized;
    s.dataset.finalRuntime = src;
    s.onload = () => resolve();
    s.onerror = () => { console.warn(`Mission OS runtime module failed to load: ${src}`); resolve(); };
    document.head.appendChild(s);
  });
  (async () => {
    for (const file of files) await load(file);
    window.missionOSFinalRuntimeLoaded = true;
    window.dispatchEvent(new Event('missionos-final-runtime-ready'));
  })();
})();
