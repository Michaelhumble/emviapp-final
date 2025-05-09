
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Info } from 'lucide-react';
import { format, addMonths } from 'date-fns';

interface PricingDisplayProps {
  basePrice: number;
  duration: number;
  pricingId: string;
  autoRenew: boolean;
  originalPrice: number;
  finalPrice: number;
  discountPercentage: number;
}

const PricingDisplay: React.FC<PricingDisplayProps> = ({
  basePrice,
  duration,
  pricingId,
  autoRenew,
  originalPrice,
  finalPrice,
  discountPercentage
}) => {
  const { t } = useTranslation();
  
  // Special case for Diamond plan
  const isDiamondYearly = pricingId === 'diamond' && duration === 12;
  const isDiamondPlan = pricingId === 'diamond';
  
  // Format pricing strings
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(price);
  };
  
  const expiryDate = addMonths(new Date(), duration);
  
  const getDurationLabel = () => {
    if (isDiamondPlan && autoRenew) {
      return t("Annual recurring subscription", "Đăng ký định kỳ hàng năm");
    }
    
    switch (duration) {
      case 1:
        return t("1 month", "1 tháng");
      case 3:
        return t("3 months", "3 tháng");
      case 6:
        return t("6 months", "6 tháng");
      case 12:
        return t("12 months", "12 tháng");
      default:
        return `${duration} ${t("months", "tháng")}`;
    }
  };
  
  if (pricingId === 'free') {
    return (
      <Card className="border-green-100 bg-green-50">
        <CardContent className="p-4">
          <h3 className="font-semibold flex items-center">
            <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
            {t("Free Listing Selected", "Đã chọn đăng tin miễn phí")}
          </h3>
          <p className="text-sm text-green-800 mt-2">
            {t("Your free listing will be active for 30 days", "Tin miễn phí của bạn sẽ hoạt động trong 30 ngày")}
          </p>
          <p className="text-sm text-green-800 mt-1">
            {t("Expires on", "Hết hạn vào")}: {format(addMonths(new Date(), 1), "MMMM d, yyyy")}
          </p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="border-blue-100 bg-blue-50">
      <CardContent className="p-4">
        <div className="flex flex-col space-y-2">
          <h3 className="font-medium">{t("Payment Summary", "Tóm tắt thanh toán")}:</h3>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-700">{t("Plan", "Gói")}:</span>
            <span className="font-semibold">{pricingId.charAt(0).toUpperCase() + pricingId.slice(1)}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-700">{t("Duration", "Thời hạn")}:</span>
            <span>{getDurationLabel()}</span>
          </div>
          
          {isDiamondYearly && (
            <div className="flex justify-between items-center text-amber-700">
              <span className="flex items-center">
                <Info className="h-4 w-4 mr-1" />
                {t("Special price", "Giá đặc biệt")}:
              </span>
              <span className="font-semibold">{formatPrice(999.99)}</span>
            </div>
          )}
          
          {!isDiamondYearly && discountPercentage > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-gray-700">{t("Original price", "Giá gốc")}:</span>
              <span className="line-through text-gray-500">{formatPrice(originalPrice)}</span>
            </div>
          )}
          
          {!isDiamondYearly && discountPercentage > 0 && (
            <div className="flex justify-between items-center text-green-700">
              <span>{t("Discount", "Giảm giá")}:</span>
              <span>-{discountPercentage}%</span>
            </div>
          )}
          
          <div className="flex justify-between items-center font-semibold text-lg pt-1 border-t border-blue-200">
            <span>{t("Total", "Tổng cộng")}:</span>
            <span>{formatPrice(finalPrice)}</span>
          </div>
          
          {autoRenew && (
            <div className="mt-2 text-sm text-blue-700 bg-blue-100 p-2 rounded flex items-start">
              <Info className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
              <span>
                {t(
                  "Your subscription will automatically renew annually. You can cancel anytime.",
                  "Đăng ký của bạn sẽ tự động gia hạn hàng năm. Bạn có thể hủy bất cứ lúc nào."
                )}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PricingDisplay;
