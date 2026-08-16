// Mission Learning OS — Supabase client bootstrap
(() => {
  const cfg = window.MISSION_SUPABASE_CONFIG;
  if (!cfg?.url || !cfg?.publishableKey || !window.supabase?.createClient) return;
  window.missionSupabase = window.supabase.createClient(cfg.url, cfg.publishableKey, {
    auth: { autoRefreshToken: true, persistSession: true, detectSessionInUrl: true }
  });
})();
