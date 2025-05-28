
import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { SalonFormValues } from "../salonFormSchema";
import { SalonPricingOptions } from "@/utils/posting/salonPricing";
import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import StripeCheckout from "@/components/payments/StripeCheckout";
import { CheckCircle } from "lucide-react";

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
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  const getPrice = (months: number, isFeatured: boolean = false) => {
    const basePrices = { 1: 19.99, 3: 49.99, 6: 99.99, 12: 149.99 };
    const originalPrices = { 1: 29.99, 3: 89.97, 6: 179.94, 12: 359.88 };
    
    const basePrice = basePrices[months as keyof typeof basePrices];
    const originalPrice = originalPrices[months as keyof typeof originalPrices];
    const finalPrice = isFeatured ? basePrice + 10 : basePrice;
    const finalOriginalPrice = isFeatured ? originalPrice + 10 : originalPrice;
    
    return { finalPrice, originalPrice: finalOriginalPrice };
  };

  const isFeatured = selectedOptions.selectedPricingTier === 'featured';
  const { finalPrice, originalPrice } = getPrice(selectedOptions.durationMonths, isFeatured);

  const handlePaymentSuccess = () => {
    setPaymentCompleted(true);
    // Redirect to success page after payment
    window.location.href = '/salon-listing-success';
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-playfair font-medium">Review & Payment / Xem Lại & Thanh Toán</h2>
        <p className="text-gray-600 mt-2">
          Review your salon listing and complete payment to publish / Xem lại tin đăng và thanh toán để xuất bản
        </p>
      </div>

      {/* Salon Information Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Salon Information / Thông Tin Salon</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg">{formData.salonName}</h3>
            <p className="text-gray-600">{formData.businessType}</p>
          </div>
          <div className="text-sm text-gray-600">
            <p>{formData.address}, {formData.city}, {formData.state}</p>
            {formData.askingPrice && <p>Asking Price: ${formData.askingPrice}</p>}
            {formData.monthlyRent && <p>Monthly Rent: ${formData.monthlyRent}</p>}
          </div>
          <div className="flex gap-2 flex-wrap">
            <Badge variant="outline">{photoUploads.length} photos uploaded</Badge>
            {formData.hasParking && <Badge variant="outline">Parking</Badge>}
            {formData.hasLaundry && <Badge variant="outline">Laundry</Badge>}
            {formData.hasWaxRoom && <Badge variant="outline">Wax Room</Badge>}
            {formData.willTrain && <Badge variant="outline">Will Train</Badge>}
          </div>
        </CardContent>
      </Card>

      {/* Pricing Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Selected Plan / Gói Đã Chọn</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-medium">
                {selectedOptions.durationMonths} month{selectedOptions.durationMonths > 1 ? 's' : ''} listing
              </span>
              <div className="text-right">
                <span className="font-bold text-lg">${finalPrice.toFixed(2)}</span>
                <div className="text-sm text-gray-500 line-through">
                  ${originalPrice.toFixed(2)}
                </div>
              </div>
            </div>
            {isFeatured && (
              <div className="flex justify-between items-center text-sm">
                <span className="text-purple-600">✨ Featured listing upgrade</span>
                <span className="text-purple-600">+$10.00</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Terms Acceptance */}
      <Card>
        <CardContent className="pt-6">
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
                <div className="space-y-1 leading-none">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    I agree to the Terms of Service and Privacy Policy
                  </label>
                  <p className="text-xs text-muted-foreground">
                    Tôi đồng ý với Điều khoản Dịch vụ và Chính sách Bảo mật
                  </p>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      {/* Payment Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {paymentCompleted ? (
              <>
                <CheckCircle className="w-5 h-5 text-green-600" />
                Payment Completed / Đã Thanh Toán
              </>
            ) : (
              "Complete Payment / Hoàn Tất Thanh Toán"
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {paymentCompleted ? (
            <div className="text-center py-4">
              <p className="text-green-600 font-medium">
                ✅ Payment successful! Your listing is being published.
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Thanh toán thành công! Tin đăng của bạn đang được xuất bản.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  <strong>Payment Required:</strong> Your salon listing will only be published after successful payment.
                </p>
                <p className="text-sm text-yellow-700 mt-1">
                  <strong>Yêu cầu thanh toán:</strong> Tin đăng salon chỉ được xuất bản sau khi thanh toán thành công.
                </p>
              </div>
              
              <StripeCheckout
                amount={Math.round(finalPrice * 100)} // Convert to cents
                productName={`${selectedOptions.durationMonths}-month salon listing${isFeatured ? ' (Featured)' : ''}`}
                buttonText={`Pay $${finalPrice.toFixed(2)} & Publish / Thanh toán $${finalPrice.toFixed(2)} & Xuất bản`}
                onSuccess={handlePaymentSuccess}
                pricingOptions={selectedOptions}
                formData={formData}
                disabled={!formData.termsAccepted}
              />
              
              {!formData.termsAccepted && (
                <p className="text-sm text-red-600 text-center">
                  Please accept the terms and conditions to proceed with payment.
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
