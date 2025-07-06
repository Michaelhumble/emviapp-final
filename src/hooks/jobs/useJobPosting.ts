
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/context/auth';
import type { JobDetailsSubmission } from '@/types/job';

export const useJobPosting = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  const submitFreeJob = async (jobData: JobDetailsSubmission) => {
    console.log('🆓 [FREE-JOB] Starting free job submission:', {
      title: jobData.title,
      category: jobData.category,
      location: jobData.location,
      userId: user?.id
    });

    if (!user) {
      console.error('❌ [FREE-JOB] No authenticated user found');
      toast.error('Please sign in to post a job');
      return { success: false };
    }

    setIsSubmitting(true);

    try {
      // Prepare payload for edge function
      const payload = {
        jobData: {
          title: jobData.title,
          category: jobData.category || 'Other',
          location: jobData.location,
          description: jobData.description,
          user_id: user.id,
          compensation_type: jobData.compensation_type,
          compensation_details: jobData.compensation_details,
          requirements: jobData.requirements,
          contact_info: jobData.contact_info || {},
          status: 'active'
        }
      };

      console.log('🆓 [FREE-JOB] Payload prepared:', payload);

      // Call edge function
      const { data, error } = await supabase.functions.invoke('create-free-post', {
        body: payload
      });

      console.log('🆓 [FREE-JOB] Edge function response:', { data, error });

      if (error) {
        console.error('❌ [FREE-JOB] Edge function error:', error);
        toast.error('Failed to post job. Please try again.');
        return { success: false };
      }

      if (!data?.success) {
        console.error('❌ [FREE-JOB] Edge function returned failure:', data);
        toast.error('Failed to post job. Please try again.');
        return { success: false };
      }

      console.log('✅ [FREE-JOB] Job posted successfully:', data.data);
      toast.success('Job posted successfully!');
      
      // Verify job was inserted by checking database
      setTimeout(async () => {
        const { data: verifyData, error: verifyError } = await supabase
          .from('jobs')
          .select('*')
          .eq('user_id', user.id)
          .eq('title', jobData.title)
          .single();
        
        console.log('🔍 [FREE-JOB] Database verification:', { verifyData, verifyError });
      }, 1000);

      return { success: true, data: data.data };

    } catch (error) {
      console.error('💥 [FREE-JOB] Unexpected error:', error);
      toast.error('An unexpected error occurred');
      return { success: false };
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitPaidJob = async (jobData: JobDetailsSubmission, tier: string) => {
    console.log('💳 [PAID-JOB] Starting paid job submission:', {
      title: jobData.title,
      tier,
      userId: user?.id
    });

    if (!user) {
      console.error('❌ [PAID-JOB] No authenticated user found');
      toast.error('Please sign in to post a job');
      return { success: false };
    }

    setIsSubmitting(true);

    try {
      // Step 1: Create draft job in database
      console.log('💳 [PAID-JOB] Step 1: Creating draft job');
      
      const draftJobData = {
        title: jobData.title,
        category: jobData.category || 'Other',
        location: jobData.location,
        description: jobData.description,
        user_id: user.id,
        compensation_type: jobData.compensation_type,
        compensation_details: jobData.compensation_details,
        requirements: jobData.requirements,
        contact_info: jobData.contact_info || {},
        status: 'draft', // Draft until payment completes
        pricing_tier: tier
      };

      const { data: draftJob, error: draftError } = await supabase
        .from('jobs')
        .insert(draftJobData)
        .select()
        .single();

      if (draftError) {
        console.error('❌ [PAID-JOB] Failed to create draft job:', draftError);
        toast.error('Failed to create job. Please try again.');
        return { success: false };
      }

      console.log('✅ [PAID-JOB] Draft job created:', draftJob);

      // Step 2: Create Stripe checkout session
      console.log('💳 [PAID-JOB] Step 2: Creating Stripe checkout');
      
      const checkoutPayload = {
        tier,
        finalPrice: tier === 'premium' ? 25 : tier === 'gold' ? 45 : 85,
        jobData,
        jobId: draftJob.id
      };

      console.log('💳 [PAID-JOB] Checkout payload:', checkoutPayload);

      const { data: checkoutData, error: checkoutError } = await supabase.functions.invoke('create-job-checkout', {
        body: checkoutPayload
      });

      console.log('💳 [PAID-JOB] Checkout response:', { checkoutData, checkoutError });

      if (checkoutError || !checkoutData?.url) {
        console.error('❌ [PAID-JOB] Checkout creation failed:', checkoutError);
        toast.error('Failed to create payment session');
        return { success: false };
      }

      console.log('✅ [PAID-JOB] Redirecting to Stripe:', checkoutData.url);
      
      // Redirect to Stripe checkout
      window.location.href = checkoutData.url;
      
      return { success: true, redirected: true };

    } catch (error) {
      console.error('💥 [PAID-JOB] Unexpected error:', error);
      toast.error('An unexpected error occurred');
      return { success: false };
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submitFreeJob,
    submitPaidJob,
    isSubmitting
  };
};
