
import { supabase } from "@/integrations/supabase/client";
import { Job } from "@/types/job";
import { getSalonByIdAsJob } from "@/utils/featuredContent";

/**
 * Fetches salon data by ID with proper error handling
 * @param id The salon ID to fetch
 * @returns Object containing the salon data and status info
 */
export async function fetchSalonById(id: string): Promise<{ 
  salon: Job | null; 
  error: boolean; 
  validId: boolean 
}> {
  try {
    // Validate ID format
    const validId = id && id.length > 3;
    if (!validId) {
      console.error("Invalid salon ID format:", id);
      return { salon: null, error: true, validId: false };
    }
    
    // For development, try to get salon from our static data first
    const staticSalon = getSalonByIdAsJob(id);
    if (staticSalon) {
      console.log("Found salon in static data:", staticSalon.id);
      return { salon: staticSalon, error: false, validId: true };
    }
    
    // If not in static data, try to fetch from Supabase
    const { data, error } = await supabase
      .from('salons')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error("Error fetching salon from database:", error);
      return { salon: null, error: true, validId: true };
    }
    
    if (!data) {
      console.log("No salon found with ID:", id);
      return { salon: null, error: true, validId: true };
    }
    
    // Convert to Job format for compatibility
    const salonAsJob: Job = {
      id: data.id,
      title: data.salon_name || '',
      company: data.salon_name || '',
      location: data.location || '',
      created_at: data.created_at || new Date().toISOString(),
      description: data.about || '',
      image: data.logo_url || '',
      imageUrl: data.logo_url || '',
      type: 'salon',
      salon_features: data.services ? JSON.parse(data.services as string) : []
    };
    
    console.log("Successfully fetched salon from database:", salonAsJob.id);
    return { salon: salonAsJob, error: false, validId: true };
  } catch (err) {
    console.error("Unexpected error fetching salon:", err);
    return { salon: null, error: true, validId: true };
  }
}
