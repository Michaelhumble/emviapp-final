import { PricingOptions, UserPostingStats } from "./types";
import { 
  getBasePrice, 
  getNationwidePrice, 
  getFastSalePackagePrice, 
  getShowAtTopPrice,
  getJobPostBundlePrice,
  getPriceWithDiscount
} from "./promotionalText";

// Similar to job pricing map
export const salonPriceMap = {
  free: null,
  standard: "price_XXX_SALON_STANDARD_999",
  standardAutoRenew: "price_XXX_SALON_STANDARD_AUTO_949",
  premium: "price_XXX_SALON_PREMIUM_4999",
  featured: "price_XXX_SALON_FEATURED_1999"
};

export const getStripeSalonPriceId = (
  pricingId: string,
  options: PricingOptions
): string | null => {
  if (pricingId === 'free') {
    return null; // Free tier doesn't need a Stripe price ID
  }
  
  // Standard plan with auto-renew
  if (pricingId === 'standard' && options.autoRenew) {
    return salonPriceMap.standardAutoRenew;
  }
  
  // Other plans
  switch (pricingId) {
    case 'standard': return salonPriceMap.standard;
    case 'premium': return salonPriceMap.premium;
    case 'featured': return salonPriceMap.featured;
    default: return salonPriceMap.standard; // Default fallback
  }
};

export const validateSalonPricingOptions = (
  pricingId: string,
  options: PricingOptions
): boolean => {
  // Ensure we have a valid pricing ID
  if (!pricingId) {
    console.error("No pricing tier selected");
    return false;
  }
  
  // Ensure we have a duration for non-free plans
  if (pricingId !== 'free' && !options.durationMonths) {
    console.error("No duration selected for paid plan");
    return false;
  }
  
  // Ensure we have a valid Stripe price ID for non-free plans
  if (pricingId !== 'free' && !getStripeSalonPriceId(pricingId, options)) {
    console.error("Failed to get valid Stripe price ID", { pricingId, options });
    return false;
  }
  
  return true;
};

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
