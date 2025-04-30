import { Job } from "@/types/job";
import { Salon } from "@/types/salon";
import { Listing } from "@/types/listing";
import { supabase } from "@/integrations/supabase/client";

export type ListingType = 'salon' | 'job' | 'opportunity' | 'booth';

interface ValidationLogEntry {
  id: string;
  listingType: ListingType;
  errorReason?: string;
  timestamp: string;
  referrer?: string;
}

// Keep a runtime cache of recently validated IDs
const validatedListingCache = new Map<string, boolean>();

/**
 * Validates if a listing ID exists in the database
 */
export async function validateListingExists(
  id: string, 
  listingType: ListingType
): Promise<boolean> {
  try {
    // First check the cache to prevent unnecessary DB queries
    const cacheKey = `${listingType}:${id}`;
    if (validatedListingCache.has(cacheKey)) {
      return validatedListingCache.get(cacheKey) as boolean;
    }
    
    // Determine which table to query based on listing type
    let exists = false;
    
    switch (listingType) {
      case 'salon':
        // Try looking in salons table
        const { data: salon } = await supabase
          .from('salons')
          .select('id')
          .eq('id', id)
          .single();
        
        // If not found in salons table, check if it exists as a job of type 'salon'
        if (!salon) {
          const { data: salonJob } = await supabase
            .from('posts')
            .select('id')
            .eq('id', id)
            .eq('post_type', 'salon')
            .single();
          
          exists = !!salonJob;
        } else {
          exists = true;
        }
        break;
        
      case 'job':
      case 'opportunity':
        const { data: job } = await supabase
          .from('posts')
          .select('id')
          .eq('id', id)
          .single();
        
        exists = !!job;
        break;
        
      case 'booth':
        const { data: booth } = await supabase
          .from('posts')
          .select('id')
          .eq('id', id)
          .eq('post_type', 'booth')
          .single();
        
        exists = !!booth;
        break;
    }
    
    // Cache the result
    validatedListingCache.set(cacheKey, exists);
    
    // If it doesn't exist, log the invalid attempt
    if (!exists) {
      logInvalidListingAccess(id, listingType, "ID not found in database");
    }
    
    return exists;
  } catch (error) {
    // Log error and return false
    logInvalidListingAccess(id, listingType, error instanceof Error ? error.message : "Unknown error");
    return false;
  }
}

/**
 * Validates listing data to ensure it has all required properties
 */
export function validateListingData(
  listing: Job | Salon | Listing | null | undefined,
  requiredFields: string[] = ['id']
): boolean {
  if (!listing) return false;
  
  try {
    // Check that all required fields exist
    for (const field of requiredFields) {
      if (!(field in listing) || listing[field as keyof typeof listing] === undefined) {
        logInvalidListingAccess(
          listing.id || "unknown", 
          getListingTypeFromData(listing), 
          `Missing required field: ${field}`
        );
        return false;
      }
    }
    
    return true;
  } catch (error) {
    logInvalidListingAccess(
      listing?.id || "unknown", 
      getListingTypeFromData(listing), 
      error instanceof Error ? error.message : "Data validation error"
    );
    return false;
  }
}

/**
 * Determine listing type from data structure
 */
function getListingTypeFromData(listing: any): ListingType {
  if (!listing) return 'opportunity'; // Default fallback
  
  if (listing.type) return listing.type as ListingType;
  if ('salon_name' in listing) return 'salon';
  if ('role' in listing || 'company' in listing) return 'job';
  return 'opportunity';
}

/**
 * Log invalid listing access attempts
 */
export async function logInvalidListingAccess(
  id: string,
  listingType: ListingType,
  errorReason?: string
): Promise<void> {
  try {
    // Log to console for development
    console.error(`Invalid listing access: ${listingType} ID ${id} - ${errorReason || 'Unknown error'}`);
    
    // Create log entry
    const logEntry: ValidationLogEntry = {
      id,
      listingType,
      errorReason,
      timestamp: new Date().toISOString(),
      referrer: typeof window !== 'undefined' ? window.location.href : undefined
    };
    
    // Log to Supabase if in production
    if (process.env.NODE_ENV === 'production') {
      await supabase
        .from('listing_validation_logs')
        .insert({
          listing_id: id,
          listing_type: listingType,
          error_reason: errorReason,
          referrer: logEntry.referrer
        });
    }
  } catch (error) {
    console.error('Failed to log invalid listing access:', error);
  }
}
