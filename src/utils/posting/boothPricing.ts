
import { UserPostingStats, PricingOptions } from "./types";

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
