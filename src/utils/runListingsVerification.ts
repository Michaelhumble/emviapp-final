
import { validateListing } from './routing/routeValidation';

/**
 * Utility function to verify that listings have proper routing
 * This can be run on application startup or from specific pages
 */
export const runListingsVerification = async (): Promise<void> => {
  console.log("Running listings verification...");
  
  try {
    // Test cases for verification
    const testSalonId = "salon123";
    const testJobId = "job123";
    
    // Validate sample listings
    console.log(`Validating listing: ${testSalonId} of type: salon`);
    const salonResult = await validateListing(testSalonId, "salon");
    
    console.log(`Validating listing: ${testJobId} of type: job`);
    const jobResult = await validateListing(testJobId, "job");
    
    // Log verification results
    console.log("Verification results:", { salonResult, jobResult });
    console.log("Listings verification completed");
  } catch (error) {
    console.error("Error during listings verification:", error);
  }
};

/**
 * Utility to check if a given listing route is valid before navigation
 * Can be used with link components to validate before navigation
 */
export const validateListingRoute = async (id: string, type: 'salon' | 'job' | 'opportunity' | 'booth'): Promise<boolean> => {
  try {
    const result = await validateListing(id, type);
    return result.isValid;
  } catch {
    return false;
  }
};
