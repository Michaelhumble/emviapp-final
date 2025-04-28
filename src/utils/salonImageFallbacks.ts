
const salonFallbackImages = {
  nail: '/images/fallback/nail-salon.jpg',
  hair: '/images/fallback/hair-salon.jpg',
  spa: '/images/fallback/spa.jpg',
  barber: '/images/fallback/barbershop.jpg',
  beauty: '/images/fallback/beauty-salon.jpg'
} as const;

export type SalonCategory = keyof typeof salonFallbackImages;

/**
 * Gets the appropriate fallback image based on salon category
 * @param category The salon category
 * @returns URL to the appropriate fallback image
 */
export const getDefaultSalonImage = (category: SalonCategory = 'beauty'): string => {
  return salonFallbackImages[category] || salonFallbackImages.beauty;
};

export const fallbackImage = salonFallbackImages.beauty;

/**
 * IMPORTANT: This file is locked as part of the salon listings stabilization.
 * Do not modify the Vietnamese content or fallback image logic without explicit request.
 */
