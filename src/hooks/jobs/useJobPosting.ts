
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/context/auth';

export const useJobPosting = () => {
  const [isPosting, setIsPosting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Add this missing property
  const { user } = useAuth();

  const postFreeJob = async (jobData: any) => {
    console.log('🚀 [FREE-JOB] Starting job post process');
    console.log('🔍 [FREE-JOB] User authenticated:', !!user, user?.id);
    console.log('📋 [FREE-JOB] Job data received:', jobData);

    if (!user) {
      console.error('❌ [FREE-JOB] No authenticated user');
      toast.error('Please sign in to post a job');
      return { success: false, error: 'No authenticated user' };
    }

    setIsPosting(true);
    setIsSubmitting(true);

    try {
      // Prepare job data with all required fields
      const jobPayload = {
        title: jobData.title || '',
        category: jobData.category || 'Other',
        location: jobData.location || '',
        description: jobData.description || '',
        compensation_type: jobData.compensation_type || '',
        compensation_details: jobData.compensation_details || '',
        requirements: jobData.requirements || '',
        user_id: user.id,
        status: 'active',
        pricing_tier: 'free',
        contact_info: jobData.contact_info || {}
      };

      console.log('📤 [FREE-JOB] Payload prepared for Supabase:', jobPayload);
      console.log('🔐 [FREE-JOB] Using user ID:', user.id);

      // Direct Supabase insertion with detailed error handling
      const { data, error } = await supabase
        .from('jobs')
        .insert([jobPayload])
        .select()
        .single();

      console.log('📥 [FREE-JOB] Supabase response - data:', data);
      console.log('📥 [FREE-JOB] Supabase response - error:', error);

      if (error) {
        console.error('❌ [FREE-JOB] Supabase insert failed:', error);
        console.error('❌ [FREE-JOB] Error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        
        let errorMessage = `Failed to post job: ${error.message}`;
        if (error.message.includes('row-level security')) {
          errorMessage = 'Permission denied. Please make sure you are logged in.';
        }
        
        toast.error(errorMessage);
        return { success: false, error: error.message };
      }

      if (!data) {
        console.error('❌ [FREE-JOB] No data returned from insert');
        toast.error('Job post failed - no data returned');
        return { success: false, error: 'No data returned from insert' };
      }

      console.log('✅ [FREE-JOB] Successfully inserted job:', data);
      console.log('🆔 [FREE-JOB] New job ID:', data.id);
      
      // Verify the job was actually inserted by fetching it back
      const { data: verifyData, error: verifyError } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', data.id)
        .single();

      if (verifyError || !verifyData) {
        console.error('❌ [FREE-JOB] Job verification failed:', verifyError);
        toast.error('Job may not have been saved properly');
        return { success: false, error: 'Job verification failed' };
      }

      console.log('✅ [FREE-JOB] Job verified in database:', verifyData);
      toast.success(`Job posted successfully! ID: ${data.id}`);
      
      return { success: true, data };

    } catch (error) {
      console.error('💥 [FREE-JOB] Unexpected error:', error);
      console.error('💥 [FREE-JOB] Error stack:', error instanceof Error ? error.stack : 'No stack trace');
      toast.error('An unexpected error occurred while posting the job');
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    } finally {
      setIsPosting(false);
      setIsSubmitting(false);
    }
  };

  const postPaidJob = async (jobData: any, pricingTier: string) => {
    console.log('💳 [PAID-JOB] Starting paid job post process');
    console.log('🔍 [PAID-JOB] User authenticated:', !!user, user?.id);
    console.log('📋 [PAID-JOB] Job data received:', jobData);
    console.log('💰 [PAID-JOB] Pricing tier:', pricingTier);

    if (!user) {
      console.error('❌ [PAID-JOB] No authenticated user');
      toast.error('Please sign in to post a job');
      return { success: false, error: 'No authenticated user' };
    }

    setIsPosting(true);
    setIsSubmitting(true);

    try {
      // First, insert job as draft in Supabase
      const jobPayload = {
        title: jobData.title || '',
        category: jobData.category || 'Other',
        location: jobData.location || '',
        description: jobData.description || '',
        compensation_type: jobData.compensation_type || '',
        compensation_details: jobData.compensation_details || '',
        requirements: jobData.requirements || '',
        user_id: user.id,
        status: 'draft', // Will be updated to 'active' after payment
        pricing_tier: pricingTier,
        contact_info: jobData.contact_info || {}
      };

      console.log('📤 [PAID-JOB] Inserting draft job payload:', jobPayload);

      const { data: insertedJob, error: insertError } = await supabase
        .from('jobs')
        .insert([jobPayload])
        .select()
        .single();

      console.log('📥 [PAID-JOB] Draft insert response - data:', insertedJob);
      console.log('📥 [PAID-JOB] Draft insert response - error:', insertError);

      if (insertError) {
        console.error('❌ [PAID-JOB] Failed to insert draft job:', insertError);
        console.error('❌ [PAID-JOB] Error details:', {
          message: insertError.message,
          details: insertError.details,
          hint: insertError.hint,
          code: insertError.code
        });
        
        toast.error(`Failed to save job: ${insertError.message}`);
        return { success: false, error: insertError.message };
      }

      if (!insertedJob) {
        console.error('❌ [PAID-JOB] No data returned from draft insert');
        toast.error('Failed to save draft job');
        return { success: false, error: 'No data returned from insert' };
      }

      console.log('✅ [PAID-JOB] Draft job inserted successfully:', insertedJob);
      console.log('🆔 [PAID-JOB] Draft job ID:', insertedJob.id);

      // Now create Stripe checkout session
      console.log('💳 [PAID-JOB] Creating Stripe checkout session...');
      
      const { data: checkoutData, error: checkoutError } = await supabase.functions.invoke('create-job-checkout', {
        body: {
          tier: pricingTier,
          jobData: jobData,
          jobId: insertedJob.id
        }
      });

      console.log('💳 [PAID-JOB] Stripe checkout response - data:', checkoutData);
      console.log('💳 [PAID-JOB] Stripe checkout response - error:', checkoutError);

      if (checkoutError) {
        console.error('❌ [PAID-JOB] Stripe checkout creation failed:', checkoutError);
        // Clean up the draft job since payment failed
        await supabase.from('jobs').delete().eq('id', insertedJob.id);
        console.log('🧹 [PAID-JOB] Cleaned up draft job due to checkout failure');
        toast.error('Failed to create payment session');
        return { success: false, error: checkoutError.message };
      }

      console.log('✅ [PAID-JOB] Stripe checkout session created:', checkoutData);

      if (checkoutData?.url) {
        console.log('🔗 [PAID-JOB] Redirecting to checkout URL:', checkoutData.url);
        // Redirect to Stripe checkout
        window.location.href = checkoutData.url;
        return { success: true, data: insertedJob, checkoutUrl: checkoutData.url };
      } else {
        console.error('❌ [PAID-JOB] No checkout URL received');
        toast.error('Failed to redirect to payment');
        return { success: false, error: 'No checkout URL received' };
      }

    } catch (error) {
      console.error('💥 [PAID-JOB] Unexpected error:', error);
      console.error('💥 [PAID-JOB] Error stack:', error instanceof Error ? error.stack : 'No stack trace');
      toast.error('An unexpected error occurred while processing payment');
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    } finally {
      setIsPosting(false);
      setIsSubmitting(false);
    }
  };

  return {
    postFreeJob,
    postPaidJob,
    isPosting,
    isSubmitting // Export the missing property
  };
};
