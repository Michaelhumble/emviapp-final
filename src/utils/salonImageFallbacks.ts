
// Define categories for salon types to ensure appropriate image selection
export type SalonCategory = 'nail' | 'hair' | 'barber' | 'lash' | 'brow' | 'spa' | 'beauty' | 'generic';

// Import our specialized image utilities
import { getBarberShopImage, isBarberShop } from '@/utils/barberShopImages';
import { getHairSalonImage, isHairSalon } from '@/utils/hairSalonImages';
import { getNailSalonImage, isNailSalon } from '@/utils/nailSalonImages';
import { getLashSalonImage, getBrowSalonImage, isLashSalon, isBrowSalon } from '@/utils/lashBrowSalonImages';

/**
 * Determines the most appropriate salon category based on description or name
 * This helps select the right fallback images
 */
export const determineSalonCategory = (description: string, name: string): SalonCategory => {
  const combinedText = (description + ' ' + name).toLowerCase();
  
  // Check for barbershop indicators first - added barber detection
  if (isBarberShop(name, description)) {
    return 'barber';
  }
  
  // Check for hair salon indicators next
  if (isHairSalon(name, description)) {
    return 'hair';
  }
  
  // Check for lash salon indicators
  if (isLashSalon(name, description)) {
    return 'lash';
  }
  
  // Check for brow salon indicators
  if (isBrowSalon(name, description)) {
    return 'brow';
  }
  
  // Check for nail salon indicators
  if (isNailSalon(name, description)) {
    return 'nail';
  }
  
  // Check for spa indicators
  if (
    combinedText.includes('spa') || 
    combinedText.includes('massage') || 
    combinedText.includes('facial') ||
    combinedText.includes('treatment')
  ) {
    return 'spa';
  }
  
  // Default to generic beauty category
  return 'beauty';
};

/**
 * Returns an appropriate default image URL for the given salon category
 * This helps ensure all listings have appropriate imagery
 */
export const getDefaultSalonImage = (category: SalonCategory, isPremium: boolean = false): string => {
  // Return appropriate image based on category
  switch (category) {
    case 'barber':
      // Use our barbershop image utility
      return getBarberShopImage(isPremium, isPremium);
    case 'hair':
      // Use our hair salon image utility
      return getHairSalonImage(isPremium, isPremium);
    case 'lash':
      // Use our lash salon image utility
      return getLashSalonImage(isPremium);
    case 'brow':
      // Use our brow salon image utility
      return getBrowSalonImage(isPremium);
    case 'nail':
      // Use a nail salon image
      return getNailSalonImage(false, isPremium, isPremium);
    case 'spa':
      // Use a spa/wellness image
      return "/lovable-uploads/b13a3b43-f6e1-4746-9992-03f6e8fac6bf.png";
    case 'beauty':
      // Use a general beauty salon image
      return "/lovable-uploads/f7ba1d82-2928-4e73-a61b-112e5aaf5b7e.png";
    default:
      // Fallback generic image
      return "/lovable-uploads/9a7898e7-739c-4a79-8705-70090e25c10b.png";
  }
};
