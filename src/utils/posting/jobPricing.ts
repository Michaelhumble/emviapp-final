
import { UserPostingStats, PricingOptions } from "./types";

export const calculateJobPostPrice = (
  userStats: UserPostingStats,
  options: PricingOptions
): number => {
  // Renewals have a standard price
  if (options.isRenewal) {
    return options.isNationwide ? 25 : 20;
  }

  // First post is $5
  if (userStats.totalJobPosts === 0) {
    // If they want nationwide exposure, add $5
    return options.isNationwide ? 10 : 5;
  }
  
  // Second post is $10
  if (userStats.totalJobPosts === 1) {
    // If they want nationwide exposure, add $5
    return options.isNationwide ? 15 : 10;
  }
  
  // Base price after second post: $20
  let price = 20;
  
  // Discount if user has referred a friend
  if (userStats.referralCount >= 1) {
    price = 15;
  }
  
  // Add nationwide boost if requested
  if (options.isNationwide) {
    price += 5;
  }
  
  return price;
};

export const calculateSalonPostPrice = (
  userStats: UserPostingStats,
  options: PricingOptions
): number => {
  // First salon post is free
  if (userStats.totalSalonPosts === 0) {
    return 0;
  }
  
  // Salon listings start at $39 after first post
  let price = 39;
  
  // Featured listings cost more
  if (options.featuredPost) {
    price += 20;
  }
  
  // Fast sale package costs more
  if (options.fastSalePackage) {
    price += 30;
  }
  
  // Bundle discount if they have an active job post
  if (options.bundleWithJobPost) {
    price -= 10;
  }
  
  // Referral discount
  if (userStats.referralCount >= 1) {
    price -= 5;
  }
  
  return price;
};

export const calculateBoothPostPrice = (
  userStats: UserPostingStats,
  options: PricingOptions
): number => {
  // Booth rental listings start at $29
  let price = 29;
  
  // Featured listings cost more
  if (options.featuredPost) {
    price += 15;
  }
  
  // Show at top costs more
  if (options.showAtTop) {
    price += 10;
  }
  
  // Bundle discount if they have an active job post
  if (options.bundleWithJobPost) {
    price -= 5;
  }
  
  // Referral discount
  if (userStats.referralCount >= 1) {
    price -= 5;
  }
  
  return price;
};
