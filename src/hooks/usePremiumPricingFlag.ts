
import { useState, useEffect } from 'react';

interface PremiumPricingConfig {
  enabled: boolean;
  testMode: boolean;
  diamondSpotsLeft: number;
  firstPostFree: boolean;
  visualReview: boolean;
}

export const usePremiumPricingFlag = () => {
  const [config, setConfig] = useState<PremiumPricingConfig>({
    enabled: true, // Enable by default to show new pricing
    testMode: true,
    diamondSpotsLeft: 2,
    firstPostFree: true,
    visualReview: true
  });

  useEffect(() => {
    // Check for URL parameter to disable premium pricing for testing
    const urlParams = new URLSearchParams(window.location.search);
    const disablePremium = urlParams.get('disable_premium') === 'true';
    const visualReview = urlParams.get('pricing_review') === 'true';
    
    // Check localStorage for persistent testing flag
    const storedFlag = localStorage.getItem('emvi_premium_pricing_test');
    const storedReview = localStorage.getItem('emvi_pricing_visual_review');
    
    // Default to enabled unless explicitly disabled
    if (disablePremium) {
      setConfig(prev => ({
        ...prev,
        enabled: false,
        visualReview: false
      }));
    } else {
      setConfig(prev => ({
        ...prev,
        enabled: true,
        visualReview: visualReview || storedReview === 'true' || true // Default visual review on
      }));
      
      // Store in localStorage for persistence
      localStorage.setItem('emvi_premium_pricing_test', 'true');
      localStorage.setItem('emvi_pricing_visual_review', 'true');
    }
  }, []);

  const enablePremiumPricing = () => {
    setConfig(prev => ({ ...prev, enabled: true }));
    localStorage.setItem('emvi_premium_pricing_test', 'true');
  };

  const disablePremiumPricing = () => {
    setConfig(prev => ({ ...prev, enabled: false, visualReview: false }));
    localStorage.removeItem('emvi_premium_pricing_test');
    localStorage.removeItem('emvi_pricing_visual_review');
  };

  const enableVisualReview = () => {
    setConfig(prev => ({ ...prev, enabled: true, visualReview: true }));
    localStorage.setItem('emvi_premium_pricing_test', 'true');
    localStorage.setItem('emvi_pricing_visual_review', 'true');
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
    enableVisualReview,
    togglePremiumPricing
  };
};
