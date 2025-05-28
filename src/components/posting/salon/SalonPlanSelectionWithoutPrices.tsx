
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Crown, Zap } from 'lucide-react';
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

  const getBasicPrice = (months: number) => {
    const summary = getSalonPostPricingSummary({
      selectedPricingTier: 'basic',
      durationMonths: months
    });
    return summary;
  };

  const getFeaturedPrice = (months: number) => {
    const summary = getSalonPostPricingSummary({
      selectedPricingTier: 'featured',
      durationMonths: months
    });
    return summary;
  };

  const getDurationOption = (months: number) => {
    return DURATION_OPTIONS.find(option => option.months === months);
  };

  return (
    <div className="space-y-8">
      {/* Plan Selection */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Choose Your Plan / Chọn Gói Của Bạn</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Plan */}
          <Card 
            className={`cursor-pointer transition-all ${
              selectedOptions.selectedPricingTier === 'basic' 
                ? 'ring-2 ring-purple-500 border-purple-500' 
                : 'hover:border-purple-300'
            }`}
            onClick={() => handlePlanSelect('basic')}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-purple-600" />
                Basic Listing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-sm text-gray-600">Perfect for quick sales</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Standard listing visibility</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Contact information display</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Photo gallery</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Featured Plan */}
          <Card 
            className={`cursor-pointer transition-all relative ${
              selectedOptions.selectedPricingTier === 'featured' 
                ? 'ring-2 ring-yellow-500 border-yellow-500' 
                : 'hover:border-yellow-300'
            }`}
            onClick={() => handlePlanSelect('featured')}
          >
            <Badge className="absolute -top-2 left-4 bg-yellow-500 text-white">
              <Zap className="w-3 h-3 mr-1" />
              MOST POPULAR
            </Badge>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-yellow-600" />
                Featured Listing
                <Badge variant="outline" className="text-xs">+$10/mo</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-sm text-gray-600">Get noticed faster with premium placement</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium text-yellow-700">Top of search results</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium text-yellow-700">Premium badge display</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm">All Basic features included</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium text-yellow-700">3x more visibility</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Duration Selection with Pricing */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Select Duration & See Pricing / Chọn Thời Hạn & Xem Giá</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {DURATION_OPTIONS.map((option) => {
            const basicPricing = getBasicPrice(option.months);
            const featuredPricing = getFeaturedPrice(option.months);
            const currentPricing = selectedOptions.selectedPricingTier === 'featured' ? featuredPricing : basicPricing;
            
            return (
              <Card 
                key={option.months}
                className={`cursor-pointer transition-all ${
                  selectedOptions.durationMonths === option.months 
                    ? 'ring-2 ring-blue-500 border-blue-500 bg-blue-50' 
                    : 'hover:border-blue-300'
                }`}
                onClick={() => handleDurationSelect(option.months)}
              >
                <CardContent className="p-4">
                  <div className="text-center space-y-2">
                    <h4 className="font-semibold">{option.label}</h4>
                    
                    {/* Basic Pricing */}
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500 uppercase font-medium">Basic Plan</p>
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-sm text-gray-400 line-through">
                          ${basicPricing.originalPrice.toFixed(2)}
                        </span>
                        <Badge variant="destructive" className="text-xs">
                          Save {basicPricing.savingsPercentage}%!
                        </Badge>
                      </div>
                      <p className="text-lg font-bold text-green-600">
                        ${basicPricing.finalPrice.toFixed(2)}
                      </p>
                    </div>

                    {/* Featured Pricing */}
                    <div className="space-y-1 pt-2 border-t border-gray-200">
                      <p className="text-xs text-yellow-600 uppercase font-medium">Featured Plan</p>
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-sm text-gray-400 line-through">
                          ${featuredPricing.originalPrice.toFixed(2)}
                        </span>
                        <Badge variant="destructive" className="text-xs">
                          Save {featuredPricing.savingsPercentage}%!
                        </Badge>
                      </div>
                      <p className="text-lg font-bold text-yellow-600">
                        ${featuredPricing.finalPrice.toFixed(2)}
                      </p>
                      <p className="text-xs text-yellow-700">+$10/mo upgrade</p>
                    </div>

                    {option.months > 1 && (
                      <div className="mt-2 p-2 bg-red-50 rounded">
                        <p className="text-xs text-red-600 font-medium">
                          🔥 Limited Time: Save {option.discount}%!
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Current Selection Summary */}
      {selectedOptions.selectedPricingTier && selectedOptions.durationMonths && (
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg border">
          <h4 className="font-semibold text-lg mb-3">Your Selection / Lựa Chọn Của Bạn</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Plan / Gói:</p>
              <p className="font-semibold capitalize flex items-center gap-2">
                {selectedOptions.selectedPricingTier} Listing
                {selectedOptions.selectedPricingTier === 'featured' && (
                  <Badge className="bg-yellow-500">
                    <Crown className="w-3 h-3 mr-1" />
                    FEATURED
                  </Badge>
                )}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Duration / Thời hạn:</p>
              <p className="font-semibold">{getDurationOption(selectedOptions.durationMonths)?.label}</p>
            </div>
            <div className="md:col-span-2">
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-sm text-gray-600">Original Price:</p>
                  <p className="text-lg text-gray-400 line-through">
                    ${getSalonPostPricingSummary(selectedOptions).originalPrice.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Your Price:</p>
                  <p className="text-2xl font-bold text-green-600">
                    ${getSalonPostPricingSummary(selectedOptions).finalPrice.toFixed(2)}
                  </p>
                </div>
                <div>
                  <Badge variant="destructive" className="text-sm">
                    🎉 Save {getSalonPostPricingSummary(selectedOptions).savingsPercentage}%!
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalonPlanSelectionWithoutPrices;
