// Mission Learning OS — Court Green / Cream / Black Theme v1.2
// Visual-only layer. Application logic remains untouched.
(() => {
  if (document.getElementById('luxury-cream-black-theme')) return;
  const style=document.createElement('style');style.id='luxury-cream-black-theme';
  style.textContent=`
:root{--bg:#f7f3eb;--panel:#fffdf8;--panel2:#eee9df;--line:#d5cec1;--text:#141411;--muted:#6e6a61;--accent:#667f63;--court:#70896b;--court-dark:#43583f;--ink:#171714}
body{background:#f7f3eb!important;color:#141411!important;letter-spacing:-.005em}
body:before{display:none!important}
.app{min-height:100vh;position:relative;z-index:1}.main{position:relative;padding-top:30px}
.side{background:#f2ede4!important;border-right:1px solid #cfc6b7!important;box-shadow:7px 0 25px rgba(50,43,31,.045)!important;backdrop-filter:none!important}
.brand{letter-spacing:-.035em}.logo{width:38px;height:38px;border-radius:9px;background:#171714!important;color:#f7f3eb!important;box-shadow:0 5px 13px rgba(20,19,16,.18);border:1px solid #394536}
.nav{gap:6px}.nav button{color:#625e55!important;border-radius:8px;padding:12px 13px;border-left:3px solid transparent;transition:background .16s ease,color .16s ease,border-color .16s ease}.nav button:hover{background:#e5e0d6!important;color:#171714!important;transform:none}.nav button.active{background:#dfe6db!important;color:#263023!important;border-left-color:#43583f;box-shadow:none}
.eyebrow{font-size:10px;letter-spacing:.16em;color:#52644d!important}.title{font-size:31px;letter-spacing:-.045em}.subtitle{color:#756f65!important}
.panel{background:#fffdf8!important;border:1px solid #d8d0c3!important;border-radius:14px!important;box-shadow:0 7px 22px rgba(48,40,28,.05)!important;backdrop-filter:none!important}
.hero{position:relative;overflow:hidden;background:#191a17!important;border:1px solid #10110f!important;border-radius:14px!important;padding:27px!important;box-shadow:0 15px 34px rgba(30,27,21,.15)!important;color:#f7f3eb!important}
.hero .eyebrow{color:#a9bb9f!important}.hero h1{font-size:29px;letter-spacing:-.045em;color:#fffdf8!important;position:relative;z-index:1}.hero .subtitle{color:#c9c5bb!important;position:relative;z-index:1}.hero .chip{background:#344231!important;border-color:#53664f!important;color:#f1f4ec!important}.hero:after{content:"";position:absolute;width:210px;height:210px;right:-105px;top:-105px;border:1px solid rgba(168,190,158,.24);border-radius:50%;box-shadow:0 0 0 28px rgba(168,190,158,.04),0 0 0 56px rgba(168,190,158,.02)}
.chip,.tag{background:#e9eee5!important;border-color:#cfd9ca!important;color:#354632!important}.tag{font-weight:650}
.mission{background:#fffdf8!important;border:1px solid #d8d0c3!important;border-radius:11px!important;box-shadow:0 2px 8px rgba(50,43,31,.035);transition:transform .16s ease,border-color .16s ease,box-shadow .16s ease}.mission:hover{transform:translateY(-2px);border-color:#8da18a!important;box-shadow:0 9px 19px rgba(50,43,31,.085)}
.dot{box-shadow:0 0 0 4px #e7ece3}.learn,.practice,.eng,.research{background:#43583f!important}.mission-title{letter-spacing:-.015em}.mission-meta{color:#716c63!important}.status{background:#ece8df!important;color:#2b2a25!important}.status.complete{background:#dce5d8!important;color:#2d402b!important}
.stat{background:#faf7f0!important;border:1px solid #d7d0c4!important;border-radius:11px!important}.num{letter-spacing:-.04em}.progress{background:#e1ddd4!important;height:7px;border-radius:2px}.bar{background:#667f63!important}
.primary{background:#43583f!important;color:#f7f3eb!important;border:1px solid #334630!important;border-radius:8px!important;box-shadow:0 5px 12px rgba(53,70,49,.18)}.primary:hover{background:#344832!important}.ghost{background:#eeeae1!important;color:#171714!important;border:1px solid #d1c9bc!important;border-radius:8px!important}
.timeline:before{background:#c9c1b4!important}.tl:before{background:#667f63!important;box-shadow:0 0 0 4px #e3e9df!important}
.modal{background:rgba(20,19,16,.46)!important;backdrop-filter:blur(3px)}.modalbox{background:#fffdf8!important;border:1px solid #d1c9bc!important;border-radius:15px!important;box-shadow:0 30px 70px rgba(20,18,14,.23)!important}.detail{background:#f3efe7!important;border:1px solid #d8d0c3!important;border-radius:10px!important}.close{background:#e9eee5!important;color:#263023!important;border:1px solid #cfd9ca!important}.toast{background:#171714!important;color:#f7f3eb!important;border-left:3px solid #70896b}.bottom{border-top-color:#d0c8ba!important;color:#756f65!important}
input,textarea,select{border-color:#cfc7b9!important;background:#fffdf8!important;color:#171714!important;border-radius:8px!important}input:focus,textarea:focus,select:focus{outline:none!important;border-color:#70896b!important;box-shadow:0 0 0 2px rgba(112,137,107,.16)!important}
button{font-weight:600}
@media(max-width:900px){.main{padding-top:24px}}
@media(max-width:560px){.title{font-size:27px}.hero{padding:23px!important}.hero h1{font-size:25px}}
`;
  document.head.appendChild(style);
})();