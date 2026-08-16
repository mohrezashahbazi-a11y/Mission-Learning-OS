// Mission Learning OS — Iran clock + bilingual Gregorian/Persian calendar v0.2
// Tehran is authoritative. Dates are rendered in isolated LTR/RTL blocks so Persian order stays correct.
(() => {
  const TIME_ZONE = 'Asia/Tehran';
  const PERSIAN_DATE = new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
    timeZone: TIME_ZONE,
    year: 'numeric', month: 'long', day: 'numeric'
  });
  const GREGORIAN_DATE = new Intl.DateTimeFormat('en-GB', {
    timeZone: TIME_ZONE,
    year: 'numeric', month: 'short', day: 'numeric'
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

  const isoToDate = iso => {
    const [y, m, d] = iso.split('-').map(Number);
    return new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
  };

  const daysUntil = dateKeyValue => {
    const target = new Date(`${dateKeyValue}T23:59:59+03:30`);
    return Math.max(0, Math.ceil((target.getTime() - Date.now()) / 86400000));
  };

  const formatPersian = (date = new Date()) => PERSIAN_DATE.format(date);
  const formatGregorian = (date = new Date()) => GREGORIAN_DATE.format(date);
  const formatClock = (date = new Date()) => CLOCK.format(date);

  // Always return a visually isolated bilingual date.
  const formatBilingual = isoOrDate => {
    const date = isoOrDate instanceof Date ? isoOrDate : isoToDate(isoOrDate);
    return `<span class="date-gregorian" dir="ltr">${formatGregorian(date)}</span>` +
      `<span class="date-separator" aria-hidden="true"> · </span>` +
      `<span class="date-persian" dir="rtl" lang="fa">${formatPersian(date)}</span>`;
  };

  function render() {
    const el = document.getElementById('today');
    if (el) {
      el.innerHTML = formatBilingual(new Date());
      el.title = 'Tehran / Iran time';
      el.setAttribute('dir', 'ltr');
    }
    document.querySelectorAll('[data-iran-clock]').forEach(el => {
      el.textContent = formatClock();
    });
    document.querySelectorAll('[data-iran-date]').forEach(el => {
      el.innerHTML = `<span class="date-persian" dir="rtl" lang="fa">${formatPersian()}</span>`;
    });
  }

  // Keep the existing mentoring/deadline API compatible.
  window.missionOSDate = {
    format: formatBilingual,
    setToday: render,
    isoToDate,
    timeZone: TIME_ZONE
  };
  window.missionOSClock = {
    TIME_ZONE,
    dateKey,
    daysUntil,
    formatPersian,
    formatGregorian,
    formatClock,
    formatBilingual,
    render
  };

  const boot = () => { render(); setInterval(render, 1000); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
