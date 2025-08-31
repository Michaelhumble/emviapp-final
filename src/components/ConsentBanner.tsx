import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { trackConsent } from '@/lib/analytics';

// Mobile-optimized cookie consent banner
// - Safe area support for iOS/Android
// - Accessibility compliant (WCAG AA)
// - GA4 + HubSpot tracking
// - Proper storage format and cookie setting

const STORAGE_KEY = 'EMVI_CONSENT_V1';

interface ConsentData {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  ts: number;
  region?: string;
}

type ConsentState = ConsentData | null;

const setCookie = (consent: ConsentData) => {
  const domain = window.location.hostname.includes('emvi.app') ? '.emvi.app' : '';
  const cookieValue = `emvi_consent=v1; Path=/; SameSite=Lax; Max-Age=15552000${domain ? `; Domain=${domain}` : ''}`;
  document.cookie = cookieValue;
};

const trackConsentToHubSpot = (action: string, analytics: boolean, marketing: boolean) => {
  // HubSpot tracking (if available)
  if (typeof window !== 'undefined' && window._hsq) {
    window._hsq.push(['trackEvent', {
      id: `consent_${action}`,
      value: {
        source: 'banner',
        path: location.pathname,
        analytics_consent: analytics,
        marketing_consent: marketing
      }
    }]);
  }
};

const ConsentBanner: React.FC = () => {
  const [consent, setConsent] = useState<ConsentState>(null);
  const [visible, setVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsed = JSON.parse(savedData) as ConsentData;
        setConsent(parsed);
        setVisible(false);
      } else {
        setVisible(true);
        // Add a small delay for the slide-up animation
        setTimeout(() => setIsAnimating(true), 100);
      }
    } catch (error) {
      console.error('[CONSENT] Error loading saved consent:', error);
      setVisible(true);
      setTimeout(() => setIsAnimating(true), 100);
    }
  }, []);

  const handleConsent = (analytics: boolean, marketing: boolean = false) => {
    const consentData: ConsentData = {
      necessary: true,
      analytics,
      marketing,
      ts: Date.now(),
      region: Intl.DateTimeFormat().resolvedOptions().timeZone
    };

    try {
      // Save to localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(consentData));
      
      // Set cookie
      setCookie(consentData);
      
      // Track GA4 event
      const action = analytics ? 'accept_all' : 'reject';
      trackConsent(action);
      
      // Track HubSpot event
      trackConsentToHubSpot(action, analytics, marketing);
      
      // Dispatch legacy event for backward compatibility
      window.dispatchEvent(new CustomEvent('analytics-consent', { 
        detail: { granted: analytics } 
      }));
      
      // Update state and hide banner
      setConsent(consentData);
      setIsAnimating(false);
      setTimeout(() => setVisible(false), 300);
      
    } catch (error) {
      console.error('[CONSENT] Error saving consent:', error);
    }
  };

  if (!visible) return null;

  return (
    <div 
      className={`emvi-consent pointer-events-none ${isAnimating ? 'visible' : ''}`}
      role="dialog" 
      aria-labelledby="consent-title"
      aria-describedby="consent-description"
      aria-modal="false"
    >
      <div className="mx-auto max-w-4xl bg-background/95 border border-border/20 pointer-events-auto">
        <div className="p-4 md:p-5 flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
          <div className="flex-1">
            <p 
              id="consent-title" 
              className="text-sm md:text-base font-medium text-foreground mb-1"
            >
              Cookie Preferences
            </p>
            <p 
              id="consent-description" 
              className="text-sm text-foreground/75"
            >
              We use cookies to improve your experience and analyze traffic. We only load analytics after you consent.
              {' '}
              <a 
                href="/privacy" 
                className="underline underline-offset-2 hover:text-foreground transition-colors"
                tabIndex={0}
              >
                Privacy Policy
              </a>
            </p>
          </div>
          <div className="flex gap-2 md:ml-auto">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleConsent(false)}
              className="min-h-[44px] px-4"
              aria-label="Decline analytics cookies"
            >
              Decline
            </Button>
            <Button 
              size="sm" 
              onClick={() => handleConsent(true)}
              className="min-h-[44px] px-4"
              aria-label="Accept all cookies"
            >
              Accept All
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsentBanner;