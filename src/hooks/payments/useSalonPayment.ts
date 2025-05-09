
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from "sonner";
import { PricingOptions } from '@/types/job';
import { useTranslation } from '@/hooks/useTranslation';
import { StripeCheckoutResponse } from '@/types/pricing';

export const useSalonPayment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const initiateSalonPayment = async (
    salonDetails: any, // Type as needed
    pricingOptions?: PricingOptions
  ) => {
    setIsLoading(true);
    console.log("🔍 Salon payment initiation started with options:", pricingOptions);
    
    try {
      // Handle free listings directly without going to Stripe
      if (pricingOptions?.selectedPricingTier === 'free') {
        console.log("Processing free salon post...");
        
        const { data: postData, error: postError } = await supabase.functions.invoke('create-free-post', {
          body: { 
            postType: 'salon',
            postDetails: salonDetails,
            pricingOptions
          }
        });

        console.log("Free salon post response:", postData, "Error:", postError);

        if (postError) {
          console.error("Free salon post creation error:", postError);
          toast.error(t("Error creating free salon post", "Lỗi khi tạo bài đăng salon miễn phí"), {
            description: postError.message || t("Please try again", "Vui lòng thử lại")
          });
          throw postError;
        }

        toast.success(
          t("Your free salon post has been submitted", "Tin salon miễn phí của bạn đã được đăng"), {
          description: t("You can view it in your dashboard now", "Bạn có thể xem nó trong bảng điều khiển của bạn ngay bây giờ")
        });
        
        return { 
          success: true,
          redirect: `/post-success?payment_log_id=${postData?.payment_log_id}&free=true`,
          data: postData
        };
      } 
      
      // For paid listings, create a Stripe checkout session
      console.log("Creating Stripe checkout for paid salon listing...");

      // Create the request payload
      const payload = {
        postType: 'salon',
        postDetails: salonDetails,
        pricingOptions
      };
      
      console.log("🚀 Calling create-checkout with payload:", JSON.stringify(payload, null, 2));
      
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: payload
      });

      console.log("📥 Stripe checkout raw response:", data);
      
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
      
      console.log("📥 Full checkout response data:", JSON.stringify(data, null, 2));
      
      // Explicitly validate the URL
      if (!data.url) {
        console.error("⛔ No checkout URL received in response:", data);
        toast.error(t("Missing payment URL", "URL thanh toán bị thiếu"), {
          description: t("Please try again or contact support", "Vui lòng thử lại hoặc liên hệ hỗ trợ")
        });
        throw new Error('No checkout URL received from Stripe');
      }
      
      console.log("✅ Successfully received Stripe checkout URL:", data.url);
      
      // Return successful response with URL and data
      return { 
        success: true, 
        redirect: data.url,
        data: data,
        sessionId: data.session_id
      };
    } catch (error: any) {
      console.error('❌ Salon payment initiation error:', error);
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

  return { initiateSalonPayment, isLoading };
};
