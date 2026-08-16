// Mission Learning OS — Execution Engine v1.5
// Execution Control owns its step timer. Only the FIRST Start synchronizes with the main Mission timer.
(() => {
  const KEY='missionOSExecutionEngine', GUIDE_KEY='missionOSGuideState';
  const TITLES={'GE-01':'The Beginning of Geotechnical Engineering','GE-02':'Soil Mechanics — Three-Phase System','GE-03':'Soil Mechanics — Unit Weights','EN-GRAMMAR-01':'Present Simple','EN-GRAMMAR-02':'Present Continuous','TECH-01':'Geotechnical Vocabulary Set 01','TECH-02':'Geotechnical Vocabulary Set 02','SYS-01':'System → Elements → Interconnections → Purpose','SYS-02':'Systems Thinking × Geotechnics','PY-01':'Python — Session 1','PY-02':'Python — Session 2'};
  const STEPS={'GE-01':[['Activate prior knowledge',5],['Focused reading',20],['Extract the model',15],['Active recall',10],['Build the deliverable',10]],'GE-02':[['Recall GE-01',5],['Learn the three-phase model',20],['Build relationships',20],['Active recall',10],['Deliverable',5]],'GE-03':[['Recall the phase model',5],['Learn unit weights',20],['Work examples',20],['Retrieval',10],['Deliverable',5]],'EN-GRAMMAR-01':[['Input',10],['Notice',10],['Controlled practice',15],['Retrieval',10],['Deliverable',5]],'EN-GRAMMAR-02':[['Recall',5],['Input',10],['Contrast',10],['Practice',20],['Production',5]],'TECH-01':[['Collect',10],['Define',10],['Contextualize',10],['Retrieve',10],['Deliverable',5]],'TECH-02':[['Collect',10],['Define',10],['Context',10],['Retrieve',10],['Deliverable',5]],'SYS-01':[['Learn the four ideas',15],['Choose a case',10],['Map it',20],['Check the model',10],['Deliverable',5]],'SYS-02':[['Select the engineering problem',10],['Map elements',15],['Map connections',15],['Test the system',15],['Deliverable',5]],'PY-01':[['Watch',10],['Pause and type',20],['Modify',10],['Solve',15],['Artifact',5]],'PY-02':[['Recall',5],['Watch',10],['Type and run',20],['Modify and solve',20],['Artifact',5]]};
  const read=k=>{try{return JSON.parse(localStorage.getItem(k)||'{}')}catch{return{}}};
  const write=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
  const current=()=>{const modal=document.getElementById('modal'),t=document.getElementById('mtitle')?.textContent?.trim();if(!modal?.classList.contains('open')||!t)return null;const id=Object.keys(TITLES).find(k=>TITLES[k]===t);return id?{id,title:t}:null};
  const progress=id=>{const steps=STEPS[id]||[],done=read(GUIDE_KEY)[id]||{};let current=steps.findIndex((_,i)=>!done[i]);if(current<0)current=Math.max(steps.length-1,0);return{steps,current,completed:steps.filter((_,i)=>!!done[i]).length,pct:steps.length?Math.round(steps.filter((_,i)=>!!done[i]).length/steps.length*100):0}};
  const allState=id=>{const a=read(KEY);a[id]=a[id]||{started:false,paused:false,stepStartedAt:null,stepElapsedMs:0,completedAt:null,mainTimerStarted:false};return a};
  const elapsed=s=>{let n=Number(s.stepElapsedMs)||0;if(s?.started&&!s.paused&&!s.completedAt&&s.stepStartedAt)n+=Math.max(0,Date.now()-s.stepStartedAt);return n};
  const fmt=ms=>{const t=Math.floor(Math.max(0,ms)/1000),m=Math.floor(t/60),s=t%60;return `${m}:${String(s).padStart(2,'0')}`};

  function start(id){
    const a=allState(id),s=a[id];if(s.completedAt)return;
    const firstStart=!s.started;s.started=true;s.paused=false;s.stepStartedAt=Date.now();s.stepElapsedMs=firstStart?0:s.stepElapsedMs;s.lastActionAt=Date.now();
    if(firstStart){s.mainTimerStarted=true;write(KEY,a);window.missionOSExecutionHistory?.start?.(id,progress(id).steps.reduce((n,x)=>n+Number(x[1]||0),0));window.missionOSDaily?.start?.(id);}else write(KEY,a);
    render();
  }
  function pause(id){const a=allState(id),s=a[id];if(!s.started||s.paused||s.completedAt)return;s.stepElapsedMs=elapsed(s);s.stepStartedAt=null;s.paused=true;s.lastActionAt=Date.now();write(KEY,a);render()}
  function continueStep(id){const a=allState(id),s=a[id];if(!s.started||!s.paused||s.completedAt)return;s.paused=false;s.stepStartedAt=Date.now();s.lastActionAt=Date.now();write(KEY,a);render()}
  function setGuideDone(id,index){const g=read(GUIDE_KEY);g[id]=g[id]||{};g[id][index]=true;write(GUIDE_KEY,g);window.missionOSExecutionGuide?.render?.(true)}
  function completeStep(id){
    const a=allState(id),s=a[id],p=progress(id);if(!s.started||s.paused||s.completedAt)return;
    s.stepElapsedMs=elapsed(s);s.stepStartedAt=null;s.paused=true;setGuideDone(id,p.current);
    const next=progress(id);
    if(next.completed>=next.steps.length){s.completedAt=Date.now();write(KEY,a);window.missionOSExecutionHistory?.finish?.();window.missionOSDaily?.completed?.(id)}
    else{s.stepElapsedMs=0;s.stepStartedAt=Date.now();s.paused=false;write(KEY,a)}
    render();
  }
  function render(){
    const cur=current();if(!cur)return;const detail=document.querySelector('.mission-detail');if(!detail)return;
    let p=document.getElementById('executionEnginePanel');if(!p){p=document.createElement('div');p.id='executionEnginePanel';p.className='detail';detail.insertBefore(p,detail.firstChild)}
    const a=allState(cur.id),s=a[cur.id],g=progress(cur.id),x=g.steps[g.current]||['Ready',0],running=s.started&&!s.paused&&!s.completedAt,complete=!!s.completedAt;
    p.dir='rtl';p.style.direction='rtl';p.innerHTML=`<div style="display:flex;justify-content:space-between;gap:10px;align-items:center"><div><b>Execution Control</b><div class="dsub" style="margin-top:3px">تایمر این بخش مستقل است؛ فقط Start اولیه با Timer اصلی همزمان می‌شود.</div></div><span class="chip" dir="ltr">${g.completed}/${g.steps.length}</span></div><div style="margin:12px 0 7px;display:flex;justify-content:space-between;gap:10px"><strong dir="ltr" style="text-align:left">Step ${g.current+1} — ${x[0]}</strong><span dir="ltr">${x[1]} min</span></div><div class="progress"><div class="bar" style="width:${g.pct}%"></div></div><div id="engineClock" dir="ltr" style="font-size:28px;font-weight:800;margin:12px 0 5px">${fmt(elapsed(s))}</div><div class="dsub">Pause/Continue اینجا فقط تایمر مرحله را کنترل می‌کند. Timer اصلی مستقل است.</div><div class="actions" style="margin-top:12px">${!s.started?'<button class="primary" id="engineStart">Start execution</button>':running?'<button class="ghost" id="enginePause">Pause step</button>':s.paused?'<button class="primary" id="engineContinue">Continue</button>':'<button class="ghost" disabled>Completed</button>'}<button class="ghost" id="engineDone" ${running?'':'disabled'}>${g.current===g.steps.length-1?'Finish step & Mission':'Finish step'}</button></div>`;
    p.querySelector('#engineStart')?.addEventListener('click',()=>start(cur.id));p.querySelector('#enginePause')?.addEventListener('click',()=>pause(cur.id));p.querySelector('#engineContinue')?.addEventListener('click',()=>continueStep(cur.id));p.querySelector('#engineDone')?.addEventListener('click',()=>completeStep(cur.id));
  }
  function tick(){const cur=current();if(!cur)return;const s=allState(cur.id)[cur.id],clock=document.getElementById('engineClock');if(clock)clock.textContent=fmt(elapsed(s))}
  function boot(){render();setInterval(tick,1000);setInterval(()=>{if(current())render()},3000)}
  window.missionOSExecutionEngine={version:'1.5',start,pause,continueStep,completeStep,render};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();