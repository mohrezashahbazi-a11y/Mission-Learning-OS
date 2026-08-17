// Mission Learning OS — Court Green / Cream / Black Theme v1.4
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
.brand{letter-spacing:-.035em}.logo{width:38px;height:38px;border-radius:9px;background:#fffdf8!important;color:transparent!important;box-shadow:0 5px 13px rgba(20,19,16,.12);border:1px solid #d4cdbf;position:relative;font-size:0;overflow:hidden}.logo:before{content:"";position:absolute;inset:4px;background-repeat:no-repeat;background-position:center;background-size:contain;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cg fill='none' stroke='%2343583f' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath stroke-width='6' d='M50 43v35M50 70c-7 9-15 12-23 13M50 70c7 9 15 12 23 13M50 78c-4 7-8 10-13 13M50 78c4 7 8 10 13 13'/%3E%3Cpath stroke-width='5' d='M50 13c-11 0-20 7-22 17-9 1-16 8-16 17 0 10 8 18 18 18 3 0 6-1 9-2 4 6 10 9 17 9 7 0 13-3 17-9 3 1 6 2 9 2 10 0 18-8 18-18 0-9-7-16-16-17-2-10-11-17-22-17-4 0-8 1-12 3-4-2-8-3-12-3Z'/%3E%3C/g%3E%3C/svg%3E)}
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
.hero [class*="next-action"],.hero [class*="action-card"],.hero [class*="nextAction"],.hero [class*="actionCard"]{background:#243322!important;border:1px solid #5b7254!important;color:#f7f3eb!important;box-shadow:0 8px 20px rgba(28,40,25,.16)!important;border-radius:10px!important}
.hero [class*="next-action"] .eyebrow,.hero [class*="action-card"] .eyebrow{color:#a9bb9f!important}
.hero [class*="next-action"] .primary,.hero [class*="action-card"] .primary{background:#70896b!important;border-color:#80977b!important;color:#10140f!important;box-shadow:none!important}
.hero [class*="next-action"] [class*="priority"],.hero [class*="action-card"] [class*="priority"]{background:#43583f!important;border-color:#70896b!important;color:#f1f4ec!important}
.hero [style*="background:#0"],.hero [style*="background: #0"],.hero [style*="background:#1"],.hero [style*="background: #1"]{background:#243322!important;color:#f7f3eb!important;border-color:#5b7254!important}
.timeline:before{background:#c9c1b4!important}.tl:before{background:#667f63!important;box-shadow:0 0 0 4px #e3e9df!important}
.modal{background:rgba(20,19,16,.46)!important;backdrop-filter:blur(3px)}.modalbox{background:#fffdf8!important;border:1px solid #d1c9bc!important;border-radius:15px!important;box-shadow:0 30px 70px rgba(20,18,14,.23)!important}.detail{background:#f3efe7!important;border:1px solid #d8d0c3!important;border-radius:10px!important}.close{background:#e9eee5!important;color:#263023!important;border:1px solid #cfd9ca!important}.toast{background:#171714!important;color:#f7f3eb!important;border-left:3px solid #70896b}.bottom{border-top-color:#d0c8ba!important;color:#756f65!important}
input,textarea,select{border-color:#cfc7b9!important;background:#fffdf8!important;color:#171714!important;border-radius:8px!important}input:focus,textarea:focus,select:focus{outline:none!important;border-color:#70896b!important;box-shadow:0 0 0 2px rgba(112,137,107,.16)!important}
button{font-weight:600}
@media(max-width:900px){.main{padding-top:24px}}
@media(max-width:560px){.title{font-size:27px}.hero{padding:23px!important}.hero h1{font-size:25px}}
`;
  document.head.appendChild(style);
})();
