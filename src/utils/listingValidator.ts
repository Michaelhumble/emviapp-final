
import { supabase } from "@/integrations/supabase/client";

export type ListingType = 'salon' | 'job' | 'opportunity' | 'booth';

/**
 * Validates if a listing exists in the database
 * @param id The listing ID to validate
 * @param listingType The type of listing (salon, job, opportunity, booth)
 * @returns Promise<boolean> indicating if the listing exists
 */
export async function validateListingExists(id: string, listingType: ListingType): Promise<boolean> {
  try {
    // For development purposes, we'll default to true but log the attempted validation
    console.log(`Validating ${listingType} listing with ID: ${id}`);
    
    if (!id) return false;
    
    // In a real implementation, we would query different tables based on type
    // We need to use table names that exist in the Supabase schema
    const tableName = listingType === 'salon' ? 'salons' : 
                      (listingType === 'job' || listingType === 'opportunity') ? 'jobs' : 'posts';
    
    // Query the appropriate table to check if the listing exists
    const { data, error } = await supabase
      .from(tableName)
      .select('id')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error(`Error validating ${listingType} with ID ${id}:`, error);
      return false;
    }
    
    return !!data;
  } catch (error) {
    console.error('Error in validateListingExists:', error);
    return false;
  }
}

/**
 * Fetch valid listings data from Supabase
 * @returns Promise<Array<any>> Array of valid listings
 */
export async function fetchValidListings(limit: number = 6): Promise<any[]> {
  try {
    // First, try to get salon listings
    const { data: salonData, error: salonError } = await supabase
      .from('salons')
      .select('*')
      .eq('status', 'active')
      .limit(limit/2);
      
    if (salonError) {
      console.error('Error fetching salon listings:', salonError);
    }
    
    // Then, get job listings
    const { data: jobData, error: jobError } = await supabase
      .from('jobs')
      .select('*')
      .eq('status', 'active')
      .limit(limit/2);
    
    if (jobError) {
      console.error('Error fetching job listings:', jobError);
    }
    
    // Combine and process the data
    const salonListings = (salonData || []).map(salon => ({
      ...salon,
      type: 'salon'
    }));
    
    const jobListings = (jobData || []).map(job => ({
      ...job,
      type: 'job'
    }));
    
    // Combine and shuffle
    const combinedListings = [...salonListings, ...jobListings];
    return combinedListings.slice(0, limit);
  } catch (error) {
    console.error('Error in fetchValidListings:', error);
    return [];
  }
}

/**
 * Validate listing data for displaying
 * Checks if a listing has all required fields for display
 */
export function validateListingData(listing: any, requiredFields: string[] = ['id', 'title']): boolean {
  if (!listing) return false;
  
  for (const field of requiredFields) {
    if (listing[field] === undefined || listing[field] === null || listing[field] === '') {
      console.log(`Listing validation failed: missing ${field}`);
      return false;
    }
  }
  
  return true;
}

/**
 * Run verification on listings to ensure they are properly routed
 * Useful for debugging
 */
export async function runListingsVerification() {
  // Get sample data from static file for testing
  try {
    console.log("🔍 Running listings verification...");
    
    // Check a sample salon and job
    const salonValid = await validateListingExists("sample-salon-id", "salon");
    console.log(`Sample salon validation: ${salonValid}`);
    
    const jobValid = await validateListingExists("sample-job-id", "job");
    console.log(`Sample job validation: ${jobValid}`);
    
    return true;
  } catch (error) {
    console.error("Error in listings verification:", error);
    return false;
  }
}
