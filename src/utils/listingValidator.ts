
import { supabase } from '@/integrations/supabase/client';
import type { Job } from '@/types/job';

export type ListingType = 'salon' | 'job' | 'opportunity' | 'booth';

/**
 * Validates if a listing with given ID exists in the database
 */
export async function validateListingExists(
  id: string,
  listingType: ListingType = 'salon'
): Promise<boolean> {
  try {
    console.log(`Validating ${listingType} listing with ID: ${id}`);

    // Determine the appropriate table to query based on listing type
    let tableName: string;
    
    switch (listingType) {
      case 'salon':
        // Check both salons and salon_sales tables
        const { data: salonData } = await supabase
          .from('salons')
          .select('id')
          .eq('id', id)
          .maybeSingle();
          
        if (salonData) return true;
        
        const { data: salonSaleData } = await supabase
          .from('salon_sales')
          .select('id')
          .eq('id', id)
          .maybeSingle();
          
        return !!salonSaleData;
        
      case 'job':
      case 'opportunity':
        tableName = 'jobs';
        break;
        
      case 'booth':
        tableName = 'posts';
        break;
        
      default:
        return false;
    }
    
    // Query the database to check if the listing exists
    const { data } = await supabase
      .from(tableName)
      .select('id')
      .eq('id', id)
      .maybeSingle();
    
    return !!data;
  } catch (err) {
    console.error(`Error validating ${listingType} listing:`, err);
    return false;
  }
}

/**
 * Validates if a listing object has all required fields
 */
export function validateListingData(
  listing: any, 
  requiredFields: string[] = ['id', 'title', 'location']
): boolean {
  // Check if listing is valid object
  if (!listing || typeof listing !== 'object') {
    return false;
  }
  
  // Check required fields
  for (const field of requiredFields) {
    if (!listing[field] || listing[field] === '') {
      console.warn(`Listing validation failed: missing ${field}`);
      return false;
    }
  }
  
  return true;
}
