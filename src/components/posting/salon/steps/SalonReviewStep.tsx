
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CreditCard, Shield, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { SalonFormValues } from '../salonFormSchema';
import { SalonPricingOptions, calculateSalonPostPrice, getSalonPostPricingSummary } from '@/utils/posting/salonPricing';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/context/auth';

interface SalonReviewStepProps {
  formData: SalonFormValues;
  selectedOptions: SalonPricingOptions;
  onBack: () => void;
}

const SalonReviewStep: React.FC<SalonReviewStepProps> = ({
  formData,
  selectedOptions,
  onBack
}) => {
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

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
    if (!agreeToTerms) {
      toast.error('Please agree to the terms and conditions to continue');
      return;
    }

    if (!user) {
      toast.error('Please log in to continue');
      navigate('/auth/signin');
      return;
    }

    setIsProcessing(true);

    try {
      // Create Stripe checkout session
      const { data, error } = await supabase.functions.invoke('create-salon-checkout', {
        body: {
          tier: selectedOptions.selectedPricingTier,
          durationMonths: selectedOptions.durationMonths,
          autoRenew: selectedOptions.autoRenew,
          finalPrice: totalPrice,
          salonData: {
            salonName: formData.salonName,
            askingPrice: formData.askingPrice,
            city: formData.city,
            state: formData.state
          }
        }
      });

      if (error) {
        console.error('Stripe checkout error:', error);
        toast.error('Failed to create payment session');
        setIsProcessing(false);
        return;
      }

      if (data?.url) {
        // Open Stripe checkout in a new tab
        window.open(data.url, '_blank');
        setIsProcessing(false);
        
        // Show success message
        toast.success('Payment session created! Complete your payment in the new tab.');
      } else {
        toast.error('No checkout URL received');
        setIsProcessing(false);
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment processing failed');
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Listing Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            Tóm tắt tin đăng / Listing Summary
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
                <span className="text-gray-500">Tiền thuê hàng tháng / Monthly Rent:</span>
                <p className="font-medium">${formData.monthlyRent}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Plan Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-purple-500" />
            Gói đã chọn / Selected Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{getPlanName()}</h3>
                <p className="text-sm text-gray-600">
                  Hiệu lực trong {selectedOptions.durationMonths || 1} tháng / 
                  Active for {selectedOptions.durationMonths || 1} month{(selectedOptions.durationMonths || 1) > 1 ? 's' : ''}
                </p>
              </div>
              <Badge variant="outline" className="text-purple-600">
                ${totalPrice.toFixed(2)}
              </Badge>
            </div>
            
            {getIncludedFeatures().length > 0 && (
              <div>
                <h4 className="font-medium text-sm text-gray-700 mb-2">
                  Dịch vụ bổ sung / Add-ons Included:
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

            {selectedOptions.autoRenew && (
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="flex items-center text-green-700">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">
                    Tự động gia hạn đã bật / Auto-renew enabled (-5% discount)
                  </span>
                </div>
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
            Tóm tắt thanh toán / Payment Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Giá cơ bản / Base Price:</span>
                <span>${pricingSummary.basePrice.toFixed(2)} × {selectedOptions.durationMonths} tháng/months</span>
              </div>
              
              {pricingSummary.discountAmount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Giảm giá / Discount ({pricingSummary.discountPercentage}%):</span>
                  <span>-${pricingSummary.discountAmount.toFixed(2)}</span>
                </div>
              )}
              
              {Object.entries(pricingSummary.addOns).map(([key, value]) => 
                value > 0 && (
                  <div key={key} className="flex justify-between text-sm">
                    <span>{key === 'nationwide' ? 'Nationwide' : 
                           key === 'fastSale' ? 'Premium Promotion' :
                           key === 'showAtTop' ? 'Featured Placement' :
                           key === 'bundleWithJobPost' ? 'Job Post Bundle' : key}:</span>
                    <span>+${value.toFixed(2)}</span>
                  </div>
                )
              )}
            </div>
            
            <div className="border-t pt-3">
              <div className="flex justify-between text-lg font-semibold">
                <span>Tổng cộng / Total Amount:</span>
                <span className="text-purple-600">${totalPrice.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="text-sm text-gray-600">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-green-500" />
                <span>Thanh toán bảo mật bởi Stripe / Secure payment powered by Stripe</span>
              </div>
              <p>
                Tin đăng sẽ được kích hoạt ngay sau khi xác nhận thanh toán / 
                Your listing will be active immediately after payment confirmation.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Terms and Payment */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="terms"
                checked={agreeToTerms}
                onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                className="mt-1"
              />
              <label htmlFor="terms" className="text-sm text-gray-700 leading-relaxed">
                Tôi đồng ý với các điều khoản và điều kiện của EmviApp, bao gồm chính sách hoàn tiền và quy định đăng tin. /
                I agree to EmviApp's terms and conditions, including refund policy and listing guidelines.
              </label>
            </div>

            {!agreeToTerms && (
              <div className="flex items-center gap-2 text-amber-600 text-sm">
                <AlertCircle className="h-4 w-4" />
                <span>
                  Vui lòng đồng ý với điều khoản để tiếp tục / 
                  Please agree to terms to continue
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Quay lại / Back to Plan Selection
        </Button>
        
        <Button 
          onClick={handlePayment}
          disabled={!agreeToTerms || isProcessing}
          className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg font-semibold"
        >
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Đang xử lý / Processing...
            </>
          ) : (
            <>
              Thanh toán / Pay ${totalPrice.toFixed(2)}
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default SalonReviewStep;
