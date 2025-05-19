
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from "sonner";
import { useTranslation } from '@/hooks/useTranslation';

export const useAutoRenew = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const { t, isVietnamese } = useTranslation();

  const toggleAutoRenew = async (stripePaymentId: string, enableAutoRenew: boolean): Promise<boolean | null> => {
    setIsUpdating(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('toggle-auto-renew', {
        body: { stripePaymentId, enableAutoRenew }
      });

      if (error) throw error;
      
      if (data?.success) {
        // Show success message
        toast.success(
          enableAutoRenew 
            ? t({
                english: "Auto-Renew enabled successfully",
                vietnamese: "Đã bật chức năng Tự động Gia hạn"
              }) 
            : t({
                english: "Auto-Renew turned off successfully",
                vietnamese: "Đã tắt chức năng Tự động Gia hạn"
              })
        );
        return data.autoRenewEnabled;
      } else {
        throw new Error(data?.message || "Unknown error");
      }
    } catch (error) {
      console.error('Error toggling auto renew:', error);
      toast.error(t({
        english: "Failed to update auto-renew setting",
        vietnamese: "Không thể cập nhật chức năng tự động gia hạn"
      }), {
        description: isVietnamese ? "Vui lòng thử lại sau." : "Please try again later."
      });
      return null;
    } finally {
      setIsUpdating(false);
    }
  };

  return { toggleAutoRenew, isUpdating };
};
