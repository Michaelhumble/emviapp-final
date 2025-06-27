
import { useUserTags } from '@/hooks/useUserTags';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';

export const useJobPosting = () => {
  const { user } = useAuth();
  const { tagUser } = useUserTags();

  const handleJobPost = async (jobData: any) => {
    if (!user?.id) return false;
    
    // Ensure requirements and specialties are arrays
    const safeJobData = {
      ...jobData,
      requirements: Array.isArray(jobData.requirements) ? jobData.requirements : [],
      specialties: Array.isArray(jobData.specialties) ? jobData.specialties : []
    };
    
    try {
      // First create the job post
      const { error } = await supabase
        .from('jobs')
        .insert(safeJobData);

      if (!error) {
        // Tag the user as a job poster
        await tagUser(user.id, 'job-poster');
        return true;
      }
      
      console.error("Error creating job post:", error);
      return false;
      
    } catch (err) {
      console.error("Unexpected error in job posting:", err);
      return false;
    }
  };

  return {
    handleJobPost
  };
};
