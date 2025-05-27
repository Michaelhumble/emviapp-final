
// Define SalonPricingTier type
export type SalonPricingTier = 'basic' | 'standard' | 'featured';

// Define SalonPricingOptions interface
export interface SalonPricingOptions {
  selectedPricingTier: SalonPricingTier;
  isNationwide?: boolean;
  fastSalePackage?: boolean;
  showAtTop?: boolean;
  bundleWithJobPost?: boolean;
  isFirstPost?: boolean;
}

// Base prices for each tier
const tierBasePrices: Record<SalonPricingTier, number> = {
  basic: 19.99,
  standard: 24.99,
  featured: 39.99
};

// Additional option prices
const optionPrices = {
  nationwide: 10,
  fastSale: 20,
  showAtTop: 15,
  bundleWithJobPost: 15
};

// Calculate salon post price - this was the missing export
export const calculateSalonPostPrice = (options: SalonPricingOptions): number => {
  let price = tierBasePrices[options.selectedPricingTier];
  
  if (options.isNationwide) price += optionPrices.nationwide;
  if (options.fastSalePackage) price += optionPrices.fastSale;
  if (options.showAtTop) price += optionPrices.showAtTop;
  if (options.bundleWithJobPost) price += optionPrices.bundleWithJobPost;
  
  return price;
};

// Get pricing summary
export const getSalonPostPricingSummary = (options: SalonPricingOptions) => {
  const basePrice = tierBasePrices[options.selectedPricingTier];
  const totalPrice = calculateSalonPostPrice(options);
  
  return {
    basePrice,
    totalPrice,
    addOns: {
      nationwide: options.isNationwide ? optionPrices.nationwide : 0,
      fastSale: options.fastSalePackage ? optionPrices.fastSale : 0,
      showAtTop: options.showAtTop ? optionPrices.showAtTop : 0,
      bundleWithJobPost: options.bundleWithJobPost ? optionPrices.bundleWithJobPost : 0
    }
  };
};

// Validate pricing options
export const validateSalonPricingOptions = (options: SalonPricingOptions): boolean => {
  return options.selectedPricingTier && ['basic', 'standard', 'featured'].includes(options.selectedPricingTier);
};

// Get Stripe price ID for salon listings
export const getStripeSalonPriceId = (options: SalonPricingOptions): string => {
  // In production, this would map to actual Stripe price IDs
  const priceIds: Record<SalonPricingTier, string> = {
    basic: 'price_salon_basic',
    standard: 'price_salon_standard', 
    featured: 'price_salon_featured'
  };
  
  return priceIds[options.selectedPricingTier];
};
