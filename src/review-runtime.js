// Mission Learning OS — Review Runtime v0.1
// Bridges the spaced-review engine into the live browser app.
// Review cadence: 1 / 3 / 7 / 14 / 30 days.
(() => {
  const KEY='missionOSState', INTERVALS=[1,3,7,14,30];
  const REVIEWABLE={'GE-01':'The Beginning of Geotechnical Engineering','EN-GRAMMAR-01':'Present Simple','TECH-01':'Geotechnical Vocabulary Set 01','SYS-01':'System → Elements → Interconnections → Purpose','PY-01':'Python — Session 1'};
  const read=()=>{const s=JSON.parse(localStorage.getItem(KEY)||'{}');s.done=Array.isArray(s.done)?s.done:[];s.reviews=s.reviews&&typeof s.reviews==='object'?s.reviews:{};s.completedAt=s.completedAt&&typeof s.completedAt==='object'?s.completedAt:{};return s};
  const save=s=>localStorage.setItem(KEY,JSON.stringify(s));
  const key=d=>new Date(d).toISOString().slice(0,10);
  function sync(){const s=read();let changed=false;s.done.forEach(id=>{if(!REVIEWABLE[id]||s.reviews[id])return;const base=new Date(s.completedAt[id]||new Date());s.reviews[id]=INTERVALS.map((days,i)=>{const due=new Date(base);due.setDate(due.getDate()+days);return{reviewNumber:i+1,intervalDays:days,dueDate:key(due),status:'pending'}});changed=true});if(changed)save(s);return s}
  function due(s){const today=key(new Date());return Object.entries(s.reviews).flatMap(([id,items])=>items.filter(r=>r.status==='pending'&&r.dueDate<=today).map(r=>({id,...r,title:REVIEWABLE[id]})))}
  function render(){const s=sync(),d=due(s),list=document.getElementById('reviewList');if(!list)return;if(!Object.keys(s.reviews).length){list.innerHTML='<div class="empty">No reviews scheduled yet. Complete a Mission to create its review cycle.</div>';return}list.innerHTML=Object.entries(s.reviews).flatMap(([id,items])=>items.map(r=>`<div class="mission" style="cursor:default"><div class="dot learn"></div><div class="mission-main"><div class="mission-title">${REVIEWABLE[id]}</div><div class="mission-meta">Review ${r.reviewNumber} · ${r.intervalDays} day · due ${r.dueDate}</div></div><span class="status ${r.status==='completed'?'complete':''}">${r.status==='completed'?'Done':(d.some(x=>x.id===id&&x.reviewNumber===r.reviewNumber)?'Due':'Scheduled')}</span></div>`)).join('')}
  document.addEventListener('click',e=>{if(!e.target.closest('#completeBtn'))return;setTimeout(()=>{const s=read(),now=new Date().toISOString();s.done.forEach(id=>{if(!s.completedAt[id])s.completedAt[id]=now});save(s);render()},150)},true);
  setInterval(render,1500);render();
})();
