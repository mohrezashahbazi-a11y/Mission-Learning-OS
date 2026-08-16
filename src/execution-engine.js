// Mission Learning OS — Execution Engine v1.1
// Single orchestration layer: Guide is the source of truth for steps; stable timer records the Mission session.
(() => {
  const KEY='missionOSExecutionEngine';
  const GUIDE_KEY='missionOSGuideState';
  const read=k=>{try{return JSON.parse(localStorage.getItem(k)||'{}')}catch{return{}}};
  const write=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
  const titles={'GE-01':'The Beginning of Geotechnical Engineering','GE-02':'Soil Mechanics — Three-Phase System','GE-03':'Soil Mechanics — Unit Weights','EN-GRAMMAR-01':'Present Simple','EN-GRAMMAR-02':'Present Continuous','TECH-01':'Geotechnical Vocabulary Set 01','TECH-02':'Geotechnical Vocabulary Set 02','SYS-01':'System → Elements → Interconnections → Purpose','SYS-02':'Systems Thinking × Geotechnics','PY-01':'Python — Session 1','PY-02':'Python — Session 2'};
  const guideFallback={
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
  const guideState=id=>read(GUIDE_KEY)[id]||{};
  const stepsFor=id=>guideFallback[id]||[];
  const state=id=>{const all=read(KEY);all[id]=all[id]||{startedAt:null,stepStartedAt:null};return all};
  const guideProgress=id=>{const steps=stepsFor(id),done=guideState(id);const completed=steps.filter((_,i)=>!!done[i]).length;const current=Math.min(steps.findIndex((_,i)=>!done[i])<0?Math.max(steps.length-1,0):steps.findIndex((_,i)=>!done[i]),Math.max(steps.length-1,0));return{steps,completed,current,pct:steps.length?Math.round(completed/steps.length*100):0}};
  function start(id){const all=state(id),s=all[id];if(!s.startedAt){s.startedAt=Date.now();s.stepStartedAt=Date.now();write(KEY,all);const planned=stepsFor(id).reduce((n,x)=>n+Number(x[1]||0),0);window.missionOSExecutionHistory?.start?.(id,planned); }else if(!s.stepStartedAt){s.stepStartedAt=Date.now();write(KEY,all)};render()}
  function syncFromGuide(id){const all=state(id),s=all[id],g=guideProgress(id);const sig=`${g.current}|${g.completed}`;if(s.guideSig!==sig){s.guideSig=sig;s.step=g.current;if(s.startedAt)s.stepStartedAt=Date.now();write(KEY,all)}return s}
  function completeStep(id){const g=guideProgress(id),s=syncFromGuide(id);if(!s.startedAt)start(id);const input=document.querySelector(`#executionGuidePanel input[data-guide-step="${g.current}"]`);if(input&&!input.checked){input.checked=true;input.dispatchEvent(new Event('change',{bubbles:true}))}setTimeout(()=>{const next=guideProgress(id),all=state(id),ss=all[id];if(next.completed>=next.steps.length){ss.completedAt=Date.now();ss.stepStartedAt=null;write(KEY,all)}else{ss.stepStartedAt=Date.now();write(KEY,all)}render()},60)}
  function fmt(ms){const sec=Math.max(0,Math.floor(ms/1000)),m=Math.floor(sec/60),s=sec%60;return `${m}:${String(s).padStart(2,'0')}`}
  function render(){const cur=current();if(!cur)return;const detail=document.querySelector('.mission-detail');if(!detail)return;syncFromGuide(cur.id);let p=document.getElementById('executionEnginePanel');if(!p){p=document.createElement('div');p.id='executionEnginePanel';p.className='detail';detail.insertBefore(p,detail.firstChild)}const g=guideProgress(cur.id),s=state(cur.id)[cur.id],x=g.steps[g.current]||['Ready',0],active=s.stepStartedAt&&!s.completed;const pct=g.pct;p.setAttribute('dir','rtl');p.style.direction='rtl';p.innerHTML=`<div style="display:flex;justify-content:space-between;gap:10px;align-items:center"><div><b>Execution Control</b><div class="dsub" style="margin-top:3px">این بخش با Execution Guide و Timer هماهنگ است.</div></div><span class="chip" dir="ltr">${g.completed}/${g.steps.length}</span></div><div style="margin:12px 0 7px;display:flex;justify-content:space-between;gap:10px"><strong dir="ltr" style="text-align:left">Step ${g.current+1} — ${x[0]}</strong><span dir="ltr">${x[1]} min</span></div><div class="progress"><div class="bar" style="width:${pct}%"></div></div><div id="engineClock" dir="ltr" style="font-size:28px;font-weight:800;margin:12px 0 5px">${active?fmt(Date.now()-s.stepStartedAt):'0:00'}</div><div class="dsub">زمان مرحله از زمان اجرای واقعی محاسبه می‌شود؛ زمان کل Mission در Timer ثبت می‌شود.</div><div class="actions" style="margin-top:12px"><button class="primary" id="engineStart">${active?'Running':s.startedAt?'Continue':'Start execution'}</button><button class="ghost" id="engineDone" ${active?'':'disabled'}>${g.current===g.steps.length-1?'Finish step & Mission':'Finish step'}</button></div>`;
    p.querySelector('#engineStart').onclick=()=>start(cur.id);p.querySelector('#engineDone').onclick=()=>completeStep(cur.id);
  }
  function tick(){const cur=current(),p=document.getElementById('engineClock');if(!cur||!p)return;const s=state(cur.id)[cur.id];if(s?.stepStartedAt&&!s.completed)p.textContent=fmt(Date.now()-s.stepStartedAt);render()}
  function boot(){setInterval(()=>{render();tick()},1000)}
  window.missionOSExecutionEngine={version:'1.1',start,completeStep,render};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
