
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "../salonFormSchema";
import { SalonPricingOptions, getSalonPostPricingSummary } from "@/utils/posting/salonPricing";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, MapPin, DollarSign, Calendar, Image } from "lucide-react";
import StripeCheckout from "@/components/payments/StripeCheckout";

interface SalonReviewStepProps {
  form: UseFormReturn<SalonFormValues>;
  formData: SalonFormValues;
  selectedOptions: SalonPricingOptions;
  photoUploads: File[];
}

export const SalonReviewStep = ({ 
  form, 
  formData, 
  selectedOptions, 
  photoUploads 
}: SalonReviewStepProps) => {
  const pricingSummary = getSalonPostPricingSummary(selectedOptions);

  const handlePaymentSuccess = () => {
    console.log('Payment successful, redirecting to success page');
    window.location.href = '/salon-listing-success';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <CheckCircle className="w-5 h-5 text-purple-600" />
        <h2 className="text-2xl font-playfair font-medium">Review & Payment / Xem Lại & Thanh Toán</h2>
      </div>
      <p className="text-gray-600 mb-6">
        Review your listing details and complete payment / Xem lại chi tiết tin đăng và hoàn tất thanh toán
      </p>

      {/* Listing Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            Listing Summary / Tóm Tắt Tin Đăng
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg">{formData.salonName}</h3>
              <p className="text-gray-600">{formData.businessType}</p>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              {formData.address && <span>{formData.address}, </span>}
              <span>{formData.city}, {formData.state}</span>
            </div>

            {formData.askingPrice && (
              <div className="flex items-center gap-2 text-sm">
                <DollarSign className="w-4 h-4" />
                <span>Asking Price / Giá Yêu Cầu: <strong>${formData.askingPrice}</strong></span>
              </div>
            )}

            {formData.monthlyRent && (
              <div className="flex items-center gap-2 text-sm">
                <DollarSign className="w-4 h-4" />
                <span>Monthly Rent / Tiền Thuê: <strong>${formData.monthlyRent}</strong></span>
              </div>
            )}

            {formData.establishedYear && (
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4" />
                <span>Established / Thành Lập: <strong>{formData.establishedYear}</strong></span>
              </div>
            )}

            <div className="flex items-center gap-2 text-sm">
              <Image className="w-4 h-4" />
              <span>{photoUploads.length} photos uploaded / {photoUploads.length} hình ảnh đã tải lên</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Plan Details */}
      <Card>
        <CardHeader>
          <CardTitle>Selected Plan / Gói Đã Chọn</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">
                  {selectedOptions.selectedPricingTier === 'basic' ? 'Basic Listing' : 'Featured Listing'}
                </h3>
                <p className="text-sm text-gray-600">
                  {selectedOptions.durationMonths} month{selectedOptions.durationMonths > 1 ? 's' : ''} duration
                </p>
              </div>
              {selectedOptions.selectedPricingTier === 'featured' && (
                <Badge variant="outline" className="text-purple-600">
                  Featured / Nổi Bật
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pricing Summary with FOMO/Scarcity */}
      <Card className="border-purple-200 bg-purple-50">
        <CardHeader>
          <CardTitle className="text-purple-700">
            Payment Summary / Tóm Tắt Thanh Toán
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">
                {selectedOptions.selectedPricingTier === 'basic' ? 'Basic Listing' : 'Featured Listing'} 
                ({selectedOptions.durationMonths} month{selectedOptions.durationMonths > 1 ? 's' : ''})
              </span>
              <div className="text-right">
                <div className="text-lg font-bold text-purple-600">
                  ${pricingSummary.finalPrice.toFixed(2)}
                </div>
                <div className="text-sm">
                  <span className="line-through text-gray-500">${pricingSummary.originalPrice.toFixed(2)}</span>
                  <Badge variant="outline" className="ml-2 text-green-600 border-green-600">
                    Save {pricingSummary.savingsPercentage}%
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <div className="flex justify-between items-center text-xl font-bold">
                <span>Total Amount / Tổng Số Tiền:</span>
                <span className="text-purple-600">${pricingSummary.finalPrice.toFixed(2)}</span>
              </div>
              <p className="text-sm text-green-600 text-right mt-1">
                You save ${pricingSummary.savingsAmount.toFixed(2)} with this plan! / 
                Bạn tiết kiệm ${pricingSummary.savingsAmount.toFixed(2)} với gói này!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Terms and Conditions */}
      <FormField
        control={form.control}
        name="termsAccepted"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <FormLabel className="text-sm leading-5">
              I agree to the Terms of Service and Privacy Policy / 
              Tôi đồng ý với Điều khoản Dịch vụ và Chính sách Bảo mật *
            </FormLabel>
          </FormItem>
        )}
      />

      {/* Payment Button */}
      <div className="pt-4">
        <StripeCheckout
          amount={Math.round(pricingSummary.finalPrice * 100)} // Convert to cents
          productName={`Salon Listing - ${selectedOptions.selectedPricingTier === 'basic' ? 'Basic' : 'Featured'}`}
          buttonText="Pay Now & Publish Listing / Thanh Toán & Đăng Tin"
          onSuccess={handlePaymentSuccess}
          pricingOptions={selectedOptions}
          formData={formData}
        />
      </div>

      <div className="text-xs text-gray-500 text-center">
        Secure payment powered by Stripe / Thanh toán an toàn được hỗ trợ bởi Stripe
      </div>
    </div>
  );
};
