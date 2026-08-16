// Mission Learning OS — deterministic bilingual date display v0.3
// Gregorian + Persian calendar, with Tehran as the authoritative app clock.
(() => {
  const TEHRAN = 'Asia/Tehran';
  const gregorianParts = new Intl.DateTimeFormat('en-GB', { timeZone: TEHRAN, day: '2-digit', month: 'short', year: 'numeric' });
  const persianParts = new Intl.DateTimeFormat('fa-IR-u-ca-persian', { timeZone: TEHRAN, day: 'numeric', month: 'long', year: 'numeric' });
  const isoToDate = iso => { const [y,m,d] = iso.split('-').map(Number); return new Date(Date.UTC(y, m - 1, d, 12)); };
  const parts = (formatter, date) => Object.fromEntries(formatter.formatToParts(date).filter(x => x.type !== 'literal').map(x => [x.type, x.value]));
  const formatPersian = date => { const p = parts(persianParts, date); return `${p.day} ${p.month} ${p.year}`; };
  const formatGregorian = date => { const p = parts(gregorianParts, date); return `${p.day} ${p.month} ${p.year}`; };
  function format(isoOrDate) {
    const d = isoOrDate instanceof Date ? isoOrDate : isoToDate(isoOrDate);
    return `<span class="date-gregorian" dir="ltr">${formatGregorian(d)}</span><span class="date-separator" aria-hidden="true"> · </span><span class="date-persian" dir="rtl">${formatPersian(d)}</span>`;
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
