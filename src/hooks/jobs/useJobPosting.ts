
import { useUserTags } from '@/hooks/useUserTags';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useJobPosting = () => {
  const { user } = useAuth();
  const { tagUser } = useUserTags();

  const submitJobPost = async (jobData: any) => {
    if (!user) {
      toast.error('You must be logged in to post a job');
      return { success: false, error: 'Not authenticated' };
    }

    try {
      console.log('📝 [DEBUG] Starting job submission process');
      console.log('📝 [DEBUG] Job data received:', jobData);
      console.log('📝 [DEBUG] Pricing tier:', jobData.pricing_tier);

      // Format the job data for database insertion
      const formattedJobData = {
        title: jobData.title || 'Job Title',
        description: jobData.description || '',
        category: jobData.category || 'Other',
        location: jobData.location || '',
        compensation_type: jobData.compensation_type || jobData.employment_type || '',
        compensation_details: jobData.compensation_details || '',
        requirements: Array.isArray(jobData.requirements) 
          ? jobData.requirements.join('\n') 
          : (jobData.requirements || ''),
        contact_info: jobData.contact_info || {},
        pricing_tier: jobData.pricing_tier || 'free',
        user_id: user.id,
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now
      };

      console.log('📝 [DEBUG] Formatted job data:', formattedJobData);

      // FREE JOB POSTING - Direct to Supabase with active status
      if (formattedJobData.pricing_tier === 'free') {
        console.log('🆓 [DEBUG] Processing free job post');
        
        // Create free job post via edge function
        const { data, error } = await supabase.functions.invoke('create-free-post', {
          body: { jobData: formattedJobData }
        });

        if (error) {
          console.error('❌ [DEBUG] Error creating free job post:', error);
          toast.error('Failed to create free job post: ' + error.message);
          return { success: false, error: error.message };
        }

        if (!data?.success) {
          console.error('❌ [DEBUG] Free job creation failed:', data);
          toast.error('Failed to create free job post');
          return { success: false, error: 'Free job creation failed' };
        }

        console.log('✅ [DEBUG] Free job posted successfully:', data.jobId);
        toast.success('Free job posted successfully!');
        
        // Tag user as job poster
        await tagUser('job-poster');
        
        return { success: true, data: data.job };
      } else {
        // PAID JOB POSTING - Create draft job first, then Stripe checkout
        console.log('💰 [DEBUG] Processing paid job post');
        
        // Step 1: Create draft job record first
        const draftJobData = {
          ...formattedJobData,
          status: 'draft' // Mark as draft until payment is confirmed
        };

        console.log('📝 [DEBUG] Creating draft job record:', draftJobData);

        const { data: draftJob, error: draftError } = await supabase
          .from('jobs')
          .insert([draftJobData])
          .select()
          .single();

        if (draftError) {
          console.error('❌ [DEBUG] Error creating draft job:', draftError);
          toast.error('Failed to create job draft: ' + draftError.message);
          return { success: false, error: draftError.message };
        }

        console.log('✅ [DEBUG] Draft job created with ID:', draftJob.id);

        // Step 2: Determine pricing details based on tier
        let finalPrice = 0;
        let durationMonths = 1;
        
        switch (formattedJobData.pricing_tier) {
          case 'gold':
            finalPrice = 53.97;
            break;
          case 'premium':
            finalPrice = 107.97;
            break;
          case 'diamond':
            finalPrice = 999.99;
            break;
          default:
            console.error('❌ [DEBUG] Unknown pricing tier:', formattedJobData.pricing_tier);
            toast.error('Invalid pricing tier selected');
            return { success: false, error: 'Invalid pricing tier' };
        }
        
        console.log('💰 [DEBUG] Creating Stripe checkout for:', {
          jobId: draftJob.id,
          tier: formattedJobData.pricing_tier,
          price: finalPrice,
          duration: durationMonths
        });
        
        // Step 3: Create Stripe checkout session with job ID reference
        const { data: checkoutData, error: checkoutError } = await supabase.functions.invoke('create-job-checkout', {
          body: {
            tier: formattedJobData.pricing_tier,
            finalPrice: finalPrice,
            durationMonths: durationMonths,
            jobData: formattedJobData,
            jobId: draftJob.id // Pass the draft job ID for activation after payment
          }
        });

        if (checkoutError) {
          console.error('❌ [DEBUG] Error creating Stripe checkout:', checkoutError);
          toast.error('Failed to create checkout session: ' + checkoutError.message);
          return { success: false, error: checkoutError.message };
        }

        if (!checkoutData?.url) {
          console.error('❌ [DEBUG] No checkout URL received:', checkoutData);
          toast.error('Failed to get checkout URL');
          return { success: false, error: 'No checkout URL received' };
        }

        console.log('✅ [DEBUG] Stripe checkout session created, redirecting to:', checkoutData.url);
        
        // Step 4: Redirect to Stripe checkout
        window.location.href = checkoutData.url;
        
        return { success: true, redirected: true, jobId: draftJob.id };
      }
      
    } catch (err) {
      console.error('❌ [DEBUG] Unexpected error in job submission:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      toast.error('Failed to submit job: ' + errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  return { submitJobPost };
};
