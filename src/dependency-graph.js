// Mission Learning OS — Dependency Graph v0.1
// Explicit prerequisites only. Unknown relationships stay unblocked rather than invented.

export const DEPENDENCIES = {
  'EN-GRAMMAR-01': [],
  'GE-01': [],
  'SYS-01': [],
  'PY-01': [],
  'TECH-01': ['GE-01'],

  // Confirmed structural chains from the Curriculum Source of Truth.
  'MATH-FUNCTIONS': ['MATH-ALGEBRA'],
  'MATH-TRIG': ['MATH-FUNCTIONS'],
  'MATH-PRECALC': ['MATH-TRIG'],
  'MATH-CALC': ['MATH-PRECALC'],
  'MATH-LINEAR': ['MATH-CALC'],
  'MATH-DE': ['MATH-CALC'],
  'MATH-NUMERICAL': ['MATH-CALC'],

  'DATA-NUMPY': ['PY-CORE'],
  'DATA-PANDAS': ['DATA-NUMPY'],
  'DATA-ANALYSIS': ['DATA-PANDAS'],

  'NUM-MODELING': ['MATH-NUMERICAL'],
  'NUM-FEM': ['NUM-MODELING'],
  'NUM-PLAXIS': ['NUM-FEM'],

  'AI-ML': ['DATA-ANALYSIS'],
  'AI-PREDICTION': ['AI-ML'],
  'AI-SETTLEMENT': ['AI-PREDICTION'],
};

export function getDependencies(id) {
  return DEPENDENCIES[id] || [];
}

export function isReady(id, completedIds = []) {
  const completed = new Set(completedIds);
  return getDependencies(id).every(dep => completed.has(dep));
}

export function getBlockedMissions(missions, completedIds = []) {
  return missions.filter(m => !isReady(m.id, completedIds));
}

export function getReadyMissions(missions, completedIds = []) {
  return missions.filter(m => isReady(m.id, completedIds));
}

export function getNextUnlockedMissions(missions, completedIds = []) {
  const completed = new Set(completedIds);
  return missions.filter(m => {
    if (completed.has(m.id)) return false;
    const deps = getDependencies(m.id);
    return deps.length > 0 && deps.every(dep => completed.has(dep));
  });
}

export function explainBlock(id, completedIds = []) {
  const completed = new Set(completedIds);
  return getDependencies(id).filter(dep => !completed.has(dep));
}
