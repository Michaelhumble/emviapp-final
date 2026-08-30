export function track(name: string, props?: Record<string, any>) {
  try {
    console.debug('[track]', name, props || {});
    const w = window as any;
    if (typeof w?.gtag === 'function') {
      w.gtag('event', name, props || {});
    } else if (Array.isArray(w?.dataLayer)) {
      w.dataLayer.push({ event: name, ...(props || {}) });
    }
  } catch {}
}
