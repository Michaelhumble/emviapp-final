// Preview-only demo seeding utilities (no DB writes)
// Exposes window.__seedDemoContent and window.__clearDemoContent

import { getDemoJobs, getDemoSalons, getDemoArtists, setOverlayCounts, clearDemoCaches } from '@/demo/seedOverlay';

(function initDemoSeed() {
  if (typeof window === 'undefined') return;
  if (import.meta.env.MODE === 'production') return;

  const w: any = window;
  w.__DEMO_FORCE = w.__DEMO_FORCE ?? false;
  w.__SHOW_DEMO_BADGES = w.__SHOW_DEMO_BADGES ?? false;
  w.__demoOverlayVersion = w.__demoOverlayVersion ?? 1;

  const seed = async () => {
    try {
      const artists = getDemoArtists(6);
      const jobsExpired = getDemoJobs({ mode: 'expired', limit: 12 });
      const jobsActive = getDemoJobs({ mode: 'active', limit: 12 });
      const salons = getDemoSalons(6);
      setOverlayCounts({ artists: artists.length, jobs: Math.max(jobsExpired.length, jobsActive.length), salons: salons.length });

      // Update localStorage seed marker
      try { localStorage.setItem('emvi_demo_seeded_v1', '1'); } catch { }

      // Bump version and notify listeners
      w.__demoOverlayVersion = (w.__demoOverlayVersion || 1) + 1;
      window.dispatchEvent(new Event('demo-overlay-seeded'));

      // Console hints
      try {
        console.info(`[Demo] Overlay seeded: artists=${artists.length}, jobs_expired=${jobsExpired.length}, jobs_active=${jobsActive.length}, salons=${salons.length}`);
      } catch { }
    } catch (e) {
      console.error('[Demo] Failed to seed demo content', e);
    }
  };

  const clear = async () => {
    try {
      clearDemoCaches();
      try { localStorage.removeItem('emvi_demo_seeded_v1'); } catch { }
      w.__demoOverlayVersion = (w.__demoOverlayVersion || 1) + 1;
      window.dispatchEvent(new Event('demo-overlay-cleared'));
      try { console.info('[Demo] Overlay cleared'); } catch { }
    } catch (e) {
      console.error('[Demo] Failed to clear demo content', e);
    }
  };

  w.__seedDemoContent = seed;
  w.__clearDemoContent = clear;
  // Alias (keep backwards compatibility)
  w.__clearDemoCache = clear;
})();
