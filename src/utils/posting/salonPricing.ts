
export type SalonPricingTier = 'free' | 'standard' | 'premium' | 'featured';

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
  isNationwide?: boolean;
  fastSalePackage?: boolean;
  featuredBoost?: boolean;
  showAtTop?: boolean;
  bundleWithJobPost?: boolean;
  autoRenew?: boolean;
  isFirstPost?: boolean;
}

export interface SalonPricingSummary {
  planName: string;
  basePrice: number;
  finalPrice: number;
  duration: number;
  features: string[];
  subtotal?: number;
  durationDiscount?: number;
  autoRenewDiscount?: number;
  addOns: {
    nationwide: number;
    fastSale: number;
    showAtTop: number;
    bundleWithJobPost: number;
  };
  discounts: {
    duration: number;
    autoRenew: number;
  };
}

export const DURATION_OPTIONS = [
  { months: 1, label: '1 Month', discount: 0 },
  { months: 3, label: '3 Months', discount: 0.1 },
  { months: 6, label: '6 Months', discount: 0.15 },
  { months: 12, label: '12 Months', discount: 0.2 }
];

export const salonPricingPlans: SalonPricingPlan[] = [
  {
    id: 'free',
    name: 'Miễn Phí / Free',
    price: 0,
    duration: 1,
    features: [
      'Đăng tin cơ bản / Basic listing',
      'Hiển thị 30 ngày / 30-day visibility',
      'Hỗ trợ tiêu chuẩn / Standard support'
    ],
    color: 'border-gray-200',
    buttonColor: 'bg-gray-600 hover:bg-gray-700'
  },
  {
    id: 'standard',
    name: 'Tiêu Chuẩn / Standard',
    price: 99.99,
    duration: 1,
    features: [
      'Hiển thị nổi bật / Enhanced visibility',
      'Hiển thị 60 ngày / 60-day listing',
      'Hỗ trợ ưu tiên / Priority support',
      'Huy hiệu nổi bật / Featured badge'
    ],
    popular: true,
    color: 'border-blue-300',
    buttonColor: 'bg-blue-600 hover:bg-blue-700'
  },
  {
    id: 'premium',
    name: 'Cao Cấp / Premium',
    price: 199.99,
    duration: 3,
    features: [
      'Hiển thị cao cấp / Premium visibility',
      'Hiển thị 90 ngày / 90-day listing',
      'Hỗ trợ cao cấp / Premium support',
      'Top kết quả tìm kiếm / Top search results',
      'Quảng bá mạng xã hội / Social media promotion'
    ],
    color: 'border-purple-300',
    buttonColor: 'bg-purple-600 hover:bg-purple-700'
  },
  {
    id: 'featured',
    name: 'Đặc Biệt / Featured',
    price: 499.99,
    duration: 6,
    features: [
      'Hiển thị tối đa / Maximum visibility',
      'Hiển thị 6 tháng / 6-month listing',
      'Hỗ trợ chuyên dụng / Dedicated support',
      'Vị trí đầu trang / Top page placement',
      'Báo cáo phân tích / Analytics dashboard',
      'Thương hiệu tùy chỉnh / Custom branding'
    ],
    color: 'border-gold-300',
    buttonColor: 'bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700'
  }
];

export const calculateSalonPostPrice = (options: SalonPricingOptions): number => {
  const basePlan = getSalonPricingPlan(options.selectedPricingTier);
  let price = basePlan?.price || 0;
  
  // Apply duration discount if specified
  if (options.durationMonths && options.durationMonths > 1) {
    const durationOption = DURATION_OPTIONS.find(d => d.months === options.durationMonths);
    if (durationOption) {
      price = price * (1 - durationOption.discount);
    }
  }
  
  // Add-ons
  if (options.isNationwide) price += 10;
  if (options.fastSalePackage || options.featuredBoost) price += 20;
  if (options.showAtTop) price += 15;
  if (options.bundleWithJobPost) price += 15;
  
  // Auto-renew discount
  if (options.autoRenew) price = price * 0.9;
  
  return price;
};

export const getSalonPostPricingSummary = (options: SalonPricingOptions): SalonPricingSummary => {
  const plan = getSalonPricingPlan(options.selectedPricingTier);
  const basePrice = plan?.price || 0;
  const finalPrice = calculateSalonPostPrice(options);
  
  // Calculate add-on costs
  const addOns = {
    nationwide: options.isNationwide ? 10 : 0,
    fastSale: (options.fastSalePackage || options.featuredBoost) ? 20 : 0,
    showAtTop: options.showAtTop ? 15 : 0,
    bundleWithJobPost: options.bundleWithJobPost ? 15 : 0
  };
  
  // Calculate discounts
  let durationDiscount = 0;
  if (options.durationMonths && options.durationMonths > 1) {
    const durationOption = DURATION_OPTIONS.find(d => d.months === options.durationMonths);
    if (durationOption) {
      durationDiscount = basePrice * durationOption.discount;
    }
  }
  
  const autoRenewDiscount = options.autoRenew ? basePrice * 0.1 : 0;
  
  const subtotal = basePrice + Object.values(addOns).reduce((a, b) => a + b, 0);
  
  return {
    planName: plan?.name || 'Unknown',
    basePrice,
    finalPrice,
    duration: plan?.duration || 1,
    features: plan?.features || [],
    subtotal,
    durationDiscount,
    autoRenewDiscount,
    addOns,
    discounts: {
      duration: durationDiscount,
      autoRenew: autoRenewDiscount
    }
  };
};

export const validateSalonPricingOptions = (options: SalonPricingOptions): boolean => {
  return !!(options.selectedPricingTier && getSalonPricingPlan(options.selectedPricingTier));
};

export const getStripeSalonPriceId = (tier: SalonPricingTier): string => {
  // These would be actual Stripe price IDs in production
  const priceIds: Record<SalonPricingTier, string> = {
    free: 'price_free',
    standard: 'price_salon_standard',
    premium: 'price_salon_premium',
    featured: 'price_salon_featured'
  };
  return priceIds[tier] || priceIds.free;
};

export const getSalonPricingPlan = (tier: SalonPricingTier): SalonPricingPlan | undefined => {
  return salonPricingPlans.find(plan => plan.id === tier);
};
