// Mission Learning OS — Timeline Engine v0.2
// Confirmed planning horizons: execution starts 25 Mordad 1405; application readiness by end of Shahrivar 1406; deepening through end of Mordad 1407.
(() => {
  const MORDAD_START = new Date('2026-08-16T00:00:00');
  const APPLICATION_TARGET = new Date('2027-09-22T23:59:59');
  const DEEPENING_HORIZON = new Date('2028-08-21T23:59:59');
  const MENTOR_CHECKPOINT = new Date('2026-09-04T00:00:00');
  const ATLAS_END = new Date('2027-10-01T00:00:00');
  const daysUntil = d => Math.max(0, Math.ceil((d - new Date()) / 86400000));
  const urgency = d => {
    const n = daysUntil(d);
    if (n <= 30) return 45;
    if (n <= 90) return 30;
    if (n <= 180) return 20;
    if (n <= 365) return 10;
    return 0;
  };
  const snapshot = () => ({
    start: MORDAD_START.toISOString().slice(0,10),
    applicationTarget: APPLICATION_TARGET.toISOString().slice(0,10),
    deepeningHorizon: DEEPENING_HORIZON.toISOString().slice(0,10),
    mentorCheckpoint: MENTOR_CHECKPOINT.toISOString().slice(0,10),
    atlasEnd: ATLAS_END.toISOString().slice(0,10),
    daysToApplication: daysUntil(APPLICATION_TARGET),
    daysToDeepening: daysUntil(DEEPENING_HORIZON),
    daysToMentor: daysUntil(MENTOR_CHECKPOINT)
  });
  window.missionOSTimeline = {
    start:MORDAD_START, applicationTarget:APPLICATION_TARGET, deepeningHorizon:DEEPENING_HORIZON,
    mentorCheckpoint:MENTOR_CHECKPOINT, atlasEnd:ATLAS_END, urgency, snapshot
  };
})();
