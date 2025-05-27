
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CreditCard, Shield, Clock, CheckCircle } from 'lucide-react';
import { SalonFormValues } from './salonFormSchema';
import { SalonPricingOptions, calculateSalonPostPrice } from '@/utils/posting/salonPricing';
import { useTranslation } from "@/hooks/useTranslation";

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
  const { t } = useTranslation();
  const totalPrice = calculateSalonPostPrice(selectedOptions);
  
  const getPlanName = () => {
    if (selectedOptions.durationMonths === 1) return t({ english: 'Standard Listing', vietnamese: 'Đăng Tiêu Chuẩn' });
    if (selectedOptions.durationMonths === 6) return t({ english: '6 Month Package', vietnamese: 'Gói 6 Tháng' });
    if (selectedOptions.durationMonths === 12) return t({ english: '12 Month Package', vietnamese: 'Gói 12 Tháng' });
    return t({ english: 'Standard Listing', vietnamese: 'Đăng Tiêu Chuẩn' });
  };

  const getIncludedFeatures = () => {
    const features = [];
    
    if (selectedOptions.isNationwide) {
      features.push(t({ english: 'Nationwide Visibility (+$10)', vietnamese: 'Hiển Thị Toàn Quốc (+$10)' }));
    }
    
    if (selectedOptions.fastSalePackage || selectedOptions.featuredBoost) {
      features.push(t({ english: 'Premium Promotion (+$20)', vietnamese: 'Quảng Bá Cao Cấp (+$20)' }));
    }
    
    if (selectedOptions.showAtTop) {
      features.push(t({ english: 'Featured Placement (+$15)', vietnamese: 'Vị Trí Nổi Bật (+$15)' }));
    }
    
    if (selectedOptions.bundleWithJobPost) {
      features.push(t({ english: 'Bundle with Job Post (+$15)', vietnamese: 'Gói Cùng Đăng Việc (+$15)' }));
    }
    
    return features;
  };

  const displaySalonInfo = () => {
    const tables = formData.numberOfTables || "4";
    const chairs = formData.numberOfChairs || "9";
    return `${tables} ${t({ english: "tables", vietnamese: "bàn" })}, ${chairs} ${t({ english: "chairs", vietnamese: "ghế" })}`;
  };

  return (
    <div className="space-y-6">
      {/* Listing Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            {t({ english: "Listing Summary", vietnamese: "Tóm Tắt Đăng Bán" })}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-lg">{formData.salonName}</h3>
              <p className="text-gray-600">{formData.city}, {formData.state}</p>
              {formData.neighborhood && (
                <p className="text-sm text-gray-500">{t({ english: "Area", vietnamese: "Khu vực" })}: {formData.neighborhood}</p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">{t({ english: "Asking Price", vietnamese: "Giá Sang" })}:</span>
                <p className="font-medium">${formData.askingPrice}</p>
              </div>
              <div>
                <span className="text-gray-500">{t({ english: "Monthly Rent", vietnamese: "Tiền Thuê/Tháng" })}:</span>
                <p className="font-medium">${formData.monthlyRent}</p>
              </div>
              <div>
                <span className="text-gray-500">{t({ english: "Tables & Chairs", vietnamese: "Bàn & Ghế" })}:</span>
                <p className="font-medium">{displaySalonInfo()}</p>
              </div>
              <div>
                <span className="text-gray-500">{t({ english: "Staff", vietnamese: "Nhân Viên" })}:</span>
                <p className="font-medium">{formData.numberOfStaff} {t({ english: "people", vietnamese: "người" })}</p>
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
            {t({ english: "Selected Plan", vietnamese: "Gói Đã Chọn" })}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{getPlanName()}</h3>
                <p className="text-sm text-gray-600">
                  {t({ english: "Active for", vietnamese: "Hoạt động trong" })} {selectedOptions.durationMonths} {t({ english: "month(s)", vietnamese: "tháng" })}
                </p>
              </div>
              <Badge variant="outline" className="text-purple-600">
                ${totalPrice.toFixed(2)}
              </Badge>
            </div>
            
            {getIncludedFeatures().length > 0 && (
              <div>
                <h4 className="font-medium text-sm text-gray-700 mb-2">
                  {t({ english: "Add-ons Included", vietnamese: "Dịch Vụ Thêm" })}:
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
            {t({ english: "Payment Summary", vietnamese: "Tóm Tắt Thanh Toán" })}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-lg font-semibold">
              <span>{t({ english: "Total Amount", vietnamese: "Tổng Số Tiền" })}:</span>
              <span className="text-purple-600">${totalPrice.toFixed(2)}</span>
            </div>
            <div className="text-sm text-gray-600">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-green-500" />
                <span>{t({ english: "Secure payment powered by Stripe", vietnamese: "Thanh toán bảo mật qua Stripe" })}</span>
              </div>
              <p>{t({ english: "Your listing will be active immediately after payment confirmation.", vietnamese: "Đăng bán sẽ hoạt động ngay sau khi xác nhận thanh toán." })}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          {t({ english: "Back to Plan Selection", vietnamese: "Quay Lại Chọn Gói" })}
        </Button>
        
        <Button 
          onClick={onPayment}
          className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg font-semibold"
        >
          {t({ english: `Pay $${totalPrice.toFixed(2)} & Publish Listing`, vietnamese: `Thanh Toán $${totalPrice.toFixed(2)} & Đăng Bán` })}
        </Button>
      </div>
    </div>
  );
};

export default SalonPaymentFeatures;
