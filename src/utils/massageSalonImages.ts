
// Massage Salon image utility
// Manages and provides images for massage/spa-related listings

/**
 * Collection of high-quality massage salon and spa images
 * These are used consistently across the platform for massage/spa-related listings
 */
export const MASSAGE_SPA_IMAGES = {
  // Premium massage rooms (elegant blue decor with treatment tables)
  luxuryMassage1: "/lovable-uploads/628e6cc1-661e-4698-840a-a0facea2f7bb.png", // Elegant blue room with massage tables
  luxuryMassage2: "/lovable-uploads/b2498739-4d20-4b75-8fc1-9f740ec1e4cc.png", // Dual massage tables with cabinet center
  luxuryMassage3: "/lovable-uploads/60aae990-d617-435c-8c05-79cc9276b6ba.png", // Wood accent spa room
  luxuryMassage4: "/lovable-uploads/fc2a8931-d58f-47a3-81f2-6ae43cf431c5.png", // Plants and daylight massage room
  
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
  // Use luxury massage images based on premium status or randomization
  const images = Object.values(MASSAGE_SPA_IMAGES).filter(url => url !== MASSAGE_SPA_IMAGES.generic);
  
  if (images.length === 0) {
    return MASSAGE_SPA_IMAGES.generic;
  }
  
  if (randomize) {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  }
  
  // Return first image if not randomizing
  return images[0];
};

/**
 * Returns an appropriate image URL for a massage job listing
 */
export const getMassageJobImage = (randomize: boolean = true): string => {
  return getMassageSalonImage(true, randomize);
};

/**
 * Returns a random massage/spa image
 * Useful for variety in listings
 */
export const getRandomMassageSpaImage = (): string => {
  const images = Object.values(MASSAGE_SPA_IMAGES);
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
};
