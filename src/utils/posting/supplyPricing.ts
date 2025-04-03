
import { UserPostingStats, PricingOptions } from "./types";

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
