
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";

export const usePostPayment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const initiatePayment = async (postType: 'job' | 'salon') => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { postType }
      });

      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Payment initiation error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to initiate payment. Please try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { initiatePayment, isLoading };
};
