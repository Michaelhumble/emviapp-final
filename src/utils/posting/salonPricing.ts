
import { PricingOptions, UserPostingStats } from "./types";
import { 
  getBasePrice, 
  getNationwidePrice, 
  getFastSalePackagePrice, 
  getShowAtTopPrice,
  getJobPostBundlePrice,
  getPriceWithDiscount
} from "./promotionalText";

export const salonPricingOptions = [
  {
    id: 'free',
    name: '🎁 Free Post',
    tier: 'basic',
    price: 0,
    wasPrice: 9.99,
    description: 'Simple & quick post. Limited reach.',
    vietnameseDescription: 'Tin đơn giản – Không có hình ảnh',
    features: [
      '📄 Listed in standard row',
      '⏳ Expires in 30 days',
      '🚫 No image or contact shown'
    ],
    duration: 30, // days
    tag: '⚪ Was $9.99 – Now Free!'
  },
  {
    id: 'standard',
    name: '✅ Standard',
    tier: 'premium',
    price: 19.99,
    wasPrice: 39.99,
    description: 'Full listing with contact info.',
    vietnameseDescription: 'Hiển thị đầy đủ với hình ảnh + số điện thoại',
    features: [
      '🖼️ Show images',
      '📞 Show contact info',
      '🪙 Premium row placement'
    ],
    duration: 30, // days
    tag: '🟢 Save 50% – Limited Time'
  },
  {
    id: 'featured',
    name: '🏆 Featured',
    tier: 'featured',
    price: 49.99,
    wasPrice: 89.99,
    description: 'Top visibility for salon owners.',
    vietnameseDescription: 'Hiển thị nổi bật – Khách thấy dễ hơn',
    features: [
      '👑 Highlighted in Gold',
      '🔍 Search priority',
      '📅 30-day display'
    ],
    duration: 30, // days
    popular: true,
    tag: '🟡 Best Value'
  },
  {
    id: 'premium',
    name: '✨ Premium',
    tier: 'featured',
    price: 99.99,
    wasPrice: 149.99,
    description: 'Maximum exposure for your salon.',
    vietnameseDescription: 'Ưu tiên trên trang chính – Khách thấy bạn đầu tiên',
    features: [
      '📌 Homepage pinning',
      '📈 Top visibility',
      '💬 VIP support'
    ],
    duration: 30, // days
    tag: '🟠 Most Exposure'
  }
];

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
