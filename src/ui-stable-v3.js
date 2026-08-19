// Mission Learning OS — Stable Unified UI v3
// Visual layer only. Does not change Mission, Director, Energy, Execution, Review, History, Mastery or Sync logic.
(() => {
  const STYLE_ID = 'mlos-stable-ui-v3';

  const installStyle = () => {
    let old = document.getElementById(STYLE_ID);
    if (old) old.remove();

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      :root{
        --ui-bg:#F5F1E8;
        --ui-paper:#FBF9F4;
        --ui-paper-2:#F7F3EA;
        --ui-border:#D9D3C8;
        --ui-ink:#191B17;
        --ui-muted:#716F68;
        --ui-green:#214F3B;
        --ui-green-dark:#173E2F;
        --ui-shadow:0 6px 20px rgba(35,38,30,.05);
        --ui-side:64px;
        --ui-grad:46px;
        --ui-safe:env(safe-area-inset-top,0px);
      }

      html,body{
        margin:0!important;
        min-height:100%!important;
        background:var(--ui-bg)!important;
        color:var(--ui-ink)!important;
        font-family:Inter,system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif!important;
        font-size:12px!important;
        line-height:1.45!important;
      }

      body{
        background:var(--ui-bg)!important;
        padding:0!important;
      }

      body::before{
        content:""!important;
        position:fixed!important;
        left:var(--ui-side)!important;
        right:0!important;
        top:0!important;
        height:calc(var(--ui-grad) + var(--ui-safe))!important;
        background:linear-gradient(180deg,#2A473B 0%,#617269 26%,#B7B7AE 62%,rgba(245,241,232,0) 100%)!important;
        pointer-events:none!important;
        z-index:0!important;
      }

      .app{min-height:100vh!important;background:transparent!important}

      /* Actual sidebar classes used by the app */
      .side{
        width:var(--ui-side)!important;
        position:fixed!important;
        inset:0 auto 0 0!important;
        padding:calc(var(--ui-safe) + 8px) 7px 12px!important;
        background:#F8F5EE!important;
        border-right:1px solid rgba(44,67,54,.10)!important;
        box-shadow:none!important;
        backdrop-filter:none!important;
        z-index:50!important;
        box-sizing:border-box!important;
      }

      .brand{
        height:44px!important;
        margin:0 0 10px!important;
        padding:0!important;
        display:flex!important;
        justify-content:center!important;
        align-items:center!important;
        gap:0!important;
        font-size:0!important;
      }
      .brand span,.bottom{display:none!important}

      .logo{
        width:38px!important;
        height:38px!important;
        min-width:38px!important;
        border-radius:50%!important;
        background:var(--ui-paper)!important;
        border:1px solid rgba(33,79,59,.35)!important;
        display:grid!important;
        place-items:center!important;
        overflow:hidden!important;
        box-shadow:none!important;
        padding:3px!important;
        box-sizing:border-box!important;
        font-size:0!important;
      }
      .logo svg{width:100%!important;height:100%!important;display:block!important}

      .nav{display:grid!important;gap:6px!important}
      .nav button{
        width:48px!important;
        height:42px!important;
        min-height:42px!important;
        margin:0 auto!important;
        padding:0!important;
        border:1px solid transparent!important;
        border-radius:12px!important;
        background:transparent!important;
        color:#62665F!important;
        display:grid!important;
        place-items:center!important;
        text-align:center!important;
        box-shadow:none!important;
        font-size:0!important;
      }
      .nav button:hover{background:#EFEAE1!important;color:var(--ui-green)!important}
      .nav button.active{
        background:#E9E4D9!important;
        border-color:rgba(33,79,59,.08)!important;
        color:var(--ui-green)!important;
      }
      .nav button span{display:none!important}
      .mlos-v3-icon{
        width:19px!important;
        height:19px!important;
        stroke:currentColor!important;
        fill:none!important;
        stroke-width:1.8!important;
        stroke-linecap:round!important;
        stroke-linejoin:round!important;
      }

      /* Main layout */
      .main{
        margin-left:var(--ui-side)!important;
        max-width:none!important;
        padding:calc(var(--ui-safe) + 56px) 14px 34px!important;
        box-sizing:border-box!important;
        background:transparent!important;
      }

      .section{display:none!important}
      .section.active{display:block!important}

      .top{
        display:block!important;
        margin:0 0 13px!important;
      }
      .eyebrow{
        color:var(--ui-green)!important;
        font-size:8.5px!important;
        line-height:1.2!important;
        font-weight:800!important;
        letter-spacing:.16em!important;
        text-transform:uppercase!important;
      }
      .title{
        color:var(--ui-ink)!important;
        font-size:17px!important;
        line-height:1.2!important;
        letter-spacing:-.02em!important;
        font-weight:800!important;
        margin:5px 0 6px!important;
        max-width:520px!important;
      }
      .subtitle{
        color:var(--ui-muted)!important;
        font-size:10.5px!important;
        line-height:1.5!important;
        max-width:560px!important;
      }
      .date,.pill{
        display:inline-flex!important;
        align-items:center!important;
        margin-top:8px!important;
        padding:7px 10px!important;
        border-radius:10px!important;
        border:1px solid var(--ui-border)!important;
        background:rgba(251,249,244,.95)!important;
        color:#454840!important;
        font-size:10px!important;
        box-shadow:none!important;
      }

      .grid{display:block!important;max-width:900px!important}
      .grid>div+div{margin-top:11px!important}
      .panel{
        background:rgba(251,249,244,.97)!important;
        border:1px solid var(--ui-border)!important;
        border-radius:16px!important;
        padding:14px!important;
        box-shadow:var(--ui-shadow)!important;
      }
      .hero{
        padding:15px!important;
        background:rgba(251,249,244,.98)!important;
      }
      .hero h1{
        font-size:16px!important;
        line-height:1.28!important;
        letter-spacing:-.02em!important;
        font-weight:800!important;
        margin:6px 0 7px!important;
        color:var(--ui-ink)!important;
      }
      .panel h2{
        font-size:14px!important;
        line-height:1.25!important;
        font-weight:800!important;
        margin:0 0 9px!important;
        color:var(--ui-ink)!important;
      }

      .chips,.actions,.tags{display:flex!important;gap:6px!important;flex-wrap:wrap!important}
      .chips{margin-top:8px!important}
      .chip,.tag{
        font-size:9px!important;
        line-height:1.2!important;
        padding:5px 8px!important;
        border-radius:999px!important;
        background:#F2EEE5!important;
        color:#4E5049!important;
        border:1px solid var(--ui-border)!important;
      }

      .mission{
        display:flex!important;
        gap:9px!important;
        align-items:center!important;
        padding:10px 11px!important;
        border:1px solid var(--ui-border)!important;
        background:#FAF8F3!important;
        border-radius:12px!important;
        margin-top:7px!important;
        box-shadow:none!important;
      }
      .mission:hover{transform:none!important;border-color:#C8C1B5!important}
      .mission-main{min-width:0!important;flex:1!important}
      .mission-title{
        font-size:11.5px!important;
        line-height:1.3!important;
        font-weight:750!important;
        color:var(--ui-ink)!important;
      }
      .mission-meta{
        font-size:9.5px!important;
        line-height:1.4!important;
        color:var(--ui-muted)!important;
        margin-top:2px!important;
      }
      .score,.status{font-size:9px!important}
      .dot{width:7px!important;height:7px!important;flex:none!important}

      .toolbar{
        display:flex!important;
        gap:7px!important;
        flex-wrap:wrap!important;
        margin-bottom:10px!important;
      }
      .primary,.ghost{
        min-height:36px!important;
        padding:7px 10px!important;
        border-radius:10px!important;
        font-size:9.5px!important;
        font-weight:700!important;
      }
      .primary{background:#111311!important;color:white!important;border-color:#111311!important}
      .ghost{background:#EFEAE1!important;color:#292B27!important;border:1px solid var(--ui-border)!important}

      .statgrid{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:6px!important}
      .stat{padding:9px!important;border:1px solid var(--ui-border)!important;border-radius:10px!important;background:#F8F5EF!important}
      .num{font-size:15px!important;font-weight:800!important;color:var(--ui-ink)!important}
      .label{font-size:8.5px!important;color:var(--ui-muted)!important}
      .progress{height:5px!important;background:#E1DCD2!important}
      .bar{background:var(--ui-green)!important}

      .cards{display:grid!important;grid-template-columns:1fr!important;gap:10px!important}
      .domain{padding:12px!important;border:1px solid var(--ui-border)!important;border-radius:12px!important;background:#FAF8F3!important}
      .domain h3{font-size:11.5px!important;margin:0 0 5px!important}
      .domain p{font-size:9.5px!important;line-height:1.4!important;color:var(--ui-muted)!important}

      .deadline{padding:9px 0!important;border-bottom:1px solid #E9E4DA!important}
      .dlabel{font-size:10.5px!important}.dsub,.when{font-size:9px!important}

      .timeline{margin-left:6px!important;padding-left:18px!important}
      .timeline:before{left:3px!important;background:#D8D2C6!important}
      .tl{margin-bottom:15px!important}
      .tl:before{left:-18px!important;width:8px!important;height:8px!important;background:var(--ui-green)!important;box-shadow:0 0 0 3px #E8E3D9!important}
      .tl strong{font-size:10.5px!important}.tl span{font-size:9px!important;line-height:1.4!important}

      .modalbox{background:var(--ui-paper)!important;color:var(--ui-ink)!important;border:1px solid var(--ui-border)!important;border-radius:15px!important;padding:15px!important}
      .detail{background:#FAF8F3!important;border:1px solid var(--ui-border)!important;border-radius:10px!important;padding:10px!important}
      textarea{background:#FAF8F3!important;border:1px solid var(--ui-border)!important;color:var(--ui-ink)!important;font-size:10px!important}

      @media(min-width:768px){
        :root{--ui-side:70px;--ui-grad:48px}
        .main{padding-left:20px!important;padding-right:20px!important}
        .title{font-size:19px!important}
        .hero h1{font-size:18px!important}
        .panel h2{font-size:15px!important}
      }

      @media(max-width:420px){
        :root{--ui-side:60px;--ui-grad:42px}
        .side{padding-left:6px!important;padding-right:6px!important}
        .nav button{width:46px!important;height:40px!important}
        .logo{width:36px!important;height:36px!important;min-width:36px!important}
        .main{padding-left:10px!important;padding-right:10px!important;padding-top:calc(var(--ui-safe) + 50px)!important}
        .title{font-size:16px!important}
        .hero h1{font-size:15px!important}
        .panel{padding:12px!important;border-radius:14px!important}
      }
    `;
    document.head.appendChild(style);
  };

  const iconSvg = (name) => {
    const paths = {
      dashboard:'<path d="M4 11 12 4l8 7"/><path d="M6.5 10.5V20h11v-9.5"/><path d="M9.5 20v-5h5v5"/>',
      missions:'<path d="M6 7h12M6 12h12M6 17h8"/><path d="m3.5 7 .8.8 1.4-1.7M3.5 12l.8.8 1.4-1.7M3.5 17l.8.8 1.4-1.7"/>',
      curriculum:'<path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H12v18H7.5A3.5 3.5 0 0 0 4 23.5z"/><path d="M20 5.5A3.5 3.5 0 0 0 16.5 2H12v18h4.5a3.5 3.5 0 0 1 3.5 3.5z"/>',
      timeline:'<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M8 3v4M16 3v4M4 10h16"/>',
      review:'<path d="M20 12a8 8 0 1 1-2.3-5.7"/><path d="M20 5v5h-5"/>',
      adaptive:'<path d="M4 7h10M10 3l4 4-4 4M20 17H10M14 13l-4 4 4 4"/>',
      mastery:'<circle cx="12" cy="9" r="4"/><path d="m9 13-1 8 4-2 4 2-1-8"/>',
      analytics:'<path d="M4 20V12M10 20V5M16 20v-9M22 20V8"/>',
      cloud:'<path d="M7 18h10a4 4 0 0 0 .6-8A5 5 0 0 0 8 8a4 4 0 0 0-1 10Z"/>'
    };
    return `<svg class="mlos-v3-icon" viewBox="0 0 24 24" aria-hidden="true">${paths[name]||'<circle cx="12" cy="12" r="3"/>'}</svg>`;
  };

  const detectPage = (btn) => {
    const raw = `${btn.dataset.page||''} ${btn.dataset.tab||''} ${btn.getAttribute('aria-label')||''} ${btn.getAttribute('title')||''} ${btn.textContent||''}`.toLowerCase();
    if(raw.includes('dashboard')||raw.includes('home')) return 'dashboard';
    if(raw.includes('mission')||raw.includes('queue')) return 'missions';
    if(raw.includes('curriculum')||raw.includes('source')) return 'curriculum';
    if(raw.includes('timeline')||raw.includes('mentor')||raw.includes('deadline')) return 'timeline';
    if(raw.includes('review')||raw.includes('error')) return 'review';
    if(raw.includes('adaptive')) return 'adaptive';
    if(raw.includes('mastery')) return 'mastery';
    if(raw.includes('analytic')||raw.includes('performance')) return 'analytics';
    if(raw.includes('cloud')||raw.includes('sync')||raw.includes('google')) return 'cloud';
    return 'dot';
  };

  const installLogo = () => {
    const logo = document.querySelector('.logo');
    if(!logo) return;
    logo.innerHTML = `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M9 45Q22 50 32 44Q42 50 55 45" fill="none" stroke="#214F3B" stroke-width="2.8" stroke-linecap="round"/><path d="M32 44V19" stroke="#214F3B" stroke-width="2.8" stroke-linecap="round"/><path d="M31 27C23 27 18 22 17 16C24 16 29 20 31 27Z" fill="#6C934E"/><path d="M33 31C41 31 46 26 47 20C40 20 35 24 33 31Z" fill="#315C42"/><path d="M31 37C24 37 20 33 19 28C25 28 29 31 31 37Z" fill="#315C42"/></svg>`;
  };

  const installNavIcons = () => {
    document.querySelectorAll('.nav button').forEach((btn) => {
      const page = detectPage(btn);
      btn.innerHTML = iconSvg(page);
    });
  };

  const apply = () => {
    installStyle();
    installLogo();
    installNavIcons();
  };

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply, {once:true});
  else apply();

  const observer = new MutationObserver(() => {
    installLogo();
    installNavIcons();
    const s = document.getElementById(STYLE_ID);
    if(s && s !== document.head.lastElementChild) document.head.appendChild(s);
  });
  observer.observe(document.documentElement,{childList:true,subtree:true});
})();
