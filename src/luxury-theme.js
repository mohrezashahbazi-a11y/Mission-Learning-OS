// Mission Learning OS — Luxury Cream / Black Theme v1.1
// Visual-only layer. Application logic remains untouched.
(() => {
  if (document.getElementById('luxury-cream-black-theme')) return;
  const style=document.createElement('style');style.id='luxury-cream-black-theme';
  style.textContent=`
:root{--bg:#f7f3eb;--panel:#fffdf8;--panel2:#f0ebe2;--line:#d9d1c4;--text:#141310;--muted:#716b61;--accent:#151411}
body{background:#f7f3eb!important;color:#141310!important;letter-spacing:-.005em}
body:before{display:none!important}
.app{min-height:100vh;position:relative;z-index:1}.main{position:relative;padding-top:30px}
.side{background:#f3eee5!important;border-right:1px solid #d7cfc1!important;box-shadow:7px 0 25px rgba(50,43,31,.035)!important;backdrop-filter:none!important}
.brand{letter-spacing:-.03em}.logo{width:36px;height:36px;border-radius:11px;background:#141310!important;color:#f7f3eb!important;box-shadow:0 5px 14px rgba(20,19,16,.16)}
.nav{gap:5px}.nav button{color:#746e64!important;border-radius:11px;padding:12px 13px;transition:background .18s ease,color .18s ease}.nav button:hover{background:#e8e1d6!important;color:#141310!important;transform:none}.nav button.active{background:#141310!important;color:#f7f3eb!important;box-shadow:0 5px 14px rgba(20,19,16,.12)}
.eyebrow{font-size:10px;letter-spacing:.16em;color:#625b51!important}.title{font-size:31px;letter-spacing:-.045em}.subtitle{color:#756e64!important}
.panel{background:#fffdf8!important;border:1px solid #ddd5c8!important;border-radius:16px!important;box-shadow:0 8px 26px rgba(48,40,28,.045)!important;backdrop-filter:none!important}
/* Premium objective card: one controlled dark anchor instead of many competing tones. */
.hero{position:relative;overflow:hidden;background:#1b1a17!important;border:1px solid #1b1a17!important;border-radius:17px!important;padding:27px!important;box-shadow:0 14px 32px rgba(30,27,21,.13)!important;color:#f7f3eb!important}
.hero .eyebrow{color:#cfc5b5!important}.hero h1{font-size:29px;letter-spacing:-.045em;color:#fffdf8!important;position:relative;z-index:1}.hero .subtitle{color:#c9c1b5!important;position:relative;z-index:1}.hero .chip{background:#302e29!important;border-color:#4a463e!important;color:#eee7dc!important}.hero:after{content:"";position:absolute;width:210px;height:210px;right:-105px;top:-105px;border:1px solid rgba(239,232,220,.18);border-radius:50%;box-shadow:0 0 0 28px rgba(239,232,220,.035),0 0 0 56px rgba(239,232,220,.018)}
.chip,.tag{background:#f0ebe2!important;border-color:#ddd5c8!important;color:#292621!important}
.mission{background:#fffdf8!important;border-color:#e0d9cd!important;border-radius:13px!important;box-shadow:0 2px 9px rgba(50,43,31,.03);transition:all .18s ease}.mission:hover{transform:translateY(-1px);border-color:#aaa195!important;box-shadow:0 7px 18px rgba(50,43,31,.07)}
.dot{box-shadow:0 0 0 4px #f0ebe2}.learn,.practice,.eng,.research{background:#171613!important}.mission-title{letter-spacing:-.015em}.mission-meta{color:#777066!important}.status{background:#eee8de!important;color:#2b2823!important}.status.complete{background:#ddd6ca!important;color:#141310!important}
.stat{background:#f8f4ec!important;border-color:#dfd7cb!important;border-radius:13px!important}.num{letter-spacing:-.04em}.progress{background:#e5ded3!important;height:7px}.bar{background:#141310!important}
.primary{background:#141310!important;color:#f7f3eb!important;border-radius:9px!important;box-shadow:0 5px 12px rgba(20,19,16,.12)}.ghost{background:#eee8de!important;color:#171613!important;border:1px solid #d8d0c3!important;border-radius:9px!important}
.timeline:before{background:#cec5b8!important}.tl:before{background:#141310!important;box-shadow:0 0 0 4px #e5ded3!important}
.modal{background:rgba(20,18,14,.42)!important;backdrop-filter:blur(3px)}.modalbox{background:#fffdf8!important;border:1px solid #d8d0c3!important;border-radius:18px!important;box-shadow:0 30px 70px rgba(20,18,14,.2)!important}.detail{background:#f9f5ee!important;border-color:#ded6ca!important;border-radius:12px!important}.close{background:#eee8de!important;color:#171613!important}.toast{background:#141310!important;color:#f7f3eb!important}.bottom{border-top-color:#d5ccbd!important;color:#756e64!important}
@media(max-width:900px){.main{padding-top:24px}}
@media(max-width:560px){.title{font-size:27px}.hero{padding:23px!important}.hero h1{font-size:25px}}
`;
  document.head.appendChild(style);
})();