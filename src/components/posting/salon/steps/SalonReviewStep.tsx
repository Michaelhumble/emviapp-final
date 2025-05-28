
import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { FormField, FormItem, FormControl, FormLabel } from "@/components/ui/form";
import { SalonFormValues } from "../salonFormSchema";
import { SalonPricingOptions, calculateSalonPostPrice } from "@/utils/posting/salonPricing";
import { useStripe } from "@/hooks/useStripe";
import { toast } from "sonner";
import { CreditCard, Shield, CheckCircle, Clock } from "lucide-react";

interface SalonReviewStepProps {
  form: UseFormReturn<SalonFormValues>;
  formData: SalonFormValues;
  selectedOptions: SalonPricingOptions;
  photoUploads: File[];
}

export const SalonReviewStep = ({ form, formData, selectedOptions, photoUploads }: SalonReviewStepProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showStripeCheckout, setShowStripeCheckout] = useState(false);
  const { initiatePayment } = useStripe();
  
  const totalPrice = calculateSalonPostPrice(selectedOptions);
  const isFeatured = selectedOptions.selectedPricingTier === 'featured';

  const handlePayment = async () => {
    // Validate terms are accepted
    if (!form.getValues('termsAccepted')) {
      toast.error("Please accept the terms and conditions to continue.");
      return;
    }

    // Validate required fields
    const errors = await form.trigger();
    if (!errors) {
      toast.error("Please fix all form errors before proceeding.");
      return;
    }

    setIsProcessing(true);
    setShowStripeCheckout(true);

    try {
      console.log('🔄 Starting Stripe payment flow...');
      console.log('Form data:', formData);
      console.log('Pricing options:', selectedOptions);
      console.log('Total price:', totalPrice);

      // Call Stripe payment - this will create draft listing and redirect to Stripe
      const success = await initiatePayment(selectedOptions, formData);
      
      if (!success) {
        setIsProcessing(false);
        setShowStripeCheckout(false);
        toast.error("Payment initialization failed. Please try again.");
      }
      // If successful, user will be redirected to Stripe, so no need to reset state
    } catch (error) {
      console.error('❌ Payment error:', error);
      setIsProcessing(false);
      setShowStripeCheckout(false);
      toast.error("Payment failed. Please try again.");
    }
  };

  if (showStripeCheckout && isProcessing) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600"></div>
        <h3 className="text-xl font-semibold">Redirecting to Secure Payment...</h3>
        <p className="text-gray-600 text-center max-w-md">
          You're being redirected to Stripe's secure payment page. This may take a few seconds.
        </p>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Shield className="w-4 h-4" />
          <span>Secured by Stripe</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-playfair font-medium">Review & Payment / Xem Lại & Thanh Toán</h2>
        <p className="text-gray-600 mt-2">
          Review your listing details and complete payment / Xem lại thông tin và hoàn tất thanh toán
        </p>
      </div>

      {/* Listing Summary */}
      <Card className="border-purple-200 bg-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-purple-600" />
            Listing Summary / Tóm Tắt Tin Đăng
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <h3 className="text-xl font-semibold">{formData.salonName}</h3>
              <p className="text-gray-600">{formData.businessType}</p>
              <p className="text-gray-600">{formData.city}, {formData.state}</p>
            </div>
            
            {(formData.askingPrice || formData.monthlyRent) && (
              <div className="grid grid-cols-2 gap-4 text-sm">
                {formData.askingPrice && (
                  <div>
                    <span className="text-gray-500">Asking Price:</span>
                    <p className="font-medium">{formData.askingPrice}</p>
                  </div>
                )}
                {formData.monthlyRent && (
                  <div>
                    <span className="text-gray-500">Monthly Rent:</span>
                    <p className="font-medium">{formData.monthlyRent}</p>
                  </div>
                )}
              </div>
            )}

            <div className="text-sm">
              <span className="text-gray-500">Photos uploaded:</span>
              <p className="font-medium">{photoUploads.length} photos</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Plan Summary */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-green-600" />
            Selected Plan / Gói Đã Chọn
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">
                  {selectedOptions.durationMonths === 1 ? 'Standard' : 
                   selectedOptions.durationMonths === 3 ? '3-Month' :
                   selectedOptions.durationMonths === 6 ? '6-Month' : '12-Month'} Listing
                </h3>
                <p className="text-sm text-gray-600">
                  Active for {selectedOptions.durationMonths} month{selectedOptions.durationMonths > 1 ? 's' : ''}
                </p>
              </div>
              <Badge variant="outline" className="text-green-600 border-green-600">
                ${totalPrice.toFixed(2)}
              </Badge>
            </div>
            
            {isFeatured && (
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-amber-500" />
                <span className="text-amber-700 font-medium">Featured Listing (+$10)</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Payment Section */}
      <Card className="border-2 border-purple-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-700">
            <CreditCard className="h-5 w-5" />
            Secure Payment / Thanh Toán Bảo Mật
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-white rounded-lg p-4 border">
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-semibold">Total Amount:</span>
              <span className="text-2xl font-bold text-purple-600">${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Shield className="h-4 w-4 text-green-500" />
              <span>Secure payment powered by Stripe</span>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Your listing will be published immediately after payment confirmation.
            </p>
          </div>

          {/* Terms Acceptance */}
          <FormField
            control={form.control}
            name="termsAccepted"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel className="text-sm leading-5">
                  I agree to the Terms of Service and Privacy Policy. I understand my listing will be published after successful payment.
                  <br />
                  <span className="text-gray-500">
                    Tôi đồng ý với Điều khoản Dịch vụ và Chính sách Bảo mật. Tôi hiểu tin đăng sẽ được xuất bản sau khi thanh toán thành công.
                  </span>
                </FormLabel>
              </FormItem>
            )}
          />

          {/* Payment Button */}
          <Button 
            onClick={handlePayment}
            disabled={isProcessing || !form.getValues('termsAccepted')}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-4 text-lg"
          >
            {isProcessing ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Processing Payment...
              </div>
            ) : (
              `Pay $${totalPrice.toFixed(2)} & Publish Listing`
            )}
          </Button>

          <p className="text-xs text-center text-gray-500">
            🔒 Your payment information is secure and encrypted. You will be redirected to Stripe's secure payment page.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
