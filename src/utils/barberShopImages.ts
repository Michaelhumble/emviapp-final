
/**
 * Specialized utility for managing high-quality barbershop images
 * These images focus exclusively on barbershop/men's grooming establishments
 */

// Define path constants for the uploaded barbershop images with explicit file paths
export const BARBERSHOP_IMAGES = {
  // Main barbershop images from uploads
  classic1: "/lovable-uploads/de0bd2bb-f6a2-486b-8949-0b7cbdb71559.png", // Classic barbershop with brick wall and multiple stations
  classic2: "/lovable-uploads/d5f250d0-7001-45a7-96a0-8db6f3f2ade5.png", // Upscale barbershop with brick wall and waiting area
  modern1: "/lovable-uploads/9c17ae10-5590-4c10-a59f-0830de25f070.png", // Modern barbershop with multiple stations and large mirrors
};

// Store all image keys to easily select from available barbershop images
const BARBERSHOP_IMAGE_KEYS = Object.keys(BARBERSHOP_IMAGES);

// Fallback image in case uploads fail - use the most reliable image
const BARBERSHOP_FALLBACK_IMAGE = "/lovable-uploads/de0bd2bb-f6a2-486b-8949-0b7cbdb71559.png";

// Image rotation index to ensure variety across listings
let barberImageRotationIndex = 0;

/**
 * Returns an appropriate barbershop image
 * @param isLuxury Whether the salon is positioned as a luxury establishment
 * @param isPremium Whether the salon is positioned as a premium establishment
 */
export const getBarberShopImage = (
  isLuxury: boolean = false,
  isPremium: boolean = false
): string => {
  // Rotate through all available images to provide variety and ensure equal distribution
  barberImageRotationIndex = (barberImageRotationIndex + 1) % BARBERSHOP_IMAGE_KEYS.length;
  const selectedKey = BARBERSHOP_IMAGE_KEYS[barberImageRotationIndex];
  const selectedImage = BARBERSHOP_IMAGES[selectedKey as keyof typeof BARBERSHOP_IMAGES];
  
  // Log the selected image to help diagnose any issues
  console.log(`Selected barbershop image: ${selectedImage}`);
  return selectedImage || BARBERSHOP_FALLBACK_IMAGE;
};

/**
 * Get barbershop image for a booth rental
 * Always returns a valid image path
 */
export const getBarberBoothImage = (): string => {
  // Select from the available images that are appropriate for booth rentals
  const boothImages = Object.values(BARBERSHOP_IMAGES);
  
  if (boothImages.length === 0) return BARBERSHOP_FALLBACK_IMAGE;
  
  // Rotate through available booth images
  const boothIndex = barberImageRotationIndex % boothImages.length;
  return boothImages[boothIndex];
};

/**
 * Get barbershop image for a job listing
 * Always returns a valid image path
 */
export const getBarberJobImage = (): string => {
  // Select from images that are appropriate for job listings
  const jobImages = Object.values(BARBERSHOP_IMAGES);
  
  if (jobImages.length === 0) return BARBERSHOP_FALLBACK_IMAGE;
  
  // Rotate through available job images
  const jobIndex = barberImageRotationIndex % jobImages.length;
  return jobImages[jobIndex];
};

/**
 * Gets a random barbershop image - useful for ensuring variety
 * Does not update the rotation index
 */
export const getRandomBarberShopImage = (): string => {
  const randomIndex = Math.floor(Math.random() * BARBERSHOP_IMAGE_KEYS.length);
  const key = BARBERSHOP_IMAGE_KEYS[randomIndex];
  return BARBERSHOP_IMAGES[key as keyof typeof BARBERSHOP_IMAGES] || BARBERSHOP_FALLBACK_IMAGE;
};

/**
 * Determines if a salon is likely a barbershop based on name or description
 */
export const isBarberShop = (name: string = '', description: string = ''): boolean => {
  const combinedText = (name + ' ' + description).toLowerCase();
  return combinedText.includes('barber') || 
         combinedText.includes('barbershop') || 
         combinedText.includes('men\'s grooming') ||
         combinedText.includes('mens grooming') ||
         combinedText.includes('men\'s salon') ||
         combinedText.includes('mens salon') ||
         combinedText.includes('men\'s haircut') ||
         combinedText.includes('mens haircut');
};

/**
 * Determines if a job is likely a barber position based on title or description
 */
export const isBarberJob = (title: string = '', description: string = ''): boolean => {
  const combinedText = (title + ' ' + description).toLowerCase();
  return combinedText.includes('barber') || 
         combinedText.includes('men\'s stylist') ||
         combinedText.includes('mens stylist') ||
         combinedText.includes('men\'s grooming') ||
         combinedText.includes('mens grooming') ||
         combinedText.includes('master barber') ||
         combinedText.includes('barber apprentice') ||
         combinedText.includes('barbering');
};
