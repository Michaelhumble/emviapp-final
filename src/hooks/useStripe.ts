
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export function useStripe() {
  const [isLoading, setIsLoading] = useState(false);
  
  const initiatePayment = async (pricingOptions: any, formData?: any) => {
    setIsLoading(true);
    
    try {
      console.log('Initiating Stripe payment with options:', pricingOptions);
      console.log('Form data:', formData);
      
      const { data, error } = await supabase.functions.invoke('create-salon-checkout', {
        body: { 
          pricingOptions,
          formData: formData || {}
        }
      });
      
      if (error) {
        console.error('Error creating checkout session:', error);
        toast.error("Payment Error", {
          description: "Unable to process payment. Please try again."
        });
        return false;
      }
      
      if (data?.url) {
        console.log('Redirecting to Stripe checkout:', data.url);
        // Redirect to Stripe Checkout
        window.location.href = data.url;
        return true;
      } else {
        console.error('No checkout URL received:', data);
        toast.error("Payment Error", {
          description: "No checkout URL received. Please try again."
        });
        return false;
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
      toast.error("Payment Error", {
        description: "Failed to initialize payment. Please try again."
      });
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
