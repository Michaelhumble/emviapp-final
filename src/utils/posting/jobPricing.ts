
import { JobPricingOption, JobPricingTier } from './types';

export const jobPricingOptions: JobPricingOption[] = [
  {
    id: 'free',
    name: 'Free Post',
    tier: 'basic' as JobPricingTier,
    price: 0,
    description: 'Great for casual hiring',
    features: [
      'Visible in Standard section',
      'No image',
      'Shows for 3 days',
      'Standard placement'
    ],
    duration: 3, // days
  },
  {
    id: 'standard',
    name: 'Standard',
    tier: 'premium' as JobPricingTier,
    price: 19.99,
    description: '3x more visibility',
    features: [
      'Includes image',
      'Visible for 2 weeks',
      'Listed in Gold section',
      'Better placement'
    ],
    duration: 14, // days
    popular: true
  },
  {
    id: 'premium',
    name: 'Premium',
    tier: 'featured' as JobPricingTier,
    price: 49.99,
    description: 'Best for urgent hiring',
    features: [
      'Pinned for 1 week',
      'Visible longer',
      'Shows on homepage',
      'Priority placement'
    ],
    duration: 30, // days
  },
  {
    id: 'diamond',
    name: 'Diamond Featured',
    tier: 'featured' as JobPricingTier,
    price: 999.99,
    description: 'Maximum trust & exposure',
    features: [
      'Top 3 spots',
      '1-year duration',
      'Only 3 available',
      'Premium placement'
    ],
    duration: 365, // days
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
