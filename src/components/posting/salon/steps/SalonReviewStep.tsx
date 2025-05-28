
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, CreditCard, Shield, Building2, MapPin, Calendar, DollarSign } from "lucide-react";
import { SalonFormValues } from "../salonFormSchema";
import { SalonPricingOptions, getSalonPostPricingSummary, DURATION_OPTIONS } from "@/utils/posting/salonPricing";
import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import StripeCheckout from "@/components/payments/StripeCheckout";

interface SalonReviewStepProps {
  form: UseFormReturn<SalonFormValues>;
  formData: SalonFormValues;
  selectedOptions: SalonPricingOptions;
  photoUploads: File[];
}

export const SalonReviewStep = ({ form, formData, selectedOptions, photoUploads }: SalonReviewStepProps) => {
  const pricingSummary = getSalonPostPricingSummary(selectedOptions);
  const durationOption = DURATION_OPTIONS.find(opt => opt.months === selectedOptions.durationMonths);
  
  const handlePaymentSuccess = () => {
    console.log("Payment successful, listing will be published");
    // The useStripe hook handles the redirect to success page
  };

  const canProceed = () => {
    return (
      formData.salonName &&
      formData.businessType &&
      formData.address &&
      formData.city &&
      formData.state &&
      photoUploads.length > 0 &&
      formData.termsAccepted
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <CreditCard className="w-5 h-5 text-purple-600" />
        <h2 className="text-2xl font-playfair font-medium">Review & Payment / Xem Lại & Thanh Toán</h2>
      </div>
      <p className="text-gray-600 mb-6">
        Review your listing details and complete payment to publish / Xem lại chi tiết tin đăng và thanh toán để đăng tin
      </p>

      {/* Listing Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-purple-500" />
            Listing Summary / Tóm Tắt Tin Đăng
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-lg">{formData.salonName}</h3>
                <p className="text-purple-600 font-medium">{formData.businessType}</p>
              </div>
              
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{formData.address}, {formData.city}, {formData.state}</span>
              </div>

              {formData.establishedYear && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Established {formData.establishedYear}</span>
                </div>
              )}

              <div className="flex items-center gap-2 text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>{photoUploads.length} photo{photoUploads.length !== 1 ? 's' : ''} uploaded</span>
              </div>
            </div>

            <div className="space-y-3">
              {formData.askingPrice && (
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span className="font-semibold">Asking Price: ${formData.askingPrice}</span>
                </div>
              )}
              
              {formData.monthlyRent && (
                <p className="text-gray-600">Monthly Rent: ${formData.monthlyRent}</p>
              )}

              {formData.numberOfStaff && (
                <p className="text-gray-600">Staff: {formData.numberOfStaff}</p>
              )}

              {formData.squareFeet && (
                <p className="text-gray-600">Size: {formData.squareFeet} sq ft</p>
              )}
            </div>
          </div>

          {(formData.vietnameseDescription || formData.englishDescription) && (
            <div className="mt-4 pt-4 border-t">
              <h4 className="font-medium mb-2">Description:</h4>
              {formData.vietnameseDescription && (
                <p className="text-sm text-gray-600 mb-2">{formData.vietnameseDescription}</p>
              )}
              {formData.englishDescription && (
                <p className="text-sm text-gray-600">{formData.englishDescription}</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Plan Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-purple-500" />
            Selected Plan / Gói Đã Chọn
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">
                  {selectedOptions.selectedPricingTier === 'featured' ? 'Featured ' : ''}
                  {durationOption?.label || `${selectedOptions.durationMonths} month${selectedOptions.durationMonths > 1 ? 's' : ''}`}
                </h3>
                <p className="text-sm text-gray-600">
                  Active for {selectedOptions.durationMonths} month{selectedOptions.durationMonths > 1 ? 's' : ''}
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-purple-600">
                  ${pricingSummary.finalPrice.toFixed(2)}
                </div>
                <div className="text-sm text-gray-500 line-through">
                  ${pricingSummary.originalPrice.toFixed(2)}
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800 mt-1">
                  Save {pricingSummary.savingsPercentage}%!
                </Badge>
              </div>
            </div>
            
            {selectedOptions.selectedPricingTier === 'featured' && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <div className="flex items-center text-sm text-yellow-800">
                  <CheckCircle className="h-4 w-4 text-yellow-600 mr-2" />
                  Featured listing with priority placement (+$10)
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Terms and Payment */}
      <Card className="border-purple-200 bg-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-700">
            <Shield className="h-5 w-5" />
            Terms & Payment / Điều Khoản & Thanh Toán
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            control={form.control}
            name="termsAccepted"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-start space-x-2">
                  <FormControl>
                    <Checkbox 
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      id="terms"
                    />
                  </FormControl>
                  <label htmlFor="terms" className="text-sm cursor-pointer leading-relaxed">
                    I agree to the Terms of Service and Privacy Policy. I confirm that all information provided is accurate and I have the right to sell this business.
                    <br />
                    <span className="text-gray-600">
                      Tôi đồng ý với Điều khoản Dịch vụ và Chính sách Bảo mật. Tôi xác nhận rằng tất cả thông tin được cung cấp là chính xác và tôi có quyền bán doanh nghiệp này.
                    </span>
                  </label>
                </div>
              </FormItem>
            )}
          />

          <div className="bg-white border border-purple-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-lg font-semibold">Total Amount / Tổng Tiền:</span>
              <span className="text-2xl font-bold text-purple-600">
                ${pricingSummary.finalPrice.toFixed(2)}
              </span>
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-500" />
                <span>Secure payment powered by Stripe</span>
              </div>
              <p>Your listing will be published immediately after payment confirmation.</p>
              <p className="text-purple-600 font-medium">
                Payment is required to publish your salon listing.
              </p>
            </div>
          </div>

          <StripeCheckout
            amount={pricingSummary.finalPrice}
            productName={`${selectedOptions.selectedPricingTier === 'featured' ? 'Featured ' : ''}Salon Listing - ${selectedOptions.durationMonths} month${selectedOptions.durationMonths > 1 ? 's' : ''}`}
            buttonText={`Pay $${pricingSummary.finalPrice.toFixed(2)} & Publish Listing`}
            onSuccess={handlePaymentSuccess}
            pricingOptions={selectedOptions}
            formData={formData}
          />

          {!canProceed() && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-700 text-sm">
                Please complete all required fields and accept the terms before proceeding with payment.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
