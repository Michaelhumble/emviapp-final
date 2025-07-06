
import { useState } from 'react';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export const useJobPosting = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const submitFreeJob = async (jobData: any) => {
    console.log('🆓 [FREE-JOB] ===================');
    console.log('🆓 [FREE-JOB] Starting free job submission');
    console.log('🆓 [FREE-JOB] User:', user?.id);
    console.log('🆓 [FREE-JOB] Raw form data:', jobData);

    if (!user) {
      console.error('❌ [FREE-JOB] No authenticated user found');
      toast.error('Please sign in to post a job');
      return { success: false };
    }

    setIsSubmitting(true);

    try {
      // Step 1: Prepare payload
      const payload = {
        jobData: {
          title: jobData.title,
          category: jobData.category || 'Other',
          location: jobData.location,
          description: jobData.description,
          user_id: user.id,
          status: 'active',
          pricing_tier: 'free',
          compensation_type: jobData.compensation_type || null,
          compensation_details: jobData.compensation_details || null,
          contact_info: jobData.contact_info || {}
        }
      };

      console.log('🆓 [FREE-JOB] Prepared payload for edge function:', JSON.stringify(payload, null, 2));

      // Step 2: Call edge function
      console.log('🆓 [FREE-JOB] Calling create-free-post edge function...');
      const { data, error } = await supabase.functions.invoke('create-free-post', {
        body: payload
      });

      console.log('🆓 [FREE-JOB] Edge function response:', { data, error });

      if (error) {
        console.error('❌ [FREE-JOB] Edge function error:', error);
        throw error;
      }

      if (!data || !data.success) {
        console.error('❌ [FREE-JOB] Edge function returned failure:', data);
        throw new Error(data?.error || 'Failed to create job');
      }

      console.log('✅ [FREE-JOB] Edge function success:', data);

      // Step 3: Verify database insertion
      console.log('🔍 [FREE-JOB] Verifying database insertion...');
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second

      const { data: verifyData, error: verifyError } = await supabase
        .from('jobs')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(1);

      console.log('🔍 [FREE-JOB] Database verification result:', { verifyData, verifyError });

      if (verifyError) {
        console.error('❌ [FREE-JOB] Database verification error:', verifyError);
      } else if (verifyData && verifyData.length > 0) {
        console.log('✅ [FREE-JOB] Job found in database:', verifyData[0]);
      } else {
        console.warn('⚠️ [FREE-JOB] No job found in database verification');
      }

      toast.success('Job posted successfully!');
      navigate('/jobs');
      
      return { success: true, data: data.data };

    } catch (error) {
      console.error('💥 [FREE-JOB] Fatal error:', error);
      toast.error(`Failed to post job: ${error.message}`);
      return { success: false, error };
    } finally {
      setIsSubmitting(false);
      console.log('🆓 [FREE-JOB] =================== END');
    }
  };

  const submitPaidJob = async (jobData: any, tier: string) => {
    console.log('💳 [PAID-JOB] ===================');
    console.log('💳 [PAID-JOB] Starting paid job submission');
    console.log('💳 [PAID-JOB] User:', user?.id);
    console.log('💳 [PAID-JOB] Tier:', tier);
    console.log('💳 [PAID-JOB] Raw form data:', jobData);

    if (!user) {
      console.error('❌ [PAID-JOB] No authenticated user found');
      toast.error('Please sign in to post a job');
      return { success: false };
    }

    setIsSubmitting(true);

    try {
      // Step 1: Create draft job first
      console.log('💳 [PAID-JOB] Creating draft job in database...');
      const { data: draftJob, error: draftError } = await supabase
        .from('jobs')
        .insert({
          title: jobData.title,
          category: jobData.category || 'Other',
          location: jobData.location,
          description: jobData.description,
          user_id: user.id,
          pricing_tier: tier,
          status: 'draft',
          compensation_type: jobData.compensation_type || null,
          compensation_details: jobData.compensation_details || null,
          contact_info: jobData.contact_info || {}
        })
        .select()
        .single();

      console.log('💳 [PAID-JOB] Draft job creation result:', { draftJob, draftError });

      if (draftError) {
        console.error('❌ [PAID-JOB] Failed to create draft job:', draftError);
        throw draftError;
      }

      console.log('✅ [PAID-JOB] Draft job created:', draftJob);

      // Step 2: Prepare checkout payload
      const checkoutPayload = {
        tier,
        finalPrice: null,
        jobData: {
          title: jobData.title,
          category: jobData.category || 'Other',
          location: jobData.location,
          description: jobData.description,
          compensation_type: jobData.compensation_type || null,
          compensation_details: jobData.compensation_details || null,
          contact_info: jobData.contact_info || {}
        },
        jobId: draftJob.id
      };

      console.log('💳 [PAID-JOB] Checkout payload:', JSON.stringify(checkoutPayload, null, 2));

      // Step 3: Create Stripe checkout
      console.log('💳 [PAID-JOB] Calling create-job-checkout edge function...');
      const { data: checkoutData, error: checkoutError } = await supabase.functions.invoke('create-job-checkout', {
        body: checkoutPayload
      });

      console.log('💳 [PAID-JOB] Checkout response:', { checkoutData, checkoutError });

      if (checkoutError) {
        console.error('❌ [PAID-JOB] Checkout error:', checkoutError);
        throw checkoutError;
      }

      if (!checkoutData?.url) {
        console.error('❌ [PAID-JOB] No checkout URL received:', checkoutData);
        throw new Error('No checkout URL received');
      }

      console.log('✅ [PAID-JOB] Redirecting to Stripe checkout:', checkoutData.url);

      // Step 4: Redirect to Stripe
      window.location.href = checkoutData.url;
      
      return { success: true, checkoutUrl: checkoutData.url };

    } catch (error) {
      console.error('💥 [PAID-JOB] Fatal error:', error);
      toast.error(`Failed to create checkout: ${error.message}`);
      return { success: false, error };
    } finally {
      setIsSubmitting(false);
      console.log('💳 [PAID-JOB] =================== END');
    }
  };

  return {
    submitFreeJob,
    submitPaidJob,
    isSubmitting
  };
};
