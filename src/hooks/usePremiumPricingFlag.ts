
import { useState, useEffect } from 'react';

interface PremiumPricingConfig {
  enabled: boolean;
  testMode: boolean;
  diamondSpotsLeft: number;
  firstPostFree: boolean;
}

export const usePremiumPricingFlag = () => {
  const [config, setConfig] = useState<PremiumPricingConfig>({
    enabled: false, // Default to false to preserve existing behavior
    testMode: true,
    diamondSpotsLeft: 2,
    firstPostFree: true
  });

  useEffect(() => {
    // Check for URL parameter to enable premium pricing for testing
    const urlParams = new URLSearchParams(window.location.search);
    const enablePremium = urlParams.get('premium_pricing') === 'true';
    
    // Check localStorage for persistent testing flag
    const storedFlag = localStorage.getItem('emvi_premium_pricing_test');
    
    if (enablePremium || storedFlag === 'true') {
      setConfig(prev => ({
        ...prev,
        enabled: true
      }));
      
      // Store in localStorage for persistence during testing
      localStorage.setItem('emvi_premium_pricing_test', 'true');
    }
  }, []);

  const enablePremiumPricing = () => {
    setConfig(prev => ({ ...prev, enabled: true }));
    localStorage.setItem('emvi_premium_pricing_test', 'true');
  };

  const disablePremiumPricing = () => {
    setConfig(prev => ({ ...prev, enabled: false }));
    localStorage.removeItem('emvi_premium_pricing_test');
  };

  const togglePremiumPricing = () => {
    if (config.enabled) {
      disablePremiumPricing();
    } else {
      enablePremiumPricing();
    }
  };

  return {
    config,
    enablePremiumPricing,
    disablePremiumPricing,
    togglePremiumPricing
  };
};
