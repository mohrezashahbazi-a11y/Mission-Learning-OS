// Mission Learning OS — Analytics UI v1.2
(() => {
  const read = k => { try { return JSON.parse(localStorage.getItem(k) || 'null'); } catch { return null; } };
  const fallbackAnalytics = () => {
    const state = read('missionOSState') || {};
    const history = Array.isArray(state.executionHistory) ? state.executionHistory : [];
    const mastery = read('missionOSMastery') || {};
    const active = read('missionOSActiveSession');
    const dayKey = v => {
      const d = new Date(v);
      if (Number.isNaN(d.getTime())) return null;
      return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Tehran' }).format(d);
    };
    const last7Days = () => {
      const out = {}, now = new Date();
      for (let i = 6; i >= 0; i--) {
        const d = new Date(now);
        d.setDate(now.getDate() - i);
        out[dayKey(d)] = 0;
      }
      history.forEach(x => {
        const k = dayKey(x.completedAt || x.startedAt);
        if (k && k in out) out[k] += Number(x.actualMinutes || 0);
      });
      if (active?.status === 'running') {
        const mins = Math.max(0, (Date.now() - new Date(active.activeStartedAt).getTime()) / 60000);
        const k = dayKey(new Date());
        if (k && k in out) out[k] += mins;
      }
      return out;
    };
    const planned = history.reduce((n, x) => n + Number(x.plannedMinutes || 0), 0);
    const actual = history.reduce((n, x) => n + Number(x.actualMinutes || 0), 0);
    const subjects = {};
    history.forEach(x => {
      const id = x.id || 'unknown';
      if (!subjects[id]) subjects[id] = { id, sessions: 0, minutes: 0 };
      subjects[id].sessions++;
      subjects[id].minutes += Number(x.actualMinutes || 0);
    });
    return {
      summary: () => ({ sessions: history.length, actualMinutes: Math.round(actual), plannedMinutes: planned, completionRate: planned ? Math.round(actual / planned * 100) : 0 }),
      last7Days,
      subjects: () => Object.values(subjects),
      mastery: () => mastery
    };
  };

  const render = () => {
    const a = window.missionOSAnalytics || fallbackAnalytics();
    const review = document.getElementById('review');
    if (!review) return;
    let p = document.getElementById('analyticsPanel');
    if (!p) {
      p = document.createElement('div');
      p.id = 'analyticsPanel';
      p.className = 'panel';
      p.style.marginTop = '18px';
      const anchor = review.querySelector('.top');
      if (anchor) anchor.insertAdjacentElement('afterend', p);
      else review.prepend(p);
    }
    const s = a.summary(), days = a.last7Days(), subs = a.subjects(), m = a.mastery();
    const bars = Object.entries(days).map(([d,v]) => `<div style="display:flex;gap:10px;align-items:center;margin:6px 0"><span style="width:92px;font-size:12px">${d}</span><div style="height:10px;flex:1;background:var(--line,#ddd);border-radius:99px;overflow:hidden"><div style="height:100%;width:${Math.min(100,Math.round(v/120*100))}%;background:currentColor"></div></div><b>${Math.round(v)}m</b></div>`).join('');
    const subjectRows = subs.length ? subs.map(x => `<div class="stat"><div class="num">${Math.round(x.minutes)}m</div><div class="label">${x.id} · ${x.sessions} sessions</div></div>`).join('') : '<div class="empty">No completed Mission sessions yet.</div>';
    const masteryRows = Object.entries(m).length ? Object.entries(m).map(([id,x]) => `<div class="stat"><div class="num">${Math.round(Number(x.score||0))}%</div><div class="label">${id} · ${x.level||'not_started'}</div></div>`).join('') : '<div class="empty">No evidence-based Mastery data yet.</div>';
    p.innerHTML = `<h2>Analytics</h2><div class="statgrid"><div class="stat"><div class="num">${s.actualMinutes}m</div><div class="label">Active study time</div></div><div class="stat"><div class="num">${s.sessions}</div><div class="label">Completed sessions</div></div><div class="stat"><div class="num">${s.completionRate}%</div><div class="label">Time vs plan</div></div></div><h3 style="margin-top:20px">Last 7 days</h3>${bars}<h3 style="margin-top:20px">By Mission</h3><div class="statgrid">${subjectRows}</div><h3 style="margin-top:20px">Mastery</h3><div class="statgrid">${masteryRows}</div>`;
  };

  window.missionOSAnalyticsUI = { version: '1.2', render };
  const boot = () => { render(); setInterval(render, 10000); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();