import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabaseBypass } from '@/types/supabase-bypass';

interface InteractionEvent {
  type: 'view' | 'click' | 'search' | 'favorite' | 'apply' | 'contact' | 'share';
  entityType: 'job' | 'salon' | 'artist' | 'post' | 'page';
  entityId?: string;
  userId?: string;
  sessionId: string;
  metadata?: Record<string, any>;
  timestamp: number;
}

interface AnalyticsContextType {
  trackEvent: (event: Omit<InteractionEvent, 'sessionId' | 'timestamp' | 'userId'>) => void;
  trackPageView: (page: string, metadata?: Record<string, any>) => void;
  trackJobApplication: (jobId: string, metadata?: Record<string, any>) => void;
  trackJobView: (jobId: string, metadata?: Record<string, any>) => void;
  trackSalonView: (salonId: string, metadata?: Record<string, any>) => void;
  trackArtistView: (artistId: string, metadata?: Record<string, any>) => void;
  trackSearch: (query: string, category?: string, results?: number) => void;
  sessionId: string;
}

const AnalyticsContext = createContext<AnalyticsContextType | null>(null);

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within AnalyticsProvider');
  }
  return context;
};

export const AnalyticsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const [userId, setUserId] = useState<string | undefined>();

  useEffect(() => {
    // Track authenticated user
    const getUser = async () => {
      const { data: { user } } = await supabaseBypass.auth.getUser();
      setUserId(user?.id);
    };
    
    getUser();

    const { data: { subscription } } = supabaseBypass.auth.onAuthStateChange((event, session) => {
      setUserId(session?.user?.id);
    });

    return () => subscription.unsubscribe();
  }, []);

  const trackEvent = async (event: Omit<InteractionEvent, 'sessionId' | 'timestamp' | 'userId'>) => {
    const fullEvent: InteractionEvent = {
      ...event,
      sessionId,
      userId,
      timestamp: Date.now()
    };

    try {
      // Store in localStorage for immediate access
      const existingEvents = JSON.parse(localStorage.getItem('emvi_events') || '[]');
      existingEvents.push(fullEvent);
      
      // Keep only last 500 events
      if (existingEvents.length > 500) {
        existingEvents.splice(0, existingEvents.length - 500);
      }
      
      localStorage.setItem('emvi_events', JSON.stringify(existingEvents));

      // Store in database if user is authenticated
      if (userId) {
        await supabaseBypass
          .from('activity_log')
          .insert({
            user_id: userId,
            activity_type: `${event.type}_${event.entityType}`,
            description: `${event.type} ${event.entityType}${event.entityId ? ` ${event.entityId}` : ''}`,
            metadata: {
              ...fullEvent,
              session_id: sessionId
            }
          } as any);
      }
    } catch (error) {
      console.warn('Failed to track event:', error);
    }
  };

  const trackPageView = (page: string, metadata?: Record<string, any>) => {
    trackEvent({
      type: 'view',
      entityType: 'page',
      entityId: page,
      metadata: { page, ...metadata }
    });
  };

  const trackJobApplication = (jobId: string, metadata?: Record<string, any>) => {
    trackEvent({
      type: 'apply',
      entityType: 'job',
      entityId: jobId,
      metadata
    });
  };

  const trackJobView = (jobId: string, metadata?: Record<string, any>) => {
    trackEvent({
      type: 'view',
      entityType: 'job',
      entityId: jobId,
      metadata
    });
  };

  const trackSalonView = (salonId: string, metadata?: Record<string, any>) => {
    trackEvent({
      type: 'view',
      entityType: 'salon',
      entityId: salonId,
      metadata
    });
  };

  const trackArtistView = (artistId: string, metadata?: Record<string, any>) => {
    trackEvent({
      type: 'view',
      entityType: 'artist',
      entityId: artistId,
      metadata
    });
  };

  const trackSearch = (query: string, category?: string, results?: number) => {
    trackEvent({
      type: 'search',
      entityType: 'page',
      metadata: { query, category, results }
    });
  };

  return (
    <AnalyticsContext.Provider
      value={{
        trackEvent,
        trackPageView,
        trackJobApplication,
        trackJobView,
        trackSalonView,
        trackArtistView,
        trackSearch,
        sessionId
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
};
