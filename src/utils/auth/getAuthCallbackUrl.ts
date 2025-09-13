export function getAuthCallbackUrl() {
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  // Fallbacks to avoid localhost in prod builds:
  const safeOrigin = origin && !/localhost(:\d+)?$/i.test(origin)
    ? origin
    : (import.meta.env.VITE_PUBLIC_SITE_URL || 'https://emviapp-final.vercel.app');
  return `${safeOrigin}/auth/callback`;
}