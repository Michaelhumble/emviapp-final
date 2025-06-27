
import { useUserTags } from '@/hooks/useUserTags';
import { useAuth } from '@/context/auth';
import { useJobsData } from '@/hooks/useJobsData';

export const useJobPosting = () => {
  const { user } = useAuth();
  const { tagUser } = useUserTags();
  const { createJob } = useJobsData();

  const handleJobPost = async (jobData: any) => {
    if (!user?.id) return { success: false, error: 'User not authenticated' };
    
    // Ensure all required fields are properly formatted
    const formattedJobData = {
      title: jobData.title,
      description: jobData.description || '',
      location: jobData.location || '',
      compensation_type: jobData.compensation_type || jobData.employment_type || '',
      compensation_details: jobData.compensation_details || '',
      requirements: Array.isArray(jobData.requirements) 
        ? jobData.requirements.join('\n') 
        : (jobData.requirements || ''),
      contact_info: jobData.contact_info || {},
      pricing_tier: jobData.pricing_tier || 'free',
      user_id: user.id
    };
    
    try {
      const { data, error } = await createJob(formattedJobData);

      if (error) {
        console.error("Error creating job post:", error);
        return { success: false, error: error.message };
      }
      
      // Tag the user as a job poster
      await tagUser(user.id, 'job-poster');
      
      return { success: true, data };
      
    } catch (err) {
      console.error("Unexpected error in job posting:", err);
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  return {
    handleJobPost
  };
};
