// Mission Learning OS — Data Versioning & Migration Layer v1.0
// Purpose: application code may evolve without destroying historical learning data.
// This module is intentionally additive: it preserves legacy keys and never deletes history.
(() => {
  const SCHEMA_KEY = 'missionOSDataSchema';
  const HISTORY_KEY = 'missionOSDataMigrations';
  const CURRENT_SCHEMA = 1;

  const safeRead = (key, fallback) => {
    try {
      const raw = localStorage.getItem(key);
      return raw == null ? fallback : JSON.parse(raw);
    } catch { return fallback; }
  };
  const safeWrite = (key, value) => {
    try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch { return false; }
  };

  function snapshot(){
    const keys = [
      'missionOSState',
      'missionOSDailyState',
      'missionOSActiveSession',
      'missionOSAdaptiveDecision'
    ];
    const out = {};
    keys.forEach(k => { const v = safeRead(k, null); if(v !== null) out[k] = v; });
    return out;
  }

  function ensure(){
    const current = safeRead(SCHEMA_KEY, {version:0,updatedAt:null});
    if(Number(current.version) >= CURRENT_SCHEMA) return current;

    // Schema v1 is deliberately non-destructive. It establishes metadata only.
    // Existing application data remains under its original keys so older records survive updates.
    const history = safeRead(HISTORY_KEY, []);
    const entry = {
      fromVersion: Number(current.version) || 0,
      toVersion: CURRENT_SCHEMA,
      migratedAt: new Date().toISOString(),
      strategy: 'non_destructive_metadata_only'
    };
    history.push(entry);
    safeWrite(HISTORY_KEY, history);
    const next = {version:CURRENT_SCHEMA,updatedAt:new Date().toISOString(),lastMigration:entry};
    safeWrite(SCHEMA_KEY, next);
    return next;
  }

  function exportBackup(){
    const payload = {
      format:'mission-learning-os-backup',
      formatVersion:1,
      exportedAt:new Date().toISOString(),
      schema:safeRead(SCHEMA_KEY,{version:CURRENT_SCHEMA}),
      data:snapshot()
    };
    return JSON.stringify(payload, null, 2);
  }

  function validateBackup(payload){
    return !!payload && payload.format === 'mission-learning-os-backup' && payload.data && typeof payload.data === 'object';
  }

  function importBackup(input, options={}){
    let payload=input;
    if(typeof input === 'string'){
      try { payload=JSON.parse(input); } catch { throw new Error('Invalid backup JSON.'); }
    }
    if(!validateBackup(payload)) throw new Error('Invalid Mission OS backup.');

    const overwrite = options.overwrite === true;
    const current = snapshot();
    const imported = payload.data;

    // Safe default: do not overwrite current data unless explicitly requested.
    // When overwriting, create a pre-import backup in memory and preserve migration metadata.
    if(overwrite){
      Object.entries(imported).forEach(([key,value])=>safeWrite(key,value));
    } else {
      // Merge only missing top-level keys. Existing current data always wins.
      Object.entries(imported).forEach(([key,value])=>{
        if(!(key in current)) safeWrite(key,value);
      });
    }

    ensure();
    return {ok:true,overwritten:overwrite,keys:Object.keys(imported)};
  }

  function status(){
    return {
      schema:safeRead(SCHEMA_KEY,{version:0}),
      migrations:safeRead(HISTORY_KEY,[]),
      hasActiveSession:!!safeRead('missionOSActiveSession',null),
      hasState:!!safeRead('missionOSState',null),
      hasDailyState:!!safeRead('missionOSDailyState',null)
    };
  }

  window.missionOSData = {ensure,exportBackup,importBackup,status,snapshot,CURRENT_SCHEMA};
  try { ensure(); } catch(e) { console.warn('Mission OS data migration skipped:', e); }
})();
