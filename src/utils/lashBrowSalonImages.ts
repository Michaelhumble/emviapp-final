
// Lash and Brow Salon image utility
// Manages and provides images for Lash & Brow related listings

/**
 * Collection of high-quality lash and brow salon images
 * These are used consistently across the platform for lash/brow-related listings
 */
export const LASH_BROW_SALON_IMAGES = {
  // Premium lash studios (softer, lighter luxury interiors)
  luxuryLash1: "/lovable-uploads/7dd3d7e2-dc6b-4d9a-9feb-9e3b023a9f28.png", // Elegant lash supplies with premium look
  
  // Premium brow studios (sharper, cleaner minimal interiors)
  luxuryBrow1: "/lovable-uploads/4e47f970-963a-483f-8356-eb64235bc2db.png", // Modern brow/lash studio with black chairs
  
  // Fallback generic image (in case needed)
  generic: "/lovable-uploads/7dd3d7e2-dc6b-4d9a-9feb-9e3b023a9f28.png"
};

/**
 * Returns true if the salon is likely a lash salon based on name and description
 * This helps automatically identify lash-related businesses
 */
export const isLashSalon = (name: string = '', description: string = ''): boolean => {
  const combinedText = (name + ' ' + description).toLowerCase();
  
  const lashKeywords = [
    'lash', 'eyelash', 'lashes', 'extension', 'extensions', 
    'lashing', 'false lashes', 'mink lash', 'volume lash',
    'classic lash', 'russian volume', 'hybrid lash'
  ];
  
  return lashKeywords.some(keyword => combinedText.includes(keyword));
};

/**
 * Returns true if the salon is likely a brow salon based on name and description
 * This helps automatically identify brow-related businesses
 */
export const isBrowSalon = (name: string = '', description: string = ''): boolean => {
  const combinedText = (name + ' ' + description).toLowerCase();
  
  const browKeywords = [
    'brow', 'eyebrow', 'microblading', 'threading', 'microblade',
    'brow tint', 'brow lamination', 'hd brow', 'brow shaping', 
    'brow artist', 'brow specialist', 'ombre brow', 'powder brow'
  ];
  
  return browKeywords.some(keyword => combinedText.includes(keyword));
};

/**
 * Returns true if the listing is likely a lash or brow job based on title and description
 * This helps automatically identify lash/brow job listings
 */
export const isLashBrowJob = (title: string = '', description: string = ''): boolean => {
  const combinedText = (title + ' ' + description).toLowerCase();
  
  const jobKeywords = [
    'lash tech', 'lash artist', 'lash specialist', 
    'brow tech', 'brow artist', 'brow specialist',
    'microblader', 'threading specialist', 'lash stylist',
    'hiring lash', 'hiring brow', 'lash position', 'brow position'
  ];
  
  return isLashSalon(title, description) || 
         isBrowSalon(title, description) || 
         jobKeywords.some(keyword => combinedText.includes(keyword));
};

/**
 * Returns true if the salon is likely a premium lash studio
 * This helps distinguish luxury lash studios for appropriate imagery
 */
export const isLuxuryLashStudio = (name: string = '', description: string = ''): boolean => {
  const combinedText = (name + ' ' + description).toLowerCase();
  
  const luxuryKeywords = [
    'luxury', 'premium', 'high-end', 'upscale', 'exclusive',
    'vip', 'elite', 'boutique', 'studio', 'deluxe', 'prestige'
  ];
  
  return isLashSalon(name, description) && 
         luxuryKeywords.some(keyword => combinedText.includes(keyword));
};

/**
 * Returns an appropriate image URL for a lash salon listing
 */
export const getLashSalonImage = (isPremium: boolean = false): string => {
  // Currently we only have one luxury lash image, so we return that
  return LASH_BROW_SALON_IMAGES.luxuryLash1;
};

/**
 * Returns an appropriate image URL for a brow salon listing
 */
export const getBrowSalonImage = (isPremium: boolean = false): string => {
  // Currently we only have one luxury brow image, so we return that
  return LASH_BROW_SALON_IMAGES.luxuryBrow1;
};

/**
 * Returns an appropriate image URL for either lash or brow job listing
 */
export const getLashBrowJobImage = (isLash: boolean = true): string => {
  return isLash 
    ? LASH_BROW_SALON_IMAGES.luxuryLash1 
    : LASH_BROW_SALON_IMAGES.luxuryBrow1;
};

/**
 * Returns a random lash or brow salon image
 * Useful for variety in listings
 */
export const getRandomLashBrowImage = (): string => {
  const images = Object.values(LASH_BROW_SALON_IMAGES);
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
};
