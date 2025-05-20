
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkle } from 'lucide-react';
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
  // Additional properties to handle other components
  originalPrice?: number;
  autoRenewDiscount?: number;
  durationMonths?: number;
  isFirstPost?: boolean;
  isNationwide?: boolean;
  selectedTier?: string;
}

export interface PaymentSummaryProps {
  priceData: PriceData;
}

export const PaymentSummary: React.FC<PaymentSummaryProps> = ({ priceData }) => {
  const { t } = useTranslation();
  
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
            {t({
              english: "Your first post is completely free. No payment required.",
              vietnamese: "Bài đăng đầu tiên của bạn hoàn toàn miễn phí. Không cần thanh toán."
            })}
          </p>
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
              english: "Base price",
              vietnamese: "Giá cơ bản"
            })}</span>
            <span>${priceData.basePrice.toFixed(2)}</span>
          </div>
          
          {/* Duration display if available */}
          {priceData.durationMonths && (
            <div className="flex justify-between">
              <span className="text-gray-600">{t({
                english: `Duration (${priceData.durationMonths} ${priceData.durationMonths === 1 ? 'month' : 'months'})`,
                vietnamese: `Thời hạn (${priceData.durationMonths} ${priceData.durationMonths === 1 ? 'tháng' : 'tháng'})`
              })}</span>
              <span>x{priceData.durationMonths}</span>
            </div>
          )}
          
          {/* Subtotal before discounts */}
          {priceData.originalPrice && priceData.originalPrice !== priceData.basePrice && (
            <div className="flex justify-between font-medium">
              <span>{t({
                english: "Subtotal",
                vietnamese: "Tạm tính"
              })}</span>
              <span>${priceData.originalPrice.toFixed(2)}</span>
            </div>
          )}
          
          {/* Founders discount if applicable */}
          {priceData.isFoundersDiscount && (
            <div className="flex justify-between text-green-600">
              <div className="flex items-center">
                <span>{t({
                  english: "Nail Industry Founders Discount",
                  vietnamese: "Giảm giá người sáng lập ngành nail"
                })}</span>
                <Badge className="ml-2 bg-green-100 text-green-800 border-green-200">
                  Limited Time
                </Badge>
              </div>
              <span>-${(priceData.originalPrice && priceData.discountedPrice ? 
                (priceData.originalPrice - priceData.discountedPrice) : 0).toFixed(2)}</span>
            </div>
          )}
          
          {/* Duration discount if applicable */}
          {priceData.discountPercentage > 0 && (
            <div className="flex justify-between text-green-600">
              <span>{t({
                english: priceData.discountLabel || `${priceData.discountPercentage}% Discount`,
                vietnamese: priceData.discountLabel || `Giảm giá ${priceData.discountPercentage}%`
              })}</span>
              <span>-${priceData.discountAmount.toFixed(2)}</span>
            </div>
          )}
          
          {/* Add any additional fees */}
          {priceData.finalPrice > ((priceData.discountedPrice || priceData.originalPrice || 0) - priceData.discountAmount) && (
            <div className="flex justify-between">
              <span className="text-gray-600">{t({
                english: "Additional services",
                vietnamese: "Dịch vụ bổ sung"
              })}</span>
              <span>${(priceData.finalPrice - 
                ((priceData.discountedPrice || priceData.originalPrice || 0) - priceData.discountAmount)).toFixed(2)}</span>
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

export default PaymentSummary;
