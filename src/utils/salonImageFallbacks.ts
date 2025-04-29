
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
