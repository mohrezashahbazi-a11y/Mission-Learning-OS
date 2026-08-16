// Mission Learning OS — Daily Log Editor + Daily Report v2.1
// Daily report derives execution truth from completed execution sessions, then falls back to Daily State.
(() => {
  const dailyApi=()=>window.missionOSDaily;
  const root=()=>document.body;
  const read=(k,fallback={})=>{try{return JSON.parse(localStorage.getItem(k)||JSON.stringify(fallback))}catch{return fallback}};
  const save=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
  const esc=s=>String(s??'').replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c]));

  function ensure(){
    if(document.getElementById('dailyLogEditor'))return;
    const box=document.createElement('div');box.id='dailyLogEditor';box.className='modal';box.innerHTML=`<div class="modalbox"><button class="close" id="dailyLogClose">×</button><div class="eyebrow">Learning History</div><h2>Enter a past study day</h2><p class="subtitle">Use this only when you want to correct or complete the record manually.</p><div class="mission-detail"><div class="detail"><b>Date</b><input id="logDate" type="date"></div><div class="detail"><b>Study time (minutes)</b><input id="logMinutes" type="number" min="0" max="1440" step="5" placeholder="e.g. 120"></div><div class="detail"><b>Focus sessions</b><input id="logSessions" type="number" min="0" max="50" step="1" value="0"></div><div class="detail"><b>Status</b><select id="logStatus"><option value="studied">Studied</option><option value="completed">Completed</option><option value="rest_day">Rest Day</option><option value="missed">Missed</option></select></div><div class="detail"><b>Note</b><textarea id="logNote" placeholder="Optional note"></textarea></div></div><button class="primary" id="saveDailyLog">Save historical record</button></div>`;root().appendChild(box);
    document.getElementById('dailyLogClose').onclick=()=>box.classList.remove('open');
    document.getElementById('saveDailyLog').onclick=saveHistorical;
  }

  function saveHistorical(){
    const a=dailyApi();if(!a)return;
    const date=document.getElementById('logDate').value;const minutes=Math.max(0,Number(document.getElementById('logMinutes').value)||0);const sessions=Math.max(0,Number(document.getElementById('logSessions').value)||0);const status=document.getElementById('logStatus').value;const note=document.getElementById('logNote').value.trim();
    if(!/^\d{4}-\d{2}-\d{2}$/.test(date)){alert('Choose a valid date.');return;}
    const s=read('missionOSDailyState');s.days=s.days||{};const old=s.days[date]||{date,startedAt:null,endedAt:null,studySeconds:0,focusSessions:0,missionsStarted:[],missionsCompleted:[],status:'not_started',rest:false,targetMinutes:60};
    old.studySeconds=minutes*60;old.focusSessions=sessions;old.status=status;old.rest=status==='rest_day';old.manual=true;old.manualUpdatedAt=new Date().toISOString();if(note)old.note=note;s.days[date]=old;save('missionOSDailyState',s);
    document.getElementById('dailyLogEditor').classList.remove('open');a.render();toast(`Saved ${date}: ${minutes} minutes`);
  }

  function open(date){ensure();document.getElementById('logDate').value=date||'';const s=read('missionOSDailyState');const d=s.days?.[date];document.getElementById('logMinutes').value=d?Math.round((d.studySeconds||0)/60):'';document.getElementById('logSessions').value=d?.focusSessions||0;document.getElementById('logStatus').value=d?.status||'studied';document.getElementById('logNote').value=d?.note||'';document.getElementById('dailyLogEditor').classList.add('open');}

  function todayKey(){return dailyApi()?.iranDate?.()||new Date().toISOString().slice(0,10)}
  function getToday(){return read('missionOSDailyState').days?.[todayKey()]||null}

  function ensureReport(){
    if(document.getElementById('dailyReportModal'))return;
    const box=document.createElement('div');box.id='dailyReportModal';box.className='modal';box.innerHTML=`<div class="modalbox" style="max-width:820px"><button class="close" id="reportClose">×</button><div class="eyebrow">Director Handoff</div><h2>Daily Report</h2><p class="subtitle">A compact, structured record of what actually happened today. Save the reflection, then copy the generated report and send it to the Personal Learning Director.</p><div class="statgrid" id="reportStats"></div><div class="mission-detail"><div class="detail"><b>What did you actually learn?</b><textarea id="rLearn" placeholder="Concepts, insights, skills, or things that became clearer."></textarea></div><div class="detail"><b>What went well?</b><textarea id="rWin" placeholder="Concrete wins. Even small ones count."></textarea></div><div class="detail"><b>What blocked or slowed you down?</b><textarea id="rBlock" placeholder="Confusion, procrastination, fatigue, technical issue, unclear task, etc."></textarea></div><div class="detail"><b>How difficult did today feel? (1–10)</b><input id="rDifficulty" type="number" min="1" max="10" value="5"></div><div class="detail"><b>What should the Director know before planning tomorrow?</b><textarea id="rTomorrow" placeholder="Anything that should change the next queue, workload, or teaching approach."></textarea></div></div><div class="actions" style="margin-top:12px"><button class="primary" id="saveReport">Save & Generate</button><button class="ghost" id="copyReport">Copy report</button></div><div class="detail" style="margin-top:13px"><b>Generated report</b><textarea id="reportOutput" style="min-height:260px" readonly></textarea></div></div>`;root().appendChild(box);
    document.getElementById('reportClose').onclick=()=>box.classList.remove('open');
    document.getElementById('saveReport').onclick=()=>{saveReport();renderReport();};
    document.getElementById('copyReport').onclick=copyReport;
  }

  function reportData(){
    const day=getToday()||{date:todayKey(),studySeconds:0,focusSessions:0,missionsStarted:[],missionsCompleted:[],status:'not_started',rest:false,targetMinutes:60};
    const state=read('missionOSState');
    const execution=Array.isArray(state.executionHistory)?state.executionHistory:[];
    const sessions=execution.filter(x=>String(x.completedAt||'').slice(0,10)===day.date);
    const historyMs=sessions.reduce((sum,x)=>sum+Math.max(0,Number(x.activeMilliseconds)||Number(x.actualMinutes||0)*60000),0);
    const stateSeconds=Math.max(0,Number(day.studySeconds)||0);
    // Execution History is the source of truth for timer-recorded study. Daily State is used only when no sessions exist.
    const effectiveSeconds=sessions.length?historyMs:stateSeconds;
    const activeMinutes=Math.floor(effectiveSeconds/60000);
    const effectiveStatus=day.rest?'rest_day':effectiveSeconds>=Number(day.targetMinutes||60)*60000?'completed':effectiveSeconds>0?'studied':'not_started';
    const completed=day.missionsCompleted||[];
    const started=day.missionsStarted||[];
    const focusSessions=sessions.length||Number(day.focusSessions||0);
    return {date:day.date,studyMinutes:activeMinutes,focusSessions,targetMinutes:day.targetMinutes||60,status:effectiveStatus,missionsStarted:started,missionsCompleted:completed,executionSessions:sessions.map(x=>({id:x.id,plannedMinutes:x.plannedMinutes,actualMinutes:Math.round((Math.max(0,Number(x.activeMilliseconds)||Number(x.actualMinutes||0)*60000))/60000)})),energy:Number(state.energy||0),availableMinutes:Number(state.availableMinutes||0),reflection:day.report?.reflection||'',wins:day.report?.wins||'',blockers:day.report?.blockers||'',difficulty:Number(day.report?.difficulty||5),tomorrow:day.report?.tomorrow||''};
  }

  function saveReport(){
    const s=read('missionOSDailyState');s.days=s.days||{};const date=todayKey();const d=s.days[date]||{date,studySeconds:0,focusSessions:0,missionsStarted:[],missionsCompleted:[],status:'not_started',rest:false,targetMinutes:60};
    d.report={reflection:document.getElementById('rLearn').value.trim(),wins:document.getElementById('rWin').value.trim(),blockers:document.getElementById('rBlock').value.trim(),difficulty:Math.max(1,Math.min(10,Number(document.getElementById('rDifficulty').value)||5)),tomorrow:document.getElementById('rTomorrow').value.trim(),updatedAt:new Date().toISOString()};s.days[date]=d;save('missionOSDailyState',s);toast('Daily report saved.');
  }

  function buildText(){
    const r=reportData();
    const names=r.missionsCompleted.length?r.missionsCompleted.join(', '):'None';
    const started=r.missionsStarted.length?r.missionsStarted.join(', '):'None';
    const exec=r.executionSessions.length?r.executionSessions.map(x=>`${x.id}: ${x.actualMinutes}m/${x.plannedMinutes}m`).join(', '):'None';
    return `MISSION LEARNING OS — DAILY REPORT\nDate: ${r.date}\n\n1. EXECUTION\n• Active study time: ${r.studyMinutes} min / ${r.targetMinutes} min target\n• Focus sessions: ${r.focusSessions}\n• Status: ${r.status}\n• Energy setting: ${r.energy}/10\n• Available time setting: ${r.availableMinutes} min\n• Missions started: ${started}\n• Missions completed: ${names}\n• Timer sessions: ${exec}\n\n2. LEARNING\n${r.reflection||'Not recorded.'}\n\n3. WINS\n${r.wins||'Not recorded.'}\n\n4. BLOCKERS / FRICTION\n${r.blockers||'Not recorded.'}\n\n5. DIFFICULTY\n${r.difficulty}/10\n\n6. DIRECTOR NOTE FOR TOMORROW\n${r.tomorrow||'No specific note.'}\n\nPlease use this report to evaluate today, identify the main bottleneck, and adapt tomorrow’s mission queue. Do not redesign the curriculum unless the evidence requires it.`;
  }

  function renderReport(){
    ensureReport();const r=reportData();
    document.getElementById('reportStats').innerHTML=`<div class="stat"><div class="num">${r.studyMinutes}m</div><div class="label">Active study</div></div><div class="stat"><div class="num">${r.focusSessions}</div><div class="label">Focus sessions</div></div><div class="stat"><div class="num">${r.missionsCompleted.length}</div><div class="label">Missions completed</div></div>`;
    document.getElementById('rLearn').value=r.reflection;document.getElementById('rWin').value=r.wins;document.getElementById('rBlock').value=r.blockers;document.getElementById('rDifficulty').value=r.difficulty;document.getElementById('rTomorrow').value=r.tomorrow;document.getElementById('reportOutput').value=buildText();
    document.getElementById('dailyReportModal').classList.add('open');
  }

  async function copyReport(){
    const out=document.getElementById('reportOutput');if(!out)return;
    if(!out.value)saveReport();out.value=buildText();
    try{await navigator.clipboard.writeText(out.value);toast('Report copied to clipboard.');}catch{out.select();document.execCommand('copy');toast('Report copied.');}
  }

  function addButtons(){
    const toolbar=document.querySelector('#missions .toolbar');if(!toolbar)return;
    if(!document.getElementById('manualDailyLog')){const b=document.createElement('button');b.id='manualDailyLog';b.className='ghost';b.textContent='Edit study history';b.onclick=()=>open('');toolbar.appendChild(b)}
    const report=document.getElementById('report');if(report&&!report.dataset.bound){report.dataset.bound='1';report.onclick=e=>{e.preventDefault();e.stopImmediatePropagation();renderReport();};}
  }

  function toast(t){const e=document.getElementById('toast');if(e){e.textContent=t;e.classList.add('show');setTimeout(()=>e.classList.remove('show'),2200)}}
  window.missionOSDailyLog={open,ensure,report:renderReport,buildReport:buildText};
  const boot=()=>{addButtons();setTimeout(addButtons,300);setTimeout(addButtons,1000)};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
