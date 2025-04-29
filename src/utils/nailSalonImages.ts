
/**
 * Specialized utility for managing high-quality nail salon images
 * These images are protected and should only be changed manually when specifically instructed
 */

// Define path constants for the uploaded nail salon images
const NAIL_SALON_IMAGES = {
  // Main featured images
  luxury: "/nail-salon-luxury.jpg", 
  premium1: "/nail-salon-premium1.jpg", 
  premium2: "/nail-salon-premium2.jpg", 
  modern1: "/nail-salon-modern1.jpg", 
  modern2: "/nail-salon-modern2.jpg", 
  professional: "/nail-salon-professional.jpg", 
  elegantWhite: "/nail-salon-elegant-white.jpg", 
  vip: "/nail-salon-vip.jpg", 
  retail: "/nail-salon-retail.jpg", 
  workstation: "/nail-salon-workstation.jpg", 
  luxuryLounge: "/nail-salon-luxury-lounge.jpg", 
};

/**
 * Returns an appropriate nail salon image based on the salon's characteristics
 * @param isVietnamese Whether the salon is Vietnamese-owned or Vietnamese-themed
 * @param isLuxury Whether the salon is positioned as a luxury establishment
 * @param isPremium Whether the salon is positioned as a premium establishment
 */
export const getNailSalonImage = (
  isVietnamese: boolean = false, 
  isLuxury: boolean = false,
  isPremium: boolean = false
): string => {
  // Prioritize image selection based on salon characteristics
  if (isLuxury) {
    return NAIL_SALON_IMAGES.luxury;
  } else if (isPremium) {
    // Alternate between premium images for variety
    return Math.random() > 0.5 ? NAIL_SALON_IMAGES.premium1 : NAIL_SALON_IMAGES.premium2;
  } else if (isVietnamese) {
    // Use more modern designs for Vietnamese listings
    return Math.random() > 0.5 ? NAIL_SALON_IMAGES.modern1 : NAIL_SALON_IMAGES.modern2;
  } else {
    // For other general nail salons, use a variety of images
    const options = [
      NAIL_SALON_IMAGES.professional,
      NAIL_SALON_IMAGES.elegantWhite,
      NAIL_SALON_IMAGES.retail,
      NAIL_SALON_IMAGES.workstation
    ];
    
    return options[Math.floor(Math.random() * options.length)];
  }
};

/**
 * Get nail salon image for a VIP/luxury booth rental
 */
export const getNailBoothImage = (): string => {
  return NAIL_SALON_IMAGES.vip;
};

/**
 * Get nail salon image for a job listing
 */
export const getNailJobImage = (): string => {
  return NAIL_SALON_IMAGES.luxuryLounge;
};

/**
 * Gets a specific nail salon image by key
 */
export const getNailImageByKey = (key: keyof typeof NAIL_SALON_IMAGES): string => {
  return NAIL_SALON_IMAGES[key] || NAIL_SALON_IMAGES.professional;
};

/**
 * Gets all available nail salon images
 */
export const getAllNailImages = (): string[] => {
  return Object.values(NAIL_SALON_IMAGES);
};

/**
 * Determines if a salon is likely a nail salon based on name or description
 */
export const isNailSalon = (name: string = '', description: string = ''): boolean => {
  const combinedText = (name + ' ' + description).toLowerCase();
  return combinedText.includes('nail') || 
         combinedText.includes('manicure') || 
         combinedText.includes('pedicure') ||
         combinedText.includes('nails');
};

/**
 * Determines if a job is likely a nail technician position based on title or description
 */
export const isNailJob = (title: string = '', description: string = ''): boolean => {
  const combinedText = (title + ' ' + description).toLowerCase();
  return combinedText.includes('nail') || 
         combinedText.includes('manicure') || 
         combinedText.includes('pedicure') ||
         combinedText.includes('nail tech') ||
         combinedText.includes('nail salon');
};
