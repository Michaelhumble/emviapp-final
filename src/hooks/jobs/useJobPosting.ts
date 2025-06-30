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
      toast.error('Please sign in to post a job');
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
      category: jobData.category || 'Other',
      user_id: user.id,
      status: 'active',
      expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now
    };
    
    console.log('📝 [DEBUG] Formatted job data for submission:', JSON.stringify(formattedJobData, null, 2));
    
    try {
      console.log('🚀 [DEBUG] Starting job submission process...');

      // Check if this is a free post - handle directly with Supabase client
      if (formattedJobData.pricing_tier === 'free') {
        console.log('🆓 [DEBUG] Creating free job post directly with Supabase client');
        
        const { data: insertedJob, error: insertError } = await supabase
          .from('jobs')
          .insert([formattedJobData])
          .select()
          .single();

        console.log('📝 [DEBUG] Direct insert result - data:', JSON.stringify(insertedJob, null, 2));
        console.log('📝 [DEBUG] Direct insert result - error:', insertError);

        if (insertError) {
          console.error('❌ [DEBUG] Database insert error:', insertError);
          toast.error(`Error posting job: ${insertError.message}`);
          return { success: false, error: insertError.message };
        }

        console.log('✅ [DEBUG] Free job created successfully:', insertedJob.id);

        // Log the successful free post in payment_logs for tracking
        console.log('📝 [DEBUG] Logging payment record...');
        const { error: paymentError } = await supabase
          .from('payment_logs')
          .insert({
            user_id: user.id,
            listing_id: insertedJob.id,
            plan_type: 'job',
            pricing_tier: 'free',
            payment_status: 'success',
            expires_at: formattedJobData.expires_at
          });

        if (paymentError) {
          console.warn('⚠️ [DEBUG] Payment log error (non-critical):', paymentError);
        }

        toast.success('Your free job has been posted!');
        
        // Tag the user as a job poster
        console.log('🏷️  [DEBUG] Tagging user as job-poster...');
        await tagUser(user.id, 'job-poster');
        
        return { success: true, data: insertedJob };
      } else {
        // This should go through the paid job flow (unchanged)
        console.log('💰 [DEBUG] This should go through the paid job flow');
        return { success: false, error: 'Paid jobs should use the checkout flow' };
      }
      
    } catch (err) {
      console.error("💥 [DEBUG] Unexpected error in job posting:", err);
      console.error("💥 [DEBUG] Error stack trace:", err instanceof Error ? err.stack : 'No stack trace');
      toast.error(`An unexpected error occurred: ${err instanceof Error ? err.message : 'Unknown error'}`);
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  return {
    handleJobPost
  };
};
