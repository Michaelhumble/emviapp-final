// Import the function but don't re-export it
import { 
  getPriceTier, 
  generatePromotionalText,
  // Don't import the duplicate function
} from './posting';

// Re-export only the non-duplicated functions
export { getPriceTier, generatePromotionalText };

// Other exports or code in this file
// ... keep existing code
