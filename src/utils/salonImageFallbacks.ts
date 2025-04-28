
/**
 * Enhanced salon fallback images with high-quality options
 */
import { defaultSalonImages, getDefaultSalonImage as getDefaultImage } from './defaultSalonImages';

const salonFallbackImages = {
  nail: '/images/fallback/nail-salon.jpg',
  hair: '/images/fallback/hair-salon.jpg',
  spa: '/images/fallback/spa.jpg',
  barber: '/images/fallback/barbershop.jpg',
  beauty: '/images/fallback/beauty-salon.jpg'
} as const;

export type SalonCategory = keyof typeof salonFallbackImages;

/**
 * Gets the appropriate fallback image based on salon category.
 * Now returns high-quality images from our default image library.
 * 
 * @param category The salon category
 * @returns URL to the appropriate fallback image
 */
export const getDefaultSalonImage = (category: SalonCategory = 'beauty'): string => {
  return getDefaultImage(category);
};

/**
 * Default fallback image for general salon images
 */
export const fallbackImage = defaultSalonImages[0];

/**
 * IMPORTANT: This file is part of the salon listings stabilization.
 * Do not modify the Vietnamese content or fallback image logic without explicit request.
 */
