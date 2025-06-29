
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface PricingOptions {
  selectedPricingTier: 'free' | 'premium' | 'gold' | 'diamond';
  durationMonths: number;
  autoRenew: boolean;
  isFirstPost: boolean;
}

export const usePostPayment = () => {
  const [isLoading, setIsLoading] = useState(false);

  const initiatePayment = async (
    postType: 'job' | 'salon',
    postDetails: any,
    pricingOptions: PricingOptions
  ) => {
    console.log('🚀 usePostPayment.initiatePayment called with:', {
      postType,
      postDetails: postDetails,
      pricingOptions,
      hasTitle: !!postDetails?.title,
      hasDescription: !!postDetails?.description
    });

    setIsLoading(true);
    
    try {
      // Handle free posts
      if (pricingOptions.selectedPricingTier === 'free') {
        console.log('🆓 Processing free post via create-free-post function');
        
        const { data: authData } = await supabase.auth.getUser();
        console.log('👤 Auth user:', { 
          hasUser: !!authData.user,
          userId: authData.user?.id,
          userEmail: authData.user?.email 
        });

        if (!authData.user) {
          console.error('❌ No authenticated user for free post');
          return { success: false, error: 'Please sign in to post a job' };
        }

        const freePostPayload = {
          postType,
          postDetails: {
            ...postDetails,
            user_id: authData.user.id,
            category: postDetails.category || 'Other',
            status: 'active'
          },
          pricingOptions,
          idempotencyKey: `free-${postType}-${Date.now()}-${authData.user.id}`
        };

        console.log('📤 Calling create-free-post with payload:', freePostPayload);

        const { data: freePostData, error: freePostError } = await supabase.functions.invoke('create-free-post', {
          body: freePostPayload
        });

        console.log('📥 create-free-post response:', {
          data: freePostData,
          error: freePostError,
          hasData: !!freePostData,
          hasError: !!freePostError
        });

        if (freePostError) {
          console.error('❌ create-free-post function error:', freePostError);
          return { 
            success: false, 
            error: `Failed to create free ${postType}: ${freePostError.message}` 
          };
        }

        if (!freePostData || !freePostData.success) {
          console.error('❌ create-free-post returned unsuccessful result:', freePostData);
          return { 
            success: false, 
            error: freePostData?.error || `Failed to create free ${postType}` 
          };
        }

        console.log('✅ Free post created successfully:', freePostData);
        return { success: true, data: freePostData };
      }

      // Handle paid posts (Diamond tier waitlist or Stripe checkout)
      if (pricingOptions.selectedPricingTier === 'diamond') {
        console.log('💎 Processing Diamond tier waitlist request');
        
        const { data: authData } = await supabase.auth.getUser();
        if (!authData.user) {
          console.error('❌ No authenticated user for Diamond tier');
          return { success: false, error: 'Please sign in to request Diamond tier' };
        }

        const { data: waitlistData, error: waitlistError } = await supabase.functions.invoke('diamond-tier-request', {
          body: {
            post_type: postType,
            additional_info: {
              ...postDetails,
              requested_tier: 'diamond',
              duration_months: pricingOptions.durationMonths
            }
          }
        });

        console.log('📥 Diamond tier waitlist response:', {
          data: waitlistData,
          error: waitlistError
        });

        if (waitlistError) {
          console.error('❌ Diamond tier waitlist error:', waitlistError);
          return { success: false, error: `Failed to request Diamond tier: ${waitlistError.message}` };
        }

        return { success: true, waitlisted: true, data: waitlistData };
      }

      // Handle other paid tiers (Premium, Gold)
      console.log('💰 Processing paid post via Stripe checkout');
      
      const { data: authData } = await supabase.auth.getUser();
      if (!authData.user) {
        console.error('❌ No authenticated user for paid post');
        return { success: false, error: 'Please sign in to post a job' };
      }

      const checkoutPayload = {
        tier: pricingOptions.selectedPricingTier,
        finalPrice: getTierPrice(pricingOptions.selectedPricingTier),
        durationMonths: pricingOptions.durationMonths,
        jobData: {
          ...postDetails,
          user_id: authData.user.id,
          category: postDetails.category || 'Other'
        }
      };

      console.log('📤 Calling create-job-checkout with payload:', checkoutPayload);

      const { data: checkoutData, error: checkoutError } = await supabase.functions.invoke('create-job-checkout', {
        body: checkoutPayload
      });

      console.log('📥 create-job-checkout response:', {
        data: checkoutData,
        error: checkoutError
      });

      if (checkoutError) {
        console.error('❌ Stripe checkout error:', checkoutError);
        return { 
          success: false, 
          error: `Failed to create checkout: ${checkoutError.message}` 
        };
      }

      if (!checkoutData?.url) {
        console.error('❌ No checkout URL returned:', checkoutData);
        return { 
          success: false, 
          error: 'Failed to create payment session' 
        };
      }

      console.log('✅ Stripe checkout URL created:', checkoutData.url);
      return { success: true, checkoutUrl: checkoutData.url };

    } catch (error) {
      console.error('💥 usePostPayment error caught:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'An unexpected error occurred' 
      };
    } finally {
      setIsLoading(false);
    }
  };

  const getTierPrice = (tier: string): number => {
    switch (tier) {
      case 'premium': return 29.99;
      case 'gold': return 49.99;
      case 'diamond': return 999.99;
      default: return 0;
    }
  };

  return {
    initiatePayment,
    isLoading
  };
};
