// Mission Learning OS — Priority & Deadline Engine v0.1
// Keeps curriculum content separate from execution logic.

export const STRATEGIC_DATES = {
  journeyStart: '2026-08-16',
  mentoring3: '2026-09-04',
  applicationReady: '2027-09-01',
  atlasHorizon: '2027-10-01',
  deepeningHorizon: '2028-08-01'
};

export const MILESTONES = [
  { id: 'MENTOR-03', date: STRATEGIC_DATES.mentoring3, label: 'Third mentoring checkpoint', kind: 'checkpoint' },
  { id: 'APP-READY', date: STRATEGIC_DATES.applicationReady, label: 'Application-ready: language + paper + required subjects', kind: 'hard' },
  { id: 'ATLAS-END', date: STRATEGIC_DATES.atlasHorizon, label: 'Original Atlas horizon', kind: 'horizon' },
  { id: 'DEEPEN', date: STRATEGIC_DATES.deepeningHorizon, label: 'Advanced deepening horizon', kind: 'horizon' }
];

const clamp = (n, min = 0, max = 100) => Math.max(min, Math.min(max, n));
const daysUntil = (date, now = new Date()) => Math.ceil((new Date(date) - now) / 86400000);

/**
 * Score a mission. Higher score means it should be considered earlier.
 * Factors: requiredness, deadline proximity, dependency readiness, strategic value,
 * and energy/time fit. This is intentionally deterministic for v0.1.
 */
export function scoreMission(mission, context = {}) {
  const now = context.now || new Date();
  const energy = Number(context.energy ?? 7);
  const availableMinutes = Number(context.availableMinutes ?? 120);
  const days = mission.deadline ? daysUntil(mission.deadline, now) : Infinity;

  let score = mission.isRequired ? 25 : 0;
  score += Number(mission.strategicWeight ?? 0) * 4;

  if (Number.isFinite(days)) {
    if (days <= 7) score += 45;
    else if (days <= 30) score += 32;
    else if (days <= 90) score += 20;
    else if (days <= 180) score += 10;
  }

  if (mission.dependsOn?.length) {
    const completed = new Set(context.completedIds || []);
    const ready = mission.dependsOn.every(id => completed.has(id));
    if (!ready) return -Infinity;
    score += 12;
  }

  const minutes = Number(mission.suggestedMinutes ?? 30);
  if (minutes <= availableMinutes) score += 8;
  else score -= Math.min(18, (minutes - availableMinutes) / 5);

  const requiredEnergy = Number(mission.energyRequired ?? 5);
  if (requiredEnergy <= energy) score += 8;
  else score -= Math.min(20, (requiredEnergy - energy) * 5);

  return clamp(score, -100, 150);
}

export function rankMissions(missions, context = {}) {
  return missions
    .filter(m => m.status !== 'completed' && m.status !== 'skipped')
    .map(m => ({ ...m, priorityScore: scoreMission(m, context) }))
    .filter(m => m.priorityScore !== -Infinity)
    .sort((a, b) => b.priorityScore - a.priorityScore || (a.order ?? 9999) - (b.order ?? 9999));
}

export function chooseDailyQueue(missions, context = {}) {
  const ranked = rankMissions(missions, context);
  const maxMinutes = Number(context.availableMinutes ?? 120);
  const energy = Number(context.energy ?? 7);
  const queue = [];
  let used = 0;

  for (const mission of ranked) {
    const minutes = Number(mission.suggestedMinutes ?? 30);
    if (used + minutes > maxMinutes) continue;
    if (Number(mission.energyRequired ?? 5) > energy + 2) continue;
    queue.push(mission);
    used += minutes;
    if (queue.length >= Number(context.coreMissionLimit ?? 4)) break;
  }

  return queue;
}

export function deadlineStatus(date, now = new Date()) {
  const days = daysUntil(date, now);
  if (days < 0) return { days, state: 'overdue' };
  if (days <= 7) return { days, state: 'critical' };
  if (days <= 30) return { days, state: 'near' };
  return { days, state: 'on_track' };
}
