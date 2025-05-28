
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
            
            return (
              <Card 
                key={option.months} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedOptions.durationMonths === option.months 
                    ? 'ring-2 ring-purple-500 border-purple-500' 
                    : 'border-gray-200'
                }`}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={option.months.toString()} id={`duration-${option.months}`} />
                    <CardTitle className="text-lg">{option.label}</CardTitle>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Save {savings}%!
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-purple-600">
                        ${finalPrice.toFixed(2)}
                      </span>
                      <span className="text-lg text-gray-500 line-through">
                        ${originalPrice.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {option.days} days of visibility / {option.days} ngày hiển thị
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </RadioGroup>
      </div>

      <div className="border-t pt-6">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="featured"
            checked={isFeatured}
            onCheckedChange={handleFeaturedChange}
          />
          <label htmlFor="featured" className="text-lg font-medium cursor-pointer">
            Feature this listing +$10 / Tin nổi bật +$10
          </label>
        </div>
        <p className="text-sm text-gray-600 mt-1 ml-6">
          Get priority placement and highlighted badge / Được ưu tiên hiển thị và huy hiệu nổi bật
        </p>
      </div>

      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">Total / Tổng cộng:</span>
          <div className="text-right">
            {(() => {
              const { finalPrice, originalPrice } = getPrice(selectedOptions.durationMonths, isFeatured);
              return (
                <div>
                  <span className="text-2xl font-bold text-purple-600">
                    ${finalPrice.toFixed(2)}
                  </span>
                  <div className="text-sm text-gray-500 line-through">
                    ${originalPrice.toFixed(2)}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalonPlanSelectionWithoutPrices;
