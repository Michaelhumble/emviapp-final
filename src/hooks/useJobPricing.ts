
import { useCallback } from 'react';

interface PricingOptions {
  selectedPricingTier?: string;
  isFirstPost?: boolean;
  showAtTop?: boolean;
  isHotListing?: boolean;
  isUrgent?: boolean;
  hasReferrals?: boolean;
}

export const useJobPricing = () => {
  const calculateJobPrice = useCallback((options: PricingOptions) => {
    const { 
      selectedPricingTier = 'standard', 
      isFirstPost = false,
      showAtTop = false,
      isHotListing = false,
      isUrgent = false,
      hasReferrals = false
    } = options;

    // Base prices
    const basePrices = {
      standard: 49,
      premium: 99,
      diamond: 199
    };

    // Get base price for selected tier
    let price = basePrices[selectedPricingTier as keyof typeof basePrices] || basePrices.standard;

    // Add costs for additional options
    if (showAtTop) price += 29;
    if (isHotListing) price += 19;
    if (isUrgent) price += 15;

    // Apply discounts
    if (isFirstPost) price = price * 0.5; // 50% off for first post
    if (hasReferrals) price = price * 0.9; // 10% off for referrals

    return Math.round(price); // Round to nearest dollar
  }, []);

  return {
    calculateJobPrice
  };
};
