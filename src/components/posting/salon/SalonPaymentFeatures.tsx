
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CreditCard, Shield, Clock, CheckCircle, Crown } from 'lucide-react';
import { SalonFormValues } from './salonFormSchema';
import { SalonPricingOptions, calculateSalonPostPrice, getSalonPostPricingSummary, DURATION_OPTIONS } from '@/utils/posting/salonPricing';

interface SalonPaymentFeaturesProps {
  formData: SalonFormValues;
  selectedOptions: SalonPricingOptions;
  onPayment: () => void;
  onBack: () => void;
}

const SalonPaymentFeatures: React.FC<SalonPaymentFeaturesProps> = ({
  formData,
  selectedOptions,
  onPayment,
  onBack
}) => {
  const totalPrice = calculateSalonPostPrice(selectedOptions);
  const pricingSummary = getSalonPostPricingSummary(selectedOptions);
  
  const getPlanName = () => {
    const duration = selectedOptions.durationMonths || 3;
    return `Standard Listing - ${duration} months`;
  };

  const getSavingsText = () => {
    const duration = selectedOptions.durationMonths || 3;
    if (duration === 6) return 'Tiết kiệm 25% / Save 25%';
    if (duration === 12) return 'Tiết kiệm 30% / Save 30%';
    return '';
  };

  return (
    <div className="space-y-6">
      {/* Listing Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            Listing Summary / Tóm tắt đăng tin
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
                <span className="text-gray-500">Asking Price / Giá bán:</span>
                <p className="font-medium">${formData.askingPrice}</p>
              </div>
              <div>
                <span className="text-gray-500">Monthly Rent / Tiền thuê:</span>
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
            <Clock className="h-5 w-5 text-blue-500" />
            Selected Plan / Gói đã chọn
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{getPlanName()}</h3>
                <p className="text-sm text-gray-600">
                  Active for {selectedOptions.durationMonths || 3} months / 
                  Hoạt động trong {selectedOptions.durationMonths || 3} tháng
                </p>
                {getSavingsText() && (
                  <p className="text-sm text-green-600 font-medium mt-1">
                    {getSavingsText()}
                  </p>
                )}
              </div>
              <Badge variant="outline" className="text-blue-600">
                ${pricingSummary.basePrice.toFixed(2)}
              </Badge>
            </div>
            
            {selectedOptions.featuredAddOn && (
              <div className="border-t pt-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Crown className="h-4 w-4 text-yellow-600 mr-2" />
                    <span className="text-sm font-medium">
                      Featured Add-On / Nổi bật
                    </span>
                  </div>
                  <Badge variant="outline" className="text-yellow-600">
                    +${pricingSummary.addOns.featured.toFixed(2)}
                  </Badge>
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  Highlighted placement and "Featured" badge / 
                  Vị trí nổi bật và huy hiệu "Đặc biệt"
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Payment Summary */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-700">
            <CreditCard className="h-5 w-5" />
            Payment Summary / Tóm tắt thanh toán
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {/* Breakdown */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Base Plan / Gói cơ bản:</span>
                <span>${pricingSummary.basePrice.toFixed(2)}</span>
              </div>
              {selectedOptions.featuredAddOn && (
                <div className="flex justify-between">
                  <span>Featured Add-On / Nổi bật:</span>
                  <span>+${pricingSummary.addOns.featured.toFixed(2)}</span>
                </div>
              )}
              {pricingSummary.subtotal && (
                <div className="flex justify-between border-t pt-2">
                  <span>Subtotal / Tạm tính:</span>
                  <span>${pricingSummary.subtotal.toFixed(2)}</span>
                </div>
              )}
              {pricingSummary.discounts.autoRenew > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Auto-renew discount / Giảm giá tự động gia hạn:</span>
                  <span>-${pricingSummary.discounts.autoRenew.toFixed(2)}</span>
                </div>
              )}
            </div>
            
            <div className="flex justify-between text-lg font-semibold border-t pt-3">
              <span>Total Amount / Tổng tiền:</span>
              <span className="text-blue-600">${totalPrice.toFixed(2)}</span>
            </div>
            
            <div className="text-sm text-gray-600">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-green-500" />
                <span>Secure payment powered by Stripe / Thanh toán an toàn bởi Stripe</span>
              </div>
              <p>
                Your listing will be active immediately after payment confirmation. /
                Đăng tin sẽ hoạt động ngay sau khi thanh toán thành công.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Plan Selection / Quay lại chọn gói
        </Button>
        
        <Button 
          onClick={onPayment}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold"
        >
          Pay ${totalPrice.toFixed(2)} & Publish Listing / Thanh toán & Đăng tin
        </Button>
      </div>
    </div>
  );
};

export default SalonPaymentFeatures;
