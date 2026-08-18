// Mission Learning OS — UI Final Fix v4
// Visual-only override. Does not touch Mission / Energy / Director / Execution logic.
(() => {
  if (document.getElementById('mlos-ui-final-v4')) return;
  const style = document.createElement('style');
  style.id = 'mlos-ui-final-v4';
  style.textContent = `
    :root{--mlos-cream:#F5F1E8;--mlos-paper:#FBF9F4;--mlos-ink:#20231F;--mlos-muted:#73756D;--mlos-green:#214F3B;--mlos-gold:#B79A5A;--mlos-line:#DDD7CA}
    html,body{background:var(--mlos-cream)!important;color:var(--mlos-ink)!important}
    body{font-family:Inter,ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif!important;font-size:12px!important;line-height:1.42!important;background:linear-gradient(180deg,#29312D 0,#5B615B 12px,#A7AAA3 24px,#D5D2C9 34px,var(--mlos-cream) 48px,var(--mlos-cream) 100%)!important;background-attachment:fixed!important}

    /* Restore a stable, elegant navigation rail. */
    .side{width:66px!important;padding:calc(env(safe-area-inset-top) + 12px) 8px 14px!important;background:rgba(249,246,239,.97)!important;border-right:1px solid rgba(65,72,63,.12)!important;box-shadow:2px 0 14px rgba(36,38,33,.035)!important;backdrop-filter:blur(10px)!important}
    .brand{height:42px!important;padding:0!important;margin:0 0 18px!important;display:flex!important;justify-content:center!important;align-items:center!important}
    .brand span{display:none!important}
    .logo{width:38px!important;height:38px!important;min-width:38px!important;border-radius:50%!important;background:#FBF9F4!important;border:1px solid #B8C4B7!important;box-shadow:0 3px 10px rgba(33,79,59,.10)!important;padding:4px!important;display:grid!important;place-items:center!important;overflow:hidden!important}
    .logo svg{width:100%!important;height:100%!important;display:block!important}
    .nav{display:grid!important;gap:7px!important}
    .nav button{width:50px!important;height:42px!important;margin:0 auto!important;padding:0!important;border-radius:12px!important;background:transparent!important;color:#777970!important;display:grid!important;place-items:center!important;transition:background .16s ease,color .16s ease!important}
    .nav button.active{background:#E8E3D9!important;color:var(--mlos-green)!important;box-shadow:none!important}
    .nav button:hover{background:#EFEAE1!important;color:var(--mlos-green)!important}
    .nav button span{display:none!important}
    .mlos-nav-icon{width:19px!important;height:19px!important;stroke:currentColor!important;fill:none!important;stroke-width:1.7!important;stroke-linecap:round!important;stroke-linejoin:round!important}
    .bottom{display:none!important}

    /* Compact typography: elegant, not oversized. */
    .main{margin-left:66px!important;max-width:none!important;padding:calc(env(safe-area-inset-top) + 12px) 14px 34px!important}
    .top{display:block!important;margin:0 0 13px!important}
    .eyebrow{font-size:8px!important;letter-spacing:.14em!important;font-weight:750!important;color:var(--mlos-green)!important}
    .title{font-size:15px!important;line-height:1.2!important;letter-spacing:-.015em!important;font-weight:700!important;margin:4px 0 5px!important;max-width:330px!important}
    .subtitle{font-size:10px!important;line-height:1.45!important;color:var(--mlos-muted)!important;max-width:340px!important}
    .date{margin-top:7px!important;padding:7px 10px!important;border-radius:11px!important;font-size:10px!important;background:rgba(251,249,244,.84)!important;border:1px solid var(--mlos-line)!important}

    .grid{display:block!important;max-width:680px!important}
    .grid>div+div{margin-top:11px!important}
    .panel{background:rgba(251,249,244,.94)!important;border:1px solid rgba(164,154,139,.28)!important;border-radius:15px!important;padding:13px!important;box-shadow:0 6px 18px rgba(43,38,30,.045)!important}
    .hero{padding:14px!important;background:rgba(251,249,244,.96)!important;border-color:rgba(164,154,139,.30)!important}
    .hero h1{font-size:15px!important;line-height:1.25!important;letter-spacing:-.015em!important;margin:5px 0 7px!important;font-weight:700!important}
    .panel h2{font-size:12px!important;line-height:1.25!important;margin:0 0 9px!important;font-weight:700!important}
    .chips{gap:5px!important;margin-top:8px!important}
    .chip,.tag{font-size:9px!important;padding:4px 7px!important;border-radius:999px!important;background:#F1ECE3!important;border:1px solid #DDD6C9!important;color:#55574F!important}

    .mission{gap:9px!important;padding:9px 10px!important;border:1px solid #DDD7CA!important;background:#F9F6F0!important;border-radius:11px!important;margin-top:6px!important;box-shadow:none!important}
    .mission-title{font-size:11px!important;line-height:1.3!important;font-weight:680!important}
    .mission-meta{font-size:9px!important;line-height:1.35!important;margin-top:2px!important;color:#7B7C74!important}
    .score{font-size:9px!important}.dot{width:7px!important;height:7px!important}
    .toolbar{gap:5px!important;margin-bottom:9px!important}
    .primary,.ghost{padding:7px 9px!important;border-radius:9px!important;font-size:9px!important;font-weight:680!important}
    .statgrid{gap:6px!important}.stat{padding:9px!important;border-radius:10px!important}.num{font-size:15px!important}.label{font-size:8px!important}.progress{height:5px!important}

    @media(min-width:901px){.main{padding-left:24px!important;padding-right:24px!important}.grid{max-width:1040px!important}.title{font-size:21px!important}.hero h1{font-size:19px!important}.panel h2{font-size:13px!important}}
    @media(max-width:600px){.side{width:66px!important}.main{margin-left:66px!important;padding-left:11px!important;padding-right:11px!important;padding-top:calc(env(safe-area-inset-top) + 11px)!important}.title{font-size:15px!important}.hero{padding:13px!important}.hero h1{font-size:15px!important}.panel{padding:12px!important;border-radius:14px!important}}
    @media(max-width:380px){.side{width:60px!important;padding-left:6px!important;padding-right:6px!important}.main{margin-left:60px!important;padding-left:9px!important;padding-right:9px!important}.nav button{width:46px!important;height:40px!important}.logo{width:35px!important;height:35px!important}}
  `;
  document.head.appendChild(style);
})();
