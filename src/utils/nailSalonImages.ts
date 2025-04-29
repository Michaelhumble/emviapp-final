
/**
 * Specialized utility for managing high-quality nail salon images
 * These images are protected and should only be changed manually when specifically instructed
 */

// Define path constants for the uploaded nail salon images with explicit file paths
export const NAIL_SALON_IMAGES = {
  // New premium luxury nail salon images (2025 edition)
  luxuryLarge: "/lovable-uploads/bb5c8292-c127-4fd2-9663-c65d596b135d.png", // Large spacious nail salon with cream chairs
  modernDeluxe: "/lovable-uploads/fa1b4f95-ebc9-452c-a18b-9d4e78db84bb.png", // Modern salon with sitting area and large windows
  artGallery: "/lovable-uploads/d1da4b24-248e-4e84-9289-06237e7d4458.png", // Nail salon with art gallery walls and hanging lights
  executiveNails: "/lovable-uploads/e1ce1662-fb69-4ad9-995a-364ee16e42f6.png", // Clean cream interior with plenty of natural light
  minimalist: "/lovable-uploads/7a58770c-404e-4259-b1a6-f044c8eefdc0.png", // Modern minimalist white interior with reception

  // Additional legacy images as fallbacks (removed all external/unsecured URLs)
  premium1: "/lovable-uploads/72875e23-d749-4521-989d-4ff82423de01.png",
  premium2: "/lovable-uploads/3ef97ce8-eb62-44e0-842c-d10c54d23d81.png"
};

// Store all image keys to easily select random images
const IMAGE_KEYS = Object.keys(NAIL_SALON_IMAGES);

// Fallback image in case uploads fail - use the most reliable image
const FALLBACK_IMAGE = "/lovable-uploads/bb5c8292-c127-4fd2-9663-c65d596b135d.png";

// Image rotation index to ensure variety across listings
let imageRotationIndex = 0;

/**
 * Returns an appropriate nail salon image based on the salon's characteristics
 * Enhanced to provide more variety and reliable image selection
 * @param isVietnamese Whether the salon is Vietnamese-owned or Vietnamese-themed
 * @param isLuxury Whether the salon is positioned as a luxury establishment
 * @param isPremium Whether the salon is positioned as a premium establishment
 */
export const getNailSalonImage = (
  isVietnamese: boolean = false, 
  isLuxury: boolean = false,
  isPremium: boolean = false
): string => {
  // For luxury or premium nail salons, prioritize our best images
  if (isLuxury || isPremium) {
    const premiumImages = [
      NAIL_SALON_IMAGES.luxuryLarge,
      NAIL_SALON_IMAGES.modernDeluxe,
      NAIL_SALON_IMAGES.executiveNails
    ];
    const randomIndex = Math.floor(Math.random() * premiumImages.length);
    return premiumImages[randomIndex];
  }
  
  // Use rotation index to select image, increment for next usage
  imageRotationIndex = (imageRotationIndex + 1) % IMAGE_KEYS.length;
  const selectedKey = IMAGE_KEYS[imageRotationIndex];
  const selectedImage = NAIL_SALON_IMAGES[selectedKey as keyof typeof NAIL_SALON_IMAGES];
  
  // Log the selected image to help diagnose any issues
  console.log(`Selected nail salon image: ${selectedImage}`);
  return selectedImage || FALLBACK_IMAGE;
};

/**
 * Get nail salon image for a VIP/luxury booth rental
 * Always returns a valid image path
 */
export const getNailBoothImage = (): string => {
  // Select from luxury images that are appropriate for booth rentals
  const boothImages = [
    NAIL_SALON_IMAGES.luxuryLarge,
    NAIL_SALON_IMAGES.executiveNails,
    NAIL_SALON_IMAGES.modernDeluxe
  ].filter(Boolean);
  
  if (boothImages.length === 0) return FALLBACK_IMAGE;
  
  // Rotate through available booth images
  const boothIndex = imageRotationIndex % boothImages.length;
  return boothImages[boothIndex];
};

/**
 * Get nail salon image for a job listing
 * Always returns a valid image path
 */
export const getNailJobImage = (): string => {
  // Select from images that are appropriate for job listings
  const jobImages = [
    NAIL_SALON_IMAGES.artGallery,
    NAIL_SALON_IMAGES.minimalist,
    NAIL_SALON_IMAGES.modernDeluxe
  ].filter(Boolean);
  
  if (jobImages.length === 0) return FALLBACK_IMAGE;
  
  // Rotate through available job images
  const jobIndex = imageRotationIndex % jobImages.length;
  return jobImages[jobIndex];
};

/**
 * Gets a specific nail salon image by key
 * Added safety to always return a valid image
 */
export const getNailImageByKey = (key: keyof typeof NAIL_SALON_IMAGES): string => {
  return NAIL_SALON_IMAGES[key] || FALLBACK_IMAGE;
};

/**
 * Gets all available nail salon images
 * Filters out any undefined images
 */
export const getAllNailImages = (): string[] => {
  return Object.values(NAIL_SALON_IMAGES).filter(img => img);
};

/**
 * Determines if a salon is likely a nail salon based on name or description
 * Enhanced to catch more variations of nail salon terminology
 */
export const isNailSalon = (name: string = '', description: string = ''): boolean => {
  const combinedText = (name + ' ' + description).toLowerCase();
  return combinedText.includes('nail') || 
         combinedText.includes('manicure') || 
         combinedText.includes('pedicure') ||
         combinedText.includes('nails') ||
         combinedText.includes('tiệm nail') ||
         combinedText.includes('salon') && !combinedText.includes('hair') && !combinedText.includes('lash') ||
         combinedText.includes('spa') && !combinedText.includes('massage');
};

/**
 * Determines if a job is likely a nail technician position based on title or description
 * Enhanced to catch more variations of nail job terminology
 */
export const isNailJob = (title: string = '', description: string = ''): boolean => {
  const combinedText = (title + ' ' + description).toLowerCase();
  return combinedText.includes('nail') || 
         combinedText.includes('manicure') || 
         combinedText.includes('pedicure') ||
         combinedText.includes('nail tech') ||
         combinedText.includes('nail salon') ||
         combinedText.includes('nail artist') ||
         combinedText.includes('nail specialist') ||
         combinedText.includes('beautician') && !combinedText.includes('hair') && !combinedText.includes('lash') ||
         combinedText.includes('thợ nail');
};

/**
 * Get a random nail salon image - useful for ensuring variety
 * Does not update the rotation index
 */
export const getRandomNailSalonImage = (): string => {
  const randomIndex = Math.floor(Math.random() * IMAGE_KEYS.length);
  const key = IMAGE_KEYS[randomIndex];
  return NAIL_SALON_IMAGES[key as keyof typeof NAIL_SALON_IMAGES] || FALLBACK_IMAGE;
};
