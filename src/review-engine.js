// Mission Learning OS — Spaced Review Engine v0.1
// Base schedule: 1 / 3 / 7 / 14 / 30 days.

export const REVIEW_INTERVALS = [1, 3, 7, 14, 30];

export function buildReviewSchedule(completedAt, intervals = REVIEW_INTERVALS) {
  const start = new Date(completedAt);
  return intervals.map((days, index) => {
    const date = new Date(start);
    date.setDate(date.getDate() + days);
    return {
      reviewNumber: index + 1,
      intervalDays: days,
      dueDate: date.toISOString().slice(0, 10),
      status: 'pending'
    };
  });
}

export function createReviewPlan(mission, completedAt = new Date()) {
  return {
    id: `REVIEW-${mission.id}`,
    type: 'Review',
    sourceMissionId: mission.id,
    title: `Review: ${mission.title}`,
    subject: mission.subject,
    reviewSchedule: buildReviewSchedule(completedAt),
    suggestedMinutes: Math.min(20, Math.max(10, Math.round((mission.suggestedMinutes || 30) * 0.4))),
    energyRequired: Math.min(4, mission.energyRequired || 2),
    isRequired: true,
    strategicWeight: mission.strategicWeight || 1
  };
}

export function getDueReviews(reviewPlans, today = new Date()) {
  const todayKey = today.toISOString().slice(0, 10);
  return reviewPlans.flatMap(plan =>
    plan.reviewSchedule
      .filter(r => r.status === 'pending' && r.dueDate <= todayKey)
      .map(r => ({
        ...plan,
        reviewNumber: r.reviewNumber,
        dueDate: r.dueDate,
        priorityBoost: r.dueDate < todayKey ? 20 : 12
      }))
  );
}

export function completeReview(reviewPlan, reviewNumber, reviewedAt = new Date()) {
  const reviewed = new Date(reviewedAt);
  const schedule = reviewPlan.reviewSchedule.map(item =>
    item.reviewNumber === reviewNumber
      ? { ...item, status: 'completed', completedAt: reviewed.toISOString() }
      : item
  );
  return { ...reviewPlan, reviewSchedule: schedule };
}

export function mergeReviewsIntoQueue(missions, dueReviews) {
  return [...missions, ...dueReviews].sort((a, b) => {
    const boostA = a.priorityBoost || 0;
    const boostB = b.priorityBoost || 0;
    return boostB - boostA;
  });
}
