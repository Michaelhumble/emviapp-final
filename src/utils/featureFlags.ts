// Feature Flag System for Affiliate Landing Page
// Environment-based feature toggles with fallbacks

export const flags = {
  // Affiliate Luxury Features - Phase 2
  AFFILIATE_LUX_ENABLE: 
    (import.meta as any).env?.VITE_AFFILIATE_LUX_ENABLE === 'true' ||
    false, // Default to false for safety

  // Future flags can be added here
  // AFFILIATE_ADVANCED_ANALYTICS: false,
  // AFFILIATE_VIDEO_TESTIMONIALS: false,
};

// Utility function to check if reduced motion is preferred
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Debug helper (only in development)
export const debugFlags = () => {
  if (import.meta.env.DEV) {
    console.log('🏁 Feature Flags:', flags);
  }
};