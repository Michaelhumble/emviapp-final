
import { JobPricingOption } from './types';

// Job pricing options
export const jobPricingOptions: JobPricingOption[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    description: 'Basic listing for first-time users',
    vietnameseDescription: 'Niêm yết cơ bản cho người dùng lần đầu',
    tag: 'Basic',
    features: [
      'One-time free job post',
      'Standard visibility',
      'Basic applicant matching',
      'Valid for 7 days',
      'Limited search results'
    ],
    isFirstPost: true,
    tier: 'free'
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 19.99,
    wasPrice: 29.99,
    description: 'Enhanced visibility for quality candidates',
    vietnameseDescription: 'Hiển thị nổi bật để thu hút ứng viên chất lượng',
    popular: true,
    tag: 'Best Value',
    features: [
      'Featured position in search',
      'Priority matching algorithm',
      'Unlimited candidate responses',
      'Email alerts for new matches',
      'Full access to candidate profiles'
    ],
    tier: 'premium'
  },
  {
    id: 'gold',
    name: 'Gold',
    price: 39.99,
    description: 'Maximum exposure to top talent',
    vietnameseDescription: 'Tiếp cận tối đa tới nhân tài hàng đầu',
    tag: 'Limited Spots',
    features: [
      'Top placement guarantee',
      'Premium badge on listing',
      'Featured in email campaigns',
      'SMS notifications',
      'Dedicated support agent'
    ],
    tier: 'gold'
  },
  {
    id: 'diamond',
    name: 'Diamond',
    price: 99.99,
    description: 'VIP service - by invitation only',
    vietnameseDescription: 'Dịch vụ VIP - chỉ dành cho khách mời',
    tag: 'VIP',
    features: [
      'Exclusive listing positioning',
      'Talent sourcing team',
      'Personalized candidate matching',
      'Background screening included',
      'Interview scheduling service'
    ],
    tier: 'diamond'
  }
];

// Calculate pricing based on duration
export const calculateFinalPrice = (basePrice: number, duration: number) => {
  let discountPercentage = 0;
  
  // Apply discount based on subscription length
  if (duration === 3) {
    discountPercentage = 5;
  } else if (duration === 6) {
    discountPercentage = 10;
  } else if (duration === 12) {
    discountPercentage = 20;
  }
  
  const originalPrice = basePrice * duration;
  const finalPrice = originalPrice * (1 - discountPercentage / 100);
  
  return {
    originalPrice,
    finalPrice,
    discountPercentage
  };
};

// Calculate job post price
export const calculateJobPostPrice = (options: any) => {
  const { selectedPricingTier, durationMonths = 1, isFirstPost = false } = options;
  
  // Find the base pricing option
  const pricingOption = jobPricingOptions.find(option => option.id === selectedPricingTier);
  if (!pricingOption) {
    return { originalPrice: 0, finalPrice: 0, discountPercentage: 0 };
  }
  
  // Apply first post free if applicable
  if (isFirstPost && selectedPricingTier === 'free') {
    return { originalPrice: 0, finalPrice: 0, discountPercentage: 0 };
  }
  
  // Calculate with duration discounts
  return calculateFinalPrice(pricingOption.price, durationMonths);
};
