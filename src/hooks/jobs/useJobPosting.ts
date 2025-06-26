
import { useUserTags } from '@/hooks/useUserTags';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';

export const useJobPosting = () => {
  const { user } = useAuth();
  const { tagUser } = useUserTags();

  const handleJobPost = async (jobData: any) => {
    if (!user?.id) {
      console.error('❌ No authenticated user for job posting');
      return false;
    }
    
    // Ensure user_id is always set and log it
    const safeJobData = {
      ...jobData,
      user_id: user.id, // CRITICAL: Always set user_id for ownership
      requirements: Array.isArray(jobData.requirements) ? jobData.requirements : [],
      specialties: Array.isArray(jobData.specialties) ? jobData.specialties : [],
      created_at: new Date().toISOString()
    };

    console.log('🔍 Job Data Before Insert:', {
      userId: safeJobData.user_id,
      jobTitle: safeJobData.title,
      pricingTier: safeJobData.pricing_tier
    });
    
    try {
      // Create the job post with proper user_id
      const { data, error } = await supabase
        .from('jobs')
        .insert(safeJobData)
        .select()
        .single();

      if (!error && data) {
        console.log('✅ Job created successfully:', {
          jobId: data.id,
          userId: data.user_id,
          title: data.title
        });
        
        // Tag the user as a job poster
        await tagUser(user.id, 'job-poster');
        return true;
      }
      
      console.error("❌ Error creating job post:", error);
      return false;
      
    } catch (err) {
      console.error("❌ Unexpected error in job posting:", err);
      return false;
    }
  };

  return {
    handleJobPost
  };
};
