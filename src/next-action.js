// Mission Learning OS — Next Action controller v0.4
// Turns the Director's ranked mission into one explicit action. Rest days intentionally suspend execution.
(() => {
  const q = sel => document.querySelector(sel);
  const text = el => el?.textContent?.trim() || '';
  function ensureRoot() {
    let root=q('#nextAction'); if(root)return root;
    const hero=q('#dashboard .hero'); if(!hero)return null;
    root=document.createElement('div');
    root.id='nextAction';
    root.style.cssText='margin-top:18px;padding:16px;border:1px solid #5b7254;border-radius:10px;background:#243322;color:#f7f3eb;box-shadow:0 8px 20px rgba(28,40,25,.16)';
    hero.appendChild(root); return root;
  }
  function render() {
    const root=ensureRoot();
    if(!root)return;
    if(window.missionOSRestDay?.isRest?.()){root.style.display='none';return;}
    root.style.display='';
    const mission=q('#missionList .mission'); if(!mission)return;
    const title=text(mission.querySelector('.mission-title')), meta=text(mission.querySelector('.mission-meta')), score=text(mission.querySelector('.score')), id=mission.dataset.runtimeId||'';
    const planned=Number((meta.match(/(\d+) min/)||[])[1]||0);
    root.innerHTML=`<div style="font-size:10px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:#a9bb9f">YOUR NEXT ACTION</div><div style="font-size:19px;font-weight:800;margin-top:6px;color:#fffdf8">${title}</div><div class="subtitle" style="margin-top:4px;color:#d4d1c8">${meta}</div><div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-top:10px"><span class="chip" style="background:#43583f;border-color:#70896b;color:#f1f4ec">${score||'Selected by Director'}</span><button id="startNextAction" class="primary" style="margin-left:auto;background:#70896b;color:#10140f;border-color:#80977b;box-shadow:none">START MISSION</button></div>`;
    const btn=q('#startNextAction'); if(btn)btn.onclick=()=>{if(window.missionOSRestDay?.isRest?.())return;window.missionOSExecutionHistory?.start(id,planned);mission.click();};
  }
  window.missionOSNextAction={render};
  const boot=()=>{render();setTimeout(render,250);setInterval(render,1500);};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
