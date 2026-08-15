// Strategic deadlines for Mission OS.
// Dates are intentionally separated from curriculum so priorities can change
// without rewriting the curriculum itself.

export const APP_DEADLINES = [
  {
    id: 'MENTOR-03',
    date: '2026-09-04',
    label: 'Third mentoring session',
    priority: 'checkpoint',
    requirements: ['Stable Mission execution', 'Workload feedback', 'Blocker report']
  },
  {
    id: 'APPLICATION-READY',
    date: '2027-09-01',
    label: 'Application-ready target',
    priority: 'hard',
    requirements: [
      'TOEFL or IELTS obtained',
      'Paper submitted or under review',
      'Application-critical subjects prepared'
    ]
  },
  {
    id: 'ATLAS-HORIZON',
    date: '2027-10-01',
    label: 'Original Atlas horizon',
    priority: 'horizon',
    requirements: ['Core curriculum substantially developed']
  },
  {
    id: 'DEEPENING-HORIZON',
    date: '2028-08-01',
    label: 'Advanced deepening horizon',
    priority: 'horizon',
    requirements: ['Strengthen selected advanced subjects', 'Portfolio depth']
  }
];
