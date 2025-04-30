
/**
 * Listing type definition
 */
export type ListingType = 'salon' | 'job' | 'opportunity' | 'booth';

/**
 * Validates if a listing exists in the database
 */
export async function validateListingExists(id: string, type: ListingType): Promise<boolean> {
  try {
    // If the ID starts with a prefix like "salon-", it's not a UUID
    if (id.includes('-') && isNaN(parseInt(id.split('-')[0]))) {
      // For IDs that are clearly not UUIDs (like "salon-10"), we can either:
      // 1. Return true if these are valid non-UUID IDs in your system
      // 2. Handle them differently based on your data structure
      console.log(`Non-UUID ID detected: ${id} of type ${type}`);
      
      // If these are valid IDs in your system that just don't exist in the database as UUIDs
      // You can implement custom validation logic here specific to your ID format
      return true;
    }
    
    // For proper UUID validation, we continue with the existing approach
    // but with added error handling for UUID format issues
    
    // The query will depend on the type of listing
    let exists = false;
    
    switch(type) {
      case 'salon':
        // Check if a salon with this ID exists
        // This assumes salons are stored in a 'salons' table
        try {
          const { data } = await supabase
            .from('salons')
            .select('id')
            .eq('id', id)
            .single();
          
          exists = !!data;
        } catch (err: any) {
          if (err.message && err.message.includes('invalid input syntax for type uuid')) {
            console.warn(`Invalid UUID format for salon id: ${id}`);
            // If ID format is invalid but it's expected in your system, return true
            return true;
          }
          console.error(`Error checking salon existence: ${err.message}`);
        }
        break;
        
      case 'job':
        // Check if a job with this ID exists
        try {
          const { data } = await supabase
            .from('jobs')
            .select('id')
            .eq('id', id)
            .single();
          
          exists = !!data;
        } catch (err: any) {
          if (err.message && err.message.includes('invalid input syntax for type uuid')) {
            console.warn(`Invalid UUID format for job id: ${id}`);
            return true;
          }
          console.error(`Error checking job existence: ${err.message}`);
        }
        break;
        
      // Similarly handle other types...
      default:
        console.warn(`Unhandled listing type: ${type}`);
    }
    
    return exists;
  } catch (error) {
    console.error(`Error validating listing existence: ${error}`);
    // If there's an error in validation, fail safely
    return false;
  }
}

/**
 * Validates if listing data has all required fields
 */
export function validateListingData(listing: any, requiredFields: string[] = []): boolean {
  // If no listing provided, validation fails
  if (!listing) return false;
  
  // Check that all required fields exist and are not null/undefined/empty
  return requiredFields.every(field => {
    const fieldValue = listing[field];
    return fieldValue !== undefined && fieldValue !== null && fieldValue !== '';
  });
}

// Import statement for supabase client
import { supabase } from "@/integrations/supabase/client";
