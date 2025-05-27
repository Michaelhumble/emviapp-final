
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Star, Zap, ArrowLeft, RotateCcw } from 'lucide-react';
import { SalonPricingOptions, SalonPricingTier, DURATION_OPTIONS, getSalonPostPricingSummary } from '@/utils/posting/salonPricing';
import { useTranslation } from '@/hooks/useTranslation';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SalonPlanSelectionSectionProps {
  selectedOptions: SalonPricingOptions;
  onOptionsChange: (options: SalonPricingOptions) => void;
  onNext: () => void;
  onBack: () => void;
  hideNavigation?: boolean;
}

const SalonPlanSelectionSection: React.FC<SalonPlanSelectionSectionProps> = ({
  selectedOptions,
  onOptionsChange,
  onNext,
  onBack,
  hideNavigation = false,
}) => {
  const { t } = useTranslation();

  const plans = [
    {
      id: 'basic' as SalonPricingTier,
      name: t({ english: 'Basic Listing', vietnamese: 'Tin đăng cơ bản' }),
      basePrice: 19.99,
      icon: <Star className="h-5 w-5" />,
      features: [
        t({ english: 'Basic salon listing', vietnamese: 'Tin đăng salon cơ bản' }),
        t({ english: 'Contact information', vietnamese: 'Thông tin liên hệ' }),
        t({ english: 'Photo gallery', vietnamese: 'Thư viện ảnh' })
      ]
    },
    {
      id: 'standard' as SalonPricingTier,
      name: t({ english: 'Standard Listing', vietnamese: 'Tin đăng tiêu chuẩn' }),
      basePrice: 24.99,
      icon: <Zap className="h-5 w-5" />,
      popular: true,
      features: [
        t({ english: 'Enhanced salon listing', vietnamese: 'Tin đăng salon nâng cao' }),
        t({ english: 'Priority visibility', vietnamese: 'Hiển thị ưu tiên' }),
        t({ english: 'Photo gallery', vietnamese: 'Thư viện ảnh' }),
        t({ english: 'Detailed description', vietnamese: 'Mô tả chi tiết' })
      ]
    },
    {
      id: 'featured' as SalonPricingTier,
      name: t({ english: 'Featured Listing', vietnamese: 'Tin đăng nổi bật' }),
      basePrice: 39.99,
      icon: <Crown className="h-5 w-5" />,
      features: [
        t({ english: 'Premium salon listing', vietnamese: 'Tin đăng salon cao cấp' }),
        t({ english: 'Top placement', vietnamese: 'Vị trí hàng đầu' }),
        t({ english: 'Featured badge', vietnamese: 'Huy hiệu nổi bật' }),
        t({ english: 'Social media promotion', vietnamese: 'Quảng bá mạng xã hội' })
      ]
    }
  ];

  const handlePlanSelect = (planId: SalonPricingTier) => {
    onOptionsChange({
      ...selectedOptions,
      selectedPricingTier: planId
    });
  };

  const handleDurationChange = (months: string) => {
    onOptionsChange({
      ...selectedOptions,
      durationMonths: parseInt(months)
    });
  };

  const handleAutoRenewChange = (checked: boolean) => {
    onOptionsChange({
      ...selectedOptions,
      autoRenew: checked
    });
  };

  const getPricingForPlan = (planId: SalonPricingTier) => {
    const options = {
      ...selectedOptions,
      selectedPricingTier: planId
    };
    return getSalonPostPricingSummary(options);
  };

  const currentPricing = getPricingForPlan(selectedOptions.selectedPricingTier);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">{t({ english: 'Choose Your Plan', vietnamese: 'Chọn gói của bạn' })}</h2>
        <p className="text-gray-600 mt-2">
          {t({ english: 'Select the best plan for your salon listing', vietnamese: 'Chọn gói tốt nhất cho tin đăng salon của bạn' })}
        </p>
      </div>

      {/* Duration Selection */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-700">
            {t({ english: 'Select Duration', vietnamese: 'Chọn thời hạn' })}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select 
            value={selectedOptions.durationMonths?.toString() || "1"} 
            onValueChange={handleDurationChange}
          >
            <SelectTrigger>
              <SelectValue placeholder={t({ english: 'Choose duration', vietnamese: 'Chọn thời hạn' })} />
            </SelectTrigger>
            <SelectContent>
              {DURATION_OPTIONS.map((option) => (
                <SelectItem key={option.months} value={option.months.toString()}>
                  <div className="flex justify-between items-center w-full">
                    <span>{option.label}</span>
                    {option.discount > 0 && (
                      <Badge variant="secondary" className="ml-2 text-green-600">
                        {t({ english: `Save ${option.discount}%`, vietnamese: `Tiết kiệm ${option.discount}%` })}
                      </Badge>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Plan Selection */}
      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => {
          const planPricing = getPricingForPlan(plan.id);
          return (
            <Card 
              key={plan.id}
              className={`relative cursor-pointer transition-all ${
                selectedOptions.selectedPricingTier === plan.id 
                  ? 'ring-2 ring-purple-500 border-purple-500' 
                  : 'hover:shadow-lg'
              } ${plan.popular ? 'border-purple-200' : ''}`}
              onClick={() => handlePlanSelect(plan.id)}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-500">
                  {t({ english: 'Most Popular', vietnamese: 'Phổ biến nhất' })}
                </Badge>
              )}
              
              <CardHeader className="text-center">
                <div className="flex justify-center mb-2">
                  {plan.icon}
                </div>
                <CardTitle className="text-lg">{plan.name}</CardTitle>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">
                    ${planPricing.finalPrice.toFixed(2)}
                  </div>
                  {planPricing.discountPercentage > 0 && (
                    <div className="text-sm text-gray-500 line-through">
                      ${planPricing.totalPrice.toFixed(2)}
                    </div>
                  )}
                  <div className="text-sm text-gray-600">
                    {selectedOptions.durationMonths || 1} {t({ english: 'month(s)', vietnamese: 'tháng' })}
                  </div>
                  {planPricing.discountPercentage > 0 && (
                    <Badge variant="secondary" className="text-green-600 mt-1">
                      {t({ english: `${planPricing.discountPercentage}% off`, vietnamese: `Giảm ${planPricing.discountPercentage}%` })}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Auto-renew Option */}
      <Card className="bg-gray-50 border">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="autoRenew"
              checked={selectedOptions.autoRenew || false}
              onCheckedChange={handleAutoRenewChange}
            />
            <div className="space-y-1 leading-none">
              <label 
                htmlFor="autoRenew"
                className="flex items-center gap-2 cursor-pointer font-medium"
              >
                <RotateCcw className="w-4 h-4" />
                {t({ english: 'Auto-renew listing', vietnamese: 'Tự động gia hạn tin đăng' })}
              </label>
              <p className="text-sm text-gray-600">
                {t({ 
                  english: 'Save 5% with auto-renewal. Cancel anytime.', 
                  vietnamese: 'Tiết kiệm 5% khi tự động gia hạn. Hủy bất cứ lúc nào.' 
                })}
              </p>
              {selectedOptions.autoRenew && currentPricing.autoRenewDiscount > 0 && (
                <p className="text-sm text-green-600 font-medium">
                  {t({ 
                    english: `You save $${currentPricing.autoRenewDiscount.toFixed(2)}!`, 
                    vietnamese: `Bạn tiết kiệm được $${currentPricing.autoRenewDiscount.toFixed(2)}!` 
                  })}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {!hideNavigation && (
        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            {t({ english: 'Back to Details', vietnamese: 'Quay lại Chi tiết' })}
          </Button>
          
          <Button 
            onClick={onNext}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8"
          >
            {t({ english: 'Continue to Review', vietnamese: 'Tiếp tục đến Xem lại' })}
          </Button>
        </div>
      )}
    </div>
  );
};

export default SalonPlanSelectionSection;
