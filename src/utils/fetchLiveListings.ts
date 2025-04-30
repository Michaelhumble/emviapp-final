
import { supabase } from '@/integrations/supabase/client';
import { Job } from '@/types/job';

/**
 * Fetch active listings from Supabase based on specified parameters
 */
export async function fetchLiveListings({ 
  limit = 6, 
  type = null, 
  featured = false 
}: { 
  limit?: number, 
  type?: string | null, 
  featured?: boolean 
}): Promise<Job[]> {
  try {
    let query = supabase
      .from('posts')
      .select('*')
      .eq('status', 'active');
    
    // Add type filter if specified
    if (type) {
      query = query.eq('post_type', type);
    }
    
    // Add featured filter if requested
    if (featured) {
      query = query.eq('is_featured', true);
    }
    
    const { data, error } = await query
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (error) {
      console.error('Error fetching live listings:', error);
      return [];
    }
    
    // Transform database records to match Job type but avoid excessive recursion
    // Use explicit typing and avoid deep nesting that could cause infinite type recursion
    return data.map(listing => {
      // Create a minimal Job object with only the properties we need
      const jobListing = {
        id: listing.id,
        title: listing.title,
        company: listing.title,
        location: listing.location || 'Location not specified',
        description: listing.content,
        type: listing.post_type === 'salon' ? 'salon' : 'opportunity',
        created_at: listing.created_at,
        price: listing.price,
        imageUrl: null,
        for_sale: false,
        specialties: [] as string[],
        image: null
      } as Job;

      // Safely extract metadata without causing type recursion
      if (listing.metadata && typeof listing.metadata === 'object') {
        const meta = listing.metadata as Record<string, any>;
        jobListing.imageUrl = meta.image_url || null;
        jobListing.image = meta.image_url || null;
        jobListing.for_sale = meta.for_sale || false;
        jobListing.specialties = Array.isArray(meta.specialties) ? meta.specialties : [];
      }
      
      return jobListing;
    });
  } catch (error) {
    console.error('Error in fetchLiveListings:', error);
    return [];
  }
}

/**
 * Fetch a specific job or salon by ID
 */
export async function fetchListingById(id: string): Promise<Job | null> {
  try {
    // First try posts table
    const { data: post, error: postError } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single();
    
    if (post) {
      // Create a minimal Job object to avoid type recursion
      const listing = {
        id: post.id,
        title: post.title,
        company: post.title,
        location: post.location || 'Location not specified',
        description: post.content,
        type: post.post_type === 'salon' ? 'salon' : 'opportunity',
        imageUrl: null,
        created_at: post.created_at,
        price: post.price,
        for_sale: false,
        specialties: [] as string[],
        image: null
      } as Job;

      // Safely extract metadata fields
      if (post.metadata && typeof post.metadata === 'object') {
        const meta = post.metadata as Record<string, any>;
        listing.imageUrl = meta.image_url || null;
        listing.image = meta.image_url || null;
        listing.for_sale = meta.for_sale || false;
        listing.specialties = Array.isArray(meta.specialties) ? meta.specialties : [];
      }
      
      return listing;
    }
    
    // If not found in posts, try salons table
    const { data: salon, error: salonError } = await supabase
      .from('salons')
      .select('*')
      .eq('id', id)
      .single();
    
    if (salon) {
      // Create a minimal Job object for a salon to avoid type recursion
      const salonListing = {
        id: salon.id,
        title: salon.salon_name,
        company: salon.salon_name,
        name: salon.salon_name,
        location: salon.location || 'Location not specified',
        description: salon.about,
        type: 'salon',
        imageUrl: salon.logo_url || null,
        image: salon.logo_url || null,
        created_at: salon.created_at,
      } as Job;
      
      return salonListing;
    }
    
    console.error('Listing not found:', id);
    return null;
  } catch (error) {
    console.error('Error fetching listing by ID:', error);
    return null;
  }
}
