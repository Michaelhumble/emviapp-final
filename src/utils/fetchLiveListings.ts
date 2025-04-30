
import { supabase } from '@/integrations/supabase/client';
import { Job } from '@/types/job';

// Local interface to avoid excessive type recursion
interface SimplifiedJob {
  id: string;
  title?: string;
  company?: string;
  location: string;
  description?: string;
  type?: 'salon' | 'job' | 'opportunity';
  created_at: string;
  price?: string | number;
  imageUrl?: string;
  image?: string;
  for_sale?: boolean;
  specialties?: string[];
  name?: string;
}

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
    
    // Transform the data using SimplifiedJob to avoid deep type instantiation
    const result: SimplifiedJob[] = data.map(listing => {
      // Create a simplified job object with basic properties
      const job: SimplifiedJob = {
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

      // Handle metadata separately
      if (listing.metadata && typeof listing.metadata === 'object') {
        const meta = listing.metadata as any;
        
        if (meta.image_url) job.imageUrl = meta.image_url;
        if (meta.image_url) job.image = meta.image_url;
        if (meta.for_sale) job.for_sale = meta.for_sale;
        if (Array.isArray(meta.specialties)) job.specialties = meta.specialties;
      }
      
      return job;
    });
    
    // Cast the result to the full Job type at the end
    return result as Job[];
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
      // Create simplified object to avoid deep type instantiation
      const job: SimplifiedJob = {
        id: post.id,
        title: post.title,
        company: post.title,
        location: post.location || 'Location not specified',
        description: post.content,
        type: post.post_type === 'salon' ? 'salon' : 'opportunity',
        created_at: post.created_at,
        price: post.price,
        imageUrl: null,
        image: null,
        for_sale: false,
        specialties: []
      };
      
      // Handle metadata separately
      if (post.metadata && typeof post.metadata === 'object') {
        const meta = post.metadata as any;
        
        if (meta.image_url) job.imageUrl = meta.image_url;
        if (meta.image_url) job.image = meta.image_url;
        if (meta.for_sale) job.for_sale = meta.for_sale;
        if (Array.isArray(meta.specialties)) job.specialties = meta.specialties;
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
      // Create simplified object to avoid deep type instantiation
      const job: SimplifiedJob = {
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
