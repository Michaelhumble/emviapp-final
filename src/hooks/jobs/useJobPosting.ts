
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/context/auth';

export const useJobPosting = () => {
  const [isPosting, setIsPosting] = useState(false);
  const { user } = useAuth();

  const postFreeJob = async (jobData: any) => {
    if (!user) {
      toast.error('Please sign in to post a job');
      return { success: false, error: 'No authenticated user' };
    }

    setIsPosting(true);

    try {
      console.log('🚀 [FREE-JOB] Starting free job post with data:', jobData);
      
      // Prepare job data for Supabase insertion
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

      console.log('📋 [FREE-JOB] Prepared payload for Supabase:', jobPayload);

      // Direct Supabase insertion for free jobs
      const { data, error } = await supabase
        .from('jobs')
        .insert([jobPayload])
        .select()
        .single();

      if (error) {
        console.error('❌ [FREE-JOB] Supabase insert error:', error);
        toast.error(`Failed to post job: ${error.message}`);
        return { success: false, error: error.message };
      }

      console.log('✅ [FREE-JOB] Successfully inserted job:', data);
      toast.success('Free job posted successfully!');
      
      return { success: true, data };

    } catch (error) {
      console.error('💥 [FREE-JOB] Unexpected error:', error);
      toast.error('An unexpected error occurred while posting the job');
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    } finally {
      setIsPosting(false);
    }
  };

  const postPaidJob = async (jobData: any, pricingTier: string) => {
    if (!user) {
      toast.error('Please sign in to post a job');
      return { success: false, error: 'No authenticated user' };
    }

    setIsPosting(true);

    try {
      console.log('💳 [PAID-JOB] Starting paid job post with data:', jobData);
      console.log('💳 [PAID-JOB] Pricing tier:', pricingTier);
      
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

      console.log('📋 [PAID-JOB] Inserting draft job to Supabase:', jobPayload);

      const { data: insertedJob, error: insertError } = await supabase
        .from('jobs')
        .insert([jobPayload])
        .select()
        .single();

      if (insertError) {
        console.error('❌ [PAID-JOB] Failed to insert draft job:', insertError);
        toast.error(`Failed to save job: ${insertError.message}`);
        return { success: false, error: insertError.message };
      }

      console.log('✅ [PAID-JOB] Draft job inserted successfully:', insertedJob);

      // Now create Stripe checkout session
      console.log('💳 [PAID-JOB] Creating Stripe checkout session...');
      
      const { data: checkoutData, error: checkoutError } = await supabase.functions.invoke('create-job-checkout', {
        body: {
          tier: pricingTier,
          jobData: jobData,
          jobId: insertedJob.id
        }
      });

      if (checkoutError) {
        console.error('❌ [PAID-JOB] Stripe checkout creation failed:', checkoutError);
        // Clean up the draft job since payment failed
        await supabase.from('jobs').delete().eq('id', insertedJob.id);
        toast.error('Failed to create payment session');
        return { success: false, error: checkoutError.message };
      }

      console.log('✅ [PAID-JOB] Stripe checkout session created:', checkoutData);

      if (checkoutData?.url) {
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
      toast.error('An unexpected error occurred while processing payment');
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    } finally {
      setIsPosting(false);
    }
  };

  return {
    postFreeJob,
    postPaidJob,
    isPosting
  };
};
