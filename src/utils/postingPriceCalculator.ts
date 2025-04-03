
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
  isRenewal?: boolean;
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

export const getRenewalPrice = (
  postType: 'job' | 'salon' | 'booth', 
  isNationwide: boolean, 
  fastSalePackage: boolean = false,
  bundleWithJobPost: boolean = false
): number => {
  // Create a mock stats object
  const mockStats: UserPostingStats = {
    totalJobPosts: 0,
    totalSalonPosts: 0,
    totalBoothPosts: 0,
    referralCount: 0
  };

  const options: PricingOptions = {
    isNationwide,
    isRenewal: true,
    fastSalePackage,
    bundleWithJobPost
  };

  switch (postType) {
    case 'job':
      return calculateJobPostPrice(mockStats, options);
    case 'salon':
      return calculateSalonForSalePrice(mockStats, options);
    case 'booth':
      return calculateBoothRentalPrice(mockStats, options);
    default:
      return 0;
  }
};
