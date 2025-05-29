
import React from 'react';
import { SalonPricingOptions } from '@/utils/posting/salonPricing';
import { CheckCircle, Star, Zap, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

interface SalonPricingStepProps {
  pricingOptions: SalonPricingOptions;
  setPricingOptions: React.Dispatch<React.SetStateAction<SalonPricingOptions>>;
}

const PRICING_PLANS = [
  {
    months: 1,
    originalPrice: 24.99,
    discountPrice: 19.99,
    savings: 20,
    isFirstTime: true,
    popular: false
  },
  {
    months: 3,
    originalPrice: 74.99,
    discountPrice: 54.99,
    savings: 27,
    isFirstTime: false,
    popular: true
  },
  {
    months: 6,
    originalPrice: 149.99,
    discountPrice: 99.99,
    savings: 33,
    isFirstTime: false,
    popular: false
  },
  {
    months: 12,
    originalPrice: 300.00,
    discountPrice: 145.99,
    savings: 51,
    isFirstTime: false,
    popular: false
  }
];

const SalonPricingStep = ({ pricingOptions, setPricingOptions }: SalonPricingStepProps) => {
  const selectedPlan = PRICING_PLANS.find(plan => plan.months === pricingOptions.durationMonths) || PRICING_PLANS[1];
  const featuredCost = pricingOptions.featuredAddOn ? (pricingOptions.durationMonths || 3) * 10 : 0;
  const totalPrice = selectedPlan.discountPrice + featuredCost;

  const handlePlanSelect = (months: number) => {
    setPricingOptions(prev => ({
      ...prev,
      durationMonths: months
    }));
  };

  const handleFeaturedToggle = (checked: boolean) => {
    setPricingOptions(prev => ({
      ...prev,
      featuredAddOn: checked
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-purple-100 p-3 rounded-full">
            <Star className="w-6 h-6 text-purple-600" />
          </div>
          <span className="ml-3 text-xl font-medium">💎 Choose Your Plan / Chọn gói của bạn</span>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Select the perfect listing duration to maximize your salon's exposure and connect with serious buyers.
          <br />
          <span className="text-purple-600 font-medium">
          Chọn thời gian đăng tin hoàn hảo để tối đa hóa sự tiếp xúc của salon và kết nối với người mua nghiêm túc.
          </span>
        </p>
      </div>

      {/* Pricing Plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {PRICING_PLANS.map((plan) => (
          <div
            key={plan.months}
            className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all ${
              pricingOptions.durationMonths === plan.months
                ? 'border-purple-500 bg-purple-50'
                : 'border-gray-200 hover:border-purple-300'
            } ${plan.popular ? 'ring-2 ring-purple-500' : ''}`}
            onClick={() => handlePlanSelect(plan.months)}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                  Most Popular / Phổ biến nhất
                </span>
              </div>
            )}
            
            <div className="text-center">
              <h3 className="font-bold text-lg mb-2">
                {plan.months} Month{plan.months > 1 ? 's' : ''} / {plan.months} Tháng
              </h3>
              
              <div className="mb-3">
                <div className="text-2xl font-bold text-purple-600">
                  ${plan.discountPrice}
                </div>
                {plan.originalPrice !== plan.discountPrice && (
                  <div className="text-sm text-gray-500">
                    <span className="line-through">${plan.originalPrice}</span>
                    <span className="text-green-600 ml-2">Save {plan.savings}%</span>
                  </div>
                )}
                {plan.isFirstTime && (
                  <div className="text-xs text-green-600 font-medium">
                    First-time discount / Giảm giá lần đầu
                  </div>
                )}
              </div>

              {pricingOptions.durationMonths === plan.months && (
                <CheckCircle className="w-6 h-6 text-purple-500 mx-auto" />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Featured Add-on */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="featured"
            checked={pricingOptions.featuredAddOn}
            onCheckedChange={handleFeaturedToggle}
          />
          <div className="flex-1">
            <label htmlFor="featured" className="flex items-center gap-2 font-medium text-orange-900 cursor-pointer">
              <Zap className="w-5 h-5 text-orange-600" />
              Add Featured Placement for $10/month – get maximum visibility
            </label>
            <p className="text-orange-800 text-sm mt-1">
              Thêm Nổi Bật: +$10/tháng — Ưu tiên hiển thị tối đa
            </p>
            <ul className="text-sm text-orange-700 mt-2 space-y-1">
              <li>• Top placement in search results / Vị trí đầu trong kết quả tìm kiếm</li>
              <li>• Premium badge on your listing / Huy hiệu cao cấp trên tin đăng</li>
              <li>• 3x more buyer inquiries / Nhiều hơn 3 lần yêu cầu từ người mua</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Price Summary */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="font-bold text-lg mb-4">Price Summary / Tóm tắt giá</h3>
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <span>Base Plan ({selectedPlan.months} month{selectedPlan.months > 1 ? 's' : ''})</span>
            <span>${selectedPlan.discountPrice}</span>
          </div>
          
          {pricingOptions.featuredAddOn && (
            <div className="flex justify-between text-orange-600">
              <span>Featured Placement (+$10/month)</span>
              <span>+${featuredCost}</span>
            </div>
          )}
          
          <hr className="my-3" />
          
          <div className="flex justify-between font-bold text-lg">
            <span>Total / Tổng cộng</span>
            <span className="text-purple-600">${totalPrice}</span>
          </div>
        </div>
      </div>

      {/* Terms */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-2">
          <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">Important Terms / Điều khoản quan trọng:</p>
            <p>
              All listings expire after chosen duration unless renewed. First-time discounts apply only once per account.
            </p>
            <p className="text-blue-600 mt-1">
              Tất cả tin đăng hết hạn sau thời gian đã chọn trừ khi gia hạn. Giá ưu đãi lần đầu chỉ áp dụng 1 lần cho mỗi tài khoản.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalonPricingStep;
