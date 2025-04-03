
import { UserPostingStats, PricingOptions, PostType } from './types';
import { calculateJobPostPrice } from './jobPricing';
import { calculateSalonForSalePrice } from './salonPricing';
import { calculateBoothRentalPrice } from './boothPricing';
import { calculateSupplyPostPrice } from './supplyPricing';
import { calculateDiscountPercentage, generatePromotionalText } from './promotionalText';

// Export all types
export type { UserPostingStats, PricingOptions, PostType };

// Calculate renewal price for any post type
export const getRenewalPrice = (
  postType: PostType, 
  isNationwide: boolean, 
  fastSalePackage: boolean = false,
  bundleWithJobPost: boolean = false,
  showAtTop: boolean = false
): number => {
  // Create a mock stats object
  const mockStats: UserPostingStats = {
    totalJobPosts: 0,
    totalSalonPosts: 0,
    totalBoothPosts: 0,
    totalSupplyPosts: 0,
    referralCount: 0
  };

  const options: PricingOptions = {
    isNationwide,
    isRenewal: true,
    fastSalePackage,
    bundleWithJobPost,
    showAtTop
  };

  switch (postType) {
    case 'job':
      return calculateJobPostPrice(mockStats, options);
    case 'salon':
      return calculateSalonForSalePrice(mockStats, options);
    case 'booth':
      return calculateBoothRentalPrice(mockStats, options);
    case 'supply':
      return calculateSupplyPostPrice(mockStats, options);
    default:
      return 0;
  }
};

// Re-export all individual calculation functions
export {
  calculateJobPostPrice,
  calculateSalonForSalePrice,
  calculateBoothRentalPrice,
  calculateSupplyPostPrice,
  calculateDiscountPercentage,
  generatePromotionalText
};
