
/**
 * Enhanced salon fallback images with high-quality options
 */
import { defaultSalonImages, getDefaultSalonImage as getDefaultImage } from './defaultSalonImages';

const salonFallbackImages = {
  nail: '/lovable-uploads/70c8662a-4525-4854-a529-62616b5b6c81.png',
  hair: '/lovable-uploads/4a455b85-c040-4be5-9557-b1e3b0040bf4.png',
  spa: '/lovable-uploads/5f8eaed6-4a17-4992-a270-6394aad0f43b.png',
  barber: '/lovable-uploads/755e1db4-6ea5-40c4-8007-81b8beba6e2b.png',
  beauty: '/lovable-uploads/f7ba1d82-2928-4e73-a61b-112e5aaf5b7e.png'
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
export const fallbackImage = '/lovable-uploads/70c8662a-4525-4854-a529-62616b5b6c81.png';

/**
 * IMPORTANT: This file is part of the salon listings stabilization.
 * Do not modify the Vietnamese content or fallback image logic without explicit request.
 */
