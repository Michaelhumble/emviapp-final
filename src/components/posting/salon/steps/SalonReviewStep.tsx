
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "../salonFormSchema";
import { SalonPricingOptions, getSalonPostPricingSummary } from "@/utils/posting/salonPricing";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FormField, FormItem, FormControl, FormLabel } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Crown, Star, CheckCircle, DollarSign, MapPin, Building2, Clock } from "lucide-react";
import StripeCheckout from "@/components/payments/StripeCheckout";

interface SalonReviewStepProps {
  form: UseFormReturn<SalonFormValues>;
  formData: SalonFormValues;
  selectedOptions: SalonPricingOptions;
  photoUploads: File[];
}

export const SalonReviewStep = ({ form, formData, selectedOptions, photoUploads }: SalonReviewStepProps) => {
  const pricingSummary = getSalonPostPricingSummary(selectedOptions);
  
  const getPlanName = () => {
    return selectedOptions.selectedPricingTier === 'featured' ? 'Featured Listing' : 'Basic Listing';
  };

  const getDurationText = () => {
    const months = selectedOptions.durationMonths;
    if (months === 1) return '1 month / 1 tháng';
    if (months === 3) return '3 months / 3 tháng';
    if (months === 6) return '6 months / 6 tháng';
    if (months === 12) return '12 months / 12 tháng';
    return `${months} months`;
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-playfair font-medium">Review & Payment / Xem Lại & Thanh Toán</h2>
        <p className="text-gray-600 mt-2">
          Review your salon listing details and complete payment / Xem lại thông tin salon và hoàn tất thanh toán
        </p>
      </div>

      {/* Salon Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-purple-600" />
            Salon Summary / Tóm Tắt Salon
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-lg">{formData.salonName}</h3>
                <p className="text-gray-600">{formData.businessType}</p>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{formData.address}, {formData.city}, {formData.state}</span>
              </div>
              {formData.establishedYear && (
                <p className="text-sm text-gray-500">Established: {formData.establishedYear}</p>
              )}
            </div>
            
            <div className="space-y-3">
              {formData.askingPrice && (
                <div>
                  <span className="text-gray-500 text-sm">Asking Price:</span>
                  <p className="font-semibold text-lg">${formData.askingPrice}</p>
                </div>
              )}
              {formData.monthlyRent && (
                <div>
                  <span className="text-gray-500 text-sm">Monthly Rent:</span>
                  <p className="font-medium">${formData.monthlyRent}</p>
                </div>
              )}
              {formData.monthlyRevenue && (
                <div>
                  <span className="text-gray-500 text-sm">Monthly Revenue:</span>
                  <p className="font-medium">${formData.monthlyRevenue}</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t">
            <p className="text-sm text-gray-500">Photos uploaded: {photoUploads.length}</p>
          </div>
        </CardContent>
      </Card>

      {/* Plan & Pricing Summary */}
      <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {selectedOptions.selectedPricingTier === 'featured' ? (
              <Crown className="w-5 h-5 text-yellow-600" />
            ) : (
              <Star className="w-5 h-5 text-purple-600" />
            )}
            Selected Plan / Gói Đã Chọn
            {selectedOptions.selectedPricingTier === 'featured' && (
              <Badge className="bg-yellow-500 text-white">
                FEATURED
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Plan Type:</p>
                <p className="font-semibold text-lg">{getPlanName()}</p>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Duration:</p>
                  <p className="font-medium">{getDurationText()}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="text-right">
                <p className="text-sm text-gray-500">Original Price:</p>
                <p className="text-lg text-gray-400 line-through">
                  ${pricingSummary.originalPrice.toFixed(2)}
                </p>
              </div>
              <div className="text-right">
                <div className="flex items-center justify-end gap-2 mb-1">
                  <Badge variant="destructive" className="text-xs">
                    🎉 Save {pricingSummary.savingsPercentage}%!
                  </Badge>
                </div>
                <p className="text-3xl font-bold text-green-600">
                  ${pricingSummary.finalPrice.toFixed(2)}
                </p>
                <p className="text-sm text-gray-600">Total Amount</p>
              </div>
            </div>
          </div>

          {/* Plan Features */}
          <div className="mt-6 pt-4 border-t border-purple-200">
            <h4 className="font-medium mb-3">Included Features:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm">Professional listing page</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm">Photo gallery display</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm">Contact information</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm">Search visibility</span>
              </div>
              {selectedOptions.selectedPricingTier === 'featured' && (
                <>
                  <div className="flex items-center gap-2">
                    <Crown className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium text-yellow-700">Top search placement</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Crown className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium text-yellow-700">Premium badge</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Crown className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium text-yellow-700">3x more visibility</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Terms & Payment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            Complete Payment / Hoàn Tất Thanh Toán
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            control={form.control}
            name="termsAccepted"
            render={({ field }) => (
              <FormItem className="flex items-start space-x-3">
                <FormControl>
                  <Checkbox 
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1">
                  <FormLabel className="text-sm">
                    I agree to the Terms of Service and Privacy Policy / 
                    Tôi đồng ý với Điều khoản Dịch vụ và Chính sách Bảo mật *
                  </FormLabel>
                  <p className="text-xs text-gray-500">
                    Your listing will be reviewed and published within 24 hours / 
                    Tin đăng sẽ được xem xét và đăng trong vòng 24 giờ
                  </p>
                </div>
              </FormItem>
            )}
          />
          
          <div className="pt-4">
            <StripeCheckout
              amount={pricingSummary.finalPrice}
              productName={`${getPlanName()} - ${getDurationText()}`}
              buttonText={`Pay $${pricingSummary.finalPrice.toFixed(2)} & Publish Listing / Thanh Toán & Đăng Tin`}
              pricingOptions={selectedOptions}
              formData={formData}
              onSuccess={() => {
                window.location.href = '/salon-listing-success';
              }}
            />
            <p className="text-xs text-gray-500 text-center mt-2">
              🔒 Secure payment powered by Stripe / Thanh toán bảo mật bởi Stripe
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
