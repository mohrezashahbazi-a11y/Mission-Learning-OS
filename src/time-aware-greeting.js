// Mission Learning OS — Time-Aware Greeting v1.3
// Tehran-time authoritative, varied by time of day, and resilient to Dashboard re-renders.
(() => {
  const TIME_ZONE = 'Asia/Tehran';
  const sets = {
    morning: ['Good morning', 'Good morning — let’s make today count.', 'Good morning — one focused step is enough to begin.'],
    afternoon: ['Good afternoon', 'Good afternoon — keep the momentum going.', 'Good afternoon — let’s make the next block count.'],
    evening: ['Good evening', 'Good evening — let’s finish the day with intention.', 'Good evening — a small win still counts.'],
    night: ['Good night', 'Good night — protect tomorrow by ending today well.', 'Good night — rest is part of the system too.']
  };

  const tehranHour = (date = new Date()) => Number(new Intl.DateTimeFormat('en-US', {
    timeZone: TIME_ZONE, hour: 'numeric', hour12: false
  }).format(date));

  const periodFor = hour => hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : hour < 22 ? 'evening' : 'night';

  const phraseFor = (period, date = new Date()) => {
    const options = sets[period];
    // Rotate naturally during the day rather than showing the same sentence forever.
    const day = Number(new Intl.DateTimeFormat('en-US', {timeZone: TIME_ZONE, day: 'numeric'}).format(date));
    const block = Math.floor(tehranHour(date) / 4);
    return options[(day + block) % options.length];
  };

  const render = () => {
    const target = document.querySelector('#dashboard .top .title');
    if (!target) return false;
    const now = new Date();
    const period = periodFor(tehranHour(now));
    target.textContent = `${phraseFor(period, now)}, MohammadReza.`;
    target.dataset.greetingReady = 'true';
    target.dataset.greetingPeriod = period;
    return true;
  };

  window.missionOSTimeGreeting = { render, tehranHour, periodFor };

  const boot = () => {
    render();
    setInterval(render, 30000);
    // Runtime controllers can repaint the Dashboard after startup; keep the greeting authoritative.
    [100, 300, 700, 1200, 2000, 3000].forEach(ms => setTimeout(render, ms));
    const observer = new MutationObserver(() => {
      const target = document.querySelector('#dashboard .top .title');
      if (target && target.dataset.greetingReady !== 'true') render();
    });
    observer.observe(document.body, {childList:true, subtree:true, characterData:true});
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
  window.addEventListener('load', render);
})();
