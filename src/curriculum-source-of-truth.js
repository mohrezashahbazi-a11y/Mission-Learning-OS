// Mission Learning OS — Curriculum Source of Truth v0.1
// Only confirmed domains/topics are represented here.
// Application Core is prioritized before Advanced Growth.

export const CURRICULUM = [
  { id: 'GEOTECH', domain: 'Advanced Geotechnics', phase: 'application-core', subjects: ['Soil Mechanics','Foundation','Ground Improvement','Retaining Structures','Excavation','Slope','Geosynthetics','Rock / Rock-related Geotechnics','Earthquake / Seismic Geotechnics','Geoenvironment','Site Investigation','Experimental Geotechnics','Soil Mechanics Laboratory'] },
  { id: 'MATH', domain: 'Mathematics', phase: 'application-core', subjects: ['Algebra','Functions','Trigonometry','Precalculus','Calculus','Differential Equations','Linear Algebra','Probability','Statistics','Numerical Methods'] },
  { id: 'NUM', domain: 'Numerical Modeling', phase: 'application-core', subjects: ['Numerical Modeling','FEM','PLAXIS','Constitutive Models','Cam Clay','Soil-Structure Interaction','Verification'] },
  { id: 'DATA', domain: 'Data Analysis', phase: 'application-core', subjects: ['Excel','Python','NumPy','Pandas','Data Visualization','Time Series','Instrumentation','Monitoring Data'] },
  { id: 'DIGITAL', domain: 'BIM / GIS / Digital Engineering', phase: 'application-core', subjects: ['BIM','GIS','GeoBIM','Digital Twins','Databases','Interoperability','Revit','Navisworks','Dynamo','Civil 3D'] },
  { id: 'AI', domain: 'AI Applications', phase: 'advanced-growth', subjects: ['AI in Geotechnics','Machine Learning','Prediction','Settlement Prediction','PIV Analysis','AI Workflows'] },
  { id: 'ENGLISH', domain: 'Technical & General English', phase: 'application-core', subjects: ['Technical English','Geotechnical Vocabulary','Technical Reading','Technical Explanation','English Grammar in Use','Present Simple','Present Continuous','Present Perfect','Present Perfect Continuous','Past Tenses','Future Forms','TOEFL / IELTS Preparation'] },
  { id: 'RESEARCH', domain: 'Research Capability', phase: 'application-core', subjects: ['Scientific Reading','Literature Review','Scientific Writing','Research Thinking','Critical Thinking','Research Trends','Article Critique','Research Questions','Publication Workflow'] },
  { id: 'PORTFOLIO', domain: 'Portfolio / Engineering Practice', phase: 'application-core', subjects: ['Engineering Projects','Case Studies','Numerical Projects','Engineering Reports','Research Summaries','Publication Materials'] },
  { id: 'SYSTEMS', domain: 'Systems Thinking', phase: 'application-core', subjects: ['System','Elements','Interconnections','Purpose','Systems Thinking × Geotechnics'] }
];

export const CURRENT_QUEUE = [
  { id:'GE-01', order:1, type:'Learn', title:'The Beginning of Geotechnical Engineering', subject:'Advanced Geotechnics', chapter:'Das — Chapter 1', suggestedMinutes:35, difficulty:2, energyRequired:3, isRequired:true, strategicWeight:5, deadline:'2026-09-04', dependsOn:[] },
  { id:'EN-GRAMMAR-01', order:2, type:'Practice', title:'Present Simple', subject:'General English', suggestedMinutes:30, difficulty:2, energyRequired:2, isRequired:true, strategicWeight:5, deadline:'2027-09-01', dependsOn:[] },
  { id:'TECH-01', order:3, type:'Learn', title:'Geotechnical Vocabulary Set 01', subject:'Technical English', suggestedMinutes:20, difficulty:2, energyRequired:2, isRequired:true, strategicWeight:4, deadline:'2027-09-01', dependsOn:['GE-01'] },
  { id:'SYS-01', order:4, type:'Systems Thinking', title:'System → Elements → Interconnections → Purpose', subject:'Systems Thinking', suggestedMinutes:30, difficulty:2, energyRequired:3, isRequired:true, strategicWeight:3, deadline:'2026-09-04', dependsOn:[] },
  { id:'PY-01', order:5, type:'Practice', title:'Python — Session 1', subject:'Data Analysis', suggestedMinutes:35, difficulty:2, energyRequired:3, isRequired:true, strategicWeight:4, deadline:'2027-09-01', dependsOn:[] }
];
