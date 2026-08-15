// Mission Learning OS — Strategic Deadlines Controller v0.1
// One source of truth for Dashboard deadline cards.
(() => {
  const daysUntil = d => Math.max(0, Math.ceil((new Date(d) - new Date()) / 86400000));
  const MENTOR = '2026-09-04T00:00:00';
  const APPLICATION = '2027-09-22T23:59:59';
  const ATLAS = '2027-10-01T00:00:00';
  const DEEPENING = '2028-08-21T23:59:59';

  function render() {
    const root = document.getElementById('deadlineList');
    if (!root) return;
    root.innerHTML = `
      <div class="deadline"><div><div class="dlabel">Third mentoring session</div><div class="dsub">Execution rhythm + blockers</div></div><div class="when">${daysUntil(MENTOR)} days</div></div>
      <div class="deadline"><div><div class="dlabel">Application-ready target</div><div class="dsub">TOEFL/IELTS + paper + required subjects</div></div><div class="when">${daysUntil(APPLICATION)} days</div></div>
      <div class="deadline"><div><div class="dlabel">Atlas horizon</div><div class="dsub">End of Mehr 1406</div></div><div class="when">${daysUntil(ATLAS)} days</div></div>
      <div class="deadline"><div><div class="dlabel">Deepening horizon</div><div class="dsub">Strengthen selected advanced areas</div></div><div class="when">${daysUntil(DEEPENING)} days</div></div>`;
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render);
  else render();
  window.missionOSStrategicDeadlines = { render, dates: { MENTOR, APPLICATION, ATLAS, DEEPENING } };
})();
