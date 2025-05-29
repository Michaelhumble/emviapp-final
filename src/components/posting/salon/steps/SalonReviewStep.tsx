
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "../salonFormSchema";
import { SalonPricingOptions, getSalonPostPricingSummary } from "@/utils/posting/salonPricing";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, MapPin, DollarSign, Camera } from "lucide-react";
import { useStripe } from "@/hooks/useStripe";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

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
  const pricing = getSalonPostPricingSummary(selectedOptions);
  const { isLoading, initiatePayment } = useStripe();
  
  const handlePaymentClick = async () => {
    try {
      const success = await initiatePayment(selectedOptions, formData);
      if (success) {
        onPayment();
      }
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <CheckCircle className="w-5 h-5 text-green-600" />
        <h2 className="text-2xl font-playfair font-medium">Review & Payment / Xem Lại & Thanh Toán</h2>
      </div>
      <p className="text-gray-600 mb-6">
        Review your salon listing and complete payment / Xem lại tin đăng salon và hoàn tất thanh toán
      </p>

      {/* Salon Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Salon Listing Summary / Tóm Tắt Tin Đăng Salon</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg">{formData.salonName}</h3>
            <div className="flex items-center gap-2 text-gray-600">
              <span>{formData.beautyIndustry}</span>
              <span>•</span>
              <span>{formData.businessType}</span>
            </div>
            {formData.establishedYear && (
              <p className="text-sm text-gray-500">
                Established / Thành lập: {formData.establishedYear}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>
              {formData.address}, {formData.city}, {formData.state} {formData.zipCode}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-green-600" />
              <div>
                <p className="font-medium">Asking Price / Giá Yêu Cầu</p>
                <p className="text-lg font-semibold text-green-600">${formData.askingPrice}</p>
              </div>
            </div>
            
            {formData.monthlyRent && (
              <div>
                <p className="font-medium">Monthly Rent / Tiền Thuê Hàng Tháng</p>
                <p className="text-gray-600">${formData.monthlyRent}/month</p>
              </div>
            )}
          </div>

          {photoUploads.length > 0 && (
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-blue-600" />
              <span>{photoUploads.length} photo(s) uploaded / {photoUploads.length} ảnh đã tải lên</span>
            </div>
          )}

          {formData.vietnameseDescription && (
            <div>
              <h4 className="font-medium">Description / Mô Tả</h4>
              <p className="text-gray-600 text-sm mt-1">{formData.vietnameseDescription}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pricing Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Pricing Plan / Gói Giá</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold capitalize">
                {selectedOptions.selectedPricingTier} Plan / Gói {selectedOptions.selectedPricingTier}
              </h3>
              <p className="text-sm text-gray-600">
                {selectedOptions.durationMonths} month(s) / {selectedOptions.durationMonths} tháng
              </p>
            </div>
            <Badge variant="outline" className="text-lg px-3 py-1">
              ${pricing.finalPrice}
            </Badge>
          </div>

          {selectedOptions.autoRenew && (
            <div className="flex items-center gap-2 text-sm text-blue-600">
              <CheckCircle className="w-4 h-4" />
              <span>Auto-renewal enabled / Tự động gia hạn được bật</span>
            </div>
          )}

          <div className="border-t pt-4">
            <div className="flex justify-between items-center font-semibold text-lg">
              <span>Total / Tổng Cộng:</span>
              <span className="text-green-600">${pricing.finalPrice}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Section */}
      <Card>
        <CardHeader>
          <CardTitle>Complete Payment / Hoàn Tất Thanh Toán</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            Secure payment powered by Stripe / Thanh toán bảo mật được hỗ trợ bởi Stripe
          </p>
          
          <Button
            onClick={handlePaymentClick}
            disabled={isLoading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing... / Đang xử lý...
              </>
            ) : (
              `Pay $${pricing.finalPrice} & Publish Listing / Thanh Toán $${pricing.finalPrice} & Đăng Tin`
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
