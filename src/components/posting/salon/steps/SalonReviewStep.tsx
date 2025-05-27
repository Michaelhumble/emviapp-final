
import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { CheckCircle, CreditCard, Shield, Clock, Loader2 } from "lucide-react";
import { SalonFormValues } from "../salonFormSchema";
import { SalonPricingOptions, calculateSalonPostPrice, getSalonPostPricingSummary } from "@/utils/posting/salonPricing";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface SalonReviewStepProps {
  form: UseFormReturn<SalonFormValues>;
  formData: SalonFormValues;
  selectedOptions: SalonPricingOptions;
  photoUploads: File[];
  onPayment: () => void;
}

const SalonReviewStep: React.FC<SalonReviewStepProps> = ({
  form,
  formData,
  selectedOptions,
  photoUploads,
  onPayment
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  
  const totalPrice = calculateSalonPostPrice(selectedOptions);
  const pricingSummary = getSalonPostPricingSummary(selectedOptions);
  
  const getPlanName = () => {
    if (selectedOptions.selectedPricingTier === 'basic') return 'Basic Salon Listing';
    if (selectedOptions.selectedPricingTier === 'standard') return 'Standard Salon Listing';
    if (selectedOptions.selectedPricingTier === 'featured') return 'Featured Salon Listing';
    return 'Salon Listing';
  };

  const getIncludedFeatures = () => {
    const features = [];
    
    if (selectedOptions.isNationwide) {
      features.push(`Nationwide Visibility (+$${pricingSummary.addOns.nationwide.toFixed(2)})`);
    }
    
    if (selectedOptions.fastSalePackage || selectedOptions.featuredBoost) {
      features.push(`Premium Promotion (+$${pricingSummary.addOns.fastSale.toFixed(2)})`);
    }
    
    if (selectedOptions.showAtTop) {
      features.push(`Featured Placement (+$${pricingSummary.addOns.showAtTop.toFixed(2)})`);
    }
    
    if (selectedOptions.bundleWithJobPost) {
      features.push(`Bundle with Job Post (+$${pricingSummary.addOns.bundleWithJobPost.toFixed(2)})`);
    }
    
    return features;
  };

  const handlePayment = async () => {
    if (!form.getValues('termsAccepted')) {
      toast.error('Please accept the terms and conditions to continue');
      return;
    }

    setIsProcessing(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('create-salon-checkout', {
        body: {
          tier: selectedOptions.selectedPricingTier,
          durationMonths: selectedOptions.durationMonths,
          autoRenew: selectedOptions.autoRenew,
          finalPrice: totalPrice,
          salonData: {
            salonName: formData.salonName,
            city: formData.city,
            state: formData.state,
            askingPrice: formData.askingPrice
          }
        }
      });

      if (error) {
        console.error('Stripe checkout error:', error);
        toast.error('Failed to create payment session. Please try again.');
        return;
      }

      if (data?.url) {
        // Open Stripe checkout in a new tab
        window.open(data.url, '_blank');
        toast.success('Payment window opened. Complete your payment to activate your listing.');
      } else {
        toast.error('No checkout URL received. Please try again.');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment processing failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="font-playfair text-2xl font-semibold text-gray-900">
          Xem Lại & Thanh Toán / Review & Payment
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Xem lại thông tin và hoàn tất thanh toán / Review your information and complete payment
        </p>
      </div>

      {/* Listing Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            Thông Tin Salon / Salon Summary
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
                <span className="text-gray-500">Giá bán / Asking Price:</span>
                <p className="font-medium">${formData.askingPrice}</p>
              </div>
              <div>
                <span className="text-gray-500">Tiền thuê tháng / Monthly Rent:</span>
                <p className="font-medium">${formData.monthlyRent}</p>
              </div>
            </div>
            <div className="text-sm">
              <span className="text-gray-500">Hình ảnh / Photos:</span>
              <p className="font-medium">{photoUploads.length} ảnh đã tải lên / photos uploaded</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Plan Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-purple-500" />
            Gói Đã Chọn / Selected Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{getPlanName()}</h3>
                <p className="text-sm text-gray-600">
                  Có hiệu lực trong {selectedOptions.durationMonths || 1} tháng / 
                  Active for {selectedOptions.durationMonths || 1} month{(selectedOptions.durationMonths || 1) > 1 ? 's' : ''}
                </p>
              </div>
              <Badge variant="outline" className="text-purple-600">
                ${totalPrice.toFixed(2)}
              </Badge>
            </div>
            
            {selectedOptions.autoRenew && (
              <div className="flex items-center text-sm text-green-600">
                <CheckCircle className="h-3 w-3 mr-2" />
                Tự động gia hạn (giảm 5%) / Auto-renew enabled (5% discount)
              </div>
            )}
            
            {getIncludedFeatures().length > 0 && (
              <div>
                <h4 className="font-medium text-sm text-gray-700 mb-2">
                  Tính năng bổ sung / Add-ons Included:
                </h4>
                <ul className="space-y-1">
                  {getIncludedFeatures().map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Payment Summary */}
      <Card className="border-purple-200 bg-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-700">
            <CreditCard className="h-5 w-5" />
            Tóm Tắt Thanh Toán / Payment Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Giá cơ bản / Base Price:</span>
              <span className="text-sm">${pricingSummary.basePrice.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Thời hạn / Duration:</span>
              <span className="text-sm">{selectedOptions.durationMonths} tháng / months</span>
            </div>

            {pricingSummary.discountAmount > 0 && (
              <div className="flex justify-between items-center text-green-600">
                <span className="text-sm">Giảm giá / Discount:</span>
                <span className="text-sm">-${pricingSummary.discountAmount.toFixed(2)} ({pricingSummary.discountPercentage}%)</span>
              </div>
            )}

            <div className="border-t pt-3">
              <div className="flex justify-between text-lg font-semibold">
                <span>Tổng cộng / Total Amount:</span>
                <span className="text-purple-600">${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <div className="text-sm text-gray-600">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-green-500" />
                <span>Thanh toán an toàn qua Stripe / Secure payment powered by Stripe</span>
              </div>
              <p>Tin đăng sẽ hoạt động ngay sau khi thanh toán thành công. / Your listing will be active immediately after payment confirmation.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Terms and Payment */}
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
                  <FormLabel className="text-sm">
                    Tôi đồng ý với các điều khoản và điều kiện / I agree to the terms and conditions
                  </FormLabel>
                  <p className="text-xs text-gray-500">
                    Bằng cách tiếp tục, bạn đồng ý với chính sách dịch vụ và quyền riêng tư của chúng tôi. /
                    By proceeding, you agree to our service policy and privacy terms.
                  </p>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            onClick={handlePayment}
            disabled={!form.watch('termsAccepted') || isProcessing}
            className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white py-3 text-lg font-semibold"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Đang xử lý / Processing...
              </>
            ) : (
              <>
                <CreditCard className="w-5 h-5 mr-2" />
                Thanh Toán ${totalPrice.toFixed(2)} / Pay ${totalPrice.toFixed(2)}
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalonReviewStep;
