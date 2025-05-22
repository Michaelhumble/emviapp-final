
import { JobPricingOption } from './types';

// Duration discount rates - easily configurable
export const DURATION_DISCOUNTS: Record<string, number> = {
  '1': 0, // No discount for monthly
  '3': 25, // 25% off for 3 months
  '6': 35, // 35% off for 6 months
  '12': 50 // 50% off for 12 months
};

// Duration options
export const DURATION_OPTIONS = [
  { months: 1, label: "Monthly", vietnameseLabel: "Hàng tháng", discount: DURATION_DISCOUNTS['1'] },
  { months: 3, label: "3 Months", vietnameseLabel: "3 Tháng", discount: DURATION_DISCOUNTS['3'] },
  { months: 6, label: "6 Months", vietnameseLabel: "6 Tháng", discount: DURATION_DISCOUNTS['6'] },
  { months: 12, label: "12 Months", vietnameseLabel: "12 Tháng", discount: DURATION_DISCOUNTS['12'] }
];

// Auto-renew settings
export const DEFAULT_AUTO_RENEW = true;
export const AUTO_RENEW_DISCOUNT = 5; // 5% additional discount for auto-renew

// Plan features
const FREE_FEATURES = [
  "1 Basic Job Listing",
  "No Photos",
  "30-Day Duration",
  "Local Area Visibility"
];

const BASIC_FEATURES = [
  "1 Standard Job Listing",
  "Up to 3 Photos",
  "Enhanced Visibility",
  "Email Support",
  "90-Day Duration"
];

const PRO_FEATURES = [
  "1 Featured Job Listing",
  "Up to 10 Photos",
  "Premium Placement",
  "Priority Support",
  "Nationwide Visibility",
  "Applicant Analytics"
];

const ELITE_FEATURES = [
  "1 Priority Job Listing",
  "Unlimited Photos",
  "Top Search Results",
  "24/7 VIP Support",
  "Featured on Homepage",
  "Advanced Analytics",
  "Applicant Pre-screening"
];

const DIAMOND_FEATURES = [
  "Full-Service Recruitment",
  "Unlimited Premium Listings",
  "Custom Branding",
  "Account Manager",
  "Talent Matching",
  "Exclusive Industry Events",
  "Candidate Pre-screening"
];

// Pricing plans configuration
export const PRICING_PLANS: JobPricingOption[] = [
  {
    id: 'free',
    name: 'Free',
    tier: 'free',
    price: 0,
    description: 'Basic listing with no photos. Perfect for small businesses or first-time users.',
    vietnameseDescription: 'Đăng tin cơ bản không có hình. Lý tưởng cho doanh nghiệp nhỏ.',
    features: FREE_FEATURES,
    priceMonthly: 0
  },
  {
    id: 'standard',
    name: 'Basic',
    tier: 'standard',
    price: 9.99,
    description: 'Standard listing with photos. Better visibility in search results.',
    vietnameseDescription: 'Đăng tin tiêu chuẩn với hình ảnh. Hiển thị tốt hơn trong kết quả tìm kiếm.',
    features: BASIC_FEATURES,
    priceMonthly: 9.99
  },
  {
    id: 'premium',
    name: 'Professional',
    tier: 'premium',
    price: 19.99,
    description: 'Featured listing with priority placement. Recommended for competitive positions.',
    vietnameseDescription: 'Đăng tin nổi bật với vị trí ưu tiên. Được đề xuất cho các vị trí cạnh tranh.',
    features: PRO_FEATURES,
    priceMonthly: 19.99,
    recommended: true
  },
  {
    id: 'gold',
    name: 'Elite',
    tier: 'gold',
    price: 24.99,
    description: 'Premium listing with top placement. Best for urgent positions and high competition.',
    vietnameseDescription: 'Đăng tin cao cấp với vị trí hàng đầu. Tốt nhất cho các vị trí khẩn cấp và cạnh tranh cao.',
    features: ELITE_FEATURES,
    priceMonthly: 24.99
  },
  {
    id: 'diamond',
    name: 'Diamond',
    tier: 'diamond',
    price: 999.99, // Hidden price, shown only on Diamond page
    description: 'Invite-only elite service with full recruitment support.',
    vietnameseDescription: 'Dịch vụ cao cấp chỉ dành cho khách mời với hỗ trợ tuyển dụng đầy đủ.',
    features: DIAMOND_FEATURES,
    priceMonthly: 999.99,
    hidden: true // Flag to hide from main pricing grid
  }
];

// Helper functions for pricing calculations
export const calculateDiscount = (basePrice: number, durationMonths: number, autoRenew: boolean = false): {
  discountPercentage: number;
  finalPrice: number;
} => {
  // Get duration discount percentage - convert number to string for lookup
  const durationKey = String(durationMonths) as keyof typeof DURATION_DISCOUNTS;
  const durationDiscount = DURATION_DISCOUNTS[durationKey] || 0;
  
  // Add auto-renew discount if enabled
  const totalDiscount = autoRenew ? durationDiscount + AUTO_RENEW_DISCOUNT : durationDiscount;
  
  // Calculate discount amount
  const discountAmount = (basePrice * durationMonths * totalDiscount) / 100;
  
  // Calculate final price
  const finalPrice = (basePrice * durationMonths) - discountAmount;
  
  return {
    discountPercentage: totalDiscount,
    finalPrice: parseFloat(finalPrice.toFixed(2)) // Round to 2 decimal places
  };
};

// Get plan by tier
export const getPlanByTier = (tier: string): JobPricingOption | undefined => {
  return PRICING_PLANS.find(plan => plan.tier === tier);
};

// Calculate total price with discounts
export const calculateTotalPrice = (
  tier: string,
  durationMonths: number,
  autoRenew: boolean = DEFAULT_AUTO_RENEW
): {
  originalPrice: number;
  finalPrice: number;
  discountPercentage: number;
  savings: number;
} => {
  const plan = getPlanByTier(tier);
  
  if (!plan) {
    return {
      originalPrice: 0,
      finalPrice: 0,
      discountPercentage: 0,
      savings: 0
    };
  }
  
  const basePrice = plan.priceMonthly || plan.price;
  const originalPrice = basePrice * durationMonths;
  const { discountPercentage, finalPrice } = calculateDiscount(basePrice, durationMonths, autoRenew);
  const savings = originalPrice - finalPrice;
  
  return {
    originalPrice,
    finalPrice,
    discountPercentage,
    savings
  };
};
