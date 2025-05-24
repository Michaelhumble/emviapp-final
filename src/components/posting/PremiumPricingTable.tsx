
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Sparkles, Zap } from 'lucide-react';
import { PricingOptions, JobPricingTier } from '@/utils/posting/types';
import { jobPricingOptions } from '@/utils/posting/jobPricing';

interface PremiumPricingTableProps {
  selectedTier: JobPricingTier;
  durationMonths: number;
  autoRenew: boolean;
  isNationwide: boolean;
  onPricingChange: (options: PricingOptions) => void;
  onProceedToPayment: () => void;
  onBack: () => void;
  isLoading: boolean;
  totalPrice: number;
  originalPrice: number;
  discountPercentage: number;
}

const PremiumPricingTable: React.FC<PremiumPricingTableProps> = ({
  selectedTier,
  durationMonths,
  autoRenew,
  isNationwide,
  onPricingChange,
  onProceedToPayment,
  onBack,
  isLoading,
  totalPrice,
  originalPrice,
  discountPercentage
}) => {
  const getIcon = (tier: JobPricingTier) => {
    switch (tier) {
      case 'standard': return <Check className="w-5 h-5" />;
      case 'premium': return <Sparkles className="w-5 h-5" />;
      case 'gold': return <Crown className="w-5 h-5" />;
      case 'diamond': return <Zap className="w-5 h-5" />;
      default: return <Check className="w-5 h-5" />;
    }
  };

  const handleTierSelect = (tier: JobPricingTier) => {
    onPricingChange({
      selectedPricingTier: tier,
      durationMonths,
      autoRenew,
      isNationwide
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">Choose Your Plan</h2>
        <p className="text-lg text-gray-600">Select the perfect plan to get your job posting seen by the right candidates</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {jobPricingOptions.map((option) => (
          <Card 
            key={option.id}
            className={`relative cursor-pointer transition-all duration-200 ${
              selectedTier === option.tier 
                ? 'ring-2 ring-purple-500 shadow-lg transform scale-105' 
                : 'hover:shadow-md hover:scale-102'
            } ${option.popular ? 'border-purple-500' : ''}`}
            onClick={() => handleTierSelect(option.tier)}
          >
            {option.popular && (
              <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-purple-500">
                Most Popular
              </Badge>
            )}
            
            <CardHeader className="text-center pb-4">
              <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2 ${
                option.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                option.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                option.color === 'amber' ? 'bg-amber-100 text-amber-600' :
                'bg-indigo-100 text-indigo-600'
              }`}>
                {getIcon(option.tier)}
              </div>
              <CardTitle className="text-xl">{option.name}</CardTitle>
              <div className="text-3xl font-bold">${option.price}</div>
              <p className="text-sm text-gray-600">{option.description}</p>
            </CardHeader>
            
            <CardContent>
              <ul className="space-y-2">
                {option.features?.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              {option.limitedSpots && (
                <div className="mt-4 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-800 text-center">
                  {option.limitedSpots}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pricing Summary */}
      <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Order Summary</h3>
              <p className="text-gray-600">{jobPricingOptions.find(o => o.tier === selectedTier)?.name} Plan</p>
            </div>
            <div className="text-right">
              {discountPercentage > 0 && (
                <div className="text-sm text-gray-500 line-through">${originalPrice.toFixed(2)}</div>
              )}
              <div className="text-2xl font-bold text-purple-600">${totalPrice.toFixed(2)}</div>
              {discountPercentage > 0 && (
                <div className="text-sm text-green-600">Save {discountPercentage}%</div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back to Job Details
        </Button>
        <Button 
          onClick={onProceedToPayment}
          disabled={isLoading}
          className="bg-purple-600 hover:bg-purple-700 text-white px-8"
        >
          {isLoading ? 'Processing...' : `Proceed to Payment - $${totalPrice.toFixed(2)}`}
        </Button>
      </div>
    </div>
  );
};

export default PremiumPricingTable;
