/**
 * HubSpot Free Plan CRM Integration
 * 
 * Features:
 * - Full CRM integration (Contacts, Deals, Forms)
 * - UTM attribution capture and persistence
 * - Contact upsert on signup/login
 * - Deal creation and updates
 * - Consent-based loading (respects Do Not Track)
 * - Production-only with graceful degradation
 */

// Attribution data interface
interface AttributionData {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  affiliate_id?: string;
  landing_url?: string;
  first_seen_at?: string;
  press_slug?: string;
  city_slug?: string;
  category_slug?: string;
}

// Contact data interface
interface ContactData {
  email: string;
  firstName?: string;
  lastName?: string;
  userId?: string;
  role?: string;
  city?: string;
  plan?: string;
  salon_name?: string;
  specialty?: string;
  years_experience?: number;
  signup_stage?: 'visitor' | 'lead' | 'mql' | 'sql' | 'customer';
  mql_score?: number;
}

// Deal data interface
interface DealData {
  dealName: string;
  amount?: number;
  dealStage?: string;
  contactId?: string;
}

// Form submission interface
interface FormSubmissionData {
  formId: string;
  fields: Record<string, any>;
  context?: {
    pageUrl?: string;
    pageName?: string;
  };
}

// Sync attempt logging interface
interface SyncAttempt {
  id: string;
  timestamp: string;
  objectType: 'contact' | 'deal' | 'form';
  objectId?: string;
  status: 'success' | 'error';
  errorMessage?: string;
}

declare global {
  interface Window {
    _hsq?: any[];
    hbspt?: any;
  }
}

export class HubSpotCRM {
  private static instance: HubSpotCRM;
  private isLoaded = false;
  private isInitialized = false;
  private portalId: string | null = null;
  private privateToken: string | null = null;
  private identifiedUsers = new Set<string>();
  private syncAttempts: SyncAttempt[] = [];
  
  // Attribution storage key
  private readonly ATTRIBUTION_KEY = 'emvi.attribution.v1';
  
  private constructor() {
    this.portalId = this.getPortalId();
    this.privateToken = this.getPrivateToken();
  }

  public static getInstance(): HubSpotCRM {
    if (!HubSpotCRM.instance) {
      HubSpotCRM.instance = new HubSpotCRM();
    }
    return HubSpotCRM.instance;
  }

  private getPortalId(): string | null {
    if (typeof window === 'undefined') return null;
    return (import.meta.env.VITE_HUBSPOT_PORTAL_ID as string) || null;
  }

  private getPrivateToken(): string | null {
    // Private token is only available server-side for security
    return null;
  }

  private shouldLoad(): boolean {
    // Only load in production
    if (import.meta.env.DEV) return false;
    
    // Must have portal ID
    if (!this.portalId) return false;
    
    // Respect Do Not Track
    if (typeof navigator !== 'undefined' && navigator.doNotTrack === '1') return false;
    
    // Check cookie consent
    if (typeof localStorage !== 'undefined') {
      const consent = localStorage.getItem('emvi_cookie_consent');
      if (consent !== 'accepted') return false;
    }
    
    return true;
  }

  /**
   * Capture attribution data from URL params and referrer
   * Store in localStorage for persistent attribution
   */
  public captureAttribution(): AttributionData {
    if (typeof window === 'undefined') return {};

    try {
      // Check if attribution already captured
      const existing = this.getAttribution();
      if (existing.first_seen_at) {
        // Update page-specific slugs only  
        const urlParams = new URLSearchParams(window.location.search);
        const pathname = window.location.pathname;
        
        const updates: Partial<AttributionData> = {};
        
        // Capture press slug
        if (pathname.startsWith('/press/')) {
          updates.press_slug = pathname.split('/press/')[1]?.split('/')[0];
        }
        
        // Capture city and category slugs
        if (pathname.includes('/jobs/') || pathname.includes('/salons/')) {
          const pathParts = pathname.split('/');
          if (pathParts.length >= 3) {
            updates.city_slug = pathParts[2];
            if (pathParts.length >= 4) {
              updates.category_slug = pathParts[3];
            }
          }
        }
        
        if (Object.keys(updates).length > 0) {
          const updated = { ...existing, ...updates };
          localStorage.setItem(this.ATTRIBUTION_KEY, JSON.stringify(updated));
          return updated;
        }
        
        return existing;
      }

      // First-time attribution capture
      const urlParams = new URLSearchParams(window.location.search);
      const attribution: AttributionData = {
        utm_source: urlParams.get('utm_source') || undefined,
        utm_medium: urlParams.get('utm_medium') || undefined,
        utm_campaign: urlParams.get('utm_campaign') || undefined,
        utm_content: urlParams.get('utm_content') || undefined,
        utm_term: urlParams.get('utm_term') || undefined,
        affiliate_id: urlParams.get('affiliate_id') || urlParams.get('ref') || undefined,
        landing_url: window.location.href,
        first_seen_at: new Date().toISOString()
      };

      // Capture page-specific slugs on first visit
      const pathname = window.location.pathname;
      if (pathname.startsWith('/press/')) {
        attribution.press_slug = pathname.split('/press/')[1]?.split('/')[0];
      }
      
      if (pathname.includes('/jobs/') || pathname.includes('/salons/')) {
        const pathParts = pathname.split('/');
        if (pathParts.length >= 3) {
          attribution.city_slug = pathParts[2];
          if (pathParts.length >= 4) {
            attribution.category_slug = pathParts[3];
          }
        }
      }

      // Store attribution data
      localStorage.setItem(this.ATTRIBUTION_KEY, JSON.stringify(attribution));
      
      console.log('HubSpot: Attribution captured', attribution);
      return attribution;
    } catch (error) {
      console.warn('HubSpot: Failed to capture attribution', error);
      return {};
    }
  }

