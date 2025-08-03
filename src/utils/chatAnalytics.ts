// Chat analytics tracking utility
export const trackChatEvent = (eventName: string, properties?: Record<string, any>) => {
  // Integrate with your analytics service (Google Analytics, Mixpanel, etc.)
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      event_category: 'Sunshine_Chat',
      ...properties
    });
  }
  
  // Also log for debugging
  console.log('Chat Analytics:', { eventName, properties });
};

export const chatEvents = {
  CHAT_OPENED: 'chat_opened',
  MESSAGE_SENT: 'message_sent',
  ROUTE_CONFIRMED: 'route_confirmed',
  AUTH_STARTED: 'auth_flow_started',
  AUTH_COMPLETED: 'auth_flow_completed',
  QUICK_ACTION_CLICKED: 'quick_action_clicked',
  CHAT_CLEARED: 'chat_cleared',
  LANGUAGE_DETECTED: 'language_detected',
  NAME_EXTRACTED: 'name_extracted'
} as const;