
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { SalonFormValues } from '../salonFormSchema';
import { FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, TrendingUp, Zap } from 'lucide-react';

interface SalonPricingStepProps {
  form: UseFormReturn<SalonFormValues>;
  selectedDuration: number;
  setSelectedDuration: (duration: number) => void;
  featuredAddOn: boolean;
  setFeaturedAddOn: (featured: boolean) => void;
}

const DURATION_OPTIONS = [
  { 
    months: 1, 
    label: "1 Month / 1 Tháng", 
    discountPrice: 19.99, 
    originalPrice: 24.99, 
    discount: "20%" 
  },
  { 
    months: 3, 
    label: "3 Months / 3 Tháng", 
    discountPrice: 54.99, 
    originalPrice: 74.99, 
    discount: "27%" 
  },
  { 
    months: 6, 
    label: "6 Months / 6 Tháng", 
    discountPrice: 99.99, 
    originalPrice: 149.99, 
    discount: "33%" 
  },
  { 
    months: 12, 
    label: "12 Months / 12 Tháng", 
    discountPrice: 145.99, 
    originalPrice: 300.00, 
    discount: "51%" 
  }
];

const SalonPricingStep = ({ 
  form, 
  selectedDuration, 
  setSelectedDuration, 
  featuredAddOn, 
  setFeaturedAddOn 
}: SalonPricingStepProps) => {
  const selectedOption = DURATION_OPTIONS.find(option => option.months === selectedDuration);
  const basePrice = selectedOption?.discountPrice || 19.99;
  const featuredFee = featuredAddOn ? 10 : 0; // One-time $10 fee
  const totalPrice = basePrice + featuredFee;

  return (
    <div className="space-y-6 bg-gradient-to-br from-pink-50 to-rose-50 min-h-screen p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-green-100 p-3 rounded-full">
            <Star className="w-6 h-6 text-green-600" />
          </div>
          <span className="ml-3 text-xl font-medium">💰 Choose Your Plan / Chọn gói của bạn</span>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Select the perfect listing duration for your salon. Longer plans save you more money!
          <br />
          <span className="text-green-600 font-medium">
            Chọn thời hạn đăng tin hoàn hảo cho salon của bạn. Gói dài hạn tiết kiệm nhiều hơn!
          </span>
        </p>
      </div>

      {/* Duration Selection */}
      <Card className="bg-white/80 backdrop-blur border-pink-200">
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
            Select Duration / Chọn thời hạn
          </h3>
          
          <RadioGroup 
            value={selectedDuration.toString()} 
            onValueChange={(value) => setSelectedDuration(parseInt(value))}
            className="space-y-4"
          >
            {DURATION_OPTIONS.map((option) => (
              <div key={option.months} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-pink-50 transition-colors">
                <RadioGroupItem value={option.months.toString()} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{option.label}</span>
                    <div className="flex items-center space-x-2">
                      <span className="line-through text-gray-500 text-sm">
                        ${option.originalPrice.toFixed(2)}
                      </span>
                      <span className="font-bold text-green-600 text-lg">
                        ${option.discountPrice.toFixed(2)}
                      </span>
                      <Badge className="bg-red-100 text-red-700">
                        Save {option.discount}!
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Featured Add-on */}
      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <Checkbox
              checked={featuredAddOn}
              onCheckedChange={setFeaturedAddOn}
              className="mt-1"
            />
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <Zap className="w-5 h-5 text-yellow-500 mr-2" />
                <h3 className="font-semibold text-lg">Featured Placement</h3>
                <Badge className="ml-2 bg-yellow-500 text-white">+$10</Badge>
              </div>
              <p className="text-gray-700 mb-2">
                <strong>EN:</strong> Add Featured Placement for one-time $10 — get maximum visibility!
              </p>
              <p className="text-gray-700 mb-4">
                <strong>VI:</strong> Thêm Nổi Bật: +$10 phí một lần — Ưu tiên hiển thị tối đa!
              </p>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <p className="text-sm font-medium text-yellow-800">
                  ⭐ Featured listings get 3x more views and appear at the top of search results!
                  <br />
                  <span className="text-yellow-700">
                  ⭐ Tin nổi bật nhận được 3x lượt xem nhiều hơn và xuất hiện đầu kết quả tìm kiếm!
                  </span>
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Price Summary */}
      <Card className="bg-white border-pink-200">
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4">Price Summary / Tóm tắt giá</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Base plan ({selectedOption?.label})</span>
              <span>${basePrice.toFixed(2)}</span>
            </div>
            {featuredAddOn && (
              <div className="flex justify-between text-yellow-600">
                <span>Featured placement (one-time)</span>
                <span>+$10.00</span>
              </div>
            )}
            <div className="border-t pt-3 flex justify-between font-bold text-lg">
              <span>Total / Tổng cộng</span>
              <span className="text-green-600">${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Terms Note */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-800">
          <strong>EN:</strong> All listings expire after chosen duration unless renewed. First-time discounts apply only once per account.
          <br />
          <strong>VI:</strong> Tất cả tin đăng hết hạn sau thời gian đã chọn trừ khi gia hạn. Giá ưu đãi lần đầu chỉ áp dụng 1 lần cho mỗi tài khoản.
        </p>
      </div>

      {/* Success Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <TrendingUp className="w-4 h-4 text-green-600 mr-2" />
            <span className="font-medium text-green-900">💰 Value Tip:</span>
          </div>
          <p className="text-green-800 text-sm">
            Longer plans get better visibility and save money over time!
            <br />
            <span className="text-green-600">
            Gói dài hạn được hiển thị tốt hơn và tiết kiệm tiền theo thời gian!
            </span>
          </p>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <Star className="w-4 h-4 text-purple-600 mr-2" />
            <span className="font-medium text-purple-900">🌟 Featured Benefits:</span>
          </div>
          <p className="text-purple-800 text-sm">
            Featured listings are seen by 3x more potential buyers!
            <br />
            <span className="text-purple-600">
            Tin nổi bật được 3x nhiều người mua tiềm năng xem hơn!
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SalonPricingStep;
