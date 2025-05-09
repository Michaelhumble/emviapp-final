import { PricingOptions, UserPostingStats } from "./types";
import { 
  getBasePrice, 
  getNationwidePrice, 
  getFastSalePackagePrice, 
  getShowAtTopPrice,
  getPriceWithDiscount
} from "./promotionalText";

export const calculateSupplyPostPrice = (options: PricingOptions, stats?: UserPostingStats): number => {
  // Default to first post if stats not provided
  const isFirstPost = options.isFirstPost ?? (stats ? stats?.supplyPostCount === 0 : true);
  const isRenewal = options.isRenewal ?? false;
  
  // Base price depends on whether it's the first post
  let price = isRenewal ? 8 : getBasePrice('supply', isFirstPost);
  
  // Add nationwide visibility if selected
  if (options.isNationwide) {
    price += getNationwidePrice('supply');
  }
  
  // Add fast sale package if selected
  if (options.fastSalePackage) {
    price += getFastSalePackagePrice('supply');
  }
  
  // Add show at top if selected
  if (options.showAtTop) {
    price += getShowAtTopPrice('supply');
  }
  
  // Apply discount if user has referrals
  if (options.hasReferrals) {
    price = getPriceWithDiscount(price, true);
  }
  
  return price;
};

export const getSupplyPostPricingSummary = (options: PricingOptions, stats?: UserPostingStats): string[] => {
  const isFirstPost = options.isFirstPost ?? (stats ? stats?.supplyPostCount === 0 : true);
  const isRenewal = options.isRenewal ?? false;
  
  const summary: string[] = [];
  
  // Base price line
  if (isRenewal) {
    summary.push(`Supply Listing Renewal: $8`);
  } else {
    const basePrice = getBasePrice('supply', isFirstPost);
    summary.push(`${isFirstPost ? "First" : "Standard"} Supply Listing: $${basePrice}`);
  }
  
  // Add nationwide visibility if selected
  if (options.isNationwide) {
    const nationwidePrice = getNationwidePrice('supply');
    summary.push(`Nationwide Visibility: +$${nationwidePrice}`);
  }
  
  // Add fast sale package if selected
  if (options.fastSalePackage) {
    const fastSalePrice = getFastSalePackagePrice('supply');
    summary.push(`Premium Promotion: +$${fastSalePrice}`);
  }
  
  // Add show at top if selected
  if (options.showAtTop) {
    const showAtTopPrice = getShowAtTopPrice('supply');
    summary.push(`Featured Placement: +$${showAtTopPrice}`);
  }
  
  // Show discount if applicable
  if (options.hasReferrals) {
    summary.push(`Referral Discount: -20%`);
  }
  
  // Total line
  const totalPrice = calculateSupplyPostPrice(options, stats);
  summary.push(`Total: $${totalPrice}`);
  
  return summary;
};
