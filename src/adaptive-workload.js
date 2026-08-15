// Mission Learning OS — Adaptive Workload Engine v0.1
// Goal: remove daily planning decisions from the user.

export const WORKLOAD_PROFILES = {
  high:    { min: 8, coreLimit: 4, maxMinutes: 150, difficultyPenalty: 0 },
  normal:  { min: 5, coreLimit: 4, maxMinutes: 120, difficultyPenalty: 0 },
  low:    { min: 3, coreLimit: 3, maxMinutes: 75, difficultyPenalty: 8 },
  recovery:{ min: 0, coreLimit: 2, maxMinutes: 45, difficultyPenalty: 15 }
};

export function getWorkloadProfile(energy = 7) {
  if (energy >= 8) return 'high';
  if (energy >= 5) return 'normal';
  if (energy >= 3) return 'low';
  return 'recovery';
}

export function buildWorkloadContext({ energy = 7, availableMinutes = null } = {}) {
  const profileName = getWorkloadProfile(Number(energy));
  const profile = WORKLOAD_PROFILES[profileName];
  return {
    energy: Number(energy),
    profile: profileName,
    coreMissionLimit: profile.coreLimit,
    availableMinutes: availableMinutes == null ? profile.maxMinutes : Math.min(Number(availableMinutes), profile.maxMinutes),
    difficultyPenalty: profile.difficultyPenalty
  };
}

export function adaptMission(mission, context) {
  const difficulty = Number(mission.difficulty ?? 2);
  const energyRequired = Number(mission.energyRequired ?? 3);
  const minutes = Number(mission.suggestedMinutes ?? 30);

  if (context.profile === 'recovery') {
    return {
      ...mission,
      suggestedMinutes: Math.min(20, minutes),
      difficulty: Math.min(2, difficulty),
      energyRequired: Math.min(2, energyRequired),
      adaptiveMode: 'minimum-viable-progress'
    };
  }

  if (context.profile === 'low' && (difficulty > 2 || energyRequired > context.energy)) {
    return {
      ...mission,
      suggestedMinutes: Math.min(25, minutes),
      difficulty: Math.max(1, difficulty - 1),
      adaptiveMode: 'lightened'
    };
  }

  return { ...mission, adaptiveMode: 'standard' };
}

export function buildDailyWorkload(missions, { energy = 7, availableMinutes = null, completedIds = [] } = {}) {
  const context = buildWorkloadContext({ energy, availableMinutes });
  const completed = new Set(completedIds);

  const eligible = missions
    .filter(m => !completed.has(m.id) && m.status !== 'skipped')
    .map(m => adaptMission(m, context))
    .filter(m => Number(m.energyRequired ?? 3) <= Number(energy) + 1)
    .sort((a, b) => {
      const aDeadline = a.deadline ? new Date(a.deadline).getTime() : Infinity;
      const bDeadline = b.deadline ? new Date(b.deadline).getTime() : Infinity;
      return (Number(b.strategicWeight ?? 0) - Number(a.strategicWeight ?? 0)) || (aDeadline - bDeadline) || ((a.order ?? 9999) - (b.order ?? 9999));
    });

  const queue = [];
  let totalMinutes = 0;
  for (const mission of eligible) {
    if (queue.length >= context.coreMissionLimit) break;
    const minutes = Number(mission.suggestedMinutes ?? 30);
    if (totalMinutes + minutes > context.availableMinutes) continue;
    queue.push(mission);
    totalMinutes += minutes;
  }

  return {
    context,
    queue,
    totalMinutes,
    message: profileMessage(context.profile)
  };
}

function profileMessage(profile) {
  if (profile === 'high') return 'Full workload: execute the planned core queue.';
  if (profile === 'low') return 'Reduced workload: keep the path moving with lighter missions.';
  if (profile === 'recovery') return 'Recovery workload: minimum viable progress only. Do not redesign the plan.';
  return 'Normal workload: execute the core queue without extra planning.';
}
