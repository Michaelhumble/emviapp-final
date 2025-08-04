// Conversion tracking utilities for Sunshine chatbot
import { supabase } from '@/integrations/supabase/client';

export interface ConversionEvent {
  userId: string;
  eventType: 'chat_opened' | 'lead_magnet_shown' | 'job_posted' | 'salon_listed' | 'signup_completed' | 'referral_generated';
  source: 'auto_popup' | 'manual_click' | 'chat_action';
  userType: 'new' | 'returning';
  language: 'en' | 'vi';
  metadata?: Record<string, any>;
}

export const trackConversionEvent = async (event: ConversionEvent) => {
  try {
    // Track to activity logs for now until conversion_events is properly integrated
    await supabase.from('activity_log').insert({
      user_id: event.userId,
      activity_type: `conversion_${event.eventType}`,
      description: `Conversion event: ${event.eventType} from ${event.source}`,
      metadata: {
        ...event.metadata,
        conversion_source: event.source,
        user_type: event.userType,
        language: event.language,
        event_type: event.eventType,
        timestamp: new Date().toISOString()
      }
    });
    
    console.log('Conversion event tracked:', event);
  } catch (error) {
    console.error('Failed to track conversion event:', error);
    
    // Log to console as fallback for development
    console.log('Conversion tracking fallback:', {
      timestamp: new Date().toISOString(),
      ...event
    });
  }
};

// Conversion hooks for specific actions
export const conversionEvents = {
  CHAT_OPENED_FROM_POPUP: 'chat_opened_from_popup',
  LEAD_MAGNET_CLICKED: 'lead_magnet_clicked',
  JOB_POST_INITIATED: 'job_post_initiated',
  SALON_LIST_INITIATED: 'salon_list_initiated',
  SIGNUP_FROM_CHAT: 'signup_from_chat',
  PREMIUM_UPGRADE: 'premium_upgrade',
  REFERRAL_SHARED: 'referral_shared'
} as const;

// Helper to track conversion funnel
export const trackConversionFunnel = (userId: string, step: string, metadata?: Record<string, any>) => {
  const event: ConversionEvent = {
    userId,
    eventType: step as any,
    source: 'chat_action',
    userType: 'new', // This would be determined by session logic
    language: 'en', // This would be determined by user preference
    metadata
  };
  
  trackConversionEvent(event);
};

// A/B test tracking for different greeting messages
export const trackGreetingVariant = (userId: string, greetingId: string, language: 'en' | 'vi') => {
  trackConversionEvent({
    userId,
    eventType: 'lead_magnet_shown',
    source: 'auto_popup',
    userType: 'new',
    language,
    metadata: { greetingId, variant: 'conversion_focused' }
  });
};

// Revenue attribution tracking
export const trackRevenueAttribution = (userId: string, action: 'job_post' | 'salon_list' | 'premium_signup', revenue: number) => {
  trackConversionEvent({
    userId,
    eventType: action === 'job_post' ? 'job_posted' : action === 'salon_list' ? 'salon_listed' : 'signup_completed',
    source: 'chat_action',
    userType: 'new', // This would be determined
    language: 'en', // This would be determined
    metadata: { revenue, attribution: 'sunshine_chat' }
  });
};