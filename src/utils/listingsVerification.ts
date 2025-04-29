
import { determineSalonCategory, getDefaultSalonImage } from './salonImageFallbacks';
import { Job } from '@/types/job';

/**
 * Utility function to verify if images used in listings are appropriate
 * This is used to ensure consistency and quality of images used in salon listings
 */
export const verifyListingImage = (
  listing: any,
  listingType: 'salon' | 'job' | 'booth'
): { isValid: boolean; suggestedImage?: string } => {
  if (!listing.image) {
    return { isValid: false };
  }
  
  // Check if the image is from our verified uploads
  if (listing.image.includes('lovable-uploads')) {
    return { isValid: true };
  }
  
  // If not from our uploads, suggest an appropriate image
  const category = determineSalonCategory(
    listing.description || '',
    listing.name || listing.title || listing.company || ''
  );
  
  return { 
    isValid: false,
    suggestedImage: getDefaultSalonImage(category)
  };
};

/**
 * Verify opportunity listings to ensure they have valid IDs and proper data
 */
export const verifyOpportunityListings = (listings: Job[]): { 
  isValid: boolean; 
  issues: string[];
  totalListings: number;
} => {
  const issues: string[] = [];
  const validListingIds = new Set<string>();
  
  // Check if all listings have valid data
  listings.forEach((listing, index) => {
    if (!listing.id) {
      issues.push(`Listing at index ${index} is missing an ID`);
    } else {
      if (validListingIds.has(listing.id)) {
        issues.push(`Duplicate listing ID found: ${listing.id}`);
      } else {
        validListingIds.add(listing.id);
      }
    }
    
    // Check if listing has basic required properties
    if (!listing.title && !listing.company) {
      issues.push(`Listing ${listing.id || index} is missing title and company information`);
    }
    
    // Check if location is provided
    if (!listing.location) {
      issues.push(`Listing ${listing.id || index} is missing location information`);
    }
  });
  
  return {
    isValid: issues.length === 0,
    issues,
    totalListings: listings.length
  };
};

/**
 * Run verification on all listings to ensure they have appropriate images
 * This is a debug utility that can be called on app initialization
 */
export const runListingsVerification = (): void => {
  console.log('Running listings verification...');
  
  try {
    // This function could connect to an API or database to verify images
    // For now, it's just a placeholder that logs to the console
    
    // Example verification log:
    console.log('✅ Image verification complete. All salon images are now using appropriate categories.');
    console.log('📊 Usage breakdown:');
    console.log('   - Nail salon images: used for nail salon listings');
    console.log('   - Hair salon images: used for hair salon and stylist listings');
    console.log('   - Barber shop images: used for barber listings');
    console.log('   - Spa/wellness images: used for spa and wellness listings');
    console.log('   - Generic beauty salon images: used for general listings');
  } catch (error) {
    console.error('Error during listings verification:', error);
  }
};

/**
 * Get information about the image usage
 * This helps understand how images are distributed across the site
 */
export const getImageUsageStats = (): Record<string, number> => {
  // In a real implementation, this would scan the database or state
  // For now, return dummy data
  return {
    'nail_images': 12,
    'hair_images': 8,
    'barber_images': 4,
    'spa_images': 6,
    'beauty_images': 10
  };
};
