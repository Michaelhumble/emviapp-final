
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, CreditCard, Shield, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { SalonFormValues } from "../salonFormSchema";
import { SalonPricingOptions, calculateSalonPostPrice, getSalonPostPricingSummary } from "@/utils/posting/salonPricing";
import { useStripe } from "@/hooks/useStripe";
import { UseFormReturn } from "react-hook-form";

interface SalonReviewStepProps {
  form: UseFormReturn<SalonFormValues>;
  formData: SalonFormValues;
  selectedOptions: SalonPricingOptions;
  photoUploads: File[];
}

export const SalonReviewStep = ({ form, formData, selectedOptions, photoUploads }: SalonReviewStepProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'processing' | 'success' | 'error'>('pending');
  const { initiatePayment } = useStripe();
  
  const totalPrice = calculateSalonPostPrice(selectedOptions);
  const pricingSummary = getSalonPostPricingSummary(selectedOptions);
  
  const handlePayment = async () => {
    if (!form.getValues('termsAccepted')) {
      form.setError('termsAccepted', { message: 'You must accept the terms and conditions' });
      return;
    }

    setIsProcessing(true);
    setPaymentStatus('processing');
    
    try {
      console.log('Initiating payment with form data:', formData);
      console.log('Pricing options:', selectedOptions);
      
      const success = await initiatePayment(selectedOptions, formData);
      
      if (success) {
        setPaymentStatus('success');
        // Note: Stripe will redirect to success page
        // The listing will only be published after backend verifies payment
      } else {
        setPaymentStatus('error');
      }
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentStatus('error');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-playfair font-medium">Review & Payment / Xem Lại & Thanh Toán</h2>
        <p className="text-gray-600 mt-2">
          Review your listing details and complete payment to publish / Xem lại thông tin và thanh toán để đăng tin
        </p>
      </div>

      {/* Payment Status Indicator */}
      {paymentStatus === 'processing' && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-blue-500 animate-spin" />
              <div>
                <h3 className="font-semibold text-blue-800">Publishing Your Listing...</h3>
                <p className="text-sm text-blue-600">
                  Redirecting to secure payment. Your listing will be published after payment confirmation.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {paymentStatus === 'error' && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <div>
                <h3 className="font-semibold text-red-800">Payment Failed</h3>
                <p className="text-sm text-red-600">
                  Please try again or contact support if the issue persists.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

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
              <p className="text-gray-600">{formData.city}, {formData.state}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Business Type:</span>
                <p className="font-medium">{formData.businessType}</p>
              </div>
              <div>
                <span className="text-gray-500">Asking Price:</span>
                <p className="font-medium">${formData.askingPrice}</p>
              </div>
              <div>
                <span className="text-gray-500">Monthly Rent:</span>
                <p className="font-medium">${formData.monthlyRent}</p>
              </div>
              <div>
                <span className="text-gray-500">Photos:</span>
                <p className="font-medium">{photoUploads.length} uploaded</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FOMO Pricing Plan */}
      <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-700">
            <CreditCard className="h-5 w-5" />
            Selected Plan / Gói Đã Chọn
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">
                  {selectedOptions.selectedPricingTier === 'featured' ? 'Featured' : 'Basic'} Listing
                  {selectedOptions.durationMonths > 1 && ` (${selectedOptions.durationMonths} months)`}
                </h3>
                <p className="text-sm text-gray-600">
                  Active for {selectedOptions.durationMonths || 1} month{(selectedOptions.durationMonths || 1) > 1 ? 's' : ''}
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-purple-600">
                  ${totalPrice.toFixed(2)}
                </div>
                {pricingSummary.savingsAmount > 0 && (
                  <div className="text-sm text-green-600 font-medium">
                    Save ${pricingSummary.savingsAmount.toFixed(2)} ({pricingSummary.savingsPercentage}% OFF!)
                  </div>
                )}
              </div>
            </div>
            
            {selectedOptions.selectedPricingTier === 'featured' && (
              <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm font-medium text-yellow-800">
                    Featured Listing (+$10) - Priority placement & highlighted badge
                  </span>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Payment Security */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-5 w-5 text-green-600" />
            <span className="font-medium text-green-800">Secure Payment / Thanh Toán An Toàn</span>
          </div>
          <div className="text-sm text-green-700 space-y-1">
            <p>✓ Encrypted payment processing by Stripe</p>
            <p>✓ Your listing will be published immediately after payment</p>
            <p>✓ No payment = No published listing (strict enforcement)</p>
          </div>
        </CardContent>
      </Card>

      {/* Terms and Conditions */}
      <div className="space-y-4">
        <div className="flex items-start space-x-2">
          <Checkbox
            id="termsAccepted"
            checked={form.watch('termsAccepted')}
            onCheckedChange={(checked) => form.setValue('termsAccepted', checked === true)}
          />
          <div className="text-sm leading-relaxed">
            <label htmlFor="termsAccepted" className="cursor-pointer">
              I agree to the{' '}
              <a href="/terms" className="text-purple-600 hover:underline" target="_blank">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" className="text-purple-600 hover:underline" target="_blank">
                Privacy Policy
              </a>
              . I understand my listing will only be published after successful payment verification.
            </label>
          </div>
        </div>
        {form.formState.errors.termsAccepted && (
          <p className="text-red-500 text-sm">{form.formState.errors.termsAccepted.message}</p>
        )}
      </div>

      {/* Payment Button */}
      <div className="pt-4">
        <Button 
          onClick={handlePayment}
          disabled={isProcessing || !form.watch('termsAccepted')}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 text-lg shadow-lg"
        >
          {isProcessing ? (
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 animate-spin" />
              Publishing Listing...
            </div>
          ) : (
            <>
              🔒 Pay ${totalPrice.toFixed(2)} & Publish Listing
            </>
          )}
        </Button>
        
        <p className="text-xs text-gray-500 text-center mt-2">
          Your listing will only be visible after successful payment verification
        </p>
      </div>
    </div>
  );
};
