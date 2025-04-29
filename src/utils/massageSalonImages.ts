
// Massage Salon image utility
// Manages and provides images for massage/spa-related listings

/**
 * Collection of high-quality massage salon and spa images
 * These are used consistently across the platform for massage/spa-related listings
 */
export const MASSAGE_SPA_IMAGES = {
  // Premium luxury spa rooms - NEW UPLOADS
  luxuryGoldSpa: "/lovable-uploads/c540558f-09db-483f-b844-bacb8824f789.png", // Gold-accented luxury spa room with two beds
  contemporarySpa: "/lovable-uploads/ada4c504-75cf-45ce-a673-c81a22b9dbe3.png", // Contemporary spa with wooden accents
  modernBlueSpa: "/lovable-uploads/ca09b67d-f8b2-497c-bfd9-ac6ec0a491c7.png", // Blue-themed spa with bright windows
  
  // Previously existing spa images
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
 * ENHANCED: More comprehensive detection for better matching
 */
export const isMassageSpa = (name: string = '', description: string = ''): boolean => {
  const combinedText = (name + ' ' + description).toLowerCase();
  
  const massageKeywords = [
    'massage', 'spa', 'wellness', 'relaxation', 
    'therapy', 'therapeutic', 'bodywork', 'body work',
    'deep tissue', 'swedish', 'thai massage', 'reflexology',
    'hot stone', 'aromatherapy', 'sports massage', 'facial',
    'masseuse', 'masseur', 'massage therapist', 'body treatment',
    'day spa', 'wellness center', 'massotherapy'
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
 * Returns true if the salon is specifically a facial spa
 * This helps identify facial-focused spas for appropriate imagery
 */
export const isFacialSpa = (name: string = '', description: string = ''): boolean => {
  const combinedText = (name + ' ' + description).toLowerCase();
  
  const facialKeywords = [
    'facial', 'face treatment', 'skincare', 'skin care',
    'esthetician', 'aesthetician', 'dermaplaning', 'microdermabrasion',
    'face mask', 'face spa', 'skin clinic', 'face massage'
  ];
  
  return facialKeywords.some(keyword => combinedText.includes(keyword));
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
    'hiring massage', 'massage position', 'bodywork position',
    'massage tech', 'massage specialist', 'massage professional',
    'spa staff', 'massage job', 'massage opportunity',
    'therapeutic massage', 'therapist needed'
  ];
  
  return isMassageSpa(title, description) || 
         jobKeywords.some(keyword => combinedText.includes(keyword));
};

/**
 * Returns an appropriate image URL for a massage salon listing
 */
export const getMassageSalonImage = (isPremium: boolean = false, randomize: boolean = true): string => {
  // Add console log for debugging
  console.log('Getting massage salon image', {isPremium, randomize});
  
  // Get either luxury or modern massage images based on premium status
  const luxuryImages = [
    MASSAGE_SPA_IMAGES.luxuryGoldSpa, // NEW primary luxury option
    MASSAGE_SPA_IMAGES.contemporarySpa, // NEW secondary luxury option
    MASSAGE_SPA_IMAGES.luxuryMassage1,
    MASSAGE_SPA_IMAGES.luxuryMassage2
  ];
  
  const modernImages = [
    MASSAGE_SPA_IMAGES.modernBlueSpa, // NEW primary standard option
    MASSAGE_SPA_IMAGES.modernMassage1,
    MASSAGE_SPA_IMAGES.modernMassage2
  ];
  
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
 * Returns an appropriate image URL specifically for a facial spa
 */
export const getFacialSpaImage = (isPremium: boolean = false): string => {
  // For facial spas, prioritize the new luxury spa images
  if (isPremium) {
    return MASSAGE_SPA_IMAGES.luxuryGoldSpa; // Gold accented luxury spa perfect for facial treatments
  }
  
  // For standard facial spas, use the blue spa image which has a clean, clinical feel
  return MASSAGE_SPA_IMAGES.modernBlueSpa;
};

/**
 * Returns an appropriate image URL for a massage job listing
 */
export const getMassageJobImage = (randomize: boolean = true): string => {
  // For job listings, use a mix of all images for variety
  const allImages = [
    MASSAGE_SPA_IMAGES.luxuryGoldSpa, // NEW primary option for jobs
    MASSAGE_SPA_IMAGES.contemporarySpa,
    MASSAGE_SPA_IMAGES.modernBlueSpa,
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
