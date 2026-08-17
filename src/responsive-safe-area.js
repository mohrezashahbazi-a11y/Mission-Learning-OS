// Mission Learning OS — Responsive / Safe Area Layer v1.1
// Visual-only layer. Keeps content clear of Android/iOS status bars and improves mobile/tablet sizing.
(() => {
  if (document.getElementById('responsive-safe-area-v1')) return;
  const style = document.createElement('style');
  style.id = 'responsive-safe-area-v1';
  style.textContent = `
    :root{--mlos-cream:#f7f3eb;--mlos-safe-top:max(22px,env(safe-area-inset-top))}
    html,body{min-width:0;overflow-x:hidden}
    /* Shorter top fade: roughly one-third of the previous vertical gradient span. */
    body{background:linear-gradient(180deg,#252d28 0px,#3e4841 14px,#73796f 30px,#b8b8aa 48px,#e5e1d7 70px,var(--mlos-cream) 95px,var(--mlos-cream) 100%) !important;background-attachment:fixed !important}
    .main{padding-top:calc(var(--mlos-safe-top) + 24px) !important}
    .side{padding-top:calc(var(--mlos-safe-top) + 10px) !important}
    .app{background:transparent !important}
    .panel,.hero,.grid,.cards,.mission,.toolbar,.actions,.chips,.top{max-width:100%}
    .toolbar{overflow-x:auto;flex-wrap:nowrap;padding-bottom:4px;scrollbar-width:none}
    .toolbar::-webkit-scrollbar{display:none}.toolbar>button{flex:0 0 auto}
    @media(max-width:900px){.main{padding-top:calc(var(--mlos-safe-top) + 24px) !important;padding-left:20px;padding-right:20px}.grid,.cards{grid-template-columns:minmax(0,1fr) !important}.top{gap:14px}.panel{min-width:0}}
    @media(max-width:600px){.main{margin-left:70px;padding-top:calc(var(--mlos-safe-top) + 26px) !important;padding-left:14px;padding-right:14px}.top{margin-bottom:18px}.title{font-size:27px !important;line-height:1.12}.subtitle{font-size:14px;line-height:1.5}.hero{padding:22px !important}.hero h1{font-size:25px !important;line-height:1.22}.panel{padding:18px !important}.mission{align-items:flex-start;padding:13px !important}.mission-main{min-width:0}.mission-title{line-height:1.25}.mission-meta{line-height:1.35}.statgrid{grid-template-columns:repeat(3,minmax(0,1fr)) !important;gap:7px}.stat{padding:10px !important;min-width:0}.num{font-size:19px}.label{font-size:10px}.date{max-width:100%;white-space:normal}}
    @media(max-width:430px){.main{margin-left:64px;padding-left:11px;padding-right:11px}.side{width:64px}.panel{border-radius:14px !important}.hero{padding:19px !important}.hero h1{font-size:23px !important}.statgrid{grid-template-columns:1fr !important}.stat{display:flex;align-items:center;justify-content:space-between}}
  `;
  document.head.appendChild(style);
})();
