
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
      for (const salon of salonListings) {
        if (salon.id) {
          const isValid = await validateListingExists(salon.id, 'salon');
          if (!isValid) {
            console.error(`Invalid salon listing detected: ${salon.id} - ${salon.name || 'Unnamed'}`);
          }
        }
      }
    }
    
    console.log("Listings verification complete");
  } catch (error) {
    console.error("Error during listings verification:", error);
  }
}
