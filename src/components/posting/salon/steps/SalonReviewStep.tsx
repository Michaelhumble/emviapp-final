
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "../salonFormSchema";
import { SalonPricingOptions, getSalonPostPricingSummary } from "@/utils/posting/salonPricing";
import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import StripeCheckout from "@/components/payments/StripeCheckout";
import { CheckCircle, MapPin, DollarSign, Building, Clock, Crown } from "lucide-react";

interface SalonReviewStepProps {
  form: UseFormReturn<SalonFormValues>;
  formData: SalonFormValues;
  selectedOptions: SalonPricingOptions;
  photoUploads: File[];
}

export const SalonReviewStep = ({ form, formData, selectedOptions, photoUploads }: SalonReviewStepProps) => {
  const pricingSummary = getSalonPostPricingSummary(selectedOptions);
  
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 mb-6">
        <CheckCircle className="w-5 h-5 text-green-600" />
        <h2 className="text-2xl font-playfair font-medium">Review & Payment / Xem Lại & Thanh Toán</h2>
      </div>
      <p className="text-gray-600 mb-6">
        Review your listing details and complete payment to publish / Xem lại thông tin và hoàn tất thanh toán để đăng tin
      </p>

      {/* Listing Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="w-5 h-5" />
            Listing Summary / Tóm Tắt Tin Đăng
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold">{formData.salonName || 'Salon Name'}</h3>
            <div className="flex items-center gap-2 text-gray-600 mt-1">
              <MapPin className="w-4 h-4" />
              <span>{formData.city}, {formData.state}</span>
            </div>
          </div>
          
          {formData.askingPrice && (
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-green-600" />
              <span className="font-medium">Asking Price: ${formData.askingPrice}</span>
            </div>
          )}
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Business Type:</span>
              <p className="font-medium">{formData.businessType || 'Not specified'}</p>
            </div>
            {formData.monthlyRent && (
              <div>
                <span className="text-gray-500">Monthly Rent:</span>
                <p className="font-medium">${formData.monthlyRent}</p>
              </div>
            )}
            {formData.squareFeet && (
              <div>
                <span className="text-gray-500">Square Feet:</span>
                <p className="font-medium">{formData.squareFeet}</p>
              </div>
            )}
            <div>
              <span className="text-gray-500">Photos:</span>
              <p className="font-medium">{photoUploads.length} uploaded</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Plan Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Selected Plan / Gói Đã Chọn
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {selectedOptions.selectedPricingTier === 'featured' && (
                <Crown className="w-5 h-5 text-purple-600" />
              )}
              <span className="text-lg font-semibold capitalize">
                {selectedOptions.selectedPricingTier} Listing
              </span>
              {selectedOptions.selectedPricingTier === 'featured' && (
                <Badge className="bg-purple-100 text-purple-700">Featured</Badge>
              )}
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-purple-600">
                ${pricingSummary.finalPrice.toFixed(2)}
              </div>
              <div className="text-sm text-gray-500 line-through">
                ${pricingSummary.originalPrice.toFixed(2)}
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              Duration: {selectedOptions.durationMonths} month{selectedOptions.durationMonths > 1 ? 's' : ''}
            </span>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Save {pricingSummary.savingsPercentage}%! 🔥
            </Badge>
          </div>

          {selectedOptions.autoRenew && (
            <div className="text-sm text-gray-600">
              ✓ Auto-renew enabled
            </div>
          )}
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
                  <Label className="text-sm">
                    I agree to the Terms of Service and Privacy Policy / Tôi đồng ý với Điều khoản Dịch vụ và Chính sách Bảo mật *
                  </Label>
                  <p className="text-xs text-gray-500">
                    By checking this box, you confirm that all information provided is accurate and you agree to our terms.
                  </p>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      {/* Payment Section */}
      <Card className="border-purple-200 bg-purple-50">
        <CardHeader>
          <CardTitle className="text-purple-700">Complete Payment / Hoàn Tất Thanh Toán</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center text-lg">
            <span className="font-medium">Total Amount:</span>
            <span className="font-bold text-purple-600 text-2xl">
              ${pricingSummary.finalPrice.toFixed(2)}
            </span>
          </div>
          
          <div className="text-sm text-gray-600">
            <p>✓ Secure payment powered by Stripe</p>
            <p>✓ Your listing will be live immediately after payment</p>
            <p>✓ 30-day money-back guarantee</p>
          </div>

          <StripeCheckout
            amount={pricingSummary.finalPrice}
            productName={`${selectedOptions.selectedPricingTier} Salon Listing - ${selectedOptions.durationMonths} month${selectedOptions.durationMonths > 1 ? 's' : ''}`}
            buttonText={`Pay $${pricingSummary.finalPrice.toFixed(2)} & Publish Listing`}
            pricingOptions={selectedOptions}
            formData={formData}
            onSuccess={() => {
              // Redirect to success page
              window.location.href = '/salon-listing-success';
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
};
