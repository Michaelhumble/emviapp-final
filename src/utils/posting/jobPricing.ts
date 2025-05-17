
import { JobPricingOption, JobPricingTier } from './types';

export const jobPricingOptions: JobPricingOption[] = [
  {
    id: 'diamond',
    name: 'Diamond',
    price: 199,
    wasPrice: 249,
    description: 'Maximum visibility & priority placement. Featured at the top of all job listings.',
    vietnameseDescription: 'Khả năng hiển thị tối đa & vị trí ưu tiên. Nổi bật ở đầu tất cả các danh sách việc làm.',
    tag: 'MOST HIRED',
    popular: false,
    features: [
      'Featured at top of all job listings',
      'Premium badge & highlighted listing',
      'Email sent to all qualified candidates',
      'Promoted across social channels',
      'Unlimited applicants for 30 days',
      'Urgent hiring badge',
      'Priority support',
      'Applicant management tools'
    ],
    tier: 'diamond'
  },
  {
    id: 'gold',
    name: 'Gold',
    price: 99,
    wasPrice: 129,
    description: 'Enhanced visibility with premium placement & specialized targeting.',
    vietnameseDescription: 'Khả năng hiển thị nâng cao với vị trí cao cấp & nhắm mục tiêu chuyên biệt.',
    tag: 'POPULAR',
    popular: true,
    features: [
      'Featured in premium job section',
      'Gold badge visible on listing',
      'Highlighted in search results',
      'Promoted to targeted candidates',
      'Unlimited applicants for 30 days',
      'Urgent hiring badge',
      'Priority support'
    ],
    tier: 'gold'
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 59,
    description: 'Boost your job visibility with premium placement & highlight features.',
    vietnameseDescription: 'Tăng cường khả năng hiển thị công việc của bạn với vị trí cao cấp & tính năng nổi bật.',
    tag: 'RECOMMENDED',
    popular: false,
    features: [
      'Improved search placement',
      'Premium badge on listing',
      'Highlighted in job feed',
      'Unlimited applicants for 30 days',
      'Email support'
    ],
    tier: 'premium'
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 29,
    description: 'Basic job listing with standard placement in search results.',
    vietnameseDescription: 'Danh sách công việc cơ bản với vị trí tiêu chuẩn trong kết quả tìm kiếm.',
    popular: false,
    features: [
      'Standard search placement',
      'Basic job listing',
      'Unlimited applicants for 30 days'
    ],
    tier: 'standard'
  }
];

// Calculate discount based on duration
export const calculateFinalPrice = (basePrice: number, durationMonths: number): number => {
  if (durationMonths === 1) {
    return basePrice;
  } else if (durationMonths === 3) {
    // 10% discount for 3 months
    return Math.round(basePrice * 3 * 0.9);
  } else if (durationMonths === 6) {
    // 20% discount for 6 months
    return Math.round(basePrice * 6 * 0.8);
  }
  
  // Default case (shouldn't happen)
  return basePrice * durationMonths;
};

// Check if a pricing tier is eligible for subscription
export const isSubscriptionPlan = (pricingTier: string): boolean => {
  return pricingTier !== 'free';
};
