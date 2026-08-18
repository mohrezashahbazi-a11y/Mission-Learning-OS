// Mission Learning OS — UI Final Fix v4
// Visual layer only. Runtime, Director, Energy, Mission and History logic remain untouched.
(() => {
  if (document.getElementById('mlos-ui-final-v4')) return;

  const style = document.createElement('style');
  style.id = 'mlos-ui-final-v4';
  style.textContent = `
    :root{
      --mlos-bg:#F4F0E7;
      --mlos-paper:#FCFAF5;
      --mlos-paper-2:#F8F5EE;
      --mlos-ink:#171916;
      --mlos-muted:#6D6E67;
      --mlos-green:#244B36;
      --mlos-green-2:#315C43;
      --mlos-green-soft:#E5E9DF;
      --mlos-line:#DDD7CA;
      --mlos-line-2:#E8E2D6;
      --mlos-dark:#14271B;
    }

    *{box-sizing:border-box}
    html,body{background:var(--mlos-bg)!important;color:var(--mlos-ink)!important}

    body{
      font-family:"Plus Jakarta Sans",Inter,ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif!important;
      font-size:13px!important;
      line-height:1.45!important;
      letter-spacing:-.012em!important;
      background:
        linear-gradient(180deg,
          #252D29 0,
          #555B55 7px,
          #8E928B 14px,
          #C5C5BD 21px,
          #E4E1D8 28px,
          var(--mlos-bg) 36px,
          var(--mlos-bg) 100%)!important;
      background-attachment:fixed!important;
    }

    /* Android / tablet safe area. */
    .side{
      width:78px!important;
      position:fixed!important;
      inset:0 auto 0 0!important;
      padding:calc(env(safe-area-inset-top) + 14px) 9px calc(env(safe-area-inset-bottom) + 14px)!important;
      background:rgba(248,245,238,.93)!important;
      border-right:1px solid rgba(86,82,72,.10)!important;
      box-shadow:2px 0 20px rgba(43,39,31,.035)!important;
      backdrop-filter:blur(14px)!important;
      z-index:10!important;
    }

    .brand{
      height:54px!important;
      padding:0!important;
      margin:0 0 17px!important;
      display:flex!important;
      align-items:center!important;
      justify-content:center!important;
    }
    .brand span{display:none!important}

    .logo{
      width:48px!important;
      height:48px!important;
      min-width:48px!important;
      border-radius:50%!important;
      background:var(--mlos-paper)!important;
      border:1.5px solid var(--mlos-green)!important;
      box-shadow:0 4px 13px rgba(36,75,54,.10)!important;
      display:grid!important;
      place-items:center!important;
      overflow:hidden!important;
      color:var(--mlos-green)!important;
      font-size:0!important;
      position:relative!important;
    }
    .logo:after{
      content:"";
      width:31px;
      height:31px;
      display:block;
      background:currentColor;
      -webkit-mask:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cpath fill='black' d='M8 46c12-8 24-8 48 0v7H8z'/%3E%3Cpath fill='black' d='M12 44c7-13 13-20 20-28 7 8 13 15 20 28-8-6-14-8-20-8s-12 2-20 8z'/%3E%3Cpath fill='white' d='M31 38c0-10 2-18 8-25-2 9-1 17-1 25-2-2-4-3-7-4z'/%3E%3Cpath fill='white' d='M31 34c-7-7-11-11-17-12 5 5 8 10 10 16 2-2 4-3 7-4z'/%3E%3Ccircle cx='41' cy='20' r='3' fill='white'/%3E%3Ccircle cx='21' cy='27' r='3' fill='white'/%3E%3C/svg%3E") center/contain no-repeat;
      mask:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cpath fill='black' d='M8 46c12-8 24-8 48 0v7H8z'/%3E%3Cpath fill='black' d='M12 44c7-13 13-20 20-28 7 8 13 15 20 28-8-6-14-8-20-8s-12 2-20 8z'/%3E%3Cpath fill='white' d='M31 38c0-10 2-18 8-25-2 9-1 17-1 25-2-2-4-3-7-4z'/%3E%3Cpath fill='white' d='M31 34c-7-7-11-11-17-12 5 5 8 10 10 16 2-2 4-3 7-4z'/%3E%3Ccircle cx='41' cy='20' r='3' fill='white'/%3E%3Ccircle cx='21' cy='27' r='3' fill='white'/%3E%3C/svg%3E") center/contain no-repeat;
    }

    .nav{display:grid!important;gap:7px!important}
    .nav button{
      width:56px!important;
      height:47px!important;
      margin:0 auto!important;
      padding:0!important;
      border-radius:14px!important;
      background:transparent!important;
      color:#656760!important;
      display:grid!important;
      place-items:center!important;
      font-size:0!important;
      transition:background .18s ease,color .18s ease,transform .18s ease!important;
    }
    .nav button:hover{background:#ECE8DE!important;color:var(--mlos-green)!important}
    .nav button.active{
      background:#E5E0D5!important;
      color:var(--mlos-green)!important;
      box-shadow:inset 0 0 0 1px rgba(36,75,54,.035)!important;
    }
    .nav button span{display:none!important}
    .bottom{display:none!important}

    .main{
      margin-left:78px!important;
      max-width:1050px!important;
      padding:calc(env(safe-area-inset-top) + 24px) 24px calc(env(safe-area-inset-bottom) + 44px)!important;
    }

    .top{display:block!important;margin:0 0 17px!important}
    .eyebrow{
      color:var(--mlos-green)!important;
      font-size:10px!important;
      line-height:1.2!important;
      font-weight:800!important;
      letter-spacing:.14em!important;
      text-transform:uppercase!important;
    }
    .title{
      color:var(--mlos-ink)!important;
      font-size:25px!important;
      line-height:1.16!important;
      letter-spacing:-.035em!important;
      font-weight:800!important;
      margin:7px 0 8px!important;
      max-width:650px!important;
    }
    .subtitle{
      color:var(--mlos-muted)!important;
      font-size:13px!important;
      line-height:1.55!important;
      max-width:650px!important;
    }
    .date{
      display:inline-flex!important;
      align-items:center!important;
      margin-top:12px!important;
      padding:9px 13px!important;
      border-radius:13px!important;
      background:rgba(252,250,245,.90)!important;
      border:1px solid var(--mlos-line)!important;
      color:#343631!important;
      font-size:12px!important;
      box-shadow:0 3px 10px rgba(43,39,31,.025)!important;
    }

    .grid{display:block!important;max-width:760px!important}
    .grid>div+div{margin-top:14px!important}

    .panel{
      background:rgba(252,250,245,.92)!important;
      border:1px solid rgba(166,157,142,.28)!important;
      border-radius:19px!important;
      padding:18px!important;
      box-shadow:0 10px 30px rgba(43,39,31,.045)!important;
    }
    .hero{
      padding:22px!important;
      background:rgba(252,250,245,.94)!important;
      border-color:rgba(166,157,142,.31)!important;
    }
    .hero h1{
      color:var(--mlos-ink)!important;
      font-size:27px!important;
      line-height:1.2!important;
      letter-spacing:-.035em!important;
      font-weight:800!important;
      margin:8px 0 9px!important;
      max-width:650px!important;
    }
    .panel h2{
      color:var(--mlos-ink)!important;
      font-size:18px!important;
      line-height:1.25!important;
      letter-spacing:-.025em!important;
      margin:0 0 11px!important;
      font-weight:800!important;
    }

    .chips{gap:7px!important;margin-top:13px!important}
    .chip,.tag{
      font-size:11px!important;
      padding:6px 10px!important;
      border-radius:999px!important;
      background:#F0ECE3!important;
      border:1px solid #DDD7CA!important;
      color:#4B4D47!important;
    }

    .mission{
      gap:11px!important;
      padding:12px 13px!important;
      border:1px solid var(--mlos-line)!important;
      background:#FAF8F3!important;
      border-radius:13px!important;
      margin-top:8px!important;
      box-shadow:none!important;
      transition:transform .16s ease,border-color .16s ease,box-shadow .16s ease!important;
    }
    .mission:hover{transform:translateY(-1px)!important;border-color:#C9C2B4!important;box-shadow:0 7px 18px rgba(43,39,31,.05)!important}
    .mission-title{font-size:13px!important;line-height:1.32!important;font-weight:750!important;color:var(--mlos-ink)!important}
    .mission-meta{font-size:11px!important;line-height:1.4!important;margin-top:3px!important;color:#74756E!important}
    .score{font-size:11px!important;color:#657A70!important}
    .dot{width:8px!important;height:8px!important}

    .toolbar{gap:7px!important;margin-bottom:12px!important;flex-wrap:wrap!important}
    .primary,.ghost{
      padding:9px 12px!important;
      border-radius:11px!important;
      font-size:11px!important;
      font-weight:750!important;
    }
    .primary{background:var(--mlos-green)!important;color:#fff!important}
    .ghost{background:#EFEAE1!important;color:#33352F!important;border:1px solid #DDD7CA!important}

    .statgrid{gap:8px!important}
    .stat{padding:11px!important;border-radius:12px!important;background:#F9F6F0!important;border:1px solid var(--mlos-line-2)!important}
    .num{font-size:19px!important;font-weight:800!important;color:var(--mlos-ink)!important}
    .label{font-size:9px!important;color:#777970!important}
    .progress{height:7px!important;background:#E7E2D8!important}
    .bar{background:var(--mlos-green)!important}

    .deadline{padding:12px 0!important;border-bottom:1px solid #E5DFD3!important}
    .dlabel{font-size:12px!important}.dsub{font-size:10px!important}.when{font-size:11px!important}

    .cards{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:12px!important}
    .domain{padding:14px!important;border:1px solid var(--mlos-line)!important;border-radius:13px!important;background:#FAF8F3!important}
    .domain h3{font-size:13px!important}.domain p{font-size:11px!important;color:var(--mlos-muted)!important}

    .timeline{margin-left:7px!important;padding-left:22px!important}
    .timeline:before{background:#D7D1C4!important}
    .tl{margin-bottom:20px!important}.tl:before{left:-22px!important;background:var(--mlos-green)!important;box-shadow:0 0 0 4px #E7E4DA!important}
    .tl strong{font-size:12px!important}.tl span{font-size:10px!important}

    .detail{padding:12px!important;border:1px solid var(--mlos-line)!important;border-radius:11px!important;background:#FAF8F3!important}
    textarea{background:#FAF8F3!important;border:1px solid var(--mlos-line)!important;color:var(--mlos-ink)!important}
    .modalbox{background:var(--mlos-paper)!important;border:1px solid var(--mlos-line)!important;color:var(--mlos-ink)!important}
    .close{background:#EEE9DF!important;color:var(--mlos-ink)!important}
    .toast{background:#263C2D!important;border:0!important;color:#fff!important}

    /* Keep the top gradient deliberately short: status bar -> subtle fade -> cream. */
    @media(max-width:900px){
      .main{max-width:none!important;padding-left:18px!important;padding-right:18px!important}
      .grid{max-width:760px!important}
      .cards{grid-template-columns:1fr!important}
    }
    @media(max-width:600px){
      .side{width:70px!important;padding-left:7px!important;padding-right:7px!important}
      .main{margin-left:70px!important;padding-left:13px!important;padding-right:13px!important;padding-top:calc(env(safe-area-inset-top) + 20px)!important}
      .title{font-size:22px!important;max-width:430px!important}
      .hero h1{font-size:23px!important}
      .panel{padding:15px!important;border-radius:17px!important}
      .hero{padding:17px!important}
    }
    @media(max-width:380px){
      .side{width:62px!important}.main{margin-left:62px!important;padding-left:10px!important;padding-right:10px!important}
      .logo{width:42px!important;height:42px!important;min-width:42px!important}
      .nav button{width:50px!important;height:44px!important}
      .title{font-size:20px!important}.hero h1{font-size:21px!important}
    }
  `;
  document.head.appendChild(style);
})();
