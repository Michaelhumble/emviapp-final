
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, CreditCard } from "lucide-react";
import { SalonFormValues } from "../salonFormSchema";
import { SalonPricingOptions } from "@/utils/posting/salonPricing";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface SalonReviewStepProps {
  formData: SalonFormValues;
  selectedOptions: SalonPricingOptions;
  onBack: () => void;
}

const SalonReviewStep = ({ formData, selectedOptions, onBack }: SalonReviewStepProps) => {
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const calculateFinalPrice = () => {
    let basePrice = 0;
    
    // Base tier pricing
    switch (selectedOptions.selectedPricingTier) {
      case 'basic':
        basePrice = 99;
        break;
      case 'standard':
        basePrice = 199;
        break;
      case 'featured':
        basePrice = 299;
        break;
      default:
        basePrice = 99;
    }

    // Duration multiplier
    let finalPrice = basePrice * selectedOptions.durationMonths;

    // Add-on features
    if (selectedOptions.isNationwide) finalPrice += 50;
    if (selectedOptions.fastSalePackage) finalPrice += 25;
    if (selectedOptions.featuredBoost) finalPrice += 30;
    if (selectedOptions.showAtTop) finalPrice += 40;

    return finalPrice;
  };

  const getTierDisplayName = () => {
    switch (selectedOptions.selectedPricingTier) {
      case 'basic':
        return 'Basic Salon Listing';
      case 'standard':
        return 'Standard Salon Listing';
      case 'featured':
        return 'Featured Salon Listing';
      default:
        return 'Salon Listing';
    }
  };

  const handlePayment = async () => {
    setIsProcessingPayment(true);

    try {
      const finalPrice = calculateFinalPrice();
      
      const { data, error } = await supabase.functions.invoke('create-salon-checkout', {
        body: {
          tier: selectedOptions.selectedPricingTier,
          durationMonths: selectedOptions.durationMonths,
          autoRenew: selectedOptions.autoRenew,
          finalPrice: finalPrice,
          salonData: {
            salonName: formData.salonName,
            askingPrice: formData.askingPrice,
            city: formData.city,
            state: formData.state,
            address: formData.address
          }
        }
      });

      if (error) {
        console.error('Error creating checkout session:', error);
        toast.error('Lỗi tạo phiên thanh toán / Error creating payment session');
        return;
      }

      if (data?.url) {
        // Open Stripe checkout in new tab
        window.open(data.url, '_blank');
      } else {
        toast.error('Không nhận được URL thanh toán / No payment URL received');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Lỗi xử lý thanh toán / Payment processing error');
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const finalPrice = calculateFinalPrice();

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-playfair font-medium">Xem lại & Thanh toán / Review & Payment</h2>
        <p className="text-gray-600 mt-2">
          Xem lại thông tin và hoàn tất thanh toán / Review your information and complete payment
        </p>
      </div>

      {/* Salon Information Review */}
      <Card>
        <CardHeader>
          <CardTitle>Thông tin Salon / Salon Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <span className="font-medium">Tên Salon / Salon Name:</span>
            <span className="ml-2">{formData.salonName || 'N/A'}</span>
          </div>
          <div>
            <span className="font-medium">Giá yêu cầu / Asking Price:</span>
            <span className="ml-2">${formData.askingPrice || 'N/A'}</span>
          </div>
          <div>
            <span className="font-medium">Địa chỉ / Location:</span>
            <span className="ml-2">{formData.address || 'N/A'}, {formData.city || 'N/A'}, {formData.state || 'N/A'}</span>
          </div>
        </CardContent>
      </Card>

      {/* Pricing Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Tóm tắt giá / Pricing Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span>{getTierDisplayName()}</span>
            <span>${selectedOptions.selectedPricingTier === 'basic' ? 99 : selectedOptions.selectedPricingTier === 'standard' ? 199 : 299}</span>
          </div>
          <div className="flex justify-between">
            <span>Thời hạn / Duration: {selectedOptions.durationMonths} tháng</span>
            <span>x{selectedOptions.durationMonths}</span>
          </div>
          {selectedOptions.isNationwide && (
            <div className="flex justify-between">
              <span>Toàn quốc / Nationwide</span>
              <span>+$50</span>
            </div>
          )}
          {selectedOptions.fastSalePackage && (
            <div className="flex justify-between">
              <span>Gói bán nhanh / Fast Sale Package</span>
              <span>+$25</span>
            </div>
          )}
          {selectedOptions.featuredBoost && (
            <div className="flex justify-between">
              <span>Tăng cường nổi bật / Featured Boost</span>
              <span>+$30</span>
            </div>
          )}
          {selectedOptions.showAtTop && (
            <div className="flex justify-between">
              <span>Hiển thị trên đầu / Show at Top</span>
              <span>+$40</span>
            </div>
          )}
          <hr className="my-3" />
          <div className="flex justify-between font-bold text-lg">
            <span>Tổng cộng / Total</span>
            <span>${finalPrice}</span>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between pt-6">
        <Button type="button" variant="outline" onClick={onBack} disabled={isProcessingPayment}>
          Quay lại / Back
        </Button>
        <Button 
          type="button" 
          onClick={handlePayment}
          disabled={isProcessingPayment}
          className="bg-purple-600 hover:bg-purple-700"
        >
          {isProcessingPayment ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Đang xử lý / Processing
            </>
          ) : (
            <>
              <CreditCard className="w-4 h-4 mr-2" />
              Thanh toán với Stripe / Pay with Stripe
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default SalonReviewStep;
