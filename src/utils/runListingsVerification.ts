
import { validateListingExists } from "./listingValidator";
import { salonListings } from "@/data/salonData";

/**
 * Runs a verification on all featured listings to ensure they're valid
 * This helps catch any broken links before users encounter them
 */
export async function runListingsVerification(): Promise<void> {
  try {
    console.log("Starting listings verification...");
    
    // Verify salon listings
    if (salonListings && salonListings.length > 0) {
      console.log(`Verifying ${salonListings.length} salon listings`);
      let validCount = 0;
      let invalidCount = 0;
      
      for (const salon of salonListings) {
        if (salon.id) {
          const isValid = await validateListingExists(salon.id, 'salon');
          if (!isValid) {
            console.error(`❌ Invalid salon listing detected: ${salon.id} - ${salon.name || 'Unnamed'}`);
            invalidCount++;
          } else {
            console.log(`✓ Valid salon listing: ${salon.id} - ${salon.name || 'Unnamed'}`);
            validCount++;
          }
        }
      }
      
      console.log(`Salon listings verification completed: ${validCount} valid, ${invalidCount} invalid`);
    } else {
      console.log("No salon listings found to verify");
    }
    
    console.log("Listings verification complete");
  } catch (error) {
    console.error("Error during listings verification:", error);
  }
}

// Add function to validate a specific listing and get detailed results
export async function validateListing(id: string, type: 'salon' | 'job' | 'opportunity' | 'booth'): Promise<{
  isValid: boolean;
  id: string;
  type: string;
  timestamp: string;
  error?: string;
}> {
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
