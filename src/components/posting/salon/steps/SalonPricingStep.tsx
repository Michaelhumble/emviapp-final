
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Check, Star, TrendingUp, Zap } from 'lucide-react';
import { SalonPricingOptions, SalonPricingTier } from '@/utils/posting/salonPricing';

interface SalonPricingStepProps {
  pricingOptions: SalonPricingOptions;
  onPricingChange: (options: SalonPricingOptions) => void;
}

const pricingPlans = [
  {
    months: 1,
    originalPrice: 24.99,
    discountPrice: 19.99,
    isFirstTime: true,
    savings: 5.00,
    label: '1 Month / 1 Tháng',
    popular: false
  },
  {
    months: 3,
    originalPrice: 74.99,
    discountPrice: 54.99,
    isFirstTime: false,
    savings: 20.00,
    label: '3 Months / 3 Tháng',
    popular: true
  },
  {
    months: 6,
    originalPrice: 149.99,
    discountPrice: 99.99,
    isFirstTime: false,
    savings: 50.00,
    label: '6 Months / 6 Tháng',
    popular: false
  },
  {
    months: 12,
    originalPrice: 300.00,
    discountPrice: 145.99,
    isFirstTime: false,
    savings: 154.01,
    label: '12 Months / 12 Tháng',
    popular: false
  }
];

const SalonPricingStep = ({ pricingOptions, onPricingChange }: SalonPricingStepProps) => {
  const handleDurationChange = (months: number) => {
    onPricingChange({
      ...pricingOptions,
      durationMonths: months
    });
  };

  const handleFeaturedChange = (checked: boolean) => {
    onPricingChange({
      ...pricingOptions,
      featuredAddOn: checked
    });
  };

  const calculateTotalPrice = () => {
    const selectedPlan = pricingPlans.find(plan => plan.months === pricingOptions.durationMonths);
    if (!selectedPlan) return 0;
    
    let total = selectedPlan.discountPrice;
    
    if (pricingOptions.featuredAddOn) {
      total += (selectedPlan.months * 10); // $10 per month for featured
    }
    
    return total;
  };

  const getFeaturedCost = () => {
    return (pricingOptions.durationMonths || 3) * 10;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-green-100 p-3 rounded-full">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
          <span className="ml-3 text-xl font-medium">💰 Choose Your Plan / Chọn Gói Của Bạn</span>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Select the duration that works best for your salon listing.
          <br />
          <span className="text-green-600 font-medium">
            Chọn thời gian phù hợp nhất cho tin đăng salon của bạn.
          </span>
        </p>
      </div>

      {/* Pricing Plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pricingPlans.map((plan) => (
          <Card 
            key={plan.months}
            className={`relative cursor-pointer transition-all hover:shadow-lg ${
              pricingOptions.durationMonths === plan.months 
                ? 'ring-2 ring-blue-500 border-blue-200' 
                : 'border-gray-200'
            } ${plan.popular ? 'ring-2 ring-green-500 border-green-200' : ''}`}
            onClick={() => handleDurationChange(plan.months)}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-green-500 text-white px-3 py-1">
                  Most Popular / Phổ biến nhất
                </Badge>
              </div>
            )}
            
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-lg">{plan.label}</CardTitle>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-green-600">
                  ${plan.discountPrice}
                </div>
                {plan.originalPrice > plan.discountPrice && (
                  <div className="text-sm text-gray-500 line-through">
                    ${plan.originalPrice}
                  </div>
                )}
                {plan.isFirstTime && (
                  <Badge variant="secondary" className="text-xs">
                    First-time discount / Giảm giá lần đầu
                  </Badge>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="text-center">
              <div className="space-y-2">
                <div className="text-sm text-green-600 font-medium">
                  Save ${plan.savings.toFixed(2)} / Tiết kiệm ${plan.savings.toFixed(2)}
                </div>
                
                <div className="space-y-1 text-xs text-gray-600">
                  <div className="flex items-center justify-center">
                    <Check className="w-3 h-3 text-green-500 mr-1" />
                    Full listing visibility
                  </div>
                  <div className="flex items-center justify-center">
                    <Check className="w-3 h-3 text-green-500 mr-1" />
                    Contact information
                  </div>
                  <div className="flex items-center justify-center">
                    <Check className="w-3 h-3 text-green-500 mr-1" />
                    Photo gallery
                  </div>
                </div>
              </div>
              
              {pricingOptions.durationMonths === plan.months && (
                <div className="mt-4">
                  <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                    <Check className="w-4 h-4 mr-1" />
                    Selected / Đã chọn
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Featured Add-on */}
      <Card className="border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50">
        <CardHeader>
          <CardTitle className="flex items-center text-amber-800">
            <Star className="w-5 h-5 mr-2 text-amber-500" />
            Featured Listing Add-on / Gói Nổi Bật
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start space-x-3">
            <Checkbox
              checked={pricingOptions.featuredAddOn}
              onCheckedChange={handleFeaturedChange}
              className="mt-1"
            />
            <div className="flex-1">
              <div className="font-medium text-amber-900">
                Add Featured Placement for ${getFeaturedCost()} 
                <span className="text-amber-700"> — get maximum visibility</span>
              </div>
              <div className="text-sm text-amber-800 mt-1">
                Thêm Nổi Bật: +$10/tháng — Ưu tiên hiển thị tối đa
              </div>
              <div className="text-xs text-amber-700 mt-2 space-y-1">
                <div className="flex items-center">
                  <Zap className="w-3 h-3 mr-1" />
                  Appear at the top of search results
                </div>
                <div className="flex items-center">
                  <Zap className="w-3 h-3 mr-1" />
                  Get highlighted with special badge
                </div>
                <div className="flex items-center">
                  <Zap className="w-3 h-3 mr-1" />
                  3x more views than standard listings
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Price Summary */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-blue-900">
            💳 Price Summary / Tóm tắt giá
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Base Plan ({pricingOptions.durationMonths} months)</span>
              <span className="font-medium">
                ${pricingPlans.find(p => p.months === pricingOptions.durationMonths)?.discountPrice || 0}
              </span>
            </div>
            
            {pricingOptions.featuredAddOn && (
              <div className="flex justify-between text-amber-700">
                <span>Featured Placement</span>
                <span className="font-medium">+${getFeaturedCost()}</span>
              </div>
            )}
            
            <div className="border-t pt-3 flex justify-between text-lg font-bold text-blue-900">
              <span>Total / Tổng cộng:</span>
              <span>${calculateTotalPrice()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Terms Notice */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-600">
        <div className="space-y-2">
          <div>
            <strong>EN:</strong> All listings expire after chosen duration unless renewed. First-time discounts apply only once per account.
          </div>
          <div>
            <strong>VI:</strong> Tất cả tin đăng hết hạn sau thời gian đã chọn trừ khi gia hạn. Giá ưu đãi lần đầu chỉ áp dụng 1 lần cho mỗi tài khoản.
          </div>
        </div>
      </div>

      {/* Payment Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
        <div className="text-blue-800 font-medium mb-2">
          🔒 Secure Payment Required / Thanh toán bảo mật bắt buộc
        </div>
        <div className="text-sm text-blue-700">
          Stripe payment will be required before your listing goes live.
          <br />
          Thanh toán qua Stripe sẽ được yêu cầu trước khi tin đăng được xuất bản.
        </div>
      </div>
    </div>
  );
};

export default SalonPricingStep;
