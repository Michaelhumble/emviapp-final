
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Star, Zap } from 'lucide-react';
import { SalonPricingOptions, SalonPricingTier } from '@/utils/posting/salonPricing';
import { useTranslation } from '@/hooks/useTranslation';

interface SalonPlanSelectionSectionProps {
  selectedOptions: SalonPricingOptions;
  onOptionsChange: (options: SalonPricingOptions) => void;
  onNext: () => void;
  onBack: () => void;
}

const SalonPlanSelectionSection: React.FC<SalonPlanSelectionSectionProps> = ({
  selectedOptions,
  onOptionsChange,
  onNext,
  onBack
}) => {
  const { t } = useTranslation();

  const plans = [
    {
      id: 'basic' as SalonPricingTier,
      name: t({ english: 'Basic Listing', vietnamese: 'Tin đăng cơ bản' }),
      price: 19.99,
      duration: 30,
      icon: <Star className="h-5 w-5" />,
      features: [
        t({ english: 'Basic salon listing', vietnamese: 'Tin đăng salon cơ bản' }),
        t({ english: '30-day visibility', vietnamese: 'Hiển thị 30 ngày' }),
        t({ english: 'Contact information', vietnamese: 'Thông tin liên hệ' })
      ]
    },
    {
      id: 'standard' as SalonPricingTier,
      name: t({ english: 'Standard Listing', vietnamese: 'Tin đăng tiêu chuẩn' }),
      price: 24.99,
      duration: 30,
      icon: <Zap className="h-5 w-5" />,
      popular: true,
      features: [
        t({ english: 'Enhanced salon listing', vietnamese: 'Tin đăng salon nâng cao' }),
        t({ english: '30-day priority visibility', vietnamese: 'Hiển thị ưu tiên 30 ngày' }),
        t({ english: 'Photo gallery', vietnamese: 'Thư viện ảnh' }),
        t({ english: 'Detailed description', vietnamese: 'Mô tả chi tiết' })
      ]
    },
    {
      id: 'featured' as SalonPricingTier,
      name: t({ english: 'Featured Listing', vietnamese: 'Tin đăng nổi bật' }),
      price: 39.99,
      duration: 30,
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

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">{t({ english: 'Choose Your Plan', vietnamese: 'Chọn gói của bạn' })}</h2>
        <p className="text-gray-600 mt-2">
          {t({ english: 'Select the best plan for your salon listing', vietnamese: 'Chọn gói tốt nhất cho tin đăng salon của bạn' })}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
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
              <div className="text-3xl font-bold text-purple-600">
                ${plan.price}
                <span className="text-sm font-normal text-gray-500">/{plan.duration} days</span>
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
        ))}
      </div>

      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onBack}>
          {t({ english: 'Back', vietnamese: 'Quay lại' })}
        </Button>
        <Button 
          onClick={onNext}
          disabled={!selectedOptions.selectedPricingTier}
          className="bg-purple-600 hover:bg-purple-700"
        >
          {t({ english: 'Continue to Payment', vietnamese: 'Tiếp tục thanh toán' })}
        </Button>
      </div>
    </div>
  );
};

export default SalonPlanSelectionSection;
