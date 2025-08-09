export function getAppOrigin(): string {
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin;
  }
  const envOrigin = (import.meta as any)?.env?.VITE_PUBLIC_APP_ORIGIN as string | undefined;
  return envOrigin || 'https://emviapp-final.vercel.app';
}
