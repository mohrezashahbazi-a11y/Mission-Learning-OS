// Mission Learning OS — Time-Aware Greeting v1.1
// Updates the real dashboard greeting and keeps it synchronized with local device time.
(() => {
  const getGreeting = (hour) => {
    if (hour >= 5 && hour < 12) return 'Good morning';
    if (hour >= 12 && hour < 17) return 'Good afternoon';
    if (hour >= 17 && hour < 22) return 'Good evening';
    return 'Good night';
  };

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
    // The dashboard currently renders this as #dashboard .title.
    // Prefer a dedicated marker when present, then fall back to the real title.
    const target = document.querySelector('#dashboard .title[data-greeting]') || document.querySelector('#dashboard .top .title');
    if (!target) return false;
    const hour = new Date().getHours();
    const name = target.dataset.name || 'MohammadReza';
    target.textContent = `${getPhrase(hour)}, ${name}.`;
    target.dataset.greetingReady = 'true';
    return true;
  };

  window.missionOSTimeGreeting = { render, getGreeting };
  const boot = () => {
    render();
    setInterval(render, 60000);
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
  window.addEventListener('load', render);
})();
