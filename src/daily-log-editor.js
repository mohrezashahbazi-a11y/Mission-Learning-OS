// Mission Learning OS — Daily Log Editor v1.0
// Lets the user correct historical study records without changing automatic day detection.
(() => {
  const api=()=>window.missionOSDaily;
  const root=()=>document.body;
  function ensure(){
    if(document.getElementById('dailyLogEditor'))return;
    const box=document.createElement('div');box.id='dailyLogEditor';box.className='modal';box.innerHTML=`<div class="modalbox"><button class="close" id="dailyLogClose">×</button><div class="eyebrow">Learning History</div><h2>Enter a past study day</h2><p class="subtitle">Use this only when you want to correct or complete the record manually.</p><div class="mission-detail"><div class="detail"><b>Date</b><input id="logDate" type="date"></div><div class="detail"><b>Study time (minutes)</b><input id="logMinutes" type="number" min="0" max="1440" step="5" placeholder="e.g. 120"></div><div class="detail"><b>Focus sessions</b><input id="logSessions" type="number" min="0" max="50" step="1" value="0"></div><div class="detail"><b>Status</b><select id="logStatus"><option value="studied">Studied</option><option value="completed">Completed</option><option value="rest_day">Rest Day</option><option value="missed">Missed</option></select></div><div class="detail"><b>Note</b><textarea id="logNote" placeholder="Optional note"></textarea></div></div><button class="primary" id="saveDailyLog">Save historical record</button></div>`;root().appendChild(box);
    document.getElementById('dailyLogClose').onclick=()=>box.classList.remove('open');
    document.getElementById('saveDailyLog').onclick=save;
  }
  function save(){
    const a=api();if(!a)return;
    const date=document.getElementById('logDate').value;const minutes=Math.max(0,Number(document.getElementById('logMinutes').value)||0);const sessions=Math.max(0,Number(document.getElementById('logSessions').value)||0);const status=document.getElementById('logStatus').value;const note=document.getElementById('logNote').value.trim();
    if(!/^\\d{4}-\\d{2}-\\d{2}$/.test(date)){alert('Choose a valid date.');return;}
    const s=JSON.parse(localStorage.getItem('missionOSDailyState')||'{}');s.days=s.days||{};const old=s.days[date]||{date,startedAt:null,endedAt:null,studySeconds:0,focusSessions:0,missionsStarted:[],missionsCompleted:[],status:'not_started',rest:false,targetMinutes:60};
    old.studySeconds=minutes*60;old.focusSessions=sessions;old.status=status;old.rest=status==='rest_day';old.manual=true;old.manualUpdatedAt=new Date().toISOString();if(note)old.note=note;s.days[date]=old;localStorage.setItem('missionOSDailyState',JSON.stringify(s));
    document.getElementById('dailyLogEditor').classList.remove('open');a.render();const toast=document.getElementById('toast');if(toast){toast.textContent=`Saved ${date}: ${minutes} minutes`;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),2200)}
  }
  function open(date){ensure();document.getElementById('logDate').value=date||'';const s=JSON.parse(localStorage.getItem('missionOSDailyState')||'{}');const d=s.days?.[date];document.getElementById('logMinutes').value=d?Math.round((d.studySeconds||0)/60):'';document.getElementById('logSessions').value=d?.focusSessions||0;document.getElementById('logStatus').value=d?.status||'studied';document.getElementById('logNote').value=d?.note||'';document.getElementById('dailyLogEditor').classList.add('open');}
  function addButton(){const toolbar=document.querySelector('#missions .toolbar');if(!toolbar||document.getElementById('manualDailyLog'))return;const b=document.createElement('button');b.id='manualDailyLog';b.className='ghost';b.textContent='Edit study history';b.onclick=()=>open('');toolbar.appendChild(b)}
  window.missionOSDailyLog={open,ensure};
  const boot=()=>{addButton();setTimeout(addButton,300);};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
