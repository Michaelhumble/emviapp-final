
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Star, Zap, Crown } from 'lucide-react';
import { SalonPricingOptions, DURATION_OPTIONS } from '@/utils/posting/salonPricing';

interface SalonPlanSelectionWithoutPricesProps {
  selectedOptions: SalonPricingOptions;
  onOptionsChange: (options: SalonPricingOptions) => void;
}

const SalonPlanSelectionWithoutPrices = ({ 
  selectedOptions, 
  onOptionsChange 
}: SalonPlanSelectionWithoutPricesProps) => {
  
  const plans = [
    {
      id: 'basic',
      name: 'Basic Plan / Gói Cơ Bản',
      icon: <CheckCircle className="w-6 h-6 text-blue-500" />,
      features: [
        'Standard listing visibility / Hiển thị tin đăng tiêu chuẩn',
        'Basic photo gallery / Thư viện ảnh cơ bản',
        'Contact information display / Hiển thị thông tin liên hệ',
        'Search engine optimization / Tối ưu hóa công cụ tìm kiếm'
      ],
      recommended: false
    },
    {
      id: 'standard',
      name: 'Standard Plan / Gói Tiêu Chuẩn',
      icon: <Star className="w-6 h-6 text-purple-500" />,
      features: [
        'Enhanced listing visibility / Tăng cường hiển thị tin đăng',
        'Premium photo gallery / Thư viện ảnh cao cấp',
        'Featured in search results / Nổi bật trong kết quả tìm kiếm',
        'Priority customer support / Hỗ trợ khách hàng ưu tiên',
        'Analytics dashboard / Bảng điều khiển phân tích'
      ],
      recommended: true
    },
    {
      id: 'featured',
      name: 'Featured Plan / Gói Nổi Bật',
      icon: <Crown className="w-6 h-6 text-gold-500" />,
      features: [
        'Maximum visibility / Hiển thị tối đa',
        'Top of search results / Đầu kết quả tìm kiếm',
        'Premium badge display / Hiển thị huy hiệu cao cấp',
        'Virtual tour integration / Tích hợp tour ảo',
        'Social media promotion / Quảng bá mạng xã hội',
        'Dedicated account manager / Quản lý tài khoản chuyên dụng'
      ],
      recommended: false
    }
  ];

  const handlePlanSelect = (planId: string) => {
    onOptionsChange({
      ...selectedOptions,
      selectedPricingTier: planId as any
    });
  };

  const handleDurationChange = (months: number) => {
    onOptionsChange({
      ...selectedOptions,
      durationMonths: months
    });
  };

  const handleAutoRenewToggle = () => {
    onOptionsChange({
      ...selectedOptions,
      autoRenew: !selectedOptions.autoRenew
    });
  };

  return (
    <div className="space-y-6">
      {/* Plan Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((plan) => (
          <Card 
            key={plan.id}
            className={`relative cursor-pointer transition-all hover:shadow-lg ${
              selectedOptions.selectedPricingTier === plan.id 
                ? 'ring-2 ring-purple-500 shadow-lg' 
                : 'hover:ring-1 hover:ring-gray-300'
            }`}
            onClick={() => handlePlanSelect(plan.id)}
          >
            {plan.recommended && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-purple-500 text-white">
                  Recommended / Khuyên Dùng
                </Badge>
              </div>
            )}
            
            <CardHeader className="text-center pb-2">
              <div className="flex justify-center mb-2">
                {plan.icon}
              </div>
              <CardTitle className="text-lg">{plan.name}</CardTitle>
            </CardHeader>
            
            <CardContent>
              <ul className="space-y-2 text-sm">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Duration Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Duration / Thời Hạn</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {DURATION_OPTIONS.map((option) => (
              <Button
                key={option.months}
                variant={selectedOptions.durationMonths === option.months ? "default" : "outline"}
                onClick={() => handleDurationChange(option.months)}
                className="h-auto py-3 px-4 flex flex-col items-center gap-1"
              >
                <span className="font-semibold">{option.label}</span>
                {option.discount > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {option.discount}% off / giảm {option.discount}%
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Auto-Renewal Option */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-orange-500" />
              <div>
                <h4 className="font-medium">Auto-Renewal / Tự Động Gia Hạn</h4>
                <p className="text-sm text-gray-600">
                  Save with automatic renewal / Tiết kiệm với gia hạn tự động
                </p>
              </div>
            </div>
            <Button
              variant={selectedOptions.autoRenew ? "default" : "outline"}
              onClick={handleAutoRenewToggle}
              size="sm"
            >
              {selectedOptions.autoRenew ? 'Enabled / Đã Bật' : 'Enable / Bật'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalonPlanSelectionWithoutPrices;
