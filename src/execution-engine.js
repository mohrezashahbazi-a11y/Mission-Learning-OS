// Mission Learning OS — Execution Engine v1.0
// Coordinates Mission start, current Guide step, step timing and completion without replacing the stable timer.
(() => {
  const KEY='missionOSExecutionEngine';
  const read=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'{}')}catch{return{}}};
  const write=v=>localStorage.setItem(KEY,JSON.stringify(v));
  const esc=s=>String(s).replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const titles={'GE-01':'The Beginning of Geotechnical Engineering','GE-02':'Soil Mechanics — Three-Phase System','GE-03':'Soil Mechanics — Unit Weights','EN-GRAMMAR-01':'Present Simple','EN-GRAMMAR-02':'Present Continuous','TECH-01':'Geotechnical Vocabulary Set 01','TECH-02':'Geotechnical Vocabulary Set 02','SYS-01':'System → Elements → Interconnections → Purpose','SYS-02':'Systems Thinking × Geotechnics','PY-01':'Python — Session 1','PY-02':'Python — Session 2'};
  const stepData={
    'GE-01':[['Activate prior knowledge',5],['Focused reading',20],['Extract the model',15],['Active recall',10],['Build the deliverable',10]],
    'GE-02':[['Recall GE-01',5],['Learn the three-phase model',20],['Build relationships',20],['Active recall',10],['Deliverable',5]],
    'GE-03':[['Recall the phase model',5],['Learn unit weights',20],['Work examples',20],['Retrieval',10],['Deliverable',5]],
    'EN-GRAMMAR-01':[['Input',10],['Notice',10],['Controlled practice',15],['Retrieval',10],['Deliverable',5]],
    'EN-GRAMMAR-02':[['Recall',5],['Input',10],['Contrast',10],['Practice',20],['Production',5]],
    'TECH-01':[['Collect',10],['Define',10],['Contextualize',10],['Retrieve',10],['Deliverable',5]],
    'TECH-02':[['Collect',10],['Define',10],['Context',10],['Retrieve',10],['Deliverable',5]],
    'SYS-01':[['Learn the four ideas',15],['Choose a case',10],['Map it',20],['Check the model',10],['Deliverable',5]],
    'SYS-02':[['Select the engineering problem',10],['Map elements',15],['Map connections',15],['Test the system',15],['Deliverable',5]],
    'PY-01':[['Watch',10],['Pause and type',20],['Modify',10],['Solve',15],['Artifact',5]],
    'PY-02':[['Recall',5],['Watch',10],['Type and run',20],['Modify and solve',20],['Artifact',5]]
  };
  const current=()=>{const m=document.getElementById('modal'),t=document.getElementById('mtitle')?.textContent?.trim();if(!m?.classList.contains('open')||!t)return null;const id=Object.keys(titles).find(k=>titles[k]===t);return id?{id,title:t}:null};
  function state(id){const all=read();all[id]=all[id]||{step:0,startedAt:null,stepStartedAt:null,completed:false};return all}
  function start(id){const all=state(id),s=all[id];if(!s.startedAt)s.startedAt=Date.now();if(!s.stepStartedAt)s.stepStartedAt=Date.now();write(all);render()}
  function setStep(id,n){const all=state(id),s=all[id];s.step=Math.max(0,Math.min(n,(stepData[id]||[]).length-1));s.stepStartedAt=Date.now();write(all);render()}
  function completeStep(id){const guide=document.querySelector('#executionGuidePanel');const cb=guide?.querySelector(`input[data-guide-step="${state(id)[id].step}"]`);if(cb&&!cb.checked){cb.checked=true;cb.dispatchEvent(new Event('change',{bubbles:true}));}const steps=stepData[id]||[];const all=state(id),s=all[id];if(s.step<steps.length-1){s.step++;s.stepStartedAt=Date.now();write(all)}else{s.completed=true;s.completedAt=Date.now();write(all)}render()}
  function fmt(ms){const sec=Math.max(0,Math.floor(ms/1000));const m=Math.floor(sec/60),s=sec%60;return `${m}:${String(s).padStart(2,'0')}`}
  function render(){const cur=current();if(!cur)return;const detail=document.querySelector('.mission-detail');if(!detail)return;let p=document.getElementById('executionEnginePanel');if(!p){p=document.createElement('div');p.id='executionEnginePanel';p.className='detail';detail.insertBefore(p,detail.firstChild)}const steps=stepData[cur.id]||[];const all=state(cur.id),s=all[cur.id],i=Math.min(s.step,Math.max(steps.length-1,0)),x=steps[i]||['Ready',0],done=s.completed?steps.length:i;const pct=steps.length?Math.round(done/steps.length*100):0;p.setAttribute('dir','rtl');p.style.direction='rtl';p.innerHTML=`<div style="display:flex;justify-content:space-between;gap:10px;align-items:center"><div><b>Execution Engine</b><div class="dsub" style="margin-top:3px">الان دقیقاً این مرحله را انجام بده</div></div><span class="chip" dir="ltr">${done}/${steps.length}</span></div><div style="margin:12px 0 7px;display:flex;justify-content:space-between;gap:10px"><strong dir="ltr" style="text-align:left">Step ${i+1} — ${esc(x[0])}</strong><span dir="ltr">${x[1]} min</span></div><div class="progress"><div class="bar" style="width:${pct}%"></div></div><div id="engineClock" dir="ltr" style="font-size:28px;font-weight:800;margin:12px 0 5px">${s.stepStartedAt?fmt(Date.now()-s.stepStartedAt):'0:00'}</div><div class="dsub">زمان این مرحله از لحظه شروع آن محاسبه می‌شود.</div><div class="actions" style="margin-top:12px"><button class="primary" id="engineStart">${s.startedAt?'Continue step':'Start execution'}</button><button class="ghost" id="engineDone">${i===steps.length-1?'Finish step & Mission':'Finish step'}</button></div>`;
    p.querySelector('#engineStart').onclick=()=>start(cur.id);p.querySelector('#engineDone').onclick=()=>{if(!s.startedAt)start(cur.id);completeStep(cur.id)};
  }
  function tick(){const p=document.getElementById('engineClock'),cur=current();if(!p||!cur)return;const s=state(cur.id)[cur.id];if(s?.stepStartedAt)p.textContent=fmt(Date.now()-s.stepStartedAt)}
  function boot(){setInterval(()=>{render();tick()},500)}
  window.missionOSExecutionEngine={version:'1.0',start,completeStep,setStep,render};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
