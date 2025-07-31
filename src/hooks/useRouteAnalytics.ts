import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { analytics } from '@/lib/analytics';
import { useAuth } from '@/context/auth';

// Enhanced route tracking with user context and UTM parameters
export const useRouteAnalytics = () => {
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    // Extract UTM parameters
    const urlParams = new URLSearchParams(location.search);
    const utmSource = urlParams.get('utm_source');
    const utmMedium = urlParams.get('utm_medium');
    const utmCampaign = urlParams.get('utm_campaign');
    const utmContent = urlParams.get('utm_content');
    const utmTerm = urlParams.get('utm_term');

    // Determine page type from path
    const getPageType = (pathname: string): string => {
      if (pathname.startsWith('/dashboard')) return 'dashboard';
      if (pathname.startsWith('/blog')) return 'blog';
      if (pathname.startsWith('/jobs')) return 'jobs';
      if (pathname.startsWith('/salons')) return 'salons';
      if (pathname.startsWith('/auth') || pathname.includes('login') || pathname.includes('signup')) return 'auth';
      if (pathname === '/') return 'homepage';
      return 'other';
    };

    // Get user role for analytics
    const getUserRole = (): string | undefined => {
      if (!user) return 'anonymous';
      // Add logic to determine user role from user object
      return user.user_metadata?.role || 'customer';
    };

    // Track page view with enhanced metadata
    analytics.trackPageView(location.pathname, document.title, {
      pageType: getPageType(location.pathname),
      userRole: getUserRole(),
      utmSource,
      utmMedium,
      utmCampaign,
      utmContent,
      utmTerm,
      referrer: document.referrer,
      timestamp: Date.now()
    });

    // Store UTM parameters in sessionStorage for conversion attribution
    if (utmSource || utmMedium || utmCampaign) {
      const utmData = {
        utmSource,
        utmMedium,
        utmCampaign,
        utmContent,
        utmTerm,
        landingPage: location.pathname,
        timestamp: Date.now()
      };
      sessionStorage.setItem('emvi_utm', JSON.stringify(utmData));
    }

  }, [location.pathname, location.search, user]);

  return analytics;
};