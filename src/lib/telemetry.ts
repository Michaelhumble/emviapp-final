export function track(name: string, props?: Record<string, any>) {
  try {
    // No external deps; console fallback for now
    console.debug('[track]', name, props || {});
  } catch {}
}
