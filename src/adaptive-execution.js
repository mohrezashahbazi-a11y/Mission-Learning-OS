// Mission Learning OS — Adaptive Execution v1.0
// Chooses an execution style from the Mission domain without changing the stable Timer.
(() => {
  const titles={
    'GE-01':'The Beginning of Geotechnical Engineering','GE-02':'Soil Mechanics — Three-Phase System','GE-03':'Soil Mechanics — Unit Weights',
    'EN-GRAMMAR-01':'Present Simple','EN-GRAMMAR-02':'Present Continuous','TECH-01':'Geotechnical Vocabulary Set 01','TECH-02':'Geotechnical Vocabulary Set 02',
    'SYS-01':'System → Elements → Interconnections → Purpose','SYS-02':'Systems Thinking × Geotechnics','PY-01':'Python — Session 1','PY-02':'Python — Session 2'
  };
  const profiles={
    geotechnics:{label:'GEOTECHNICS',focus:'Understand → model → apply',rule:'Prioritize physical meaning before formulas.',stages:['Concept','Model','Example','Recall','Engineering application']},
    english:{label:'ENGLISH',focus:'Input → notice → produce',rule:'Do not only recognize the rule; produce it without looking.',stages:['Input','Notice','Controlled practice','Retrieval','Production']},
    vocabulary:{label:'VOCABULARY',focus:'Meaning → context → retrieval',rule:'Every word needs meaning, technical context and recall.',stages:['Collect','Define','Contextualize','Retrieve','Use']},
    systems:{label:'SYSTEMS THINKING',focus:'Map → connect → test',rule:'Always trace relationships, not isolated elements.',stages:['Define','Map','Connect','Test','Explain']},
    python:{label:'PYTHON',focus:'See → type → modify → solve',rule:'Never watch code passively; type and run it yourself.',stages:['Orient','Code along','Modify','Solve','Explain']}
  };
  function domain(id){if(/^GE-/.test(id))return'geotechnics';if(/^EN-/.test(id))return'english';if(/^TECH-/.test(id))return'vocabulary';if(/^SYS-/.test(id))return'systems';if(/^PY-/.test(id))return'python';return'geotechnics'}
  function current(){const m=document.getElementById('modal'),t=document.getElementById('mtitle')?.textContent?.trim();if(!m?.classList.contains('open')||!t)return null;const id=Object.keys(titles).find(k=>titles[k]===t);return id?{id,title:t}:null}
  function render(){const cur=current();if(!cur)return;const d=domain(cur.id),p=profiles[d],detail=document.querySelector('.mission-detail');if(!detail)return;let box=document.getElementById('adaptiveExecutionPanel');if(!box){box=document.createElement('div');box.id='adaptiveExecutionPanel';box.className='detail';detail.insertBefore(box,detail.firstChild)}box.setAttribute('dir','rtl');box.style.direction='rtl';box.innerHTML=`<div style="display:flex;justify-content:space-between;gap:10px;align-items:center"><div><b dir="ltr" style="display:block;direction:ltr;text-align:left">Adaptive Execution</b><div class="dsub" style="margin-top:3px">روش اجرای این Mission بر اساس نوع یادگیری انتخاب شده است.</div></div><span class="chip" dir="ltr">${p.label}</span></div><div style="margin-top:10px"><strong dir="ltr" style="display:block;text-align:left">${p.focus}</strong><div class="dsub" style="margin-top:5px">${p.rule}</div></div><div class="chips" style="margin-top:10px">${p.stages.map((x,i)=>`<span class="chip" dir="ltr">${i+1}. ${x}</span>`).join('')}</div>`}
  function boot(){render();setInterval(render,700)}
  window.missionOSAdaptiveExecution={version:'1.0',profiles,domain,render};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();