
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { SalonFormValues } from '../salonFormSchema';
import { SalonPricingOptions, DURATION_OPTIONS, calculateSalonPostPrice } from '@/utils/posting/salonPricing';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Star, Clock, Zap } from 'lucide-react';

interface SalonPricingStepProps {
  form: UseFormReturn<SalonFormValues>;
  pricingOptions: SalonPricingOptions;
  setPricingOptions: React.Dispatch<React.SetStateAction<SalonPricingOptions>>;
}

const SalonPricingStep = ({ form, pricingOptions, setPricingOptions }: SalonPricingStepProps) => {
  const handleDurationChange = (months: number) => {
    setPricingOptions(prev => ({
      ...prev,
      durationMonths: months
    }));
  };

  const handleFeaturedChange = (checked: boolean) => {
    setPricingOptions(prev => ({
      ...prev,
      featuredAddOn: checked
    }));
  };

  const handleAutoRenewChange = (checked: boolean) => {
    setPricingOptions(prev => ({
      ...prev,
      autoRenew: checked
    }));
  };

  const currentPrice = calculateSalonPostPrice(pricingOptions);

  // Format price to always show 2 decimal places
  const formatPrice = (price: number): string => {
    return price.toFixed(2);
  };

  return (
    <div className="space-y-6 bg-gradient-to-br from-pink-50 to-purple-50 min-h-screen p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-purple-100 p-3 rounded-full">
            <DollarSign className="w-6 h-6 text-purple-600" />
          </div>
          <span className="ml-3 text-xl font-medium">💰 Choose Your Plan / Chọn gói của bạn</span>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Select the best listing plan for your salon. Longer plans offer better savings!
          <br />
          <span className="text-purple-600 font-medium">
            Chọn gói đăng tin tốt nhất cho salon của bạn. Gói dài hạn tiết kiệm hơn!
          </span>
        </p>
      </div>

      {/* Duration Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {DURATION_OPTIONS.map((option) => {
          const isSelected = pricingOptions.durationMonths === option.months;
          return (
            <Card 
              key={option.months}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                isSelected 
                  ? 'ring-2 ring-purple-500 bg-purple-50' 
                  : 'hover:ring-1 hover:ring-purple-300'
              }`}
              onClick={() => handleDurationChange(option.months)}
            >
              <CardHeader className="text-center pb-2">
                <div className="flex justify-center mb-2">
                  <Clock className="w-5 h-5 text-purple-600" />
                </div>
                <CardTitle className="text-lg">{option.label}</CardTitle>
                {option.discount > 0 && (
                  <Badge className="bg-red-500 text-white">
                    {option.fomoBadge}
                  </Badge>
                )}
              </CardHeader>
              <CardContent className="text-center">
                <div className="space-y-2">
                  {option.originalPrice && (
                    <p className="text-sm text-gray-500 line-through">
                      ${formatPrice(option.originalPrice)}
                    </p>
                  )}
                  <p className="text-2xl font-bold text-purple-600">
                    ${formatPrice(option.price)}
                  </p>
                  <p className="text-sm text-gray-600">
                    ${formatPrice(option.price / option.months)}/month
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Featured Add-on */}
      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Star className="w-5 h-5 text-yellow-600 mr-2" />
            Featured Placement / Nổi bật
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start space-x-3">
            <Checkbox
              id="featured"
              checked={pricingOptions.featuredAddOn}
              onCheckedChange={handleFeaturedChange}
            />
            <div className="flex-1">
              <label htmlFor="featured" className="text-sm font-medium cursor-pointer">
                Add Featured Placement for a one-time $10 — Get maximum visibility!
                <br />
                <span className="text-yellow-600">
                  Thêm Nổi Bật chỉ $10 một lần — Ưu tiên hiển thị tối đa!
                </span>
              </label>
              <ul className="text-xs text-gray-600 mt-2 space-y-1">
                <li>• Appears at the top of search results / Xuất hiện đầu kết quả tìm kiếm</li>
                <li>• Gold border and star badge / Viền vàng và huy hiệu ngôi sao</li>
                <li>• 5x more visibility than standard / Hiển thị gấp 5 lần so với tiêu chuẩn</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Auto-Renew Option */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="autorenew"
              checked={pricingOptions.autoRenew}
              onCheckedChange={handleAutoRenewChange}
            />
            <div className="flex-1">
              <label htmlFor="autorenew" className="text-sm font-medium cursor-pointer">
                <Zap className="w-4 h-4 inline mr-1 text-green-600" />
                Enable Auto-Renew (Save 5%) / Tự động gia hạn (Tiết kiệm 5%)
              </label>
              <p className="text-xs text-gray-600 mt-1">
                Automatically renew your listing when it expires. Cancel anytime.
                <br />
                <span className="text-green-600">
                  Tự động gia hạn tin đăng khi hết hạn. Có thể hủy bất kỳ lúc nào.
                </span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pricing Summary */}
      <Card className="bg-gradient-to-r from-purple-100 to-pink-100 border-purple-200">
        <CardHeader>
          <CardTitle className="text-purple-800">Pricing Summary / Tóm tắt giá</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>
                Standard Listing ({pricingOptions.durationMonths} months)
              </span>
              <span className="font-semibold">
                ${formatPrice(DURATION_OPTIONS.find(d => d.months === pricingOptions.durationMonths)?.price || 0)}
              </span>
            </div>
            
            {pricingOptions.featuredAddOn && (
              <div className="flex justify-between items-center text-yellow-600">
                <span>Featured Placement (one-time)</span>
                <span className="font-semibold">+$10.00</span>
              </div>
            )}
            
            {pricingOptions.autoRenew && (
              <div className="flex justify-between items-center text-green-600">
                <span>Auto-renew discount (5%)</span>
                <span className="font-semibold">
                  -${formatPrice((DURATION_OPTIONS.find(d => d.months === pricingOptions.durationMonths)?.price || 0) * 0.05)}
                </span>
              </div>
            )}
            
            <div className="border-t pt-3">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total / Tổng cộng</span>
                <span className="text-purple-600">${formatPrice(currentPrice)}</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-xs text-gray-600">
            <p>
              All listings expire after chosen duration unless renewed. First-time discounts apply only once per account.
            </p>
            <p className="text-purple-600 mt-1">
              Tất cả tin đăng hết hạn sau thời gian đã chọn trừ khi gia hạn. Giá ưu đãi lần đầu chỉ áp dụng 1 lần cho mỗi tài khoản.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Trust Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <Star className="w-4 h-4 text-blue-600 mr-2" />
            <span className="font-medium text-blue-900">💼 Professional Listings</span>
          </div>
          <p className="text-blue-800 text-sm">
            Your salon will be displayed professionally with verified business information.
            <br />
            <span className="text-blue-600">
              Salon của bạn sẽ được hiển thị chuyên nghiệp với thông tin kinh doanh đã xác minh.
            </span>
          </p>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <DollarSign className="w-4 h-4 text-green-600 mr-2" />
            <span className="font-medium text-green-900">💰 Qualified Buyers</span>
          </div>
          <p className="text-green-800 text-sm">
            Reach serious buyers who are actively looking to purchase salon businesses.
            <br />
            <span className="text-green-600">
              Tiếp cận những người mua nghiêm túc đang tích cực tìm kiếm mua salon.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SalonPricingStep;
