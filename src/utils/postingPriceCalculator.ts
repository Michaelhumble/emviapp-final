
interface UserPostingStats {
  totalJobPosts: number;
  totalSalonPosts: number;
  totalBoothPosts: number;
  totalSupplyPosts: number;
  referralCount: number;
}

export interface PricingOptions {
  isNationwide?: boolean;
  isFirstPost?: boolean;
  hasActivePost?: boolean;
  bundleWithJobPost?: boolean;
  fastSalePackage?: boolean;
  isRenewal?: boolean;
  featuredPost?: boolean;
  showAtTop?: boolean;
}

export const calculateJobPostPrice = (
  userStats: UserPostingStats,
  options: PricingOptions
): number => {
  // Renewals have a standard price
  if (options.isRenewal) {
    return options.isNationwide ? 25 : 20;
  }

  // First post is free (local only) if card is added
  if (options.isFirstPost) {
    // If they want nationwide exposure, it's $5 even for first post
    return options.isNationwide ? 5 : 0;
  }
  
  // Base price after first post: $20
  let price = 20;
  
  // Discount if user has referred a friend
  if (userStats.referralCount >= 1) {
    price = 5;
  }
  
  // Add nationwide boost if requested
  if (options.isNationwide) {
    price += 5;
  }
  
  return price;
};

export const calculateSalonForSalePrice = (
  _userStats: UserPostingStats,
  options: PricingOptions
): number => {
  // Renewals have a standard price
  if (options.isRenewal) {
    return options.fastSalePackage ? 50 : (options.isNationwide ? 30 : 20);
  }

  // Base price
  let price = 20;
  
  // Nationwide boost
  if (options.isNationwide) {
    price += 10;
  }
  
  // Fast Sale Package
  if (options.fastSalePackage) {
    price = 50; // This replaces the base price + nationwide
  }
  
  return price;
};

export const calculateBoothRentalPrice = (
  _userStats: UserPostingStats,
  options: PricingOptions
): number => {
  // Renewals have a standard price
  if (options.isRenewal) {
    if (options.bundleWithJobPost) {
      return options.isNationwide ? 30 : 25;
    }
    return options.isNationwide ? 25 : 15;
  }

  // Base price
  let price = 15;
  
  // Show at top of feed
  if (options.showAtTop) {
    price += 10;
  }
  
  // Nationwide boost
  if (options.isNationwide) {
    price += 10;
  }
  
  // Bundle with job post
  if (options.bundleWithJobPost) {
    price = 25; // This is the combined price
    
    // Add nationwide boost if requested
    if (options.isNationwide) {
      price += 5;
    }
  }
  
  return price;
};

export const calculateSupplyPostPrice = (
  userStats: UserPostingStats,
  options: PricingOptions
): number => {
  // For renewals or not first post
  if (options.isRenewal || userStats.totalSupplyPosts > 0) {
    // Base price
    let price = 25;
    
    // Add nationwide boost if requested
    if (options.isNationwide) {
      price += 5;
    }
    
    return price;
  }
  
  // First post
  if (options.isFirstPost) {
    return options.isNationwide ? 5 : 0; // Free first local post, $5 for nationwide
  }
  
  return 25; // Base price
};

export const getRenewalPrice = (
  postType: 'job' | 'salon' | 'booth' | 'supply', 
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

// Utility function to calculate discount percentage based on original and discounted price
export const calculateDiscountPercentage = (originalPrice: number, discountedPrice: number): number => {
  if (originalPrice <= 0) return 0;
  const discountPercent = Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
  return discountPercent;
};

// Utility function to generate pricing promotional text
export const generatePromotionalText = (
  postType: 'job' | 'salon' | 'booth' | 'supply',
  userStats: UserPostingStats,
  options: PricingOptions
): string => {
  // First post with nationwide
  if (options.isFirstPost && options.isNationwide) {
    return "First post + nationwide visibility for just $5!";
  }
  
  // First post free
  if (options.isFirstPost && !options.isNationwide) {
    return "Your first post is FREE! Just add your payment method.";
  }
  
  // Referral discount for job posts
  if (postType === 'job' && userStats.referralCount >= 1 && !options.isRenewal) {
    return "Special price: $5 (75% off) — thanks for referring friends!";
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
        : "Increase your chances with nationwide visibility (+$10)";
    
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
