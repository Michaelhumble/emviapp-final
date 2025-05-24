
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { PricingOptions, PostType } from '@/utils/posting/types';

interface PaymentResult {
  success: boolean;
  waitlisted?: boolean;
  error?: string;
}

export function usePostPayment() {
  const [isLoading, setIsLoading] = useState(false);
  
  const initiatePayment = async (
    postType: PostType,
    jobData: any,
    pricingOptions: PricingOptions
  ): Promise<PaymentResult> => {
    setIsLoading(true);
    
    try {
      // Handle free posts
      if (pricingOptions.selectedPricingTier === 'free' || pricingOptions.isFirstPost) {
        console.log('Creating free post:', { postType, jobData, pricingOptions });
        
        const { data, error } = await supabase.functions.invoke('create-free-post', {
          body: {
            postType,
            postDetails: jobData,
            pricingOptions,
            idempotencyKey: `free-${Date.now()}-${Math.random()}`
          }
        });
        
        if (error) {
          console.error('Free post creation error:', error);
          return { success: false, error: error.message };
        }
        
        return { success: true };
      }
      
      // Handle Diamond tier (waitlist)
      if (pricingOptions.selectedPricingTier === 'diamond') {
        console.log('Adding to Diamond waitlist:', { postType, jobData, pricingOptions });
        return { success: false, waitlisted: true };
      }
      
      // Handle paid posts
      console.log('Creating paid post:', { postType, jobData, pricingOptions });
      
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          postType,
          postDetails: jobData,
          pricingOptions
        }
      });
      
      if (error) {
        console.error('Payment creation error:', error);
        return { success: false, error: error.message };
      }
      
      // Redirect to Stripe Checkout
      if (data?.url) {
        window.location.href = data.url;
        return { success: true };
      }
      
      return { success: false, error: 'No checkout URL received' };
      
    } catch (error) {
      console.error('Payment initiation error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    isLoading,
    initiatePayment
  };
}
