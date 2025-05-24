
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export function useStripe() {
  const [isLoading, setIsLoading] = useState(false);
  
  const initiatePayment = async (pricingOptions: any) => {
    setIsLoading(true);
    
    try {
      console.log('Initiating payment with options:', pricingOptions);
      
      // Call the create-checkout edge function
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          postType: 'job',
          pricingTier: pricingOptions.selectedPricingTier,
          durationMonths: pricingOptions.durationMonths,
          autoRenew: pricingOptions.autoRenew ? 'Yes' : 'No',
          isNationwide: pricingOptions.isNationwide,
          jobData: pricingOptions.jobData
        }
      });
      
      if (error) {
        console.error('Edge function error:', error);
        toast.error('Payment processing failed. Please try again.');
        return false;
      }
      
      if (data?.url) {
        // Open Stripe checkout in a new tab
        window.open(data.url, '_blank');
        return true;
      } else {
        console.error('No checkout URL returned');
        toast.error('Payment session creation failed. Please try again.');
        return false;
      }
      
    } catch (error) {
      console.error('Error initiating payment:', error);
      toast.error('Payment processing failed. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    isLoading,
    initiatePayment
  };
}
