
/**
 * Utility for managing salon image fallbacks based on business categories
 */

// Define valid salon categories
export type SalonCategory = 'nail' | 'hair' | 'barber' | 'spa' | 'beauty' | 'tattoo' | 'luxury';

// Premium/luxury images
const luxuryImages = [
  "/lovable-uploads/a98d2b96-e38c-43a0-9abe-d846764a9e11.png", // Luxury salon interior
  "/lovable-uploads/2fba1cd5-b1ed-4030-b7e1-06517fbab43e.png", // Nail salon premium
  "/lovable-uploads/89ef4a43-b461-47fc-8b2d-97b07318a891.png", // Nail salon with pink chairs
  "/lovable-uploads/0c68659d-ebd4-4091-aa1a-9329f3690d68.png", // Hair salon premium
  "/lovable-uploads/f3f2a5ae-65d9-4442-8842-1cb9e26cdb56.png"  // Barber shop premium
];

// Nail salon specific images
const nailSalonImages = [
  "/lovable-uploads/2fba1cd5-b1ed-4030-b7e1-06517fbab43e.png", // Nail salon premium
  "/lovable-uploads/89ef4a43-b461-47fc-8b2d-97b07318a891.png", // Nail salon with pink chairs
  "/lovable-uploads/1bc30225-0249-44a2-8086-c0a8ecbd57c2.png", // Nail salon another view
];

// Hair salon specific images
const hairSalonImages = [
  "/lovable-uploads/0c68659d-ebd4-4091-aa1a-9329f3690d68.png", // Hair salon premium
  "/lovable-uploads/ec5e520a-440f-4a62-bee8-23ba0c7e7c4c.png", // Luxury hair salon interior
];

// Barber shop specific images
const barberShopImages = [
  "/lovable-uploads/f3f2a5ae-65d9-4442-8842-1cb9e26cdb56.png", // Barber shop premium
  "/lovable-uploads/56896daa-2bfa-44c0-b666-d2b7eb5a8205.png", // Luxury barbershop
];

// Spa specific images
const spaImages = [
  "/lovable-uploads/00ccb907-6755-4698-a289-71b05f7012f1.png", // Luxury spa room
  "/lovable-uploads/9e713225-1758-4c21-84d3-33e7707a2806.png", // Premium spa treatment chairs
  "/lovable-uploads/81e6d95d-e09b-45f0-a4bc-96358592e462.png", // Spa treatment room
];

// Generic beauty salon images
const beautySalonImages = [
  "/lovable-uploads/a98d2b96-e38c-43a0-9abe-d846764a9e11.png", // Luxury salon interior
  "/lovable-uploads/1aa3efa7-8ea4-4815-91db-85a50b204ded.png", // Modern salon interior
];

// Check if an image is from our premium collection
export const isPremiumImage = (imagePath: string): boolean => {
  if (!imagePath) return false;
  return luxuryImages.some(img => imagePath.includes(img.split('/').pop() || ''));
};

// Get a random image from our collection based on category
export const getRandomCategoryImage = (category: SalonCategory): string => {
  let categoryImages: string[];
  
  switch(category) {
    case 'nail':
      categoryImages = nailSalonImages;
      break;
    case 'hair':
      categoryImages = hairSalonImages;
      break;
    case 'barber':
      categoryImages = barberShopImages;
      break;
    case 'spa':
      categoryImages = spaImages;
      break;
    case 'luxury':
      categoryImages = luxuryImages;
      break;
    case 'tattoo': // Use beauty salon images for tattoo
    case 'beauty':
    default:
      categoryImages = beautySalonImages;
      break;
  }
  
  // Return a random image from the appropriate category
  return categoryImages[Math.floor(Math.random() * categoryImages.length)];
};

// Get default salon image based on category
export const getDefaultSalonImage = (category: SalonCategory): string => {
  switch(category) {
    case 'nail':
      return "/lovable-uploads/2fba1cd5-b1ed-4030-b7e1-06517fbab43e.png";
    case 'hair':
      return "/lovable-uploads/0c68659d-ebd4-4091-aa1a-9329f3690d68.png";
    case 'barber':
      return "/lovable-uploads/f3f2a5ae-65d9-4442-8842-1cb9e26cdb56.png";
    case 'spa':
      return "/lovable-uploads/00ccb907-6755-4698-a289-71b05f7012f1.png";
    case 'tattoo':
      return "/lovable-uploads/a98d2b96-e38c-43a0-9abe-d846764a9e11.png";
    case 'luxury':
      return "/lovable-uploads/a98d2b96-e38c-43a0-9abe-d846764a9e11.png";
    case 'beauty':
    default:
      return "/lovable-uploads/1aa3efa7-8ea4-4815-91db-85a50b204ded.png";
  }
};

// Get all images for a specific category (useful for displaying options)
export const getCategoryFallbackImages = (category: SalonCategory): string[] => {
  switch(category) {
    case 'nail':
      return nailSalonImages;
    case 'hair':
      return hairSalonImages;
    case 'barber':
      return barberShopImages;
    case 'spa':
      return spaImages;
    case 'luxury':
      return luxuryImages;
    case 'tattoo':
    case 'beauty':
    default:
      return beautySalonImages;
  }
};

// Determine if a salon is likely a nail salon based on description or name
export const isLikelyNailSalon = (description: string = '', name: string = ''): boolean => {
  const combinedText = (description + ' ' + name).toLowerCase();
  return combinedText.includes('nail') || 
         combinedText.includes('manicure') || 
         combinedText.includes('pedicure');
};

// Determine if a salon is likely a hair salon based on description or name
export const isLikelyHairSalon = (description: string = '', name: string = ''): boolean => {
  const combinedText = (description + ' ' + name).toLowerCase();
  return combinedText.includes('hair') || 
         combinedText.includes('stylist') || 
         combinedText.includes('coloring');
};

// Get the most appropriate image category based on textual description
export const determineSalonCategory = (description: string = '', name: string = ''): SalonCategory => {
  const combinedText = (description + ' ' + name).toLowerCase();
  
  if (combinedText.includes('nail') || combinedText.includes('manicure') || combinedText.includes('pedicure')) {
    return 'nail';
  } else if (combinedText.includes('barber') || combinedText.includes('men')) {
    return 'barber';
  } else if (combinedText.includes('hair') || combinedText.includes('stylist') || combinedText.includes('cut')) {
    return 'hair';
  } else if (combinedText.includes('spa') || combinedText.includes('massage') || combinedText.includes('facial')) {
    return 'spa';
  } else if (combinedText.includes('tattoo') || combinedText.includes('pmu') || combinedText.includes('permanent makeup')) {
    return 'tattoo';
  } else if (combinedText.includes('luxury') || combinedText.includes('premium') || combinedText.includes('high-end')) {
    return 'luxury';
  } else {
    return 'beauty';
  }
};
