
import { PricingOptions, UserPostingStats } from "./types";
import { 
  getBasePrice, 
  getNationwidePrice, 
  getFastSalePackagePrice, 
  getShowAtTopPrice,
  getPriceWithDiscount
} from "./promotionalText";

export const calculateJobPostPrice = (options: PricingOptions, stats?: UserPostingStats): number => {
  // Default to first post if stats not provided
  const isFirstPost = options.isFirstPost ?? (stats ? stats.jobPostCount === 0 : true);
  const isRenewal = options.isRenewal ?? false;
  
  // Base price depends on whether it's the first post
  let price = isRenewal ? 10 : getBasePrice('job', isFirstPost);
  
  // Add nationwide visibility if selected
  if (options.isNationwide) {
    price += getNationwidePrice('job');
  }
  
  // Add fast sale package if selected
  if (options.fastSalePackage) {
    price += getFastSalePackagePrice('job');
  }
  
  // Add show at top if selected
  if (options.showAtTop || options.featuredPost) {
    price += getShowAtTopPrice('job');
  }
  
  // Apply discount if user has referrals
  if (options.hasReferrals) {
    price = getPriceWithDiscount(price, true);
  }
  
  return price;
};

export const getJobPostPricingSummary = (options: PricingOptions, stats?: UserPostingStats): string[] => {
  const isFirstPost = options.isFirstPost ?? (stats ? stats.jobPostCount === 0 : true);
  const isRenewal = options.isRenewal ?? false;
  
  const summary: string[] = [];
  
  // Base price line
  if (isRenewal) {
    summary.push(`Job Post Renewal: $10`);
  } else {
    const basePrice = getBasePrice('job', isFirstPost);
    summary.push(`${isFirstPost ? "First" : "Standard"} Job Post: $${basePrice}`);
  }
  
  // Add nationwide visibility if selected
  if (options.isNationwide) {
    const nationwidePrice = getNationwidePrice('job');
    summary.push(`Nationwide Visibility: +$${nationwidePrice}`);
  }
  
  // Add fast sale package if selected
  if (options.fastSalePackage) {
    const fastSalePrice = getFastSalePackagePrice('job');
    summary.push(`Fast Sale Package: +$${fastSalePrice}`);
  }
  
  // Add show at top if selected
  if (options.showAtTop || options.featuredPost) {
    const showAtTopPrice = getShowAtTopPrice('job');
    summary.push(`Featured Placement: +$${showAtTopPrice}`);
  }
  
  // Show discount if applicable
  if (options.hasReferrals) {
    summary.push(`Referral Discount: -20%`);
  }
  
  // Total line
  const totalPrice = calculateJobPostPrice(options, stats);
  summary.push(`Total: $${totalPrice}`);
  
  return summary;
};
