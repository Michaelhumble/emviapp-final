
import { UserPostingStats, PricingOptions, PostType } from "./types";

// Utility function to calculate discount percentage based on original and discounted price
export const calculateDiscountPercentage = (originalPrice: number, discountedPrice: number): number => {
  if (originalPrice <= 0) return 0;
  const discountPercent = Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
  return discountPercent;
};

// Utility function to generate pricing promotional text
export const generatePromotionalText = (
  postType: PostType,
  userStats: UserPostingStats,
  options: PricingOptions
): string => {
  // First post with nationwide
  if (options.isFirstPost && options.isNationwide) {
    return "First post + nationwide visibility for just $10!";
  }
  
  // First post free
  if (options.isFirstPost && !options.isNationwide) {
    return "Your first post is only $5! Just add your payment method.";
  }
  
  // Referral discount for job posts
  if (postType === 'job' && userStats.referralCount >= 1 && !options.isRenewal) {
    return "Special price: $15 (25% off) — thanks for referring friends!";
  }
  
  // Renewal
  if (options.isRenewal) {
    return "Renew your listing to keep it visible for another 30 days.";
  }
  
  // Standard posts
  switch (postType) {
    case 'salon':
      if (options.fastSalePackage) {
        return "Premium listing package: Get featured at the top with priority visibility!";
      }
      return options.isNationwide 
        ? "Nationwide visibility will help you find buyers faster!" 
        : "Increase your chances with nationwide visibility (+$5)";
    
    case 'booth':
      return options.showAtTop 
        ? "Your booth will be shown at the top of search results!" 
        : "Get more visibility by showing at the top of results (+$10)";
        
    case 'supply':
      return "Reach more salon owners and increase your product visibility!";
      
    default:
      return "Post your listing today!";
  }
};

// Function to calculate renewal price
export const getRenewalPrice = (
  postType: 'job' | 'salon' | 'booth',
  isNationwide: boolean,
  fastSalePackage: boolean = false,
  bundleWithJobPost: boolean = false
): number => {
  switch (postType) {
    case 'job':
      return isNationwide ? 25 : 20;
    case 'salon':
      let price = 39;
      if (fastSalePackage) price += 10;
      if (isNationwide) price += 5;
      if (bundleWithJobPost) price -= 5;
      return price;
    case 'booth':
      let boothPrice = 29;
      if (isNationwide) boothPrice += 5;
      if (bundleWithJobPost) boothPrice -= 5;
      return boothPrice;
    default:
      return 20;
  }
};
