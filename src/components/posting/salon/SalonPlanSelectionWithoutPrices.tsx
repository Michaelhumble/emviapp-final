
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Zap } from 'lucide-react';
import { SalonPricingOptions, DURATION_OPTIONS, getSalonPostPricingSummary } from '@/utils/posting/salonPricing';

interface SalonPlanSelectionWithoutPricesProps {
  selectedOptions: SalonPricingOptions;
  onOptionsChange: (options: SalonPricingOptions) => void;
}

const SalonPlanSelectionWithoutPrices: React.FC<SalonPlanSelectionWithoutPricesProps> = ({
  selectedOptions,
  onOptionsChange
}) => {
  const handlePlanSelect = (tier: 'basic' | 'featured') => {
    onOptionsChange({
      ...selectedOptions,
      selectedPricingTier: tier
    });
  };

  const handleDurationSelect = (months: number) => {
    onOptionsChange({
      ...selectedOptions,
      durationMonths: months
    });
  };

  const pricingSummary = getSalonPostPricingSummary(selectedOptions);

  return (
    <div className="space-y-8">
      {/* Plan Selection */}
      <div>
        <h3 className="text-lg font-medium mb-4">Choose Your Plan / Chọn Gói Của Bạn</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Plan */}
          <Card className={`cursor-pointer transition-all ${
            selectedOptions.selectedPricingTier === 'basic' 
              ? 'ring-2 ring-purple-500 border-purple-500' 
              : 'hover:border-purple-300'
          }`} onClick={() => handlePlanSelect('basic')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                Basic Listing / Tin Cơ Bản
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  Standard visibility / Hiển thị tiêu chuẩn
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  Photo gallery / Thư viện ảnh
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  Contact information / Thông tin liên hệ
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  Basic search results / Kết quả tìm kiếm cơ bản
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Featured Plan */}
          <Card className={`cursor-pointer transition-all ${
            selectedOptions.selectedPricingTier === 'featured' 
              ? 'ring-2 ring-purple-500 border-purple-500' 
              : 'hover:border-purple-300'
          }`} onClick={() => handlePlanSelect('featured')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                Featured Listing / Tin Nổi Bật
                <Badge variant="outline" className="text-purple-600">
                  <Zap className="w-3 h-3 mr-1" />
                  Popular / Phổ biến
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  Everything in Basic / Mọi thứ trong gói Cơ bản
                </li>
                <li className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  Priority placement / Vị trí ưu tiên
                </li>
                <li className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  Highlighted in search / Nổi bật trong tìm kiếm
                </li>
                <li className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  Featured badge / Huy hiệu nổi bật
                </li>
                <li className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  Social media promotion / Quảng bá mạng xã hội
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Duration Selection */}
      <div>
        <h3 className="text-lg font-medium mb-4">Duration / Thời Hạn</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {DURATION_OPTIONS.map((option) => {
            const isSelected = selectedOptions.durationMonths === option.months;
            return (
              <Card 
                key={option.months}
                className={`cursor-pointer transition-all ${
                  isSelected 
                    ? 'ring-2 ring-purple-500 border-purple-500 bg-purple-50' 
                    : 'hover:border-purple-300'
                }`}
                onClick={() => handleDurationSelect(option.months)}
              >
                <CardContent className="p-4 text-center">
                  <div className="font-medium">{option.label}</div>
                  {option.discount > 0 && (
                    <Badge variant="outline" className="mt-2 text-green-600 border-green-600">
                      Save {option.discount}% / Tiết kiệm {option.discount}%
                    </Badge>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Pricing Summary */}
      {selectedOptions.selectedPricingTier && selectedOptions.durationMonths && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium mb-4">Pricing Summary / Tóm Tắt Giá</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">
                {selectedOptions.selectedPricingTier === 'basic' ? 'Basic Listing' : 'Featured Listing'} 
                {' '}({selectedOptions.durationMonths} month{selectedOptions.durationMonths > 1 ? 's' : ''})
              </span>
              <div className="text-right">
                <span className="text-lg font-bold text-purple-600">
                  ${pricingSummary.finalPrice.toFixed(2)}
                </span>
                <div className="text-sm text-gray-500">
                  <span className="line-through">${pricingSummary.originalPrice.toFixed(2)}</span>
                  <span className="ml-2 text-green-600 font-medium">
                    Save {pricingSummary.savingsPercentage}%
                  </span>
                </div>
              </div>
            </div>
            
            <div className="pt-3 border-t">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total / Tổng Cộng:</span>
                <span className="text-purple-600">${pricingSummary.finalPrice.toFixed(2)}</span>
              </div>
              <p className="text-sm text-green-600 text-right">
                You save ${pricingSummary.savingsAmount.toFixed(2)} / Bạn tiết kiệm ${pricingSummary.savingsAmount.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalonPlanSelectionWithoutPrices;
