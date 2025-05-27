
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
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
  const planOptions = [
    {
      id: 'basic' as const,
      name: 'Cơ bản / Basic',
      price: 19.99,
      features: [
        'Đăng tin cơ bản / Basic listing',
        'Hiển thị 30 ngày / 30-day visibility',
        'Thông tin liên hệ / Contact information'
      ]
    },
    {
      id: 'standard' as const,
      name: 'Tiêu chuẩn / Standard',
      price: 24.99,
      popular: true,
      features: [
        'Tất cả tính năng Cơ bản / All Basic features',
        'Hỗ trợ ưu tiên / Priority support',
        'Thống kê xem / View analytics',
        'Nổi bật trong kết quả tìm kiếm / Featured in search'
      ]
    },
    {
      id: 'featured' as const,
      name: 'Nổi bật / Featured',
      price: 39.99,
      premium: true,
      features: [
        'Tất cả tính năng Tiêu chuẩn / All Standard features',
        'Hiển thị đầu trang / Top of page display',
        'Nhãn "Nổi bật" / "Featured" badge',
        'Hỗ trợ marketing / Marketing support',
        'Ưu tiên trong email / Priority in emails'
      ]
    }
  ];

  const handlePlanSelect = (planId: 'basic' | 'standard' | 'featured') => {
    onOptionsChange({
      ...selectedOptions,
      selectedPricingTier: planId
    });
  };

  const handleDurationSelect = (months: number) => {
    onOptionsChange({
      ...selectedOptions,
      durationMonths: months
    });
  };

  const handleAutoRenewToggle = (autoRenew: boolean) => {
    onOptionsChange({
      ...selectedOptions,
      autoRenew
    });
  };

  const currentSummary = getSalonPostPricingSummary(selectedOptions);

  return (
    <div className="space-y-8">
      {/* Plan Selection */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Chọn Gói Đăng Tin / Select Listing Plan</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {planOptions.map((plan) => (
            <Card 
              key={plan.id}
              className={`cursor-pointer transition-all duration-200 ${
                selectedOptions.selectedPricingTier === plan.id 
                  ? 'ring-2 ring-purple-500 border-purple-200' 
                  : 'hover:border-purple-200'
              }`}
              onClick={() => handlePlanSelect(plan.id)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{plan.name}</CardTitle>
                  <div className="flex gap-1">
                    {plan.popular && (
                      <Badge className="bg-blue-100 text-blue-700">
                        <Star className="w-3 h-3 mr-1" />
                        Phổ biến / Popular
                      </Badge>
                    )}
                    {plan.premium && (
                      <Badge className="bg-purple-100 text-purple-700">
                        <Zap className="w-3 h-3 mr-1" />
                        Cao cấp / Premium
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="text-2xl font-bold">${plan.price}<span className="text-sm text-gray-500">/tháng</span></div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
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
      <div>
        <h3 className="text-xl font-semibold mb-4">Chọn Thời Hạn / Select Duration</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {DURATION_OPTIONS.map((duration) => {
            const isSelected = selectedOptions.durationMonths === duration.months;
            const basePrice = planOptions.find(p => p.id === selectedOptions.selectedPricingTier)?.price || 0;
            const totalPrice = basePrice * duration.months;
            const discountedPrice = totalPrice * (1 - duration.discount / 100);
            
            return (
              <Card 
                key={duration.months}
                className={`cursor-pointer transition-all duration-200 ${
                  isSelected 
                    ? 'ring-2 ring-purple-500 border-purple-200 bg-purple-50' 
                    : 'hover:border-purple-200'
                }`}
                onClick={() => handleDurationSelect(duration.months)}
              >
                <CardContent className="p-4 text-center">
                  <div className="font-semibold text-lg mb-2">{duration.label}</div>
                  <div className="space-y-1">
                    {duration.discount > 0 ? (
                      <>
                        <div className="text-sm text-gray-500 line-through">${totalPrice.toFixed(2)}</div>
                        <div className="text-xl font-bold text-green-600">${discountedPrice.toFixed(2)}</div>
                        <Badge className="bg-green-100 text-green-700 text-xs">
                          Tiết kiệm {duration.discount}% / Save {duration.discount}%
                        </Badge>
                      </>
                    ) : (
                      <div className="text-xl font-bold">${totalPrice.toFixed(2)}</div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Auto-Renew Option */}
      <div>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold">Tự động gia hạn / Auto-Renew</h4>
              <p className="text-sm text-gray-600">
                Tiết kiệm thêm 5% khi bật tự động gia hạn / Save an additional 5% with auto-renew
              </p>
            </div>
            <Switch
              checked={selectedOptions.autoRenew || false}
              onCheckedChange={handleAutoRenewToggle}
            />
          </div>
        </Card>
      </div>

      {/* Pricing Summary */}
      <div>
        <Card className="bg-gray-50">
          <CardHeader>
            <CardTitle>Tóm tắt giá / Pricing Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span>Gói cơ bản / Base plan</span>
              <span>${currentSummary.basePrice} x {currentSummary.durationMonths} tháng</span>
            </div>
            <div className="flex justify-between">
              <span>Tổng phụ / Subtotal</span>
              <span>${currentSummary.subtotal.toFixed(2)}</span>
            </div>
            {currentSummary.durationDiscount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Giảm giá thời hạn / Duration discount</span>
                <span>-${currentSummary.durationDiscount.toFixed(2)}</span>
              </div>
            )}
            {currentSummary.autoRenewDiscount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Giảm giá tự động gia hạn / Auto-renew discount</span>
                <span>-${currentSummary.autoRenewDiscount.toFixed(2)}</span>
              </div>
            )}
            <hr className="my-2" />
            <div className="flex justify-between font-bold text-lg">
              <span>Tổng cộng / Total</span>
              <span>${currentSummary.finalPrice.toFixed(2)}</span>
            </div>
            {currentSummary.discountPercentage > 0 && (
              <div className="text-center text-green-600 font-medium">
                Bạn tiết kiệm được {currentSummary.discountPercentage}% / You save {currentSummary.discountPercentage}%
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Navigation */}
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
