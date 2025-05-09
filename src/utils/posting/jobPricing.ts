
import { JobPricingOption, JobPricingTier } from './types';

export const jobPricingOptions: JobPricingOption[] = [
  {
    id: 'free',
    name: '🎁 Free Post',
    tier: 'basic' as JobPricingTier,
    price: 0,
    wasPrice: 9.99,
    description: 'Basic listing. No image. Limited visibility.',
    vietnameseDescription: 'Tin đơn giản – Không có hình ảnh.',
    features: [
      'Visible in Standard section',
      'No image',
      'Shows for 3 days',
      'Standard placement'
    ],
    duration: 30, // days
    tag: '⚪ Was $9.99 – Now Free!'
  },
  {
    id: 'standard',
    name: '✅ Standard',
    tier: 'premium' as JobPricingTier,
    price: 9.99,
    wasPrice: 29.99,
    description: 'Full listing with image & contact info.',
    vietnameseDescription: 'Hiển thị hình ảnh và số điện thoại.',
    features: [
      'Includes image',
      'Visible for 2 weeks',
      'Listed in Gold section',
      'Better placement'
    ],
    duration: 30, // days
    tag: '🟢 Save Big – Limited Time'
  },
  {
    id: 'gold',
    name: '🏆 Gold Featured',
    tier: 'featured' as JobPricingTier,
    price: 19.99,
    wasPrice: 39.99,
    description: 'Appear in 🏆 Featured Row.',
    vietnameseDescription: 'Hiển thị trong mục nổi bật. Ấn tượng hơn.',
    features: [
      'Featured row placement',
      'Visible for 30 days',
      'Priority in search',
      'Enhanced visibility'
    ],
    duration: 30, // days
    popular: true,
    tag: '🟡 Smart Pick'
  },
  {
    id: 'premium',
    name: '✨ Premium',
    tier: 'featured' as JobPricingTier,
    price: 49.99,
    wasPrice: 99.99,
    description: 'Show up First. Homepage Love.',
    vietnameseDescription: 'Ưu tiên trên trang chính – Khách hàng thấy đầu tiên.',
    features: [
      'Pinned for 1 week',
      'Homepage placement',
      'Priority visibility',
      'VIP support'
    ],
    duration: 30, // days
    tag: '🟠 Today Only – 50% OFF'
  },
  {
    id: 'diamond',
    name: '💎 Diamond Featured',
    tier: 'featured' as JobPricingTier,
    price: 999.99,
    wasPrice: 1499.99,
    description: 'Top 3 Spot. Forever Trusted.',
    vietnameseDescription: 'Vị trí đặc biệt – Chỉ 3 chỗ duy nhất.',
    features: [
      'Top 3 spots',
      '1-year duration',
      'Only 3 available',
      'Homepage pinning'
    ],
    duration: 365, // days
    tag: '🔥 Only 3 Available',
    note: 'Includes homepage pinning, unlimited team members, and highest visibility.'
  },
];

// Function to get pricing summary for job posts
export const getJobPostPricingSummary = (
  selectedPricingId: string,
  extras: Record<string, boolean> = {}
): { total: number; lineItems: Array<{ name: string; price: number }> } => {
  // Find the selected pricing option
  const selectedOption = jobPricingOptions.find(option => option.id === selectedPricingId);
  
  if (!selectedOption) {
    return {
      total: 0,
      lineItems: []
    };
  }

  // Start with the base pricing
  const lineItems = [
    {
      name: `${selectedOption.name} Job Posting`,
      price: selectedOption.price
    }
  ];

  // Add any extras (can be expanded in the future)
  Object.entries(extras).forEach(([key, isSelected]) => {
    if (isSelected) {
      switch (key) {
        case 'featuredPlacement':
          lineItems.push({
            name: 'Featured Placement Upgrade',
            price: 29.99
          });
          break;
        case 'extendedDuration':
          lineItems.push({
            name: 'Extended Duration (+14 days)',
            price: 14.99
          });
          break;
        case 'highlightedListing':
          lineItems.push({
            name: 'Highlighted Listing',
            price: 9.99
          });
          break;
        // Add more extras as needed
      }
    }
  });

  // Calculate total
  const total = lineItems.reduce((sum, item) => sum + item.price, 0);

  return {
    total,
    lineItems
  };
};
