
import { useState } from 'react';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { JobDetailsSubmission } from '@/types/job';

export const useJobPosting = () => {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isStripeLoading, setIsStripeLoading] = useState(false);

  // Submit free job - insert directly into Supabase
  const submitFreeJob = async (jobData: JobDetailsSubmission) => {
    console.log('🆓 [FREE-JOB] Starting free job submission:', { jobData });
    
    if (!user) {
      console.error('🆓 [FREE-JOB] ERROR: No authenticated user');
      throw new Error('User must be authenticated to post a job');
    }

    setIsSubmitting(true);

    try {
      // Prepare job data with proper typing
      const jobPayload = {
        title: jobData.title,
        category: jobData.category || 'Other',
        location: jobData.location || '',
        description: jobData.description || '',
        user_id: user.id,
        compensation_type: jobData.compensation_type || '',
        compensation_details: jobData.compensation_details || '',
        requirements: jobData.requirements || '', // Always string
        contact_info: jobData.contact_info || {},
        status: 'active', // Free jobs are immediately active
        pricing_tier: 'free'
      };

      console.log('🆓 [FREE-JOB] Inserting job into Supabase:', { jobPayload });

      const { data, error } = await supabase
        .from('jobs')
        .insert([jobPayload])
        .select()
        .single();

      if (error) {
        console.error('🆓 [FREE-JOB] ERROR: Supabase insert failed:', error);
        throw error;
      }

      console.log('🆓 [FREE-JOB] SUCCESS: Job inserted successfully:', { data });
      toast.success('Free job posted successfully!');
      
      return { success: true, jobId: data.id };
    } catch (error) {
      console.error('🆓 [FREE-JOB] ERROR: Failed to submit free job:', error);
      toast.error('Failed to post job. Please try again.');
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Submit paid job - create draft then redirect to Stripe
  const submitPaidJob = async (jobData: JobDetailsSubmission, pricingTier: string) => {
    console.log('💳 [PAID-JOB] Starting paid job submission:', { jobData, pricingTier });
    
    if (!user) {
      console.error('💳 [PAID-JOB] ERROR: No authenticated user');
      throw new Error('User must be authenticated to post a job');
    }

    setIsStripeLoading(true);

    try {
      // First, create a draft job in Supabase
      const jobPayload = {
        title: jobData.title,
        category: jobData.category || 'Other',
        location: jobData.location || '',
        description: jobData.description || '',
        user_id: user.id,
        compensation_type: jobData.compensation_type || '',
        compensation_details: jobData.compensation_details || '',
        requirements: jobData.requirements || '', // Always string
        contact_info: jobData.contact_info || {},
        status: 'draft', // Draft until payment completes
        pricing_tier: pricingTier
      };

      console.log('💳 [PAID-JOB] Creating draft job in Supabase:', { jobPayload });

      const { data: draftJob, error: insertError } = await supabase
        .from('jobs')
        .insert([jobPayload])
        .select()
        .single();

      if (insertError) {
        console.error('💳 [PAID-JOB] ERROR: Failed to create draft job:', insertError);
        throw insertError;
      }

      console.log('💳 [PAID-JOB] SUCCESS: Draft job created:', { draftJob });

      // Now create Stripe checkout session
      console.log('💳 [PAID-JOB] Creating Stripe checkout session...');
      
      const { data: checkoutData, error: checkoutError } = await supabase.functions.invoke('create-job-checkout', {
        body: {
          jobId: draftJob.id,
          pricingTier,
          jobData
        }
      });

      if (checkoutError) {
        console.error('💳 [PAID-JOB] ERROR: Checkout creation failed:', checkoutError);
        throw checkoutError;
      }

      if (!checkoutData?.url) {
        console.error('💳 [PAID-JOB] ERROR: No checkout URL received:', checkoutData);
        throw new Error('Failed to create checkout session');
      }

      console.log('💳 [PAID-JOB] SUCCESS: Redirecting to Stripe checkout:', { url: checkoutData.url });
      
      // Redirect to Stripe checkout
      window.location.href = checkoutData.url;
      
      return { success: true, jobId: draftJob.id, checkoutUrl: checkoutData.url };
    } catch (error) {
      console.error('💳 [PAID-JOB] ERROR: Failed to submit paid job:', error);
      toast.error('Failed to create paid job listing. Please try again.');
      throw error;
    } finally {
      setIsStripeLoading(false);
    }
  };

  return {
    submitFreeJob,
    submitPaidJob,
    isSubmitting,
    isStripeLoading
  };
};
