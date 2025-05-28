
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export function useStripe() {
  const [isLoading, setIsLoading] = useState(false);
  
  const initiatePayment = async (pricingOptions: any, formData?: any) => {
    setIsLoading(true);
    
    try {
      console.log('Initiating Stripe payment with options:', pricingOptions);
      
      const { data, error } = await supabase.functions.invoke('create-salon-checkout', {
        body: { 
          pricingOptions,
          formData: formData || {}
        }
      });
      
      if (error) {
        console.error('Error creating checkout session:', error);
        toast.error("Payment Error / Lỗi Thanh Toán", {
          description: "Unable to process payment. Please try again. / Không thể xử lý thanh toán. Vui lòng thử lại."
        });
        return false;
      }
      
      if (data?.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
        return true;
      } else {
        toast.error("Payment Error / Lỗi Thanh Toán", {
          description: "No checkout URL received. Please try again. / Không nhận được URL thanh toán. Vui lòng thử lại."
        });
        return false;
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
      toast.error("Payment Error / Lỗi Thanh Toán", {
        description: "Failed to initialize payment. Please try again. / Không thể khởi tạo thanh toán. Vui lòng thử lại."
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
