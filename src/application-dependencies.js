// Mission Learning OS — Application Core dependency map v0.1
// Only dependencies already supported by the established Curriculum Source of Truth are encoded here.
(() => {
  const EDGES = [
    ['Algebra','Functions'],
    ['Functions','Trigonometry'],
    ['Trigonometry','Precalculus'],
    ['Precalculus','Calculus'],
    ['Calculus','Linear Algebra'],
    ['Linear Algebra','Numerical Modeling'],
    ['Numerical Methods','Numerical Modeling'],
    ['Numerical Modeling','FEM'],
    ['FEM','PLAXIS'],
    ['Python','NumPy'],
    ['NumPy','Pandas'],
    ['Pandas','Data Visualization'],
    ['Instrumentation','Monitoring Data'],
    ['Scientific Reading','Literature Review'],
    ['Literature Review','Scientific Writing'],
    ['Scientific Writing','Publication Workflow'],
    ['Soil Mechanics','Foundation'],
    ['Soil Mechanics','Ground Improvement'],
    ['Soil Mechanics','Retaining Structures'],
    ['Soil Mechanics','Excavation'],
    ['Soil Mechanics','Slope'],
    ['Site Investigation','Experimental Geotechnics'],
    ['Python','Data Analysis'],
    ['Data Analysis','Numerical Modeling']
  ];

  const prereqs = {};
  EDGES.forEach(([from,to]) => { (prereqs[to] ||= []).push(from); });
  const getPrerequisites = topic => prereqs[topic] || [];
  const dependsOn = (topic, prerequisite) => getPrerequisites(topic).includes(prerequisite);

  window.missionOSApplicationDependencies = {
    edges: EDGES,
    prerequisites: prereqs,
    getPrerequisites,
    dependsOn,
    status: 'confirmed_structure_with_explicitly_proposed_edges'
  };
})();
