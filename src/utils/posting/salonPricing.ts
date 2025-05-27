
export type SalonPricingTier = 'standard' | 'premium' | 'enterprise';

export interface SalonPricingOptions {
  durationMonths: number;
  selectedPricingTier: SalonPricingTier;
  autoRenew?: boolean;
  isNationwide?: boolean;
  isFirstPost?: boolean;
  showAtTop?: boolean;
  fastSalePackage?: boolean;
  bundleWithJobPost?: boolean;
  featuredBoost?: boolean;
}

export const calculateSalonPostPrice = (options: SalonPricingOptions): number => {
  let basePrice = 0;
  
  // Base pricing by duration and tier
  if (options.durationMonths === 1) {
    basePrice = 24.99; // Standard 1 month
  } else if (options.durationMonths === 6) {
    basePrice = 120; // 6 month package
  } else if (options.durationMonths === 12) {
    basePrice = 249.99; // 12 month package
  }
  
  // Add-ons
  if (options.isNationwide) {
    basePrice += 10;
  }
  
  if (options.fastSalePackage || options.featuredBoost) {
    basePrice += 25; // Feature Boost
  }
  
  if (options.showAtTop) {
    basePrice += 15;
  }
  
  if (options.bundleWithJobPost) {
    basePrice += 15;
  }
  
  return basePrice;
};

export const getPlanDetails = (durationMonths: number) => {
  switch (durationMonths) {
    case 1:
      return {
        name: 'Standard Listing',
        price: 24.99,
        originalPrice: null,
        savings: null,
        description: 'Perfect for getting started',
        features: ['Basic listing visibility', '30 days active', 'Standard support']
      };
    case 6:
      return {
        name: '6 Month Package',
        price: 120,
        originalPrice: 149.94,
        savings: 20,
        description: 'Most popular choice',
        features: ['Enhanced visibility', '6 months active', 'Priority support', 'Analytics dashboard']
      };
    case 12:
      return {
        name: '12 Month Package',
        price: 249.99,
        originalPrice: 299.88,
        savings: 17,
        description: 'Best value for serious sellers',
        features: ['Maximum visibility', '12 months active', 'VIP support', 'Advanced analytics', 'Featured placement']
      };
    default:
      return getPlanDetails(1);
  }
};
