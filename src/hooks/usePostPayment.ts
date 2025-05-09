
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from "sonner";
import { useTranslation } from '@/hooks/useTranslation';
import { JobDetailsSubmission, PricingOptions } from '@/types/job';

export const usePostPayment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const initiatePayment = async (postType: 'job' | 'salon', postDetails?: any, pricingOptions?: PricingOptions) => {
    setIsLoading(true);
    console.log("🔍 Payment initiation started for:", postType, "with options:", pricingOptions);
    
    try {
      console.log("Initiating payment for:", postType, "with pricing:", pricingOptions?.selectedPricingTier);

      // Handle free listings directly without going to Stripe
      if (pricingOptions?.selectedPricingTier === 'free') {
        console.log("Processing free post...");
        // Create the post directly in the database
        const { data: postData, error: postError } = await supabase.functions.invoke('create-free-post', {
          body: { 
            postType,
            postDetails,
            pricingOptions
          }
        });

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
        
        // Return success with redirect info
        return { 
          success: true,
          redirect: `/post-success?payment_log_id=${postData?.payment_log_id}&free=true`,
          data: postData
        };
      } 
      
      // For paid listings, create a Stripe checkout session
      console.log("Creating Stripe checkout for paid listing...");
      
      // Before calling the function
      console.log("🚀 Calling create-checkout with data:", { postType, postDetails, pricingOptions });
      
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { 
          postType,
          postDetails,
          pricingOptions
        }
      });

      console.log("📥 Response from create-checkout:", data, "Error:", error);

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
      
      // Check for the URL and redirect if it exists
      if (data?.url) {
        console.log("✅ Redirecting to Stripe checkout URL:", data.url);
        
        // Log just before redirect
        console.log("🔄 About to redirect to Stripe...");
        
        // Use timeout to ensure logs are visible and give toast a chance to show
        setTimeout(() => {
          window.location.href = data.url;
        }, 100);
        
        // Also return success with redirect URL for component handling
        return { 
          success: true, 
          redirect: data.url,
          data: data
        };
      } else {
        console.error("⛔ No checkout URL received in response:", data);
        toast.error(t("Missing payment URL", "URL thanh toán bị thiếu"), {
          description: t("Please try again or contact support", "Vui lòng thử lại hoặc liên hệ hỗ trợ")
        });
        throw new Error('No checkout URL received from Stripe');
      }
    } catch (error: any) {
      console.error('❌ Payment initiation error:', error);
      toast.error(t("Failed to initiate payment", "Không thể khởi tạo thanh toán"), {
        description: error.message || t("Please try again.", "Vui lòng thử lại.")
      });
      return { 
        success: false,
        redirect: null,
        error: error.message,
        data: null
      };
    } finally {
      setIsLoading(false);
    }
  };

  return { initiatePayment, isLoading };
};
