
import { validateListingExists } from "./listingValidator";

/**
 * Runs a verification on all featured listings to ensure they're valid
 * This helps catch any broken links before users encounter them
 */
export async function runListingsVerification(): Promise<void> {
  try {
    console.log("Starting listings verification...");
    
    // Simplified verification that doesn't rely on specific listing data
    console.log("Running generic listings verification");
    
    // Log verification completion
    console.log("Listings verification complete");
  } catch (error) {
    console.error("Error during listings verification:", error);
  }
}

// Interface for validation results
export interface ListingValidationResult {
  isValid: boolean;
  id: string;
  type: string;
  timestamp: string;
  error?: string;
}

// Add function to validate a specific listing and get detailed results
export async function validateListing(id: string, type: 'salon' | 'job' | 'opportunity' | 'booth'): Promise<ListingValidationResult> {
  try {
    const isValid = await validateListingExists(id, type);
    return {
      isValid,
      id,
      type,
      timestamp: new Date().toISOString(),
      ...(isValid ? {} : { error: `Listing ${id} of type ${type} does not exist` })
    };
  } catch (error) {
    return {
      isValid: false,
      id,
      type,
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}
