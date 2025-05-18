
import { PostType } from './types';

// Helper function to get base price based on post type and first post status
export const getBasePrice = (postType: PostType, isFirstPost: boolean): number => {
  if (isFirstPost) {
    return 0; // Free for first post
  }
  
  switch (postType) {
    case 'job': return 9.99;
    case 'salon': return 19.99;
    case 'booth': return 14.99;
    case 'supply': return 7.99;
    default: return 9.99;
  }
};

// Helper function to get nationwide price based on post type
export const getNationwidePrice = (postType: PostType): number => {
  switch (postType) {
    case 'job': return 5;
    case 'salon': return 10;
    case 'booth': return 10;
    case 'supply': return 5;
    default: return 5;
  }
};

// Helper function to get fast sale package price based on post type
export const getFastSalePackagePrice = (postType: PostType): number => {
  switch (postType) {
    case 'job': return 15;
    case 'salon': return 20;
    case 'booth': return 15;
    case 'supply': return 10;
    default: return 15;
  }
};

// Helper function to get show at top price based on post type
export const getShowAtTopPrice = (postType: PostType): number => {
  switch (postType) {
    case 'job': return 10;
    case 'salon': return 15;
    case 'booth': return 10;
    case 'supply': return 7;
    default: return 10;
  }
};

// Helper function to get job post bundle price based on post type
export const getJobPostBundlePrice = (postType: PostType): number => {
  return 15;
};

// Helper function to get price with discount
export const getPriceWithDiscount = (price: number, hasReferral: boolean): number => {
  if (hasReferral) {
    return price * 0.8; // 20% discount for referrals
  }
  return price;
};

// Generate promotional text for a specific post type
export const generatePromotionalText = (postType: PostType): string => {
  switch (postType) {
    case 'job':
      return 'Reach qualified candidates faster with our premium job listing options';
    case 'salon':
      return 'Showcase your salon to potential buyers with enhanced visibility options';
    case 'booth':
      return 'Get your booth rental seen by more stylists with our promotional packages';
    case 'supply':
      return 'Connect with more buyers for your supplies with enhanced visibility';
    default:
      return 'Boost your listing visibility with our premium options';
  }
};

// Helper function to get promotional pricing text
export const getPromotionalPricingText = (postType: PostType, isFirstPost: boolean): string => {
  if (isFirstPost) {
    return 'First listing free! Upgrade for more visibility.';
  }
  
  switch (postType) {
    case 'job':
      return 'Standard job listing: $9.99/month. Premium options available.';
    case 'salon':
      return 'Standard salon listing: $19.99/month. Feature your salon for faster sale.';
    case 'booth':
      return 'Standard booth rental listing: $14.99/month. Attract quality stylists faster.';
    case 'supply':
      return 'Standard supply listing: $7.99/month. Reach more potential buyers.';
    default:
      return 'Standard listing starts at $9.99/month. Premium options available.';
  }
};
