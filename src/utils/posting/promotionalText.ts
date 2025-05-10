
// Utility functions for generating promotional text and pricing

// Base price based on post type and whether it's a first post
export const getBasePrice = (postType: 'job' | 'salon', isFirstPost: boolean): number => {
  switch (postType) {
    case 'job':
      return isFirstPost ? 9.99 : 19.99;
    case 'salon':
      return isFirstPost ? 19.99 : 29.99;
    default:
      return 9.99;
  }
};

// Get price for nationwide visibility
export const getNationwidePrice = (postType: 'job' | 'salon' | 'booth' | 'supply'): number => {
  switch (postType) {
    case 'job': return 5;
    case 'salon': return 10;
    case 'booth': return 10;
    case 'supply': return 5;
    default: return 5;
  }
};

// Get price for fast sale package
export const getFastSalePackagePrice = (postType: 'job' | 'salon' | 'booth' | 'supply'): number => {
  switch (postType) {
    case 'job': return 15;
    case 'salon': return 20;
    case 'booth': return 15;
    case 'supply': return 10;
    default: return 15;
  }
};

// Get price for showing at top
export const getShowAtTopPrice = (postType: 'job' | 'salon' | 'booth' | 'supply'): number => {
  switch (postType) {
    case 'job': return 10;
    case 'salon': return 15;
    case 'booth': return 15;
    case 'supply': return 10;
    default: return 10;
  }
};

// Get price for bundling with job post
export const getJobPostBundlePrice = (postType: 'salon' | 'booth' | 'supply'): number => {
  switch (postType) {
    case 'salon': return 15;
    case 'booth': return 10;
    case 'supply': return 8;
    default: return 15;
  }
};

// Get price with discount applied
export const getPriceWithDiscount = (price: number, hasReferrals: boolean): number => {
  if (hasReferrals) {
    return price * 0.8; // 20% discount
  }
  return price;
};

// Generate promotional text for different post types and options
export const generatePromotionalText = (postType: string): string => {
  switch (postType) {
    case 'job':
      return 'Post your job opportunity and reach qualified candidates today!';
    case 'salon':
      return 'Showcase your salon and attract new customers with a premium listing!';
    case 'booth':
      return 'Find the perfect booth renter with a targeted booth listing!';
    case 'supply':
      return 'Sell your supplies to professionals in the beauty industry!';
    default:
      return 'Post your listing and reach your target audience today!';
  }
};
