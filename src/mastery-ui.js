// Mission Learning OS — Mastery UI v1.0
// Adds a read-only Mastery view. It never invents learning evidence and never imports test data.
(() => {
  const boot=()=>{
    if(!window.missionOSMastery)return;
    const nav=document.querySelector('.nav');
    const main=document.querySelector('.main');
    if(!nav||!main||document.getElementById('mastery'))return;
    const btn=document.createElement('button');
    btn.dataset.page='mastery';btn.innerHTML='◉ <span>Mastery</span>';
    nav.appendChild(btn);
    const sec=document.createElement('section');sec.id='mastery';sec.className='section';
    sec.innerHTML=`<div class="top"><div><div class="eyebrow">Learning Evidence</div><div class="title">Mastery</div><div class="subtitle">Mastery reflects learning evidence, not study time alone.</div></div></div><div class="panel"><div id="masteryStatus" class="subtitle"></div><div id="masteryGrid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px;margin-top:16px"></div></div>`;
    main.appendChild(sec);
    const render=()=>{
      const status=document.getElementById('masteryStatus'),grid=document.getElementById('masteryGrid');
      const data=window.missionOSMastery.get();
      if(!window.missionOSMastery.cycleActive()){
        status.textContent='No active Learning Cycle. Development/test activity is excluded from mastery.';
        grid.innerHTML='<div class="empty">Your real learning record will appear here after you start Learning Cycle #1.</div>';return;
      }
      const entries=Object.entries(data||{});
      status.textContent=entries.length?'Current mastery evidence':'No learning evidence recorded yet.';
      grid.innerHTML=entries.length?entries.map(([id,x])=>`<div class="domain"><h3>${id}</h3><div class="num">${x.score}%</div><div class="label">${String(x.level).replace('_',' ')} · ${x.evidenceCount} evidence</div><div class="progress" style="margin-top:12px"><div class="bar" style="width:${x.score}%"></div></div></div>`).join(''):'<div class="empty">No mastery data yet.</div>';
    };
    const activate=page=>{
      document.querySelectorAll('.section').forEach(s=>s.classList.toggle('active',s.id===page));
      document.querySelectorAll('.nav button').forEach(b=>b.classList.toggle('active',b.dataset.page===page));
      if(page==='mastery')render();
    };
    btn.addEventListener('click',()=>activate('mastery'));
    document.querySelectorAll('.nav button').forEach(b=>b.addEventListener('click',()=>activate(b.dataset.page)));
    window.missionOSMasteryUI={render};
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
