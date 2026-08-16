// Mission Learning OS — Execution Engine v1.4
// Execution Control is the single controller for step state; the Mission timer remains the source of truth for total study time.
(() => {
  const KEY='missionOSExecutionEngine';
  const GUIDE_KEY='missionOSGuideState';
  const TITLES={'GE-01':'The Beginning of Geotechnical Engineering','GE-02':'Soil Mechanics — Three-Phase System','GE-03':'Soil Mechanics — Unit Weights','EN-GRAMMAR-01':'Present Simple','EN-GRAMMAR-02':'Present Continuous','TECH-01':'Geotechnical Vocabulary Set 01','TECH-02':'Geotechnical Vocabulary Set 02','SYS-01':'System → Elements → Interconnections → Purpose','SYS-02':'Systems Thinking × Geotechnics','PY-01':'Python — Session 1','PY-02':'Python — Session 2'};
  const STEPS={
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
  const read=k=>{try{return JSON.parse(localStorage.getItem(k)||'{}')}catch{return{}}};
  const write=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
  const current=()=>{const modal=document.getElementById('modal'),t=document.getElementById('mtitle')?.textContent?.trim();if(!modal?.classList.contains('open')||!t)return null;const id=Object.keys(TITLES).find(k=>TITLES[k]===t);return id?{id,title:t}:null};
  const stepsFor=id=>STEPS[id]||[];
  const guide=id=>read(GUIDE_KEY)[id]||{};
  const progress=id=>{const steps=stepsFor(id),g=guide(id);let current=steps.findIndex((_,i)=>!g[i]);if(current<0)current=steps.length-1;const completed=steps.filter((_,i)=>!!g[i]).length;return{steps,current,completed,pct:steps.length?Math.round(completed/steps.length*100):0}};
  const allState=id=>{const a=read(KEY);a[id]=a[id]||{started:false,paused:false,stepStartedAt:null,completedAt:null,stepElapsedMs:0};return a};
  const elapsed=s=>{let n=Number(s.stepElapsedMs)||0;if(!s.paused&&s.stepStartedAt)n+=Math.max(0,Date.now()-s.stepStartedAt);return n};
  const missionTimer=()=>window.missionOSExecutionHistory;

  function start(id){
    const a=allState(id),s=a[id];
    if(s.completedAt)return;
    const now=Date.now();
    s.started=true;s.paused=false;s.stepStartedAt=s.stepStartedAt||now;
    s.lastActionAt=now;write(KEY,a);
    const timer=missionTimer();
    if(timer){
      const active=timer.active?.();
      if(!active) timer.start(id);
      else if(active.id===id&&active.status==='paused') timer.resume();
    }
    window.missionOSDaily?.start?.(id);
    render();
  }

  function pause(id){
    const a=allState(id),s=a[id];
    if(!s.started||s.completedAt)return;
    s.stepElapsedMs=elapsed(s);s.stepStartedAt=null;s.paused=true;s.lastActionAt=Date.now();write(KEY,a);
    missionTimer()?.pause?.();
    render();
  }

  function setGuideDone(id,index){
    const g=read(GUIDE_KEY);g[id]=g[id]||{};g[id][index]=true;write(GUIDE_KEY,g);
    window.missionOSExecutionGuide?.render?.(true);
  }

  function completeStep(id){
    const p=progress(id),a=allState(id),s=a[id];
    if(!s.started)start(id);
    if(s.paused)return;
    const now=Date.now();s.stepElapsedMs=elapsed(s);s.stepStartedAt=null;
    setGuideDone(id,p.current);
    const next=progress(id);
    if(next.completed>=next.steps.length){
      s.completedAt=now;s.paused=true;write(KEY,a);
      missionTimer()?.finish?.();
      window.missionOSExecutionHistory?.render?.();
      window.missionOSDaily?.completed?.(id);
    }else{
      s.stepElapsedMs=0;s.stepStartedAt=now;s.paused=false;write(KEY,a);
      // Keep the overall Mission timer running while moving to the next step.
    }
    render();
  }

  function render(){
    const cur=current();if(!cur)return;
    const detail=document.querySelector('.mission-detail');if(!detail)return;
    let p=document.getElementById('executionEnginePanel');if(!p){p=document.createElement('div');p.id='executionEnginePanel';p.className='detail';detail.insertBefore(p,detail.firstChild)}
    const a=allState(cur.id),s=a[cur.id],g=progress(cur.id),x=g.steps[g.current]||['Ready',0];
    const running=s.started&&!s.paused&&!s.completedAt;
    const complete=!!s.completedAt;
    const clock=elapsed(s),sec=Math.floor(clock/1000),m=Math.floor(sec/60),ss=sec%60;
    p.dir='rtl';p.style.direction='rtl';
    p.innerHTML=`<div style="display:flex;justify-content:space-between;gap:10px;align-items:center"><div><b>Execution Control</b><div class="dsub" style="margin-top:3px">کنترل مرحله فعلی و هماهنگی با Timer اصلی.</div></div><span class="chip" dir="ltr">${g.completed}/${g.steps.length}</span></div><div style="margin:12px 0 7px;display:flex;justify-content:space-between;gap:10px"><strong dir="ltr" style="text-align:left">Step ${g.current+1} — ${x[0]}</strong><span dir="ltr">${x[1]} min</span></div><div class="progress"><div class="bar" style="width:${g.pct}%"></div></div><div id="engineClock" dir="ltr" style="font-size:28px;font-weight:800;margin:12px 0 5px">${m}:${String(ss).padStart(2,'0')}</div><div class="dsub">زمان این مرحله جداگانه ثبت می‌شود؛ Timer اصلی زمان کل Mission را ثبت می‌کند.</div><div class="actions" style="margin-top:12px"><button class="primary" id="engineStart" ${complete?'disabled':''}>${complete?'Completed':running?'Pause':s.started?'Continue':'Start execution'}</button><button class="ghost" id="engineDone" ${running?'':'disabled'}>${g.current===g.steps.length-1?'Finish step & Mission':'Finish step'}</button></div>`;
    p.querySelector('#engineStart')?.addEventListener('click',()=>{if(running)pause(cur.id);else start(cur.id)},{once:true});
    p.querySelector('#engineDone')?.addEventListener('click',()=>completeStep(cur.id),{once:true});
  }

  function tick(){
    const cur=current();if(!cur)return;
    const p=document.getElementById('executionEnginePanel');if(!p)return;
    const s=allState(cur.id)[cur.id],clock=document.getElementById('engineClock');
    if(clock&&s&&!s.paused&&!s.completedAt){const ms=elapsed(s),sec=Math.floor(ms/1000),m=Math.floor(sec/60),ss=sec%60;clock.textContent=`${m}:${String(ss).padStart(2,'0')}`}
  }
  function boot(){render();setInterval(tick,1000);setInterval(()=>{if(current())render()},2000)}
  window.missionOSExecutionEngine={version:'1.4',start, pause, completeStep, render};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
