
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Job } from "@/types/job";
import { getRenewalPrice } from "@/utils/postingPriceCalculator";
import { toast } from "@/components/ui/use-toast";

export const useJobRenewal = (onSuccess: () => void) => {
  const [isRenewing, setIsRenewing] = useState(false);
  const [renewalJobId, setRenewalJobId] = useState<string | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [renewalPrice, setRenewalPrice] = useState(0);
  const [renewalOptions, setRenewalOptions] = useState({
    isNationwide: false,
    isRenewal: true
  });

  const prepareRenewal = (job: Job) => {
    const options = {
      isNationwide: job.is_nationwide || false,
      isRenewal: true
    };
    
    setRenewalJobId(job.id);
    setRenewalOptions(options);
    setRenewalPrice(getRenewalPrice('job', options.isNationwide));
    setIsPaymentModalOpen(true);
  };
  
  const handleRenewalPaymentSuccess = async () => {
    if (!renewalJobId) return;
    
    setIsRenewing(true);
    try {
      const today = new Date();
      
      if (renewalJobId.startsWith('sample-')) {
        toast({
          title: "Success",
          description: "Sample job post renewed successfully!",
        });
        
        setTimeout(() => {
          setIsRenewing(false);
          setRenewalJobId(null);
          setIsPaymentModalOpen(false);
          onSuccess();
        }, 1000);
        return;
      }
      
      const { error } = await supabase
        .from('posts')
        .update({ created_at: today.toISOString() })
        .eq('id', renewalJobId);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Job post renewed successfully!",
      });
      
      onSuccess();
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Failed to renew job post: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setIsRenewing(false);
      setRenewalJobId(null);
      setIsPaymentModalOpen(false);
    }
  };

  return {
    isRenewing,
    renewalJobId,
    isPaymentModalOpen,
    renewalPrice,
    renewalOptions,
    prepareRenewal,
    handleRenewalPaymentSuccess,
    setIsPaymentModalOpen
  };
};
