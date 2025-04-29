
/**
 * Specialized utility for managing high-quality nail salon images
 * These images are protected and should only be changed manually when specifically instructed
 */

// Define path constants for the uploaded nail salon images
const NAIL_SALON_IMAGES = {
  // Main featured images - using your uploaded images
  luxury: "/lovable-uploads/e6f2407e-4402-42a5-b1eb-28761419c0cb.png", // Luxury nail salon with elegant displays
  premium1: "/lovable-uploads/72875e23-d749-4521-989d-4ff82423de01.png", // Premium nail salon setup
  premium2: "/lovable-uploads/3ef97ce8-eb62-44e0-842c-d10c54d23d81.png", // Another premium nail salon view
  modern1: "/lovable-uploads/41732c75-4b6f-4629-8848-cdca464f4f6d.png", // Modern nail salon design
  modern2: "/lovable-uploads/6fb96978-d78d-40c5-9ab7-59790e7d5e2d.png", // Another modern nail salon view
  professional: "/lovable-uploads/9bdbde32-0578-4964-a428-25155aa09bca.png", // Professional nail salon setting
  elegantWhite: "/lovable-uploads/2e44e40e-0338-42f9-add6-97d40eada906.png", // Elegant white-themed nail salon
  vip: "/lovable-uploads/df6670ab-0854-4472-b6db-0c0e9c578a0f.png", // VIP nail salon experience
  retail: "/lovable-uploads/4a4cb1e0-ae11-44c9-8c18-f77c351f9b18.png", // Nail salon with retail display
  workstation: "/lovable-uploads/b6193e3c-9320-4f9f-8cd8-c794545bf86e.png", // Close-up of nail salon workstation
  luxuryLounge: "/lovable-uploads/c980bff9-c395-42ac-aa18-3f4784c9bc6d.png", // Luxury nail salon lounge area
};

// Fallback image in case uploads fail
const FALLBACK_IMAGE = "/lovable-uploads/e6f2407e-4402-42a5-b1eb-28761419c0cb.png";

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
    return NAIL_SALON_IMAGES.luxury || FALLBACK_IMAGE;
  } else if (isPremium) {
    // Alternate between premium images for variety
    return Math.random() > 0.5 ? 
      (NAIL_SALON_IMAGES.premium1 || FALLBACK_IMAGE) : 
      (NAIL_SALON_IMAGES.premium2 || FALLBACK_IMAGE);
  } else if (isVietnamese) {
    // Use more modern designs for Vietnamese listings
    return Math.random() > 0.5 ? 
      (NAIL_SALON_IMAGES.modern1 || FALLBACK_IMAGE) : 
      (NAIL_SALON_IMAGES.modern2 || FALLBACK_IMAGE);
  } else {
    // For other general nail salons, use a variety of images
    const options = [
      NAIL_SALON_IMAGES.professional,
      NAIL_SALON_IMAGES.elegantWhite,
      NAIL_SALON_IMAGES.retail,
      NAIL_SALON_IMAGES.workstation
    ].filter(img => img); // Filter out any undefined images
    
    if (options.length === 0) return FALLBACK_IMAGE;
    return options[Math.floor(Math.random() * options.length)];
  }
};

/**
 * Get nail salon image for a VIP/luxury booth rental
 */
export const getNailBoothImage = (): string => {
  return NAIL_SALON_IMAGES.vip || FALLBACK_IMAGE;
};

/**
 * Get nail salon image for a job listing
 */
export const getNailJobImage = (): string => {
  return NAIL_SALON_IMAGES.luxuryLounge || FALLBACK_IMAGE;
};

/**
 * Gets a specific nail salon image by key
 */
export const getNailImageByKey = (key: keyof typeof NAIL_SALON_IMAGES): string => {
  return NAIL_SALON_IMAGES[key] || FALLBACK_IMAGE;
};

/**
 * Gets all available nail salon images
 */
export const getAllNailImages = (): string[] => {
  return Object.values(NAIL_SALON_IMAGES).filter(img => img);
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
