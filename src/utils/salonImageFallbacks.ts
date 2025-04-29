
/**
 * Enhanced salon fallback images with high-quality external URLs
 */
const salonFallbackImages = {
  nail: '/images/fallback/nail-salon.jpg',
  hair: '/images/fallback/hair-salon.jpg',
  spa: '/images/fallback/spa.jpg',
  barber: '/images/fallback/barbershop.jpg',
  beauty: '/images/fallback/beauty-salon.jpg'
} as const;

// Curated external high-quality fallback images
const enhancedFallbackImages = {
  // Nail salon images
  nail: [
    'https://i.imgur.com/xnfXgKK.jpg',
    'https://i.imgur.com/1M3AdLY.jpg',
    'https://i.imgur.com/lG6LfrB.jpg',
  ],
  // Hair salon images
  hair: [
    'https://i.imgur.com/2SE0sie.jpg',
    'https://i.imgur.com/kdCXOkc.jpg',
    'https://i.imgur.com/KsRm2La.jpg',
  ],
  // Spa images
  spa: [
    'https://i.imgur.com/UsZkxYd.jpg',
    'https://i.imgur.com/wVQ2tl8.jpg',
    'https://i.imgur.com/cDOfyQ4.jpg',
  ],
  // Barbershop images
  barber: [
    'https://i.imgur.com/tUb7dCY.jpg',
    'https://i.imgur.com/mlDHNI0.jpg',
    'https://i.imgur.com/8DfOgfr.jpg',
  ],
  // Beauty salon images
  beauty: [
    'https://i.imgur.com/1PdtpmZ.jpg',
    'https://i.imgur.com/kk7SYha.jpg',
    'https://i.imgur.com/u2PZSPG.jpg',
  ],
};

export type SalonCategory = keyof typeof salonFallbackImages;

/**
 * Gets a random image from the category's collection
 * 
 * @param collection Array of image URLs
 * @returns A randomly selected URL
 */
const getRandomImage = (collection: string[]): string => {
  const randomIndex = Math.floor(Math.random() * collection.length);
  return collection[randomIndex];
};

/**
 * Gets the appropriate fallback image based on salon category.
 * Returns a high-quality image from our curated external collection.
 * 
 * @param category The salon category
 * @returns URL to the appropriate fallback image
 */
export const getDefaultSalonImage = (category: SalonCategory = 'beauty'): string => {
  const imageCollection = enhancedFallbackImages[category] || enhancedFallbackImages.beauty;
  return getRandomImage(imageCollection);
};

/**
 * Default fallback image for general salon images
 * Each time this is called, it returns a different random beauty salon image
 */
export const fallbackImage = (): string => {
  return getRandomImage(enhancedFallbackImages.beauty);
};

/**
 * Get all available fallback images for a specific category
 * Useful for allowing selection from available options
 * 
 * @param category The salon category
 * @returns Array of image URLs for the category
 */
export const getCategoryFallbackImages = (category: SalonCategory = 'beauty'): string[] => {
  return enhancedFallbackImages[category] || enhancedFallbackImages.beauty;
};

/**
 * Get all available fallback images across all categories
 * Useful for displaying a gallery of options
 */
export const getAllFallbackImages = (): Record<SalonCategory, string[]> => {
  return enhancedFallbackImages;
};
