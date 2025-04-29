
// Massage Salon image utility
// Manages and provides images for massage/spa-related listings

/**
 * Collection of high-quality massage salon and spa images
 * These are used consistently across the platform for massage/spa-related listings
 */
export const MASSAGE_SPA_IMAGES = {
  // Premium blue-themed luxury massage rooms
  luxuryMassage1: "/lovable-uploads/72f0f6c8-5793-4750-993d-f250b495146d.png", // Blue room with sofa and massage tables
  luxuryMassage2: "/lovable-uploads/e4558475-4b40-4bb4-b3ae-7ade4595c1eb.png", // Dual massage room with blue walls and sconces
  
  // Modern massage rooms with clean aesthetic
  modernMassage1: "/lovable-uploads/f85b0984-587b-4ce1-bdc7-2bf357aa7695.png", // Wood paneling with blue accent wall
  modernMassage2: "/lovable-uploads/3d3a731b-4560-4317-8dc7-93d933b82b10.png", // Blue room with plants and gold accents
  
  // Fallback generic image (in case needed)
  generic: "/lovable-uploads/b13a3b43-f6e1-4746-9992-03f6e8fac6bf.png"
};

/**
 * Returns true if the salon is likely a massage salon based on name and description
 * This helps automatically identify massage-related businesses
 */
export const isMassageSpa = (name: string = '', description: string = ''): boolean => {
  const combinedText = (name + ' ' + description).toLowerCase();
  
  const massageKeywords = [
    'massage', 'spa', 'wellness', 'relaxation', 
    'therapy', 'therapeutic', 'bodywork', 'body work',
    'deep tissue', 'swedish', 'thai massage', 'reflexology',
    'hot stone', 'aromatherapy', 'sports massage', 'facial'
  ];
  
  return massageKeywords.some(keyword => combinedText.includes(keyword));
};

/**
 * Returns true if the salon is likely a premium/luxury spa
 * This helps distinguish luxury spas for appropriate imagery
 */
export const isLuxuryMassageSpa = (name: string = '', description: string = ''): boolean => {
  const combinedText = (name + ' ' + description).toLowerCase();
  
  const luxuryKeywords = [
    'luxury', 'premium', 'high-end', 'upscale', 'exclusive',
    'vip', 'elite', 'boutique', 'deluxe', 'prestige'
  ];
  
  return isMassageSpa(name, description) && 
         luxuryKeywords.some(keyword => combinedText.includes(keyword));
};

/**
 * Returns true if the listing is likely a massage therapist job based on title and description
 * This helps automatically identify massage job listings
 */
export const isMassageJob = (title: string = '', description: string = ''): boolean => {
  const combinedText = (title + ' ' + description).toLowerCase();
  
  const jobKeywords = [
    'massage therapist', 'spa therapist', 'licensed massage', 'lmt',
    'masseuse', 'masseur', 'spa position', 'wellness practitioner',
    'hiring massage', 'massage position', 'bodywork position'
  ];
  
  return isMassageSpa(title, description) || 
         jobKeywords.some(keyword => combinedText.includes(keyword));
};

/**
 * Returns an appropriate image URL for a massage salon listing
 */
export const getMassageSalonImage = (isPremium: boolean = false, randomize: boolean = true): string => {
  // Get either luxury or modern massage images based on premium status
  const luxuryImages = [MASSAGE_SPA_IMAGES.luxuryMassage1, MASSAGE_SPA_IMAGES.luxuryMassage2];
  const modernImages = [MASSAGE_SPA_IMAGES.modernMassage1, MASSAGE_SPA_IMAGES.modernMassage2];
  
  // Select image pool based on premium status
  const imagePool = isPremium ? luxuryImages : modernImages;
  
  if (imagePool.length === 0) {
    return MASSAGE_SPA_IMAGES.generic;
  }
  
  if (randomize) {
    const randomIndex = Math.floor(Math.random() * imagePool.length);
    return imagePool[randomIndex];
  }
  
  // Return first image if not randomizing
  return imagePool[0];
};

/**
 * Returns an appropriate image URL for a massage job listing
 */
export const getMassageJobImage = (randomize: boolean = true): string => {
  // For job listings, use a mix of all images for variety
  const allImages = [
    MASSAGE_SPA_IMAGES.luxuryMassage1,
    MASSAGE_SPA_IMAGES.luxuryMassage2,
    MASSAGE_SPA_IMAGES.modernMassage1,
    MASSAGE_SPA_IMAGES.modernMassage2
  ];
  
  if (randomize) {
    const randomIndex = Math.floor(Math.random() * allImages.length);
    return allImages[randomIndex];
  }
  
  return allImages[0];
};

/**
 * Returns a random massage/spa image
 * Useful for variety in listings
 */
export const getRandomMassageSpaImage = (): string => {
  const images = Object.values(MASSAGE_SPA_IMAGES).filter(url => url !== MASSAGE_SPA_IMAGES.generic);
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
};

