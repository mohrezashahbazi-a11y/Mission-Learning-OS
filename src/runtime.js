// Mission Learning OS — runtime integration v0.2
// Runtime is the authoritative execution layer for the existing UI.
// Goal: zero-decision execution.

const state = JSON.parse(localStorage.getItem('missionOSState') || '{}');
state.done = Array.isArray(state.done) ? state.done : [];
state.errors = Array.isArray(state.errors) ? state.errors : [];
state.energy = Number(state.energy || 7);
state.availableMinutes = Number(state.availableMinutes || 120);

const MISSIONS = [
  {id:'GE-01',order:1,type:'learn',title:'The Beginning of Geotechnical Engineering',subject:'Advanced Geotechnics',goal:'Study Das & Sobhan, Chapter 1 and build a compact knowledge base.',why:'This is the confirmed starting point of the geotechnical path.',pre:'None beyond basic study readiness.',next:'Move into the next confirmed geotechnical foundation unit.',mins:35,energy:3,required:true,weight:5,deadline:'2026-09-04',deliver:'Short summary + 5 active-recall questions.',check:'Explain the chapter without looking at the book.'},
  {id:'EN-GRAMMAR-01',order:2,type:'practice',title:'Present Simple',subject:'General English',goal:'Learn and practice Present Simple from English Grammar in Use.',why:'It is the first confirmed unit of the 3-week grammar sequence.',pre:'Basic sentence structure.',next:'Present Continuous.',mins:30,energy:2,required:true,weight:5,deadline:'2027-09-01',deliver:'Completed exercises + 5 original sentences.',check:'Choose Present Simple correctly in new examples.'},
  {id:'TECH-01',order:3,type:'learn',title:'Geotechnical Vocabulary Set 01',subject:'Technical English',goal:'Extract useful technical terms from today’s geotechnical reading.',why:'Technical English must grow from real geotechnical content.',pre:'GE-01.',next:'Vocabulary Set 02 from the next relevant reading.',mins:20,energy:2,required:true,weight:4,deadline:'2027-09-01',depends:['GE-01'],deliver:'10 Anki-ready cards: term → meaning → example.',check:'10 usable cards are written.'},
  {id:'SYS-01',order:4,type:'research',title:'System → Elements → Interconnections → Purpose',subject:'Systems Thinking',goal:'Understand the four concepts and apply them to a geotechnical system.',why:'Systems Thinking is a confirmed cross-cutting competency.',pre:'None.',next:'A Systems Thinking × Geotechnics application.',mins:30,energy:3,required:true,weight:3,deadline:'2026-09-04',deliver:'One note mapping the four concepts to a geotechnical problem.',check:'All four concepts are identified and connected to the case.'},
  {id:'PY-01',order:5,type:'eng',title:'Python — Session 1',subject:'Data Analysis',goal:'Follow Jadi’s first Python session using Watch → Pause → Type → Run.',why:'Python is a confirmed Digital Geotechnics skill.',pre:'None.',next:'Session 2 at the real course pace.',mins:35,energy:3,required:true,weight:4,deadline:'2027-09-01',deliver:'Run the session exercises + one tiny program.',check:'Code runs and every line can be explained.'}
];

