
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from "sonner";
import { useTranslation } from '@/hooks/useTranslation';
import { JobDetailsSubmission } from '@/types/job';
import { PricingOptions } from '@/utils/posting/types';
import { calculateJobPostPrice, validatePricingOptions } from '@/utils/pricing/calculatePrice';
import { useJobPosting } from '@/context/JobPostingContext';
import { logPaymentAttempt, logError } from '@/utils/telemetry/jobPostingEvents';

export const usePostPayment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  
  // Optionally access job posting context
  let jobPostingContext: ReturnType<typeof useJobPosting> | null = null;
  try {
    jobPostingContext = useJobPosting();
  } catch (error) {
    // Context not available, proceed without it
    console.log('Job posting context not available, proceeding without it');
  }

  const initiatePayment = async (
    postType: 'job' | 'salon', 
    postDetails?: JobDetailsSubmission, 
    pricingOptions?: PricingOptions
  ) => {
    setIsLoading(true);
    try {
      console.log("Initiating payment for:", postType);
      
      // Use context pricing options if available, otherwise use passed options
      const usePricingOptions = jobPostingContext?.pricingOptions || pricingOptions;
      
      // Log price calculation inputs 
      console.log("Payment using pricing options:", usePricingOptions);
      
      // Validate pricing options to ensure they exist
      if (!usePricingOptions || !usePricingOptions.selectedPricingTier) {
        const errorMessage = t({
          english: "Missing pricing information. Please select a plan.",
          vietnamese: "Thiếu thông tin giá. Vui lòng chọn một gói."
        });
        console.error("Missing pricing tier");
        throw new Error(errorMessage);
      }
      
      // Validate pricing options structure
      const validation = validatePricingOptions(usePricingOptions);
      if (!validation.valid) {
        const errorMessage = validation.errors.join(', ');
        console.error("Invalid pricing options:", errorMessage);
        throw new Error(errorMessage);
      }

      // Calculate price based on selected options
      const priceData = calculateJobPostPrice(usePricingOptions);
      console.log("Calculated price for payment:", priceData);
      
      // Log the payment attempt
      logPaymentAttempt(postType, usePricingOptions, priceData);
      
      // If context is available, validate the calculated price matches context price
      if (jobPostingContext) {
        const contextPrice = jobPostingContext.calculatedPrice;
        if (contextPrice.finalPrice !== priceData.finalPrice) {
          console.warn(
            "Price mismatch detected:", 
            "Context price:", contextPrice.finalPrice, 
            "Calculated price:", priceData.finalPrice
          );
          logError('price_mismatch', 
            `Price mismatch: Context ${contextPrice.finalPrice} vs Calculated ${priceData.finalPrice}`,
            { contextPrice, calculatedPrice: priceData }
          );
        }
      }
      
      // Handle free listings directly without going to Stripe
      if (usePricingOptions.selectedPricingTier === 'free') {
        console.log("Processing free post...");
        
        // Create the post directly in the database via edge function
        const { data: postData, error: postError } = await supabase.functions.invoke('create-free-post', {
          body: { 
            postType,
            postDetails,
            pricingOptions: usePricingOptions
          }
        });

        if (postError) {
          console.error("Free post creation error:", postError);
          logError('free_post_creation', postError.message, { postType, pricingOptions: usePricingOptions });
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
      
      // For paid listings (including Diamond), create a Stripe checkout session
      console.log("Creating paid post checkout with options:", {
        tier: usePricingOptions.selectedPricingTier,
        duration: usePricingOptions.durationMonths,
        autoRenew: usePricingOptions.autoRenew,
        finalPrice: priceData.finalPrice
      });
      
      // Ensure the price is greater than zero for paid plans
      if (usePricingOptions.selectedPricingTier !== 'free' && priceData.finalPrice <= 0) {
        const errorMessage = t({
          english: "Invalid price calculation. Please try again or choose a different plan.",
          vietnamese: "Tính toán giá không hợp lệ. Vui lòng thử lại hoặc chọn một gói khác."
        });
        console.error("Price calculation resulted in $0 for paid plan");
        logError('zero_price_paid_plan', 'Price calculation resulted in $0 for paid plan', {
          pricingOptions: usePricingOptions,
          priceData
        });
        throw new Error(errorMessage);
      }
      
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { 
          postType,
          postDetails,
          pricingOptions: usePricingOptions,
          priceData // Pass the calculated price data
        }
      });

      if (error) {
        console.error("Edge function error:", error);
        logError('create_checkout', error.message, {
          postType,
          pricingOptions: usePricingOptions
        });
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
        logError('missing_checkout_url', 'No checkout URL received from Stripe', { data });
        throw new Error('No checkout URL received from Stripe');
      }
    } catch (error: any) {
      console.error('Payment initiation error:', error);
      logError('payment_initiation', error.message || 'Unknown payment error');
      
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
