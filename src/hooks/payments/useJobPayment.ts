
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from "sonner";
import { JobDetailsSubmission, PricingOptions } from '@/types/job';
import { useTranslation } from '@/hooks/useTranslation';
import { StripeCheckoutResponse } from '@/types/pricing';

export const useJobPayment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const initiateJobPayment = async (
    jobDetails: JobDetailsSubmission,
    pricingOptions?: PricingOptions
  ) => {
    setIsLoading(true);
    console.log("🔍 Job payment initiation started with options:", pricingOptions);
    
    try {
      // Handle free listings directly without going to Stripe
      if (pricingOptions?.selectedPricingTier === 'free') {
        console.log("Processing free job post...");
        
        const { data: postData, error: postError } = await supabase.functions.invoke('create-free-post', {
          body: { 
            postType: 'job',
            postDetails: jobDetails,
            pricingOptions
          }
        });

        console.log("Free post response:", postData, "Error:", postError);

        if (postError) {
          console.error("Free post creation error:", postError);
          toast.error(t("Error creating free post", "Lỗi khi tạo bài đăng miễn phí"), {
            description: postError.message || t("Please try again", "Vui lòng thử lại")
          });
          throw postError;
        }

        toast.success(
          t("Your free post has been submitted", "Tin miễn phí của bạn đã được đăng"), {
          description: t("You can view it in your dashboard now", "Bạn có thể xem nó trong bảng điều khiển của bạn ngay bây giờ")
        });
        
        return { 
          success: true,
          redirect: `/post-success?payment_log_id=${postData?.payment_log_id}&free=true`,
          data: postData
        };
      } 
      
      // For paid listings, create a Stripe checkout session
      console.log("Creating Stripe checkout for paid job listing...");

      // Create the request payload
      const payload = {
        postType: 'job',
        postDetails: jobDetails,
        pricingOptions
      };
      
      console.log("🚀 Calling create-checkout with payload:", payload);
      
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: payload
      });

      console.log("📥 Stripe checkout raw response:", data);
      console.log("📥 Stripe checkout error:", error);

      if (error) {
        console.error("Edge function error:", error);
        toast.error(t("Payment service error", "Lỗi dịch vụ thanh toán"), {
          description: error.message || t("Could not connect to payment provider", "Không thể kết nối với nhà cung cấp dịch vụ thanh toán")
        });
        throw error;
      }
      
      if (!data) {
        console.error("No data returned from checkout");
        toast.error(t("Invalid response from payment service", "Phản hồi không hợp lệ từ dịch vụ thanh toán"));
        throw new Error('No data returned from payment service');
      }
      
      // Explicitly validate the URL
      const checkoutResponse = data as StripeCheckoutResponse;
      console.log("Checkout response data structure:", JSON.stringify(checkoutResponse));
      
      if (!checkoutResponse.url) {
        console.error("⛔ No checkout URL received in response:", data);
        toast.error(t("Missing payment URL", "URL thanh toán bị thiếu"), {
          description: t("Please try again or contact support", "Vui lòng thử lại hoặc liên hệ hỗ trợ")
        });
        throw new Error('No checkout URL received from Stripe');
      }
      
      console.log("✅ Successfully received Stripe checkout URL:", checkoutResponse.url);
      
      // Return successful response with URL and data
      return { 
        success: true, 
        redirect: checkoutResponse.url,
        data: checkoutResponse,
        sessionId: checkoutResponse.session_id
      };
    } catch (error: any) {
      console.error('❌ Job payment initiation error:', error);
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

  return { initiateJobPayment, isLoading };
};
