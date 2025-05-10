
import { PostType } from './types';

export const getBasePrice = (postType: PostType, isFirstPost: boolean): number => {
  if (isFirstPost) {
    return postType === 'job' ? 9.99 : 19.99;
  }
  return postType === 'job' ? 19.99 : 29.99;
};

export const getNationwidePrice = (postType: PostType): number => {
  return postType === 'job' ? 15 : 25;
};

export const getFastSalePackagePrice = (postType: PostType): number => {
  return postType === 'job' ? 9.99 : 14.99;
};

export const getShowAtTopPrice = (postType: PostType): number => {
  return postType === 'job' ? 19.99 : 29.99;
};

export const getJobPostBundlePrice = (postType: PostType): number => {
  return postType === 'salon' ? 14.99 : 0;
};

export const getSalonPostBundlePrice = (postType: PostType): number => {
  return postType === 'job' ? 14.99 : 0;
};

export const getPriceWithDiscount = (price: number, hasReferrals: boolean): number => {
  if (!hasReferrals) return price;
  
  // Apply 20% discount for users with referrals
  return price * 0.8;
};

// Add missing functions that are being referenced in other files
export const getRenewalPrice = (postType: PostType, isFirstRenewal: boolean): number => {
  if (isFirstRenewal) {
    return postType === 'job' ? 14.99 : 24.99;
  }
  return postType === 'job' ? 19.99 : 29.99;
};

export const generatePromotionalText = (postType: PostType, isFirstPost: boolean): string => {
  if (isFirstPost) {
    return postType === 'job' 
      ? "First job post discount - save 50%!" 
      : "First salon post discount - save 33%!";
  }
  return "";
};

export const getFirstPostPromotionalText = (postType: PostType): string => {
  return postType === 'job' 
    ? "First-time posters save 50%!" 
    : "First-time posters save 33%!";
};
