import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

// Simple, elegant cookie consent banner
// - Stores consent in localStorage (key: emvi_cookie_consent)
// - Dispatches window event 'analytics-consent' with detail { granted: boolean }
// - Keeps design minimal and on-brand

const STORAGE_KEY = 'emvi_cookie_consent';

type ConsentState = 'accepted' | 'rejected' | null;

const ConsentBanner: React.FC = () => {
  const [consent, setConsent] = useState<ConsentState>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = (localStorage.getItem(STORAGE_KEY) as ConsentState) || null;
    setConsent(saved);
    setVisible(!saved);
  }, []);

  const handle = (granted: boolean) => {
    const value: ConsentState = granted ? 'accepted' : 'rejected';
    localStorage.setItem(STORAGE_KEY, value);
    setConsent(value);
    setVisible(false);
    window.dispatchEvent(new CustomEvent('analytics-consent', { detail: { granted } }));
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4">
      <div className="mx-auto max-w-4xl rounded-2xl border bg-background/95 backdrop-blur shadow-lg">
        <div className="p-4 md:p-5 flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
          <p className="text-sm md:text-base text-foreground/85">
            We use cookies to improve your experience and analyze traffic. We only load analytics after you consent.
            Read our <a href="/privacy" className="underline underline-offset-2 hover-scale">Privacy Policy</a>.
          </p>
          <div className="flex gap-2 md:ml-auto">
            <Button variant="outline" size="sm" onClick={() => handle(false)}>Decline</Button>
            <Button size="sm" onClick={() => handle(true)}>Accept</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsentBanner;
