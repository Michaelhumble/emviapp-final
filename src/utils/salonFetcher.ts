
import { Job } from '@/types/job';
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
    
    // Check for magic nails listing
    if (id === 'magic-nails-featured') {
      const magicNailsListing: Job = {
        id: 'magic-nails-featured',
        title: 'Magic Nails - Premium Nail Salon',
        category: 'Nail Salon',
        company: 'Magic Nails',
        location: '123 Main St, San Jose, CA',
        created_at: '2024-01-01T00:00:00.000Z',
        description: 'Premier nail salon offering luxury manicure and pedicure services. Walk-ins welcome!',
        price: '$25-85',
        image: '/lovable-uploads/magic-nails-storefront.jpg',
        salon_features: ['Luxury Spa Chairs', 'Premium Products', 'Expert Technicians'],
        contact_info: {
          owner_name: 'Maria Santos',
          phone: '(408) 555-NAIL',
          email: 'info@magicnails.com'
        },
        type: 'salon',
        status: 'active',
        pricing_tier: 'diamond',
        user_id: 'magic-nails-owner',
        role: 'Nail Salon',
        posted_at: '2024-01-01T00:00:00.000Z',
        requirements: 'Valid nail tech license, 2+ years experience'
      };
      
      return {
        salon: magicNailsListing,
        error: false,
        validId: true
      };
    }
    
    // Try to fetch from jobs API as fallback
    try {
      const salonData = await fetchJob(id);
      console.log('Salon loaded from jobs API:', id);
      return {
        salon: salonData,
        error: false,
        validId: true
      };
    } catch (jobError) {
      console.error('Error loading salon from jobs API:', jobError);
      return { salon: null, error: true, validId: false };
    }
  } catch (err) {
    console.error('Error in fetchSalonById:', err);
    return { salon: null, error: true, validId: false };
  }
}
