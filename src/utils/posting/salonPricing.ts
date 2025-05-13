
import { PricingOptions, UserPostingStats } from "./types";
import { 
  getBasePrice, 
  getNationwidePrice, 
  getFastSalePackagePrice, 
  getShowAtTopPrice,
  getJobPostBundlePrice,
  getPriceWithDiscount
} from "./promotionalText";

// Updated price map with more specific options
export const salonPriceMap = {
  free: null,
  standard_1mo: "price_STD_999",
  standard_3mo: "price_STD_2799",
  standard_6mo: "price_STD_4999",
  standard_autorenew: "price_STD_AUTO_949",
  gold_1mo: "price_GOLD_1999",
  premium_1mo: "price_PREMIUM_4999",
  diamond_3mo: "price_DIAMOND_49999",
  diamond_6mo: "price_DIAMOND_79999",
  diamond_1yr: "price_DIAMOND_99999",
};

export const getStripeSalonPriceId = (
  pricingTier: string,
  options: PricingOptions
): string | null => {
  if (pricingTier === 'free') {
    return null; // Free tier doesn't need a Stripe price ID
  }
  
  // Standard plan with auto-renew
  if (pricingTier === 'standard' && options.autoRenew) {
    return salonPriceMap.standard_autorenew;
  }
  
  // Duration-based pricing
  const durationMonths = options.durationMonths || 1;
  
  // Map pricing tier and duration to price ID
  if (pricingTier === 'standard') {
    if (durationMonths === 3) return salonPriceMap.standard_3mo;
    if (durationMonths === 6) return salonPriceMap.standard_6mo;
    return salonPriceMap.standard_1mo; // Default to 1 month
  }
  
  if (pricingTier === 'gold') {
    return salonPriceMap.gold_1mo;
  }
  
  if (pricingTier === 'premium') {
    return salonPriceMap.premium_1mo;
  }
  
  if (pricingTier === 'diamond') {
    if (durationMonths === 6) return salonPriceMap.diamond_6mo;
    if (durationMonths === 12) return salonPriceMap.diamond_1yr;
    return salonPriceMap.diamond_3mo; // Default to 3 months for diamond
  }
  
  // Default fallback
  return salonPriceMap.standard_1mo;
};

export const validateSalonPricingOptions = (
  pricingId: string,
  options: PricingOptions
): boolean => {
  // Free plan is always valid
  if (pricingId === 'free') {
    return true;
  }
  
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
  const stripePriceId = getStripeSalonPriceId(pricingId, options);
  if (pricingId !== 'free' && !stripePriceId) {
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
