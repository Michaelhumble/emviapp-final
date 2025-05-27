
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, CreditCard, AlertCircle } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "../salonFormSchema";
import { SalonPricingOptions, getSalonPostPricingSummary } from "@/utils/posting/salonPricing";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface SalonReviewStepProps {
  form: UseFormReturn<SalonFormValues>;
  formData: SalonFormValues;
  selectedOptions: SalonPricingOptions;
  photoUploads: File[];
  onPayment: () => void;
}

export const SalonReviewStep = ({ 
  form, 
  formData, 
  selectedOptions, 
  photoUploads, 
  onPayment 
}: SalonReviewStepProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  const pricingSummary = getSalonPostPricingSummary(selectedOptions);
  
  const handleStripeCheckout = async () => {
    if (!termsAccepted) {
      toast.error("Please accept the terms and conditions to proceed");
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Create Stripe checkout session
      const { data, error } = await supabase.functions.invoke('create-salon-checkout', {
        body: {
          tier: selectedOptions.selectedPricingTier,
          durationMonths: selectedOptions.durationMonths,
          autoRenew: selectedOptions.autoRenew,
          finalPrice: pricingSummary.finalPrice,
          salonData: {
            salonName: formData.salonName,
            city: formData.city,
            state: formData.state,
            askingPrice: formData.askingPrice
          }
        }
      });

      if (error) {
        console.error('Stripe checkout error:', error);
        toast.error("Payment setup failed. Please try again.");
        return;
      }

      if (data?.url) {
        // Open Stripe checkout in new tab
        window.open(data.url, '_blank');
        toast.success("Redirecting to secure payment...");
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const getPlanDisplayName = () => {
    const tier = selectedOptions.selectedPricingTier;
    const duration = selectedOptions.durationMonths;
    
    if (tier === 'basic') return `Basic Listing - ${duration} month${duration > 1 ? 's' : ''}`;
    if (tier === 'standard') return `Standard Listing - ${duration} month${duration > 1 ? 's' : ''}`;
    if (tier === 'featured') return `Featured Listing - ${duration} month${duration > 1 ? 's' : ''}`;
    return `Listing - ${duration} month${duration > 1 ? 's' : ''}`;
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-playfair font-medium">
          Xem Lại & Thanh Toán / Review & Payment
        </h2>
        <p className="text-gray-600 mt-2">
          Xem lại thông tin và hoàn tất thanh toán / Review information and complete payment
        </p>
      </div>

      {/* Salon Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            Thông Tin Salon / Salon Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-lg">{formData.salonName}</h3>
              <p className="text-gray-600">{formData.city}, {formData.state}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Giá bán / Asking Price:</span>
                <p className="font-medium">${formData.askingPrice}</p>
              </div>
              <div>
                <span className="text-gray-500">Tiền thuê / Monthly Rent:</span>
                <p className="font-medium">${formData.monthlyRent}</p>
              </div>
              <div>
                <span className="text-gray-500">Số bàn / Tables:</span>
                <p className="font-medium">{formData.numberOfTables || 'N/A'}</p>
              </div>
              <div>
                <span className="text-gray-500">Số ghế / Chairs:</span>
                <p className="font-medium">{formData.numberOfChairs || 'N/A'}</p>
              </div>
            </div>
            <div>
              <span className="text-gray-500">Số ảnh / Photos:</span>
              <p className="font-medium">{photoUploads.length} uploaded</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pricing Plan Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-purple-500" />
            Gói Đăng Tin / Listing Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{getPlanDisplayName()}</h3>
                <p className="text-sm text-gray-600">
                  Hiệu lực {selectedOptions.durationMonths} tháng / Active for {selectedOptions.durationMonths} month{selectedOptions.durationMonths > 1 ? 's' : ''}
                </p>
              </div>
              <Badge variant="outline" className="text-purple-600">
                ${pricingSummary.finalPrice.toFixed(2)}
              </Badge>
            </div>
            
            {/* Pricing Breakdown */}
            <div className="border-t pt-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Giá gốc / Base price:</span>
                <span>${pricingSummary.subtotal.toFixed(2)}</span>
              </div>
              
              {pricingSummary.durationDiscount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Giảm giá thời hạn / Duration discount:</span>
                  <span>-${pricingSummary.durationDiscount.toFixed(2)}</span>
                </div>
              )}
              
              {pricingSummary.autoRenewDiscount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Giảm giá tự động gia hạn / Auto-renew discount:</span>
                  <span>-${pricingSummary.autoRenewDiscount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="flex justify-between font-semibold text-lg border-t pt-2">
                <span>Tổng cộng / Total:</span>
                <span>${pricingSummary.finalPrice.toFixed(2)}</span>
              </div>
            </div>

            {selectedOptions.autoRenew && (
              <div className="bg-blue-50 p-3 rounded-md text-sm text-blue-800">
                <p>
                  ✓ Tự động gia hạn đã bật / Auto-renew enabled - 
                  Gói của bạn sẽ tự động gia hạn mỗi {selectedOptions.durationMonths} tháng. 
                  Bạn có thể hủy bất cứ lúc nào. / 
                  Your plan will automatically renew every {selectedOptions.durationMonths} month{selectedOptions.durationMonths > 1 ? 's' : ''}. 
                  You can cancel anytime.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Terms and Payment */}
      <Card className="border-purple-200 bg-purple-50">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Checkbox 
                id="terms" 
                checked={termsAccepted}
                onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
              />
              <label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                Tôi đồng ý với các điều khoản và điều kiện, chính sách bảo mật, và xác nhận rằng 
                tất cả thông tin đã cung cấp là chính xác. / 
                I agree to the terms and conditions, privacy policy, and confirm that all 
                information provided is accurate.
              </label>
            </div>
            
            <Button 
              onClick={handleStripeCheckout}
              disabled={!termsAccepted || isProcessing}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-lg font-semibold"
              size="lg"
            >
              {isProcessing ? (
                <>
                  <AlertCircle className="w-5 h-5 mr-2 animate-spin" />
                  Đang xử lý / Processing...
                </>
              ) : (
                <>
                  <CreditCard className="w-5 h-5 mr-2" />
                  Thanh toán ${pricingSummary.finalPrice.toFixed(2)} / Pay ${pricingSummary.finalPrice.toFixed(2)}
                </>
              )}
            </Button>
            
            <div className="text-xs text-gray-600 text-center">
              Thanh toán an toàn qua Stripe. Tin đăng sẽ được kích hoạt ngay sau khi thanh toán thành công. /
              Secure payment via Stripe. Listing will be activated immediately after successful payment.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