  /**
   * Get stored attribution data
   */
  public getAttribution(): AttributionData {
    if (typeof localStorage === 'undefined') return {};

    try {
      const stored = localStorage.getItem(this.ATTRIBUTION_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.warn('HubSpot: Failed to get attribution', error);
      return {};
    }
  }

  /**
   * Load HubSpot tracking script (for forms and tracking)
   */
  public async loadHubSpot(portalId?: string): Promise<boolean> {
    if (this.isLoaded) return true;
    
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
      if (!window._hsq) window._hsq = [];

      await this.loadScript(targetPortalId);
      
      this.isLoaded = true;
      this.isInitialized = true;
      
      console.log('HubSpot: Successfully loaded for portal', targetPortalId);
      return true;
    } catch (error) {
      console.error('HubSpot: Failed to load', error);
      this.logSyncAttempt('contact', 'error', undefined, error.message);
      return false;
    }
  }

  private loadScript(portalId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src*="js.hs-analytics.net/analytics/${portalId}"]`)) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.async = true;
      script.src = `//js.hs-analytics.net/analytics/${Date.now()}/${portalId}.js`;
      
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load HubSpot script'));
      
      document.head.appendChild(script);
      setTimeout(() => reject(new Error('HubSpot script load timeout')), 10000);
    });
  }

  /**
   * Upsert contact in HubSpot CRM
   * Create if not exists, update if exists
   */
  public async upsertContact(email: string, contactData: Partial<ContactData> = {}): Promise<{ success: boolean; contactId?: string; error?: string }> {
    if (!this.shouldLoad()) {
      return { success: false, error: 'HubSpot not enabled' };
    }

    try {
      // Get attribution data to include with contact
      const attribution = this.getAttribution();
      
      const payload = {
        email,
        contactData: {
          ...contactData,
          ...attribution
        }
      };

      const response = await fetch('/functions/v1/hubspot-crm-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      
      if (result.success) {
        this.logSyncAttempt('contact', 'success', result.contactId);
        console.log('HubSpot: Contact upserted successfully', result.contactId);
        return { success: true, contactId: result.contactId };
      } else {
        this.logSyncAttempt('contact', 'error', undefined, result.error);
        return { success: false, error: result.error };
      }
    } catch (error) {
      this.logSyncAttempt('contact', 'error', undefined, error.message);
      console.error('HubSpot: Contact upsert failed', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Create or update deal in HubSpot CRM
   */
  public async createOrUpdateDeal(contactId: string, dealData: DealData): Promise<{ success: boolean; dealId?: string; error?: string }> {
    if (!this.shouldLoad()) {
      return { success: false, error: 'HubSpot not enabled' };
    }

    try {
      const attribution = this.getAttribution();
      
      const payload = {
        contactId,
        dealData: {
          ...dealData,
          ...attribution
        }
      };

      const response = await fetch('/functions/v1/hubspot-crm-deal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      
      if (result.success) {
        this.logSyncAttempt('deal', 'success', result.dealId);
        console.log('HubSpot: Deal created/updated successfully', result.dealId);
        return { success: true, dealId: result.dealId };
      } else {
        this.logSyncAttempt('deal', 'error', undefined, result.error);
        return { success: false, error: result.error };
      }
    } catch (error) {
      this.logSyncAttempt('deal', 'error', undefined, error.message);
      console.error('HubSpot: Deal operation failed', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Submit form using HubSpot Forms API
   */
  public async submitForm(formId: string, fields: Record<string, any>, context?: { pageUrl?: string; pageName?: string }): Promise<{ success: boolean; error?: string }> {
    if (!this.shouldLoad()) {
      return { success: false, error: 'HubSpot not enabled' };
    }

    try {
      const attribution = this.getAttribution();
      
      const payload = {
        formId,
        fields: {
          ...fields,
          ...attribution
        },
        context: {
          pageUrl: context?.pageUrl || window.location.href,
          pageName: context?.pageName || document.title,
          ...context
        }
      };

      const response = await fetch('/functions/v1/hubspot-forms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      
      if (result.success) {
        this.logSyncAttempt('form', 'success', formId);
        console.log('HubSpot: Form submitted successfully', formId);
        return { success: true };
      } else {
        this.logSyncAttempt('form', 'error', formId, result.error);
        return { success: false, error: result.error };
      }
    } catch (error) {
      this.logSyncAttempt('form', 'error', formId, error.message);
      console.error('HubSpot: Form submission failed', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Track page view with attribution data
   */
  public trackPageView(path?: string): void {
    if (!this.isInitialized || !window._hsq) return;

    try {
      const attribution = this.getAttribution();
      
      window._hsq.push(['trackPageView', {
        path: path || window.location.pathname + window.location.search,
        referrer: document.referrer || undefined,
        ...attribution
      }]);
    } catch (error) {
      console.warn('HubSpot: Failed to track page view', error);
    }
  }

  /**
   * Identify user with attribution data
   */
  public identify(email: string, userData: Partial<ContactData> = {}): void {
    if (!this.isInitialized || !window._hsq) return;

    const userKey = userData.userId || email;
    if (this.identifiedUsers.has(userKey)) return;

    try {
      const attribution = this.getAttribution();
      
      const identifyPayload = {
        email,
        ...userData,
        ...attribution
      };

      window._hsq.push(['identify', identifyPayload]);
      this.identifiedUsers.add(userKey);
      
      console.log('HubSpot: User identified with attribution', { email, userId: userData.userId });
    } catch (error) {
      console.error('HubSpot: Failed to identify user', error);
    }
  }

  /**
   * Log sync attempts for admin monitoring
   */
  private logSyncAttempt(objectType: 'contact' | 'deal' | 'form', status: 'success' | 'error', objectId?: string, errorMessage?: string): void {
    const attempt: SyncAttempt = {
      id: Math.random().toString(36).substring(7),
      timestamp: new Date().toISOString(),
      objectType,
      objectId,
      status,
      errorMessage
    };

    this.syncAttempts.unshift(attempt);
    
    // Keep only last 20 attempts
    if (this.syncAttempts.length > 20) {
      this.syncAttempts = this.syncAttempts.slice(0, 20);
    }

    // Store in localStorage for admin page
    try {
      localStorage.setItem('hubspot_sync_attempts', JSON.stringify(this.syncAttempts));
    } catch (error) {
      console.warn('Failed to store sync attempts', error);
    }
  }

  /**
   * Get recent sync attempts for admin monitoring
   */
  public getSyncAttempts(): SyncAttempt[] {
    try {
      const stored = localStorage.getItem('hubspot_sync_attempts');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.warn('Failed to get sync attempts', error);
      return [];
    }
  }

  /**
   * Check if HubSpot is ready
   */
  public isReady(): boolean {
    return this.isInitialized && !!window._hsq;
  }

  /**
   * Get portal ID in use
   */
  public getPortalIdInUse(): string | null {
    return this.portalId;
  }
}

// Export singleton instance  
export const hubspotCRM = HubSpotCRM.getInstance();

// Legacy analytics exports for backward compatibility
export const hubspotAnalytics = hubspotCRM;

// Convenience functions for easy integration
export const loadHubSpot = (portalId?: string) => hubspotCRM.loadHubSpot(portalId);
export const captureAttribution = () => hubspotCRM.captureAttribution();
export const getAttribution = () => hubspotCRM.getAttribution();
export const upsertContact = (email: string, contactData?: Partial<ContactData>) => hubspotCRM.upsertContact(email, contactData);
export const createOrUpdateDeal = (contactId: string, dealData: DealData) => hubspotCRM.createOrUpdateDeal(contactId, dealData);

// Legacy analytics functions for backward compatibility
export const hubspotIdentify = (email: string, userData: Partial<ContactData> = {}) => hubspotCRM.identify(email, userData);
export const hubspotTrackPageView = (path?: string) => hubspotCRM.trackPageView(path);
export const hubspotTrackEvent = (eventName: string, properties: Record<string, any> = {}) => {
  // For now, just log - can be extended to use HubSpot events API if needed
  console.log('HubSpot Event:', eventName, properties);
  return true;
};

// HubSpot Form IDs (configure these in your HubSpot portal)
export const HUBSPOT_FORM_IDS = {
  contact_general: 'f5a8b2c4-d6e8-4a9b-8c7d-1234567890ab',
  press_inquiry: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 
  partner_affiliate: '9876543210-abcd-ef12-3456-789012345678'
} as const;

export type HubSpotFormType = keyof typeof HUBSPOT_FORM_IDS;

// Form submission helper
export const submitHubSpotForm = async (
  formType: HubSpotFormType,
  data: Record<string, any>
): Promise<{ success: boolean; error?: string }> => {
  try {
    const response = await fetch('/functions/v1/hubspot-forms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        formType,
        ...data
      })
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Form submission error:', error);
    return { success: false, error: 'Network error' };
  }
};