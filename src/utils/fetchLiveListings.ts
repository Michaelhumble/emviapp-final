
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
    
    // Transform database records to match Job type - avoiding deep recursion
    return data.map(listing => ({
      id: listing.id,
      title: listing.title,
      company: listing.title,
      location: listing.location || 'Location not specified',
      description: listing.content,
      type: listing.post_type === 'salon' ? 'salon' : 'opportunity',
      imageUrl: listing.metadata && typeof listing.metadata === 'object' ? 
        (listing.metadata as any).image_url || null : null,
      created_at: listing.created_at,
      price: listing.price,
      for_sale: listing.metadata && typeof listing.metadata === 'object' ? 
        (listing.metadata as any).for_sale || false : false,
      specialties: listing.metadata && typeof listing.metadata === 'object' ? 
        (listing.metadata as any).specialties || [] : [],
      // Add image property for compatibility
      image: listing.metadata && typeof listing.metadata === 'object' ? 
        (listing.metadata as any).image_url || null : null
    } as Job)); // Cast to Job to avoid TS recursion issues
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
      return {
        id: post.id,
        title: post.title,
        company: post.title,
        location: post.location || 'Location not specified',
        description: post.content,
        type: post.post_type === 'salon' ? 'salon' : 'opportunity',
        imageUrl: post.metadata && typeof post.metadata === 'object' ? 
          (post.metadata as any).image_url || null : null,
        created_at: post.created_at,
        price: post.price,
        for_sale: post.metadata && typeof post.metadata === 'object' ? 
          (post.metadata as any).for_sale || false : false,
        specialties: post.metadata && typeof post.metadata === 'object' ? 
          (post.metadata as any).specialties || [] : [],
        // Add image property for compatibility
        image: post.metadata && typeof post.metadata === 'object' ? 
          (post.metadata as any).image_url || null : null
      } as Job;
    }
    
    // If not found in posts, try salons table
    const { data: salon, error: salonError } = await supabase
      .from('salons')
      .select('*')
      .eq('id', id)
      .single();
    
    if (salon) {
      return {
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
    }
    
    console.error('Listing not found:', id);
    return null;
  } catch (error) {
    console.error('Error fetching listing by ID:', error);
    return null;
  }
}
