
// Simple pricing utilities without complex calculations
export const getPriceTierValue = (tier: string): number => {
  switch (tier) {
    case 'free': return 0;
    case 'standard': return 999; // $9.99
    case 'premium': return 1999; // $19.99
    case 'gold': return 2999; // $29.99
    default: return 999;
  }
};

// Simple validation function to check if pricing options are valid
export const validatePricingOptions = (options: any): boolean => {
  if (!options) return false;
  if (!options.selectedPricingTier) return false;
  return true;
};

// Get price in dollars for display
export const getPriceForDisplay = (priceInCents: number): string => {
  return (priceInCents / 100).toFixed(2);
};

// Export a simpler version of PRICING_OPTIONS for backward compatibility
export const PRICING_OPTIONS = [
  {
    id: 'standard-1',
    label: '1 Month',
    priceInCents: 999,
    durationMonths: 1
  },
  {
    id: 'standard-3',
    label: '3 Months',
    priceInCents: 2697,
    durationMonths: 3
  },
  {
    id: 'standard-6',
    label: '6 Months',
    priceInCents: 5094,
    durationMonths: 6,
    isPopular: true
  },
  {
    id: 'standard-12',
    label: '12 Months',
    priceInCents: 9588,
    durationMonths: 12,
    isBestValue: true
  }
];

// Simple function to get pricing option by duration
export const getPricingOptionByDuration = (durationMonths: number) => {
  return PRICING_OPTIONS.find(option => option.durationMonths === durationMonths) || PRICING_OPTIONS[0];
};

// Placeholder function for backward compatibility
export const applyAutoRenewDiscount = (option: any) => {
  return option;
};
