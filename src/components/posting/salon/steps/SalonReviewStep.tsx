
import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "../salonFormSchema";
import { SalonPricingOptions } from "@/utils/posting/salonPricing";
import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import StripeCheckout from "@/components/payments/StripeCheckout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, Building2 } from "lucide-react";

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
  const [isProcessing, setIsProcessing] = useState(false);
  const [publishStatus, setPublishStatus] = useState<'idle' | 'processing' | 'published'>('idle');

  const handlePaymentSuccess = () => {
    setIsProcessing(true);
    setPublishStatus('processing');
    // The backend will handle setting the listing live after payment verification
    // Frontend only shows processing state
  };

  const getPricingTotal = () => {
    const basePrices = {
      1: 19.99,
      3: 49.99,
      6: 99.99,
      12: 149.99
    };
    
    const basePrice = basePrices[selectedOptions.durationMonths as keyof typeof basePrices] || 19.99;
    const featuredPrice = selectedOptions.selectedPricingTier === 'featured' ? 10 : 0;
    return basePrice + featuredPrice;
  };

  if (publishStatus === 'processing') {
    return (
      <div className="text-center py-12">
        <Clock className="w-16 h-16 text-purple-500 mx-auto mb-4 animate-spin" />
        <h2 className="text-2xl font-semibold mb-2">Processing Payment...</h2>
        <p className="text-gray-600">Please wait while we verify your payment and publish your listing.</p>
      </div>
    );
  }

  if (publishStatus === 'published') {
    return (
      <div className="text-center py-12">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Listing Published Successfully!</h2>
        <p className="text-gray-600">Your salon listing is now live and visible to potential buyers.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-playfair font-medium">Review & Payment / Xem Lại & Thanh Toán</h2>
        <p className="text-gray-600 mt-2">
          Review your listing details and complete payment to publish / Xem lại thông tin và hoàn tất thanh toán để đăng tin
        </p>
      </div>

      {/* Listing Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Listing Summary
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
                <span className="text-gray-500">Asking Price:</span>
                <p className="font-medium">${formData.askingPrice}</p>
              </div>
              <div>
                <span className="text-gray-500">Monthly Rent:</span>
                <p className="font-medium">${formData.monthlyRent}</p>
              </div>
            </div>
            <div>
              <span className="text-gray-500">Photos:</span>
              <p className="font-medium">{photoUploads.length} uploaded</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pricing Summary */}
      <Card className="border-purple-200 bg-purple-50">
        <CardHeader>
          <CardTitle className="text-purple-700">Pricing Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>{selectedOptions.durationMonths} Month{selectedOptions.durationMonths > 1 ? 's' : ''} Listing</span>
              <span>${getPricingTotal() - (selectedOptions.selectedPricingTier === 'featured' ? 10 : 0)}</span>
            </div>
            {selectedOptions.selectedPricingTier === 'featured' && (
              <div className="flex justify-between">
                <span>Featured Upgrade</span>
                <span>+$10.00</span>
              </div>
            )}
            <hr className="my-2" />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total:</span>
              <span className="text-purple-600">${getPricingTotal().toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Terms Acceptance */}
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
              <label className="text-sm font-medium">
                I accept the Terms of Service and Privacy Policy *
              </label>
              <p className="text-xs text-gray-500">
                By checking this box, you agree to our terms and conditions.
              </p>
            </div>
          </FormItem>
        )}
      />

      {/* Payment Button */}
      <div className="pt-4">
        <StripeCheckout
          amount={getPricingTotal()}
          productName={`${selectedOptions.durationMonths} Month Salon Listing${selectedOptions.selectedPricingTier === 'featured' ? ' (Featured)' : ''}`}
          buttonText={`Pay $${getPricingTotal().toFixed(2)} & Publish Listing`}
          onSuccess={handlePaymentSuccess}
          pricingOptions={selectedOptions}
          formData={formData}
        />
      </div>

      <div className="text-xs text-gray-500 text-center">
        <p>✅ Your listing will only be published after successful payment verification</p>
        <p>🔒 Secure payment powered by Stripe</p>
      </div>
    </div>
  );
};
