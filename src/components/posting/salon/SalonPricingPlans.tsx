
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Check, Star, Zap, Crown, Trophy } from 'lucide-react';
import { SALON_PRICING_PLANS, SalonPricingTier, SalonPricingOptions, FEATURED_ADDON_PRICE, calculateSalonPostPrice } from '@/utils/posting/salonPricing';

interface SalonPricingPlansProps {
  selectedOptions: SalonPricingOptions;
  onPlanSelect: (tier: SalonPricingTier) => void;
  onFeaturedAddonChange?: (featured: boolean) => void;
}

const SalonPricingPlans: React.FC<SalonPricingPlansProps> = ({
  selectedOptions,
  onPlanSelect,
  onFeaturedAddonChange
}) => {
  const getPlanIcon = (tier: SalonPricingTier) => {
    switch (tier) {
      case 'basic': return <Zap className="h-6 w-6" />;
      case 'gold': return <Star className="h-6 w-6" />;
      case 'premium': return <Crown className="h-6 w-6" />;
      case 'annual': return <Trophy className="h-6 w-6" />;
      default: return <Zap className="h-6 w-6" />;
    }
  };

  const getPlanGradient = (tier: SalonPricingTier) => {
    switch (tier) {
      case 'basic': return 'from-blue-500 to-blue-600';
      case 'gold': return 'from-yellow-500 to-orange-500';
      case 'premium': return 'from-purple-600 to-pink-600';
      case 'annual': return 'from-green-500 to-emerald-600';
      default: return 'from-blue-500 to-blue-600';
    }
  };

  const handleFeaturedAddonChange = (checked: boolean) => {
    if (onFeaturedAddonChange) {
      onFeaturedAddonChange(checked);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Choose Your Listing Plan
        </h3>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Select the perfect plan to showcase your salon to thousands of potential buyers
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {SALON_PRICING_PLANS.map((plan) => {
          const isSelected = selectedOptions.selectedPricingTier === plan.tier;
          const isPopular = plan.tier === 'premium';
          const gradient = getPlanGradient(plan.tier);
          const hasSavings = plan.originalPrice && plan.originalPrice > plan.price;
          
          return (
            <Card 
              key={plan.id}
              className={`relative transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-2xl ${
                isSelected 
                  ? 'border-2 border-purple-500 shadow-2xl ring-4 ring-purple-200 scale-105' 
                  : 'border border-gray-200 hover:border-purple-300 shadow-lg'
              } backdrop-blur-sm bg-white/95`}
              onClick={() => onPlanSelect(plan.tier)}
            >
              {isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge className={`bg-gradient-to-r ${gradient} text-white px-4 py-1 text-sm font-semibold shadow-lg`}>
                    ⭐ Most Popular
                  </Badge>
                </div>
              )}

              {hasSavings && (
                <div className="absolute -top-2 -right-2 z-10">
                  <Badge variant="destructive" className="text-xs font-bold animate-pulse">
                    {plan.savings || 'SAVE!'}
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4 pt-6">
                <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${gradient} flex items-center justify-center text-white mb-4 shadow-lg`}>
                  {getPlanIcon(plan.tier)}
                </div>
                
                <CardTitle className="text-xl font-bold text-gray-900">{plan.name}</CardTitle>
                
                <div className="mt-4">
                  <div className="flex items-center justify-center flex-col">
                    {hasSavings && (
                      <div className="text-lg text-gray-500 line-through mb-1">
                        ${plan.originalPrice}
                      </div>
                    )}
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold text-gray-900">
                        ${plan.price}
                      </span>
                      <span className="text-gray-600 ml-2">
                        /{plan.duration === 1 ? 'mo' : `${plan.duration}mo`}
                      </span>
                    </div>
                  </div>
                  {plan.tier === 'annual' && (
                    <div className="text-sm text-green-600 font-semibold mt-1">
                      Save $150 vs monthly!
                    </div>
                  )}
                </div>
                
                <p className="text-sm text-gray-600 mt-3 leading-relaxed">{plan.description}</p>
              </CardHeader>
              
              <CardContent className="pt-0 pb-6">
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-sm text-gray-700">
                      <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full py-3 font-semibold text-base transition-all duration-200 ${
                    isSelected 
                      ? `bg-gradient-to-r ${gradient} hover:opacity-90 text-white shadow-lg` 
                      : `bg-gradient-to-r ${gradient} hover:opacity-90 text-white shadow-md hover:shadow-lg`
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onPlanSelect(plan.tier);
                  }}
                >
                  {isSelected ? '✓ Selected' : 'Select Plan'}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Featured Placement Add-on */}
      <div className="max-w-2xl mx-auto">
        <Card className="border-2 border-dashed border-purple-300 bg-purple-50/50">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <Checkbox
                id="featured-addon"
                checked={selectedOptions.featuredAddon}
                onCheckedChange={handleFeaturedAddonChange}
                className="mt-1"
              />
              <div className="flex-1">
                <label htmlFor="featured-addon" className="cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-semibold text-purple-900">
                      ⭐ Featured Placement Add-on
                    </h4>
                    <span className="text-lg font-bold text-purple-700">
                      +${FEATURED_ADDON_PRICE}
                    </span>
                  </div>
                  <p className="text-sm text-purple-700 leading-relaxed">
                    Get your salon listing featured prominently at the top of search results and category pages. 
                    Increase visibility by up to 3x with this premium placement upgrade.
                  </p>
                </label>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pricing Summary */}
      {selectedOptions.selectedPricingTier && (
        <div className="max-w-md mx-auto">
          <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
            <CardContent className="p-6">
              <h4 className="font-semibold text-lg mb-4 text-center">Order Summary</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>
                    {SALON_PRICING_PLANS.find(p => p.tier === selectedOptions.selectedPricingTier)?.name}
                  </span>
                  <span>
                    ${SALON_PRICING_PLANS.find(p => p.tier === selectedOptions.selectedPricingTier)?.price}
                  </span>
                </div>
                {selectedOptions.featuredAddon && (
                  <div className="flex justify-between text-purple-700">
                    <span>Featured Placement</span>
                    <span>+${FEATURED_ADDON_PRICE}</span>
                  </div>
                )}
                <div className="border-t pt-2 mt-3">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${calculateSalonPostPrice(selectedOptions).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="text-center text-sm text-gray-500 max-w-2xl mx-auto">
        <p>All plans include secure payment processing, dedicated support, and a 30-day satisfaction guarantee.</p>
      </div>
    </div>
  );
};

export default SalonPricingPlans;
