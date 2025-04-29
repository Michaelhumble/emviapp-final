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
  premiumHair6: "/lovable-uploads/c8ad59e6-75a9-4a83-afd6-0f8a41ac93c0.png", // Modern minimalist salon with black sinks and large mirrors
  premiumHair7: "/lovable-uploads/0bc39cbb-bdd3-4843-ace0-3cf730af576f.png", // Luxury black and gold product display area
  premiumHair8: "/lovable-uploads/d1abc88d-ed4e-4e7f-91d7-04104efd6ce6.png", // Elegant cream and gold salon with crystal chandelier
  
  // New premium luxury hair salon images - 2024 collection
  luxuryHair1: "/lovable-uploads/43b9da9d-d4a5-419c-93c9-c724e3983b19.png", // Luxury cream salon with gold-based styling chairs and crystal chandelier
  luxuryHair2: "/lovable-uploads/74a40bcb-5fc3-49d5-b01b-67e851a0a09c.png", // Premium salon with gold-framed mirrors and white vanities
  luxuryHair3: "/lovable-uploads/3bd8e670-e121-4f05-8d36-30966a627ec9.png", // Elegant salon with wall panels, crystal chandeliers and styling stations
  luxuryHair4: "/lovable-uploads/6771e704-439d-4726-8cc3-63573a3175b9.png", // High-end salon with city view, gold accents and marble floors
};

// Store all image keys to easily select from available hair salon images
const HAIR_SALON_IMAGE_KEYS = Object.keys(HAIR_SALON_IMAGES);

// Premium tier hair salon images (standard premium quality)
const PREMIUM_HAIR_SALON_IMAGE_KEYS = [
  'premiumHair1',
  'premiumHair2',
  'premiumHair3', 
  'premiumHair4',
  'premiumHair5',
  'premiumHair6',
  'premiumHair7',
  'premiumHair8'
];

// Ultra-luxury tier hair salon images (highest quality)
const LUXURY_HAIR_SALON_IMAGE_KEYS = [
  'luxuryHair1',
  'luxuryHair2',
  'luxuryHair3',
  'luxuryHair4'
];

// Fallback image in case uploads fail - use the most reliable image
const HAIR_SALON_FALLBACK_IMAGE = "/lovable-uploads/43b9da9d-d4a5-419c-93c9-c724e3983b19.png";

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
  // For luxury salons, use the new ultra-luxury images
  if (isLuxury && LUXURY_HAIR_SALON_IMAGE_KEYS.length > 0) {
    const luxuryIndex = hairSalonImageRotationIndex % LUXURY_HAIR_SALON_IMAGE_KEYS.length;
    const imgKey = LUXURY_HAIR_SALON_IMAGE_KEYS[luxuryIndex];
    hairSalonImageRotationIndex = (hairSalonImageRotationIndex + 1) % HAIR_SALON_IMAGE_KEYS.length;
    return HAIR_SALON_IMAGES[imgKey as keyof typeof HAIR_SALON_IMAGES];
  }
  
  // For premium salons, use the premium images
  if (isPremium && PREMIUM_HAIR_SALON_IMAGE_KEYS.length > 0) {
    const imgIndex = hairSalonImageRotationIndex % PREMIUM_HAIR_SALON_IMAGE_KEYS.length;
    const imgKey = PREMIUM_HAIR_SALON_IMAGE_KEYS[imgIndex];
    hairSalonImageRotationIndex = (hairSalonImageRotationIndex + 1) % HAIR_SALON_IMAGE_KEYS.length;
    return HAIR_SALON_IMAGES[imgKey as keyof typeof HAIR_SALON_IMAGES];
  }
  
  // Otherwise, use any hair salon image
  const randomIndex = hairSalonImageRotationIndex % HAIR_SALON_IMAGE_KEYS.length;
  const imgKey = HAIR_SALON_IMAGE_KEYS[randomIndex];
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
  const boothImageKeys = ['luxuryHair2', 'luxuryHair3', 'premiumHair1', 'premiumHair3', 'premiumHair8'];
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
  const jobImageKeys = ['luxuryHair1', 'luxuryHair4', 'premiumHair2', 'premiumHair4', 'premiumHair7'];
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
         combinedText.includes('hair color') ||
         combinedText.includes('hair studio') ||
         combinedText.includes('hair lounge') ||
         combinedText.includes('hair design');
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
         combinedText.includes('salon professional') ||
         combinedText.includes('hair studio') ||
         combinedText.includes('hair designs');
};

/**
 * Determines if a salon is likely an ultra-luxury hair salon
 * This helps select the most premium images for high-end establishments
 */
export const isLuxuryHairSalon = (name: string = '', description: string = ''): boolean => {
  if (!isHairSalon(name, description)) {
    return false;
  }
  
  const combinedText = (name + ' ' + description).toLowerCase();
  
  // Check for luxury indicators
  return combinedText.includes('luxury') || 
         combinedText.includes('premium') ||
         combinedText.includes('exclusive') ||
         combinedText.includes('high-end') ||
         combinedText.includes('upscale') ||
         combinedText.includes('elegant') ||
         combinedText.includes('sophisticated') ||
         (combinedText.includes('hair') && combinedText.includes('boutique')) ||
         (combinedText.includes('price') && combinedText.includes('$$$')) ||
         (combinedText.includes('price') && combinedText.includes('$$$$'));
};
