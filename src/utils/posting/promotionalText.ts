
import { PostType } from "./types";

// Get basic post price
export const getBasePrice = (postType: PostType, isFirstPost: boolean): number => {
  switch (postType) {
    case 'job':
      return isFirstPost ? 5 : 10;
    case 'salon':
    case 'booth':
      return isFirstPost ? 0 : 5;
    case 'supply':
      return isFirstPost ? 5 : 8;
    default:
      return 5;
  }
};

// Get nationwide add-on price
export const getNationwidePrice = (postType: PostType): number => {
  switch (postType) {
    case 'job':
      return 5;
    case 'salon':
    case 'booth':
      return 7;
    case 'supply':
      return 8;
    default:
      return 5;
  }
};

// Get renewal price
export const getRenewalPrice = (postType: PostType): number => {
  switch (postType) {
    case 'job':
      return 10;
    case 'salon':
    case 'booth':
      return 5;
    case 'supply':
      return 8;
    default:
      return 5;
  }
};

// Get fast sale package price
export const getFastSalePackagePrice = (postType: PostType): number => {
  switch (postType) {
    case 'job':
      return 3;
    case 'salon':
    case 'booth':
      return 3;
    case 'supply':
      return 4;
    default:
      return 3;
  }
};

// Get show at top price
export const getShowAtTopPrice = (postType: PostType): number => {
  switch (postType) {
    case 'job':
      return 2;
    case 'salon':
    case 'booth':
      return 2;
    case 'supply':
      return 3;
    default:
      return 2;
  }
};

// Get job post bundle price
export const getJobPostBundlePrice = (postType: PostType): number => {
  switch (postType) {
    case 'salon':
    case 'booth':
      return 4;
    default:
      return 0;
  }
};

// Get price with discount
export const getPriceWithDiscount = (originalPrice: number, hasReferrals: boolean): number => {
  if (hasReferrals) {
    // 20% discount for users with referrals
    return Math.max(1, originalPrice - Math.ceil(originalPrice * 0.2));
  }
  return originalPrice;
};

// Get promotional text for first post
export const getFirstPostPromotionalText = (postType: PostType): string => {
  switch (postType) {
    case 'job':
      return "Special offer: First job post only $5!";
    case 'salon':
    case 'booth':
      return "Special offer: First salon listing is FREE!";
    case 'supply':
      return "Special offer: First supply listing only $5!";
    default:
      return "Special offer for your first post!";
  }
};
