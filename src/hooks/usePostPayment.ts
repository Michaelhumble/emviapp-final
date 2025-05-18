
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from "sonner";
import { useTranslation } from '@/hooks/useTranslation';
import { JobDetailsSubmission } from '@/types/job';
import { PricingOptions } from '@/utils/posting/types';
import { calculateJobPostPrice } from '@/utils/posting/jobPricing';

export const usePostPayment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const initiatePayment = async (postType: 'job' | 'salon', postDetails?: JobDetailsSubmission, pricingOptions?: PricingOptions) => {
    setIsLoading(true);
    try {
      console.log("Initiating payment for:", postType, "with pricing options:", pricingOptions);

      // Validate pricing options to ensure they exist
      if (!pricingOptions || !pricingOptions.selectedPricingTier) {
        throw new Error(t({
          english: "Missing pricing information. Please select a plan.",
          vietnamese: "Thiếu thông tin giá. Vui lòng chọn một gói."
        }));
      }

      // Calculate price based on selected options
      const priceData = calculateJobPostPrice(pricingOptions);
      console.log("Calculated price:", priceData);
      
      // Handle free listings directly without going to Stripe
      if (pricingOptions.selectedPricingTier === 'free') {
        console.log("Processing free post...");
        
        // Create the post directly in the database via edge function
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
        tier: pricingOptions.selectedPricingTier,
        duration: pricingOptions.durationMonths,
        autoRenew: pricingOptions.autoRenew,
        finalPrice: priceData.finalPrice
      });
      
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { 
          postType,
          postDetails,
          pricingOptions,
          priceData // Pass the calculated price data
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
