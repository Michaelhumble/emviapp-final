
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';
import { SalonPricingOptions, SalonPricingTier, DURATION_OPTIONS, getSalonPostPricingSummary } from '@/utils/posting/salonPricing';

interface SalonPlanSelectionSectionProps {
  selectedOptions: SalonPricingOptions;
  onOptionsChange: (options: SalonPricingOptions) => void;
  onNext?: () => void;
  onBack?: () => void;
  hideNavigation?: boolean;
}

const SalonPlanSelectionSection: React.FC<SalonPlanSelectionSectionProps> = ({
  selectedOptions,
  onOptionsChange,
  onNext,
  onBack,
  hideNavigation = false
}) => {
  const handleTierChange = (tier: SalonPricingTier) => {
    onOptionsChange({
      ...selectedOptions,
      selectedPricingTier: tier
    });
  };

  const handleDurationChange = (months: number) => {
    onOptionsChange({
      ...selectedOptions,
      durationMonths: months
    });
  };

  const handleAutoRenewChange = (autoRenew: boolean) => {
    onOptionsChange({
      ...selectedOptions,
      autoRenew
    });
  };

  const pricingSummary = getSalonPostPricingSummary(selectedOptions);

  const tiers: { id: SalonPricingTier; name: string; vietnameseName: string; features: string[] }[] = [
    {
      id: 'basic',
      name: 'Basic Listing',
      vietnameseName: 'Gói Cơ Bản',
      features: ['Standard visibility', 'Basic support', 'Photo gallery']
    },
    {
      id: 'standard', 
      name: 'Standard Listing',
      vietnameseName: 'Gói Tiêu Chuẩn',
      features: ['Enhanced visibility', 'Priority support', 'Featured photos', 'Social media promotion']
    },
    {
      id: 'featured',
      name: 'Featured Listing', 
      vietnameseName: 'Gói Nổi Bật',
      features: ['Premium placement', 'Dedicated support', 'Professional photos', 'Marketing boost', 'Top search results']
    }
  ];

  return (
    <div className="space-y-6">
      {/* Plan Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Chọn Gói Đăng Tin / Select Plan</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tiers.map((tier) => (
            <Card 
              key={tier.id}
              className={`cursor-pointer transition-all ${
                selectedOptions.selectedPricingTier === tier.id 
                  ? 'border-purple-500 bg-purple-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handleTierChange(tier.id)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-sm font-medium">{tier.vietnameseName}</CardTitle>
                    <p className="text-xs text-gray-600">{tier.name}</p>
                  </div>
                  {selectedOptions.selectedPricingTier === tier.id && (
                    <CheckCircle className="h-5 w-5 text-purple-600" />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-xs text-gray-600">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Duration Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Thời Hạn Đăng Tin / Duration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {DURATION_OPTIONS.map((option) => (
            <Card 
              key={option.months}
              className={`cursor-pointer transition-all ${
                selectedOptions.durationMonths === option.months 
                  ? 'border-purple-500 bg-purple-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handleDurationChange(option.months)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-medium text-sm">{option.label}</p>
                    <p className="text-xs text-gray-600">{option.days} ngày / {option.days} days</p>
                  </div>
                  {selectedOptions.durationMonths === option.months && (
                    <CheckCircle className="h-4 w-4 text-purple-600" />
                  )}
                </div>
                {option.discount > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    Tiết kiệm {option.discount}% / Save {option.discount}%
                  </Badge>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Auto-Renew Option */}
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium">Tự Động Gia Hạn / Auto-Renew</h4>
            <p className="text-sm text-gray-600">
              Tiết kiệm thêm 5% khi bật tự động gia hạn / Save an additional 5% with auto-renew
            </p>
          </div>
          <Switch
            checked={selectedOptions.autoRenew || false}
            onCheckedChange={handleAutoRenewChange}
          />
        </div>
      </div>

      {/* Pricing Summary */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-lg text-blue-800">
            Tổng Kết Giá / Pricing Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Gói cơ bản / Base price:</span>
              <span>${pricingSummary.basePrice.toFixed(2)}/tháng</span>
            </div>
            <div className="flex justify-between">
              <span>Thời hạn / Duration:</span>
              <span>{pricingSummary.durationMonths} tháng / {pricingSummary.durationMonths} months</span>
            </div>
            <div className="flex justify-between">
              <span>Tổng phụ / Subtotal:</span>
              <span>${pricingSummary.subtotal.toFixed(2)}</span>
            </div>
            {pricingSummary.durationDiscount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Giảm giá thời hạn / Duration discount:</span>
                <span>-${pricingSummary.durationDiscount.toFixed(2)}</span>
              </div>
            )}
            {pricingSummary.autoRenewDiscount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Giảm giá tự động gia hạn / Auto-renew discount:</span>
                <span>-${pricingSummary.autoRenewDiscount.toFixed(2)}</span>
              </div>
            )}
            <div className="border-t pt-2 flex justify-between font-semibold text-lg">
              <span>Tổng cộng / Total:</span>
              <span className="text-purple-600">${pricingSummary.finalPrice.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      {!hideNavigation && (
        <div className="flex justify-between pt-6">
          <Button variant="outline" onClick={onBack}>
            Quay lại / Back
          </Button>
          <Button onClick={onNext} className="bg-purple-600 hover:bg-purple-700">
            Tiếp tục / Continue
          </Button>
        </div>
      )}
    </div>
  );
};

export default SalonPlanSelectionSection;
