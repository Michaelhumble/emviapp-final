
import { supabase } from "@/integrations/supabase/client";
import { Job } from "@/types/job";
import { formatJobListings } from "./jobs/jobListingFormatter";
import { mockJobs } from "./jobs/mockJobData";

/**
 * Fetches a salon by ID from Supabase
 * Falls back to mockJobs in development mode
 */
export const fetchSalonById = async (id: string): Promise<{
  salon: Job | null;
  error: boolean;
  validId: boolean;
}> => {
  // Check if we're in development/preview mode
  const isPreviewMode = import.meta.env.DEV || !supabase;
  
  // Response structure
  const response = {
    salon: null as Job | null,
    error: false,
    validId: true
  };

  if (!id) {
    return { ...response, error: true, validId: false };
  }

  try {
    if (isPreviewMode) {
      // Use mock data for development
      const salon = mockJobs.find(listing => listing.id === id);
      if (!salon) {
        return { ...response, error: true, validId: false };
      }
      return { ...response, salon };
    } else {
      // Attempt to fetch from Supabase
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !data) {
        console.error('Error fetching salon:', error);
        return { ...response, error: true };
      }

      const formattedSalon = formatJobListings(data);
      return { ...response, salon: formattedSalon };
    }
  } catch (err) {
    console.error('Unexpected error fetching salon:', err);
    return { ...response, error: true };
  }
};

/**
 * Fetches a list of salons with optional filtering
 */
export const fetchSalons = async (options: {
  page?: number;
  limit?: number;
  featured?: boolean;
  includeExpired?: boolean;
} = {}): Promise<{
  salons: Job[];
  totalPages: number;
  error: boolean;
}> => {
  const {
    page = 1,
    limit = 12,
    featured = false,
    includeExpired = false
  } = options;
  
  // Default response
  const response = {
    salons: [] as Job[],
    totalPages: 1,
    error: false
  };
  
  // Check if we're in development/preview mode
  const isPreviewMode = import.meta.env.DEV || !supabase;
  
  try {
    if (isPreviewMode) {
      // Use mock data for development
      let filteredSalons = [...mockJobs];
      
      if (featured) {
        filteredSalons = filteredSalons.filter(salon => salon.is_featured);
      }
      
      if (!includeExpired) {
        const now = new Date();
        filteredSalons = filteredSalons.filter(salon => 
          salon.status !== 'expired' && 
          (!salon.expires_at || new Date(salon.expires_at) > now)
        );
      }
      
      // Apply pagination
      const start = (page - 1) * limit;
      const end = start + limit;
      const paginatedSalons = filteredSalons.slice(start, end);
      const totalPages = Math.ceil(filteredSalons.length / limit);
      
      return {
        salons: paginatedSalons,
        totalPages,
        error: false
      };
    } else {
      // Use Supabase for production
      let query = supabase
        .from('jobs')
        .select('*', { count: 'exact' });
        
      if (featured) {
        query = query.eq('is_featured', true);
      }
      
      if (!includeExpired) {
        query = query.gt('expires_at', new Date().toISOString());
      }
      
      // Apply pagination
      const from = (page - 1) * limit;
      const to = from + limit - 1;
      
      query = query.range(from, to);
      
      const { data, error, count } = await query;
      
      if (error) {
        console.error('Error fetching salons:', error);
        return { ...response, error: true };
      }
      
      const formattedSalons = data ? data.map(formatJobListings) : [];
      const totalPages = count ? Math.ceil(count / limit) : 1;
      
      return {
        salons: formattedSalons,
        totalPages,
        error: false
      };
    }
  } catch (err) {
    console.error('Unexpected error fetching salons:', err);
    return { ...response, error: true };
  }
};
