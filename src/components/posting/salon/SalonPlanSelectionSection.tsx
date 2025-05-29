import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Crown, Zap, Sparkles } from 'lucide-react';
import { salonPricingPlans, type SalonPricingTier, getSalonPostPricingSummary, DURATION_OPTIONS } from '@/utils/posting/salonPricing';
import { useTranslation } from '@/hooks/useTranslation';

interface SalonPlanSelectionSectionProps {
  selectedTier: SalonPricingTier;
  onTierChange: (tier: SalonPricingTier) => void;
  durationMonths?: number;
  onDurationChange?: (months: number) => void;
  autoRenew?: boolean;
  onAutoRenewChange?: (enabled: boolean) => void;
}

const SalonPlanSelectionSection: React.FC<SalonPlanSelectionSectionProps> = ({
  selectedTier,
  onTierChange,
  durationMonths = 1,
  onDurationChange,
  autoRenew = false,
  onAutoRenewChange
}) => {
  const { t } = useTranslation();

  const getIcon = (tier: SalonPricingTier) => {
    switch (tier) {
      case 'free': return <Zap className="h-6 w-6" />;
      case 'standard': return <Star className="h-6 w-6" />;
      case 'premium': return <Crown className="h-6 w-6" />;
      case 'featured': return <Sparkles className="h-6 w-6" />;
      default: return <Zap className="h-6 w-6" />;
    }
  };

  const handleSelectPlan = (tier: SalonPricingTier) => {
    onTierChange(tier);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 font-playfair">
          {t({
            english: 'Choose Your Listing Plan',
            vietnamese: 'Chọn Gói Đăng Tin'
          })}
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {t({
            english: 'Select the right plan to reach your target buyers effectively.',
            vietnamese: 'Chọn gói phù hợp để salon của bạn tiếp cận đúng đối tượng khách hàng.'
          })}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {salonPricingPlans.map((plan) => (
          <Card 
            key={plan.id} 
            className={`relative ${plan.color} ${plan.popular ? 'ring-2 ring-purple-500 scale-105' : ''} ${
              selectedTier === plan.id ? 'ring-2 ring-green-500' : ''
            } hover:shadow-lg transition-all duration-200`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-purple-600 text-white">
                  {t({
                    english: 'Most Popular',
                    vietnamese: 'Phổ Biến'
                  })}
                </Badge>
              </div>
            )}
            
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-2">
                {getIcon(plan.id)}
              </div>
              <CardTitle className="text-lg font-bold">{plan.name}</CardTitle>
              <div className="text-2xl font-bold text-gray-900">
                {plan.price === 0 ? t({
                  english: 'Free',
                  vietnamese: 'Miễn Phí'
                }) : `$${plan.price}`}
              </div>
              <div className="text-sm text-gray-600">
                {t({
                  english: `${plan.duration} month${plan.duration > 1 ? 's' : ''}`,
                  vietnamese: `${plan.duration} tháng`
                })}
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => handleSelectPlan(plan)}
                className={`w-full ${plan.buttonColor} text-white`}
                disabled={selectedTier === plan.id}
              >
                {selectedTier === plan.id ? t({
                  english: 'Selected',
                  vietnamese: 'Đã Chọn'
                }) : t({
                  english: 'Select Plan',
                  vietnamese: 'Chọn Gói'
                })}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 text-center text-sm text-gray-600 bg-blue-50 p-4 rounded-lg">
        <p className="mb-2">
          💡 <strong>{t({
            english: 'Tip:',
            vietnamese: 'Lời khuyên:'
          })}</strong> {t({
            english: 'Premium plans help your salon appear at the top and attract more serious buyers.',
            vietnamese: 'Gói cao cấp giúp salon của bạn xuất hiện ở vị trí đầu và thu hút nhiều người mua hơn.'
          })}
        </p>
      </div>
    </div>
  );
};

export default SalonPlanSelectionSection;
