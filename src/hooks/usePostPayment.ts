
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from "sonner";
import { useTranslation } from '@/hooks/useTranslation';
import { JobDetailsSubmission } from '@/types/job';
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
          throw error;
        }
        
        setIsLoading(false);
        return { success: false, waitlisted: true };
      }

      // Generate an idempotency key to prevent double payments
      const idempotencyKey = uuidv4();

      // Handle free listings directly without going to Stripe
      if (priceData.finalPrice <= 0) {
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
          // Provide more detailed error information
          toast.error(t({
            english: "Failed to create free post",
            vietnamese: "Không thể tạo bài đăng miễn phí"
          }), {
            description: postError.message || t({
              english: "Please try again or contact support",
              vietnamese: "Vui lòng thử lại hoặc liên hệ hỗ trợ"
            })
          });
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
      
      const { data, error } = await supabase.functions.invoke('create-job-checkout', {
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
        // Provide more detailed error information
        toast.error(t({
          english: "Payment processing failed",
          vietnamese: "Xử lý thanh toán thất bại"
        }), {
          description: error.message || t({
            english: "Please check your details and try again",
            vietnamese: "Vui lòng kiểm tra thông tin và thử lại"
          })
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
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  return { initiatePayment, isLoading };
};
