
import { UserPostingStats, PricingOptions } from "./types";

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
