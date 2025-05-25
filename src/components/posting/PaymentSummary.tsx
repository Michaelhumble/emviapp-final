
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkle, AlertTriangle } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { Badge } from '@/components/ui/badge';

export interface PriceData {
  basePrice: number;
  discountedPrice: number;
  finalPrice: number;
  discountPercentage: number;
  discountLabel: string;
  discountAmount: number;
  isFoundersDiscount: boolean;
  durationMonths?: number;
  isFirstPost?: boolean;
  selectedTier?: string;
}

export interface PaymentSummaryProps {
  priceData: PriceData;
  showErrorDetails?: boolean;
  error?: string;
}

export const PaymentSummary: React.FC<PaymentSummaryProps> = ({ 
  priceData, 
  showErrorDetails = false,
  error 
}) => {
  const { t } = useTranslation();
  
  const getDurationDisplay = (months: number) => {
    switch (months) {
      case 1:
        return '30 days';
      case 3:
        return '90 days';
      case 6:
        return '180 days';
      case 12:
        return '1 year';
      default:
        return `${months * 30} days`;
    }
  };
  
  // Show error details if admin mode is enabled
  if (showErrorDetails && error) {
    return (
      <Card className="mt-4 border-red-200">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <h3 className="text-lg font-medium text-red-700">Payment Error</h3>
          </div>
          <div className="bg-red-50 p-3 rounded text-sm text-red-800">
            <strong>Error Details:</strong> {error}
          </div>
        </CardContent>
      </Card>
    );
  }
  
  // Skip rendering for free plans
  if (priceData.finalPrice <= 0) {
    return (
      <Card className="mt-4">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkle className="h-5 w-5 text-green-500" />
            <h3 className="text-lg font-medium">{t({
              english: "Free Post",
              vietnamese: "Bài đăng miễn phí"
            })}</h3>
          </div>
          <p className="text-sm text-gray-600">
            {priceData.isFirstPost ? t({
              english: "Your first post is completely free. No payment required.",
              vietnamese: "Bài đăng đầu tiên của bạn hoàn toàn miễn phí. Không cần thanh toán."
            }) : t({
              english: "This post is free. No payment required.",
              vietnamese: "Bài đăng này miễn phí. Không cần thanh toán."
            })}
          </p>
          {priceData.durationMonths && (
            <p className="text-sm text-gray-500 mt-2">
              {t({
                english: `Duration: ${getDurationDisplay(priceData.durationMonths)}`,
                vietnamese: `Thời hạn: ${getDurationDisplay(priceData.durationMonths)}`
              })}
            </p>
          )}
        </CardContent>
      </Card>
    );
  }

  // Special handling for Diamond tier
  if (priceData.selectedTier === 'diamond') {
    return (
      <Card className="mt-4 border-purple-200">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkle className="h-5 w-5 text-purple-500" />
            <h3 className="text-lg font-medium">{t({
              english: "Diamond Tier - Invitation Only",
              vietnamese: "Gói Kim cương - Chỉ theo lời mời"
            })}</h3>
          </div>
          <div className="space-y-3">
            <Badge className="bg-purple-100 text-purple-800 border-purple-200">
              Premium Access Required
            </Badge>
            <p className="text-sm text-gray-600">
              {t({
                english: "Diamond tier access is by invitation only. Our team will contact you to discuss premium placement options and custom pricing.",
                vietnamese: "Quyền truy cập gói Kim cương chỉ theo lời mời. Đội ngũ của chúng tôi sẽ liên hệ để thảo luận về các tùy chọn vị trí cao cấp và giá tùy chỉnh."
              })}
            </p>
            {priceData.durationMonths && (
              <p className="text-sm text-gray-500">
                {t({
                  english: `Requested duration: ${getDurationDisplay(priceData.durationMonths)}`,
                  vietnamese: `Thời hạn yêu cầu: ${getDurationDisplay(priceData.durationMonths)}`
                })}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-4">
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <Sparkle className="h-5 w-5 text-purple-500" />
          <h3 className="text-lg font-medium">{t({
            english: "Payment Summary",
            vietnamese: "Tóm tắt thanh toán"
          })}</h3>
        </div>
        
        <div className="space-y-3 text-sm">
          {/* Base price */}
          <div className="flex justify-between">
            <span className="text-gray-600">{t({
              english: `${priceData.selectedTier?.charAt(0).toUpperCase()}${priceData.selectedTier?.slice(1)} Plan`,
              vietnamese: `Gói ${priceData.selectedTier}`
            })}</span>
            <span>${priceData.basePrice.toFixed(2)}</span>
          </div>
          
          {/* Duration display */}
          {priceData.durationMonths && (
            <div className="flex justify-between text-gray-500">
              <span>{t({
                english: 'Duration',
                vietnamese: 'Thời hạn'
              })}: </span>
              <span>{getDurationDisplay(priceData.durationMonths)}</span>
            </div>
          )}
          
          {/* Discount if applicable */}
          {priceData.discountAmount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>{priceData.discountLabel}</span>
              <span>-${priceData.discountAmount.toFixed(2)}</span>
            </div>
          )}
          
          {/* Final total */}
          <div className="pt-3 border-t mt-3">
            <div className="flex justify-between font-medium text-base">
              <span>{t({
                english: "Total",
                vietnamese: "Tổng cộng"
              })}</span>
              <span>${priceData.finalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
