// Mission Learning OS — UI cleanup v0.1
// Never expose internal ranking sentinels for blocked missions.
(() => {
  function cleanBlockedScores() {
    document.querySelectorAll('.mission[data-runtime-id]').forEach(card => {
      const meta = card.querySelector('.mission-meta');
      const score = card.querySelector('.score');
      if (!meta || !score) return;
      if (meta.textContent.includes('Blocked by:')) {
        score.textContent = 'Blocked';
      }
    });
  }

  const boot = () => {
    cleanBlockedScores();
    setTimeout(cleanBlockedScores, 250);
    setInterval(cleanBlockedScores, 1000);
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
