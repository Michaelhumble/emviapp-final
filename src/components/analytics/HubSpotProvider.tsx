import React, { useEffect, useState } from 'react';
import { loadHubSpot, hubspotIdentify } from '@/lib/analytics/hubspot';
import { useAuth } from '@/context/auth';

/**
 * HubSpot Analytics Provider - App-wide Integration
 * 
 * - Loads HubSpot only in production with valid portal ID
 * - Respects consent and Do Not Track settings  
 * - Identifies users when they log in (once per session)
 * - Automatically handles UTM/referrer pass-through
 */
export const HubSpotProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [hubspotLoaded, setHubspotLoaded] = useState(false);
  const [identifiedUser, setIdentifiedUser] = useState<string | null>(null);

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

  // Identify user when they log in
  useEffect(() => {
    if (!hubspotLoaded || !user?.email) return;

    // Prevent duplicate identification for same user
    const userKey = user.id || user.email;
    if (identifiedUser === userKey) return;

    // Extract name parts from user data
    const getUserNames = () => {
      // Try user_metadata first, then top-level properties
      const metadata = user.user_metadata || {};
      const firstName = metadata.firstName || metadata.first_name || '';
      const lastName = metadata.lastName || metadata.last_name || '';
      
      return { firstName, lastName };
    };

    const { firstName, lastName } = getUserNames();

    // Identify user in HubSpot
    const success = hubspotIdentify({
      email: user.email,
      firstName,
      lastName,
      userId: user.id
    });

    if (success) {
      setIdentifiedUser(userKey);
      console.log('HubSpot: User identified on login');
    }
  }, [hubspotLoaded, user, identifiedUser]);

  return <>{children}</>;
};

export default HubSpotProvider;