
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from "sonner";
import { useTranslation } from '@/hooks/useTranslation';
import { PricingOptions, JobPricingTier } from '@/utils/posting/types';
import { getJobPrice, validatePricingOptions } from '@/utils/posting/jobPricing';
import { v4 as uuidv4 } from 'uuid';

export const usePostPayment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const initiatePayment = async (postType: 'job' | 'salon', postDetails?: any, pricingOptions?: PricingOptions) => {
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

      // Generate an idempotency key to prevent double payments
      const idempotencyKey = uuidv4();

      // Handle free listings directly without going to Stripe
      if (priceData.finalPrice <= 0 || pricingOptions.selectedPricingTier === 'free') {
        console.log("Processing free post...");
        // Create the post directly in the database
        const { data: postData, error: postError } = await supabase.functions.invoke('create-free-post', {
          body: { 
            postType,
            postDetails,
            pricingOptions,
            idempotencyKey
          }
        });

        if (postError) {
          console.error("Free post creation error:", postError);
          throw postError;
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
        
        // Redirect to success page
        window.location.href = `/post-success?payment_log_id=${postData?.payment_log_id}&free=true`;
        return { success: true };
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
      
      // Special case for diamond tier - ensure it always has 12 months duration
      if (pricingOptions.selectedPricingTier === 'diamond') {
        pricingOptions.durationMonths = 12;
        // Diamond tier should never be auto-renew
        pricingOptions.autoRenew = false;
      }
      
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
      toast.error(t({
        english: "Failed to initiate payment",
        vietnamese: "Không thể khởi tạo thanh toán"
      }), {
        description: error.message || t({
          english: "Please try again.",
          vietnamese: "Vui lòng thử lại."
        })
      });
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  return { initiatePayment, isLoading };
};
