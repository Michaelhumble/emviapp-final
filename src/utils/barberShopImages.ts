/**
 * Specialized utility for managing high-quality barbershop images
 * These images focus exclusively on barbershop/men's grooming establishments
 */

// Define path constants for the uploaded barbershop images with explicit file paths
export const BARBERSHOP_IMAGES = {
  // Main premium barbershop images from latest uploads
  premiumBarber1: "/lovable-uploads/04b1b8d8-1c45-4be9-96e7-7afcceca8760.png", // Luxury barbershop with gold-framed mirrors and exposed brick
  premiumBarber2: "/lovable-uploads/e14ee836-9ccb-41a0-9ad1-3b185275482f.png", // Upscale barbershop with black ceiling and centered logo
  premiumBarber3: "/lovable-uploads/90e01456-efd5-4523-8034-5c1d321949be.png", // Elegant barbershop with wooden cabinets and ornate mirrors
  
  // Previous barbershop images (keeping as backup)
  luxuryBarber1: "/lovable-uploads/9211106a-5628-49bf-8f16-847bd0a9bd20.png", // Luxury barbershop with brick wall and multiple stations
  luxuryBarber2: "/lovable-uploads/418cf3ab-c7f4-4f6a-8049-945b70df38ca.png", // Premium barbershop with waiting area and multiple stations
  luxuryBarber3: "/lovable-uploads/8c34a207-742d-484a-8967-d0eb8091cb96.png", // Elegant barbershop with gold-framed mirrors and brick wall
  
  classic1: "/lovable-uploads/de0bd2bb-f6a2-486b-8949-0b7cbdb71559.png", // Classic barbershop with brick wall and multiple stations
  classic2: "/lovable-uploads/d5f250d0-7001-45a7-96a0-8db6f3f2ade5.png", // Upscale barbershop with brick wall and waiting area
  modern1: "/lovable-uploads/9c17ae10-5590-4c10-a59f-0830de25f070.png", // Modern barbershop with multiple stations and large mirrors
};

// Store all image keys to easily select from available barbershop images
const BARBERSHOP_IMAGE_KEYS = Object.keys(BARBERSHOP_IMAGES);

// Premium image keys are the new premium barbershop images (prioritize the latest uploads)
const PREMIUM_BARBERSHOP_IMAGE_KEYS = [
  'premiumBarber1',
  'premiumBarber2', 
  'premiumBarber3',
  'luxuryBarber1',
  'luxuryBarber2', 
  'luxuryBarber3'
];

// Fallback image in case uploads fail - use the most reliable image
const BARBERSHOP_FALLBACK_IMAGE = "/lovable-uploads/04b1b8d8-1c45-4be9-96e7-7afcceca8760.png";

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
  // For luxury or premium establishments, prioritize the new premium barbershop images
  if (isLuxury || isPremium) {
    // Focus on the first 3 (newest) images for premium/luxury
    const premiumIndex = barberImageRotationIndex % 3;
    const premiumKey = PREMIUM_BARBERSHOP_IMAGE_KEYS[premiumIndex];
    barberImageRotationIndex = (barberImageRotationIndex + 1) % BARBERSHOP_IMAGE_KEYS.length;
    return BARBERSHOP_IMAGES[premiumKey as keyof typeof BARBERSHOP_IMAGES];
  }
  
  // For standard barbershops, rotate through all available images
  const standardIndex = (barberImageRotationIndex + 3) % BARBERSHOP_IMAGE_KEYS.length;
  barberImageRotationIndex = (barberImageRotationIndex + 1) % BARBERSHOP_IMAGE_KEYS.length;
  const selectedKey = BARBERSHOP_IMAGE_KEYS[standardIndex];
  const selectedImage = BARBERSHOP_IMAGES[selectedKey as keyof typeof BARBERSHOP_IMAGES];
  
  return selectedImage || BARBERSHOP_FALLBACK_IMAGE;
};

/**
 * Get barbershop image for a booth rental
 * Always returns a valid image path
 */
export const getBarberBoothImage = (): string => {
  // Alternate between the new premium images for booth rentals
  // Booths should always look premium as they're marketing tools
  const boothImageKeys = ['premiumBarber1', 'premiumBarber3', 'premiumBarber2'];
  const boothIndex = barberImageRotationIndex % boothImageKeys.length;
  const selectedKey = boothImageKeys[boothIndex];
  barberImageRotationIndex = (barberImageRotationIndex + 1) % BARBERSHOP_IMAGE_KEYS.length;
  return BARBERSHOP_IMAGES[selectedKey as keyof typeof BARBERSHOP_IMAGES] || BARBERSHOP_FALLBACK_IMAGE;
};

/**
 * Get barbershop image for a job listing
 * Always returns a valid image path
 */
export const getBarberJobImage = (): string => {
  // For job listings, use one of the premium images to make the job postings look attractive
  const jobImageKeys = ['premiumBarber2', 'premiumBarber1', 'premiumBarber3'];
  const jobIndex = barberImageRotationIndex % jobImageKeys.length;
  const selectedKey = jobImageKeys[jobIndex];
  barberImageRotationIndex = (barberImageRotationIndex + 1) % BARBERSHOP_IMAGE_KEYS.length;
  return BARBERSHOP_IMAGES[selectedKey as keyof typeof BARBERSHOP_IMAGES] || BARBERSHOP_FALLBACK_IMAGE;
};

/**
 * Gets a random barbershop image - useful for ensuring variety
 * Does not update the rotation index
 */
export const getRandomBarberShopImage = (): string => {
  // Prioritize the premium images for random selection
  if (Math.random() > 0.3) {
    const premiumKeys = ['premiumBarber1', 'premiumBarber2', 'premiumBarber3'];
    const randomIndex = Math.floor(Math.random() * premiumKeys.length);
    const key = premiumKeys[randomIndex];
    return BARBERSHOP_IMAGES[key as keyof typeof BARBERSHOP_IMAGES];
  }
  
  // Otherwise use any barbershop image
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
