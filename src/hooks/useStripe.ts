
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface PaymentOptions {
  tier: string;
  durationMonths: number;
  autoRenew: boolean;
  finalPrice: number;
  salonData: {
    salonName?: string;
    askingPrice?: string;
    city?: string;
    state?: string;
    address?: string;
  };
}

export function useStripe() {
  const [isLoading, setIsLoading] = useState(false);
  
  const initiatePayment = async (pricingOptions: PaymentOptions) => {
    setIsLoading(true);
    
    try {
      console.log('Initiating payment with options:', pricingOptions);
      
      const { data, error } = await supabase.functions.invoke('create-salon-checkout', {
        body: pricingOptions
      });

      if (error) {
        console.error('Error creating checkout session:', error);
        toast.error('Lỗi tạo phiên thanh toán / Error creating payment session');
        return false;
      }

      if (data?.url) {
        // Open Stripe checkout in new tab
        window.open(data.url, '_blank');
        return true;
      } else {
        toast.error('Không nhận được URL thanh toán / No payment URL received');
        return false;
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
      toast.error('Lỗi xử lý thanh toán / Payment processing error');
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
