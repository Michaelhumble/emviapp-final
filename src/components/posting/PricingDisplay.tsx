
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Flame, Star, Diamond, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import PricingMicroCopy from './PricingMicroCopy';
import { useTranslation } from '@/hooks/useTranslation';

interface PricingDisplayProps {
  pricingId: string;
  basePrice: number;
  duration: number;
  autoRenew: boolean;
  originalPrice: number;
  finalPrice: number;
  discountPercentage: number;
  extraCharges?: {
    nationwide?: boolean;
    fastSale?: boolean;
  };
}

const PricingDisplay: React.FC<PricingDisplayProps> = ({
  pricingId,
  basePrice,
  duration,
  autoRenew,
  originalPrice,
  finalPrice,
  discountPercentage,
  extraCharges = {}
}) => {
  const isFreePlan = pricingId === 'free';
  const { t } = useTranslation();
  
  const formatCurrency = (value: number): string => {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };
  
  // Function to get the appropriate icon
  const getPlanIcon = () => {
    switch (pricingId) {
      case 'standard':
        return <Flame size={24} className="text-blue-600" />;
      case 'premium':
        return <Diamond size={24} className="text-purple-600" />;
      case 'gold':
        return <Star size={24} className="text-amber-600" />;
      default:
        return null;
    }
  };
  
  // Function to get the plan name
  const getPlanName = () => {
    switch (pricingId) {
      case 'standard':
        return t("Standard", "Tiêu chuẩn");
      case 'premium':
        return t("Premium Listing", "Gói cao cấp");
      case 'gold':
        return t("Gold Featured", "Nổi bật");
      case 'free':
        return t("Basic Plan", "Gói cơ bản");
      default:
        return t("Selected Plan", "Gói đã chọn");
    }
  };
  
  // Get gradient background for different plans
  const getGradientBg = () => {
    if (isFreePlan) return "bg-gray-50";
    
    switch (pricingId) {
      case 'standard':
        return "bg-gradient-to-br from-white to-blue-50";
      case 'premium':
        return "bg-gradient-to-br from-purple-50 to-purple-100/70";
      case 'gold':
        return "bg-gradient-to-br from-amber-50 to-amber-100/70";
      default:
        return "bg-white";
    }
  };

  return (
    <Card className={cn(
      "overflow-hidden",
      getGradientBg(),
      pricingId === 'standard' ? "border-blue-200" :
      pricingId === 'premium' ? "border-purple-200" :
      pricingId === 'gold' ? "border-amber-200" :
      "border-gray-200"
    )}>
      <CardHeader 
        className={cn(
          "p-5 space-y-1",
          pricingId === 'standard' ? "bg-blue-100/50 border-b border-blue-200" :
          pricingId === 'premium' ? "bg-purple-100/50 border-b border-purple-200" :
          pricingId === 'gold' ? "bg-amber-100/50 border-b border-amber-200" :
          "bg-gray-100 border-b border-gray-200"
        )}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            {getPlanIcon()}
            <CardTitle className={cn(
              "font-playfair",
              pricingId === 'standard' ? "text-blue-800" :
              pricingId === 'premium' ? "text-purple-800" :
              pricingId === 'gold' ? "text-amber-800" :
              "text-gray-800"
            )}>
              {getPlanName()}
            </CardTitle>
          </div>
          {!isFreePlan && (
            <span className="px-2 py-1 text-xs rounded-full bg-opacity-20 font-medium bg-white">
              {duration} {duration === 1 ? t('month', 'tháng') : t('months', 'tháng')}
            </span>
          )}
        </div>
        <CardDescription className={cn(
          "text-sm",
          pricingId === 'standard' ? "text-blue-700" :
          pricingId === 'premium' ? "text-purple-700" :
          pricingId === 'gold' ? "text-amber-700" :
          "text-gray-600"
        )}>
          {isFreePlan ? t("Limited visibility posting", "Đăng tin với hiển thị giới hạn") : t("Premium job placement", "Đăng tin với hiển thị tốt")}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-5 space-y-4">
        {isFreePlan ? (
          <div className="text-center py-2">
            <p className="text-2xl font-medium mb-1">{t("Free", "Miễn phí")}</p>
            <p className="text-sm text-gray-500">{t("For first-time users only", "Chỉ dành cho người dùng lần đầu")}</p>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{t("Base price", "Giá cơ bản")}</span>
                <span className="font-medium">{formatCurrency(basePrice)}/mo</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{t("Duration", "Thời hạn")}</span>
                <span className="font-medium">{duration} {duration === 1 ? t('month', 'tháng') : t('months', 'tháng')}</span>
              </div>

              {extraCharges?.nationwide && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{t("Nationwide Visibility", "Hiển thị toàn quốc")}</span>
                  <span className="font-medium">+$5.00</span>
                </div>
              )}

              {extraCharges?.fastSale && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{t("Fast Sale Package", "Gói bán nhanh")}</span>
                  <span className="font-medium">+$50.00</span>
                </div>
              )}

              {discountPercentage > 0 && (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{t("Subtotal", "Tạm tính")}</span>
                    <span className="font-medium">{formatCurrency(originalPrice)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-green-700">
                    <span className="text-sm font-medium">{t("Discount", "Giảm giá")} ({discountPercentage}%)</span>
                    <span className="font-medium">-{formatCurrency(originalPrice - finalPrice)}</span>
                  </div>
                </>
              )}
              
              <div className="pt-2 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900">{t("Total", "Tổng cộng")}</span>
                  <span className="text-xl font-bold">
                    {formatCurrency(finalPrice)}
                  </span>
                </div>
              </div>

              {autoRenew && (
                <div className="pt-3 text-xs text-gray-600">
                  <p className="flex items-center">
                    <RefreshCw className="h-3.5 w-3.5 mr-1 text-green-600" />
                    {t("Auto-renewal is enabled. You can cancel anytime.", "Đã bật tự động gia hạn. Bạn có thể hủy bất kỳ lúc nào.")}
                  </p>
                </div>
              )}
            </div>
          </>
        )}
        
        {/* Add the dynamic microcopy */}
        <PricingMicroCopy selectedPlan={pricingId} />
      </CardContent>
    </Card>
  );
};

export default PricingDisplay;
