
import { UserPostingStats, PricingOptions } from "./types";

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
