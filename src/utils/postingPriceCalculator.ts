
interface UserPostingStats {
  totalJobPosts: number;
  totalSalonPosts: number;
  totalBoothPosts: number;
  referralCount: number;
}

export interface PricingOptions {
  isNationwide?: boolean;
  isFirstPost?: boolean;
  hasActivePost?: boolean;
  bundleWithJobPost?: boolean;
  fastSalePackage?: boolean;
}

export const calculateJobPostPrice = (
  userStats: UserPostingStats,
  options: PricingOptions
): number => {
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
  // Base price
  let price = 15;
  
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
