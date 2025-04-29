
/**
 * Utility for managing salon image fallbacks based on business categories
 */

// Define valid salon categories
export type SalonCategory = 'nail' | 'hair' | 'barber' | 'spa' | 'beauty' | 'tattoo' | 'luxury';

// Check if an image is from our premium collection
export const isPremiumImage = (imagePath: string): boolean => {
  return false; // No images are premium now
};

// Get a random image from our collection based on category
export const getRandomCategoryImage = (category: SalonCategory): string => {
  return ''; // Return empty string to display no image
};

/**
 * Get a luxury salon image, optionally based on category
 * If no category is specified, returns a random luxury image
 */
export const getLuxurySalonImage = (category?: SalonCategory): string => {
  return ''; // Return empty string to display no image
};

// Get default salon image based on category
export const getDefaultSalonImage = (category: SalonCategory): string => {
  return ''; // Return empty string to display no image
};

// Get all images for a specific category (useful for displaying options)
export const getCategoryFallbackImages = (category: SalonCategory): string[] => {
  return []; // Return empty array as we've removed all images
};

// Determine if a salon is likely a nail salon based on description or name
export const isLikelyNailSalon = (description: string = '', name: string = ''): boolean => {
  const combinedText = (description + ' ' + name).toLowerCase();
  return combinedText.includes('nail') || 
         combinedText.includes('manicure') || 
         combinedText.includes('pedicure');
};

// Determine if a salon is likely a hair salon based on description or name
export const isLikelyHairSalon = (description: string = '', name: string = ''): boolean => {
  const combinedText = (description + ' ' + name).toLowerCase();
  return combinedText.includes('hair') || 
         combinedText.includes('stylist') || 
         combinedText.includes('coloring');
};

// Get the most appropriate image category based on textual description
export const determineSalonCategory = (description: string = '', name: string = ''): SalonCategory => {
  const combinedText = (description + ' ' + name).toLowerCase();
  
  if (combinedText.includes('nail') || combinedText.includes('manicure') || combinedText.includes('pedicure')) {
    return 'nail';
  } else if (combinedText.includes('barber') || combinedText.includes('men')) {
    return 'barber';
  } else if (combinedText.includes('hair') || combinedText.includes('stylist') || combinedText.includes('cut')) {
    return 'hair';
  } else if (combinedText.includes('spa') || combinedText.includes('massage') || combinedText.includes('facial')) {
    return 'spa';
  } else if (combinedText.includes('tattoo') || combinedText.includes('pmu') || combinedText.includes('permanent makeup')) {
    return 'tattoo';
  } else if (combinedText.includes('luxury') || combinedText.includes('premium') || combinedText.includes('high-end')) {
    return 'luxury';
  } else {
    return 'beauty';
  }
};
