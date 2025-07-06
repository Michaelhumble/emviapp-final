
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export const useJobPosting = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const submitJobPost = async (jobData: any) => {
    setIsLoading(true);
    
    try {
      console.log('📝 [HOOK] Starting job submission with data:', {
        title: jobData.title,
        pricing_tier: jobData.pricing_tier,
        category: jobData.category
      });
      
      // Check if this is a free job
      if (jobData.pricing_tier === 'free' || !jobData.pricing_tier) {
        console.log('🆓 [HOOK] Processing free job posting...');
        
        // Call the create-free-post edge function
        const { data, error } = await supabase.functions.invoke('create-free-post', {
          body: { jobData },
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (error) {
          console.error('❌ [HOOK] Free job creation error:', error);
          toast.error('Failed to create job posting. Please try again.');
          return { success: false, error };
        }

        if (data?.success && data?.jobId) {
          console.log('✅ [HOOK] Free job created successfully:', {
            jobId: data.jobId,
            status: data.status
          });
          toast.success('Free job posted successfully! It\'s now live on the jobs page.');
          
          // Small delay to ensure database is updated, then navigate
          setTimeout(() => {
            navigate('/jobs');
          }, 500);
          
          return { success: true, data };
        } else {
          console.error('❌ [HOOK] Free job creation failed:', data);
          toast.error('Failed to create job posting. Please try again.');
          return { success: false, error: data?.error || 'Unknown error' };
        }
      }

      // Handle paid job posting (Gold, Premium, Diamond)
      console.log('💰 [HOOK] Processing paid job posting...');
      
      // First, create the job as draft in the database
      const { data: draftJob, error: draftError } = await supabase
        .from('jobs')
        .insert({
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
          pricing_tier: jobData.pricing_tier,
          status: 'draft', // Will be activated after payment
          expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now
        })
        .select()
        .single();

      if (draftError) {
        console.error('❌ [HOOK] Draft job creation error:', draftError);
        toast.error('Failed to create job draft. Please try again.');
        return { success: false, error: draftError };
      }

      console.log('📝 [HOOK] Draft job created:', {
        id: draftJob.id,
        title: draftJob.title,
        status: draftJob.status
      });

      // Now create Stripe checkout session with the draft job ID
      const { data: checkoutData, error: checkoutError } = await supabase.functions.invoke('create-job-checkout', {
        body: {
          tier: jobData.pricing_tier,
          finalPrice: jobData.finalPrice || getPriceForTier(jobData.pricing_tier),
          durationMonths: jobData.durationMonths || 1,
          jobData: jobData,
          jobId: draftJob.id // Pass the draft job ID
        }
      });

      if (checkoutError) {
        console.error('❌ [HOOK] Checkout creation error:', checkoutError);
        toast.error('Failed to create checkout session. Please try again.');
        return { success: false, error: checkoutError };
      }

      if (checkoutData?.url) {
        console.log('💳 [HOOK] Redirecting to Stripe checkout...');
        toast.success('Redirecting to payment...');
        window.location.href = checkoutData.url;
        return { success: true, redirected: true, jobId: draftJob.id };
      } else {
        console.error('❌ [HOOK] No checkout URL received');
        toast.error('Failed to create checkout session. Please try again.');
        return { success: false, error: 'No checkout URL received' };
      }

    } catch (error) {
      console.error('💥 [HOOK] Job posting error:', error);
      toast.error('An unexpected error occurred. Please try again.');
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to get price for tier
  const getPriceForTier = (tier: string) => {
    switch (tier) {
      case 'premium': return 25;
      case 'gold': return 45;
      case 'diamond': return 85;
      default: return 0;
    }
  };

  // Export both names for backward compatibility
  const handleJobPost = submitJobPost;

  return {
    submitJobPost,
    handleJobPost, // Backward compatibility
    isLoading
  };
};
