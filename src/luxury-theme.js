// Mission Learning OS — Luxury Cream / Black Theme v1.0
// Visual-only layer. Timer, missions and learning logic remain untouched.
(() => {
  if (document.getElementById('luxury-cream-black-theme')) return;
  const style = document.createElement('style'); style.id='luxury-cream-black-theme';
  style.textContent=`
:root{--bg:#f7f3eb;--panel:#fffdf8;--panel2:#f0ebe2;--line:#d9d1c4;--text:#141310;--muted:#716b61;--accent:#151411}
body{background:linear-gradient(135deg,#f7f3eb 0%,#fbf9f4 48%,#f0ebe2 100%)!important;color:#141310!important;letter-spacing:-.005em}
body:before{content:"";position:fixed;inset:0;pointer-events:none;opacity:.16;background-image:radial-gradient(#000 0.45px,transparent .45px);background-size:7px 7px;mix-blend-mode:multiply;z-index:0}
.app,.main,.side{position:relative}.main{padding-top:34px}
.side{background:rgba(247,243,235,.82)!important;backdrop-filter:blur(18px);border-right:1px solid #d5ccbd!important;box-shadow:8px 0 30px rgba(50,43,31,.04)}
.brand{letter-spacing:-.03em}.logo{width:36px;height:36px;border-radius:11px;background:#141310!important;color:#f7f3eb!important;box-shadow:0 5px 14px rgba(20,19,16,.18)}
.nav{gap:5px}.nav button{color:#746e64!important;border-radius:11px;padding:12px 13px;transition:all .18s ease}.nav button:hover{background:#eee8de!important;color:#141310!important;transform:translateX(2px)}.nav button.active{background:#141310!important;color:#f7f3eb!important;box-shadow:0 6px 16px rgba(20,19,16,.14)}
.eyebrow{font-size:10px;letter-spacing:.16em;color:#5d574e!important}.title{font-size:32px;letter-spacing:-.045em}.subtitle{color:#756e64!important}
.panel,.hero{border:1px solid #ded6c9!important;border-radius:18px!important;background:rgba(255,253,248,.88)!important;box-shadow:0 14px 40px rgba(48,40,28,.065)!important;backdrop-filter:blur(12px)}
.hero{position:relative;overflow:hidden;background:linear-gradient(145deg,#f1ebe1,#fffdf8 70%)!important;padding:29px!important}.hero:after{content:"";position:absolute;width:180px;height:180px;right:-65px;top:-70px;border:1px solid #d8cfc1;border-radius:50%;box-shadow:0 0 0 24px rgba(216,207,193,.14),0 0 0 48px rgba(216,207,193,.08)}.hero h1{font-size:30px;letter-spacing:-.045em;position:relative;z-index:1}
.chip,.tag{background:#f0ebe2!important;border-color:#ddd5c8!important;color:#292621!important}.mission{background:#fffdf8!important;border-color:#e0d9cd!important;border-radius:14px!important;box-shadow:0 3px 12px rgba(50,43,31,.035);transition:all .2s ease}.mission:hover{transform:translateY(-2px);border-color:#a9a093!important;box-shadow:0 10px 24px rgba(50,43,31,.09)}
.dot{box-shadow:0 0 0 4px #f0ebe2}.learn,.practice,.eng,.research{background:#171613!important}
.mission-title{letter-spacing:-.015em}.mission-meta{color:#777066!important}.status{background:#eee8de!important;color:#2b2823!important}.status.complete{background:#ddd6ca!important;color:#141310!important}
.stat{background:#f8f4ec!important;border-color:#dfd7cb!important;border-radius:14px!important}.num{letter-spacing:-.04em}.progress{background:#e5ded3!important;height:7px}.bar{background:#141310!important}
.primary{background:#141310!important;color:#f7f3eb!important;border-radius:10px!important;box-shadow:0 6px 14px rgba(20,19,16,.13)}.ghost{background:#eee8de!important;color:#171613!important;border:1px solid #d8d0c3!important;border-radius:10px!important}
.timeline:before{background:#cec5b8!important}.tl:before{background:#141310!important;box-shadow:0 0 0 4px #e5ded3!important}
.modal{background:rgba(20,18,14,.42)!important;backdrop-filter:blur(4px)}.modalbox{background:#fffdf8!important;border:1px solid #d8d0c3!important;border-radius:20px!important;box-shadow:0 35px 90px rgba(20,18,14,.22)!important}.detail{background:#f9f5ee!important;border-color:#ded6ca!important;border-radius:13px!important}
.close{background:#eee8de!important;color:#171613!important}.toast{background:#141310!important;color:#f7f3eb!important}
.bottom{border-top-color:#d5ccbd!important;color:#756e64!important}
@media(max-width:560px){.title{font-size:27px}.hero{padding:23px!important}}
`;
 document.head.appendChild(style);
})();