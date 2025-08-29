/**
 * HubSpot Free Plan Analytics Integration
 * 
 * Features:
 * - Async script loading with error handling
 * - Consent-based loading (respects Do Not Track and cookie consent)  
 * - User identification on auth events
 * - UTM/referrer pass-through
 * - Production-only with env-gated activation
 */

interface HubSpotIdentifyData {
  email: string;
  firstName?: string;
  lastName?: string;
  userId?: string;
  role?: string;
  city?: string;
  plan?: string;
  salon_name?: string;
  specialty?: string;
  years_experience?: number | null;
  first_touch_utm_source?: string;
  first_touch_utm_medium?: string;
  first_touch_utm_campaign?: string;
  landing_page?: string;
  [key: string]: any;
}

interface HubSpotPageViewData {
  path?: string;
  referrer?: string;
  [key: string]: any;
}

declare global {
  interface Window {
    _hsq?: any[];
    hbspt?: any;
  }
}

export class HubSpotAnalytics {
  private static instance: HubSpotAnalytics;
  private isLoaded = false;
  private isInitialized = false;
  private portalId: string | null = null;
  private identifiedUsers = new Set<string>(); // Prevent duplicate identifies per session

  private constructor() {
    this.portalId = this.getPortalId();
  }

  public static getInstance(): HubSpotAnalytics {
    if (!HubSpotAnalytics.instance) {
      HubSpotAnalytics.instance = new HubSpotAnalytics();
    }
    return HubSpotAnalytics.instance;
  }

  private getPortalId(): string | null {
    if (typeof window === 'undefined') return null;
    
    // Try multiple environment variable patterns
    return (
      (import.meta.env.VITE_HUBSPOT_PORTAL_ID as string) ||
      (import.meta.env.HUBSPOT_PORTAL_ID as string) ||
      null
    );
  }

  private shouldLoad(): boolean {
    // Only load in production
    if (import.meta.env.DEV) return false;
    
    // Must have portal ID
    if (!this.portalId) return false;
    
    // Respect Do Not Track
    if (navigator.doNotTrack === '1') return false;
    
    // Check cookie consent (use existing consent system)
    const consent = localStorage.getItem('emvi_cookie_consent');
    if (consent !== 'accepted') return false;
    
    return true;
  }

  public async loadHubSpot(portalId?: string): Promise<boolean> {
    if (this.isLoaded) return true;
    
    // Use provided portalId or fallback to env
    const targetPortalId = portalId || this.portalId;
    if (!targetPortalId) {
      console.warn('HubSpot: No portal ID provided');
      return false;
    }
    
    if (!this.shouldLoad()) {
      console.log('HubSpot: Loading skipped (consent/DNT/dev mode)');
      return false;
    }

    try {
      // Initialize _hsq array if not exists
      if (!window._hsq) {
        window._hsq = [];
      }

      // Add preconnect for performance
      this.addPreconnect();

      // Load HubSpot tracking script async
      await this.loadScript(targetPortalId);
      
      this.isLoaded = true;
      this.isInitialized = true;
      
      console.log('HubSpot: Successfully loaded for portal', targetPortalId);
      
      // Track initial page view with UTM/referrer data
      this.trackPageViewWithUTM();
      
      return true;
    } catch (error) {
      console.error('HubSpot: Failed to load', error);
      return false;
    }
  }

  private addPreconnect(): void {
    if (document.querySelector('link[href*="js.hs-analytics.net"]')) return;
    
    const preconnect = document.createElement('link');
    preconnect.rel = 'preconnect';
    preconnect.href = 'https://js.hs-analytics.net';
    document.head.appendChild(preconnect);
  }

