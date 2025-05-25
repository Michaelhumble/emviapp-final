
import { JobPricingOption } from './types';

export const jobPricingOptions: JobPricingOption[] = [
  {
    id: 'free',
    tier: 'free',
    name: 'Free Listing',
    price: 0,
    wasPrice: undefined,
    duration: 30, // 30 days
    description: 'Basic visibility in search results',
    vietnameseDescription: 'Hiển thị cơ bản trong kết quả tìm kiếm',
    features: [
      '30-day listing duration',
      'Basic search visibility',
      'Standard listing placement',
      'Contact information display'
    ],
    popular: false,
    recommended: false,
    limitedSpots: undefined
  },
  {
    id: 'gold',
    tier: 'gold',
    name: 'Gold Featured Listing',
    price: 19.99,
    wasPrice: 24.99,
    duration: 30, // 30 days
    description: 'Enhanced visibility with featured placement',
    vietnameseDescription: 'Tăng khả năng hiển thị với vị trí nổi bật',
    features: [
      '30-day featured placement',
      'Priority in search results',
      'Gold badge highlight',
      'Enhanced listing display',
      'Featured section placement'
    ],
    popular: true,
    recommended: false,
    limitedSpots: 'Limited to 5 spots per industry'
  },
  {
    id: 'premium',
    tier: 'premium', 
    name: 'Premium Listing',
    price: 39.99,
    wasPrice: 49.99,
    duration: 30, // 30 days
    description: 'Maximum exposure with premium features',
    vietnameseDescription: 'Tiếp xúc tối đa với các tính năng cao cấp',
    features: [
      '30-day premium placement',
      'Top placement above Gold',
      'Premium badge & styling',
      'Priority customer support',
      'Advanced analytics',
      'Social media promotion'
    ],
    popular: false,
    recommended: true,
    limitedSpots: 'Limited to 5 spots per industry'
  },
  {
    id: 'diamond',
    tier: 'diamond',
    name: 'Diamond Exclusive',
    price: 99.99,
    wasPrice: undefined,
    duration: 30, // 30 days
    description: 'Top Diamond Featured - Invite/Bid Only',
    vietnameseDescription: 'Top Diamond Featured - Chỉ theo lời mời/đấu giá',
    features: [
      '30-day top diamond placement',
      'Highest priority placement',
      'Diamond exclusive badge',
      'Personal account manager',
      'Custom listing design',
      'Industry spotlight feature'
    ],
    popular: false,
    recommended: false,
    limitedSpots: 'Invite/Bid Only - Limited to 5 spots per industry'
  }
];

// Duration options for multi-month deals with discounts
export const durationOptions = [
  {
    months: 1,
    label: '1 Month',
    vietnameseLabel: '1 Tháng',
    discount: 0,
    description: 'One 30-day listing'
  },
  {
    months: 3, 
    label: '3 Months',
    vietnameseLabel: '3 Tháng',
    discount: 10,
    description: '3 auto-renewed 30-day listings (Save 10%)'
  },
  {
    months: 6,
    label: '6 Months', 
    vietnameseLabel: '6 Tháng',
    discount: 15,
    description: '6 auto-renewed 30-day listings (Save 15%)'
  },
  {
    months: 12,
    label: '12 Months',
    vietnameseLabel: '12 Tháng', 
    discount: 20,
    description: '12 auto-renewed 30-day listings (Save 20%)'
  }
];

export const calculateDiscountedPrice = (basePrice: number, months: number): { originalPrice: number; finalPrice: number; discountPercentage: number } => {
  const originalPrice = basePrice * months;
  const durationOption = durationOptions.find(option => option.months === months);
  const discountPercentage = durationOption?.discount || 0;
  const discount = (originalPrice * discountPercentage) / 100;
  const finalPrice = originalPrice - discount;
  
  return {
    originalPrice,
    finalPrice, 
    discountPercentage
  };
};
