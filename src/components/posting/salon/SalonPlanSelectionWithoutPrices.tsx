
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Crown } from 'lucide-react';
import { DURATION_OPTIONS, type SalonPricingTier } from '@/utils/posting/salonPricing';

interface SalonPlanSelectionWithoutPricesProps {
  onPricingSelect: (tier: SalonPricingTier, finalPrice: number) => void;
  selectedTier?: SalonPricingTier;
}

const SalonPlanSelectionWithoutPrices: React.FC<SalonPlanSelectionWithoutPricesProps> = ({
  onPricingSelect,
  selectedTier
}) => {
  const [selectedDuration, setSelectedDuration] = useState(3);
  const [featuredAddOn, setFeaturedAddOn] = useState(false);

  const calculatePrice = (duration: number, withFeatured: boolean) => {
    const durationOption = DURATION_OPTIONS.find(d => d.months === duration);
    const basePrice = durationOption?.price || 19.99;
    const featuredCost = withFeatured ? duration * 10 : 0;
    return basePrice + featuredCost;
  };

  const handleSelectPlan = () => {
    const finalPrice = calculatePrice(selectedDuration, featuredAddOn);
    onPricingSelect('standard', finalPrice);
  };

  const getSavingsText = (duration: number) => {
    if (duration === 6) return 'Tiết kiệm 25% / Save 25%';
    if (duration === 12) return 'Tiết kiệm 30% / Save 30%';
    return '';
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 font-playfair">
          Chọn Gói Đăng Tin / Choose Your Listing Plan
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Chọn thời hạn phù hợp để salon của bạn tiếp cận đúng đối tượng khách hàng.
          <br />
          Select the right duration to reach your target buyers effectively.
        </p>
      </div>

      {/* Duration Selection */}
      <Card className="border-blue-300">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-2">
            <Star className="h-6 w-6 text-blue-600" />
          </div>
          <CardTitle className="text-lg font-bold">
            Standard Listing / Đăng Tin Cơ Bản
          </CardTitle>
          <Badge className="bg-blue-600 text-white mx-auto">
            Phổ Biến / Most Popular
          </Badge>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Duration Options */}
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">
              Chọn thời hạn / Select Duration:
            </h4>
            {DURATION_OPTIONS.map((option) => (
              <div key={option.months} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                <label className="flex items-center cursor-pointer flex-1">
                  <input
                    type="radio"
                    name="duration"
                    value={option.months}
                    checked={selectedDuration === option.months}
                    onChange={() => setSelectedDuration(option.months)}
                    className="mr-3"
                  />
                  <div className="flex-1">
                    <div className="font-medium">{option.label}</div>
                    {getSavingsText(option.months) && (
                      <div className="text-sm text-green-600 font-medium">
                        {getSavingsText(option.months)}
                      </div>
                    )}
                  </div>
                </label>
                <div className="text-right">
                  <div className="font-bold text-lg">${option.price}</div>
                  <div className="text-sm text-gray-500">
                    ${(option.price / option.months).toFixed(2)}/tháng
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Featured Add-on */}
          <div className="border-t pt-4">
            <div className="flex items-center justify-between p-3 border rounded-lg bg-yellow-50 border-yellow-200">
              <label className="flex items-center cursor-pointer flex-1">
                <input
                  type="checkbox"
                  checked={featuredAddOn}
                  onChange={(e) => setFeaturedAddOn(e.target.checked)}
                  className="mr-3"
                />
                <div className="flex-1">
                  <div className="font-medium flex items-center">
                    <Crown className="h-4 w-4 text-yellow-600 mr-2" />
                    Featured Add-On / Nổi Bật
                  </div>
                  <div className="text-sm text-gray-600">
                    Highlighted placement, "Featured" badge
                    <br />
                    Vị trí nổi bật, huy hiệu "Đặc biệt"
                  </div>
                </div>
              </label>
              <div className="text-right">
                <div className="font-bold text-lg">+$10/month</div>
                <div className="text-sm text-gray-500">
                  +${selectedDuration * 10} total
                </div>
              </div>
            </div>
          </div>

          {/* Features List */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">
              Bao gồm / Includes:
            </h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">
                  Basic salon listing / Đăng tin cơ bản
                </span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">
                  Search visibility / Hiển thị trong tìm kiếm
                </span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">
                  Contact information display / Hiển thị thông tin liên hệ
                </span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">
                  Photo gallery / Thư viện hình ảnh
                </span>
              </li>
              {featuredAddOn && (
                <li className="flex items-start">
                  <Crown className="h-4 w-4 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">
                    Featured placement & badge / Vị trí nổi bật & huy hiệu
                  </span>
                </li>
              )}
            </ul>
          </div>

          {/* Total Price */}
          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-medium">Total / Tổng cộng:</span>
              <span className="text-2xl font-bold text-blue-600">
                ${calculatePrice(selectedDuration, featuredAddOn).toFixed(2)}
              </span>
            </div>
            
            <Button
              onClick={handleSelectPlan}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={selectedTier === 'standard'}
            >
              {selectedTier === 'standard' ? 'Đã Chọn / Selected' : 'Chọn Gói / Select Plan'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 text-center text-sm text-gray-600 bg-blue-50 p-4 rounded-lg">
        <p className="mb-2">
          💡 <strong>Lời khuyên:</strong> Gói dài hạn giúp tiết kiệm chi phí và duy trì hiển thị ổn định.
        </p>
        <p>
          💡 <strong>Tip:</strong> Longer plans help save costs and maintain stable visibility.
        </p>
      </div>
    </div>
  );
};

export default SalonPlanSelectionWithoutPrices;
