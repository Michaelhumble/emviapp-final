// Overlay accessors that return demo arrays trimmed to limit, with __demo marker
import type { Job } from '@/types/job';
import { demoJobsActive, demoJobsExpired, demoSalonsStale, demoArtistsAvailable } from './demoContent';
import { isPreviewEnv } from './demoFlags';

export function getDemoJobs(params: { mode: 'active' | 'expired'; limit?: number }): (Job & { __demo?: true })[] {
  const { mode, limit = 20 } = params;
  const base = mode === 'active' ? demoJobsActive : demoJobsExpired;
  const out = base.slice(0, limit).map(j => ({ ...j, __demo: true as const }));
  return out;
}

export type DemoSalonOut = (typeof demoSalonsStale)[number] & { __demo?: true };
export function getDemoSalons(limit = 6): DemoSalonOut[] {
  return demoSalonsStale.slice(0, limit).map(s => ({ ...s, __demo: true as const }));
}

export type DemoArtistOut = (typeof demoArtistsAvailable)[number] & { __demo?: true };
export function getDemoArtists(limit = 12): DemoArtistOut[] {
  return demoArtistsAvailable.slice(0, limit).map(a => ({ ...a, __demo: true as const }));
}

// Optional: simple counters for logging purposes
let lastCounts = { jobs: 0, salons: 0, artists: 0 };
export function setOverlayCounts(c: Partial<typeof lastCounts>) {
  lastCounts = { ...lastCounts, ...c };
}
export function getOverlayCounts() { return lastCounts; }

// Expose a light cache clearer for preview ops
export function clearDemoCaches() {
  try {
    // Nothing heavy to clear (arrays are static). Consumers may force refetch via reload
    // Left as a hook for future in-memory caches if needed.
  } catch {}
}

// Attach helpers to window in preview for QA
if (typeof window !== 'undefined' && isPreviewEnv()) {
  const w = window as any;
  w.__clearDemoCache = () => {
    try { clearDemoCaches(); } catch {}
    try { localStorage.removeItem('emvi_demo_seeded_v1'); } catch {}
    try { console.info('[Demo] Cleared overlay caches. Reloading…'); } catch {}
    window.location.reload();
  };
}