const DEPENDS = Object.fromEntries(MISSIONS.map(m => [m.id, m.depends || []]));
function daysUntil(d){ return Math.ceil((new Date(d)-new Date())/86400000); }
function ready(m){ return !state.done.includes(m.id) && (DEPENDS[m.id]||[]).every(x=>state.done.includes(x)); }
function score(m){
  if(!ready(m)) return -Infinity;
  let s=(m.required?25:0)+(m.weight||0)*4;
  const d=daysUntil(m.deadline);
  if(d<=7)s+=45; else if(d<=30)s+=32; else if(d<=90)s+=20; else if(d<=180)s+=10;
  if(m.mins<=state.availableMinutes)s+=8; else s-=Math.min(18,(m.mins-state.availableMinutes)/5);
  if(m.energy<=state.energy)s+=8; else s-=Math.min(20,(m.energy-state.energy)*5);
  return s;
}
function workloadProfile(){
  if(state.energy>=8) return {name:'high',limit:4,minutes:150};
  if(state.energy>=5) return {name:'normal',limit:4,minutes:120};
  if(state.energy>=3) return {name:'low',limit:3,minutes:75};
  return {name:'recovery',limit:2,minutes:45};
}
function buildQueue(){
  const profile=workloadProfile();
  // The profile is a hard cap. User-provided available time can only reduce it, never expand it.
  const maxMinutes=Math.min(state.availableMinutes || 120, profile.minutes);
  const ranked=MISSIONS.map(m=>({...m,score:score(m)})).filter(m=>m.score>-Infinity).sort((a,b)=>b.score-a.score||a.order-b.order);
  const out=[]; let used=0;
  for(const m of ranked){
    if(out.length>=profile.limit) break;
    if(m.energy>state.energy+1) continue;
    let mins=m.mins;
    if(profile.name==='low') mins=Math.min(25,mins);
    if(profile.name==='recovery') mins=Math.min(20,mins);
    if(used+mins>maxMinutes) continue;
    out.push({...m,mins}); used+=mins;
  }
  return {queue:out,used,profile};
}
function save(){localStorage.setItem('missionOSState',JSON.stringify(state));}
function toast(t){const e=document.getElementById('toast');if(!e)return;e.textContent=t;e.classList.add('show');setTimeout(()=>e.classList.remove('show'),2200)}
function card(m){return `<div class="mission" data-runtime-id="${m.id}"><div class="dot ${m.type}"></div><div class="mission-main"><div class="mission-title">${m.title}</div><div class="mission-meta">${m.subject} · ${m.mins} min · ${m.energy}/10 energy</div></div><span class="score">${m.completed?'✓ Completed':'Priority '+Math.round(m.score||0)}</span></div>`}
function openMission(m){
  document.getElementById('mtitle').textContent=m.title;
  document.getElementById('mgoal').textContent=m.goal;
  document.getElementById('mwhy').textContent=m.why;
  document.getElementById('mpre').textContent=m.pre;
  document.getElementById('mnext').textContent=m.next;
  document.getElementById('mdeliver').textContent=m.deliver;
  document.getElementById('mchecktext').textContent=m.check;
  const check=document.getElementById('mcheck'); check.checked=state.done.includes(m.id);
  document.getElementById('completeBtn').onclick=()=>{
    if(!check.checked){toast('Complete the deliverable first.');return;}
    if(!state.done.includes(m.id)) state.done.push(m.id);
    save(); document.getElementById('modal').classList.remove('open'); renderRuntime(); toast('Completed. The Director recalculated your next Mission.');
  };
  document.getElementById('modal').classList.add('open');
}
function renderRuntime(){
  const {queue,used,profile}=buildQueue();
  const pending=MISSIONS.filter(m=>!state.done.includes(m.id));
  document.getElementById('coreCount').textContent=queue.length;
  document.getElementById('queueCount').textContent=`${queue.length} Core Missions · ${profile.name}`;
  document.getElementById('remaining').textContent=used+'m';
  document.getElementById('done').textContent=state.done.length;
  const pct=Math.round(state.done.length/MISSIONS.length*100);
  document.getElementById('pct').textContent=pct+'%';
  document.getElementById('bar').style.width=pct+'%';
  document.getElementById('missionList').innerHTML=queue.length?queue.map(card).join(''):'<div class="empty">Today’s executable queue is complete.</div>';
  document.getElementById('allMissions').innerHTML=pending.length?pending.map(m=>card({...m,score:score(m)})).join(''):'<div class="empty">No pending missions.</div>';
  const objective=profile.name==='recovery'?'Minimum viable progress. Keep the chain alive.':profile.name==='low'?'Light workload. Execute without redesigning the plan.':'Follow the queue. The Director has already decided what comes next.';
  document.getElementById('objective').textContent=objective;
  document.getElementById('today').textContent=new Date().toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'});
}

document.addEventListener('click', e=>{
  const mission=e.target.closest('[data-runtime-id]');
  if(mission){e.stopImmediatePropagation();const m=MISSIONS.find(x=>x.id===mission.dataset.runtimeId);if(m)openMission(m);}
}, true);

// Replace the original handler so energy is entered once and immediately recalculates the authoritative queue.
const energyButton=document.getElementById('energyBtn');
if(energyButton) energyButton.onclick=()=>{
  const v=prompt('Energy today (1–10):',String(state.energy));
  if(v!==null){
    const n=Number(v);
    if(Number.isFinite(n)) state.energy=Math.max(1,Math.min(10,n));
    save(); renderRuntime();
    const p=workloadProfile();
    toast(`Energy ${state.energy}/10 · ${p.name} workload · ${buildQueue().queue.length} Missions`);
  }
};

const resetButton=document.getElementById('reset');
if(resetButton) resetButton.onclick=()=>{state.done=[];save();renderRuntime();toast('Progress reset.');};

renderRuntime();
