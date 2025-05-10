
import { PricingOptions, UserPostingStats } from "./types";
import { 
  getBasePrice, 
  getNationwidePrice, 
  getFastSalePackagePrice, 
  getShowAtTopPrice,
  getJobPostBundlePrice,
  getPriceWithDiscount
} from "./promotionalText";

export const calculateSalonPostPrice = (options: PricingOptions, stats?: UserPostingStats): number => {
  // Default to first post if stats not provided
  const isFirstPost = options.isFirstPost ?? (stats ? stats.salonPostCount === 0 : true);
  const isRenewal = options.isRenewal ?? false;
  
  // Base price depends on whether it's the first post
  let price = isRenewal ? 5 : getBasePrice('salon', isFirstPost);
  
  // Add nationwide visibility if selected
  if (options.isNationwide) {
    price += getNationwidePrice('salon');
  }
  
  // Add fast sale package if selected
  if (options.fastSalePackage) {
    price += getFastSalePackagePrice('salon');
  }
  
  // Add show at top if selected
  if (options.showAtTop) {
    price += getShowAtTopPrice('salon');
  }
  
  // Add job post bundle if selected
  if (options.bundleWithJobPost) {
    price += getJobPostBundlePrice('salon');
  }
  
  // Apply discount if user has referrals
  if (options.hasReferrals) {
    price = getPriceWithDiscount(price, true);
  }
  
  return price;
};

export const getSalonPostPricingSummary = (options: PricingOptions, stats?: UserPostingStats): string[] => {
  const isFirstPost = options.isFirstPost ?? (stats ? stats.salonPostCount === 0 : true);
  const isRenewal = options.isRenewal ?? false;
  
  const summary: string[] = [];
  
  // Base price line
  if (isRenewal) {
    summary.push(`Salon Listing Renewal: $5`);
  } else {
    const basePrice = getBasePrice('salon', isFirstPost);
    summary.push(`${isFirstPost ? "First" : "Standard"} Salon Listing: $${basePrice}`);
  }
  
  // Add nationwide visibility if selected
  if (options.isNationwide) {
    const nationwidePrice = getNationwidePrice('salon');
    summary.push(`Nationwide Visibility: +$${nationwidePrice}`);
  }
  
  // Add fast sale package if selected
  if (options.fastSalePackage) {
    const fastSalePrice = getFastSalePackagePrice('salon');
    summary.push(`Premium Promotion: +$${fastSalePrice}`);
  }
  
  // Add show at top if selected
  if (options.showAtTop) {
    const showAtTopPrice = getShowAtTopPrice('salon');
    summary.push(`Featured Placement: +$${showAtTopPrice}`);
  }
  
  // Add job post bundle if selected
  if (options.bundleWithJobPost) {
    const jobBundlePrice = getJobPostBundlePrice('salon');
    summary.push(`Job Post Bundle: +$${jobBundlePrice}`);
  }
  
  // Show discount if applicable
  if (options.hasReferrals) {
    summary.push(`Referral Discount: -20%`);
  }
  
  // Total line
  const totalPrice = calculateSalonPostPrice(options, stats);
  summary.push(`Total: $${totalPrice}`);
  
  return summary;
};
