
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from "sonner";
import { PricingOptions } from '@/utils/posting/types';

export const usePostPayment = () => {
  const [isLoading, setIsLoading] = useState(false);

  const initiatePayment = async (
    postType: 'job' | 'salon', 
    jobDetails: any, 
    pricingOptions: PricingOptions
  ) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { 
          postType,
          jobDetails,
          pricingOptions
        }
      });

      if (error) throw error;
      
      if (data?.url) {
        window.location.href = data.url;
        return { success: true };
      }
      
      return { success: false };
    } catch (error) {
      console.error('Payment initiation error:', error);
      toast.error("Failed to initiate payment", {
        description: "Please try again."
      });
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  return { initiatePayment, isLoading };
};
