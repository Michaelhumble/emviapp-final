
// Lash and Brow Salon image utility
// Manages and provides images for Lash & Brow related listings

/**
 * Collection of high-quality lash and brow salon images
 * These are used consistently across the platform for lash/brow-related listings
 */
export const LASH_BROW_SALON_IMAGES = {
  // NEW Makeup and lashes studio/products
  makeupProducts: "/lovable-uploads/6fdf0a39-d203-4f5a-90ba-808059c3ae5e.png", // High-end makeup and lash supplies with pink aesthetic
  makeupStudio: "/lovable-uploads/2951176b-68c9-45d6-8bc5-20513e72d0a3.png", // Luxury makeup salon with black and gold accents
  
  // Previously existing images
  luxuryLash1: "/lovable-uploads/7dd3d7e2-dc6b-4d9a-9feb-9e3b023a9f28.png", // Elegant lash supplies with premium look
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
 * Returns true if the salon is likely a makeup studio based on name and description
 * NEW: This function helps identify makeup-related businesses
 */
export const isMakeupStudio = (name: string = '', description: string = ''): boolean => {
  const combinedText = (name + ' ' + description).toLowerCase();
  
  const makeupKeywords = [
    'makeup', 'make up', 'make-up', 'cosmetics', 'beauty studio',
    'beauty bar', 'mua', 'makeup artist', 'glam', 'foundation',
    'lipstick', 'eyeshadow', 'contour', 'beauty products'
  ];
  
  return makeupKeywords.some(keyword => combinedText.includes(keyword));
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
    'hiring lash', 'hiring brow', 'lash position', 'brow position',
    'makeup artist', 'mua position', 'makeup job', 'cosmetics specialist'
  ];
  
  return isLashSalon(title, description) || 
         isBrowSalon(title, description) || 
         isMakeupStudio(title, description) ||
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
  // Use the new makeup products image for premium lash studios
  if (isPremium) {
    return LASH_BROW_SALON_IMAGES.makeupProducts;
  }
  
  // Use the original lash image for standard lash studios
  return LASH_BROW_SALON_IMAGES.luxuryLash1;
};

/**
 * Returns an appropriate image URL for a makeup studio
 * NEW: This function provides images for makeup studios
 */
export const getMakeupStudioImage = (isPremium: boolean = false): string => {
  // Premium makeup studios get the high-end makeup salon image
  if (isPremium) {
    return LASH_BROW_SALON_IMAGES.makeupStudio;
  }
  
  // Standard makeup studios get the product display image
  return LASH_BROW_SALON_IMAGES.makeupProducts;
};

/**
 * Returns an appropriate image URL for a brow salon listing
 */
export const getBrowSalonImage = (isPremium: boolean = false): string => {
  // Now we have multiple choices for brow salons
  if (isPremium) {
    // For premium brow studios, use the original brow image
    return LASH_BROW_SALON_IMAGES.luxuryBrow1;
  }
  
  // For standard brow studios, can use the makeup products image as it includes brow tools
  return LASH_BROW_SALON_IMAGES.makeupProducts;
};

/**
 * Returns an appropriate image URL for either lash or brow job listing
 */
export const getLashBrowJobImage = (isLash: boolean = true): string => {
  if (isLash) {
    // For lash jobs, prioritize the new lash products image
    return LASH_BROW_SALON_IMAGES.makeupProducts;
  } 
  
  // For brow jobs, use a brow-focused image
  return LASH_BROW_SALON_IMAGES.luxuryBrow1;
};

/**
 * Returns a random lash or brow salon image
 * Useful for variety in listings
 */
export const getRandomLashBrowImage = (): string => {
  const images = Object.values(LASH_BROW_SALON_IMAGES).filter(url => url !== LASH_BROW_SALON_IMAGES.generic);
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
};
