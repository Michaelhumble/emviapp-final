export type SalonPricingTier = 'basic' | 'gold' | 'premium' | 'annual';

export interface SalonPricingOptions {
  selectedPricingTier?: SalonPricingTier;
  durationMonths?: number;
  isNationwide?: boolean;
  fastSalePackage?: boolean;
  featuredBoost?: boolean;
  showAtTop?: boolean;
  bundleWithJobPost?: boolean;
  featuredAddon?: boolean; // New field for the $10 feature add-on
}

export const SALON_PRICING_PLANS = [
  {
    id: 'basic',
    tier: 'basic' as SalonPricingTier,
    name: 'Basic',
    price: 19.99,
    duration: 1,
    description: 'Standard salon listing for 1 month',
    features: [
      'Listed for 30 days',
      'Basic contact information',
      'Standard search visibility'
    ]
  },
  {
    id: 'gold',
    tier: 'gold' as SalonPricingTier,
    name: 'Gold',
    price: 49.99,
    duration: 3,
    description: 'Extended listing for 3 months',
    features: [
      'Listed for 90 days',
      'Enhanced visibility',
      'Priority in search results'
    ]
  },
  {
    id: 'premium',
    tier: 'premium' as SalonPricingTier,
    name: 'Premium',
    price: 99.99,
    duration: 6,
    description: 'Premium listing for 6 months',
    features: [
      'Listed for 180 days',
      'Maximum visibility',
      'Top placement in results'
    ]
  },
  {
    id: 'annual',
    tier: 'annual' as SalonPricingTier,
    name: '12 Months',
    price: 149.00,
    duration: 12,
    description: 'Annual listing package',
    features: [
      'Listed for 1 full year',
      'Best value option',
      'Priority customer support'
    ]
  }
];

export const calculateSalonPostPrice = (options: SalonPricingOptions): number => {
  let basePrice = 19.99; // Default to basic
  
  // Get base price from selected tier
  const selectedPlan = SALON_PRICING_PLANS.find(plan => plan.tier === options.selectedPricingTier);
  if (selectedPlan) {
    basePrice = selectedPlan.price;
  }
  
  let totalPrice = basePrice;
  
  // Add featured addon if selected
  if (options.featuredAddon) {
    totalPrice += 10.00;
  }
  
  // Legacy add-ons (keeping for compatibility)
  if (options.isNationwide) {
    totalPrice += 199;
  }
  
  if (options.fastSalePackage || options.featuredBoost) {
    totalPrice += 149;
  }
  
  if (options.showAtTop) {
    totalPrice += 99;
  }
  
  if (options.bundleWithJobPost) {
    totalPrice += 89;
  }
  
  return totalPrice;
};

export const getSalonPostPricingSummary = (options: SalonPricingOptions) => {
  const selectedPlan = SALON_PRICING_PLANS.find(plan => plan.tier === options.selectedPricingTier);
  const basePrice = selectedPlan ? selectedPlan.price : 19.99;
  
  const addOns = {
    featuredAddon: options.featuredAddon ? 10.00 : 0,
    nationwide: options.isNationwide ? 199 : 0,
    fastSale: (options.fastSalePackage || options.featuredBoost) ? 149 : 0,
    showAtTop: options.showAtTop ? 99 : 0,
    bundleWithJobPost: options.bundleWithJobPost ? 89 : 0
  };
  
  return {
    basePrice,
    addOns,
    total: calculateSalonPostPrice(options),
    planName: selectedPlan?.name || 'Basic',
    duration: selectedPlan?.duration || 1
  };
};

export const validateSalonPricingOptions = (options: SalonPricingOptions): boolean => {
  return !!options.selectedPricingTier;
};

export const getStripeSalonPriceId = (options: SalonPricingOptions): string => {
  // This would map to actual Stripe price IDs in production
  const priceMap = {
    basic: 'price_basic_salon',
    gold: 'price_gold_salon', 
    premium: 'price_premium_salon',
    annual: 'price_annual_salon'
  };
  
  return priceMap[options.selectedPricingTier || 'basic'];
};
