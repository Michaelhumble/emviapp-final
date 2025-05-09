
import { useState } from 'react';
import { useJobPayment } from '@/hooks/payments/useJobPayment';
import { useSalonPayment } from '@/hooks/payments/useSalonPayment';
import { toast } from "sonner";
import { useTranslation } from '@/hooks/useTranslation';
import { JobDetailsSubmission, PricingOptions } from '@/types/job';

export const usePostPayment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const { initiateJobPayment } = useJobPayment();
  const { initiateSalonPayment } = useSalonPayment();

  const initiatePayment = async (
    postType: 'job' | 'salon', 
    postDetails?: any, 
    pricingOptions?: PricingOptions
  ) => {
    setIsLoading(true);
    console.log("🔍 Payment initiation started for:", postType, "with options:", pricingOptions);
    
    try {
      let result;
      
      // Route to the appropriate payment handler based on post type
      if (postType === 'job') {
        result = await initiateJobPayment(postDetails, pricingOptions);
      } else if (postType === 'salon') {
        result = await initiateSalonPayment(postDetails, pricingOptions);
      } else {
        throw new Error(`Unsupported post type: ${postType}`);
      }

      // Check if we got a successful result with redirect URL
      if (result?.success && result?.redirect) {
        console.log("✅ Payment initiation successful, redirecting to:", result.redirect);
        
        // For free plans, navigate to success page
        if (pricingOptions?.selectedPricingTier === 'free') {
          console.log("Free plan - no payment processing needed");
          return result;
        }
        
        // For paid plans, redirect to Stripe checkout
        console.log("🔄 Redirecting to Stripe checkout URL...");
        
        // Use timeout to ensure logs are visible and give toast a chance to show
        setTimeout(() => {
          // Redirect to Stripe checkout
          window.location.href = result.redirect;
        }, 100);
        
        return result;
      } else {
        console.error("⚠️ Payment initiation did not return success or redirect URL:", result);
        toast.error(t("Payment setup failed", "Thiết lập thanh toán thất bại"), {
          description: t("Please try again or contact support", "Vui lòng thử lại hoặc liên hệ hỗ trợ")
        });
        throw new Error('Payment initiation failed without redirect URL');
      }
    } catch (error: any) {
      console.error('❌ Payment initiation error:', error);
      toast.error(t("Failed to initiate payment", "Không thể khởi tạo thanh toán"), {
        description: error.message || t("Please try again.", "Vui lòng thử lại.")
      });
      return { 
        success: false,
        redirect: null,
        error: error.message || 'Unknown error',
        data: null
      };
    } finally {
      setIsLoading(false);
    }
  };

  return { initiatePayment, isLoading };
};
