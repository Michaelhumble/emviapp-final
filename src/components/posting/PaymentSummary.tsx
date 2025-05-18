
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { PricingOptions, calculateFinalPrice } from '@/utils/posting';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { Shield, Check, Clock, CreditCard } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface PaymentSummaryProps {
  pricingOptions: PricingOptions;
  setPricingOptions: (options: PricingOptions) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export const PaymentSummary: React.FC<PaymentSummaryProps> = ({
  pricingOptions,
  setPricingOptions,
  onSubmit,
  isSubmitting
}) => {
  const { t, isVietnamese } = useTranslation();
  const finalPrice = calculateFinalPrice(pricingOptions);
  
  // Format currency with $ symbol and proper decimal places
  const formatCurrency = (amount: number) => {
    return `$${amount.toFixed(2)}`;
  };
  
  const formatDuration = (months: number) => {
    return months === 1 
      ? t({ english: '1 month', vietnamese: '1 tháng' })
      : t({ english: `${months} months`, vietnamese: `${months} tháng` });
  };
  
  const handleAutoRenewToggle = (checked: boolean) => {
    setPricingOptions({
      ...pricingOptions,
      autoRenew: checked
    });
  };

  // Get the tier name for display
  const getTierName = () => {
    switch(pricingOptions.selectedPricingTier) {
      case 'standard':
        return t({ english: 'Standard', vietnamese: 'Tiêu chuẩn' });
      case 'premium':
        return t({ english: 'Premium', vietnamese: 'Cao cấp' });
      case 'gold':
        return t({ english: 'Gold', vietnamese: 'Vàng' });
      case 'diamond':
        return t({ english: 'Diamond', vietnamese: 'Kim cương' });
      case 'free':
      default:
        return t({ english: 'Free', vietnamese: 'Miễn phí' });
    }
  };
  
  // Determine if this is the diamond tier which requires special handling
  const isDiamondTier = pricingOptions.selectedPricingTier === 'diamond';
  
  // Determine button text based on tier and pricing
  const getButtonText = () => {
    if (isDiamondTier) {
      return t({ 
        english: "Request Diamond Package", 
        vietnamese: "Yêu cầu gói Kim cương" 
      });
    }
    
    if (pricingOptions.selectedPricingTier === 'free') {
      return t({ 
        english: "Continue with Free Post", 
        vietnamese: "Tiếp tục với bài đăng miễn phí" 
      });
    }
    
    return t({
      english: `Pay ${formatCurrency(finalPrice)} & Post Job`,
      vietnamese: `Thanh toán ${formatCurrency(finalPrice)} & Đăng việc`
    });
  };
  
  // Get percentage saved based on duration
  const getSavingsPercentage = () => {
    if (pricingOptions.durationMonths === 3) return 10;
    if (pricingOptions.durationMonths === 6) return 20;
    if (pricingOptions.durationMonths >= 12) return 25;
    return 0;
  };
  
  const savingsPercentage = getSavingsPercentage();

  return (
    <Card className="border shadow-sm">
      <CardContent className="pt-6">
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">{getTierName()} {t({ english: 'Plan', vietnamese: 'Gói' })}</h3>
              <p className="text-sm text-gray-500">
                {formatDuration(pricingOptions.durationMonths)}
              </p>
            </div>
            <Badge variant={pricingOptions.selectedPricingTier === 'free' ? 'outline' : 'default'} 
                  className={`${pricingOptions.selectedPricingTier === 'gold' ? 'bg-amber-500' : ''} 
                  ${pricingOptions.selectedPricingTier === 'diamond' ? 'bg-purple-600' : ''}`}>
              {pricingOptions.selectedPricingTier === 'free' 
                ? t({ english: 'Free Trial', vietnamese: 'Dùng thử miễn phí' })
                : formatCurrency(finalPrice)}
            </Badge>
          </div>
          
          {/* Display savings if applicable */}
          {savingsPercentage > 0 && (
            <div className="bg-green-50 text-green-800 px-3 py-2 rounded-md text-sm flex items-center">
              <Check size={16} className="mr-2" />
              {t({ 
                english: `You're saving ${savingsPercentage}% with ${formatDuration(pricingOptions.durationMonths)}!`,
                vietnamese: `Bạn tiết kiệm ${savingsPercentage}% với ${formatDuration(pricingOptions.durationMonths)}!`
              })}
            </div>
          )}

          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center space-x-2">
              <Switch 
                id="auto-renew" 
                checked={pricingOptions.autoRenew}
                onCheckedChange={handleAutoRenewToggle}
              />
              <Label htmlFor="auto-renew">
                {t({ english: 'Auto-renew', vietnamese: 'Tự động gia hạn' })}
              </Label>
            </div>
            <span className="text-xs text-gray-500">
              {t({ 
                english: 'Can turn off anytime',
                vietnamese: 'Có thể tắt bất cứ lúc nào'
              })}
            </span>
          </div>

          {/* Display messaging if auto-renew is disabled */}
          {!pricingOptions.autoRenew && (
            <div className="text-amber-600 text-xs italic mt-1">
              {t({ 
                english: "You'll keep your locked-in rate until expiration. Renew anytime to avoid losing your discount!",
                vietnamese: "Bạn sẽ giữ mức giá cố định cho đến khi hết hạn. Gia hạn bất kỳ lúc nào để tránh mất giảm giá!"
              })}
            </div>
          )}
          
          <Separator className="my-3" />
          
          {/* Trust indicators */}
          <div className="flex flex-col space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              <Shield size={16} className="mr-2 text-green-600" />
              <span>
                {t({ 
                  english: "100% Secure payment via Stripe",
                  vietnamese: "Thanh toán an toàn 100% qua Stripe"
                })}
              </span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <CreditCard size={16} className="mr-2 text-green-600" />
              <span>
                {t({ 
                  english: "We accept all major credit cards",
                  vietnamese: "Chấp nhận tất cả thẻ tín dụng"
                })}
              </span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Clock size={16} className="mr-2 text-green-600" />
              <span>
                {t({
                  english: "No risk, cancel anytime",
                  vietnamese: "Không rủi ro, hủy bất cứ lúc nào"
                })}
              </span>
            </div>
          </div>
          
          {/* Testimonial - This is the part with the syntax errors, fixing it */}
          <div className="mt-4 py-3 px-4 bg-gray-50 rounded-lg border border-gray-100">
            <div className="flex items-start">
              <div className="text-amber-500 mr-2">★★★★★</div>
              <div className="text-sm">
                <span className="font-medium">
                  {t({
                    english: "Thousands of businesses trust EmviApp",
                    vietnamese: "Hàng ngàn doanh nghiệp tin dùng EmviApp"
                  })}
                </span>
                <p className="text-gray-600 text-xs mt-1">
                  {t({
                    english: "Lock in your price now—never pay more!",
                    vietnamese: "Giữ giá ngay bây giờ—không bao giờ phải trả thêm!"
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="bg-gray-50 pt-4 pb-4 px-6 flex flex-col">
        <Button 
          onClick={onSubmit}
          disabled={isSubmitting}
          className="w-full py-6 text-base font-medium"
          variant={isDiamondTier ? "outline" : "default"}
        >
          {isSubmitting ? t({
            english: "Processing...",
            vietnamese: "Đang xử lý..."
          }) : getButtonText()}
        </Button>
        <div className="text-xs text-center mt-2 text-gray-500">
          {isDiamondTier ? t({
            english: "Our team will contact you shortly",
            vietnamese: "Đội ngũ của chúng tôi sẽ liên hệ với bạn sớm"
          }) : t({
            english: "You'll be redirected to our secure payment page",
            vietnamese: "Bạn sẽ được chuyển hướng đến trang thanh toán an toàn"
          })}
        </div>
      </CardFooter>
    </Card>
  );
};
