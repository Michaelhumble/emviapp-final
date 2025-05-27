
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Check, Star, Zap } from 'lucide-react';
import { SalonPricingOptions, calculateSalonPostPrice, getPlanDetails } from '@/utils/posting/salonPricing';

interface SalonPricingSectionProps {
  options: SalonPricingOptions;
  onOptionsChange: (options: SalonPricingOptions) => void;
  onNext: () => void;
  onBack: () => void;
}

const SalonPricingSection: React.FC<SalonPricingSectionProps> = ({
  options,
  onOptionsChange,
  onNext,
  onBack
}) => {
  const [selectedDuration, setSelectedDuration] = useState<number>(options.durationMonths || 1);
  const [featureBoost, setFeatureBoost] = useState<boolean>(options.featuredBoost || false);

  const plans = [
    { duration: 1, tier: 'standard' as const },
    { duration: 6, tier: 'premium' as const },
    { duration: 12, tier: 'enterprise' as const }
  ];

  const handlePlanSelect = (duration: number, tier: 'standard' | 'premium' | 'enterprise') => {
    setSelectedDuration(duration);
    const updatedOptions: SalonPricingOptions = {
      ...options,
      durationMonths: duration,
      selectedPricingTier: tier,
      featuredBoost: featureBoost
    };
    onOptionsChange(updatedOptions);
  };

  const handleFeatureBoostToggle = (enabled: boolean) => {
    setFeatureBoost(enabled);
    const updatedOptions: SalonPricingOptions = {
      ...options,
      durationMonths: selectedDuration,
      selectedPricingTier: selectedDuration === 1 ? 'standard' : selectedDuration === 6 ? 'premium' : 'enterprise',
      featuredBoost: enabled
    };
    onOptionsChange(updatedOptions);
  };

  const handleNext = () => {
    if (selectedDuration) {
      onNext();
    }
  };

  const currentPrice = calculateSalonPostPrice({
    ...options,
    durationMonths: selectedDuration,
    featuredBoost: featureBoost
  });

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Choose Your Plan</h2>
        <p className="text-gray-600">Select the perfect plan for your salon listing</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {plans.map(({ duration, tier }) => {
          const planDetails = getPlanDetails(duration);
          const isSelected = selectedDuration === duration;
          const planPrice = calculateSalonPostPrice({
            durationMonths: duration,
            selectedPricingTier: tier,
            featuredBoost: featureBoost
          });

          return (
            <Card 
              key={duration}
              className={`relative cursor-pointer transition-all hover:shadow-lg ${
                isSelected ? 'ring-2 ring-purple-500 shadow-lg' : ''
              } ${duration === 6 ? 'border-purple-200 bg-purple-50' : ''}`}
              onClick={() => handlePlanSelect(duration, tier)}
            >
              {duration === 6 && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-purple-500 text-white">Most Popular</Badge>
                </div>
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2">
                  {duration === 12 && <Star className="h-5 w-5 text-yellow-500" />}
                  {planDetails.name}
                </CardTitle>
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-purple-600">
                    ${planPrice.toFixed(2)}
                  </div>
                  {planDetails.originalPrice && (
                    <div className="space-y-1">
                      <div className="text-sm text-gray-500 line-through">
                        ${planDetails.originalPrice.toFixed(2)}
                      </div>
                      <Badge variant="secondary" className="text-green-600">
                        Save {planDetails.savings}%
                      </Badge>
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-600">{planDetails.description}</p>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-2">
                  {planDetails.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button
                  className={`w-full mt-4 ${
                    isSelected 
                      ? 'bg-purple-600 hover:bg-purple-700' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => handlePlanSelect(duration, tier)}
                >
                  {isSelected ? 'Selected' : 'Select Plan'}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Feature Boost Toggle */}
      <Card className="border-orange-200 bg-orange-50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-orange-100 p-2 rounded-full">
                <Zap className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-orange-900">Feature Boost</h3>
                <p className="text-sm text-orange-700">
                  Get premium placement and enhanced visibility
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-orange-900">+$25</span>
              <Switch
                checked={featureBoost}
                onCheckedChange={handleFeatureBoostToggle}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Price Summary */}
      <Card className="bg-purple-50 border-purple-200">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium">Total Price:</span>
            <span className="text-2xl font-bold text-purple-600">
              ${currentPrice.toFixed(2)}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onBack}>
          Back to Photos
        </Button>
        <Button 
          onClick={handleNext}
          disabled={!selectedDuration}
          className="bg-purple-600 hover:bg-purple-700"
        >
          Continue to Payment
        </Button>
      </div>
    </div>
  );
};

export default SalonPricingSection;
