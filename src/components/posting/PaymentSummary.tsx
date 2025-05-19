
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/utils/posting/pricing";
import { Shield, Clock, CreditCard, LockIcon, CheckCircle } from "lucide-react";
import { useTranslation } from '@/hooks/useTranslation';

// Create a proper type for the price data
type PriceData = {
  originalPrice: number;
  finalPrice: number;
  discountPercentage: number;
};

// Update the component to use named export and accept PriceData object
export const PaymentSummary = ({
  priceData,
  durationMonths = 1,
  autoRenew = true,
}: {
  priceData: PriceData;
  durationMonths?: number;
  autoRenew?: boolean;
}) => {
  const { originalPrice, finalPrice, discountPercentage } = priceData;
  const { t } = useTranslation();
  
  return (
    <Card className="bg-white border border-gray-200 shadow-sm">
      <CardContent className="p-5">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-gray-900">
                {t({english: "Payment Summary", vietnamese: "Tóm tắt thanh toán"})}
              </h3>
              <p className="text-sm text-gray-500">
                {durationMonths} {durationMonths === 1 
                  ? t({english: "month", vietnamese: "tháng"}) 
                  : t({english: "months", vietnamese: "tháng"})
                } {t({english: "subscription", vietnamese: "đăng ký"})}
              </p>
            </div>
            {discountPercentage > 0 && (
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 px-2 py-1">
                {t({english: "Save", vietnamese: "Tiết kiệm"})} {discountPercentage}%
              </Badge>
            )}
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm">
                {t({english: "Base price", vietnamese: "Giá cơ bản"})}
              </span>
              <span className="font-medium">
                {formatCurrency(originalPrice)}
              </span>
            </div>
            
            {discountPercentage > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-green-600 text-sm">
                  {t({english: "Discount", vietnamese: "Giảm giá"})}
                </span>
                <span className="font-medium text-green-600">
                  -{formatCurrency(originalPrice - finalPrice)}
                </span>
              </div>
            )}
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm">
                {t({english: "Duration", vietnamese: "Thời hạn"})}
              </span>
              <span className="font-medium">
                {durationMonths} {durationMonths === 1 
                  ? t({english: "month", vietnamese: "tháng"}) 
                  : t({english: "months", vietnamese: "tháng"})
                }
              </span>
            </div>
            
            {durationMonths > 1 && (
              <div className="flex justify-between items-center">
                <span className="text-green-600 text-sm">
                  {t({english: "Multi-month savings", vietnamese: "Tiết kiệm nhiều tháng"})}
                </span>
                <span className="font-medium text-green-600">
                  {t({english: "Included in price", vietnamese: "Đã bao gồm trong giá"})}
                </span>
              </div>
            )}
          </div>
          
          <Separator />
          
          <div className="flex justify-between items-center font-medium">
            <span>{t({english: "Total due today", vietnamese: "Tổng số tiền thanh toán ngay"})}</span>
            <span className="text-lg">
              {formatCurrency(finalPrice)}
            </span>
          </div>
          
          <div className={autoRenew ? "text-gray-600" : "text-gray-400"}>
            <div className="flex items-center gap-1 text-sm">
              <Clock size={14} />
              {autoRenew ? (
                <span>
                  {t({
                    english: `Auto-renews at ${formatCurrency(finalPrice / durationMonths)}/month`,
                    vietnamese: `Tự động gia hạn với giá ${formatCurrency(finalPrice / durationMonths)}/tháng`
                  })}
                </span>
              ) : (
                <span>
                  {t({
                    english: "No auto-renewal (one-time payment)",
                    vietnamese: "Không tự động gia hạn (thanh toán một lần)"
                  })}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Trust indicators section */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-center gap-2 mb-3">
            <LockIcon size={16} className="text-gray-500" />
            <span className="text-sm font-medium text-gray-600">
              {t({english: "100% Secure Checkout", vietnamese: "Thanh toán an toàn 100%"})}
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mt-3">
            <div className="flex items-start gap-2">
              <Shield size={16} className="text-gray-500 mt-0.5" />
              <span className="text-xs text-gray-600">
                {t({english: "Secure payment processing by Stripe", vietnamese: "Xử lý thanh toán an toàn bởi Stripe"})}
              </span>
            </div>
            <div className="flex items-start gap-2">
              <CreditCard size={16} className="text-gray-500 mt-0.5" />
              <span className="text-xs text-gray-600">
                {t({english: "Major credit cards accepted", vietnamese: "Chấp nhận các thẻ tín dụng chính"})}
              </span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle size={16} className="text-gray-500 mt-0.5" />
              <span className="text-xs text-gray-600">
                {t({english: "Cancel anytime, no risk", vietnamese: "Hủy bất kỳ lúc nào, không rủi ro"})}
              </span>
            </div>
            <div className="flex items-start gap-2">
              <Shield size={16} className="text-gray-500 mt-0.5" />
              <span className="text-xs text-gray-600">
                {t({english: "SSL encrypted checkout", vietnamese: "Thanh toán được mã hóa SSL"})}
              </span>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              {t({
                english: "\"EmviApp has helped me find 3 nail techs in the last 6 months. Worth every penny!\"",
                vietnamese: "\"EmviApp đã giúp tôi tìm 3 thợ nail trong 6 tháng qua. Đáng giá từng xu!\""
              })}
            </p>
            <p className="text-xs font-medium mt-1">— Magic Nails Salon, San Jose</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
