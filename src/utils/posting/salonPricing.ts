
export interface SalonPricingOptions {
  durationMonths?: number;
  isNationwide?: boolean;
  fastSalePackage?: boolean;
  featuredBoost?: boolean;
  showAtTop?: boolean;
  bundleWithJobPost?: boolean;
}

export const calculateSalonPostPrice = (options: SalonPricingOptions): number => {
  let basePrice = 299; // Base salon listing price
  
  if (options.durationMonths === 6) {
    basePrice = 1499; // 6 month package
  } else if (options.durationMonths === 12) {
    basePrice = 2499; // 12 month package
  }
  
  let totalPrice = basePrice;
  
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
  const basePrice = options.durationMonths === 6 ? 1499 : 
                   options.durationMonths === 12 ? 2499 : 299;
  
  const addOns = {
    nationwide: options.isNationwide ? 199 : 0,
    fastSale: (options.fastSalePackage || options.featuredBoost) ? 149 : 0,
    showAtTop: options.showAtTop ? 99 : 0,
    bundleWithJobPost: options.bundleWithJobPost ? 89 : 0
  };
  
  return {
    basePrice,
    addOns,
    total: calculateSalonPostPrice(options)
  };
};
