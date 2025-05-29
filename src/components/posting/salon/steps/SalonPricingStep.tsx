
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Star, Crown, Zap } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "../salonFormSchema";

interface SalonPricingOptions {
  selectedPricingTier: string;
  durationMonths?: number;
  featuredAddOn?: boolean;
  autoRenew?: boolean;
  isFirstPost?: boolean;
}

interface SalonPricingStepProps {
  selectedOptions: SalonPricingOptions;
  onOptionsChange: (options: SalonPricingOptions) => void;
  form: UseFormReturn<SalonFormValues>;
}

const DURATION_OPTIONS = [
  { 
    months: 1, 
    enLabel: "1 Month", 
    viLabel: "1 Tháng",
    originalPrice: 24.99,
    discountPrice: 19.99,
    isFirstTime: true,
    savingsText: { en: "$19.99 for first-time", vi: "$19.99 cho lần đầu" }
  },
  { 
    months: 3, 
    enLabel: "3 Months", 
    viLabel: "3 Tháng",
    originalPrice: 74.99,
    discountPrice: 54.99,
    savingsText: { en: "now $54.99", vi: "chỉ còn $54.99" }
  },
  { 
    months: 6, 
    enLabel: "6 Months", 
    viLabel: "6 Tháng",
    originalPrice: 149.99,
    discountPrice: 99.99,
    savingsText: { en: "now $99.99", vi: "chỉ còn $99.99" }
  },
  { 
    months: 12, 
    enLabel: "12 Months", 
    viLabel: "12 Tháng",
    originalPrice: 300.00,
    discountPrice: 145.99,
    savingsText: { en: "now $145.99", vi: "chỉ còn $145.99" }
  }
];

export const SalonPricingStep = ({ selectedOptions, onOptionsChange, form }: SalonPricingStepProps) => {
  const [selectedDuration, setSelectedDuration] = useState(3);
  const [featuredAddOn, setFeaturedAddOn] = useState(false);

  const selectedDurationOption = DURATION_OPTIONS.find(d => d.months === selectedDuration);
  const basePrice = selectedDurationOption?.discountPrice || 54.99;
  const featuredCost = featuredAddOn ? selectedDuration * 10 : 0;
  const finalPrice = basePrice + featuredCost;

  const handleDurationSelect = (months: number) => {
    setSelectedDuration(months);
    const updatedOptions = {
      ...selectedOptions,
      durationMonths: months
    };
    onOptionsChange(updatedOptions);
  };

  const handleFeaturedToggle = (checked: boolean) => {
    setFeaturedAddOn(checked);
    const updatedOptions = {
      ...selectedOptions,
      featuredAddOn: checked
    };
    onOptionsChange(updatedOptions);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Choose Your Plan / Chọn Gói Đăng Tin
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Choose the plan and duration that fits your needs / Chọn gói và thời hạn đăng tin phù hợp với nhu cầu của bạn
        </p>
      </div>

      {/* Duration Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">💵 Salon Listing Pricing</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {DURATION_OPTIONS.map((option) => {
            const isSelected = selectedDuration === option.months;
            const savings = option.originalPrice - option.discountPrice;
            const savingsPercent = Math.round((savings / option.originalPrice) * 100);
            
            return (
              <Card 
                key={option.months}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  isSelected ? 'ring-2 ring-purple-500 shadow-lg' : ''
                }`}
                onClick={() => handleDurationSelect(option.months)}
              >
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-lg">
                    {option.enLabel}
                    <br />
                    <span className="text-sm font-normal text-gray-600">{option.viLabel}</span>
                  </CardTitle>
                  {option.months === 3 && (
                    <Badge className="bg-purple-100 text-purple-800 text-xs">Most Popular</Badge>
                  )}
                </CardHeader>
                <CardContent className="text-center">
                  <div className="space-y-2">
                    <div className="text-sm text-gray-500 line-through">
                      ${option.originalPrice}
                    </div>
                    <div className="text-2xl font-bold text-purple-600">
                      ${option.discountPrice}
                    </div>
                    <div className="text-xs text-green-600 font-medium">
                      Save {savingsPercent}%!
                    </div>
                    <div className="text-xs text-gray-600">
                      {option.savingsText.en}
                      <br />
                      {option.savingsText.vi}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Featured Add-on */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="featured"
            checked={featuredAddOn}
            onCheckedChange={handleFeaturedToggle}
          />
          <div className="flex-1">
            <label htmlFor="featured" className="flex items-center gap-2 font-medium text-yellow-900 cursor-pointer">
              <Star className="w-4 h-4 text-yellow-600" />
              Add Featured Placement for $10/month – get maximum visibility
            </label>
            <p className="text-sm text-yellow-800 mt-1">
              Thêm Nổi Bật: +$10/tháng — Ưu tiên hiển thị tối đa
            </p>
            {featuredAddOn && (
              <div className="mt-2 text-sm text-yellow-700">
                <span className="font-medium">Featured cost: +${featuredCost}</span>
                <br />
                <span className="text-xs">({selectedDuration} months × $10/month)</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Price Summary */}
      <div className="bg-white border-2 border-purple-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          📋 Order Summary / Tóm tắt đơn hàng
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">
              {selectedDuration} {selectedDuration === 1 ? 'Month' : 'Months'} Listing
            </span>
            <span className="font-medium">${basePrice}</span>
          </div>
          {featuredAddOn && (
            <div className="flex justify-between">
              <span className="text-gray-600">Featured Placement</span>
              <span className="font-medium">+${featuredCost}</span>
            </div>
          )}
          <div className="border-t pt-3">
            <div className="flex justify-between text-lg font-bold">
              <span>Total / Tổng cộng:</span>
              <span className="text-purple-600">${finalPrice}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Universal Note */}
      <div className="bg-gray-50 border rounded-lg p-4">
        <p className="text-sm text-gray-700">
          <strong>📋 Important:</strong> All listings expire after chosen duration unless renewed. First-time discounts apply only once per account.
          <br />
          <span className="text-gray-600">
            Tất cả tin đăng hết hạn sau thời gian đã chọn trừ khi gia hạn. Giá ưu đãi lần đầu chỉ áp dụng 1 lần cho mỗi tài khoản.
          </span>
        </p>
        <p className="text-sm text-purple-600 mt-2">
          <strong>💳 Payment:</strong> Stripe payment required before publishing listing.
        </p>
      </div>
    </div>
  );
};
