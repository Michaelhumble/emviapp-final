
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';

export interface JobPaymentData {
  jobId?: string;
  paymentMethodId: string;
  pricingTier: string;
  autoRenew: boolean;
}

export const useJobPaymentHandler = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useAuth();

  const handlePaymentSetup = async (data: JobPaymentData) => {
    if (!user?.id) {
      toast.error('User must be logged in to save payment method');
      return { success: false };
    }

    setIsProcessing(true);

    try {
      // Call to Supabase Edge Function to save the payment method
      // This doesn't charge the card yet, just saves the payment method
      const { data: responseData, error } = await supabase.functions.invoke('save-payment-method', {
        body: {
          paymentMethodId: data.paymentMethodId,
          pricingTier: data.pricingTier,
          autoRenew: data.autoRenew,
          jobId: data.jobId
        }
      });

      if (error) {
        console.error('Payment setup error:', error);
        toast.error('Failed to save payment method');
        return { success: false };
      }

      return { success: true, data: responseData };
    } catch (error) {
      console.error('Payment processing error:', error);
      toast.error('An unexpected error occurred during payment setup');
      return { success: false };
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    handlePaymentSetup,
    isProcessing
  };
};
