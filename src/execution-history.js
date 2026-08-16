// Mission Learning OS — Execution Timer v1.0
// Stable timer: one state store, one clock tick, no MutationObserver, no render loop.
(() => {
  const KEY = 'missionOSState';
  const ACTIVE = 'missionOSActiveSession';
  const PLANNED = { 'GE-01':60,'GE-02':60,'GE-03':60,'EN-GRAMMAR-01':50,'EN-GRAMMAR-02':50,'TECH-01':45,'TECH-02':45,'SYS-01':60,'SYS-02':60,'PY-01':60,'PY-02':60 };
  const TITLES = { 'The Beginning of Geotechnical Engineering':'GE-01','Soil Mechanics — Three-Phase System':'GE-02','Soil Mechanics — Unit Weights':'GE-03','Present Simple':'EN-GRAMMAR-01','Present Continuous':'EN-GRAMMAR-02','Geotechnical Vocabulary Set 01':'TECH-01','Geotechnical Vocabulary Set 02':'TECH-02','System → Elements → Interconnections → Purpose':'SYS-01','Systems Thinking × Geotechnics':'SYS-02','Python — Session 1':'PY-01','Python — Session 2':'PY-02' };
  const read = () => { try{return JSON.parse(localStorage.getItem(KEY)||'{}')}catch{return{}} };
  const write = s => localStorage.setItem(KEY, JSON.stringify(s));
  const load = () => { try{return JSON.parse(localStorage.getItem(ACTIVE)||'null')}catch{return null} };
  const save = s => localStorage.setItem(ACTIVE, JSON.stringify(s));
  const clear = () => localStorage.removeItem(ACTIVE);
  const idFromModal = () => TITLES[document.getElementById('mtitle')?.textContent?.trim()||''] || null;
  const title = id => Object.keys(TITLES).find(k=>TITLES[k]===id) || id;
  const elapsed = s => !s ? 0 : Number(s.accumulatedMs||0) + (s.status==='running' && s.activeStartedAt ? Date.now()-Date.parse(s.activeStartedAt) : 0);
  const fmt = ms => { const t=Math.max(0,Math.floor(ms/1000)), h=Math.floor(t/3600), m=Math.floor(t%3600/60), s=t%60; return h?`${h}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`:`${m}:${String(s).padStart(2,'0')}`; };

  function start(id, minutes){
    if(!id) return null;
    const current=load();
    if(current){
      if(current.id===id) return current;
      alert(`A mission is already running: ${title(current.id)}.`);
      return null;
    }
    const now=new Date().toISOString();
    const s={id, plannedMinutes:Number(minutes||PLANNED[id]||60), startedAt:now, activeStartedAt:now, accumulatedMs:0, status:'running'};
    save(s); render(); return s;
  }
  function pause(){ const s=load(); if(!s||s.status!=='running')return; s.accumulatedMs=elapsed(s); s.status='paused'; s.pausedAt=new Date().toISOString(); save(s); render(); }
  function resume(){ const s=load(); if(!s||s.status!=='paused')return; s.activeStartedAt=new Date().toISOString(); s.status='running'; delete s.pausedAt; save(s); render(); }
  function finish(){
    const s=load(); if(!s)return null;
    if(!confirm('Finish this Mission and record the active study time?'))return null;
    const ms=elapsed(s), state=read();
    state.executionHistory=Array.isArray(state.executionHistory)?state.executionHistory:[];
    state.executionHistory.push({id:s.id,startedAt:s.startedAt,completedAt:new Date().toISOString(),plannedMinutes:s.plannedMinutes,actualMinutes:Math.round(ms/60000),activeMilliseconds:ms});
    write(state); clear(); render(); renderHistory(); return Math.round(ms/60000);
  }

  function panel(){
    const modal=document.getElementById('modal'), detail=modal?.querySelector('.mission-detail');
    if(!modal?.classList.contains('open')||!detail)return null;
    let p=document.getElementById('executionTimerPanel');
    if(!p){ p=document.createElement('div'); p.id='executionTimerPanel'; p.className='detail'; detail.insertBefore(p,detail.firstChild); }
    return p;
  }
  function render(){
    const p=panel(); if(!p)return;
    const id=idFromModal(), s=load();
    if(!s){ p.innerHTML='<b>Execution Timer</b><div class="dsub">Ready. Active study time only.</div><div class="actions" style="margin-top:10px"><button class="primary" id="execStartSafe">Start Mission</button></div>'; document.getElementById('execStartSafe')?.addEventListener('click',()=>start(id,PLANNED[id])); return; }
    if(s.id!==id){ p.innerHTML=`<b>Another Mission is running</b><div class="dsub">${title(s.id)} · ${fmt(elapsed(s))} active</div>`; return; }
    const paused=s.status==='paused';
    p.innerHTML=`<div style="display:flex;justify-content:space-between;align-items:center"><div><b>Execution Timer</b><div class="dsub">Active study time</div></div><span class="chip">${paused?'Paused':'Running'}</span></div><div id="execClock" style="font-size:38px;font-weight:800;margin:12px 0">${fmt(elapsed(s))}</div><div class="chips"><span class="chip">Planned ${s.plannedMinutes} min</span><span class="chip">Active only</span></div><div class="actions" style="margin-top:12px"><button class="${paused?'primary':'ghost'}" id="execPauseSafe">${paused?'Resume':'Pause'}</button><button class="ghost" id="execFinishSafe">Finish Mission</button></div>`;
    document.getElementById('execPauseSafe')?.addEventListener('click',()=>paused?resume():pause());
    document.getElementById('execFinishSafe')?.addEventListener('click',finish);
  }
  function tick(){ const s=load(), clock=document.getElementById('execClock'); if(s&&clock&&s.status==='running') clock.textContent=fmt(elapsed(s)); }
  function renderHistory(){
    const review=document.getElementById('review'); if(!review)return;
    let p=document.getElementById('executionHistoryPanel');
    if(!p){p=document.createElement('div');p.id='executionHistoryPanel';p.className='panel';p.style.marginTop='18px';const g=review.querySelector('.grid');if(g)g.insertAdjacentElement('afterend',p);}
    const h=Array.isArray(read().executionHistory)?read().executionHistory:[];
    if(!h.length){p.innerHTML='<h2>Execution History</h2><div class="empty">No completed execution sessions recorded yet.</div>';return;}
    const a=h.reduce((n,x)=>n+Number(x.actualMinutes||0),0),pl=h.reduce((n,x)=>n+Number(x.plannedMinutes||0),0),r=pl?Math.round(a/pl*100):0;
    p.innerHTML=`<h2>Execution History</h2><div class="statgrid"><div class="stat"><div class="num">${h.length}</div><div class="label">Sessions</div></div><div class="stat"><div class="num">${a}m</div><div class="label">Active time</div></div><div class="stat"><div class="num">${r}%</div><div class="label">Active / planned</div></div></div>`;
  }
  window.missionOSExecutionHistory={version:'1.0',start,pause,resume,finish,render,active:load};
  function boot(){ render(); renderHistory(); setInterval(tick,1000); }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();