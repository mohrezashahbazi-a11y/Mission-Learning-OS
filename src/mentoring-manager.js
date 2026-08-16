// Mission Learning OS — mentoring session manager v0.3
// User-controlled dates for mentoring sessions. Persists locally in the browser.
(() => {
  const KEY = 'missionOS.mentoringSessions.v1';
  const INITIAL = [{ number: 3, date: '2026-09-04', title: 'Third mentoring session', notes: '' }];
  const load = () => {
    try { const raw = localStorage.getItem(KEY); const data = raw ? JSON.parse(raw) : INITIAL; return Array.isArray(data) ? data.sort((a,b) => a.number - b.number) : INITIAL.slice(); }
    catch { return INITIAL.slice(); }
  };
  const save = rows => localStorage.setItem(KEY, JSON.stringify(rows));
  const fmt = date => window.missionOSDate?.format?.(date) ?? date;
  const daysUntil = date => window.missionOSClock?.daysUntil?.(date) ?? Math.max(0, Math.ceil((new Date(date + 'T23:59:59+03:30') - new Date()) / 86400000));
  const nextNumber = rows => rows.length ? Math.max(...rows.map(x => Number(x.number) || 0)) + 1 : 1;
  function ensurePanel() {
    const timeline = document.getElementById('timeline');
    if (!timeline || document.getElementById('mentoringManager')) return document.getElementById('mentoringManager');
    const panel = document.createElement('div'); panel.className = 'panel'; panel.id = 'mentoringManager'; panel.style.marginBottom = '18px'; timeline.insertBefore(panel, timeline.firstElementChild); return panel;
  }
  function render() {
    const panel = ensurePanel(); if (!panel) return; const rows = load();
    panel.innerHTML = `<div class="eyebrow">Mentoring</div><h2 style="margin-top:5px">Mentoring Sessions</h2><div class="subtitle" style="margin-bottom:14px">You control the dates. Add the next session whenever it is confirmed; the Director will use the nearest upcoming session as a strategic checkpoint.</div><div id="mentorRows"></div><div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:14px"><input id="mentorDate" type="date" style="background:#0d1523;border:1px solid var(--line);border-radius:9px;padding:9px 10px"><button class="primary" id="addMentor">Add next session</button></div>`;
    const list = document.getElementById('mentorRows');
    rows.forEach((r, i) => {
      const div = document.createElement('div'); div.className = 'deadline';
      div.innerHTML = `<div><div class="dlabel">Session ${r.number}${r.title && r.title !== `Mentoring session ${r.number}` ? ' — ' + r.title.replace(/^Third mentoring session$/,'') : ''}</div><div class="dsub">${fmt(r.date)}${r.notes ? ' · ' + r.notes : ''}</div></div><div style="display:flex;align-items:center;gap:10px"><div class="when">${daysUntil(r.date)} days</div><button class="ghost mentorDelete" data-i="${i}" style="padding:5px 8px">×</button></div>`;
      list.appendChild(div);
    });
    document.getElementById('addMentor').onclick = () => { const input = document.getElementById('mentorDate'); if (!input.value) return; const current = load(); const n = nextNumber(current); current.push({ number:n, date:input.value, title:`Mentoring session ${n}`, notes:'' }); save(current); render(); syncStrategicDeadline(); };
    panel.querySelectorAll('.mentorDelete').forEach(btn => btn.onclick = () => { const current = load(); current.splice(Number(btn.dataset.i),1); save(current); render(); syncStrategicDeadline(); });
  }
  function syncStrategicDeadline() {
    const rows = load().filter(x => x.date >= new Date().toISOString().slice(0,10)); const next = rows.sort((a,b) => a.date.localeCompare(b.date))[0]; const root = document.getElementById('deadlineList'); if (!root) return;
    root.querySelectorAll('.deadline').forEach(el => { if (!el.classList.contains('mentoring-deadline') && /mentoring session|third mentoring session/i.test(el.querySelector('.dlabel')?.textContent || '')) el.remove(); });
    if (!next) { root.querySelector('.mentoring-deadline')?.remove(); return; }
    const existing = root.querySelector('.mentoring-deadline'); const html = `<div class="deadline mentoring-deadline"><div><div class="dlabel">Mentoring session ${next.number}</div><div class="dsub">Execution rhythm + blockers · ${fmt(next.date)}</div></div><div class="when">${daysUntil(next.date)} days</div></div>`;
    if (existing) existing.outerHTML = html; else root.insertAdjacentHTML('afterbegin', html);
  }
  window.missionOSMentoring = { load, save, render, next: () => load().filter(x => x.date >= new Date().toISOString().slice(0,10)).sort((a,b) => a.date.localeCompare(b.date))[0] || null };
  const boot = () => { render(); setTimeout(syncStrategicDeadline,250); setInterval(syncStrategicDeadline,60000); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',boot); else boot();
})();
