// Mission Learning OS — Application Core policy v0.1
// Source of truth for what must be sufficiently prepared by Sep 2027 vs what can deepen through Aug 2028.
(() => {
  const TARGET = '2027-09-01';
  const DEEPENING_HORIZON = '2028-08-01';

  const APPLICATION_CORE = [
    {id:'GEOTECH_FOUNDATION',domain:'Advanced Geotechnics',level:'required_before_application',outcome:'Strong working foundation in core geotechnical engineering and engineering judgment.',includes:['Soil Mechanics','Foundation','Ground Improvement','Retaining Structures','Excavation','Slope','Site Investigation','Experimental Geotechnics','Soil Mechanics Laboratory']},
    {id:'MATH_FOUNDATION',domain:'Mathematics',level:'required_before_application',outcome:'Sufficient mathematics for engineering analysis, numerical modeling and data work.',includes:['Algebra','Functions','Trigonometry','Precalculus','Calculus','Linear Algebra','Probability','Statistics']},
    {id:'NUM_FOUNDATION',domain:'Numerical Modeling',level:'required_before_application',outcome:'Working foundation in numerical modeling and FEM, with PLAXIS readiness where needed.',includes:['Numerical Modeling','FEM','Constitutive Models','PLAXIS','Verification']},
    {id:'DATA_FOUNDATION',domain:'Data Analysis',level:'required_before_application',outcome:'Practical Python/data-analysis capability for engineering data.',includes:['Python','NumPy','Pandas','Data Visualization','Instrumentation','Monitoring Data']},
    {id:'ENGLISH_APPLICATION',domain:'Technical & General English',level:'required_before_application',outcome:'TOEFL or IELTS score obtained plus functional technical English.',includes:['English Grammar in Use','Vocabulary','Technical Reading','Technical Explanation','TOEFL / IELTS Preparation']},
    {id:'RESEARCH_APPLICATION',domain:'Research Capability',level:'required_before_application',outcome:'Scientific reading/writing, literature review and a paper ready for submission or under review.',includes:['Scientific Reading','Literature Review','Scientific Writing','Research Questions','Article Critique','Publication Workflow']},
    {id:'PORTFOLIO_APPLICATION',domain:'Portfolio / Engineering Practice',level:'required_before_application',outcome:'A small set of credible engineering case studies/projects demonstrating problem → data → analysis → decision → result.',includes:['Engineering Projects','Case Studies','Numerical Projects','Engineering Reports','Research Summaries','Publication Materials']}
  ];

  const DEEPENING = [
    {domain:'AI Applications',reason:'Build depth after the application-critical foundation is secure.',includes:['Machine Learning','Prediction','Settlement Prediction','PIV Analysis','AI Workflows']},
    {domain:'BIM / GIS / Digital Engineering',reason:'Strengthen digital integration and interoperability through the longer horizon.',includes:['BIM','GIS','GeoBIM','Digital Twins','Databases','Interoperability','Revit','Navisworks','Dynamo','Civil 3D']},
    {domain:'Advanced Geotechnics',reason:'Deepen selected specialist areas after core readiness.',includes:['Geosynthetics','Rock / Rock-related Geotechnics','Earthquake / Seismic Geotechnics','Geoenvironment']},
    {domain:'Numerical Modeling',reason:'Deepen advanced constitutive modeling and soil–structure applications.',includes:['Cam Clay','Soil-Structure Interaction','Advanced Verification']},
    {domain:'Mathematics',reason:'Deepen advanced mathematics only as required by selected research/projects.',includes:['Differential Equations','Numerical Methods','Advanced Multivariable work']}
  ];

  const CORE_DOMAINS=new Set(APPLICATION_CORE.map(x=>x.domain));
  const DEEPENING_DOMAINS=new Set(DEEPENING.map(x=>x.domain));
  const getDomainPolicy=domain=>CORE_DOMAINS.has(domain)?'required_before_application':DEEPENING_DOMAINS.has(domain)?'deepening_after_application':'not_yet_classified';
  window.missionOSApplicationCore={target:TARGET,deepeningHorizon:DEEPENING_HORIZON,applicationCore:APPLICATION_CORE,deepening:DEEPENING,getDomainPolicy,isApplicationCore:domain=>getDomainPolicy(domain)==='required_before_application'};
})();
