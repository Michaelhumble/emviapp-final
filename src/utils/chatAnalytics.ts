// Chat Analytics Tracking for Conversion and Lead Management

export const chatEvents = {
  CHAT_OPENED: 'chat_opened',
  CHAT_CLOSED: 'chat_closed',
  CHAT_CLEARED: 'chat_cleared',
  MESSAGE_SENT: 'message_sent',
  ROUTE_INITIATED: 'route_initiated',
  ROUTE_CONFIRMED: 'route_confirmed',
  SIGNUP_INITIATED: 'chat_signup_initiated', // Track when signup starts from chat
  CONVERSION_SUCCESS: 'chat_conversion_success', // Track successful task completion
  AUTH_STARTED: 'auth_flow_started',
  AUTH_COMPLETED: 'auth_flow_completed',
  QUICK_ACTION_CLICKED: 'quick_action_clicked'
};

interface ChatAnalyticsEvent {
  event: string;
  userId?: string;
  userName?: string;
  language?: string;
  route?: string;
  timestamp?: number;
  metadata?: Record<string, any>;
}

export const trackChatEvent = (eventName: string, data?: Record<string, any>) => {
  const event: ChatAnalyticsEvent = {
    event: eventName,
    timestamp: Date.now(),
    ...data
  };

  // Log to console for development
  console.log('Chat Analytics:', event);

  // Store in localStorage for session tracking
  try {
    const existingEvents = JSON.parse(localStorage.getItem('chat-analytics') || '[]');
    existingEvents.push(event);
    
    // Keep only last 100 events to prevent storage bloat
    if (existingEvents.length > 100) {
      existingEvents.splice(0, existingEvents.length - 100);
    }
    
    localStorage.setItem('chat-analytics', JSON.stringify(existingEvents));
  } catch (error) {
    console.warn('Failed to store chat analytics:', error);
  }

  // In production, this would send to your analytics service
  // Example: sendToAnalytics(event);
};

export const trackSignupInitiated = (userId: string, route: string, userName?: string) => {
  trackChatEvent(chatEvents.SIGNUP_INITIATED, {
    userId,
    userName,
    route,
    source: 'chat_routing'
  });
};

export const trackConversionSuccess = (userId: string, action: string, userName?: string) => {
  trackChatEvent(chatEvents.CONVERSION_SUCCESS, {
    userId,
    userName,
    action,
    source: 'chat_completion'
  });
};

export const getChatAnalytics = (): ChatAnalyticsEvent[] => {
  try {
    return JSON.parse(localStorage.getItem('chat-analytics') || '[]');
  } catch {
    return [];
  }
};
