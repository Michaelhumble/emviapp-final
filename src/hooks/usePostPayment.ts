
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from "sonner";
import { useTranslation } from '@/hooks/useTranslation';
import { PricingOptions } from '@/types/pricing';

// Define response types to fix TypeScript errors
interface PaymentSuccessResponse {
  success: boolean;
  url?: string;
  payment_log_id?: string;
}

/**
 * Hook for initiating post payments via Stripe
 */
export const usePostPayment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  /**
   * Initiates the payment process for a post
   * @param postType - Type of post ('job' or 'salon')
   * @param postDetails - Details of the post
   * @param pricingOptions - Selected pricing options
   * @returns Result object indicating success status
   */
  const initiatePayment = async (postType: 'job' | 'salon', postDetails?: any, pricingOptions?: PricingOptions): Promise<PaymentSuccessResponse> => {
    setIsLoading(true);
    try {
      console.log("Initiating payment for:", postType, "with pricing:", pricingOptions?.selectedPricingTier);
      
      // Store checkout data in sessionStorage to handle browser redirects better
      if (pricingOptions) {
        sessionStorage.setItem('emvi_checkout_postType', postType);
        sessionStorage.setItem('emvi_checkout_pricingTier', pricingOptions.selectedPricingTier || '');
        if (pricingOptions.durationMonths) {
          sessionStorage.setItem('emvi_checkout_duration', pricingOptions.durationMonths.toString());
        }
        sessionStorage.setItem('emvi_checkout_autoRenew', pricingOptions.autoRenew ? 'true' : 'false');
      }

      // Handle free listings directly without going to Stripe
      if (pricingOptions?.selectedPricingTier === 'free') {
        console.log("Processing free post...");
        // Create the post directly in the database
        const { data: postData, error: postError } = await supabase.functions.invoke('create-free-post', {
          body: { 
            postType,
            postDetails,
            pricingOptions
          }
        });

        if (postError) {
          console.error("Free post creation error:", postError);
          throw postError;
        }

        toast.success(
          t("Your free post has been submitted", "Tin miễn phí của bạn đã được đăng"), {
          description: t("You can view it in your dashboard now", "Bạn có thể xem nó trong bảng điều khiển của bạn ngay bây giờ")
        });
        
        // Return success result with payment log ID
        return { 
          success: true,
          payment_log_id: postData?.payment_log_id
        };
      } 
      
      // For paid listings, create a Stripe checkout session
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { 
          postType,
          postDetails,
          pricingOptions
        }
      });

      if (error) {
        console.error("Edge function error:", error);
        throw error;
      }
      
      console.log("Checkout response:", data);
      
      if (data?.url) {
        console.log("Redirecting to Stripe checkout URL:", data.url);
        return { 
          success: true, 
          url: data.url 
        };
      } else {
        console.error("No checkout URL received");
        throw new Error('No checkout URL received from Stripe');
      }
    } catch (error: any) {
      console.error('Payment initiation error:', error);
      toast.error(t("Failed to initiate payment", "Không thể khởi tạo thanh toán"), {
        description: error.message || t("Please try again.", "Vui lòng thử lại.")
      });
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  return { initiatePayment, isLoading };
};
