// Mission Learning OS — Responsive / Safe Area Layer v1.2
// Visual-only layer. Keeps content clear of system bars and gives the app a consistent professional brand mark.
(() => {
  if (document.getElementById('responsive-safe-area-v1')) return;
  const style = document.createElement('style');
  style.id = 'responsive-safe-area-v1';
  style.textContent = `
    :root{--mlos-cream:#f7f3eb;--mlos-safe-top:max(22px,env(safe-area-inset-top))}
    html,body{min-width:0;overflow-x:hidden}
    body{background:linear-gradient(180deg,#252d28 0px,#3e4841 14px,#73796f 30px,#b8b8aa 48px,#e5e1d7 70px,var(--mlos-cream) 95px,var(--mlos-cream) 100%) !important;background-attachment:fixed !important}
    .main{padding-top:calc(var(--mlos-safe-top) + 24px) !important}
    .side{padding-top:calc(var(--mlos-safe-top) + 10px) !important}
    .app{background:transparent !important}

    /* Professional Mission Learning OS mark: open book + growing tree + human nodes. */
    .logo{
      width:44px !important;
      height:44px !important;
      min-width:44px !important;
      border-radius:50% !important;
      background-color:#F8F6F0 !important;
      background-image:url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgcng9IjI0IiBmaWxsPSIjRjhGNkYwIi8+PHBhdGggZmlsbD0iIzBCMjU0NSIgZD0iTTE0LDY5UTUwLDgyIDg2LDY5TDc3LDgxUTUwLDkwIDIzLDgxWiIvPjxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0QzQTM4QSIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiIGQ9Ik0yMyw2N1E1MCw3NSA3Nyw2N00yOCw2MlE1MCw2OCA3Miw2MiIvPjxwYXRoIGZpbGw9IiMwQjVENDYiIGQ9Ik00OSw2OWMtNy0yMy00LTQwIDktNTMgMTAtMTEgMjItMTUgMzEtMTYtNSwxMi0xMywyMS0yNCwyOCAxNS0xIDI1LDMgMzIsMTAtMTIsMi0yMywxLTMzLTUgOCAxMCAxMSwyMSAxMSwzNnoiLz48cGF0aCBmaWxsPSIjMEI1RDQ2IiBkPSJNNzQsNjljLTEyLTE4LTE0LTMyLTgtNDQgNi0xMiAxNi0xOCAyNi0yMi0zLDEyLTgsMjEtMTcsMjggMTQtNSAyNC00IDMyLTEgLTkgNy0xOSwxMC0zMSw4IDksNyAxNSwxNiAxNywzMXoiLz48cGF0aCBmaWxsPSIjOEZCRjNGIiBkPSJNMjgsNDBjLTgtNi0xMS0xMi05LTE4IDctMSAxMi01IDE1LDExIDAtNyAyLTEyIDctMTcgNCA2IDUgMTIgMiAxOCUgNS01IDEwLTggMTYtOS0xIDctNSAxMi0xMSAxNSA3LTEgMTMgMSAxOCA1LTYgNS0xMyA2LTIwMy03LTIgLTctMS0xMy0zLTE4LTN6Ii8+PHBhdGggZmlsbD0iIzhGQkYzRiIgZD0iTTY4LDI5YzEtNyA1LTEyIDExLTE1IDIgNiAwIDExLTQgMTYgNi02LTQgMTItNCAxOC0yLTMgNi04IDktMTUgMTAgNiAyIDEwIDYgMTMgMTItNyAxLTEzLTItMTctNy02LTItMTAtNi0xNC0xNHoiLz48Y2lyY2xlIGN4PSI0NSIgY3k9IjQ1IiByPSI1IiBmaWxsPSIjMEIyNTQ1Ii8+PGNpcmNsZSBjeD0iNjIiIGN5PSIzMyIgcj0iNSIgZmlsbD0iIzBCMjU0NSIvPjxjaXJjbGUgY3g9Ijc1IiBjeT0iNTAiIHI9IjUiIGZpbGw9IiMwQjI1NDUiLz48L3N2Zz4=") !important;
      background-position:center !important;
      background-repeat:no-repeat !important;
      background-size:100% 100% !important;
      border:1px solid #d8d1c4 !important;
      box-shadow:0 5px 14px rgba(37,45,40,.12) !important;
      display:block !important;
      overflow:hidden !important;
      font-size:0 !important;
      color:transparent !important;
    }
    .logo img{display:none !important}

    .panel,.hero,.grid,.cards,.mission,.toolbar,.actions,.chips,.top{max-width:100%}
    .toolbar{overflow-x:auto;flex-wrap:nowrap;padding-bottom:4px;scrollbar-width:none}
    .toolbar::-webkit-scrollbar{display:none}.toolbar>button{flex:0 0 auto}
    @media(max-width:900px){.main{padding-top:calc(var(--mlos-safe-top) + 24px) !important;padding-left:20px;padding-right:20px}.grid,.cards{grid-template-columns:minmax(0,1fr) !important}.top{gap:14px}.panel{min-width:0}}
    @media(max-width:600px){.main{margin-left:70px;padding-top:calc(var(--mlos-safe-top) + 26px) !important;padding-left:14px;padding-right:14px}.top{margin-bottom:18px}.title{font-size:27px !important;line-height:1.12}.subtitle{font-size:14px;line-height:1.5}.hero{padding:22px !important}.hero h1{font-size:25px !important;line-height:1.22}.panel{padding:18px !important}.mission{align-items:flex-start;padding:13px !important}.mission-main{min-width:0}.mission-title{line-height:1.25}.mission-meta{line-height:1.35}.statgrid{grid-template-columns:repeat(3,minmax(0,1fr)) !important;gap:7px}.stat{padding:10px !important;min-width:0}.num{font-size:19px}.label{font-size:10px}.date{max-width:100%;white-space:normal}}
    @media(max-width:430px){.main{margin-left:64px;padding-left:11px;padding-right:11px}.side{width:64px}.logo{width:40px !important;height:40px !important;min-width:40px !important}.panel{border-radius:14px !important}.hero{padding:19px !important}.hero h1{font-size:23px !important}.statgrid{grid-template-columns:1fr !important}.stat{display:flex;align-items:center;justify-content:space-between}}
  `;
  document.head.appendChild(style);
})();