  private loadScript(portalId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      // Check if script already exists
      if (document.querySelector(`script[src*="js.hs-analytics.net/analytics/${portalId}"]`)) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.defer = true;
      script.src = `//js.hs-analytics.net/analytics/${Date.now()}/${portalId}.js`;
      
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load HubSpot script'));
      
      // Add noscript fallback image beacon
      this.addNoscriptFallback(portalId);
      
      document.head.appendChild(script);
      
      // Timeout after 10 seconds
      setTimeout(() => reject(new Error('HubSpot script load timeout')), 10000);
    });
  }

  private addNoscriptFallback(portalId: string): void {
    if (document.querySelector('noscript img[src*="track.hubspot.com"]')) return;
    
    const noscript = document.createElement('noscript');
    const img = document.createElement('img');
    img.height = 1;
    img.width = 1;
    img.style.display = 'none';
    img.src = `https://js.hs-analytics.net/analytics/${Date.now()}/${portalId}.js`;
    img.alt = '';
    noscript.appendChild(img);
    document.head.appendChild(noscript);
  }

  private trackPageViewWithUTM(): void {
    try {
      // Get UTM/referrer data from existing storage (matches useRouteAnalytics pattern)
      const utmData = this.getStoredUTMData();
      
      this.trackPageView({
        path: window.location.pathname + window.location.search,
        referrer: document.referrer || undefined,
        ...utmData
      });
    } catch (error) {
      console.warn('HubSpot: Failed to track page view with UTM data', error);
    }
  }

  private getStoredUTMData(): Record<string, any> {
    try {
      // Check for UTM data in sessionStorage (matches existing pattern)
      const utmString = sessionStorage.getItem('emvi_utm');
      if (utmString) {
        const utmData = JSON.parse(utmString);
        return {
          utm_source: utmData.utmSource,
          utm_medium: utmData.utmMedium,
          utm_campaign: utmData.utmCampaign,
          utm_content: utmData.utmContent,
          utm_term: utmData.utmTerm,
          landing_page: utmData.landingPage
        };
      }
    } catch (error) {
      console.warn('HubSpot: Failed to parse stored UTM data', error);
    }
    
    return {};
  }

  public hubspotIdentify(data: HubSpotIdentifyData): boolean {
    if (!this.isInitialized || !window._hsq) {
      console.warn('HubSpot: Cannot identify - not initialized');
      return false;
    }

    // Prevent duplicate identifies for same user in session
    const userKey = data.userId || data.email;
    if (this.identifiedUsers.has(userKey)) {
      console.log('HubSpot: User already identified in this session');
      return true;
    }

    try {
      const identifyPayload: Record<string, any> = {
        email: data.email
      };

      if (data.firstName) identifyPayload.firstname = data.firstName;
      if (data.lastName) identifyPayload.lastname = data.lastName;
      if (data.userId) identifyPayload.custom_user_id = data.userId;
      if (data.role) identifyPayload.user_role = data.role;
      if (data.city) identifyPayload.city = data.city;
      if (data.plan) identifyPayload.subscription_plan = data.plan;
      if (data.salon_name) identifyPayload.salon_name = data.salon_name;
      if (data.specialty) identifyPayload.specialty = data.specialty;
      if (data.years_experience) identifyPayload.years_experience = data.years_experience;
      if (data.first_touch_utm_source) identifyPayload.first_touch_utm_source = data.first_touch_utm_source;
      if (data.first_touch_utm_medium) identifyPayload.first_touch_utm_medium = data.first_touch_utm_medium;
      if (data.first_touch_utm_campaign) identifyPayload.first_touch_utm_campaign = data.first_touch_utm_campaign;
      if (data.landing_page) identifyPayload.first_landing_page = data.landing_page;

      window._hsq.push(['identify', identifyPayload]);
      
      this.identifiedUsers.add(userKey);
      console.log('HubSpot: User identified', { email: data.email, userId: data.userId });
      
      return true;
    } catch (error) {
      console.error('HubSpot: Failed to identify user', error);
      return false;
    }
  }

  public trackPageView(data: HubSpotPageViewData = {}): boolean {
    if (!this.isInitialized || !window._hsq) {
      return false;
    }

    try {
      window._hsq.push(['trackPageView', {
        path: data.path || window.location.pathname + window.location.search,
        referrer: data.referrer || document.referrer || undefined,
        ...data
      }]);
      
      return true;
    } catch (error) {
      console.error('HubSpot: Failed to track page view', error);
      return false;
    }
  }

  public trackEvent(eventName: string, properties: Record<string, any> = {}): boolean {
    if (!this.isInitialized || !window._hsq) {
      return false;
    }

    try {
      window._hsq.push(['trackEvent', {
        id: eventName,
        ...properties
      }]);
      
      return true;
    } catch (error) {
      console.error('HubSpot: Failed to track event', error);
      return false;
    }
  }

  // Utility method to check if HubSpot is ready
  public isReady(): boolean {
    return this.isInitialized && !!window._hsq;
  }

  // Get current portal ID
  public getPortalIdInUse(): string | null {
    return this.portalId;
  }
}

// Export singleton instance
export const hubspotAnalytics = HubSpotAnalytics.getInstance();

// Convenience functions for easy integration
export const loadHubSpot = (portalId?: string) => hubspotAnalytics.loadHubSpot(portalId);
export const hubspotIdentify = (data: HubSpotIdentifyData) => hubspotAnalytics.hubspotIdentify(data);
export const hubspotTrackPageView = (data?: HubSpotPageViewData) => hubspotAnalytics.trackPageView(data);
export const hubspotTrackEvent = (eventName: string, properties?: Record<string, any>) => 
  hubspotAnalytics.trackEvent(eventName, properties);