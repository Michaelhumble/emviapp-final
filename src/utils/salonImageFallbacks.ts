
// Define categories for salon types to ensure appropriate image selection
export type SalonCategory = 'nail' | 'hair' | 'barber' | 'spa' | 'beauty' | 'generic';

/**
 * Determines the most appropriate salon category based on description or name
 * This helps select the right fallback images
 */
export const determineSalonCategory = (description: string, name: string): SalonCategory => {
  const combinedText = (description + ' ' + name).toLowerCase();
  
  // Check for barbershop indicators first - added barber detection
  if (
    combinedText.includes('barber') || 
    combinedText.includes('men\'s grooming') ||
    combinedText.includes('mens grooming') ||
    combinedText.includes('men\'s salon') ||
    combinedText.includes('mens salon') ||
    combinedText.includes('men\'s haircut') ||
    combinedText.includes('mens haircut')
  ) {
    return 'barber';
  }
  
  // Check for nail salon indicators
  if (
    combinedText.includes('nail') || 
    combinedText.includes('manicure') || 
    combinedText.includes('pedicure') ||
    combinedText.includes('nails')
  ) {
    return 'nail';
  }
  
  // Check for hair salon indicators
  if (
    combinedText.includes('hair') || 
    combinedText.includes('haircut') || 
    combinedText.includes('hairstylist') ||
    combinedText.includes('stylist')
  ) {
    return 'hair';
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
export const getDefaultSalonImage = (category: SalonCategory): string => {
  // Return appropriate image based on category
  switch (category) {
    case 'barber':
      // Use one of our barbershop images
      return "/lovable-uploads/de0bd2bb-f6a2-486b-8949-0b7cbdb71559.png";
    case 'nail':
      // Use a nail salon image
      return "/lovable-uploads/1aa3efa7-8ea4-4815-91db-85a50b204ded.png";
    case 'hair':
      // Use a hair salon image
      return "/lovable-uploads/5f8eaed6-4a17-4992-a270-6394aad0f43b.png";
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
