
/**
 * Listing type definition
 */
export type ListingType = 'salon' | 'job' | 'opportunity' | 'booth';

/**
 * Error response from listing validation
 */
export interface ListingValidationResult {
  isValid: boolean;
  errorCode?: string;
  errorMessage?: string;
}

/**
 * Validates if a listing exists in the database
 * Returns detailed validation results for better error handling
 */
export async function validateListingExists(id: string, type: ListingType): Promise<boolean | ListingValidationResult> {
  try {
    // Input validation - prevent validation of empty or malformed IDs
    if (!id || typeof id !== 'string') {
      return {
        isValid: false,
        errorCode: 'INVALID_ID_FORMAT',
        errorMessage: 'Listing ID is missing or invalid'
      };
    }

    // Performance optimization for non-UUID format IDs
    if (id.includes('-') && isNaN(parseInt(id.split('-')[0]))) {
      console.log(`Non-UUID ID detected: ${id} of type ${type}`);
      
      // If these are valid IDs in your system that just don't exist in the database as UUIDs
      // We can still verify their basic structure is valid
      const [prefix, numericPart] = id.split('-');
      
      if (!prefix || !numericPart || !['salon', 'job', 'opportunity', 'booth'].includes(prefix)) {
        return {
          isValid: false,
          errorCode: 'INVALID_ID_FORMAT',
          errorMessage: `Invalid listing ID format: ${id}`
        };
      }
      
      // This is a valid format for a non-UUID ID
      return true;
    }
    
    // For proper UUID validation and database checking
    let exists = false;
    
    // Use a type-specific approach for better performance
    try {
      switch(type) {
        case 'salon':
          // Check if a salon with this ID exists
          const { data: salonData, error: salonError } = await supabase
            .from('salons')
            .select('id')
            .eq('id', id)
            .maybeSingle(); // Using maybeSingle instead of single for better error handling
          
          if (salonError) {
            // If there's a UUID format error, provide clear feedback
            if (salonError.message && salonError.message.includes('invalid input syntax for type uuid')) {
              console.warn(`Invalid UUID format for salon id: ${id}`);
              return {
                isValid: false,
                errorCode: 'INVALID_UUID',
                errorMessage: 'Invalid UUID format for salon listing'
              };
            }
            
            throw salonError;
          }
          
          exists = !!salonData;
          break;
          
        case 'job':
          // Check if a job with this ID exists
          const { data: jobData, error: jobError } = await supabase
            .from('jobs')
            .select('id')
            .eq('id', id)
            .maybeSingle();
          
          if (jobError) {
            // Handle UUID format errors
            if (jobError.message && jobError.message.includes('invalid input syntax for type uuid')) {
              console.warn(`Invalid UUID format for job id: ${id}`);
              return {
                isValid: false,
                errorCode: 'INVALID_UUID',
                errorMessage: 'Invalid UUID format for job listing'
              };
            }
            
            throw jobError;
          }
          
          exists = !!jobData;
          break;
        
        case 'opportunity':
          // Check if an opportunity with this ID exists (typically in posts table)
          const { data: opportunityData, error: opportunityError } = await supabase
            .from('posts')
            .select('id')
            .eq('id', id)
            .eq('post_type', 'opportunity')
            .maybeSingle();
          
          if (opportunityError) {
            if (opportunityError.message && opportunityError.message.includes('invalid input syntax for type uuid')) {
              console.warn(`Invalid UUID format for opportunity id: ${id}`);
              return {
                isValid: false,
                errorCode: 'INVALID_UUID',
                errorMessage: 'Invalid UUID format for opportunity listing'
              };
            }
            
            throw opportunityError;
          }
          
          exists = !!opportunityData;
          break;
          
        case 'booth':
          // Check if a booth with this ID exists
          const { data: boothData, error: boothError } = await supabase
            .from('posts')
            .select('id') 
            .eq('id', id)
            .eq('post_type', 'booth')
            .maybeSingle();
          
          if (boothError) {
            if (boothError.message && boothError.message.includes('invalid input syntax for type uuid')) {
              console.warn(`Invalid UUID format for booth id: ${id}`);
              return {
                isValid: false,
                errorCode: 'INVALID_UUID',
                errorMessage: 'Invalid UUID format for booth listing'
              };
            }
            
            throw boothError;
          }
          
          exists = !!boothData;
          break;
          
        default:
          console.warn(`Unhandled listing type: ${type}`);
          return {
            isValid: false,
            errorCode: 'UNSUPPORTED_TYPE',
            errorMessage: `Listing type "${type}" is not supported`
          };
      }
      
      // If listing doesn't exist, return structured error
      if (!exists) {
        return {
          isValid: false,
          errorCode: 'LISTING_NOT_FOUND',
          errorMessage: `${type.charAt(0).toUpperCase() + type.slice(1)} listing with ID ${id} was not found`
        };
      }
      
      return exists;
    } catch (error) {
      // Enhanced error logging for debugging
      console.error(`Error validating ${type} listing with ID ${id}:`, error);
      
      // Return structured error information
      return {
        isValid: false,
        errorCode: 'VALIDATION_ERROR',
        errorMessage: error instanceof Error ? error.message : 'Unknown error during listing validation'
      };
    }
  } catch (error) {
    console.error(`Unexpected error in validateListingExists:`, error);
    return {
      isValid: false,
      errorCode: 'UNEXPECTED_ERROR',
      errorMessage: error instanceof Error ? error.message : 'Unexpected error during validation'
    };
  }
}

/**
 * Validates if listing data has all required fields with improved type checking
 */
export function validateListingData<T extends Record<string, any>>(
  listing: T | null | undefined,
  requiredFields: (keyof T)[] = []
): ListingValidationResult {
  // If no listing provided, validation fails with specific error
  if (!listing) {
    return {
      isValid: false,
      errorCode: 'MISSING_LISTING_DATA',
      errorMessage: 'No listing data provided for validation'
    };
  }
  
  // Check each required field and return specific failure information
  for (const field of requiredFields) {
    const fieldValue = listing[field];
    
    if (fieldValue === undefined || fieldValue === null || fieldValue === '') {
      return {
        isValid: false,
        errorCode: 'MISSING_REQUIRED_FIELD',
        errorMessage: `Required field "${String(field)}" is missing or empty`
      };
    }
  }
  
  // All checks passed
  return { isValid: true };
}

/**
 * Helper to safely extract values from a listing with proper type safety
 */
export function getListingValue<T extends object, K extends keyof T>(
  listing: T | null | undefined,
  key: K,
  defaultValue: T[K]
): T[K] {
  if (!listing) return defaultValue;
  return (listing[key] !== undefined && listing[key] !== null) ? listing[key] : defaultValue;
}

// Import statement for supabase client
import { supabase } from "@/integrations/supabase/client";
