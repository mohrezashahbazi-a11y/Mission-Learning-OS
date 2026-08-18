// Mission Learning OS — Premium UI v1
// UI ONLY. Does not alter Mission, Director, Energy, Execution, Review, History or persistence logic.
(() => {
  if (window.__MLOS_PREMIUM_UI_V1__) return;
  window.__MLOS_PREMIUM_UI_V1__ = true;

  const css = `
    :root{
      --p-bg:#F5F1E8;
      --p-surface:#FCFAF5;
      --p-surface-2:#F8F5EE;
      --p-border:#DDD7CA;
      --p-border-soft:#E9E3D8;
      --p-ink:#1B1D18;
      --p-muted:#70726A;
      --p-green:#244B36;
      --p-green-2:#315D43;
      --p-green-soft:#E6EBE2;
      --p-danger:#9A4D43;
    }
    html{background:var(--p-bg)!important;}
    body{
      margin:0!important;
      background:linear-gradient(180deg,#2B312D 0,#59605A 7px,#9A9E96 14px,#C9C9C1 21px,#E7E3DA 29px,var(--p-bg) 38px,var(--p-bg) 100%)!important;
      color:var(--p-ink)!important;
      font-family:"Plus Jakarta Sans",Inter,system-ui,-apple-system,"Segoe UI",sans-serif!important;
      font-size:13px!important;
      line-height:1.45!important;
    }
    .app{min-height:100vh!important;}
    .side{
      width:76px!important;position:fixed!important;left:0!important;top:0!important;bottom:0!important;
      padding:calc(env(safe-area-inset-top) + 14px) 8px calc(env(safe-area-inset-bottom) + 14px)!important;
      background:rgba(248,245,238,.94)!important;border-right:1px solid rgba(80,78,70,.10)!important;
      box-shadow:2px 0 18px rgba(40,38,31,.035)!important;backdrop-filter:blur(12px)!important;z-index:50!important;
    }
    .brand{height:52px!important;padding:0!important;margin:0 0 17px!important;display:flex!important;align-items:center!important;justify-content:center!important;}
    .brand span{display:none!important;}
    .logo{width:46px!important;height:46px!important;border-radius:50%!important;background:var(--p-surface)!important;border:1.5px solid var(--p-green)!important;color:var(--p-green)!important;font-size:0!important;box-shadow:0 4px 14px rgba(36,75,54,.10)!important;position:relative!important;overflow:hidden!important;}
    .logo:after{content:"✦";font-size:25px;font-weight:700;line-height:1;color:var(--p-green);}
    .nav{display:grid!important;gap:7px!important;}
    .nav button{width:54px!important;height:46px!important;margin:auto!important;padding:0!important;border-radius:14px!important;background:transparent!important;color:#6B6D66!important;display:grid!important;place-items:center!important;font-size:0!important;}
    .nav button::first-letter{font-size:18px!important;}
    .nav button.active{background:#E6E1D6!important;color:var(--p-green)!important;box-shadow:inset 0 0 0 1px rgba(36,75,54,.04)!important;}
    .nav button:hover{background:#EEEAE1!important;color:var(--p-green)!important;}
    .nav span,.bottom{display:none!important;}
    .main{
      margin-left:76px!important;max-width:1040px!important;padding:calc(env(safe-area-inset-top) + 25px) 24px calc(env(safe-area-inset-bottom) + 45px)!important;
    }
    .top{display:block!important;margin-bottom:18px!important;}
    .eyebrow{color:var(--p-green)!important;font-size:10px!important;font-weight:800!important;letter-spacing:.14em!important;text-transform:uppercase!important;}
    .title{color:var(--p-ink)!important;font-size:25px!important;line-height:1.18!important;font-weight:800!important;letter-spacing:-.035em!important;margin:7px 0 8px!important;max-width:700px!important;}
    .subtitle{color:var(--p-muted)!important;font-size:13px!important;line-height:1.55!important;}
    .date{display:inline-flex!important;margin-top:11px!important;padding:8px 12px!important;border-radius:12px!important;background:rgba(252,250,245,.92)!important;border:1px solid var(--p-border)!important;color:#454740!important;font-size:12px!important;}
    .grid{display:block!important;max-width:780px!important;}
    .grid>div+div{margin-top:14px!important;}
    .panel{
      background:rgba(252,250,245,.95)!important;border:1px solid var(--p-border)!important;border-radius:18px!important;padding:18px!important;
      box-shadow:0 9px 28px rgba(44,40,32,.045)!important;
    }
    .hero{background:rgba(252,250,245,.97)!important;border-color:#D7D0C2!important;padding:22px!important;}
    .hero h1{color:var(--p-ink)!important;font-size:26px!important;line-height:1.2!important;letter-spacing:-.035em!important;font-weight:800!important;margin:8px 0 9px!important;}
    .panel h2{color:var(--p-ink)!important;font-size:18px!important;line-height:1.25!important;font-weight:800!important;letter-spacing:-.025em!important;margin:0 0 11px!important;}
    .chips{gap:7px!important;margin-top:13px!important;}
    .chip,.tag{font-size:11px!important;padding:6px 10px!important;border-radius:999px!important;background:#F0ECE3!important;border:1px solid var(--p-border)!important;color:#4B4D47!important;}
    .mission{gap:11px!important;padding:12px 13px!important;border:1px solid var(--p-border)!important;background:#FAF8F3!important;border-radius:13px!important;margin-top:8px!important;box-shadow:none!important;}
    .mission:hover{transform:translateY(-1px)!important;border-color:#C7C0B2!important;box-shadow:0 7px 18px rgba(44,40,32,.05)!important;}
    .mission-title{font-size:13px!important;line-height:1.35!important;font-weight:750!important;color:var(--p-ink)!important;}
    .mission-meta{font-size:11px!important;line-height:1.4!important;margin-top:3px!important;color:#77786F!important;}
    .score{font-size:11px!important;color:#61776A!important;white-space:nowrap!important;}
    .dot{width:8px!important;height:8px!important;}
    .statgrid{gap:8px!important;}
    .stat{padding:11px!important;border-radius:12px!important;background:#F9F6F0!important;border:1px solid var(--p-border-soft)!important;}
    .num{font-size:19px!important;color:var(--p-ink)!important;font-weight:800!important;}
    .label{font-size:10px!important;color:#777970!important;}
    .progress{height:7px!important;background:#E7E2D8!important;}
    .bar{background:var(--p-green)!important;}
    .deadline{padding:12px 0!important;border-bottom:1px solid var(--p-border-soft)!important;}
    .dlabel{font-size:12px!important;color:var(--p-ink)!important;}.dsub{font-size:10px!important;color:var(--p-muted)!important;}.when{font-size:11px!important;}
    .cards{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:12px!important;}
    .domain{padding:14px!important;border:1px solid var(--p-border)!important;border-radius:13px!important;background:#FAF8F3!important;}
    .domain h3{font-size:13px!important;color:var(--p-ink)!important;}.domain p{font-size:11px!important;color:var(--p-muted)!important;}
    .toolbar{gap:7px!important;margin-bottom:12px!important;flex-wrap:wrap!important;}
    .primary,.ghost{min-height:42px!important;padding:9px 12px!important;border-radius:11px!important;font-size:11px!important;font-weight:750!important;}
    .primary{background:var(--p-green)!important;color:#fff!important;}.ghost{background:#EFEAE1!important;color:#33352F!important;border:1px solid var(--p-border)!important;}
    .timeline{margin-left:7px!important;padding-left:22px!important;}.timeline:before{background:#D7D1C4!important;}.tl:before{background:var(--p-green)!important;box-shadow:0 0 0 4px #E7E4DA!important;}
    .detail{background:#FAF8F3!important;border:1px solid var(--p-border)!important;border-radius:11px!important;}
    textarea{background:#FAF8F3!important;border:1px solid var(--p-border)!important;color:var(--p-ink)!important;}
    .modalbox{background:var(--p-surface)!important;color:var(--p-ink)!important;border:1px solid var(--p-border)!important;border-radius:18px!important;}
    .close{background:#EEE9DF!important;color:var(--p-ink)!important;}
    .toast{background:#263C2D!important;color:#fff!important;border:0!important;}
    @media(max-width:900px){.main{max-width:none!important;padding-left:18px!important;padding-right:18px!important}.cards{grid-template-columns:1fr!important;}}
    @media(max-width:600px){.side{width:68px!important;padding-left:6px!important;padding-right:6px!important}.main{margin-left:68px!important;padding-left:13px!important;padding-right:13px!important;padding-top:calc(env(safe-area-inset-top) + 20px)!important}.title{font-size:22px!important}.hero h1{font-size:23px!important}.panel{padding:15px!important;border-radius:16px!important}.hero{padding:17px!important;}}
    @media(max-width:380px){.side{width:60px!important}.main{margin-left:60px!important;padding-left:10px!important;padding-right:10px!important}.logo{width:42px!important;height:42px!important}.nav button{width:48px!important;height:43px!important}.title{font-size:20px!important}.hero h1{font-size:21px!important;}}
    @media(prefers-reduced-motion:reduce){*,*::before,*::after{transition:none!important;animation:none!important;}}
  `;
  const style=document.createElement('style');
  style.id='mlos-premium-ui-v1';
  style.textContent=css;
  document.head.appendChild(style);
})();