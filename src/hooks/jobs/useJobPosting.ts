
import { useUserTags } from '@/hooks/useUserTags';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useJobPosting = () => {
  const { user } = useAuth();
  const { tagUser } = useUserTags();

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
      category: jobData.category || 'Other', // Required category field
      user_id: user.id
    };
    
    try {
      console.log('🚀 Submitting job post:', formattedJobData);

      // Check if this is a free post
      if (formattedJobData.pricing_tier === 'free') {
        console.log('🆓 Creating free job post via edge function');
        
        const { data, error } = await supabase.functions.invoke('create-free-post', {
          body: { jobData: formattedJobData },
          headers: {
            Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
          }
        });

        console.log('🔍 Edge function response:', { data, error });

        if (error) {
          console.error("❌ Error creating free job post:", error);
          toast.error('Failed to create job posting: ' + error.message);
          return { success: false, error: error.message };
        }

        if (!data?.success) {
          console.error("❌ Free job post failed:", data);
          toast.error('Failed to create job posting: ' + (data?.error || 'Unknown error'));
          return { success: false, error: data?.error || 'Unknown error' };
        }

        console.log('✅ Free job posted successfully:', data.jobId);
        toast.success('Job posted successfully!');
        
        // Tag the user as a job poster
        await tagUser(user.id, 'job-poster');
        
        return { success: true, data: data.job };
      } else {
        // This should not happen in the current flow, but keeping for completeness
        console.log('💰 This should go through the paid job flow');
        return { success: false, error: 'Paid jobs should use the checkout flow' };
      }
      
    } catch (err) {
      console.error("💥 Unexpected error in job posting:", err);
      toast.error('An unexpected error occurred');
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  return {
    handleJobPost
  };
};
