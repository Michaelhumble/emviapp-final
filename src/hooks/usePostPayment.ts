
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from "sonner";
import { PricingOptions } from '@/utils/posting/types';
import { calculateJobPostPrice } from '@/utils/pricing/calculatePrice';
import { logJobPostingEvent } from '@/utils/telemetry/jobPostingEvents';

export const usePostPayment = () => {
  const [isLoading, setIsLoading] = useState(false);

  const initiatePayment = async (
    postType: 'job' | 'salon',
    postId: string,
    pricingOptions: PricingOptions
  ) => {
    setIsLoading(true);
    
    try {
      // Calculate final price using centralized calculator
      const priceCalculation = calculateJobPostPrice(pricingOptions);
      
      // Log the payment attempt for debugging
      logJobPostingEvent('PAYMENT_ATTEMPT', 'Initiating payment', {
        postType,
        postId,
        pricingOptions,
        calculatedPrice: priceCalculation
      });
      
      // Call Supabase function to create checkout
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { 
          postType,
          postId,
          pricingOptions,
          price: priceCalculation.finalPrice
        }
      });

      if (error) throw error;
      
      if (data?.url) {
        window.location.href = data.url;
        return true;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (error) {
      console.error('Payment initiation error:', error);
      logJobPostingEvent('ERROR', 'Payment initiation failed', {
        postType,
        postId,
        pricingOptions,
        error
      });
      
      toast.error("Failed to initiate payment", {
        description: "Please try again."
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { initiatePayment, isLoading };
};
