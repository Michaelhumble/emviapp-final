
export type SalonPricingTier = 'basic' | 'premium' | 'enterprise';

export interface SalonPricingOptions {
  durationMonths: number;
  selectedPricingTier: SalonPricingTier;
  isNationwide: boolean;
  fastSalePackage: boolean;
  featuredBoost?: boolean;
  showAtTop?: boolean;
  bundleWithJobPost?: boolean;
  isFirstPost?: boolean;
}

export const calculateSalonPostPrice = (options: SalonPricingOptions): number => {
  let basePrice = 50; // Base price for 1 month
  
  // Duration multiplier with discounts
  if (options.durationMonths === 6) {
    basePrice = 250; // 17% discount
  } else if (options.durationMonths === 12) {
    basePrice = 450; // 25% discount
  }
  
  // Add-ons
  if (options.isNationwide) basePrice += 10;
  if (options.fastSalePackage) basePrice += 20;
  if (options.featuredBoost) basePrice += 15;
  if (options.showAtTop) basePrice += 15;
  if (options.bundleWithJobPost) basePrice += 15;
  
  // Premium tier upgrade
  if (options.selectedPricingTier === 'premium') basePrice += 25;
  if (options.selectedPricingTier === 'enterprise') basePrice += 50;
  
  return basePrice;
};

export const getPlanDetails = (months: number) => {
  switch (months) {
    case 1:
      return {
        name: 'Basic Plan',
        price: 50,
        description: '1 month listing',
        features: ['Basic listing', 'Email support', 'Standard placement']
      };
    case 6:
      return {
        name: 'Popular Plan',
        price: 250,
        originalPrice: 300,
        savings: 17,
        description: '6 month listing',
        features: ['Extended exposure', 'Priority support', 'Featured placement']
      };
    case 12:
      return {
        name: 'Best Value',
        price: 450,
        originalPrice: 600,
        savings: 25,
        description: '12 month listing',
        features: ['Maximum exposure', 'Premium support', 'Top placement', 'Analytics dashboard']
      };
    default:
      return getPlanDetails(1);
  }
};
