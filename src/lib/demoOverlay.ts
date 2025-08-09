// src/lib/demoOverlay.ts
export type DemoCounts = { jobs: number; expiredJobs: number; salons: number; artists: number };

declare global {
  interface Window {
    __DEMO_FORCE?: boolean;
    __SHOW_DEMO_BADGES?: boolean;
    __seedDemoContent?: () => Promise<void> | void;
    __clearDemoContent?: () => Promise<void> | void;
    __dumpDemoState?: () => {
      seeded: boolean;
      counts: DemoCounts;
      flags: { __DEMO_FORCE?: boolean; __SHOW_DEMO_BADGES?: boolean };
    };
    __demoState?: {
      seeded: boolean;
      counts: DemoCounts;
      analyticsFired?: Record<string, boolean>;
    };
  }
}

export function isProd(): boolean {
  try {
    const ve = (typeof process !== 'undefined' ? (process as any)?.env?.VERCEL_ENV : undefined);
    const nodeEnv = (typeof process !== 'undefined' ? (process as any)?.env?.NODE_ENV : undefined);
    const veLower = String(ve || '').toLowerCase();
    return veLower === 'production' || String(nodeEnv || '').toLowerCase() === 'production';
  } catch {
    return false;
  }
}

// Preview ON by default in non-production; allow ?design=on/off override
export function isPreview(): boolean {
  if (isProd()) return false;
  try {
    const q = new URLSearchParams((typeof window !== 'undefined' ? window.location.search : ''));
    if (q.get('design') === 'off') return false;
    if (q.get('design') === 'on') return true;
  } catch {}
  return true;
}

// Overlay enabled iff preview (prod always false)
export function isOverlayEnabled(): boolean {
  return isPreview();
}

// Idempotent force-seed hook from router mount
export async function ensureDemoSeededOnMount(): Promise<void> {
  if (!isOverlayEnabled()) return;
  if (typeof window === 'undefined') return;

  window.__demoState ??= { seeded: false, counts: { jobs: 0, expiredJobs: 0, salons: 0, artists: 0 }, analyticsFired: {} };

  // If already seeded and not forced, do nothing
  if (window.__demoState.seeded && !window.__DEMO_FORCE) return;

  if (typeof window.__seedDemoContent === 'function') {
    try {
      await window.__seedDemoContent();
      window.__demoState.seeded = true;
      debugLog('ensureDemoSeededOnMount: seeded');
    } catch (e) {
      debugLog('ensureDemoSeededOnMount: seed failed', e);
    }
  } else {
    debugLog('ensureDemoSeededOnMount: __seedDemoContent missing');
  }
}

export function debugLog(...args: any[]) {
  if (!isOverlayEnabled()) return;
  // eslint-disable-next-line no-console
  console.log('[DEMO]', ...args);
}

export function setCounts(partial: Partial<DemoCounts>) {
  if (typeof window === 'undefined') return;
  window.__demoState ??= { seeded: false, counts: { jobs: 0, expiredJobs: 0, salons: 0, artists: 0 }, analyticsFired: {} };
  window.__demoState.counts = { ...window.__demoState.counts, ...partial } as DemoCounts;
}

export function getCounts(): DemoCounts {
  if (typeof window === 'undefined') return { jobs: 0, expiredJobs: 0, salons: 0, artists: 0 };
  window.__demoState ??= { seeded: false, counts: { jobs: 0, expiredJobs: 0, salons: 0, artists: 0 }, analyticsFired: {} };
  return window.__demoState.counts;
}

export function getAnalyticsMap(): Record<string, boolean> {
  if (typeof window === 'undefined') return {};
  window.__demoState ??= { seeded: false, counts: { jobs: 0, expiredJobs: 0, salons: 0, artists: 0 }, analyticsFired: {} };
  return window.__demoState.analyticsFired ?? {};
}

export function markAnalyticsFired(surfaceKey: string) {
  if (typeof window === 'undefined') return;
  const map = getAnalyticsMap();
  map[surfaceKey] = true;
  window.__demoState!.analyticsFired = map;
}

export function hasAnalyticsFired(surfaceKey: string) {
  return !!getAnalyticsMap()[surfaceKey];
}

// Quick state dumper for console
export function registerDumpDemoState() {
  if (typeof window === 'undefined') return;
  window.__dumpDemoState = () => ({
    seeded: !!window.__demoState?.seeded,
    counts: getCounts(),
    flags: { __DEMO_FORCE: window.__DEMO_FORCE, __SHOW_DEMO_BADGES: window.__SHOW_DEMO_BADGES },
  });
}
