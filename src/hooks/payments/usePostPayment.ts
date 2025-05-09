
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
        console.log("Calling initiateJobPayment...");
        result = await initiateJobPayment(postDetails, pricingOptions);
      } else if (postType === 'salon') {
        console.log("Calling initiateSalonPayment...");
        result = await initiateSalonPayment(postDetails, pricingOptions);
      } else {
        throw new Error(`Unsupported post type: ${postType}`);
      }

      // Debug the raw response
      console.log("🧪 Raw payment result:", result);
      
      // Check if we got a successful result with redirect URL
      if (result?.success && result?.redirect) {
        console.log("✅ Payment initiation successful, redirect URL:", result.redirect);
        
        // For free plans, navigate to success page
        if (pricingOptions?.selectedPricingTier === 'free') {
          console.log("Free plan - no payment processing needed");
          return result;
        }
        
        // Enhanced validation for redirect URL
        if (!result.redirect || typeof result.redirect !== 'string' || !result.redirect.startsWith('http')) {
          console.error("⚠️ Invalid redirect URL format:", result.redirect);
          toast.error(t("Invalid payment URL", "URL thanh toán không hợp lệ"), {
            description: t("Please try again or contact support", "Vui lòng thử lại hoặc liên hệ hỗ trợ")
          });
          return {
            success: false,
            redirect: null,
            error: 'Invalid redirect URL format',
            data: null
          };
        }
        
        return result;
      } else {
        console.error("⚠️ Payment initiation did not return success or redirect URL:", result);
        return { 
          success: false,
          redirect: null,
          error: 'Payment initiation failed without redirect URL',
          data: result
        };
      }
    } catch (error: any) {
      console.error('❌ Payment initiation error:', error);
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
