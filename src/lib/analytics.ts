type GtagParams = Record<string, unknown>;

export function trackEvent(name: string, params: GtagParams = {}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', name, params);
  }
}

export function trackConsent(action: 'accept_all' | 'reject' | 'manage_open') {
  trackEvent(
    `consent_${action}`,
    { 
      source: 'banner', 
      path: typeof location !== 'undefined' ? location.pathname : '' 
    }
  );
}

export function trackScrollDepth(depth: number, timeOnPage: number, maxScroll: number) {
  trackEvent('scroll_depth', {
    event_category: 'engagement',
    event_label: `${depth}%`,
    value: depth,
    custom_map: {
      time_on_page: Math.round(timeOnPage / 1000),
      max_scroll: maxScroll
    }
  });
}

export function trackFunnelStep(step: string, action: string, metadata: GtagParams = {}) {
  trackEvent('funnel_step', {
    event_category: 'conversion_funnel',
    event_label: `${step}_${action}`,
    custom_map: metadata
  });
}

export function trackCustomEvent(eventName: string, properties: GtagParams = {}) {
  trackEvent(eventName, {
    event_category: 'custom',
    ...properties
  });
}

// Legacy analytics object for backward compatibility
export const analytics = {
  track: trackEvent,
  page: (name: string, properties?: GtagParams) => trackEvent('page_view', { page_name: name, ...properties }),
  identify: (userId: string, traits?: GtagParams) => trackEvent('identify_user', { user_id: userId, ...traits }),
  alias: (newId: string, previousId?: string) => trackEvent('alias_user', { new_id: newId, previous_id: previousId }),
  reset: () => console.log('[ANALYTICS] Reset called'),
  group: (groupId: string, traits?: GtagParams) => trackEvent('join_group', { group_id: groupId, ...traits }),
  
  // Backward compatibility methods
  trackEvent: trackEvent,
  trackContactSubmission: (data?: GtagParams) => trackEvent('contact_submission', data),
  trackError: (error: string, context?: GtagParams) => trackEvent('error', { error, ...context }),
  trackPageView: (page: string, properties?: GtagParams) => trackEvent('page_view', { page_name: page, ...properties }),
  trackJobApplication: (jobId: string, properties?: GtagParams) => trackEvent('job_application', { job_id: jobId, ...properties }),
  trackContentView: (contentId: string, properties?: GtagParams) => trackEvent('content_view', { content_id: contentId, ...properties }),
  trackSearch: (query: string, properties?: GtagParams) => trackEvent('search', { query, ...properties }),
  trackSignup: (method?: string, properties?: GtagParams) => trackEvent('signup', { method, ...properties }),
  trackBookingCreated: (bookingId: string, properties?: GtagParams) => trackEvent('booking_created', { booking_id: bookingId, ...properties }),
  trackPaymentCompleted: (amount: number, properties?: GtagParams) => trackEvent('payment_completed', { amount, ...properties }),
  trackBeginCheckout: (properties?: GtagParams) => trackEvent('begin_checkout', properties),
  trackPurchase: (properties?: GtagParams) => trackEvent('purchase', properties),
  trackAddToCart: (properties?: GtagParams) => trackEvent('add_to_cart', properties),
  trackRemoveFromCart: (properties?: GtagParams) => trackEvent('remove_from_cart', properties)
};