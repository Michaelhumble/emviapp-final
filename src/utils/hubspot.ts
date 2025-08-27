/**
 * HubSpot Forms API Integration
 * Submits form data to HubSpot with UTM tracking and proper field mapping
 */

interface HubSpotFormData {
  firstname: string;
  lastname: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  reason?: string;
  // UTM fields
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  initial_referrer?: string;
  landing_page?: string;
}

interface HubSpotFieldMapping {
  name: string;
  value: string;
}

interface HubSpotSubmissionContext {
  hutk?: string; // HubSpot user token (tracking cookie)
  pageUri: string;
  pageName: string;
  ipAddress?: string;
}

export class HubSpotIntegration {
  private portalId: string;
  private formId: string;
  private apiUrl: string;

  constructor(portalId: string, formId: string) {
    this.portalId = portalId;
    this.formId = formId;
    this.apiUrl = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`;
  }

  /**
   * Get UTM and attribution data from localStorage
   * Uses the same storage key as our UTM script
   */
  private getAttributionData(): Record<string, string> {
    try {
      const stored = localStorage.getItem('emvi_attribution');
      if (stored) {
        const data = JSON.parse(stored);
        // Check if TTL has expired
        if (Date.now() < data.expires) {
          return {
            utm_source: data.utm_source || '',
            utm_medium: data.utm_medium || '',
            utm_campaign: data.utm_campaign || '',
            utm_term: data.utm_term || '',
            utm_content: data.utm_content || '',
            initial_referrer: data.initial_referrer || '',
            landing_page: data.landing_page || ''
          };
        }
      }
    } catch (error) {
      console.warn('Failed to parse attribution data:', error);
    }
    
    return {
      utm_source: '',
      utm_medium: '',
      utm_campaign: '',
      utm_term: '',
      utm_content: '',
      initial_referrer: document.referrer || 'direct',
      landing_page: window.location.pathname
    };
  }

  /**
   * Get HubSpot tracking cookie (hutk) for better visitor tracking
   */
  private getHubSpotTrackingToken(): string | undefined {
    try {
      const cookies = document.cookie.split(';');
      for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'hubspotutk') {
          return value;
        }
      }
    } catch (error) {
      console.warn('Failed to get HubSpot tracking token:', error);
    }
    return undefined;
  }

  /**
   * Map form data to HubSpot field format
   */
  private mapFormFields(data: HubSpotFormData): HubSpotFieldMapping[] {
    const attribution = this.getAttributionData();
    
    const fields: HubSpotFieldMapping[] = [
      { name: 'firstname', value: data.firstname },
      { name: 'lastname', value: data.lastname },
      { name: 'email', value: data.email },
      { name: 'message', value: data.message }
    ];

    // Add optional fields if they have values
    if (data.phone) fields.push({ name: 'phone', value: data.phone });
    if (data.company) fields.push({ name: 'company', value: data.company });
    if (data.reason) fields.push({ name: 'contact_reason', value: data.reason });

    // Add UTM and attribution fields
    Object.entries(attribution).forEach(([key, value]) => {
      if (value) {
        fields.push({ name: key, value: value });
      }
    });

    return fields;
  }

  /**
   * Submit form data to HubSpot Forms API
   */
  async submitForm(formData: HubSpotFormData): Promise<{
    success: boolean;
    data?: any;
    error?: string;
  }> {
    try {
      const fields = this.mapFormFields(formData);
      const hutk = this.getHubSpotTrackingToken();
      
      const context: HubSpotSubmissionContext = {
        pageUri: window.location.href,
        pageName: document.title,
      };

      if (hutk) {
        context.hutk = hutk;
      }

      const payload = {
        fields,
        context,
        legalConsentOptions: {
          consent: {
            consentToProcess: true,
            text: "I agree to allow EmviApp to store and process my personal data.",
            communications: [
              {
                value: true,
                subscriptionTypeId: 999,
                text: "I agree to receive marketing communications from EmviApp."
              }
            ]
          }
        }
      };

      console.log('🔄 Submitting to HubSpot:', {
        portalId: this.portalId,
        formId: this.formId,
        fieldsCount: fields.length,
        context
      });

      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log('✅ HubSpot form submitted successfully:', responseData);
        return {
          success: true,
          data: responseData
        };
      } else {
        console.error('❌ HubSpot form submission failed:', {
          status: response.status,
          statusText: response.statusText,
          data: responseData
        });
        return {
          success: false,
          error: responseData.message || `HTTP ${response.status}: ${response.statusText}`
        };
      }

    } catch (error) {
      console.error('❌ HubSpot form submission error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }
}

/**
 * Factory function to create HubSpot integration instance
 * Shows console warning if environment variables are missing
 */
export function createHubSpotIntegration(): HubSpotIntegration | null {
  // These would normally come from environment variables
  // For now, we'll check for them being defined elsewhere
  const portalId = (window as any).__HUBSPOT_PORTAL_ID__;
  const formId = (window as any).__HUBSPOT_FORM_ID__;

  if (!portalId || !formId) {
    console.warn('⚠️ HubSpot integration disabled: Missing HUBSPOT_PORTAL_ID or HUBSPOT_FORM_ID environment variables');
    return null;
  }

  return new HubSpotIntegration(portalId, formId);
}

/**
 * Initialize HubSpot configuration from environment
 * This should be called when the app loads to set up the integration
 */
export function initializeHubSpot() {
  try {
    // In a real app, these would come from process.env or similar
    // For now, we'll set them on window object as a temporary solution
    // The proper way would be to have these as build-time environment variables
    
    // Check if already initialized
    if ((window as any).__HUBSPOT_INITIALIZED__) {
      return;
    }

    // Note: In production, these should come from your build process
    // (window as any).__HUBSPOT_PORTAL_ID__ = 'YOUR_PORTAL_ID';
    // (window as any).__HUBSPOT_FORM_ID__ = 'YOUR_FORM_ID';
    
    (window as any).__HUBSPOT_INITIALIZED__ = true;
  } catch (error) {
    console.error('Failed to initialize HubSpot:', error);
  }
}