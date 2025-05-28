
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SalonPricingOptions, DURATION_OPTIONS } from "@/utils/posting/salonPricing";

interface SalonPlanSelectionProps {
  selectedOptions: SalonPricingOptions;
  onOptionsChange: (options: SalonPricingOptions) => void;
}

const SalonPlanSelectionWithoutPrices = ({ selectedOptions, onOptionsChange }: SalonPlanSelectionProps) => {
  const handleDurationChange = (months: string) => {
    onOptionsChange({
      ...selectedOptions,
      durationMonths: parseInt(months)
    });
  };

  const handleFeaturedChange = (checked: boolean) => {
    onOptionsChange({
      ...selectedOptions,
      selectedPricingTier: checked ? 'featured' : 'basic'
    });
  };

  const getPrice = (months: number, isFeatured: boolean = false) => {
    const basePrices = {
      1: 19.99,
      3: 49.99,
      6: 99.99,
      12: 149.99
    };
    const originalPrices = {
      1: 29.99,
      3: 89.97,
      6: 179.94,
      12: 359.88
    };
    
    const basePrice = basePrices[months as keyof typeof basePrices];
    const originalPrice = originalPrices[months as keyof typeof originalPrices];
    const finalPrice = isFeatured ? basePrice + 10 : basePrice;
    const finalOriginalPrice = isFeatured ? originalPrice + 10 : originalPrice;
    
    return { finalPrice, originalPrice: finalOriginalPrice };
  };

  const getSavingsPercentage = (months: number) => {
    const savingsMap = { 1: 33, 3: 44, 6: 44, 12: 58 };
    return savingsMap[months as keyof typeof savingsMap];
  };

  const isFeatured = selectedOptions.selectedPricingTier === 'featured';

  return (
    <div className="space-y-6">
      {/* FOMO Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 rounded-lg text-center">
        <h3 className="text-lg font-bold">🔥 Limited Time Pricing - Save Up To 58%!</h3>
        <p className="text-sm opacity-90">Special launch pricing expires soon. Lock in these rates now!</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Choose Your Plan Duration / Chọn Thời Hạn</h3>
        <RadioGroup 
          value={selectedOptions.durationMonths.toString()} 
          onValueChange={handleDurationChange}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {DURATION_OPTIONS.map((option) => {
            const { finalPrice, originalPrice } = getPrice(option.months, isFeatured);
            const savings = getSavingsPercentage(option.months);
            const isPopular = option.months === 6;
            
            return (
              <Card 
                key={option.months} 
                className={`cursor-pointer transition-all hover:shadow-lg relative ${
                  selectedOptions.durationMonths === option.months 
                    ? 'ring-2 ring-purple-500 border-purple-500 shadow-lg' 
                    : 'border-gray-200 hover:border-purple-300'
                } ${isPopular ? 'bg-gradient-to-br from-purple-50 to-indigo-50' : ''}`}
              >
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-3 py-1">
                      🏆 MOST POPULAR
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="pb-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={option.months.toString()} id={`duration-${option.months}`} />
                    <CardTitle className="text-lg">{option.label}</CardTitle>
                    <Badge variant="secondary" className="bg-green-100 text-green-800 font-bold">
                      Save {savings}%!
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-3xl font-bold text-purple-600">
                        ${finalPrice.toFixed(2)}
                      </span>
                      <span className="text-lg text-gray-500 line-through">
                        ${originalPrice.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {option.days} days of visibility / {option.days} ngày hiển thị
                    </p>
                    <p className="text-xs text-green-600 font-medium">
                      You save ${(originalPrice - finalPrice).toFixed(2)}!
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </RadioGroup>
      </div>

      {/* Featured Option */}
      <div className="border-t pt-6">
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Checkbox 
              id="featured"
              checked={isFeatured}
              onCheckedChange={handleFeaturedChange}
            />
            <div className="flex-1">
              <label htmlFor="featured" className="text-lg font-medium cursor-pointer flex items-center gap-2">
                ⭐ Feature this listing +$10 / Tin nổi bật +$10
                <Badge className="bg-amber-100 text-amber-800 text-xs">RECOMMENDED</Badge>
              </label>
              <p className="text-sm text-gray-600 mt-1">
                ✨ Get priority placement, highlighted badge, and 3x more views / Được ưu tiên hiển thị, huy hiệu nổi bật và nhiều lượt xem hơn 3 lần
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Total Summary */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-lg p-4">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-lg font-semibold">Total / Tổng cộng:</span>
            {isFeatured && (
              <div className="text-sm text-purple-600 mt-1">
                Includes Featured Listing (+$10)
              </div>
            )}
          </div>
          <div className="text-right">
            {(() => {
              const { finalPrice, originalPrice } = getPrice(selectedOptions.durationMonths, isFeatured);
              const savings = originalPrice - finalPrice;
              return (
                <div>
                  <span className="text-3xl font-bold text-purple-600">
                    ${finalPrice.toFixed(2)}
                  </span>
                  <div className="text-sm text-gray-500 line-through">
                    ${originalPrice.toFixed(2)}
                  </div>
                  <div className="text-sm text-green-600 font-bold">
                    You save ${savings.toFixed(2)}!
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </div>

      {/* Urgency Message */}
      <div className="text-center">
        <p className="text-sm text-red-600 font-medium">
          ⚠️ Launch pricing expires in 48 hours. Secure your spot now!
        </p>
      </div>
    </div>
  );
};

export default SalonPlanSelectionWithoutPrices;
