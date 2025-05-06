
// Define categories for salon types to ensure appropriate image selection
export type SalonCategory = 'nail' | 'hair' | 'lash' | 'brow' | 'spa' | 'massage' | 'beauty' | 'generic' | 'barber';

// Import our specialized image utilities
import { getHairSalonImage, isHairSalon } from '@/utils/hairSalonImages';
import { getNailSalonImage, isNailSalon } from '@/utils/nailSalonImages';
import { getLashSalonImage, getBrowSalonImage, isLashSalon, isBrowSalon, getMakeupStudioImage } from '@/utils/lashBrowSalonImages';
import { getMassageSalonImage, isMassageSpa } from '@/utils/massageSalonImages';

/**
 * Determines the most appropriate salon category based on description or name
 * This helps select the right fallback images
 */
export const determineSalonCategory = (): SalonCategory => {
  // Default to generic beauty category as barber has been deprecated
  return 'beauty';
};

/**
 * Returns an appropriate default image URL for the given salon category
 * This helps ensure all listings have appropriate imagery
 */
export const getDefaultSalonImage = (category: SalonCategory, isPremium: boolean = false): string => {
  // Return appropriate image based on category
  switch (category) {
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
    case 'massage':
      // Use massage salon image utility
      return getMassageSalonImage(isPremium);
    case 'spa':
      // Use a spa/wellness image
      return getMassageSalonImage(true);
    case 'beauty':
      // Use a general beauty salon image
      return "/lovable-uploads/f7ba1d82-2928-4e73-a61b-112e5aaf5b7e.png";
    case 'barber':
      // Barber has been deprecated, return a generic image for backwards compatibility
      return "/lovable-uploads/9a7898e7-739c-4a79-8705-70090e25c10b.png";
    default:
      // Fallback generic image
      return "/lovable-uploads/9a7898e7-739c-4a79-8705-70090e25c10b.png";
  }
};
