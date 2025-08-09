// Preview-only flags and console helpers
// Loaded only when import.meta.env.MODE !== 'production'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const w: any = typeof window !== 'undefined' ? window : {};

w.__env = w.__env || {};

// Force FOMO/public behavior in preview unless explicitly overridden
if (w.__env.FOMO_LISTING_MODE === undefined) {
  w.__env.FOMO_LISTING_MODE = true;
}

// Force sections visible even when data is empty (hooks may synthesize placeholders)
if (w.__env.PREVIEW_FORCE_VISIBLE === undefined) {
  w.__env.PREVIEW_FORCE_VISIBLE = true;
}

// Helpful console instructions
if (typeof window !== 'undefined') {
  // Small delay to avoid noisy startup
  setTimeout(() => {
    try {
      // eslint-disable-next-line no-console
      console.info('[Preview] Demo seeding helpers ready. Use:');
      // eslint-disable-next-line no-console
      console.info('  → window.__seedDemoContent()  // populate preview with demo rows');
      // eslint-disable-next-line no-console
      console.info('  → window.__clearDemoContent() // remove all demo rows');
      // eslint-disable-next-line no-console
      console.info('  → window.__markExpiredJobs?.(n) // optional: mark n existing jobs expired');
    } catch {}
  }, 1200);
}

export {};