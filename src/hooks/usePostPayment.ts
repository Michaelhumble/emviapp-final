
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from "sonner";
import { useTranslation } from '@/hooks/useTranslation';
import { JobDetailsSubmission } from '@/types/job';
import { PricingOptions } from '@/utils/posting/types';
import { getJobPrice } from '@/utils/posting/jobPricing';

export const usePostPayment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const initiatePayment = async (
    postType: 'job' | 'salon', 
    postDetails?: any, 
    pricingOptions?: PricingOptions,
    exactUiPrice?: number // Add parameter for exact UI price
  ) => {
    setIsLoading(true);
    try {
      console.log("Initiating payment for:", postType, "with pricing:", pricingOptions);

      // Ensure pricing options exist
      if (!pricingOptions) {
        throw new Error("Missing pricing options");
      }

      // Calculate price using our centralized pricing function
      const priceData = getJobPrice(pricingOptions);
      console.log("Calculated price:", priceData);

      // If exactUiPrice is provided, validate it matches the calculated price
      if (exactUiPrice !== undefined && Math.abs(priceData.finalPrice - exactUiPrice) > 0.01) {
        console.error("Price mismatch detected!", {
          calculatedPrice: priceData.finalPrice,
          uiPrice: exactUiPrice
        });
        throw new Error("UI price doesn't match calculated price. Please try again.");
      }

      // Use the exact UI price if provided, otherwise use calculated price
      const finalPriceToCharge = exactUiPrice !== undefined ? exactUiPrice : priceData.finalPrice;
      console.log("Final price to charge:", finalPriceToCharge);

      // Validate pricing options
      if (!pricingOptions.selectedPricingTier) {
        throw new Error("Invalid pricing options: Missing tier");
      }

      // Check for the $0.00 bug - Only allow $0 for free tier
      if (finalPriceToCharge <= 0 && pricingOptions.selectedPricingTier !== 'free') {
        throw new Error("Invalid price: Non-free plan cannot have $0 price");
      }

      // Handle Diamond tier special logic
      if (pricingOptions.selectedPricingTier === 'diamond') {
        // Check if user is on the waitlist or has an invite
        const { data: userStatus, error: statusError } = await supabase
          .from('user_privileges')
          .select('is_diamond_invited, on_diamond_waitlist')
          .single();
        
        if (statusError) {
          console.error("Error checking user diamond status:", statusError);
        } else if (userStatus) {
          console.log("Diamond status check:", userStatus);
          
          // If invited or on waitlist, bypass payment
          if (userStatus.is_diamond_invited || userStatus.on_diamond_waitlist) {
            console.log("Diamond user is invited or on waitlist, bypassing payment");
            // Create the post directly in the database
            const { data: postData, error: postError } = await supabase.functions.invoke('create-free-post', {
              body: { 
                postType,
                postDetails,
                pricingOptions,
                isDiamondBypass: true
              }
            });

            if (postError) {
              console.error("Diamond post creation error:", postError);
              throw postError;
            }

            toast.success(
              t({
                english: "Your Diamond post has been submitted",
                vietnamese: "Bài đăng Diamond của bạn đã được gửi"
              }), {
              description: t({
                english: "You can view it in your dashboard now",
                vietnamese: "Bạn có thể xem nó trong bảng điều khiển của bạn ngay bây giờ"
              })
            });
            
            // Redirect to success page
            window.location.href = `/post-success?payment_log_id=${postData?.payment_log_id}&diamond=true`;
            return { success: true };
          }
        }
      }

      // Handle free listings directly without going to Stripe
      if (pricingOptions.selectedPricingTier === 'free' || finalPriceToCharge <= 0) {
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
        finalPrice: finalPriceToCharge
      });
      
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { 
          postType,
          postDetails,
          pricingOptions,
          exactUiPrice: finalPriceToCharge, // Send exact UI price to backend
          priceData: {
            ...priceData,
            finalPrice: finalPriceToCharge // Override calculated price with UI price
          }
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
