import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { loadHubSpot, hubspotIdentify, hubspotTrackPageView } from '@/lib/analytics/hubspot';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';

/**
 * HubSpot Analytics Provider - App-wide Integration
 * 
 * - Loads HubSpot only in production with valid portal ID
 * - Respects consent and Do Not Track settings  
 * - Identifies users when they log in (once per session)
 * - Automatically handles UTM/referrer pass-through
 */
export const HubSpotProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isSignedIn, loading } = useAuth();
  const location = useLocation();
  const [hubspotLoaded, setHubspotLoaded] = useState(false);
  const [identifiedUser, setIdentifiedUser] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<any>(null);

  // Load HubSpot on component mount
  useEffect(() => {
    const initHubSpot = async () => {
      // Only attempt to load in production
      if (import.meta.env.DEV) return;

      const portalId = import.meta.env.VITE_HUBSPOT_PORTAL_ID || import.meta.env.HUBSPOT_PORTAL_ID;
      if (!portalId) {
        console.log('HubSpot: No portal ID configured, skipping initialization');
        return;
      }

      try {
        const loaded = await loadHubSpot(portalId);
        setHubspotLoaded(loaded);
        
        if (loaded) {
          console.log('HubSpot: Successfully initialized');
        }
      } catch (error) {
        console.error('HubSpot: Initialization failed', error);
      }
    };

    initHubSpot();
  }, []);

  // Listen for consent changes
  useEffect(() => {
    const handleConsentChange = async (event: CustomEvent) => {
      const { granted } = event.detail;
      
      if (granted && !hubspotLoaded) {
        // User just granted consent, try to load HubSpot
        const portalId = import.meta.env.VITE_HUBSPOT_PORTAL_ID || import.meta.env.HUBSPOT_PORTAL_ID;
        if (portalId) {
          const loaded = await loadHubSpot(portalId);
          setHubspotLoaded(loaded);
        }
      }
    };

    window.addEventListener('analytics-consent', handleConsentChange as EventListener);
    return () => window.removeEventListener('analytics-consent', handleConsentChange as EventListener);
  }, [hubspotLoaded]);

  // Fetch user profile data for enhanced identification
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!isSignedIn || !user?.id) return;

      try {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (profile) {
          setUserProfile(profile);
        }
      } catch (error) {
        console.warn('HubSpot: Could not fetch user profile for enhanced tracking', error);
      }
    };

    fetchUserProfile();
  }, [isSignedIn, user?.id]);

  // Track page views on route changes
  useEffect(() => {
    if (!hubspotLoaded) return;

    // Track page view with UTM parameters
    hubspotTrackPageView({
      path: location.pathname + location.search,
      referrer: document.referrer || undefined,
      page_title: document.title,
      url: window.location.href
    });

    console.log('HubSpot: Page view tracked', location.pathname);
  }, [location, hubspotLoaded]);

  // Identify user when they log in (enhanced with profile data)
  useEffect(() => {
    if (!hubspotLoaded || loading || !isSignedIn || !user?.email) return;

    // Prevent duplicate identification for same user
    const userKey = user.id || user.email;
    if (identifiedUser === userKey) return;

    // Extract enhanced user data
    const getUserData = () => {
      // Try user_metadata first, then profile data, then fallbacks
      const metadata = user.user_metadata || {};
      const profile = userProfile || {};
      
      const firstName = metadata.firstName || metadata.first_name || 
                       profile.full_name?.split(' ')[0] || '';
      const lastName = metadata.lastName || metadata.last_name || 
                      profile.full_name?.split(' ').slice(1).join(' ') || '';
      
      return {
        firstName,
        lastName,
        role: profile.role || metadata.role || 'customer',
        city: profile.location || '',
        plan: profile.boosted_until ? 'premium' : 'free',
        salon_name: profile.salon_name || '',
        specialty: profile.specialty || '',
        years_experience: profile.years_experience || null
      };
    };

    const userData = getUserData();

    // Get UTM data for attribution
    const getUTMData = () => {
      try {
        const utmString = sessionStorage.getItem('emvi_utm');
        if (utmString) {
          const utmData = JSON.parse(utmString);
          return {
            first_touch_utm_source: utmData.utmSource,
            first_touch_utm_medium: utmData.utmMedium,
            first_touch_utm_campaign: utmData.utmCampaign,
            landing_page: utmData.landingPage
          };
        }
      } catch (error) {
        console.warn('HubSpot: Could not parse UTM data for identification');
      }
      return {};
    };

    const utmData = getUTMData();

    // Identify user in HubSpot with enhanced data
    const success = hubspotIdentify({
      email: user.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      userId: user.id,
      // Enhanced properties
      role: userData.role,
      city: userData.city,
      plan: userData.plan,
      salon_name: userData.salon_name,
      specialty: userData.specialty,
      years_experience: userData.years_experience,
      ...utmData
    });

    if (success) {
      setIdentifiedUser(userKey);
      console.log('HubSpot: User identified with enhanced data', { 
        email: user.email, 
        role: userData.role,
        plan: userData.plan 
      });
    }
  }, [hubspotLoaded, loading, isSignedIn, user, userProfile, identifiedUser]);

  return <>{children}</>;
};

export default HubSpotProvider;