// Mission Learning OS — Execution Timer v1.7
// Main Mission timer. Start/Pause/Resume are synchronized with Execution Control.
// Daily State is fed from real active execution time. Finished missions can record explicit learning evidence.
(() => {
  const KEY='missionOSState', ACTIVE='missionOSActiveSession';
  const PLANNED={'GE-01':60,'GE-02':60,'GE-03':60,'EN-GRAMMAR-01':50,'EN-GRAMMAR-02':50,'TECH-01':45,'TECH-02':45,'SYS-01':60,'SYS-02':60,'PY-01':60,'PY-02':60};
  const TITLES={'The Beginning of Geotechnical Engineering':'GE-01','Soil Mechanics — Three-Phase System':'GE-02','Soil Mechanics — Unit Weights':'GE-03','Present Simple':'EN-GRAMMAR-01','Present Continuous':'EN-GRAMMAR-02','Geotechnical Vocabulary Set 01':'TECH-01','Geotechnical Vocabulary Set 02':'TECH-02','System → Elements → Interconnections → Purpose':'SYS-01','Systems Thinking × Geotechnics':'SYS-02','Python — Session 1':'PY-01','Python — Session 2':'PY-02'};
  const read=k=>{try{return JSON.parse(localStorage.getItem(k)||'null')}catch{return null}};
  const save=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
  const title=id=>Object.keys(TITLES).find(k=>TITLES[k]===id)||id;
  const idFromModal=()=>TITLES[document.getElementById('mtitle')?.textContent?.trim()||'']||null;
  const safeDateMs=v=>{const n=typeof v==='number'?v:Date.parse(v);return Number.isFinite(n)?n:null};
  const elapsed=s=>{if(!s)return 0;const base=Number(s.accumulatedMs);let total=Number.isFinite(base)&&base>=0?base:0;if(s.status==='running'){const start=safeDateMs(s.activeStartedAt);if(start!==null)total+=Math.max(0,Date.now()-start)}return Number.isFinite(total)?total:0};
  const fmt=ms=>{const t=Math.max(0,Math.floor((Number.isFinite(ms)?ms:0)/1000)),h=Math.floor(t/3600),m=Math.floor(t%3600/60),s=t%60;return h?`${h}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`:`${m}:${String(s).padStart(2,'0')}`};
  const dailyStart=id=>window.missionOSDaily?.start?.(id);
  const dailyAdd=(ms,id)=>{const seconds=Math.max(0,Math.round((Number(ms)||0)/1000));if(seconds)window.missionOSDaily?.addStudy?.(seconds,id);};
  function current(){const s=read(ACTIVE);if(!s||!s.id||!s.status)return null;return ['running','paused'].includes(s.status)?s:null}
  function openRunning(){const s=current();if(!s)return;const target=document.querySelector(`[data-runtime-id="${s.id}"]`);if(target){target.click();return}const modal=document.getElementById('modal');if(modal)modal.classList.remove('open');window.missionOSExecutionHistory?.render?.();}
  function start(id,sync=true){if(!id)return;const c=current();if(c){if(c.id===id&&c.status==='paused')return resume(sync);render();return}if(window.missionOSMastery?.startCycle)window.missionOSMastery.startCycle();const now=new Date().toISOString();save(ACTIVE,{id,plannedMinutes:PLANNED[id]||60,startedAt:now,activeStartedAt:now,accumulatedMs:0,status:'running'});dailyStart(id);if(sync)window.missionOSExecutionEngine?.start?.(id,true);render()}
  function pause(sync=true){const s=current();if(!s||s.status!=='running')return;const ms=elapsed(s);s.accumulatedMs=ms;s.status='paused';s.activeStartedAt=null;save(ACTIVE,s);dailyAdd(ms-Number(s.lastDailySyncedMs||0),s.id);s.lastDailySyncedMs=ms;save(ACTIVE,s);if(sync)window.missionOSExecutionEngine?.pause?.(s.id,true);render()}
  function resume(sync=true){const s=current();if(!s||s.status!=='paused')return;s.status='running';s.activeStartedAt=new Date().toISOString();save(ACTIVE,s);if(sync)window.missionOSExecutionEngine?.resume?.(s.id,true);render()}
  function finish(){const s=current();if(!s)return;if(!confirm('Finish this Mission and record active study time?'))return;const ms=elapsed(s),state=read(KEY)||{};dailyAdd(ms-Number(s.lastDailySyncedMs||0),s.id);state.executionHistory=Array.isArray(state.executionHistory)?state.executionHistory:[];state.executionHistory.push({id:s.id,startedAt:s.startedAt,completedAt:new Date().toISOString(),plannedMinutes:s.plannedMinutes,actualMinutes:Math.round(ms/60000),activeMilliseconds:ms});save(KEY,state);localStorage.removeItem(ACTIVE);window.missionOSDaily?.completed?.(s.id);
    if(window.missionOSMastery?.record){
      const deliverable=confirm('Did you complete the Mission deliverable?');
      const explain=confirm('Can you explain the key idea without looking at your notes?');
      const raw=prompt('Rate your understanding from 0 to 10.');
      const quality=Math.max(0,Math.min(10,Number(raw)||0));
      window.missionOSMastery.record(s.id,{type:'mission',deliverable,reassessment:explain,review:false,quality,difficulty:5});
    }
    render();renderHistory()}
  function panel(){const modal=document.getElementById('modal'),detail=modal?.querySelector('.mission-detail');if(!modal?.classList.contains('open')||!detail)return null;let p=document.getElementById('executionTimerPanel');if(!p){p=document.createElement('div');p.id='executionTimerPanel';p.className='detail';detail.insertBefore(p,detail.firstChild)}return p}
  function render(){const p=panel();if(!p)return;const id=idFromModal(),s=current();if(!s){p.innerHTML='<b>Execution Timer</b><div class="dsub">Ready. Active study time only.</div><div class="actions" style="margin-top:10px"><button class="primary" id="execStart">Start Mission</button></div>';p.querySelector('#execStart').onclick=()=>start(id,true);return}if(s.id!==id){p.innerHTML=`<b>Another Mission is running</b><div class="dsub">${title(s.id)} · ${fmt(elapsed(s))} active</div><div class="actions" style="margin-top:10px"><button class="ghost" id="execOpenRunning">Open running Mission</button></div>`;p.querySelector('#execOpenRunning').onclick=openRunning;return}const paused=s.status==='paused';p.innerHTML=`<div style="display:flex;justify-content:space-between;align-items:center"><div><b>Execution Timer</b><div class="dsub">Active study time</div></div><span class="chip">${paused?'Paused':'Running'}</span></div><div id="execClock" style="font-size:38px;font-weight:800;margin:12px 0">${fmt(elapsed(s))}</div><div class="chips"><span class="chip">Planned ${s.plannedMinutes} min</span><span class="chip">Active only</span></div><div class="actions" style="margin-top:12px"><button class="${paused?'primary':'ghost'}" id="execPause">${paused?'Resume':'Pause'}</button><button class="ghost" id="execFinish">Finish Mission</button></div>`;p.querySelector('#execPause').onclick=()=>paused?resume(true):pause(true);p.querySelector('#execFinish').onclick=finish}
  function tick(){const s=current(),clock=document.getElementById('execClock');if(clock&&s&&s.status==='running')clock.textContent=fmt(elapsed(s))}
  function renderHistory(){const review=document.getElementById('review');if(!review)return;let p=document.getElementById('executionHistoryPanel');if(!p){p=document.createElement('div');p.id='executionHistoryPanel';p.className='panel';p.style.marginTop='18px';const g=review.querySelector('.grid');if(g)g.insertAdjacentElement('afterend',p)}const h=Array.isArray((read(KEY)||{}).executionHistory)?(read(KEY)||{}).executionHistory:[];p.innerHTML=h.length?`<h2>Execution History</h2><div class="statgrid"><div class="stat"><div class="num">${h.length}</div><div class="label">Sessions</div></div><div class="stat"><div class="num">${h.reduce((n,x)=>n+Number(x.actualMinutes||0),0)}m</div><div class="label">Active time</div></div></div>`:'<h2>Execution History</h2><div class="empty">No completed execution sessions recorded yet.</div>'}
  window.missionOSExecutionHistory={version:'1.7',start,pause,resume,finish,render,active:current,openRunning};
  function boot(){render();renderHistory();setInterval(tick,1000)}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();

// Load the Analytics layer through an already-authoritative runtime script so the
// Pages workflow does not need to be changed just to add analytics modules.
(() => {
  const load=(src,id)=>{if(document.getElementById(id)||document.querySelector(`script[src^="${src}"]`))return;const s=document.createElement('script');s.src=`${src}?v=1.0`;s.id=id;s.onload=()=>window.missionOSAnalyticsUI?.render?.();document.body.appendChild(s)};
  const boot=()=>{load('src/analytics-engine.js','missionAnalyticsEngine');setTimeout(()=>load('src/analytics-ui.js','missionAnalyticsUI'),80)};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
