
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from "sonner";
import { useTranslation } from '@/hooks/useTranslation';
import { JobDetailsSubmission } from '@/types/job';
import { PriceDetails } from '@/types/pricing';

export interface PaymentOptions {
  selectedPricingTier: string;
  priceDetails: PriceDetails;
  durationMonths: number;
  autoRenew: boolean;
  isFirstPost?: boolean;
}

export const usePostPayment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const initiatePayment = async (postType: 'job' | 'salon', postDetails?: any, paymentOptions?: PaymentOptions) => {
    setIsLoading(true);
    try {
      const pricingTier = paymentOptions?.selectedPricingTier || 'standard';
      const priceDetails = paymentOptions?.priceDetails;
      
      console.log("Initiating payment for:", postType, "with pricing:", pricingTier);

      // Handle free listings directly without going to Stripe
      if (pricingTier === 'free') {
        console.log("Processing free post...");
        // Create the post directly in the database
        const { data: postData, error: postError } = await supabase.functions.invoke('create-free-post', {
          body: { 
            postType,
            postDetails,
            pricingOptions: paymentOptions
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
        
        // Redirect to success page
        window.location.href = `/post-success?payment_log_id=${postData?.payment_log_id}&free=true`;
        return { success: true };
      } 
      
      // For paid listings, create a Stripe checkout session
      // Get the correct Stripe price ID based on tier and duration
      const durationMonths = paymentOptions?.durationMonths || 1;
      
      // Log payment parameters for debugging
      console.log("Payment parameters:", {
        tier: pricingTier,
        priceInCents: priceDetails?.priceInCents,
        duration: durationMonths,
        autoRenew: paymentOptions?.autoRenew
      });
      
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { 
          postType,
          postDetails,
          pricingOptions: paymentOptions
        }
      });

      if (error) {
        console.error("Edge function error:", error);
        throw error;
      }
      
      console.log("Checkout response:", data);
      
      if (data?.url) {
        console.log("Redirecting to Stripe checkout URL:", data.url);
        // Redirect to Stripe's hosted checkout
        window.location.href = data.url;
        return { success: true };
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
