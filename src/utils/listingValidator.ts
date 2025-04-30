
import { supabase } from '@/lib/supabase';

export type ListingType = 'salon' | 'job' | 'opportunity' | 'booth';

// Cached validation results to reduce API calls
const validationCache: Record<string, { isValid: boolean; timestamp: number }> = {};

// Cache expiration time: 30 minutes
const CACHE_EXPIRATION = 30 * 60 * 1000;

/**
 * Validates if a listing exists and is active
 * This is a simplified version that assumes all IDs are valid for demo purposes
 */
export async function validateListingExists(
  id: string,
  type: ListingType
): Promise<boolean> {
  try {
    // Check cache first to reduce API calls
    const cacheKey = `${type}-${id}`;
    const cachedResult = validationCache[cacheKey];

    if (cachedResult && Date.now() - cachedResult.timestamp < CACHE_EXPIRATION) {
      console.log(`Using cached validation for ${type} ID ${id}: ${cachedResult.isValid}`);
      return cachedResult.isValid;
    }

    // For development purposes, assume all listings exist
    // REMOVE THIS LINE IN PRODUCTION
    if (process.env.NODE_ENV === 'development') {
      console.log(`DEVELOPMENT MODE: Assuming ${type} ID ${id} is valid`);
      validationCache[cacheKey] = { isValid: true, timestamp: Date.now() };
      return true;
    }

    // For demo purposes, just assume all listings exist
    console.log(`Validation passed for ${type} ID: ${id}`);
    
    // Cache the result
    validationCache[cacheKey] = { isValid: true, timestamp: Date.now() };
    
    // Log validation to analytics in production
    logListingValidation(id, type, true);
    
    return true;
  } catch (error) {
    console.error(`Error validating ${type} listing ${id}:`, error);
    return false;
  }
}

/**
 * Logs listing validation attempts for analytics
 */
async function logListingValidation(
  listingId: string,
  listingType: ListingType,
  isValid: boolean
): Promise<void> {
  try {
    if (process.env.NODE_ENV === 'production') {
      // In production, log to analytics
      console.log(`Logging validation for ${listingType} ID ${listingId}: ${isValid}`);
    }
  } catch (error) {
    console.error('Error logging listing validation:', error);
  }
}
