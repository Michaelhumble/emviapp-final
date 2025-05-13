
import { useState, useCallback } from 'react';

interface PricingOptions {
  selectedPricingTier: string;
  isFirstPost?: boolean;
  showAtTop?: boolean;
  isHotListing?: boolean;
  isUrgent?: boolean;
  hasReferrals?: boolean;
}

export const useJobPricing = () => {
  const [loading, setLoading] = useState(false);

  const calculateJobPrice = useCallback((options: PricingOptions): number => {
    setLoading(true);
    
    try {
      const { selectedPricingTier, isFirstPost, showAtTop, isHotListing, isUrgent, hasReferrals } = options;
      
      // First post is free
      if (isFirstPost) {
        return 0;
      }
      
      // Base prices for different tiers
      let basePrice = 0;
      switch (selectedPricingTier) {
        case 'standard':
          basePrice = 49;
          break;
        case 'featured':
          basePrice = 99;
          break;
        case 'premium':
          basePrice = 149;
          break;
        case 'gold':
          basePrice = 199;
          break;
        default:
          basePrice = 49;
      }
      
      // Additional options
      let additionalCost = 0;
      if (showAtTop) additionalCost += 29;
      if (isHotListing) additionalCost += 19;
      if (isUrgent) additionalCost += 15;
      
      // Referral discount
      const totalBeforeDiscount = basePrice + additionalCost;
      const discount = hasReferrals ? Math.round(totalBeforeDiscount * 0.1) : 0;
      
      return totalBeforeDiscount - discount;
    } finally {
      setLoading(false);
    }
  }, []);

  return { calculateJobPrice, loading };
};
