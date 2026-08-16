// Mission Learning OS — Execution Guide v0.1
// Gives each Mission a concrete, step-by-step path from Start to Finish.
(() => {
  const STATE_KEY='missionOSGuideState';
  const guides={
    'GE-01':[
      ['Activate prior knowledge',5,'Before opening the source, write 3–5 lines answering: What is soil? Why is soil an engineering material? What makes soil different from a manufactured material?'],
      ['Focused reading',20,'Read the assigned section of Das & Sobhan, Chapter 1. Do not copy notes. Mark only definitions, core ideas, and one engineering example.'],
      ['Extract the model',15,'Write the 5 most important ideas in your own words. For each, add one sentence explaining why it matters to a geotechnical engineer.'],
      ['Active recall',10,'Close the book. Answer: What is geotechnical engineering? What problems does it solve? What makes soil behavior difficult to predict?'],
      ['Build the deliverable',10,'Create one compact knowledge card: Concept → explanation → engineering significance → example. Then write the 5 active-recall questions.']
    ],
    'GE-02':[
      ['Recall GE-01',5,'Without notes, explain why soil needs an engineering model. Write what you remember about soil components.'],
      ['Learn the three-phase model',20,'Study solids, water and air. Draw the phase diagram yourself. Label volumes and weights.'],
      ['Build relationships',20,'Learn the meaning of void ratio, porosity, degree of saturation and water content. Write what each quantity physically represents.'],
      ['Active recall',10,'Close the source and redraw the three-phase diagram from memory. Explain each ratio without looking.'],
      ['Deliverable',5,'Finish one annotated three-phase diagram and a compact relationship sheet.']
    ],
    'GE-03':[
      ['Recall the phase model',5,'Redraw the three-phase system and identify which quantities change when air or water changes.'],
      ['Learn unit weights',20,'Study total, dry, saturated and submerged unit weights. Focus on physical meaning before formulas.'],
      ['Work examples',20,'Solve the assigned examples by hand. For every answer, write one sentence explaining what the result means physically.'],
      ['Retrieval',10,'Close the source and write the formulas from memory. Explain when each unit weight is appropriate.'],
      ['Deliverable',5,'Create a solved calculation set plus a one-page formula/meaning sheet.']
    ],
    'EN-GRAMMAR-01':[
      ['Input',10,'Study the Present Simple explanation in English Grammar in Use. Identify form, use and signal words.'],
      ['Notice',10,'Read the examples and mark why Present Simple is used in each one. Do not memorize isolated sentences.'],
      ['Controlled practice',15,'Complete the assigned exercises without checking answers. Then correct every mistake and write why it was wrong.'],
      ['Retrieval',10,'Close the book and explain the rule aloud. Create 5 new examples from your own life.'],
      ['Deliverable',5,'Save the completed exercises and your 5 original sentences.']
    ],
    'EN-GRAMMAR-02':[
      ['Recall',5,'Explain Present Simple from memory and give 3 examples.'],
      ['Input',10,'Study Present Continuous: form, meaning and common uses.'],
      ['Contrast',10,'Compare Present Simple vs Present Continuous using paired examples.'],
      ['Practice',20,'Complete the assigned exercises, then correct mistakes and explain each correction.'],
      ['Production',5,'Write 5 original sentences mixing both tenses correctly.']
    ],
    'TECH-01':[
      ['Collect',10,'During/after the GE-01 reading, select 10 useful geotechnical terms. Prefer terms you actually encountered.'],
      ['Define',10,'For each term, write a plain-English meaning. Do not copy a dictionary definition blindly.'],
      ['Contextualize',10,'Add one technical example sentence for every term.'],
      ['Retrieve',10,'Hide the meanings and test yourself on all 10 terms.'],
      ['Deliverable',5,'Create 10 Anki-ready cards: term → meaning → example.']
    ],
    'TECH-02':[
      ['Collect',10,'Extract 10 new terms from the current soil-mechanics reading. Do not reuse TECH-01 terms.'],
      ['Define',10,'Write concise meanings in your own words.'],
      ['Context',10,'Write engineering examples that show how the terms are actually used.'],
      ['Retrieve',10,'Test yourself without looking at the meanings.'],
      ['Deliverable',5,'Create the 10 Anki-ready cards and use at least 5 terms in original sentences.']
    ],
    'SYS-01':[
      ['Learn the four ideas',15,'Study System, Elements, Interconnections and Purpose. Write a one-sentence definition for each.'],
      ['Choose a case',10,'Pick one concrete geotechnical problem, such as settlement, slope failure or foundation performance.'],
      ['Map it',20,'Identify the system boundary, elements, important connections and overall purpose.'],
      ['Check the model',10,'Ask: What did I leave outside the system? Which connection is most important?'],
      ['Deliverable',5,'Create one structured system map and explain it in 5–8 sentences.']
    ],
    'SYS-02':[
      ['Select the engineering problem',10,'Choose a real geotechnical problem with interacting technical and contextual factors.'],
      ['Map elements',15,'List soil, structure, water, loads, construction process, monitoring and other relevant elements.'],
      ['Map connections',15,'Draw the important cause-and-effect or information relationships between elements.'],
      ['Test the system',15,'Change one element mentally and trace what else would change.'],
      ['Deliverable',5,'Produce one structured system map and explain the most important interaction.']
    ],
    'PY-01':[
      ['Watch',10,'Watch the assigned lesson once for the big picture. Do not code yet.'],
      ['Pause and type',20,'Replay in short sections. Pause, type every example yourself, and run it. Never paste without understanding.'],
      ['Modify',10,'Change at least two values or lines in the examples and run them again.'],
      ['Solve',15,'Complete one small exercise without looking at the solution.'],
      ['Artifact',5,'Save the working code and write one sentence explaining every new concept.']
    ],
    'PY-02':[
      ['Recall',5,'Without reopening Session 1, write what the previous session taught you.'],
      ['Watch',10,'Watch the new session once to understand the overall flow.'],
      ['Type and run',20,'Replay in short sections. Type every example yourself and run it.'],
      ['Modify and solve',20,'Change one example and solve one small exercise independently.'],
      ['Artifact',5,'Save the code and write a short explanation of the new concepts.']
    ]
  };
  const generic=[
    ['Orient',5,'Read the Mission goal, why it matters, prerequisite and deliverable. Do not start collecting random information.'],
    ['Learn',25,'Work through the assigned source actively. Focus only on the concepts named in the Mission.'],
    ['Process',15,'Close the source and reconstruct the main ideas in your own words.'],
    ['Retrieve',10,'Test yourself without looking at the source. Mark anything you cannot explain.'],
    ['Deliverable',5,'Complete the Mission deliverable and verify it against the completion check.']
  ];
  const read=()=>{try{return JSON.parse(localStorage.getItem(STATE_KEY)||'{}')}catch{return{}}};
  const write=x=>localStorage.setItem(STATE_KEY,JSON.stringify(x));
  const esc=s=>String(s).replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  let lastId='';
  function currentId(){const modal=document.getElementById('modal');const title=document.getElementById('mtitle')?.textContent?.trim();if(!modal?.classList.contains('open')||!title)return null;return Object.keys(guides).find(id=>{const map={GE-01:'The Beginning of Geotechnical Engineering',GE-02:'Soil Mechanics — Three-Phase System',GE-03:'Soil Mechanics — Unit Weights','EN-GRAMMAR-01':'Present Simple','EN-GRAMMAR-02':'Present Continuous','TECH-01':'Geotechnical Vocabulary Set 01','TECH-02':'Geotechnical Vocabulary Set 02','SYS-01':'System → Elements → Interconnections → Purpose','SYS-02':'Systems Thinking × Geotechnics','PY-01':'Python — Session 1','PY-02':'Python — Session 2'};return map[id]===title})||null;}
  function render(){const id=currentId();if(!id||id===lastId)return;lastId=id;const modal=document.getElementById('modal');if(!modal)return;let panel=document.getElementById('executionGuidePanel');if(!panel){panel=document.createElement('div');panel.id='executionGuidePanel';panel.className='detail';document.querySelector('.mission-detail')?.appendChild(panel);}const steps=guides[id]||generic;const st=read();const done=st[id]||{};panel.innerHTML=`<b>Execution Guide</b><div class="dsub">Do these steps in order. The timer measures active study time; step estimates are guidance, not a forced pace.</div><div class="guideSteps">${steps.map((x,i)=>`<label class="guideStep"><input type="checkbox" data-guide-id="${id}" data-guide-step="${i}" ${done[i]?'checked':''}><span><strong>Step ${i+1} — ${esc(x[0])}</strong><small>${x[1]} min · ${esc(x[2])}</small></span></label>`).join('')}</div>`;panel.querySelectorAll('input').forEach(input=>input.addEventListener('change',e=>{const s=read();s[id]=s[id]||{};s[id][e.target.dataset.guideStep]=e.target.checked;write(s);}));}
  const boot=()=>{const obs=new MutationObserver(render);const modal=document.getElementById('modal');if(modal)obs.observe(modal,{attributes:true,attributeFilter:['class'],childList:true,subtree:true});setInterval(()=>{if(!document.getElementById('modal')?.classList.contains('open'))lastId='';render();},500);};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();