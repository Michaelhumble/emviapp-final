
import { useUserTags } from '@/hooks/useUserTags';
import { useAuth } from '@/context/auth';
import { useJobsData } from '@/hooks/useJobsData';
import { toast } from 'sonner';

export const useJobPosting = () => {
  const { user } = useAuth();
  const { tagUser } = useUserTags();
  const { createJob } = useJobsData();

  const handleJobPost = async (jobData: any) => {
    if (!user?.id) {
      console.error('Job posting attempted without authenticated user');
      return { success: false, error: 'User not authenticated' };
    }
    
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
      category: jobData.category || 'Other', // Required category field
      user_id: user.id
    };
    
    try {
      console.log('Creating job with data:', formattedJobData);
      
      const { data, error } = await createJob(formattedJobData);

      if (error) {
        console.error("Database error creating job post:", error);
        toast.error('Unable to save your job posting. Please try again or contact support.');
        return { success: false, error: error.message };
      }
      
      if (!data) {
        console.error("No data returned from job creation");
        toast.error('Job posting creation failed. Please try again.');
        return { success: false, error: 'No data returned from database' };
      }
      
      // Tag the user as a job poster
      try {
        await tagUser(user.id, 'job-poster');
      } catch (tagError) {
        console.warn('Failed to tag user as job poster:', tagError);
        // This is not critical, so we don't fail the entire operation
      }
      
      console.log('Job posting created successfully:', data);
      return { success: true, data };
      
    } catch (err) {
      console.error("Network or unexpected error in job posting:", err);
      
      // Provide user-friendly error messages based on error type
      if (err instanceof TypeError && err.message.includes('fetch')) {
        toast.error('Network connection issue. Please check your internet and try again.');
      } else if (err instanceof Error && err.message.includes('timeout')) {
        toast.error('Request timed out. Please try again.');
      } else {
        toast.error('An unexpected error occurred. Please try again or contact support.');
      }
      
      return { success: false, error: err instanceof Error ? err.message : 'An unexpected error occurred' };
    }
  };

  return {
    handleJobPost
  };
};
