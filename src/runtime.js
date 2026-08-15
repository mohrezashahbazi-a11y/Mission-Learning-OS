// Mission Learning OS — authoritative runtime v0.3
// Zero-decision execution. This layer owns queue, completion and energy.

(() => {
  const KEY='missionOSState';
  const state=JSON.parse(localStorage.getItem(KEY)||'{}');
  state.done=Array.isArray(state.done)?state.done:[];
  state.errors=Array.isArray(state.errors)?state.errors:[];
  state.energy=Number.isFinite(Number(state.energy))?Number(state.energy):7;
  state.availableMinutes=Number.isFinite(Number(state.availableMinutes))?Number(state.availableMinutes):120;

  const MISSIONS=[
    {id:'GE-01',order:1,type:'learn',title:'The Beginning of Geotechnical Engineering',subject:'Advanced Geotechnics',mins:35,energy:3,weight:5,deadline:'2026-09-04',depends:[],goal:'Study Das & Sobhan, Chapter 1 and build a compact knowledge base.',why:'This is the confirmed starting point of the geotechnical path.',pre:'None beyond basic study readiness.',next:'Move into the next confirmed geotechnical foundation unit.',deliver:'Short summary + 5 active-recall questions.',check:'Explain the chapter without looking at the book.'},
    {id:'EN-GRAMMAR-01',order:2,type:'practice',title:'Present Simple',subject:'General English',mins:30,energy:2,weight:5,deadline:'2027-09-01',depends:[],goal:'Learn and practice Present Simple from English Grammar in Use.',why:'It is the first confirmed unit of the grammar sequence.',pre:'Basic sentence structure.',next:'Present Continuous.',deliver:'Completed exercises + 5 original sentences.',check:'Choose Present Simple correctly in new examples.'},
    {id:'TECH-01',order:3,type:'learn',title:'Geotechnical Vocabulary Set 01',subject:'Technical English',mins:20,energy:2,weight:4,deadline:'2027-09-01',depends:['GE-01'],goal:'Extract useful technical terms from today’s geotechnical reading.',why:'Technical English must grow from real geotechnical content.',pre:'GE-01.',next:'Vocabulary Set 02 from the next relevant reading.',deliver:'10 Anki-ready cards: term → meaning → example.',check:'10 usable cards are written.'},
    {id:'SYS-01',order:4,type:'research',title:'System → Elements → Interconnections → Purpose',subject:'Systems Thinking',mins:30,energy:3,weight:3,deadline:'2026-09-04',depends:[],goal:'Understand the four concepts and apply them to a geotechnical system.',why:'Systems Thinking is a confirmed cross-cutting competency.',pre:'None.',next:'A Systems Thinking × Geotechnics application.',deliver:'One note mapping the four concepts to a geotechnical problem.',check:'All four concepts are identified and connected to the case.'},
    {id:'PY-01',order:5,type:'eng',title:'Python — Session 1',subject:'Data Analysis',mins:35,energy:3,weight:4,deadline:'2027-09-01',depends:[],goal:'Follow Jadi’s first Python session using Watch → Pause → Type → Run.',why:'Python is a confirmed Digital Geotechnics skill.',pre:'None.',next:'Session 2 at the real course pace.',deliver:'Run the session exercises + one tiny program.',check:'Code runs and every line can be explained.'}
  ];

  const save=()=>localStorage.setItem(KEY,JSON.stringify(state));
  const days=d=>Math.ceil((new Date(d)-new Date())/86400000);
  const ready=m=>!state.done.includes(m.id)&&(m.depends||[]).every(x=>state.done.includes(x));
  const profile=()=>state.energy>=8?{name:'high',limit:4,cap:150}:state.energy>=5?{name:'normal',limit:4,cap:120}:state.energy>=3?{name:'low',limit:3,cap:75}:{name:'recovery',limit:2,cap:45};
  const score=m=>{if(!ready(m))return -1e9;let s=25+(m.weight||0)*4;const d=days(m.deadline);if(d<=7)s+=45;else if(d<=30)s+=32;else if(d<=90)s+=20;else if(d<=180)s+=10;if(m.energy<=state.energy)s+=8;else s-=(m.energy-state.energy)*5;return s;};

  function buildQueue(){
    const p=profile();
    const cap=Math.min(p.cap,Math.max(0,state.availableMinutes));
    const ranked=MISSIONS.filter(ready).map(m=>({...m,priority:score(m)})).sort((a,b)=>b.priority-a.priority||a.order-b.order);
    const q=[];let used=0;
    for(const m of ranked){
      if(q.length>=p.limit)break;
      if(m.energy>state.energy+1)continue;
      const mins=p.name==='low'?Math.min(25,m.mins):p.name==='recovery'?Math.min(20,m.mins):m.mins;
      if(used+mins>cap)continue;
      q.push({...m,mins});used+=mins;
    }
    return {q,used,p,cap};
  }

  function render(){
    const {q,used,p}=buildQueue();
    const set=(id,v)=>{const e=document.getElementById(id);if(e)e.textContent=v;};
    set('coreCount',q.length);set('queueCount',`${q.length} Core Missions · ${p.name}`);set('remaining',`${used}m`);set('done',state.done.length);
    const pct=Math.round(state.done.length/MISSIONS.length*100);set('pct',`${pct}%`);const bar=document.getElementById('bar');if(bar)bar.style.width=`${pct}%`;
    const list=document.getElementById('missionList');if(list)list.innerHTML=q.length?q.map(card).join(''):'<div class="empty">Today’s executable queue is complete.</div>';
    const all=document.getElementById('allMissions');if(all)all.innerHTML=MISSIONS.filter(m=>!state.done.includes(m.id)).map(m=>card({...m,priority:score(m)})).join('');
    const obj=document.getElementById('objective');if(obj)obj.textContent=p.name==='recovery'?'Minimum viable progress. Keep the chain alive.':p.name==='low'?'Light workload. Execute without redesigning the plan.':'Follow the queue. The Director has already decided what comes next.';
    const today=document.getElementById('today');if(today)today.textContent=new Date().toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'});
  }

  function card(m){return `<div class="mission" data-runtime-id="${m.id}"><div class="dot ${m.type}"></div><div class="mission-main"><div class="mission-title">${m.title}</div><div class="mission-meta">${m.subject} · ${m.mins} min · ${m.energy}/10 energy</div></div><span class="score">Priority ${Math.round(m.priority||0)}</span></div>`;}
  function openMission(m){
    const ids=['mtitle','mgoal','mwhy','mpre','mnext','mdeliver','mchecktext'];const vals=[m.title,m.goal,m.why,m.pre,m.next,m.deliver,m.check];ids.forEach((id,i)=>{const e=document.getElementById(id);if(e)e.textContent=vals[i]});
    const check=document.getElementById('mcheck');if(check)check.checked=false;
    const btn=document.getElementById('completeBtn');if(btn)btn.onclick=()=>{if(!check?.checked){toast('Complete the deliverable first.');return;}if(!state.done.includes(m.id))state.done.push(m.id);save();document.getElementById('modal')?.classList.remove('open');render();toast('Completed. Queue recalculated.');};
    document.getElementById('modal')?.classList.add('open');
  }
  function toast(t){const e=document.getElementById('toast');if(e){e.textContent=t;e.classList.add('show');setTimeout(()=>e.classList.remove('show'),2200);}}

  // Capture phase makes this authoritative even if the legacy inline UI has its own handler.
  document.addEventListener('click',e=>{
    const energy=e.target.closest('#energyBtn');
    if(energy){e.preventDefault();e.stopImmediatePropagation();const v=window.prompt('Energy today (1–10):',String(state.energy));if(v!==null){const n=Number(v);if(Number.isFinite(n)){state.energy=Math.max(1,Math.min(10,n));save();render();const x=buildQueue();toast(`Energy ${state.energy}/10 · ${x.p.name} · ${x.q.length} Missions · ${x.used}m`);}}return;}
    const mission=e.target.closest('[data-runtime-id]');
    if(mission){e.preventDefault();e.stopImmediatePropagation();const m=MISSIONS.find(x=>x.id===mission.dataset.runtimeId);if(m)openMission(m);}
  },true);

  // Also replace the property handler as a second line of defense.
  const eb=document.getElementById('energyBtn');if(eb)eb.onclick=e=>{e.preventDefault();const v=window.prompt('Energy today (1–10):',String(state.energy));if(v!==null){const n=Number(v);if(Number.isFinite(n)){state.energy=Math.max(1,Math.min(10,n));save();render();const x=buildQueue();toast(`Energy ${state.energy}/10 · ${x.p.name} · ${x.q.length} Missions · ${x.used}m`);}}};
  const reset=document.getElementById('reset');if(reset)reset.onclick=()=>{state.done=[];save();render();toast('Progress reset.');};
  render();
})();
