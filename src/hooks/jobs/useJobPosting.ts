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

      // Check if this is a free post - NEW FREE POST LOGIC
      if (formattedJobData.pricing_tier === 'free') {
        console.log('🆓 [DEBUG] Creating free job post via direct Supabase insert');
        
        // Insert job directly into Supabase jobs table
        const { data: insertedJob, error: insertError } = await supabase
          .from('jobs')
          .insert([{
            title: formattedJobData.title,
            description: formattedJobData.description,
            category: formattedJobData.category,
            location: formattedJobData.location,
            compensation_type: formattedJobData.compensation_type,
            compensation_details: formattedJobData.compensation_details,
            requirements: formattedJobData.requirements,
            contact_info: formattedJobData.contact_info,
            pricing_tier: 'free',
            status: 'active',
            user_id: user.id,
            expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now
          }])
          .select()
          .single();

        if (insertError) {
          console.error('❌ [DEBUG] Direct insert error:', insertError);
          toast.error('Failed to create job posting: ' + insertError.message);
          return { success: false, error: insertError.message };
        }

        console.log('✅ [DEBUG] Free job posted successfully:', insertedJob.id);
        toast.success('Job posted successfully!');
        
        // Tag the user as a job poster
        console.log('🏷️  [DEBUG] Tagging user as job-poster...');
        await tagUser(user.id, 'job-poster');
        
        return { success: true, data: insertedJob };
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
