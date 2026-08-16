// Mission Learning OS — bilingual date display v0.2
// Gregorian + Persian calendar, with Tehran as the authoritative app clock.
(() => {
  const TEHRAN = 'Asia/Tehran';
  const gregorian = new Intl.DateTimeFormat('en-GB', { timeZone: TEHRAN, day: 'numeric', month: 'short', year: 'numeric' });
  const persian = new Intl.DateTimeFormat('fa-IR-u-ca-persian', { timeZone: TEHRAN, day: 'numeric', month: 'long', year: 'numeric' });
  const isoToDate = iso => { const [y,m,d] = iso.split('-').map(Number); return new Date(Date.UTC(y, m - 1, d, 12)); };
  function format(isoOrDate) {
    const d = isoOrDate instanceof Date ? isoOrDate : isoToDate(isoOrDate);
    return `<span dir="ltr">${gregorian.format(d)}</span><span aria-hidden="true"> · </span><span dir="rtl">${persian.format(d)}</span>`;
  }
  function setToday() {
    const el = document.getElementById('today');
    if (!el) return;
    el.innerHTML = format(new Date());
    el.title = 'Tehran / Iran time';
  }
  window.missionOSDate = { format, setToday, isoToDate, timeZone: TEHRAN };
  const boot = () => { setToday(); setInterval(setToday, 60000); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
