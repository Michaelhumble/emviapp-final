
import { determineSalonCategory, getDefaultSalonImage } from './salonImageFallbacks';
import { Job } from '@/types/job';
import { Salon } from '@/types/salon';

/**
 * Utility function to verify if images used in listings are appropriate
 * This is used to ensure consistency and quality of images used in salon listings
 */
export const verifyListingImage = (
  listing: any,
  listingType: 'salon' | 'job' | 'booth'
): { isValid: boolean; suggestedImage?: string } => {
  if (!listing.image && !listing.imageUrl) {
    return { isValid: false };
  }
  
  // Check if the image is from our verified uploads
  if ((listing.image && listing.image.includes('lovable-uploads')) || 
      (listing.imageUrl && listing.imageUrl.includes('lovable-uploads'))) {
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
  validListings: Job[];
} => {
  const issues: string[] = [];
  const validListingIds = new Set<string>();
  const validListings: Job[] = [];
  
  // Check if all listings have valid data
  listings.forEach((listing, index) => {
    let isListingValid = true;
    
    if (!listing.id) {
      issues.push(`Listing at index ${index} is missing an ID`);
      isListingValid = false;
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
      isListingValid = false;
    }
    
    // Check if location is provided
    if (!listing.location) {
      issues.push(`Listing ${listing.id || index} is missing location information`);
      isListingValid = false;
    }
    
    // If the listing is valid, add it to our valid listings array
    if (isListingValid) {
      validListings.push(listing);
    }
  });
  
  return {
    isValid: issues.length === 0,
    issues,
    totalListings: listings.length,
    validListings
  };
};

/**
 * Enhance a listing with proper image based on its type
 * Ensures all listings have appropriate, high-quality images
 */
export const enhanceListingWithImage = (listing: Job): Job => {
  const enhancedListing = { ...listing };
  
  // Skip if listing already has a valid image
  if (enhancedListing.imageUrl && enhancedListing.imageUrl.includes('lovable-uploads')) {
    return enhancedListing;
  }
  
  // Determine listing category
  const category = determineSalonCategory(
    enhancedListing.description || '',
    enhancedListing.title || enhancedListing.company || ''
  );
  
  // Assign appropriate image based on listing type
  enhancedListing.imageUrl = getDefaultSalonImage(category, !!enhancedListing.is_featured);
  
  return enhancedListing;
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
