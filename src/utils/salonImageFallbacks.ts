
/**
 * Enhanced salon fallback images with high-quality options
 */
const salonFallbackImages = {
  nail: '/images/fallback/nail-salon.jpg',
  hair: '/images/fallback/hair-salon.jpg',
  spa: '/images/fallback/spa.jpg',
  barber: '/images/fallback/barbershop.jpg',
  beauty: '/images/fallback/beauty-salon.jpg'
} as const;

// Enhanced high-quality fallback images (using Unsplash premium stock photos)
const enhancedFallbackImages = {
  nail: 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?q=80&w=1200&auto=format&fit=crop',
  hair: 'https://images.unsplash.com/photo-1633681926022-84c23e8cb3d6?q=80&w=1200&auto=format&fit=crop',
  spa: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop', 
  barber: 'https://images.unsplash.com/photo-1587909209111-5097ee578ec3?q=80&w=1200&auto=format&fit=crop',
  beauty: 'https://images.unsplash.com/photo-1613843351058-1dd06fccdc6a?q=80&w=1200&auto=format&fit=crop'
};

export type SalonCategory = keyof typeof salonFallbackImages;

/**
 * Gets the appropriate fallback image based on salon category.
 * Now returns high-quality images from Unsplash for better aesthetics.
 * 
 * @param category The salon category
 * @returns URL to the appropriate fallback image
 */
export const getDefaultSalonImage = (category: SalonCategory = 'beauty'): string => {
  return enhancedFallbackImages[category] || enhancedFallbackImages.beauty;
};

/**
 * Default fallback image for general salon images
 */
export const fallbackImage = enhancedFallbackImages.beauty;

/**
 * IMPORTANT: This file is part of the salon listings stabilization.
 * Do not modify the Vietnamese content or fallback image logic without explicit request.
 */
