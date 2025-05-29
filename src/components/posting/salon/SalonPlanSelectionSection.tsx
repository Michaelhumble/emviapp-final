import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, Star } from 'lucide-react';
import { SalonPricingTier, DURATION_OPTIONS } from '@/utils/posting/salonPricing';

interface SalonPlanSelectionSectionProps {
  selectedTier?: SalonPricingTier;
  onTierChange?: (tier: SalonPricingTier) => void;
  selectedDuration?: number;
  onDurationChange?: (months: number) => void;
}

const FeatureItem = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center space-x-2">
    <Check className="h-4 w-4 text-green-500" />
    <span>{children}</span>
  </div>
);

const SalonPlanSelectionSection = ({ 
  selectedTier, 
  onTierChange, 
  selectedDuration, 
  onDurationChange 
}: SalonPlanSelectionSectionProps) => {
  const handleTierSelect = (tier: SalonPricingTier) => {
    onTierChange?.(tier);
  };

  const handleDurationSelect = (months: number) => {
    onDurationChange?.(months);
  };

  // Change "basic" to "standard" for SalonPricingTier compatibility
  const currentTier: SalonPricingTier = selectedTier || 'standard';

  return (
    <div className="space-y-6">
      {/* Header and Description */}
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">Choose a Plan</h2>
        <p className="text-muted-foreground">
          Select the plan that best suits your needs.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card className={`relative ${currentTier === 'standard' ? 'ring-2 ring-blue-500' : ''}`}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Standard Listing
              {currentTier === 'standard' && (
                <Badge className="bg-blue-100 text-blue-800">Selected</Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => handleTierSelect('standard')}
              className="w-full"
              variant={currentTier === 'standard' ? 'default' : 'outline'}
            >
              Select Standard Plan
            </Button>
          </CardContent>
        </Card>

        <Card className={`relative ${currentTier === 'featured' ? 'ring-2 ring-blue-500' : ''}`}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Featured Listing
              {currentTier === 'featured' && (
                <Badge className="bg-blue-100 text-blue-800">Selected</Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => handleTierSelect('featured')}
              className="w-full"
              variant={currentTier === 'featured' ? 'default' : 'outline'}
            >
              Select Featured Plan
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Duration Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Choose Duration</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {DURATION_OPTIONS.map((option) => (
            <Card 
              key={option.months}
              className={`cursor-pointer transition-all ${
                selectedDuration === option.months ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => handleDurationSelect(option.months)}
            >
              <CardContent className="p-4 text-center">
                <div className="font-semibold">{option.label}</div>
                <div className="text-2xl font-bold text-blue-600">${option.price}</div>
                {/* Replace .days with .months */}
                <div className="text-sm text-gray-600">
                  {option.months} {option.months === 1 ? 'month' : 'months'}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalonPlanSelectionSection;
