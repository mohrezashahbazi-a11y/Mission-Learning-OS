// Mission Learning OS — Time-Aware Greeting v1.2
// Targets the actual Dashboard heading and re-applies after the App Shell renders.
(() => {
  const getPhrase = (hour) => {
    const sets = {
      morning: ['Good morning', 'Good morning — let’s make today count.', 'Good morning — one focused step is enough to begin.'],
      afternoon: ['Good afternoon', 'Good afternoon — keep the momentum going.', 'Good afternoon — let’s make the next block count.'],
      evening: ['Good evening', 'Good evening — let’s finish the day with intention.', 'Good evening — a small win still counts.'],
      night: ['Good night', 'Good night — protect tomorrow by ending today well.', 'Good night — rest is part of the system too.']
    };
    const period = hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : hour < 22 ? 'evening' : 'night';
    const options = sets[period];
    return options[Math.floor(new Date().getDate() / 3) % options.length];
  };

  const render = () => {
    const target = document.querySelector('#dashboard .top .title');
    if (!target) return false;
    const hour = new Date().getHours();
    target.textContent = `${getPhrase(hour)}, MohammadReza.`;
    target.dataset.greetingReady = 'true';
    return true;
  };

  window.missionOSTimeGreeting = { render };
  const boot = () => {
    render();
    setInterval(render, 60000);
    // Re-apply after runtime/controllers have rendered the dashboard.
    [300, 1000, 2500].forEach(ms => setTimeout(render, ms));
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
  window.addEventListener('load', render);
})();
