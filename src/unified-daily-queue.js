// Mission Learning OS — Unified Daily Queue v0.1
// Combines prerequisites, reviews, deadlines, strategic priority and adaptive workload.

import { isReady } from './dependency-graph.js';
import { getDueReviews } from './review-engine.js';
import { buildDailyWorkload } from './adaptive-workload.js';
import { scoreMission } from './mission-engine.js';

export function buildUnifiedDailyQueue({
  missions = [],
  reviewPlans = [],
  completedIds = [],
  energy = 7,
  availableMinutes = null,
  today = new Date()
} = {}) {
  const completed = new Set(completedIds);

  // 1. Never expose a blocked mission as today's work.
  const readyMissions = missions.filter(m => !completed.has(m.id) && isReady(m.id, completedIds));

  // 2. Pull reviews that are actually due.
  const dueReviews = getDueReviews(reviewPlans, today);

  // 3. Reviews are first-class work, but do not blindly overwhelm the day.
  const candidates = [...readyMissions, ...dueReviews].map(item => ({
    ...item,
    strategicWeight: Number(item.strategicWeight ?? 0) + Number(item.priorityBoost ?? 0) / 10
  }));

  // 4. Rank candidates using the same deterministic priority logic.
  const ranked = candidates
    .map(item => ({
      ...item,
      priorityScore: scoreMission(item, {
        now: today,
        energy,
        availableMinutes: availableMinutes ?? 120,
        completedIds
      }) + (item.priorityBoost || 0)
    }))
    .sort((a, b) => b.priorityScore - a.priorityScore || (a.order ?? 9999) - (b.order ?? 9999));

  // 5. Let adaptive workload choose the actual executable amount.
  const workload = buildDailyWorkload(ranked, {
    energy,
    availableMinutes,
    completedIds
  });

  return {
    generatedAt: today.toISOString(),
    energy,
    availableMinutes: workload.context.availableMinutes,
    workloadProfile: workload.context.profile,
    queue: workload.queue.map((mission, index) => ({
      ...mission,
      queuePosition: index + 1,
      action: index === 0 ? 'START_NOW' : 'NEXT'
    })),
    totalMinutes: workload.totalMinutes,
    blockedCount: missions.filter(m => !completed.has(m.id) && !isReady(m.id, completedIds)).length,
    dueReviewCount: dueReviews.length,
    instruction: 'Execute queue in order. Do not redesign the plan.'
  };
}
