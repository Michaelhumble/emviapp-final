
import { salonListings } from '@/components/home/SalonJobListingsShowcase';
import { Job } from '@/types/job';

/**
 * Verifies all listings to ensure they have unique IDs and proper configuration for routing
 */
export const verifyListings = (): {
  isValid: boolean;
  issues: string[];
  totalListings: number;
} => {
  const issues: string[] = [];
  
  // Check for unique IDs
  const ids = salonListings.map(listing => listing.id);
  const uniqueIds = new Set(ids);
  
  if (uniqueIds.size !== salonListings.length) {
    issues.push(`Found ${salonListings.length - uniqueIds.size} duplicate IDs in listings`);
  }
  
  // Check for missing IDs
  const missingIds = salonListings.filter(listing => !listing.id);
  if (missingIds.length > 0) {
    issues.push(`Found ${missingIds.length} listings without IDs`);
  }
  
  // Check for listings without description
  const missingDescription = salonListings.filter(
    listing => !listing.description && !listing.vietnamese_description
  );
  if (missingDescription.length > 0) {
    issues.push(`Found ${missingDescription.length} listings without any description`);
  }
  
  // Check for listings without company name
  const missingCompany = salonListings.filter(listing => !listing.company);
  if (missingCompany.length > 0) {
    issues.push(`Found ${missingCompany.length} listings without company name`);
  }
  
  // Log the verification results
  const verificationResult = {
    isValid: issues.length === 0,
    issues,
    totalListings: salonListings.length
  };
  
  console.log("Listings verification complete:", verificationResult);
  
  return verificationResult;
};

/**
 * Verify all opportunity listings have valid IDs and are properly routable
 */
export const verifyOpportunityListings = (listings: Job[]): {
  isValid: boolean;
  issues: string[];
  totalListings: number;
} => {
  const issues: string[] = [];
  
  // Check for unique IDs
  const ids = listings.map(listing => listing.id);
  const uniqueIds = new Set(ids);
  
  if (uniqueIds.size !== listings.length) {
    issues.push(`Found ${listings.length - uniqueIds.size} duplicate IDs in opportunity listings`);
  }
  
  // Check for missing IDs
  const missingIds = listings.filter(listing => !listing.id);
  if (missingIds.length > 0) {
    issues.push(`Found ${missingIds.length} opportunity listings without IDs`);
  }
  
  // Check for properly formatted IDs (they should be strings, not numbers)
  const nonStringIds = listings.filter(listing => listing.id && typeof listing.id !== 'string');
  if (nonStringIds.length > 0) {
    issues.push(`Found ${nonStringIds.length} opportunity listings with non-string IDs`);
  }
  
  // Log the verification results
  const verificationResult = {
    isValid: issues.length === 0,
    issues,
    totalListings: listings.length
  };
  
  console.log("Opportunity listings verification complete:", verificationResult);
  
  return verificationResult;
};

/**
 * Run verification on app startup (call this in App.tsx or index.tsx)
 */
export const runListingsVerification = () => {
  const results = verifyListings();
  if (!results.isValid) {
    console.warn("⚠️ Listing verification failed:", results.issues);
  } else {
    console.log(`✅ All ${results.totalListings} listings verified successfully`);
  }
};
