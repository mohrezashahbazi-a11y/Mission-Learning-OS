// Mission Learning OS — Cream & Black Theme v1.0
// Reversible visual-only layer. Does not change application logic.
(() => {
  if (document.getElementById('cream-black-theme')) return;
  const style = document.createElement('style');
  style.id = 'cream-black-theme';
  style.textContent = `
    :root{
      --bg:#f5f1e8;
      --panel:#fffdf8;
      --panel2:#eee9df;
      --line:#d8d1c4;
      --text:#111111;
      --muted:#5f5b54;
      --accent:#111111;
      --green:#111111;
      --cyan:#111111;
      --orange:#111111;
      --purple:#111111;
      --red:#111111;
    }
    body{
      background:#f5f1e8 !important;
      color:#111 !important;
    }
    .side{
      background:#eee9df !important;
      border-right-color:#d2cabd !important;
    }
    .logo{
      background:#111 !important;
      color:#f5f1e8 !important;
    }
    .nav button{color:#555149 !important}
    .nav button:hover,.nav button.active{
      background:#ded7ca !important;
      color:#111 !important;
    }
    .main{color:#111 !important}
    .hero,.panel{
      background:#fffdf8 !important;
      border-color:#d8d1c4 !important;
      box-shadow:0 12px 35px rgba(35,30,20,.08) !important;
    }
    .hero{
      background:#f0ebe2 !important;
    }
    .eyebrow{color:#111 !important}
    .subtitle,.mission-meta,.label,.dsub{color:#625e57 !important}
    .date,.pill,.chip,.tag{
      background:#eee9df !important;
      border-color:#d2cabd !important;
      color:#292723 !important;
    }
    .mission,.domain,.stat,.detail{
      background:#f8f5ee !important;
      border-color:#d8d1c4 !important;
      color:#111 !important;
    }
    .mission:hover{border-color:#8d877c !important}
    .primary{
      background:#111 !important;
      color:#f5f1e8 !important;
    }
    .ghost{
      background:#e7e1d6 !important;
      color:#111 !important;
      border:1px solid #d0c8bb !important;
    }
    .status{background:#e7e1d6 !important;color:#222 !important}
    .status.complete{background:#d8d2c7 !important;color:#111 !important}
    .progress{background:#ded8cd !important}
    .bar{background:#111 !important}
    .timeline:before{background:#c7c0b5 !important}
    .tl:before{background:#111 !important;box-shadow:0 0 0 4px #ddd7cc !important}
    .modal{background:rgba(20,18,15,.48) !important}
    .modalbox{background:#fffdf8 !important;border-color:#d0c8bb !important;color:#111 !important}
    .close{background:#e7e1d6 !important;color:#111 !important}
    textarea{background:#f8f5ee !important;border-color:#d0c8bb !important;color:#111 !important}
    .toast{background:#111 !important;color:#f5f1e8 !important;border-color:#111 !important}
    .bottom{border-top-color:#d2cabd !important;color:#625e57 !important}
    .when{color:#302d28 !important}
    .when.critical,.when.near{color:#111 !important}
  `;
  document.head.appendChild(style);
})();
