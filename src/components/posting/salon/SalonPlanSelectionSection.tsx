
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Check, Star, Zap } from "lucide-react";
import { SalonPricingOptions, DURATION_OPTIONS, getSalonPostPricingSummary } from "@/utils/posting/salonPricing";

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
  hideNavigation = false
}) => {
  const pricingSummary = getSalonPostPricingSummary(selectedOptions);

  const handleTierChange = (tier: 'basic' | 'standard' | 'featured') => {
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

  const planOptions = [
    {
      id: 'basic',
      name: 'Basic',
      vietnameseName: 'Cơ bản',
      price: 19.99,
      features: [
        'Standard listing visibility / Hiển thị tiêu chuẩn',
        'Basic photo gallery / Thư viện ảnh cơ bản',
        'Contact information display / Hiển thị thông tin liên hệ',
        '30-day support / Hỗ trợ 30 ngày'
      ]
    },
    {
      id: 'standard',
      name: 'Standard',
      vietnameseName: 'Tiêu chuẩn',
      price: 24.99,
      popular: true,
      features: [
        'Enhanced listing visibility / Hiển thị nâng cao',
        'Premium photo gallery / Thư viện ảnh cao cấp',
        'Priority in search results / Ưu tiên trong kết quả tìm kiếm',
        'Featured badge / Huy hiệu nổi bật',
        'Extended support / Hỗ trợ mở rộng'
      ]
    },
    {
      id: 'featured',
      name: 'Featured',
      vietnameseName: 'Nổi bật',
      price: 39.99,
      premium: true,
      features: [
        'Maximum visibility / Hiển thị tối đa',
        'Top placement in listings / Vị trí hàng đầu',
        'Premium photo gallery / Thư viện ảnh cao cấp',
        'Social media promotion / Quảng bá mạng xã hội',
        'Dedicated account manager / Quản lý tài khoản riêng',
        'Priority customer support / Hỗ trợ khách hàng ưu tiên'
      ]
    }
  ];

  return (
    <div className="space-y-8">
      {/* Plan Selection */}
      <div>
        <h3 className="text-xl font-semibold mb-4">
          Chọn Gói Đăng Tin / Select Listing Plan
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          {planOptions.map((plan) => (
            <Card 
              key={plan.id}
              className={`relative cursor-pointer transition-all ${
                selectedOptions.selectedPricingTier === plan.id
                  ? 'ring-2 ring-purple-500 border-purple-200'
                  : 'hover:border-purple-200'
              } ${plan.popular ? 'border-purple-300' : ''}`}
              onClick={() => handleTierChange(plan.id as any)}
            >
              {plan.popular && (
                <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-purple-600">
                  <Star className="w-3 h-3 mr-1" />
                  Phổ biến / Popular
                </Badge>
              )}
              {plan.premium && (
                <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-500 to-orange-500">
                  <Zap className="w-3 h-3 mr-1" />
                  Cao cấp / Premium
                </Badge>
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="text-lg">
                  {plan.name} / {plan.vietnameseName}
                </CardTitle>
                <div className="text-3xl font-bold text-purple-600">
                  ${plan.price}
                  <span className="text-sm text-gray-500 font-normal">/tháng</span>
                </div>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Duration Selection */}
      <div>
        <h3 className="text-xl font-semibold mb-4">
          Chọn Thời Hạn / Select Duration
        </h3>
        <RadioGroup
          value={selectedOptions.durationMonths?.toString()}
          onValueChange={(value) => handleDurationChange(parseInt(value))}
          className="grid md:grid-cols-2 gap-4"
        >
          {DURATION_OPTIONS.map((option) => (
            <div key={option.months} className="flex items-center space-x-2">
              <RadioGroupItem value={option.months.toString()} id={`duration-${option.months}`} />
              <Label 
                htmlFor={`duration-${option.months}`}
                className="flex-1 cursor-pointer flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50"
              >
                <span>{option.label}</span>
                {option.discount > 0 && (
                  <Badge variant="secondary" className="text-green-600 bg-green-50">
                    Tiết kiệm {option.discount}% / Save {option.discount}%
                  </Badge>
                )}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Auto-renew Option */}
      <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
        <div>
          <h4 className="font-medium">Tự động gia hạn / Auto-renew</h4>
          <p className="text-sm text-gray-600">
            Tiết kiệm 5% và không bao giờ lo tin đăng hết hạn / 
            Save 5% and never worry about expiring listings
          </p>
        </div>
        <Switch
          checked={selectedOptions.autoRenew || false}
          onCheckedChange={handleAutoRenewChange}
        />
      </div>

      {/* Pricing Summary */}
      <Card className="border-purple-200 bg-purple-50">
        <CardHeader>
          <CardTitle className="text-purple-700">
            Tóm Tắt Giá / Pricing Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Giá gốc / Base price:</span>
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
            
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Tổng cộng / Total:</span>
              <span className="text-purple-600">${pricingSummary.finalPrice.toFixed(2)}</span>
            </div>
            
            <p className="text-sm text-gray-600 mt-2">
              Hiệu lực {selectedOptions.durationMonths} tháng / 
              Valid for {selectedOptions.durationMonths} month{selectedOptions.durationMonths && selectedOptions.durationMonths > 1 ? 's' : ''}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Navigation - only show if not hidden */}
      {!hideNavigation && (
        <div className="flex justify-between">
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
