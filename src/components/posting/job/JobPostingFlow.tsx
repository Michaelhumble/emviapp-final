import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { usePricing } from '@/context/pricing/PricingProvider';
import { useStripe } from '@/hooks/useStripe';
import { useJobPosting } from '@/hooks/jobs/useJobPosting';
import { toast } from 'sonner';

const JobPostingFlow = ({ jobFormData }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { pricingOptions, priceData } = usePricing();
  const { initiatePayment } = useStripe();
  const { handleJobPost } = useJobPosting();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!user?.id) {
      toast.error('Please log in to post a job');
      return;
    }

    setIsSubmitting(true);

    try {
      // Add user_id to job data to ensure ownership
      const jobDataWithUser = {
        ...jobFormData,
        user_id: user.id, // Ensure user_id is always set
        created_at: new Date().toISOString(),
      };

      // Enhanced logging for debugging
      console.log('🔍 Posting Flow Debug:', {
        selectedPricingTier: pricingOptions.selectedPricingTier,
        finalPrice: priceData.finalPrice,
        userId: user.id,
        timestamp: new Date().toISOString()
      });

      // CRITICAL FIX: Only allow free path for explicitly free tier AND zero price
      const isTrulyFree = (
        pricingOptions.selectedPricingTier === 'free' && 
        priceData.finalPrice === 0
      );

      if (isTrulyFree) {
        console.log('✅ FREE POSTING PATH: Direct Supabase save');
        
        // FREE POSTING - Direct save to Supabase
        const { data, error } = await supabase
          .from('jobs')
          .insert({
            ...jobDataWithUser,
            pricing_tier: 'free',
            status: 'active'
          });

        if (error) {
          console.error('❌ Free posting error:', error);
          throw error;
        }

        console.log('✅ Free job created successfully:', data);
        navigate('/post-success?free=true');
        
      } else {
        console.log('💳 PAID POSTING PATH: Triggering Stripe checkout', {
          tier: pricingOptions.selectedPricingTier,
          price: priceData.finalPrice
        });
        
        // PAID POSTING - Always trigger Stripe for non-free posts
        const success = await initiatePayment(pricingOptions, jobDataWithUser);
        
        if (success) {
          console.log('✅ Stripe checkout initiated successfully');
          // Stripe will handle redirect automatically
        } else {
          console.error('❌ Stripe checkout failed');
          throw new Error('Payment initialization failed');
        }
      }

    } catch (error) {
      console.error('❌ Job posting error:', error);
      toast.error('Failed to post job. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <button onClick={handleSubmit} disabled={isSubmitting}>
        {isSubmitting ? 'Posting...' : 'Post Job'}
      </button>
    </div>
  );
};

export default JobPostingFlow;
