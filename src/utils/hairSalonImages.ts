
/**
 * Specialized utility for managing high-quality hair salon images
 * These images focus exclusively on hair salon establishments with luxury interiors
 */

// Define path constants for the uploaded hair salon images with explicit file paths
export const HAIR_SALON_IMAGES = {
  // Main premium hair salon images from latest uploads
  premiumHair1: "/lovable-uploads/4c2d8a4c-e191-40a0-8666-147cbcc488d4.png", // Luxury hair salon with crystal chandelier and white styling chairs
  premiumHair2: "/lovable-uploads/8df4a272-7afd-41a2-bbf7-994276084ec4.png", // Elegant salon with gold-framed mirrors and cream chairs
  premiumHair3: "/lovable-uploads/0fcc390c-fc2b-4e72-9fa9-055da1d97ad4.png", // Upscale salon with crystal chandelier and French-style decor
  premiumHair4: "/lovable-uploads/513e8703-1059-4ed5-aef3-9f9b4536b69d.png", // Modern luxury salon with city view and elegant furnishings
  premiumHair5: "/lovable-uploads/44afc5c7-fa4b-4e7c-86a3-3fa4486102ef.png", // Gold-accented salon with central styling island
};

// Store all image keys to easily select from available hair salon images
const HAIR_SALON_IMAGE_KEYS = Object.keys(HAIR_SALON_IMAGES);

// All hair salon images are premium quality
const PREMIUM_HAIR_SALON_IMAGE_KEYS = [
  'premiumHair1',
  'premiumHair2',
  'premiumHair3', 
  'premiumHair4',
  'premiumHair5'
];

// Fallback image in case uploads fail - use the most reliable image
const HAIR_SALON_FALLBACK_IMAGE = "/lovable-uploads/4c2d8a4c-e191-40a0-8666-147cbcc488d4.png";

// Image rotation index to ensure variety across listings
let hairSalonImageRotationIndex = 0;

/**
 * Returns an appropriate hair salon image
 * @param isLuxury Whether the salon is positioned as a luxury establishment
 * @param isPremium Whether the salon is positioned as a premium establishment
 */
export const getHairSalonImage = (
  isLuxury: boolean = false,
  isPremium: boolean = false
): string => {
  // Return a premium image (they're all premium quality)
  const imgIndex = hairSalonImageRotationIndex % PREMIUM_HAIR_SALON_IMAGE_KEYS.length;
  const imgKey = PREMIUM_HAIR_SALON_IMAGE_KEYS[imgIndex];
  hairSalonImageRotationIndex = (hairSalonImageRotationIndex + 1) % HAIR_SALON_IMAGE_KEYS.length;
  return HAIR_SALON_IMAGES[imgKey as keyof typeof HAIR_SALON_IMAGES];
};

/**
 * Get hair salon image for a booth rental
 * Always returns a valid image path
 */
export const getHairBoothImage = (): string => {
  // Alternate between the premium images for booth rentals
  // Booths should always look premium as they're marketing tools
  const boothImageKeys = ['premiumHair1', 'premiumHair3', 'premiumHair5'];
  const boothIndex = hairSalonImageRotationIndex % boothImageKeys.length;
  const selectedKey = boothImageKeys[boothIndex];
  hairSalonImageRotationIndex = (hairSalonImageRotationIndex + 1) % HAIR_SALON_IMAGE_KEYS.length;
  return HAIR_SALON_IMAGES[selectedKey as keyof typeof HAIR_SALON_IMAGES] || HAIR_SALON_FALLBACK_IMAGE;
};

/**
 * Get hair salon image for a job listing
 * Always returns a valid image path
 */
export const getHairJobImage = (): string => {
  // For job listings, use one of the premium images to make the job postings look attractive
  const jobImageKeys = ['premiumHair2', 'premiumHair4', 'premiumHair5'];
  const jobIndex = hairSalonImageRotationIndex % jobImageKeys.length;
  const selectedKey = jobImageKeys[jobIndex];
  hairSalonImageRotationIndex = (hairSalonImageRotationIndex + 1) % HAIR_SALON_IMAGE_KEYS.length;
  return HAIR_SALON_IMAGES[selectedKey as keyof typeof HAIR_SALON_IMAGES] || HAIR_SALON_FALLBACK_IMAGE;
};

/**
 * Gets a random hair salon image - useful for ensuring variety
 * Does not update the rotation index
 */
export const getRandomHairSalonImage = (): string => {
  const randomIndex = Math.floor(Math.random() * HAIR_SALON_IMAGE_KEYS.length);
  const key = HAIR_SALON_IMAGE_KEYS[randomIndex];
  return HAIR_SALON_IMAGES[key as keyof typeof HAIR_SALON_IMAGES] || HAIR_SALON_FALLBACK_IMAGE;
};

/**
 * Determines if a salon is likely a hair salon based on name or description
 */
export const isHairSalon = (name: string = '', description: string = ''): boolean => {
  const combinedText = (name + ' ' + description).toLowerCase();
  
  // Exclude barbershops and nail salons first
  if (
    combinedText.includes('barber') || 
    combinedText.includes('nail') ||
    combinedText.includes('manicure') ||
    combinedText.includes('pedicure')
  ) {
    return false;
  }
  
  // Check for hair salon indicators
  return combinedText.includes('hair') || 
         combinedText.includes('haircut') || 
         combinedText.includes('hairstylist') ||
         combinedText.includes('hair stylist') ||
         combinedText.includes('stylist') ||
         combinedText.includes('hair salon') ||
         combinedText.includes('cut and color') ||
         combinedText.includes('hair color');
};

/**
 * Determines if a job is likely a hair stylist position based on title or description
 */
export const isHairJob = (title: string = '', description: string = ''): boolean => {
  const combinedText = (title + ' ' + description).toLowerCase();
  
  // Exclude barbershops and nail tech jobs first
  if (
    combinedText.includes('barber') || 
    combinedText.includes('nail tech') ||
    combinedText.includes('manicurist')
  ) {
    return false;
  }
  
  // Check for hair stylist job indicators
  return combinedText.includes('hair') || 
         combinedText.includes('stylist') ||
         combinedText.includes('colorist') ||
         combinedText.includes('hairdresser') ||
         combinedText.includes('hairstylist') ||
         combinedText.includes('hair stylist') ||
         combinedText.includes('salon manager') ||
         combinedText.includes('salon professional');
};
