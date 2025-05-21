
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from "sonner";
import { useTranslation } from '@/hooks/useTranslation';
import { JobDetailsSubmission } from '@/types/job';
import { PricingOptions, JobPricingTier } from '@/utils/posting/types';
import { getJobPrice, validatePricingOptions } from '@/utils/posting/jobPricing';
import { v4 as uuidv4 } from 'uuid';

export interface PaymentResult {
  success: boolean;
  error?: string;
  waitlisted?: boolean;
  payment_log_id?: string;
  job_id?: string;
}

export const usePostPayment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const initiatePayment = async (
    postType: 'job' | 'salon', 
    postDetails?: any, 
    pricingOptions?: PricingOptions,
    idempotencyKey: string = uuidv4() // Allow custom idempotency key or generate one
  ): Promise<PaymentResult> => {
    setIsLoading(true);
    try {
      console.log("Initiating payment for:", postType, "with pricing:", pricingOptions);

      // Ensure pricing options exist
      if (!pricingOptions) {
        throw new Error("Missing pricing options");
      }

      // Validate pricing options
      if (!validatePricingOptions(pricingOptions)) {
        throw new Error("Invalid pricing options");
      }

      // Calculate price using our centralized pricing function
      const priceData = getJobPrice(pricingOptions);
      console.log("Calculated price:", priceData);

      // Check for the $0.00 bug - Only allow $0 for free tier or first post
      if (priceData.finalPrice <= 0 && pricingOptions.selectedPricingTier !== 'free' && !pricingOptions.isFirstPost) {
        throw new Error("Invalid price: Non-free plan cannot have $0 price");
      }

      // Diamond tier requires special access - never allow direct payment
      if (pricingOptions.selectedPricingTier === 'diamond') {
        // Show info about invitation process
        toast.info(
          t({
            english: "Diamond tier requires an invitation",
            vietnamese: "Gói Kim cương yêu cầu lời mời"
          }), {
          description: t({
            english: "Our team will contact you about the Diamond tier",
            vietnamese: "Đội ngũ của chúng tôi sẽ liên hệ với bạn về gói Kim cương"
          })
        });
        
        // Create a waitlist entry using the dedicated edge function
        const { data, error } = await supabase.functions.invoke('diamond-tier-request', {
          body: { 
            postType, 
            additionalInfo: { ...postDetails, pricingOptions }
          }
        });
        
        if (error) {
          console.error("Error adding to Diamond waitlist:", error);
          throw new Error(`Diamond tier request error: ${error.message}`);
        }
        
        setIsLoading(false);
        return { success: false, waitlisted: true };
      }

      // Handle free listings directly without going to Stripe
      if (priceData.finalPrice <= 0) {
        console.log("Processing free post...");
        // Create the post directly in the database
        const { data, error } = await supabase.functions.invoke('create-free-post', {
          body: { 
            postType,
            postDetails,
            pricingOptions,
            idempotencyKey
          }
        });

        if (error) {
          console.error("Free post creation error:", error);
          throw new Error(`Free post creation error: ${error.message}`);
        }

        if (!data) {
          throw new Error("No data returned from free post creation");
        }

        toast.success(
          t({
            english: "Your free post has been submitted",
            vietnamese: "Tin miễn phí của bạn đã được đăng"
          }), {
          description: t({
            english: "You can view it in your dashboard now",
            vietnamese: "Bạn có thể xem nó trong bảng điều khiển của bạn ngay bây giờ"
          })
        });
        
        setIsLoading(false);
        return { 
          success: true, 
          payment_log_id: data.payment_log_id,
          job_id: data.job_id
        };
      } 
      
      // For paid listings, create a Stripe checkout session
      // Log payment parameters for debugging
      console.log("Payment parameters:", {
        tier: pricingOptions.selectedPricingTier,
        duration: pricingOptions.durationMonths,
        autoRenew: pricingOptions.autoRenew,
        finalPrice: priceData.finalPrice,
        idempotencyKey
      });
      
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { 
          postType,
          postDetails,
          pricingOptions,
          priceData, // Pass the calculated price data
          idempotencyKey // Include idempotency key
        }
      });

      if (error) {
        console.error("Edge function error:", error);
        throw new Error(`Payment processing error: ${error.message}`);
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
      const errorMessage = error.message || t({
        english: "An unexpected error occurred",
        vietnamese: "Đã xảy ra lỗi không mong muốn"
      });
      
      setIsLoading(false);
      return { 
        success: false, 
        error: errorMessage
      };
    } finally {
      setIsLoading(false);
    }
  };

  // New method to verify a checkout session
  const verifyCheckoutSession = async (sessionId: string): Promise<PaymentResult> => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('verify-checkout-session', {
        body: { sessionId }
      });

      if (error) {
        console.error("Error verifying checkout session:", error);
        throw new Error(`Verification error: ${error.message}`);
      }

      if (!data.success) {
        throw new Error(data.error || "Payment verification failed");
      }

      return {
        success: true,
        payment_log_id: data.payment_log_id,
        job_id: data.post_id
      };
    } catch (error: any) {
      console.error('Payment verification error:', error);
      return { 
        success: false, 
        error: error.message || "Payment verification failed"
      };
    } finally {
      setIsLoading(false);
    }
  };

  return { 
    initiatePayment, 
    verifyCheckoutSession,
    isLoading 
  };
};
