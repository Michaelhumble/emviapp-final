
import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "../salonFormSchema";
import { SalonPricingOptions } from "@/utils/posting/salonPricing";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FileText, MapPin, DollarSign, Calendar, CheckCircle, AlertCircle } from "lucide-react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useStripe } from "@/hooks/useStripe";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishStatus, setPublishStatus] = useState<'idle' | 'creating-draft' | 'processing-payment' | 'published' | 'failed'>('idle');
  const { initiatePayment } = useStripe();

  const getPrice = (months: number, isFeatured: boolean = false) => {
    const basePrices = { 1: 19.99, 3: 49.99, 6: 99.99, 12: 149.99 };
    const basePrice = basePrices[months as keyof typeof basePrices];
    return isFeatured ? basePrice + 10 : basePrice;
  };

  const isFeatured = selectedOptions.selectedPricingTier === 'featured';
  const totalPrice = getPrice(selectedOptions.durationMonths, isFeatured);

  const handlePayAndPublish = async () => {
    if (!form.getValues('termsAccepted')) {
      toast.error("Please accept the terms and conditions");
      return;
    }

    setIsPublishing(true);
    setPublishStatus('creating-draft');

    try {
      console.log('Starting payment and publish flow...');
      
      // Start Stripe payment - this will create draft listing and redirect to Stripe
      setPublishStatus('processing-payment');
      
      const success = await initiatePayment(selectedOptions, formData);
      
      if (success) {
        // User will be redirected to Stripe Checkout
        // The listing will only be published after successful payment via backend
        setPublishStatus('processing-payment');
        toast.info("Redirecting to payment...", {
          description: "Your listing will be published after successful payment"
        });
      } else {
        throw new Error('Failed to initiate payment');
      }
    } catch (error) {
      console.error('Error in pay and publish flow:', error);
      setPublishStatus('failed');
      toast.error("Publishing Failed", {
        description: "Failed to start payment process. Please try again."
      });
    } finally {
      setIsPublishing(false);
    }
  };

  const getStatusMessage = () => {
    switch (publishStatus) {
      case 'creating-draft':
        return { icon: <AlertCircle className="w-4 h-4 text-blue-500" />, text: "Creating your listing..." };
      case 'processing-payment':
        return { icon: <AlertCircle className="w-4 h-4 text-yellow-500" />, text: "Processing payment..." };
      case 'published':
        return { icon: <CheckCircle className="w-4 h-4 text-green-500" />, text: "Listing published successfully!" };
      case 'failed':
        return { icon: <AlertCircle className="w-4 h-4 text-red-500" />, text: "Publishing failed. Please try again." };
      default:
        return null;
    }
  };

  const statusMessage = getStatusMessage();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <FileText className="w-5 h-5 text-purple-600" />
        <h2 className="text-2xl font-playfair font-medium">Review & Payment / Xem Lại & Thanh Toán</h2>
      </div>

      {statusMessage && (
        <Card className="border-l-4 border-l-blue-500 bg-blue-50">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              {statusMessage.icon}
              <span className="font-medium">{statusMessage.text}</span>
            </div>
          </CardContent>
        </Card>
      )}

      <p className="text-gray-600 mb-6">
        Review your salon listing details and complete payment to publish / Xem lại thông tin salon và thanh toán để đăng tin
      </p>

      {/* Salon Information Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            Salon Information / Thông Tin Salon
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-lg">{formData.salonName}</h3>
              <p className="text-gray-600">{formData.businessType}</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <MapPin className="w-4 h-4" />
              <span>{formData.address}, {formData.city}, {formData.state} {formData.zipCode}</span>
            </div>
            {formData.askingPrice && (
              <div className="flex items-center gap-2 text-sm">
                <DollarSign className="w-4 h-4" />
                <span className="font-medium">Asking Price: ${formData.askingPrice}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Selected Plan Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-500" />
            Selected Plan / Gói Đã Chọn
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">
                  {selectedOptions.durationMonths} Month{selectedOptions.durationMonths > 1 ? 's' : ''} Listing
                </h3>
                <p className="text-sm text-gray-600">
                  {selectedOptions.durationMonths * 30} days of visibility
                </p>
              </div>
              <Badge variant="outline" className="text-purple-600">
                ${getPrice(selectedOptions.durationMonths, false).toFixed(2)}
              </Badge>
            </div>
            
            {isFeatured && (
              <div className="flex justify-between items-center pt-2 border-t">
                <div>
                  <h4 className="font-medium text-sm">Featured Listing Upgrade</h4>
                  <p className="text-xs text-gray-600">Priority placement and highlighted badge</p>
                </div>
                <Badge variant="outline" className="text-orange-600">
                  +$10.00
                </Badge>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Total and Payment */}
      <Card className="border-purple-200 bg-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-700">
            <DollarSign className="w-5 h-5" />
            Payment Summary / Tóm Tắt Thanh Toán
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total Amount / Tổng Tiền:</span>
              <span className="text-purple-600">${totalPrice.toFixed(2)}</span>
            </div>
            <div className="text-sm text-gray-600">
              <p className="mb-2">✅ Secure payment powered by Stripe</p>
              <p className="font-medium text-purple-700">
                Your listing will be published immediately after payment confirmation.
              </p>
              <p className="text-xs">
                Tin đăng sẽ được xuất bản ngay sau khi thanh toán thành công.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Terms and Conditions */}
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
                  <FormLabel className="cursor-pointer">
                    I agree to the Terms of Service and Privacy Policy *
                  </FormLabel>
                  <p className="text-sm text-gray-500">
                    Tôi đồng ý với Điều khoản Dịch vụ và Chính sách Bảo mật
                  </p>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      {/* Pay & Publish Button */}
      <div className="pt-4">
        <Button 
          onClick={handlePayAndPublish}
          disabled={isPublishing || !form.getValues('termsAccepted') || publishStatus === 'published'}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 text-lg"
          size="lg"
        >
          {isPublishing ? (
            <>
              <AlertCircle className="mr-2 h-5 w-5 animate-spin" />
              {publishStatus === 'creating-draft' && "Creating Listing..."}
              {publishStatus === 'processing-payment' && "Processing Payment..."}
            </>
          ) : publishStatus === 'published' ? (
            <>
              <CheckCircle className="mr-2 h-5 w-5" />
              Published Successfully!
            </>
          ) : (
            `Pay $${totalPrice.toFixed(2)} & Publish Listing`
          )}
        </Button>
        
        <p className="text-xs text-gray-500 text-center mt-2">
          Your listing will only be published after successful Stripe payment
        </p>
      </div>
    </div>
  );
};
