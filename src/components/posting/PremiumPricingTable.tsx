
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Check, Star, Crown, Diamond, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PricingOptions, JobPricingTier } from '@/utils/posting/types';
import { jobPricingOptions, getJobPrice } from '@/utils/posting/jobPricing';

interface PremiumPricingTableProps {
  pricingOptions: PricingOptions;
  onOptionsChange: (options: PricingOptions) => void;
  onProceedToPayment: () => void;
  isLoading?: boolean;
}

const PremiumPricingTable: React.FC<PremiumPricingTableProps> = ({
  pricingOptions,
  onOptionsChange,
  onProceedToPayment,
  isLoading = false
}) => {
  const [selectedDuration, setSelectedDuration] = useState(pricingOptions.durationMonths);

  const handleTierChange = (tier: JobPricingTier) => {
    onOptionsChange({
      ...pricingOptions,
      selectedPricingTier: tier
    });
  };

  const handleDurationChange = (months: number) => {
    setSelectedDuration(months);
    onOptionsChange({
      ...pricingOptions,
      durationMonths: months
    });
  };

  const handleToggleChange = (key: keyof PricingOptions, value: boolean) => {
    onOptionsChange({
      ...pricingOptions,
      [key]: value
    });
  };

  const getIcon = (tier: JobPricingTier) => {
    switch (tier) {
      case 'standard': return <Zap className="h-5 w-5" />;
      case 'premium': return <Star className="h-5 w-5" />;
      case 'gold': return <Crown className="h-5 w-5" />;
      case 'diamond': return <Diamond className="h-5 w-5" />;
      default: return <Zap className="h-5 w-5" />;
    }
  };

  const getPriceForDuration = (basePlan: any, duration: number) => {
    const tempOptions = { ...pricingOptions, selectedPricingTier: basePlan.tier, durationMonths: duration };
    const pricing = getJobPrice(tempOptions);
    return pricing;
  };

  const finalPricing = getJobPrice(pricingOptions);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Choose Your Plan
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Get your job in front of the right candidates with our premium placement options
        </p>
      </div>

      {/* Duration Selector */}
      <div className="flex justify-center mb-6">
        <div className="bg-gray-50 p-1 rounded-lg inline-flex space-x-1">
          {[1, 3, 6].map((months) => (
            <button
              key={months}
              onClick={() => handleDurationChange(months)}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-all",
                selectedDuration === months
                  ? "bg-white shadow-sm text-purple-600"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              {months} Month{months > 1 ? 's' : ''}
              {months === 3 && (
                <Badge className="ml-1 bg-green-100 text-green-800 text-xs">Best Value</Badge>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {jobPricingOptions.map((plan) => {
          const isSelected = pricingOptions.selectedPricingTier === plan.tier;
          const pricing = getPriceForDuration(plan, selectedDuration);
          const isDiamond = plan.tier === 'diamond';
          
          return (
            <Card 
              key={plan.id}
              className={cn(
                "relative overflow-hidden transition-all duration-300 hover:scale-105 cursor-pointer",
                isSelected && "ring-2 ring-purple-500 shadow-xl",
                plan.popular && "border-purple-200 shadow-lg",
                isDiamond && "border-gradient-to-r from-indigo-500 to-purple-600"
              )}
              onClick={() => !isDiamond && handleTierChange(plan.tier)}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-purple-600 text-white px-3 py-1">Most Popular</Badge>
                </div>
              )}
              
              {isDiamond && plan.limitedSpots && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-red-500 text-white px-3 py-1 animate-pulse">
                    {plan.limitedSpots}
                  </Badge>
                </div>
              )}

              <CardContent className="p-6 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className={cn("p-2 rounded-lg", 
                      plan.color === 'blue' && "bg-blue-100 text-blue-600",
                      plan.color === 'purple' && "bg-purple-100 text-purple-600",
                      plan.color === 'amber' && "bg-amber-100 text-amber-600",
                      plan.color === 'indigo' && "bg-indigo-100 text-indigo-600"
                    )}>
                      {getIcon(plan.tier)}
                    </div>
                    <h3 className="text-lg font-semibold">{plan.name}</h3>
                  </div>
                  {isSelected && !isDiamond && (
                    <div className="w-4 h-4 bg-purple-600 rounded-full flex items-center justify-center">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  {!isDiamond ? (
                    <div className="space-y-1">
                      <div className="flex items-baseline space-x-1">
                        <span className="text-3xl font-bold">${pricing.finalPrice.toFixed(2)}</span>
                        {selectedDuration > 1 && (
                          <span className="text-sm text-gray-500">
                            (~${(pricing.finalPrice / selectedDuration).toFixed(2)}/mo)
                          </span>
                        )}
                      </div>
                      {pricing.discountPercentage > 0 && (
                        <div className="flex items-center space-x-2">
                          <span className="text-sm line-through text-gray-400">
                            ${pricing.originalPrice.toFixed(2)}
                          </span>
                          <Badge className="bg-green-100 text-green-800 text-xs">
                            Save {pricing.discountPercentage}%
                          </Badge>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="text-2xl font-bold text-indigo-600">Invitation Only</div>
                      <p className="text-sm text-gray-500">Contact for custom pricing</p>
                    </div>
                  )}
                </div>

                <p className="text-sm text-gray-600 mb-4">{plan.description}</p>

                <div className="space-y-2 flex-1">
                  {plan.features?.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  {isDiamond ? (
                    <Button 
                      variant="outline" 
                      className="w-full border-indigo-200 text-indigo-600 hover:bg-indigo-50"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle waitlist/contact logic
                        window.open('mailto:support@emviapp.com?subject=Diamond Plan Interest', '_blank');
                      }}
                    >
                      Join Waitlist
                    </Button>
                  ) : (
                    <Button 
                      variant={isSelected ? "default" : "outline"}
                      className={cn(
                        "w-full",
                        isSelected && "bg-purple-600 hover:bg-purple-700",
                        plan.popular && !isSelected && "border-purple-200 text-purple-600 hover:bg-purple-50"
                      )}
                    >
                      {isSelected ? 'Selected' : 'Select Plan'}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Additional Options */}
      <div className="max-w-md mx-auto space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="space-y-1">
            <Label className="text-sm font-medium">Auto-renew</Label>
            <p className="text-xs text-gray-500">Save 5% with automatic renewal</p>
          </div>
          <Switch
            checked={pricingOptions.autoRenew || false}
            onCheckedChange={(checked) => handleToggleChange('autoRenew', checked)}
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="space-y-1">
            <Label className="text-sm font-medium">Nationwide visibility</Label>
            <p className="text-xs text-gray-500">+$5 - Show to candidates across the country</p>
          </div>
          <Switch
            checked={pricingOptions.isNationwide || false}
            onCheckedChange={(checked) => handleToggleChange('isNationwide', checked)}
          />
        </div>
      </div>

      {/* Final Summary & CTA */}
      <div className="max-w-md mx-auto">
        <Card className="border-2 border-purple-100">
          <CardContent className="p-6 text-center space-y-4">
            <h3 className="text-lg font-semibold">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Plan:</span>
                <span className="font-medium">{jobPricingOptions.find(p => p.tier === pricingOptions.selectedPricingTier)?.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Duration:</span>
                <span>{selectedDuration} month{selectedDuration > 1 ? 's' : ''}</span>
              </div>
              {finalPricing.discountPercentage > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount:</span>
                  <span>-{finalPricing.discountPercentage}%</span>
                </div>
              )}
              <div className="border-t pt-2 flex justify-between font-bold">
                <span>Total:</span>
                <span>${finalPricing.finalPrice.toFixed(2)}</span>
              </div>
            </div>
            
            <Button 
              onClick={onProceedToPayment}
              disabled={isLoading || pricingOptions.selectedPricingTier === 'diamond'}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              size="lg"
            >
              {isLoading ? 'Processing...' : 'Proceed to Payment'}
            </Button>
            
            <p className="text-xs text-gray-500">
              Secure payment powered by Stripe
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PremiumPricingTable;
