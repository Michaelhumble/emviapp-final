
import { ListingPlan } from '@/components/posting/ListingPlanSelector';

export const jobPricingOptions: ListingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    tier: 'free',
    price: 0,
    features: [
      'Standard visibility',
      'Basic analytics',
      'Customer support',
      'Email notifications'
    ],
    description: 'Basic 14-day listing for small businesses',
    vietnameseDescription: 'Đăng tin cơ bản 14 ngày cho doanh nghiệp nhỏ',
    duration: 14,
    tag: 'Free Trial'
  },
  {
    id: 'featured',
    name: 'Featured',
    tier: 'featured',
    price: 19.99,
    features: [
      'Highlighted in search results',
      'Priority placement',
      'Email notifications',
      '30 days visibility',
      'Detailed performance analytics'
    ],
    description: '30-day listing with enhanced visibility',
    vietnameseDescription: 'Đăng tin 30 ngày với khả năng hiển thị nổi bật',
    duration: 30,
    popular: true
  },
  {
    id: 'premium',
    name: 'Premium',
    tier: 'premium',
    price: 49.99,
    wasPrice: 59.99,
    features: [
      'Top search result placement',
      'Featured in email newsletters',
      'Social media promotion',
      '90 days visibility',
      'Applicant management tools',
      'Priority customer support'
    ],
    description: '90-day premium placement for maximum exposure',
    vietnameseDescription: 'Đặt vị trí cao cấp trong 90 ngày để tiếp cận tối đa',
    duration: 90,
  },
  {
    id: 'diamond',
    name: 'Diamond Featured',
    tier: 'diamond',
    price: 999.99,
    features: [
      'Premium placement guarantee',
      'Featured in all communications',
      'Dedicated account manager',
      'Annual visibility (365 days)',
      'Multiple job postings',
      'Featured salon profile',
      'Candidate matching service'
    ],
    description: 'VIP annual package with maximum benefits',
    vietnameseDescription: 'Gói VIP hàng năm với quyền lợi tối đa',
    duration: 365,
    tag: 'VIP Package'
  }
];

export const durationOptions = [
  { 
    months: 1, 
    label: '1 Month', 
    vietnameseLabel: '1 Tháng',
    discount: 0 
  },
  { 
    months: 3, 
    label: '3 Months', 
    vietnameseLabel: '3 Tháng',
    discount: 10 
  },
  { 
    months: 6, 
    label: '6 Months', 
    vietnameseLabel: '6 Tháng',
    discount: 15 
  },
  { 
    months: 12, 
    label: '12 Months', 
    vietnameseLabel: '12 Tháng',
    discount: 25 
  }
];

// Calculate final price with duration discount
export const calculateFinalPrice = (
  basePrice: number,
  durationMonths: number,
  pricingTier: string,
  autoRenew: boolean
) => {
  // Diamond plan is always annual
  if (pricingTier === 'diamond') {
    return { finalPrice: basePrice, discount: 0, totalSavings: 0 };
  }
  
  // Free plan is always free
  if (pricingTier === 'free' || basePrice === 0) {
    return { finalPrice: 0, discount: 0, totalSavings: 0 };
  }

  // Find discount percentage based on duration
  const durationOption = durationOptions.find(option => option.months === durationMonths);
  const discountPercentage = durationOption?.discount || 0;
  
  // Add auto-renewal discount if applicable
  const totalDiscountPercentage = autoRenew ? discountPercentage + 5 : discountPercentage;
  
  // Calculate final price
  const discountAmount = (basePrice * totalDiscountPercentage) / 100;
  const finalPrice = basePrice - discountAmount;
  
  // Calculate total savings
  const regularTotal = basePrice * durationMonths;
  const discountedTotal = finalPrice * durationMonths;
  const totalSavings = regularTotal - discountedTotal;
  
  return {
    finalPrice,
    discount: totalDiscountPercentage,
    totalSavings
  };
};
