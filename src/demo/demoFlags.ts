// Demo overlay flags and state (preview-only)
// Never write to DB; purely UI overlay helpers

export const demoState = {
  // toggles controlled via window in preview
  get forced(): boolean {
    try {
      // @ts-ignore
      const w = typeof window !== 'undefined' ? (window as any) : {};
      return !!w.__DEMO_FORCE;
    } catch {}
    return false;
  },
  get showBadges(): boolean {
    try {
      // @ts-ignore
      const w = typeof window !== 'undefined' ? (window as any) : {};
      return !!w.__SHOW_DEMO_BADGES;
    } catch {}
    return false;
  }
};

export const isPreviewEnv = () => {
  try {
    // Vite dev flag or preview host hint
    // @ts-ignore
    return import.meta.env.DEV || (typeof window !== 'undefined' && window.location.hostname.includes('preview'));
  } catch {
    return false;
  }
};

export const isDemoForced = () => demoState.forced;
export const showDemoBadges = () => demoState.showBadges;
