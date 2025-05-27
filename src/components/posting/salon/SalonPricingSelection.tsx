
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Star, Zap } from 'lucide-react';
import { SalonPricingOptions, SalonPricingTier, calculateSalonPostPrice } from '@/utils/posting/salonPricing';
import { useTranslation } from '@/hooks/useTranslation';

interface SalonPricingSelectionProps {
  selectedOptions: SalonPricingOptions;
  onOptionsChange: (options: SalonPricingOptions) => void;
}

const SalonPricingSelection: React.FC<SalonPricingSelectionProps> = ({
  selectedOptions,
  onOptionsChange
}) => {
  const { t } = useTranslation();

  const pricingPlans = [
    {
      id: 'basic' as SalonPricingTier,
      name: t({ english: 'Basic', vietnamese: 'Cơ bản' }),
      price: 19.99,
      duration: 30,
      icon: <Star className="h-5 w-5" />,
      features: [
        t({ english: 'Basic listing visibility', vietnamese: 'Hiển thị tin đăng cơ bản' }),
        t({ english: '30-day active period', vietnamese: 'Thời gian hoạt động 30 ngày' }),
        t({ english: 'Standard support', vietnamese: 'Hỗ trợ tiêu chuẩn' })
      ]
    },
    {
      id: 'standard' as SalonPricingTier,
      name: t({ english: 'Standard', vietnamese: 'Tiêu chuẩn' }),
      price: 24.99,
      duration: 30,
      icon: <Zap className="h-5 w-5" />,
      popular: true,
      features: [
        t({ english: 'Enhanced visibility', vietnamese: 'Hiển thị nâng cao' }),
        t({ english: 'Priority placement', vietnamese: 'Vị trí ưu tiên' }),
        t({ english: 'Photo gallery', vietnamese: 'Thư viện ảnh' }),
        t({ english: 'Priority support', vietnamese: 'Hỗ trợ ưu tiên' })
      ]
    },
    {
      id: 'featured' as SalonPricingTier,
      name: t({ english: 'Featured', vietnamese: 'Nổi bật' }),
      price: 39.99,
      duration: 30,
      icon: <Crown className="h-5 w-5" />,
      features: [
        t({ english: 'Maximum visibility', vietnamese: 'Hiển thị tối đa' }),
        t({ english: 'Top placement', vietnamese: 'Vị trí hàng đầu' }),
        t({ english: 'Featured badge', vietnamese: 'Huy hiệu nổi bật' }),
        t({ english: 'Premium support', vietnamese: 'Hỗ trợ cao cấp' }),
        t({ english: 'Social media boost', vietnamese: 'Tăng cường mạng xã hội' })
      ]
    },
    {
      id: 'premium' as SalonPricingTier,
      name: t({ english: 'Premium', vietnamese: 'Cao cấp' }),
      price: 59.99,
      duration: 30,
      icon: <Crown className="h-5 w-5" />,
      features: [
        t({ english: 'Ultimate visibility', vietnamese: 'Hiển thị tối ưu' }),
        t({ english: 'Guaranteed top spot', vietnamese: 'Đảm bảo vị trí hàng đầu' }),
        t({ english: 'Multiple badges', vietnamese: 'Nhiều huy hiệu' }),
        t({ english: 'Dedicated support', vietnamese: 'Hỗ trợ chuyên biệt' }),
        t({ english: 'Full marketing package', vietnamese: 'Gói marketing đầy đủ' })
      ]
    }
  ];

  const handlePlanSelect = (planId: SalonPricingTier) => {
    onOptionsChange({
      ...selectedOptions,
      selectedPricingTier: planId
    });
  };

  const currentPrice = calculateSalonPostPrice(selectedOptions);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">{t({ english: 'Choose Your Listing Plan', vietnamese: 'Chọn gói tin đăng' })}</h2>
        <p className="text-gray-600 mt-2">
          {t({ english: 'Select the plan that best fits your needs', vietnamese: 'Chọn gói phù hợp nhất với nhu cầu của bạn' })}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {pricingPlans.map((plan) => (
          <Card 
            key={plan.id}
            className={`relative cursor-pointer transition-all hover:shadow-lg ${
              selectedOptions.selectedPricingTier === plan.id 
                ? 'ring-2 ring-purple-500 border-purple-500' 
                : ''
            } ${plan.popular ? 'border-purple-200' : ''}`}
            onClick={() => handlePlanSelect(plan.id)}
          >
            {plan.popular && (
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-500">
                {t({ english: 'Popular', vietnamese: 'Phổ biến' })}
              </Badge>
            )}
            
            <CardHeader className="text-center pb-2">
              <div className="flex justify-center mb-2 text-purple-600">
                {plan.icon}
              </div>
              <CardTitle className="text-lg">{plan.name}</CardTitle>
              <div className="text-2xl font-bold text-purple-600">
                ${plan.price}
                <span className="text-sm font-normal text-gray-500">/{plan.duration}d</span>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start text-sm">
                    <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedOptions.selectedPricingTier && (
        <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
          <div className="flex justify-between items-center">
            <span className="font-medium text-purple-800">
              {t({ english: 'Selected Plan Total:', vietnamese: 'Tổng gói đã chọn:' })}
            </span>
            <span className="font-bold text-lg text-purple-600">
              ${currentPrice.toFixed(2)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalonPricingSelection;
