
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from "sonner";
import { useTranslation } from '@/hooks/useTranslation';
import { PricingOptions } from '@/types/job';

interface PaymentResponse {
  success: boolean;
  redirect: string | null;
  error?: string;
  data: any;
  isFree?: boolean;
}

export const useSalonPayment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const calculateStripePriceAmount = (
    basePrice: number, 
    duration: number, 
    discountPercentage: number
  ): number => {
    // Convert price to cents and apply discount
    const discountMultiplier = (100 - discountPercentage) / 100;
    const finalPrice = basePrice * duration * discountMultiplier;
    
    // Round to 2 decimal places and convert to cents (Stripe uses cents)
    return Math.round(finalPrice * 100);
  };

  const getDiscountPercentage = (
    durationMonths: number,
    isAutoRenew: boolean
  ): number => {
    let discount = 0;
    
    // Duration-based discounts
    if (durationMonths === 3) discount = 10;
    else if (durationMonths === 6) discount = 20;
    else if (durationMonths === 12) discount = 30;
    
    // Add auto-renew discount
    if (isAutoRenew) discount += 5;
    
    return discount;
  };

  const initiatePayment = async (
    salonDetails: any, 
    pricingOptions: PricingOptions
  ): Promise<PaymentResponse> => {
    setIsLoading(true);
    console.log("🔍 Starting salon payment process with options:", pricingOptions);
    
    try {
      // Get important values from pricingOptions
      const { 
        selectedPricingTier, 
        durationMonths = 1, 
        autoRenew = false 
      } = pricingOptions;
      
      // Early return for free listings
      if (selectedPricingTier === 'free') {
        console.log("Processing free salon post...");
        
        const { data: postData, error: postError } = await supabase.functions.invoke('create-free-post', {
          body: { 
            postType: 'salon',
            postDetails: salonDetails,
            pricingOptions
          }
        });

        if (postError) {
          console.error("Free post creation error:", postError);
          toast.error(
            t("Error creating free post", "Lỗi khi tạo bài đăng miễn phí"), 
            { description: postError.message || t("Please try again", "Vui lòng thử lại") }
          );
          setIsLoading(false);
          return { 
            success: false,
            redirect: null,
            error: postError.message,
            data: null
          };
        }

        toast.success(
          t("Your free salon listing has been submitted", "Tin miễn phí của bạn đã được đăng"), 
          { description: t("You can view it in your dashboard now", "Bạn có thể xem nó trong bảng điều khiển của bạn ngay bây giờ") }
        );
        
        setIsLoading(false);
        return { 
          success: true,
          redirect: `/post-success?payment_log_id=${postData?.payment_log_id}&free=true`,
          data: postData,
          isFree: true
        };
      }
      
      console.log("Creating Stripe checkout for paid salon listing...");
      
      // Determine base pricing and calculate final amount
      let basePrice = 0;
      const mode = autoRenew ? 'subscription' : 'payment';
      
      // Map pricing tiers to their base prices (in dollars)
      switch (selectedPricingTier) {
        case 'standard': 
          basePrice = 29.99;
          break;
        case 'featured':
          basePrice = 59.99;
          break;
        case 'premium':
          basePrice = 99.99;
          break;
        default:
          basePrice = 29.99; // Default to standard if unknown tier
      }
      
      // Calculate discount percentage based on duration
      const discountPercentage = getDiscountPercentage(durationMonths, autoRenew);
      
      // For one-time payments, calculate full amount including duration
      const amountInCents = mode === 'payment'
        ? calculateStripePriceAmount(basePrice, durationMonths, discountPercentage)
        : calculateStripePriceAmount(basePrice / 12, 1, 0); // For subscription, use monthly price
      
      console.log(`Salon payment calculation: Base price: $${basePrice}, Duration: ${durationMonths} months, Discount: ${discountPercentage}%, Final: $${amountInCents/100}`);
      
      // Call create-checkout edge function with proper parameters
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { 
          postType: 'salon',
          pricing: {
            tier: selectedPricingTier,
            amountInCents,
            mode,
            durationMonths,
            autoRenew,
            basePrice
          },
          postDetails: salonDetails,
          pricingOptions
        }
      });
      
      console.log("📥 Response from create-checkout:", data, "Error:", error);

      if (error) {
        console.error("Edge function error:", error);
        toast.error(
          t("Payment service error", "Lỗi dịch vụ thanh toán"), 
          { description: error.message || t("Could not connect to payment provider", "Không thể kết nối với nhà cung cấp dịch vụ thanh toán") }
        );
        setIsLoading(false);
        return { 
          success: false,
          redirect: null,
          error: error.message,
          data: null
        };
      }
      
      if (!data) {
        const errorMsg = "No data returned from payment service";
        console.error(errorMsg);
        toast.error(
          t("Invalid response from payment service", "Phản hồi không hợp lệ từ dịch vụ thanh toán")
        );
        setIsLoading(false);
        return { 
          success: false,
          redirect: null,
          error: errorMsg,
          data: null
        };
      }
      
      // Check for URL and redirect if available
      if (data?.url) {
        console.log("✅ Redirecting to Stripe checkout URL:", data.url);
        setIsLoading(false);
        
        // Redirect with slight delay to ensure logs are visible and toast shows
        setTimeout(() => {
          window.location.href = data.url;
        }, 100);
        
        return { 
          success: true, 
          redirect: data.url,
          data: data
        };
      } else {
        const errorMsg = "No checkout URL received in response";
        console.error("⛔", errorMsg, data);
        toast.error(
          t("Missing payment URL", "URL thanh toán bị thiếu"), 
          { description: t("Please try again or contact support", "Vui lòng thử lại hoặc liên hệ hỗ trợ") }
        );
        setIsLoading(false);
        return { 
          success: false,
          redirect: null,
          error: errorMsg,
          data
        };
      }
    } catch (error: any) {
      console.error('❌ Salon payment initiation error:', error);
      toast.error(
        t("Failed to initiate payment", "Không thể khởi tạo thanh toán"), 
        { description: error.message || t("Please try again.", "Vui lòng thử lại.") }
      );
      setIsLoading(false);
      return { 
        success: false,
        redirect: null,
        error: error.message,
        data: null
      };
    }
  };

  return { initiatePayment, isLoading };
};
