
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
    
    // Transform the data into Job objects using a more explicit approach to avoid deep type instantiation
    return data.map(listing => {
      // Create a base job object with primitive properties first
      const job: Record<string, any> = {
        id: listing.id,
        title: listing.title,
        company: listing.title,
        location: listing.location || 'Location not specified',
        description: listing.content,
        type: listing.post_type === 'salon' ? 'salon' : 'opportunity',
        created_at: listing.created_at,
        price: listing.price,
        imageUrl: null,
        image: null,
        for_sale: false,
        specialties: []
      };

      // Handle metadata safely without recursive typing issues
      if (listing.metadata && typeof listing.metadata === 'object') {
        const meta = listing.metadata as {
          image_url?: string;
          for_sale?: boolean;
          specialties?: string[];
        };
        
        job.imageUrl = meta.image_url || null;
        job.image = meta.image_url || null;
        job.for_sale = meta.for_sale || false;
        job.specialties = Array.isArray(meta.specialties) ? meta.specialties : [];
      }
      
      // Cast to Job type at the end
      return job as Job;
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
      // Create object with explicitly defined properties
      const job: Record<string, any> = {
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
        specialties: [],
        image: null
      };

      // Handle metadata safely
      if (post.metadata && typeof post.metadata === 'object') {
        const meta = post.metadata as {
          image_url?: string;
          for_sale?: boolean;
          specialties?: string[];
        };
        
        job.imageUrl = meta.image_url || null;
        job.image = meta.image_url || null;
        job.for_sale = meta.for_sale || false;
        job.specialties = Array.isArray(meta.specialties) ? meta.specialties : [];
      }
      
      return job as Job;
    }
    
    // If not found in posts, try salons table
    const { data: salon, error: salonError } = await supabase
      .from('salons')
      .select('*')
      .eq('id', id)
      .single();
    
    if (salon) {
      // Create object with explicitly defined properties
      const job: Record<string, any> = {
        id: salon.id,
        title: salon.salon_name,
        company: salon.salon_name,
        name: salon.salon_name,
        location: salon.location || 'Location not specified',
        description: salon.about,
        type: 'salon',
        imageUrl: salon.logo_url || null,
        image: salon.logo_url || null,
        created_at: salon.created_at
      };
      
      return job as Job;
    }
    
    console.error('Listing not found:', id);
    return null;
  } catch (error) {
    console.error('Error fetching listing by ID:', error);
    return null;
  }
}
