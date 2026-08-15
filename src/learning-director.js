// Mission Learning OS — Personal Learning Director v0.1
// The Director owns planning decisions; the learner only executes the queue.

import { buildUnifiedDailyQueue } from './unified-daily-queue.js';

export const DIRECTOR_RULES = {
  zeroDecision: true,
  coreMissionLimit: 4,
  bonusOnlyOnRequest: true,
  challengeOnlyOnRequest: true,
  neverInventUnconfirmedCurriculum: true,
  protectApplicationMilestone: true,
  protectRecoveryFromOverload: true
};

export function evaluateExecution({ mission, completion = {}, feedback = {} } = {}) {
  const delivered = Boolean(completion.delivered);
  const checkPassed = completion.checkPassed !== false;
  const blocked = Boolean(feedback.blocked);
  const energy = Number(feedback.energy ?? 7);

  if (blocked) return { outcome: 'blocked', action: 'adapt_and_unblock', energy };
  if (!delivered) return { outcome: 'incomplete', action: 'resume_or_split', energy };
  if (!checkPassed) return { outcome: 'needs_review', action: 'schedule_targeted_review', energy };
  return { outcome: 'completed', action: 'advance_queue', energy };
}

export function directorDecision({
  missions = [],
  reviewPlans = [],
  completedIds = [],
  energy = 7,
  availableMinutes = null,
  today = new Date(),
  lastExecution = null
} = {}) {
  const evaluation = lastExecution
    ? evaluateExecution(lastExecution)
    : { outcome: 'no_previous_execution', action: 'start_queue', energy };

  const queue = buildUnifiedDailyQueue({
    missions,
    reviewPlans,
    completedIds,
    energy,
    availableMinutes,
    today
  });

  return {
    directorVersion: '0.1',
    decisionMode: 'AUTONOMOUS_EXECUTION',
    evaluation,
    today: {
      queue: queue.queue,
      totalMinutes: queue.totalMinutes,
      workloadProfile: queue.workloadProfile,
      dueReviewCount: queue.dueReviewCount,
      blockedCount: queue.blockedCount
    },
    userInstruction: queue.queue.length
      ? `Execute Mission 1 now. Then continue in order. Do not redesign the plan.`
      : 'No executable mission is currently available. The Director must resolve the queue before asking the learner to choose.',
    decisionPolicy: {
      learnerChoosesMission: false,
      learnerChoosesOrder: false,
      learnerChoosesWorkload: false,
      learnerMayReportEnergy: true,
      learnerMayReportBlocker: true,
      learnerMayRequestBonus: true,
      learnerMayRequestChallenge: true
    }
  };
}

export function createDailyReportTemplate() {
  return {
    energy: null,
    missionsCompleted: [],
    whereStuck: '',
    importantError: '',
    mostImportantThingLearned: '',
    systemFeedback: ''
  };
}
