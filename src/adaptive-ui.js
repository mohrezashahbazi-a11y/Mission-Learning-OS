// Mission OS — adaptive UI bridge
// Adds visible workload behavior to the existing static UI without changing curriculum data.
(() => {
  const profiles = {
    high: { max: 4, minutes: 150, label: 'High — full core workload' },
    normal: { max: 4, minutes: 120, label: 'Normal — core workload' },
    low: { max: 3, minutes: 75, label: 'Low — lighter workload' },
    recovery: { max: 2, minutes: 45, label: 'Recovery — minimum viable progress' }
  };
  const profileFor = e => e >= 8 ? 'high' : e >= 5 ? 'normal' : e >= 3 ? 'low' : 'recovery';
  const originalQueue = window.queue;
  const originalRender = window.render;

  window.queue = function adaptiveQueue() {
    const profile = profiles[profileFor(Number(window.state?.energy ?? 7))];
    const ranked = typeof window.ranked === 'function' ? window.ranked() : [];
    const out = [];
    let used = 0;
    for (const m of ranked) {
      if (out.length >= profile.max) break;
      if (m.energy > Number(window.state?.energy ?? 7) + 1) continue;
      const mins = Number(m.mins || 30);
      if (used + mins > Math.min(Number(window.state?.availableMinutes || 120), profile.minutes)) continue;
      out.push(m); used += mins;
    }
    return out;
  };

  window.render = function adaptiveRender() {
    originalRender();
    const energy = Number(window.state?.energy ?? 7);
    const profileName = profileFor(energy);
    const profile = profiles[profileName];
    const chip = document.getElementById('queueCount');
    if (chip) chip.textContent = `${profile.max} Core Missions · ${profileName}`;
    const hero = document.getElementById('objective');
    if (hero) hero.textContent = energy < 3 ? 'Minimum viable progress. Keep the chain alive.' : energy < 5 ? 'Lighter workload. Keep moving.' : 'Build the foundation. Keep moving.';
  };

  const oldEnergy = document.getElementById('energyBtn');
  if (oldEnergy) {
    oldEnergy.onclick = () => {
      const current = Number(window.state?.energy ?? 7);
      const value = prompt('Energy today (1–10):', current);
      if (value === null) return;
      const energy = Math.max(1, Math.min(10, Number(value) || current));
      window.state.energy = energy;
      localStorage.setItem('missionOSState', JSON.stringify(window.state));
      window.render();
      if (typeof window.toast === 'function') window.toast(`Energy ${energy}/10 · ${profiles[profileFor(energy)].label}`);
    };
  }

  // Re-render after the bridge is installed.
  window.render();
})();
