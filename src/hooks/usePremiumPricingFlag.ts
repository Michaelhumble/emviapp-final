
import { useState, useEffect } from 'react';

interface PremiumPricingConfig {
  enabled: boolean;
  testMode: boolean;
  diamondSpotsLeft: number;
  firstPostFree: boolean;
  visualReview: boolean; // New flag for design review
}

export const usePremiumPricingFlag = () => {
  const [config, setConfig] = useState<PremiumPricingConfig>({
    enabled: true, // Changed to true for visual review
    testMode: true,
    diamondSpotsLeft: 2,
    firstPostFree: true,
    visualReview: true // Enable visual review mode
  });

  useEffect(() => {
    // Check for URL parameter to enable premium pricing for testing
    const urlParams = new URLSearchParams(window.location.search);
    const enablePremium = urlParams.get('premium_pricing') === 'true';
    const visualReview = urlParams.get('pricing_review') === 'true';
    
    // Check localStorage for persistent testing flag
    const storedFlag = localStorage.getItem('emvi_premium_pricing_test');
    const storedReview = localStorage.getItem('emvi_pricing_visual_review');
    
    if (enablePremium || storedFlag === 'true' || visualReview || storedReview === 'true') {
      setConfig(prev => ({
        ...prev,
        enabled: true,
        visualReview: visualReview || storedReview === 'true'
      }));
      
      // Store in localStorage for persistence during testing
      localStorage.setItem('emvi_premium_pricing_test', 'true');
      if (visualReview) {
        localStorage.setItem('emvi_pricing_visual_review', 'true');
      }
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
