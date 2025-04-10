
import { supabase } from "@/integrations/supabase/client";

/**
 * Fetches active jobs for a salon
 */
export const fetchSalonJobs = async (salonId: string) => {
  const response = await supabase
    .from('jobs')
    .select('id')
    .eq('salon_id', salonId)
    .eq('status', 'active');
    
  if (response.error) {
    console.error("Error fetching jobs data:", response.error);
    throw new Error(`Failed to fetch jobs data: ${response.error.message}`);
  }
  
  return response;
};

/**
 * Fetches user data including credits and profile information
 */
export const fetchUserData = async (userId: string) => {
  // Checking if the user exists first and getting the proper fields
  const response = await supabase
    .from('users')
    .select('credits, full_name, location, bio, phone, instagram, website, avatar_url')
    .eq('id', userId)
    .single();
    
  if (response.error) {
    console.error("Error fetching user data:", response.error);
    throw new Error(`Failed to fetch user data: ${response.error.message}`);
  }
  
  console.log("User data fetched successfully:", response.data);
  return response;
};

/**
 * Fetches applicants for the specified job IDs since the given date
 */
export const fetchApplicantsForJobs = async (jobIds: string[], sinceDate: Date) => {
  const response = await supabase
    .from('job_applications')
    .select('id')
    .in('job_id', jobIds)
    .gte('created_at', sinceDate.toISOString());
    
  if (response.error) {
    console.error("Error fetching applicants:", response.error);
    throw new Error(`Failed to fetch applicants: ${response.error.message}`);
  }
  
  return response;
};
