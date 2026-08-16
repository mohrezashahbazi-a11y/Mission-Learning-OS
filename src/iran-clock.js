// Mission Learning OS — Iran clock + Persian calendar v0.1
// The app's calendar day is Tehran/Iran, independent of the device timezone.
(() => {
  const TIME_ZONE = 'Asia/Tehran';
  const PERSIAN_DATE = new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
    timeZone: TIME_ZONE,
    year: 'numeric', month: 'long', day: 'numeric'
  });
  const CLOCK = new Intl.DateTimeFormat('fa-IR', {
    timeZone: TIME_ZONE,
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
  });
  const PARTS = new Intl.DateTimeFormat('en-US', {
    timeZone: TIME_ZONE, year: 'numeric', month: '2-digit', day: '2-digit'
  });

  const parts = date => Object.fromEntries(PARTS.formatToParts(date)
    .filter(x => x.type !== 'literal').map(x => [x.type, x.value]));
  const dateKey = (date = new Date()) => {
    const p = parts(date);
    return `${p.year}-${p.month}-${p.day}`;
  };
  const daysUntil = (dateKeyValue) => {
    const target = new Date(`${dateKeyValue}T23:59:59+03:30`);
    return Math.max(0, Math.ceil((target.getTime() - Date.now()) / 86400000));
  };
  const formatPersian = (date = new Date()) => PERSIAN_DATE.format(date);
  const formatClock = (date = new Date()) => CLOCK.format(date);

  function render() {
    const el = document.getElementById('today');
    if (el) el.textContent = `${formatPersian()} · ایران`;
    document.querySelectorAll('[data-iran-clock]').forEach(el => {
      el.textContent = formatClock();
    });
    document.querySelectorAll('[data-iran-date]').forEach(el => {
      el.textContent = formatPersian();
    });
  }

  window.missionOSClock = { TIME_ZONE, dateKey, daysUntil, formatPersian, formatClock, render };
  const boot = () => { render(); setInterval(render, 1000); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
