
import { UserProfile } from "@/context/auth/types";

interface BoostDiscountRules {
  isLaunchPhase: boolean;
  referralCount: number;
  bookingCount: number;
  milestoneReached: boolean;
}

export interface BoostPricing {
  standardPrice: number;
  currentPrice: number;
  discountPercentage: number;
  isDiscounted: boolean;
  discountReason: string;
  launchOffer: boolean;
  expiryDate?: Date;
  daysRemaining?: number;
}

// Constants for pricing strategy
const STANDARD_PRICE_PER_DAY = 5;
const LAUNCH_PRICE_PER_DAY = 1;
const REFERRAL_DISCOUNT_THRESHOLD = 3;
const BOOKING_DISCOUNT_THRESHOLD = 5;

// Launch phase expiry date (3 months from now)
const LAUNCH_PHASE_EXPIRY = new Date();
LAUNCH_PHASE_EXPIRY.setMonth(LAUNCH_PHASE_EXPIRY.getMonth() + 3);

/**
 * Determine if the user is in launch phase
 * This will be replaced with actual launch phase logic in production
 */
export const isInLaunchPhase = (): boolean => {
  return new Date() < LAUNCH_PHASE_EXPIRY;
};

/**
 * Calculate days remaining until the launch offer expires
 */
export const calculateDaysRemaining = (): number => {
  const today = new Date();
  const diffTime = LAUNCH_PHASE_EXPIRY.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * Calculate discount percentage
 */
export const calculateDiscountPercentage = (standardPrice: number, discountedPrice: number): number => {
  return Math.round(((standardPrice - discountedPrice) / standardPrice) * 100);
};

/**
 * Calculate salon boost pricing based on user profile and discount rules
 */
export const calculateBoostPricing = (
  userProfile?: UserProfile | null,
  discountRules?: Partial<BoostDiscountRules>
): BoostPricing => {
  // Default values
  const rules: BoostDiscountRules = {
    isLaunchPhase: isInLaunchPhase(),
    referralCount: userProfile?.referral_count || 0,
    bookingCount: userProfile?.booking_count || 0,
    milestoneReached: userProfile?.milestone_reached || false,
    ...discountRules
  };

  // Start with standard price
  let currentPrice = STANDARD_PRICE_PER_DAY;
  let discountReason = "";
  let launchOffer = false;

  // Apply discounts based on rules
  if (rules.isLaunchPhase) {
    currentPrice = LAUNCH_PRICE_PER_DAY;
    discountReason = "Launch special";
    launchOffer = true;
  } else if (rules.referralCount >= REFERRAL_DISCOUNT_THRESHOLD) {
    currentPrice = LAUNCH_PRICE_PER_DAY;
    discountReason = "Referral bonus";
  } else if (rules.bookingCount >= BOOKING_DISCOUNT_THRESHOLD) {
    currentPrice = LAUNCH_PRICE_PER_DAY;
    discountReason = "Booking milestone";
  } else if (rules.milestoneReached) {
    currentPrice = LAUNCH_PRICE_PER_DAY;
    discountReason = "Growth milestone";
  }

  const discountPercentage = calculateDiscountPercentage(STANDARD_PRICE_PER_DAY, currentPrice);
  const daysRemaining = rules.isLaunchPhase ? calculateDaysRemaining() : undefined;

  return {
    standardPrice: STANDARD_PRICE_PER_DAY,
    currentPrice,
    discountPercentage,
    isDiscounted: currentPrice < STANDARD_PRICE_PER_DAY,
    discountReason,
    launchOffer: launchOffer,
    expiryDate: rules.isLaunchPhase ? LAUNCH_PHASE_EXPIRY : undefined,
    daysRemaining
  };
};
