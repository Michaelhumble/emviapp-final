import { useUserTags } from '@/hooks/useUserTags';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useJobPosting = () => {
  const { user } = useAuth();
  const { tagUser } = useUserTags();

  const handleJobPost = async (jobData: any) => {
    console.log('🚀 [DEBUG] handleJobPost called with user:', user?.id);
    console.log('🚀 [DEBUG] Raw job data received:', JSON.stringify(jobData, null, 2));
    
    if (!user?.id) {
      console.error('❌ [DEBUG] User not authenticated, user object:', user);
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
    
    console.log('📝 [DEBUG] Formatted job data for submission:', JSON.stringify(formattedJobData, null, 2));
    
    try {
      console.log('🚀 [DEBUG] Starting job submission process...');

      // Check if this is a free post
      if (formattedJobData.pricing_tier === 'free') {
        console.log('🆓 [DEBUG] Creating free job post via edge function');
        console.log('🔐 [DEBUG] Getting auth session...');
        
        const { data: session, error: sessionError } = await supabase.auth.getSession();
        console.log('🔐 [DEBUG] Auth session result:', { 
          hasSession: !!session?.session, 
          hasAccessToken: !!session?.session?.access_token,
          sessionError: sessionError?.message 
        });
        
        if (sessionError || !session?.session?.access_token) {
          console.error('❌ [DEBUG] Failed to get auth session:', sessionError);
          toast.error('Authentication error');
          return { success: false, error: 'Authentication failed' };
        }
        
        console.log('📡 [DEBUG] About to invoke create-free-post edge function...');
        
        const { data, error } = await supabase.functions.invoke('create-free-post', {
          body: { jobData: formattedJobData },
          headers: {
            Authorization: `Bearer ${session.session.access_token}`
          }
        });

        console.log('🔍 [DEBUG] Edge function response data:', JSON.stringify(data, null, 2));
        console.log('🔍 [DEBUG] Edge function response error:', error);

        if (error) {
          console.error("❌ [DEBUG] Error creating free job post:", error);
          console.error("❌ [DEBUG] Error details:", JSON.stringify(error, null, 2));
          toast.error('Failed to create job posting: ' + error.message);
          return { success: false, error: error.message };
        }

        if (!data?.success) {
          console.error("❌ [DEBUG] Free job post failed:", data);
          console.error("❌ [DEBUG] Response indicates failure, full data:", JSON.stringify(data, null, 2));
          toast.error('Failed to create job posting: ' + (data?.error || 'Unknown error'));
          return { success: false, error: data?.error || 'Unknown error' };
        }

        console.log('✅ [DEBUG] Free job posted successfully:', data.jobId);
        console.log('✅ [DEBUG] Job record created:', JSON.stringify(data.job, null, 2));
        toast.success('Job posted successfully!');
        
        // Tag the user as a job poster
        console.log('🏷️  [DEBUG] Tagging user as job-poster...');
        await tagUser(user.id, 'job-poster');
        
        return { success: true, data: data.job };
      } else {
        // This should not happen in the current flow, but keeping for completeness
        console.log('💰 [DEBUG] This should go through the paid job flow');
        return { success: false, error: 'Paid jobs should use the checkout flow' };
      }
      
    } catch (err) {
      console.error("💥 [DEBUG] Unexpected error in job posting:", err);
      console.error("💥 [DEBUG] Error stack trace:", err instanceof Error ? err.stack : 'No stack trace');
      toast.error('An unexpected error occurred');
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  return {
    handleJobPost
  };
};
