// Mission Learning OS — Premium Reference UI v3
// VISUAL ONLY. Preserves Mission, Director, Energy, Execution, Review, History and persistence logic.
(() => {
  if (window.__MLOS_PREMIUM_UI_V3__) return;
  window.__MLOS_PREMIUM_UI_V3__ = true;

  const css = `
:root{
  --p-bg:#F6F2E9;
  --p-surface:#FCFAF5;
  --p-surface-2:#F1ECE2;
  --p-border:#DED8CC;
  --p-border-soft:#EAE5DC;
  --p-ink:#1E211D;
  --p-muted:#74766F;
  --p-green:#234B36;
  --p-green-2:#315D43;
  --p-green-soft:#E7ECE5;
  --p-gold:#B99A57;
  --p-shadow:0 7px 22px rgba(42,38,31,.045);
}
*{box-sizing:border-box}
html{background:var(--p-bg)!important;color-scheme:light!important}
body{
  margin:0!important;
  color:var(--p-ink)!important;
  font-family:"Plus Jakarta Sans",Inter,system-ui,-apple-system,"Segoe UI",sans-serif!important;
  font-size:12px!important;
  line-height:1.45!important;
  min-height:100vh!important;
  background:
    linear-gradient(180deg,#263029 0,#58605A 9px,#989D97 18px,#CCCBC4 27px,#E7E3DA 35px,var(--p-bg) 43px,var(--p-bg) 100%) no-repeat,
    var(--p-bg)!important;
  background-size:100% 44px,auto!important;
  background-attachment:fixed!important;
}
button,input,textarea{font-family:inherit!important}

/* Navigation rail — compact, stable and deliberate */
.side{
  width:62px!important;
  position:fixed!important;
  left:0!important;top:0!important;bottom:0!important;
  padding:11px 6px 14px!important;
  background:rgba(249,246,239,.965)!important;
  border-right:1px solid rgba(83,77,66,.11)!important;
  box-shadow:3px 0 16px rgba(40,37,31,.03)!important;
  backdrop-filter:blur(12px)!important;
  z-index:50!important;
}
.brand{height:44px!important;padding:0!important;margin:0 0 14px!important;display:flex!important;align-items:center!important;justify-content:center!important}
.brand span,.bottom{display:none!important}
.logo{
  width:40px!important;height:40px!important;min-width:40px!important;
  border-radius:50%!important;
  background:var(--p-surface)!important;
  border:1px solid #CFC8BB!important;
  box-shadow:0 4px 12px rgba(35,75,54,.09)!important;
  display:grid!important;place-items:center!important;
  overflow:hidden!important;padding:0!important;font-size:0!important;
}
.logo:after{display:none!important;content:none!important}
.logo svg{width:100%!important;height:100%!important;display:block!important}
.nav{display:grid!important;gap:6px!important}
.nav button{
  width:46px!important;height:43px!important;margin:auto!important;padding:0!important;
  border-radius:12px!important;background:transparent!important;color:#71746C!important;
  display:grid!important;place-items:center!important;font-size:0!important;line-height:1!important;
  transition:background .16s ease,color .16s ease!important;
}
.nav button span{display:none!important}
.nav button.active{background:#E7E2D8!important;color:var(--p-green)!important;box-shadow:inset 0 0 0 1px rgba(35,75,54,.05)!important}
.nav button:hover{background:#EEE9E0!important;color:var(--p-green)!important}
.mlos-nav-icon{width:19px!important;height:19px!important;stroke:currentColor!important;fill:none!important;stroke-width:1.75!important;stroke-linecap:round!important;stroke-linejoin:round!important}

/* Main canvas */
.main{
  margin-left:62px!important;
  max-width:1120px!important;
  padding:14px 13px 42px!important;
}
.top{display:block!important;margin:0 0 13px!important}
.eyebrow{color:var(--p-green)!important;font-size:8px!important;font-weight:800!important;letter-spacing:.14em!important;text-transform:uppercase!important}
.title{color:var(--p-ink)!important;font-size:16px!important;line-height:1.22!important;font-weight:760!important;letter-spacing:-.022em!important;margin:4px 0 5px!important;max-width:720px!important}
.subtitle{color:var(--p-muted)!important;font-size:10px!important;line-height:1.48!important;max-width:760px!important}
.date{display:inline-flex!important;align-items:center!important;margin-top:7px!important;padding:6px 9px!important;border-radius:10px!important;background:rgba(252,250,245,.92)!important;border:1px solid var(--p-border)!important;color:#4D5049!important;font-size:9px!important;box-shadow:none!important}

/* Content hierarchy */
.grid{display:block!important;max-width:760px!important}
.grid>div+div{margin-top:11px!important}
.panel{background:rgba(252,250,245,.96)!important;border:1px solid var(--p-border)!important;border-radius:14px!important;padding:12px!important;box-shadow:var(--p-shadow)!important}
.hero{background:rgba(252,250,245,.985)!important;border-color:#D7D0C3!important;padding:14px!important}
.hero h1{color:var(--p-ink)!important;font-size:15px!important;line-height:1.27!important;letter-spacing:-.018em!important;font-weight:750!important;margin:5px 0 7px!important}
.panel h2{color:var(--p-ink)!important;font-size:12px!important;line-height:1.25!important;font-weight:760!important;letter-spacing:-.01em!important;margin:0 0 9px!important}
.chips{gap:5px!important;margin-top:8px!important}
.chip,.tag{font-size:8.5px!important;padding:4px 7px!important;border-radius:999px!important;background:#F0ECE3!important;border:1px solid var(--p-border)!important;color:#50534C!important}

/* Missions — primary action stays visible and compact */
.mission{gap:9px!important;padding:9px 10px!important;border:1px solid var(--p-border)!important;background:#FAF8F3!important;border-radius:11px!important;margin-top:6px!important;box-shadow:none!important;transition:border-color .16s ease,background .16s ease!important}
.mission:hover{transform:none!important;border-color:#C9C1B3!important;background:#F8F5EE!important}
#missionList .mission:first-child{border-left:3px solid var(--p-green)!important;background:#F8F5EE!important}
.mission-title{font-size:10.5px!important;line-height:1.32!important;font-weight:700!important;color:var(--p-ink)!important}
.mission-meta{font-size:8.5px!important;line-height:1.38!important;margin-top:2px!important;color:#7A7C75!important}
.score{font-size:8.5px!important;color:#60776A!important;white-space:nowrap!important}
.dot{width:7px!important;height:7px!important}
.status{font-size:8px!important;padding:4px 6px!important;border-radius:7px!important}

/* Controls and stats */
.toolbar{display:flex!important;gap:5px!important;margin-bottom:9px!important;flex-wrap:wrap!important;overflow:visible!important}
.primary,.ghost{min-height:34px!important;padding:7px 9px!important;border-radius:9px!important;font-size:9px!important;font-weight:720!important;white-space:nowrap!important}
.primary{background:var(--p-green)!important;color:#fff!important}
.ghost{background:#EFEAE1!important;color:#353731!important;border:1px solid var(--p-border)!important}
.statgrid{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:6px!important}
.stat{padding:8px!important;border-radius:10px!important;background:#F9F6F0!important;border:1px solid var(--p-border-soft)!important}
.num{font-size:14px!important;color:var(--p-ink)!important;font-weight:800!important}
.label{font-size:8px!important;color:#787A73!important}
.progress{height:5px!important;background:#E7E2D8!important;border-radius:99px!important}
.bar{background:var(--p-green)!important}

/* Supporting content */
.deadline{padding:10px 0!important;border-bottom:1px solid var(--p-border-soft)!important}
.dlabel{font-size:10px!important;color:var(--p-ink)!important}.dsub{font-size:8.5px!important;color:var(--p-muted)!important}.when{font-size:9px!important}
.cards{grid-template-columns:1fr!important;gap:9px!important}.domain{padding:11px!important;border:1px solid var(--p-border)!important;border-radius:11px!important;background:#FAF8F3!important}.domain h3{font-size:10.5px!important;color:var(--p-ink)!important}.domain p{font-size:9px!important;color:var(--p-muted)!important}
.timeline{margin-left:5px!important;padding-left:18px!important}.timeline:before{background:#D7D1C4!important}.tl{margin-bottom:17px!important}.tl:before{background:var(--p-green)!important;box-shadow:0 0 0 3px #E7E4DA!important}.tl strong{font-size:10.5px!important}.tl span{font-size:9px!important}
.detail{background:#FAF8F3!important;border:1px solid var(--p-border)!important;border-radius:10px!important;padding:10px!important}
.modal{padding:14px!important}.modalbox{background:var(--p-surface)!important;color:var(--p-ink)!important;border:1px solid var(--p-border)!important;border-radius:15px!important;padding:15px!important}.modalbox h2{font-size:14px!important}.close{background:#EEE9DF!important;color:var(--p-ink)!important}
textarea{background:#FAF8F3!important;border:1px solid var(--p-border)!important;color:var(--p-ink)!important;border-radius:10px!important;font-size:10px!important}
.toast{background:#263C2D!important;color:#fff!important;border:0!important}

/* Tablet / desktop scale up gently; no giant typography */
@media(min-width:700px){
  .side{width:68px!important}.main{margin-left:68px!important;padding:18px 20px 48px!important}.logo{width:42px!important;height:42px!important}.nav button{width:50px!important;height:44px!important}.title{font-size:19px!important}.hero h1{font-size:18px!important}.subtitle{font-size:11px!important}.panel{padding:14px!important}.hero{padding:16px!important}.grid{max-width:940px!important}.cards{grid-template-columns:repeat(2,minmax(0,1fr))!important}
}
@media(min-width:980px){
  .main{padding-left:26px!important;padding-right:26px!important}.grid{display:grid!important;grid-template-columns:minmax(0,1.35fr) minmax(280px,.75fr)!important;gap:14px!important;max-width:1040px!important}.grid>div+div{margin-top:0!important}.title{font-size:21px!important}.hero h1{font-size:19px!important}.panel h2{font-size:13px!important}
}
@media(max-width:380px){
  .side{width:58px!important;padding-left:5px!important;padding-right:5px!important}.main{margin-left:58px!important;padding-left:9px!important;padding-right:9px!important}.logo{width:36px!important;height:36px!important}.nav button{width:44px!important;height:40px!important}.title{font-size:15px!important}.hero h1{font-size:14px!important}.stat{padding:7px!important}
}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{transition:none!important;animation:none!important}}
`;

  const style = document.createElement('style');
  style.id = 'mlos-premium-ui-v3';
  style.textContent = css;
  document.head.appendChild(style);

  // Stable inline brand mark: no external image path, so it works in WebView and browser.
  const logo = document.querySelector('.logo');
  if (logo) {
    logo.innerHTML = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-label="Mission Learning OS">
      <rect width="100" height="100" rx="50" fill="#FCFAF5"/>
      <path d="M16 68Q50 80 84 68L75 79Q50 87 25 79Z" fill="#173B2D"/>
      <path d="M25 66Q50 73 75 66M31 61Q50 67 69 61" fill="none" stroke="#B99A57" stroke-width="3" stroke-linecap="round"/>
      <path d="M50 68C45 54 46 40 55 28C61 20 68 15 75 12C72 22 66 31 58 38C66 35 75 36 82 41C75 48 65 50 57 47C61 55 63 62 63 69Z" fill="#1F6248"/>
      <path d="M47 68C39 56 35 45 38 35C41 26 47 21 54 16C53 26 49 35 43 42C50 39 57 40 62 44C56 50 48 52 42 50C46 57 49 64 49 69Z" fill="#2D7655"/>
      <path d="M25 40C20 36 18 31 19 26C25 26 29 30 31 36C32 30 36 25 41 22C43 28 41 34 36 39C42 37 47 38 51 41C47 46 39 48 33 45C29 46 27 43 25 40Z" fill="#8EAF46"/>
      <path d="M64 30C66 23 70 19 76 17C78 23 77 28 72 33C78 31 84 32 87 36C83 41 77 42 71 39C67 38 64 35 64 30Z" fill="#8EAF46"/>
      <circle cx="43" cy="44" r="4.5" fill="#173B2D"/><circle cx="61" cy="33" r="4.5" fill="#173B2D"/><circle cx="73" cy="49" r="4.5" fill="#173B2D"/>
    </svg>`;
  }

  // Rebuild navigation glyphs without replacing the buttons themselves, preserving click listeners.
  const icons = {
    dashboard:'<path d="M4 11 12 4l8 7"/><path d="M6.5 10.5V20h11v-9.5"/><path d="M9.5 20v-5h5v5"/>',
    missions:'<path d="m5 12 4 4L19 6"/>',
    curriculum:'<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 4v16M15 4v16M4 9h16M4 15h16"/>',
    timeline:'<circle cx="12" cy="12" r="8"/><path d="M12 7v5l3 2"/>',
    review:'<path d="M20 12a8 8 0 1 1-2.3-5.7"/><path d="M20 5v5h-5"/>'
  };
  document.querySelectorAll('.nav button[data-page]').forEach(btn => {
    const page = btn.dataset.page;
    if (!icons[page]) return;
    btn.innerHTML = `<svg class="mlos-nav-icon" viewBox="0 0 24 24" aria-hidden="true">${icons[page]}</svg><span>${page}</span>`;
    btn.setAttribute('aria-label', page.charAt(0).toUpperCase() + page.slice(1));
  });
})();