// Mission Learning OS — Analytics Engine v1.0
// Read-only analytics layer. Never invents study data; derives metrics from real execution/mastery state.
(() => {
  const STATE='missionOSState', ACTIVE='missionOSActiveSession', MASTERY='missionOSMastery';
  const read=k=>{try{return JSON.parse(localStorage.getItem(k)||'null')}catch{return null}};
  const history=()=>Array.isArray(read(STATE)?.executionHistory)?read(STATE).executionHistory:[];
  const active=()=>read(ACTIVE);
  const dayKey=v=>{const d=new Date(v);if(Number.isNaN(d.getTime()))return null;return new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Tehran'}).format(d)};
  const last7=()=>{const out={},now=new Date();for(let i=6;i>=0;i--){const d=new Date(now);d.setDate(now.getDate()-i);out[dayKey(d)]=0}history().forEach(x=>{const k=dayKey(x.completedAt||x.startedAt);if(k&&k in out)out[k]+=Number(x.actualMinutes||0)});const a=active();if(a?.status==='running'){const start=new Date(a.activeStartedAt);const mins=Math.max(0,(Date.now()-start.getTime())/60000);const k=dayKey(new Date());if(k&&k in out)out[k]+=mins}return out};
  const sessions=history();
  function summary(){const h=sessions(),planned=h.reduce((n,x)=>n+Number(x.plannedMinutes||0),0),actual=h.reduce((n,x)=>n+Number(x.actualMinutes||0),0),count=h.length,completed=count;return{sessions:count,completed,plannedMinutes:planned,actualMinutes:Math.round(actual),completionRate:planned?Math.round(actual/planned*100):0,activeSession:!!active()}};
  function subjects(){const out={};sessions().forEach(x=>{const id=x.id||'unknown';if(!out[id])out[id]={id,sessions:0,minutes:0,plannedMinutes:0};out[id].sessions++;out[id].minutes+=Number(x.actualMinutes||0);out[id].plannedMinutes+=Number(x.plannedMinutes||0)});return Object.values(out)}
  function mastery(){return read(MASTERY)||{}}
  function snapshot(){return{version:'1.0',generatedAt:new Date().toISOString(),summary:summary(),last7Days:last7(),subjects:subjects(),mastery:mastery()}};
  window.missionOSAnalytics={version:'1.0',summary,last7Days:last7,subjects,mastery,snapshot};
})();
