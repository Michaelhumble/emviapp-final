
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
    enabled: false, // Disabled for production
    testMode: false,
    diamondSpotsLeft: 0,
    firstPostFree: true,
    visualReview: false
  });

  useEffect(() => {
    // Production mode - always disabled
    setConfig({
      enabled: false,
      testMode: false,
      diamondSpotsLeft: 0,
      firstPostFree: true,
      visualReview: false
    });
    
    // Clear any test flags from localStorage
    localStorage.removeItem('emvi_premium_pricing_test');
    localStorage.removeItem('emvi_pricing_visual_review');
  }, []);

  const enablePremiumPricing = () => {
    // Disabled in production
    console.log('Premium pricing disabled in production mode');
  };

  const disablePremiumPricing = () => {
    // Already disabled
    console.log('Premium pricing already disabled');
  };

  const enableVisualReview = () => {
    // Disabled in production
    console.log('Visual review disabled in production mode');
  };

  const togglePremiumPricing = () => {
    // Disabled in production
    console.log('Premium pricing toggle disabled in production mode');
  };

  return {
    config,
    enablePremiumPricing,
    disablePremiumPricing,
    enableVisualReview,
    togglePremiumPricing
  };
};
