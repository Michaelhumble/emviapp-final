import React from 'react';
import { useRouteAnalytics } from '@/hooks/useRouteAnalytics';
import { analytics } from '@/lib/analytics';

// New lightweight analytics provider that just initializes tracking
export const AnalyticsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // This automatically handles route tracking and user identification
  useRouteAnalytics();
  
  return <>{children}</>;
};

// Hook for components that need analytics access
export const useAnalytics = () => {
  return {
    trackEvent: (event: any) => analytics.trackEvent(event),
    trackPageView: (page: string, metadata?: any) => analytics.trackPageView(page, undefined, metadata),
    trackJobApplication: (jobId: string, metadata?: any) => analytics.trackJobApplication({ jobId, jobType: metadata?.jobType || 'unknown', ...metadata }),
    trackJobView: (jobId: string, metadata?: any) => analytics.trackContentView({ contentId: jobId, contentType: 'job', ...metadata }),
    trackSalonView: (salonId: string, metadata?: any) => analytics.trackContentView({ contentId: salonId, contentType: 'salon', ...metadata }),
    trackArtistView: (artistId: string, metadata?: any) => analytics.trackContentView({ contentId: artistId, contentType: 'artist', ...metadata }),
    trackSearch: (query: string, category?: string, results?: number) => analytics.trackSearch(query, category, results),
  };
};