
import { useUserTags } from '@/hooks/useUserTags';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useJobPosting = () => {
  const { user } = useAuth();
  const { tagUser } = useUserTags();

  const handleJobPost = async (jobData: any) => {
    if (!user?.id) return false;
    
    console.log('🔄 Paid posting flow - User:', user.id, 'Data:', jobData);
    
    // Ensure requirements and specialties are arrays and user_id is always set
    const safeJobData = {
      ...jobData,
      requirements: Array.isArray(jobData.requirements) ? jobData.requirements : [],
      specialties: Array.isArray(jobData.specialties) ? jobData.specialties : [],
      user_id: user.id // Always ensure user_id is set for ownership
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

  // Function specifically for free job postings
  const handleFreeJobPost = async (jobData: any) => {
    if (!user?.id) {
      toast.error('Please log in to post a job');
      return false;
    }
    
    console.log('🆓 Free posting flow - User:', user.id, 'Data:', jobData);
    
    const freeJobData = {
      ...jobData,
      user_id: user.id, // Always set the authenticated user's ID for ownership
      pricing_tier: 'free',
      status: 'active',
      requirements: Array.isArray(jobData.requirements) ? jobData.requirements : [],
      specialties: Array.isArray(jobData.specialties) ? jobData.specialties : []
    };
    
    try {
      const { data, error } = await supabase
        .from('jobs')
        .insert(freeJobData)
        .select()
        .single();

      if (!error && data) {
        console.log('✅ Free job posted successfully:', data.id);
        await tagUser(user.id, 'job-poster');
        toast.success('Free job posting created successfully!');
        return data.id;
      }
      
      console.error("Error creating free job post:", error);
      toast.error('Failed to create job posting');
      return false;
      
    } catch (err) {
      console.error("Unexpected error in free job posting:", err);
      toast.error('Failed to create job posting');
      return false;
    }
  };

  return {
    handleJobPost,
    handleFreeJobPost
  };
};
