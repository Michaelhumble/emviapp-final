import { trackEvent } from "./analytics";

/**
 * Normalizes legacy analytics shapes to trackEvent(name, params?)
 * Supported patterns:
 *  - gtag('event', 'name', { ... })
 *  - gtag('consent', 'update', { ... })
 *  - gtag('config', 'G-XXXX', { ... })
 *  - UA-style: logEvent('category','action','label?', value?)
 */
export function logEvent(
  a: string,
  b?: string | Record<string, unknown>,
  c?: string,
  d?: number
): void {
  // UA-style: category, action, label, value
  if (typeof b === "string") {
    const category = a;
    const action = b;
    const params: Record<string, unknown> = { category, action };
    if (c) params.label = c;
    if (typeof d === "number") params.value = d;
    trackEvent(`${category}_${action}`, params);
    return;
  }

  // trackEvent(name, params)
  trackEvent(a, (b as Record<string, unknown>) ?? {});
}

// Optional helpers for previous gtag shapes:
export function gtagConfig(measurementId: string, params: Record<string, unknown> = {}) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("config", measurementId, params);
  }
}

export function gtagConsentUpdate(params: Record<string, unknown>) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("consent", "update", params);
  }
}

/** FINAL fallback: accept raw gtag(...) legacy calls safely */
export function gtagCompat(...args: unknown[]) {
  if (!args.length) return;
  const [cmd, arg1, arg2] = args as [string, any, any?];

  if (cmd === "event") {
    logEvent(arg1 as string, (arg2 as Record<string, unknown>) ?? {});
  } else if (cmd === "consent" && arg1 === "update") {
    gtagConsentUpdate(arg2 || {});
  } else if (cmd === "config" && typeof arg1 === "string") {
    gtagConfig(arg1, arg2 || {});
  } else {
    // no-op; avoids throwing in legacy code paths
  }
}