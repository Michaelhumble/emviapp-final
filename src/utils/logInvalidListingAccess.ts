
import { supabase } from "@/integrations/supabase/client";
import { ListingType } from "./listingValidator";

/**
 * Interface for listing validation log entries
 */
interface ListingValidationLogEntry {
  id: string;
  listing_id: string;
  listing_type: ListingType;
  error_reason?: string;
  referrer?: string;
  user_id?: string | null;
}

/**
 * Log invalid listing access attempts to Supabase
 * This can be used to track and fix broken links
 */
export async function logInvalidListingAccess(
  listingId: string,
  listingType: ListingType,
  errorReason?: string
): Promise<void> {
  try {
    // Get current user if available
    const { data: { user } } = await supabase.auth.getUser();
    
    // Log to console for development
    console.warn(`Invalid listing access: ${listingType} ID ${listingId} - ${errorReason || 'Unknown error'}`);
    
    // Create log entry
    const logEntry: ListingValidationLogEntry = {
      id: crypto.randomUUID(),
      listing_id: listingId,
      listing_type: listingType,
      error_reason: errorReason,
      referrer: typeof window !== 'undefined' ? window.location.href : undefined,
      user_id: user?.id
    };
    
    // Log to Supabase
    await supabase
      .from('listing_validation_logs')
      .insert(logEntry);
  } catch (error) {
    // Don't let logging errors affect the app
    console.error('Failed to log invalid listing access:', error);
  }
}

/**
 * Helper function to safely access properties on objects with unknown structure
 */
export function safeGet<T, K extends keyof T>(obj: T | null | undefined, key: K, fallback: T[K]): T[K] {
  if (!obj) return fallback;
  if (!(key in obj)) return fallback;
  return obj[key] !== undefined && obj[key] !== null ? obj[key] : fallback;
}
