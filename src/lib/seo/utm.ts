export function buildUTM(params: {
  source?: string; 
  medium?: string; 
  campaign?: string; 
  content?: string;
}) {
  const p = new URLSearchParams();
  if (params.source) p.set("utm_source", params.source);
  if (params.medium) p.set("utm_medium", params.medium);
  if (params.campaign) p.set("utm_campaign", params.campaign);
  if (params.content) p.set("utm_content", params.content);
  return p.toString();
}

export function parseSignupParams() {
  if (typeof window === 'undefined') return {};
  
  const params = new URLSearchParams(window.location.search);
  return {
    role: params.get('role') || null,
    city: params.get('city') || null,
    utms: {
      utm_source: params.get('utm_source') || null,
      utm_medium: params.get('utm_medium') || null,
      utm_campaign: params.get('utm_campaign') || null,
      utm_content: params.get('utm_content') || null,
    }
  };
}

// Track GA4 events if GA_ID is present
export function trackGA4Event(eventName: string, parameters: Record<string, any>) {
  if (typeof window === 'undefined') return;
  
  const gaId = import.meta.env.VITE_GA_ID;
  if (!gaId || !window.gtag) return;
  
  try {
    window.gtag('event', eventName, parameters);
  } catch (error) {
    // Silently fail - analytics should never break the page
    console.debug('GA4 tracking failed:', error);
  }
}