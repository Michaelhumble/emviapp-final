
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ShieldCheck, Lock } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { PricingOptions } from '@/types/job';

interface PaymentSummaryProps {
  pricingOptions: PricingOptions;
  calculatedPrice: number;
  originalPrice?: number;
  discount?: number;
  isSaving?: boolean;
  onSubmit?: () => void;
  isButtonDisabled?: boolean;
}

/**
 * Payment summary component that shows the selected pricing options and total
 */
const PaymentSummary: React.FC<PaymentSummaryProps> = ({
  pricingOptions,
  calculatedPrice,
  originalPrice,
  discount = 0,
  isSaving = false,
  onSubmit,
  isButtonDisabled = false
}) => {
  const { t } = useTranslation();
  const isFree = pricingOptions.selectedPricingTier === 'free';
  const hasDiscount = discount > 0;
  
  // Format prices with $ and commas
  const formatPrice = (price: number): string => {
    return `$${price.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl flex justify-between">
          {t({ english: "Payment Summary", vietnamese: "Tóm tắt thanh toán" })}
          {isFree && (
            <Badge className="ml-2 bg-green-500 text-white">
              {t({ english: "FREE", vietnamese: "MIỄN PHÍ" })}
            </Badge>
          )}
        </CardTitle>
        <CardDescription>
          {t({ english: "Selected plan and pricing details", vietnamese: "Chi tiết kế hoạch và giá đã chọn" })}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{t({ english: "Selected Plan", vietnamese: "Gói đã chọn" })}</span>
            <span className="font-medium capitalize">{pricingOptions.selectedPricingTier}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span>{t({ english: "Duration", vietnamese: "Thời hạn" })}</span>
            <span className="font-medium">
              {pricingOptions.durationMonths || 1} {t({ english: "months", vietnamese: "tháng" })}
            </span>
          </div>
          
          {pricingOptions.isNationwide && (
            <div className="flex justify-between text-sm">
              <span>{t({ english: "Nationwide Visibility", vietnamese: "Hiển thị trên toàn quốc" })}</span>
              <span className="font-medium text-green-600">
                <CheckCircle className="inline-block h-4 w-4 mr-1" />
                {t({ english: "Included", vietnamese: "Bao gồm" })}
              </span>
            </div>
          )}
          
          {pricingOptions.showAtTop && (
            <div className="flex justify-between text-sm">
              <span>{t({ english: "Premium Placement", vietnamese: "Vị trí cao cấp" })}</span>
              <span className="font-medium text-green-600">
                <CheckCircle className="inline-block h-4 w-4 mr-1" />
                {t({ english: "Included", vietnamese: "Bao gồm" })}
              </span>
            </div>
          )}
          
          {pricingOptions.isHotListing && (
            <div className="flex justify-between text-sm">
              <span>{t({ english: "Featured Listing", vietnamese: "Danh sách nổi bật" })}</span>
              <span className="font-medium text-green-600">
                <CheckCircle className="inline-block h-4 w-4 mr-1" />
                {t({ english: "Included", vietnamese: "Bao gồm" })}
              </span>
            </div>
          )}
          
          {pricingOptions.bundleWithJobPost && (
            <div className="flex justify-between text-sm">
              <span>{t({ english: "Job Post Bundle", vietnamese: "Gói đăng tin tuyển dụng" })}</span>
              <span className="font-medium text-green-600">
                <CheckCircle className="inline-block h-4 w-4 mr-1" />
                {t({ english: "15% Savings Applied", vietnamese: "Đã áp dụng giảm giá 15%" })}
              </span>
            </div>
          )}
        </div>
        
        <Separator />
        
        <div className="space-y-2">
          {originalPrice && originalPrice > calculatedPrice && (
            <div className="flex justify-between text-sm">
              <span>{t({ english: "Regular price", vietnamese: "Giá thông thường" })}</span>
              <span className="line-through text-gray-500">{formatPrice(originalPrice)}</span>
            </div>
          )}
          
          {hasDiscount && (
            <div className="flex justify-between text-sm text-green-600">
              <span>
                {t({ english: "Limited time offer", vietnamese: "Khuyến mãi có thời hạn" })}
              </span>
              <span>-{formatPrice(discount)}</span>
            </div>
          )}
          
          {pricingOptions.isFirstPost && !isFree && (
            <div className="flex justify-between text-sm text-green-600">
              <span>{t({ english: "First time discount", vietnamese: "Giảm giá lần đầu" })}</span>
              <span>-{formatPrice(29.99)}</span>
            </div>
          )}
          
          <div className="flex justify-between text-base font-bold pt-2">
            <span>{t({ english: "Total", vietnamese: "Tổng cộng" })}</span>
            <span>{formatPrice(calculatedPrice)}</span>
          </div>
          
          {pricingOptions.autoRenew && (
            <div className="text-xs text-gray-500 italic">
              {t({ english: "Your subscription will automatically renew every", vietnamese: "Dịch vụ của bạn sẽ tự động gia hạn sau mỗi" })} {pricingOptions.durationMonths || 1} {t({ english: "months", vietnamese: "tháng" })}.
            </div>
          )}
        </div>
        
        <div className="bg-green-50 p-3 rounded-md border border-green-100 mt-4">
          <div className="flex items-start">
            <div className="mr-3 mt-0.5">
              <ShieldCheck className="h-5 w-5 text-green-600" />
            </div>
            <div className="text-sm text-green-800 space-y-1">
              <p>{t({ english: "100% satisfaction guarantee", vietnamese: "Đảm bảo hài lòng 100%" })}</p>
              <p>{t({ english: "Priority customer support", vietnamese: "Hỗ trợ khách hàng ưu tiên" })}</p>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex-col space-y-3">
        {onSubmit && (
          <Button 
            onClick={onSubmit} 
            className="w-full" 
            size="lg"
            disabled={isButtonDisabled}
          >
            {isSaving ? (
              <span className="flex items-center justify-center">
                <span className="animate-spin mr-2">⊚</span>
                {t({ english: "Processing...", vietnamese: "Đang xử lý..." })}
              </span>
            ) : isFree ? (
              t({ english: "Post for Free", vietnamese: "Đăng miễn phí" })
            ) : (
              <>
                {t({ english: "Secure Checkout", vietnamese: "Thanh toán an toàn" })}
                <Lock className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        )}
        
        <div className="text-xs text-center text-gray-500">
          {t({ english: "By proceeding, you agree to our terms of service", vietnamese: "Bằng cách tiếp tục, bạn đồng ý với điều khoản dịch vụ của chúng tôi" })}
        </div>
      </CardFooter>
    </Card>
  );
};

export default PaymentSummary;
