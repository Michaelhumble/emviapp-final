
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { SalonPricingOptions, DURATION_OPTIONS, getSalonPostPricingSummary } from "@/utils/posting/salonPricing";
import { CheckCircle, Crown, Star, Zap } from "lucide-react";

interface SalonPlanSelectionWithoutPricesProps {
  selectedOptions: SalonPricingOptions;
  onOptionsChange: (options: SalonPricingOptions) => void;
}

const SalonPlanSelectionWithoutPrices = ({ selectedOptions, onOptionsChange }: SalonPlanSelectionWithoutPricesProps) => {
  const handleTierChange = (tier: 'basic' | 'featured') => {
    onOptionsChange({
      ...selectedOptions,
      selectedPricingTier: tier
    });
  };

  const handleDurationChange = (months: string) => {
    onOptionsChange({
      ...selectedOptions,
      durationMonths: parseInt(months)
    });
  };

  const handleAutoRenewChange = (autoRenew: boolean) => {
    onOptionsChange({
      ...selectedOptions,
      autoRenew
    });
  };

  const getPriceForTierAndDuration = (tier: 'basic' | 'featured', months: number) => {
    const tempOptions = { ...selectedOptions, selectedPricingTier: tier, durationMonths: months };
    const summary = getSalonPostPricingSummary(tempOptions);
    return summary;
  };

  return (
    <div className="space-y-8">
      {/* Plan Selection */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">Choose Your Plan / Chọn Gói Của Bạn</h3>
        
        <RadioGroup
          value={selectedOptions.selectedPricingTier}
          onValueChange={handleTierChange}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Basic Plan */}
          <div className="relative">
            <RadioGroupItem value="basic" id="basic" className="sr-only" />
            <Label htmlFor="basic" className="cursor-pointer">
              <Card className={`transition-all duration-200 ${
                selectedOptions.selectedPricingTier === 'basic' 
                  ? 'ring-2 ring-purple-500 bg-purple-50' 
                  : 'hover:shadow-md'
              }`}>
                <CardHeader className="text-center pb-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Star className="w-5 h-5 text-blue-600" />
                    <CardTitle className="text-xl">Basic Listing</CardTitle>
                  </div>
                  <div className="space-y-1">
                    {selectedOptions.durationMonths && (
                      <div className="text-center">
                        <div className="text-3xl font-bold text-gray-900">
                          ${getPriceForTierAndDuration('basic', selectedOptions.durationMonths).finalPrice.toFixed(2)}
                        </div>
                        <div className="text-sm text-gray-500 line-through">
                          ${getPriceForTierAndDuration('basic', selectedOptions.durationMonths).originalPrice.toFixed(2)}
                        </div>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          Save {getPriceForTierAndDuration('basic', selectedOptions.durationMonths).savingsPercentage}%! 🔥
                        </Badge>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Standard listing visibility</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Photo gallery (up to 10 photos)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Contact information display</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Basic search inclusion</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Label>
          </div>

          {/* Featured Plan */}
          <div className="relative">
            <RadioGroupItem value="featured" id="featured" className="sr-only" />
            <Label htmlFor="featured" className="cursor-pointer">
              <Card className={`transition-all duration-200 ${
                selectedOptions.selectedPricingTier === 'featured' 
                  ? 'ring-2 ring-purple-500 bg-purple-50' 
                  : 'hover:shadow-md'
              }`}>
                <CardHeader className="text-center pb-4">
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                    Most Popular 🚀
                  </Badge>
                  <div className="flex items-center justify-center gap-2 mb-2 mt-2">
                    <Crown className="w-5 h-5 text-purple-600" />
                    <CardTitle className="text-xl">Featured Listing</CardTitle>
                  </div>
                  <div className="space-y-1">
                    {selectedOptions.durationMonths && (
                      <div className="text-center">
                        <div className="text-3xl font-bold text-gray-900">
                          ${getPriceForTierAndDuration('featured', selectedOptions.durationMonths).finalPrice.toFixed(2)}
                        </div>
                        <div className="text-sm text-gray-500 line-through">
                          ${getPriceForTierAndDuration('featured', selectedOptions.durationMonths).originalPrice.toFixed(2)}
                        </div>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          Save {getPriceForTierAndDuration('featured', selectedOptions.durationMonths).savingsPercentage}%! 🔥
                        </Badge>
                        <div className="text-xs text-purple-600 font-medium">
                          +$10 for premium features
                        </div>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium">Everything in Basic +</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-purple-500" />
                      <span className="text-sm">Priority placement in search</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-purple-500" />
                      <span className="text-sm">Featured badge on listing</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-purple-500" />
                      <span className="text-sm">Homepage featured section</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-purple-500" />
                      <span className="text-sm">Enhanced visibility boost</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Duration Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Choose Duration / Chọn Thời Hạn</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {DURATION_OPTIONS.map((option) => {
            const summary = getPriceForTierAndDuration(selectedOptions.selectedPricingTier, option.months);
            return (
              <Card 
                key={option.months}
                className={`cursor-pointer transition-all duration-200 ${
                  selectedOptions.durationMonths === option.months 
                    ? 'ring-2 ring-purple-500 bg-purple-50' 
                    : 'hover:shadow-md'
                }`}
                onClick={() => handleDurationChange(option.months.toString())}
              >
                <CardContent className="p-4 text-center">
                  <div className="text-lg font-bold">{option.months} month{option.months > 1 ? 's' : ''}</div>
                  <div className="text-2xl font-bold text-purple-600 mt-2">
                    ${summary.finalPrice.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-500 line-through">
                    ${summary.originalPrice.toFixed(2)}
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800 mt-2">
                    Save {summary.savingsPercentage}%! 🔥
                  </Badge>
                  <div className="text-xs text-gray-500 mt-2">
                    ${(summary.finalPrice / option.months).toFixed(2)}/month
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Auto-Renew Option */}
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="autoRenew"
            checked={selectedOptions.autoRenew || false}
            onCheckedChange={handleAutoRenewChange}
          />
          <div className="space-y-1 leading-none">
            <Label htmlFor="autoRenew" className="text-sm font-medium cursor-pointer">
              Auto-renew subscription / Tự động gia hạn
            </Label>
            <p className="text-xs text-gray-500">
              Automatically renew your listing when it expires / Tự động gia hạn tin đăng khi hết hạn
            </p>
          </div>
        </div>
      </div>

      {/* Price Summary */}
      <div className="bg-gray-50 rounded-lg p-6 space-y-4">
        <h3 className="text-lg font-semibold">Order Summary / Tóm Tắt Đơn Hàng</h3>
        {selectedOptions.durationMonths && (
          <div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">
                {selectedOptions.selectedPricingTier === 'featured' ? 'Featured' : 'Basic'} Listing ({selectedOptions.durationMonths} month{selectedOptions.durationMonths > 1 ? 's' : ''})
              </span>
              <div className="text-right">
                <div className="text-lg font-bold">
                  ${getPriceForTierAndDuration(selectedOptions.selectedPricingTier, selectedOptions.durationMonths).finalPrice.toFixed(2)}
                </div>
                <div className="text-sm text-gray-500 line-through">
                  ${getPriceForTierAndDuration(selectedOptions.selectedPricingTier, selectedOptions.durationMonths).originalPrice.toFixed(2)}
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center pt-2 border-t">
              <span className="text-lg font-semibold">Total / Tổng Cộng</span>
              <div className="text-right">
                <span className="text-2xl font-bold text-purple-600">
                  ${getPriceForTierAndDuration(selectedOptions.selectedPricingTier, selectedOptions.durationMonths).finalPrice.toFixed(2)}
                </span>
                <Badge variant="secondary" className="bg-green-100 text-green-800 ml-2">
                  Save {getPriceForTierAndDuration(selectedOptions.selectedPricingTier, selectedOptions.durationMonths).savingsPercentage}%! 🔥
                </Badge>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalonPlanSelectionWithoutPrices;
