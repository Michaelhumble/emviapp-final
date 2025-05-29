
export type SalonPricingTier = 'standard' | 'featured';

export interface SalonPricingPlan {
  id: SalonPricingTier;
  name: string;
  price: number;
  duration: number; // in months
  features: string[];
  popular?: boolean;
  color: string;
  buttonColor: string;
}

export interface SalonPricingOptions {
  selectedPricingTier: SalonPricingTier;
  durationMonths?: number;
  featuredAddOn?: boolean;
  autoRenew?: boolean;
  isFirstPost?: boolean;
}

export interface SalonPricingSummary {
  planName: string;
  basePrice: number;
  finalPrice: number;
  duration: number;
  durationMonths: number;
  features: string[];
  subtotal?: number;
  durationDiscount?: number;
  autoRenewDiscount?: number;
  addOns: {
    featured: number;
  };
  discounts: {
    duration: number;
    autoRenew: number;
    firstPost: number;
    autoRenewDiscount: number;
  };
  savingsPercent?: number;
  perMonthPrice?: number;
}

export const DURATION_OPTIONS = [
  { months: 1, label: '1 Month', discount: 0, price: 19.99, savingsPercent: 0 },
  { months: 3, label: '3 Months', discount: 25, price: 45.00, savingsPercent: 25 },
  { months: 6, label: '6 Months', discount: 17, price: 99.00, savingsPercent: 17 },
  { months: 12, label: '12 Months', discount: 39, price: 145.99, savingsPercent: 39 }
];

export const salonPricingPlans: SalonPricingPlan[] = [
  {
    id: 'standard',
    name: 'Standard Listing / Đăng Tin Cơ Bản',
    price: 19.99,
    duration: 1,
    features: [
      'Basic salon listing / Đăng tin cơ bản',
      'Search visibility / Hiển thị trong tìm kiếm',
      'Contact information display / Hiển thị thông tin liên hệ',
      'Photo gallery / Thư viện hình ảnh'
    ],
    popular: true,
    color: 'border-blue-300',
    buttonColor: 'bg-blue-600 hover:bg-blue-700'
  }
];

export const calculateSalonPostPrice = (options: SalonPricingOptions): number => {
  // Get base price based on duration
  const durationOption = DURATION_OPTIONS.find(d => d.months === (options.durationMonths || 1));
  let price = durationOption?.price || 19.99;
  
  // Add featured add-on
  if (options.featuredAddOn) {
    const featuredCost = (options.durationMonths || 1) * 10; // $10/month
    price += featuredCost;
  }
  
  // Auto-renew discount (5%)
  if (options.autoRenew) {
    price = price * 0.95;
  }
  
  return price;
};

export const getSalonPostPricingSummary = (options: SalonPricingOptions): SalonPricingSummary => {
  const durationOption = DURATION_OPTIONS.find(d => d.months === (options.durationMonths || 1));
  const basePrice = durationOption?.price || 19.99;
  const duration = durationOption?.months || 1;
  const savingsPercent = durationOption?.savingsPercent || 0;
  const finalPrice = calculateSalonPostPrice(options);
  
  // Calculate per-month price for display
  const perMonthPrice = basePrice / duration;
  
  // Calculate add-on costs
  const featuredCost = options.featuredAddOn ? duration * 10 : 0;
  const addOns = {
    featured: featuredCost
  };
  
  // Calculate discounts
  const autoRenewDiscount = options.autoRenew ? basePrice * 0.05 : 0;
  
  const subtotal = basePrice + featuredCost;
  
  return {
    planName: `Standard Listing - ${duration} month${duration > 1 ? 's' : ''}`,
    basePrice,
    finalPrice,
    duration,
    durationMonths: duration,
    features: salonPricingPlans[0].features,
    subtotal,
    durationDiscount: 0,
    autoRenewDiscount,
    addOns,
    discounts: {
      duration: 0,
      autoRenew: autoRenewDiscount,
      firstPost: 0,
      autoRenewDiscount
    },
    savingsPercent,
    perMonthPrice
  };
};

export const validateSalonPricingOptions = (options: SalonPricingOptions): boolean => {
  return !!(options.selectedPricingTier && getSalonPricingPlan(options.selectedPricingTier));
};

export const getStripeSalonPriceId = (tier: SalonPricingTier): string => {
  const priceIds: Record<SalonPricingTier, string> = {
    standard: 'price_salon_standard',
    featured: 'price_salon_featured'
  };
  return priceIds[tier] || priceIds.standard;
};

export const getSalonPricingPlan = (tier: SalonPricingTier): SalonPricingPlan | undefined => {
  return salonPricingPlans.find(plan => plan.id === tier);
};
