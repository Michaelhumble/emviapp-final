
import { Job } from '@/types/job';

/**
 * Enhances a listing with a fallback image URL if needed
 */
export const enhanceListingWithImage = (listing: Partial<Job>): Job => {
  // Create a copy of the listing to avoid mutating the original
  const enhancedListing = { ...listing } as Job;
  
  // Ensure listing has required properties
  if (!enhancedListing.created_at) {
    enhancedListing.created_at = new Date().toISOString();
  }

  // Ensure type is set
  if (!enhancedListing.type) {
    // Determine type based on available properties
    if (enhancedListing.salon_features || enhancedListing.salon_type) {
      enhancedListing.type = 'salon';
    } else {
      enhancedListing.type = 'opportunity';
    }
  }

  // Ensure image is set
  if (!enhancedListing.imageUrl) {
    // Check if image property exists and use it
    if (enhancedListing.image) {
      enhancedListing.imageUrl = enhancedListing.image;
    } else {
      // Default fallback images based on type
      const defaultImages: Record<string, string> = {
        'salon': '/lovable-uploads/68057e27-17e9-4643-941f-d68d048d40ce.png',
        'job': '/lovable-uploads/bb5c8292-c127-4fd2-9663-c65d596b135d.png',
        'opportunity': '/lovable-uploads/52b943aa-d9b3-46ce-9f7f-94f3b223cb28.png',
        'booth': '/lovable-uploads/72f0f6c8-5793-4750-993d-f250b495146d.png'
      };
      
      enhancedListing.imageUrl = defaultImages[enhancedListing.type || 'salon'];
    }
  }

  return enhancedListing as Job;
};

/**
 * Verify all listings in a collection have required properties
 */
export const verifyListings = (listings: Job[]): {
  isValid: boolean;
  validListings: Job[];
  issues: string[];
} => {
  const validListings: Job[] = [];
  const issues: string[] = [];
  
  listings.forEach((listing, index) => {
    // Check if listing has required properties
    if (!listing.id) {
      issues.push(`Listing at index ${index} has no ID`);
      return;
    }
    
    if (!listing.title && !listing.company) {
      issues.push(`Listing ${listing.id} has no title or company name`);
    }
    
    if (!listing.location) {
      issues.push(`Listing ${listing.id} has no location`);
    }
    
    // Enhance the listing with required properties
    validListings.push(enhanceListingWithImage(listing));
  });
  
  return {
    isValid: issues.length === 0,
    validListings,
    issues
  };
};

/**
 * Verifies specifically opportunity listings
 */
export const verifyOpportunityListings = (listings: Job[]): Job[] => {
  const { validListings } = verifyListings(listings);
  return validListings.map(listing => {
    // Ensure all opportunity-specific fields are set
    if (!listing.type) listing.type = 'opportunity';
    return listing;
  });
};

/**
 * Checks if a listing can be displayed
 */
export const isListingDisplayable = (listing: Job): boolean => {
  return !!(listing && listing.id && (listing.title || listing.company) && listing.location);
};

/**
 * Run listing verification on app startup
 */
export const runListingsVerification = async (): Promise<void> => {
  console.log('Running listings verification on app startup...');
  // Additional verification logic can be added here if needed
  return Promise.resolve();
};
