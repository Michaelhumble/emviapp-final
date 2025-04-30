
import { Job } from '@/types/job';
import { getSalonByIdAsJob } from '@/utils/featuredContent';
import { fetchJob } from '@/utils/jobs';
import { validateListingExists } from '@/utils/listingValidator';

/**
 * A single, reliable function to fetch salon data by ID
 * This consolidates the previously separate logic paths into one source of truth
 */
export async function fetchSalonById(id: string): Promise<{
  salon: Job | null;
  error: boolean;
  validId: boolean;
}> {
  try {
    // First validate that the salon ID exists
    const exists = await validateListingExists(id, 'salon');
    
    if (!exists) {
      console.error('Invalid salon ID:', id);
      return { salon: null, error: true, validId: false };
    }
    
    // Try to get from the featured salons first (converted to Job type)
    let salonData = getSalonByIdAsJob(id);
    
    // If not found in featured content, fetch from jobs API
    if (!salonData) {
      try {
        salonData = await fetchJob(id);
        console.log('Salon loaded from jobs API:', id);
      } catch (jobError) {
        console.error('Error loading salon from jobs API:', jobError);
        return { salon: null, error: true, validId: false };
      }
    } else {
      console.log('Salon loaded from featured content:', id);
    }
    
    // Final validation - check if we got valid data back
    if (!salonData || !salonData.id) {
      return { salon: null, error: true, validId: false };
    }
    
    // Ensure salon data has the correct fields
    const enhancedSalonData: Job = {
      ...salonData,
      title: salonData.title || salonData.company || (salonData as any).salon_name || '',
      location: salonData.location || '',
      description: salonData.description || (salonData as any).about || '',
      imageUrl: salonData.imageUrl || salonData.image || (salonData as any).logo_url || '',
      image: salonData.image || salonData.imageUrl || (salonData as any).logo_url || '',
      features: Array.isArray((salonData as any).features) 
        ? (salonData as any).features 
        : Array.isArray((salonData as any).salon_features)
          ? (salonData as any).salon_features
          : [],
      type: 'salon'
    };
    
    return {
      salon: enhancedSalonData,
      error: false,
      validId: true
    };
  } catch (err) {
    console.error('Error in fetchSalonById:', err);
    return { salon: null, error: true, validId: false };
  }
}
