// Mission Learning OS — Daily State & Day Boundary Engine v1.1
// Tracks real execution by Iran calendar day. Does not equate mission completion with studying.
(() => {
  const KEY='missionOSDailyState';
  const TZ='Asia/Tehran';
  const get=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'{}')}catch{return {}}};
  const save=s=>localStorage.setItem(KEY,JSON.stringify(s));
  const pad=n=>String(n).padStart(2,'0');
  const iranDate=()=>new Intl.DateTimeFormat('en-CA',{timeZone:TZ,year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
  const iranParts=()=>{const p=new Intl.DateTimeFormat('en-US',{timeZone:TZ,hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false}).formatToParts(new Date());const o={};p.forEach(x=>o[x.type]=x.value);return o};
  const ensureDay=(s,date)=>{if(!s.days)s.days={};if(!s.days[date])s.days[date]={date,startedAt:null,endedAt:null,studySeconds:0,focusSessions:0,missionsStarted:[],missionsCompleted:[],status:'not_started',rest:false,targetMinutes:60};return s.days[date]};
  const status=d=>d.rest?'rest_day':d.studySeconds>=d.targetMinutes*60?'completed':d.studySeconds>0?'studied':'not_started';
  const current=()=>{const s=get();const d=ensureDay(s,iranDate());d.status=status(d);save(s);return d};
  const start=missionId=>{const s=get(),date=iranDate(),d=ensureDay(s,date);if(!d.startedAt)d.startedAt=new Date().toISOString();if(missionId&&!d.missionsStarted.includes(missionId))d.missionsStarted.push(missionId);d.status='studying';d.lastActivityAt=new Date().toISOString();save(s);return d};
  const addStudy=(seconds,missionId)=>{const n=Math.max(0,Number(seconds)||0);if(!n)return current();const s=get(),date=iranDate(),d=ensureDay(s,date);if(!d.startedAt)d.startedAt=new Date().toISOString();d.studySeconds+=n;if(missionId&&!d.missionsStarted.includes(missionId))d.missionsStarted.push(missionId);d.lastActivityAt=new Date().toISOString();d.status=status(d);save(s);render();return d};
  const session=missionId=>{const s=get(),d=ensureDay(s,iranDate());d.focusSessions++;if(missionId&&!d.missionsStarted.includes(missionId))d.missionsStarted.push(missionId);d.status=status(d);save(s);render()};
  const completed=missionId=>{const s=get(),d=ensureDay(s,iranDate());if(missionId&&!d.missionsCompleted.includes(missionId))d.missionsCompleted.push(missionId);d.status=status(d);save(s);render()};
  const setRest=value=>{const s=get(),d=ensureDay(s,iranDate());d.rest=!!value;d.status=status(d);save(s);render();};
  const closePreviousDays=()=>{const s=get(),today=iranDate();if(!s.days)return;Object.values(s.days).forEach(d=>{if(d.date<today&&!d.endedAt){d.endedAt=new Date().toISOString();d.status=d.rest?'rest_day':d.studySeconds>0?(d.studySeconds>=d.targetMinutes*60?'completed':'studied'):'missed'}});save(s);};
  function render(){const d=current();const mins=Math.floor(d.studySeconds/60),sec=d.studySeconds%60;const set=(id,v)=>{const e=document.getElementById(id);if(e)e.textContent=v};set('dailyStatus',d.rest?'Rest Day':d.studySeconds>=d.targetMinutes*60?'Completed':d.studySeconds>0?'Studied':'Not Started');set('dailyStudyTime',`${mins}m ${pad(sec)}s`);set('dailySessions',d.focusSessions);set('dailyMissions',d.missionsCompleted.length);set('dailyDate',d.date);const bar=document.getElementById('dailyProgress');if(bar)bar.style.width=`${Math.min(100,d.studySeconds/(d.targetMinutes*60)*100)}%`;}
  window.missionOSDaily={current,start,addStudy,session,completed,setRest,closePreviousDays,render,iranDate,iranParts};
  const loadDailyReport=()=>{if(document.querySelector('script[data-daily-report]'))return;const s=document.createElement('script');s.src='src/daily-log-editor.js?v=2.0';s.dataset.dailyReport='1';s.async=false;document.head.appendChild(s)};
  const boot=()=>{closePreviousDays();render();loadDailyReport();setInterval(()=>{closePreviousDays();render()},30000)};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
