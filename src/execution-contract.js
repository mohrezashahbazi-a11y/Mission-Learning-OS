// Mission Learning OS — Zero-Decision Execution Contract v0.1
// The user should execute; the system should decide.

export const EXECUTION_CONTRACT = {
  userDecisionLoad: 'near-zero',
  systemResponsibilities: [
    'select the next mission',
    'select mission order',
    'manage prerequisites',
    'schedule reviews',
    'respect strategic deadlines',
    'adapt workload to energy and available time',
    'choose core missions',
    'defer non-essential work when overloaded',
    'create the next mission after evaluation',
    'surface blockers only when user input is genuinely required'
  ],
  userResponsibilities: [
    'start the first card',
    'execute the instructions',
    'submit the deliverable',
    'report actual energy when asked',
    'report blockers or missing resources'
  ],
  userShouldNotNeedToDecide: [
    'what to study next',
    'which resource to use when a primary resource is already defined',
    'which mission has priority',
    'when to review a completed concept',
    'how many core missions to do',
    'how to reorder the day',
    'whether to add a new mission',
    'whether to redesign the curriculum'
  ],
  exceptionPolicy: 'Ask the user only when a decision cannot be safely inferred from the confirmed curriculum, constraints, progress, energy, deadlines, or available resources.'
};

export function executionModeMessage(queue) {
  if (!queue?.length) {
    return 'No execution card is ready. The Learning Director must resolve the queue before asking the user to choose.';
  }
  return `Start Mission ${queue[0].id}. Do not choose another card unless the system explicitly unlocks it.`;
}
