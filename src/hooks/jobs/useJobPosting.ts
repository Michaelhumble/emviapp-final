
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/context/auth';

export const useJobPosting = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  const submitFreeJob = async (jobData: any) => {
    if (!user) {
      const errorMsg = 'Please sign in to post a job';
      setError(errorMsg);
      toast.error(errorMsg);
      return { success: false, error: errorMsg };
    }

    setIsSubmitting(true);
    setError(null);
    
    try {
      console.log('🆓 [JOB-POSTING] Submitting free job:', jobData);
      
      const { data, error } = await supabase.functions.invoke('create-free-post', {
        body: { jobData }
      });

      console.log('🆓 [JOB-POSTING] Response from create-free-post:', { data, error });

      if (error) {
        console.error('❌ [JOB-POSTING] Error from edge function:', error);
        const errorMsg = `Failed to post job: ${error.message || 'Unknown error'}`;
        setError(errorMsg);
        toast.error(errorMsg);
        return { success: false, error: errorMsg };
      }

      if (!data?.success) {
        console.error('❌ [JOB-POSTING] Function returned failure:', data);
        const errorMsg = data?.error || 'Failed to post job';
        setError(errorMsg);
        toast.error(errorMsg);
        return { success: false, error: errorMsg };
      }

      console.log('✅ [JOB-POSTING] Free job posted successfully');
      toast.success('Job posted successfully!');
      
      // Navigate to jobs page to see the new job
      navigate('/jobs');
      
      return { success: true, data: data.data };
    } catch (err) {
      console.error('💥 [JOB-POSTING] Unexpected error:', err);
      const errorMsg = 'An unexpected error occurred while posting the job';
      setError(errorMsg);
      toast.error(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitPaidJob = async (jobData: any, tier: string, finalPrice: number) => {
    if (!user) {
      const errorMsg = 'Please sign in to post a job';
      setError(errorMsg);
      toast.error(errorMsg);
      return { success: false, error: errorMsg };
    }

    setIsSubmitting(true);
    setError(null);
    
    try {
      console.log('💳 [JOB-POSTING] Submitting paid job:', { jobData, tier, finalPrice });
      
      const { data, error } = await supabase.functions.invoke('create-job-checkout', {
        body: { 
          tier, 
          finalPrice, 
          jobData,
          jobId: null // Will be created in the function
        }
      });

      console.log('💳 [JOB-POSTING] Response from create-job-checkout:', { data, error });

      if (error) {
        console.error('❌ [JOB-POSTING] Error from checkout function:', error);
        const errorMsg = `Failed to create checkout: ${error.message || 'Unknown error'}`;
        setError(errorMsg);
        toast.error(errorMsg);
        return { success: false, error: errorMsg };
      }

      if (!data?.url) {
        console.error('❌ [JOB-POSTING] No checkout URL received:', data);
        const errorMsg = 'Failed to create payment session';
        setError(errorMsg);
        toast.error(errorMsg);
        return { success: false, error: errorMsg };
      }

      console.log('✅ [JOB-POSTING] Redirecting to Stripe checkout:', data.url);
      
      // Redirect to Stripe Checkout
      window.location.href = data.url;
      
      return { success: true, data };
    } catch (err) {
      console.error('💥 [JOB-POSTING] Unexpected error:', err);
      const errorMsg = 'An unexpected error occurred while processing payment';
      setError(errorMsg);
      toast.error(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submitFreeJob,
    submitPaidJob,
    isSubmitting,
    error,
    setError
  };
};
