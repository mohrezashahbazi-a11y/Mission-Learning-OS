(function () {
  const STYLE_ID = 'ui-balance-v2-style';
  if (document.getElementById(STYLE_ID)) return;

  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    :root{
      --bg: #f5f1e8;
      --bg-soft: #f8f5ee;
      --card: #faf8f2;
      --border: #d8d2c5;
      --text: #181818;
      --muted: #6f6b63;
      --green: #214f40;
      --green-soft: #315d4f;
      --accent: #1e5a47;
      --black: #111111;
      --sidebar-width: 68px;
      --top-gradient-height: 68px;
      --radius-lg: 20px;
      --radius-md: 16px;
      --radius-sm: 14px;
      --shadow: 0 8px 24px rgba(23, 32, 24, 0.06);
      --safe-top: env(safe-area-inset-top, 0px);
    }

    html, body {
      background: var(--bg) !important;
      color: var(--text) !important;
      font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
      -webkit-font-smoothing: antialiased;
      text-rendering: optimizeLegibility;
      margin: 0 !important;
      padding: 0 !important;
      min-height: 100%;
    }

    body::before{
      content:"";
      position: fixed;
      left: 0;
      top: 0;
      right: 0;
      height: calc(var(--top-gradient-height) + var(--safe-top));
      background: linear-gradient(
        180deg,
        #49665c 0%,
        #73867d 28%,
        #cfcbbf 72%,
        rgba(245,241,232,0) 100%
      );
      pointer-events: none;
      z-index: 0;
    }

    body > * {
      position: relative;
      z-index: 1;
    }

    /* ---------- layout ---------- */
    .sidebar,
    .side-nav,
    .nav-sidebar,
    .left-rail {
      width: var(--sidebar-width) !important;
      min-width: var(--sidebar-width) !important;
      max-width: var(--sidebar-width) !important;
      background: #f7f4ed !important;
      border-right: 1px solid rgba(33,79,64,0.08) !important;
      padding: calc(var(--safe-top) + 8px) 10px 18px !important;
      box-sizing: border-box !important;
      display: flex !important;
      flex-direction: column !important;
      align-items: center !important;
      gap: 12px !important;
    }

    main,
    .main-content,
    .content,
    .page-content,
    .app-content {
      padding-top: calc(var(--safe-top) + 22px) !important;
      padding-left: 20px !important;
      padding-right: 18px !important;
      padding-bottom: 24px !important;
      box-sizing: border-box !important;
    }

    /* ---------- logo ---------- */
    .app-logo,
    .logo,
    .brand-logo,
    .sidebar-logo {
      width: 44px !important;
      height: 44px !important;
      border-radius: 14px !important;
      background: #f4f1e9 !important;
      border: 1px solid rgba(33,79,64,0.18) !important;
      display: grid !important;
      place-items: center !important;
      overflow: hidden !important;
      box-shadow: none !important;
      flex: 0 0 auto !important;
    }

    /* ---------- sidebar items ---------- */
    .sidebar button,
    .sidebar .nav-item,
    .sidebar .tab-item,
    .side-nav button,
    .side-nav .nav-item,
    .left-rail button {
      width: 44px !important;
      height: 44px !important;
      min-height: 44px !important;
      border-radius: 14px !important;
      border: 1px solid transparent !important;
      background: transparent !important;
      color: var(--green) !important;
      display: grid !important;
      place-items: center !important;
      padding: 0 !important;
      box-shadow: none !important;
    }

    .sidebar button.active,
    .sidebar .nav-item.active,
    .sidebar .tab-item.active,
    .side-nav button.active,
    .side-nav .nav-item.active,
    .left-rail button.active,
    .sidebar button[aria-selected="true"],
    .side-nav button[aria-selected="true"] {
      background: #efe9dd !important;
      border-color: rgba(33,79,64,0.08) !important;
    }

    .sidebar button svg,
    .sidebar .nav-item svg,
    .side-nav button svg,
    .left-rail button svg {
      width: 20px !important;
      height: 20px !important;
      stroke: var(--green) !important;
      stroke-width: 2 !important;
      fill: none !important;
    }

    /* ---------- typography ---------- */
    h1,
    .page-title,
    .hero-title {
      font-size: 19px !important;
      line-height: 1.24 !important;
      letter-spacing: -0.03em !important;
      font-weight: 800 !important;
      margin: 0 0 10px !important;
      color: var(--text) !important;
      max-width: 540px;
    }

    h2,
    .section-title {
      font-size: 15px !important;
      line-height: 1.3 !important;
      font-weight: 750 !important;
      margin: 0 0 10px !important;
      color: var(--text) !important;
    }

    h3 {
      font-size: 13px !important;
      line-height: 1.3 !important;
      font-weight: 700 !important;
      margin: 0 0 8px !important;
    }

    .eyebrow,
    .section-eyebrow,
    .kicker,
    .section-label {
      font-size: 10px !important;
      line-height: 1.2 !important;
      letter-spacing: 0.18em !important;
      text-transform: uppercase !important;
      font-weight: 800 !important;
      color: var(--accent) !important;
      margin-bottom: 10px !important;
    }

    p,
    .description,
    .subtitle,
    .muted,
    .helper-text,
    .body-text {
      font-size: 12px !important;
      line-height: 1.62 !important;
      color: var(--muted) !important;
      margin: 0 0 12px !important;
    }

    .hero-subtitle,
    .page-subtitle {
      font-size: 12px !important;
      line-height: 1.65 !important;
      color: var(--muted) !important;
      max-width: 560px;
      margin-bottom: 18px !important;
    }

    /* ---------- cards ---------- */
    .card,
    .panel,
    .box,
    .section-card,
    .content-card {
      background: rgba(250,248,242,0.95) !important;
      border: 1px solid var(--border) !important;
      border-radius: var(--radius-lg) !important;
      box-shadow: var(--shadow) !important;
      padding: 18px !important;
    }

    .metric-card,
    .mini-card,
    .stat-card,
    .queue-card,
    .mission-card {
      background: #faf8f2 !important;
      border: 1px solid var(--border) !important;
      border-radius: 18px !important;
      box-shadow: none !important;
    }

    .mission-card {
      padding: 16px !important;
      margin-bottom: 14px !important;
    }

    .mission-card h3,
    .mission-title {
      font-size: 13px !important;
      line-height: 1.35 !important;
      font-weight: 760 !important;
      margin-bottom: 6px !important;
    }

    .mission-meta,
    .mission-subtitle {
      font-size: 11px !important;
      line-height: 1.45 !important;
      color: var(--muted) !important;
    }

    /* ---------- chips ---------- */
    .chip,
    .pill,
    .tag {
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      min-height: 34px !important;
      padding: 0 14px !important;
      border-radius: 999px !important;
      border: 1px solid var(--border) !important;
      background: #f7f4ec !important;
      color: #4f4a43 !important;
      font-size: 11px !important;
      font-weight: 550 !important;
      box-shadow: none !important;
    }

    /* ---------- buttons ---------- */
    button,
    .btn {
      min-height: 42px !important;
      padding: 0 16px !important;
      border-radius: 16px !important;
      font-size: 12px !important;
      font-weight: 700 !important;
      border: 1px solid var(--border) !important;
      box-shadow: none !important;
    }

    .btn-primary,
    .primary,
    .is-primary {
      background: #111111 !important;
      color: #ffffff !important;
      border-color: #111111 !important;
    }

    .btn-secondary,
    .secondary {
      background: #f4f0e6 !important;
      color: #232323 !important;
    }

    .toolbar,
    .queue-actions,
    .action-grid {
      display: flex !important;
      flex-wrap: wrap !important;
      gap: 10px !important;
      align-items: center !important;
    }

    /* ---------- tables / stat rows ---------- */
    .stat-row,
    .info-row,
    .metric-row {
      display: flex !important;
      align-items: center !important;
      justify-content: space-between !important;
      gap: 12px !important;
      padding: 14px 16px !important;
      border: 1px solid var(--border) !important;
      border-radius: 16px !important;
      background: #faf8f2 !important;
      margin-bottom: 10px !important;
    }

    .stat-row .value,
    .metric-value {
      font-size: 13px !important;
      font-weight: 760 !important;
      color: var(--text) !important;
    }

    .stat-row .label,
    .metric-label {
      font-size: 11px !important;
      color: var(--muted) !important;
    }

    /* ---------- tab/page spacing ---------- */
    .page-header,
    .hero,
    .top-section {
      padding-top: 10px !important;
      margin-bottom: 18px !important;
    }

    .page-header + .card,
    .hero + .card {
      margin-top: 6px !important;
    }

    /* ---------- responsive ---------- */
    @media (min-width: 768px) {
      :root{
        --sidebar-width: 74px;
        --top-gradient-height: 70px;
      }

      h1,
      .page-title,
      .hero-title {
        font-size: 22px !important;
      }

      p,
      .description,
      .subtitle,
      .helper-text {
        font-size: 13px !important;
      }

      button,
      .btn {
        font-size: 13px !important;
      }

      .mission-card h3,
      .mission-title {
        font-size: 14px !important;
      }
    }
  `;
  document.head.appendChild(style);

  function svgIcon(name) {
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const add = (tag, attrs) => {
      const el = document.createElementNS(ns, tag);
      Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
      svg.appendChild(el);
    };

    if (name === 'home') {
      add('path', { d: 'M3 10.5L12 3l9 7.5' });
      add('path', { d: 'M5 9.5V21h14V9.5' });
    } else if (name === 'cloud') {
      add('path', { d: 'M7 18h10a4 4 0 0 0 .6-8A5 5 0 0 0 8 8a4 4 0 0 0-1 10Z' });
    } else if (name === 'medal') {
      add('circle', { cx: '12', cy: '8', r: '4' });
      add('path', { d: 'M8.5 12.5L7 21l5-3 5 3-1.5-8.5' });
    } else if (name === 'chart') {
      add('path', { d: 'M4 20V10' });
      add('path', { d: 'M10 20V4' });
      add('path', { d: 'M16 20v-7' });
      add('path', { d: 'M22 20v-12' });
    } else if (name === 'refresh') {
      add('path', { d: 'M20 11a8 8 0 1 0 2 5' });
      add('path', { d: 'M20 4v7h-7' });
    } else if (name === 'review') {
      add('path', { d: 'M4 5h16v10H7l-3 3V5z' });
      add('path', { d: 'M8 9h8' });
      add('path', { d: 'M8 12h5' });
    } else if (name === 'calendar') {
      add('rect', { x: '3', y: '5', width: '18', height: '16', rx: '2' });
      add('path', { d: 'M16 3v4M8 3v4M3 10h18' });
    } else if (name === 'book') {
      add('path', { d: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20' });
      add('path', { d: 'M6.5 17A2.5 2.5 0 0 0 4 19.5V5a2 2 0 0 1 2-2H20v14' });
    } else if (name === 'queue') {
      add('rect', { x: '4', y: '5', width: '16', height: '4', rx: '1.5' });
      add('rect', { x: '4', y: '11', width: '16', height: '4', rx: '1.5' });
      add('rect', { x: '4', y: '17', width: '10', height: '4', rx: '1.5' });
    } else {
      add('circle', { cx: '12', cy: '12', r: '3' });
    }
    return svg;
  }

  function injectLogo() {
    const logoTargets = document.querySelectorAll('.logo, .app-logo, .brand-logo, .sidebar-logo');
    logoTargets.forEach(target => {
      if (target.dataset.uiBalanced === '1') return;
      target.dataset.uiBalanced = '1';
      target.innerHTML = `
        <svg viewBox="0 0 64 64" width="30" height="30" aria-hidden="true">
          <path d="M10 46c6-1 11-3 16-8 2 4 4 6 6 8 3-2 5-5 7-9 5 5 9 7 15 8" fill="none" stroke="#1f5a48" stroke-width="2.6" stroke-linecap="round"/>
          <path d="M19 45c0-9 4-16 12-24 8 8 12 15 12 24" fill="none" stroke="#1f5a48" stroke-width="2.6" stroke-linecap="round"/>
          <path d="M31 22v18" fill="none" stroke="#1f5a48" stroke-width="2.6" stroke-linecap="round"/>
          <path d="M26 29c-4-1-6-4-7-8 4 1 7 3 9 7" fill="#2c694f"/>
          <path d="M38 29c4-1 6-4 7-8-4 1-7 3-9 7" fill="#2c694f"/>
          <path d="M22 37c-3 0-6-2-8-5 4 0 7 1 9 4" fill="#2c694f"/>
          <path d="M40 37c3 0 6-2 8-5-4 0-7 1-9 4" fill="#2c694f"/>
        </svg>
      `;
    });
  }

  function injectSidebarIcons() {
    const items = document.querySelectorAll(
      '.sidebar button, .sidebar .nav-item, .sidebar .tab-item, .side-nav button, .side-nav .nav-item, .left-rail button'
    );

    const order = ['home', 'cloud', 'medal', 'chart', 'refresh', 'review', 'calendar', 'book', 'queue'];

    items.forEach((item, idx) => {
      if (item.dataset.iconInjected === '1') return;
      item.dataset.iconInjected = '1';
      const iconName = order[idx] || 'dot';
      item.innerHTML = '';
      item.appendChild(svgIcon(iconName));
    });
  }

  function apply() {
    injectLogo();
    injectSidebarIcons();
  }

  apply();
  const observer = new MutationObserver(() => apply());
  observer.observe(document.body, { childList: true, subtree: true });
})();
