
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Crown, Star, Zap, Diamond, CheckCircle2 } from 'lucide-react';
import { JobPricingTier, PricingOptions } from '@/utils/posting/types';

interface JobPricingStepProps {
  onNext: (pricingData: PricingOptions) => void;
  onBack: () => void;
  initialData?: Partial<PricingOptions>;
}

const JobPricingStep: React.FC<JobPricingStepProps> = ({ onNext, onBack, initialData }) => {
  const [selectedTier, setSelectedTier] = useState<JobPricingTier>(initialData?.selectedPricingTier || 'standard');
  const [durationMonths, setDurationMonths] = useState(initialData?.durationMonths || 1);
  const [autoRenew, setAutoRenew] = useState(initialData?.autoRenew || false);
  const [isNationwide, setIsNationwide] = useState(initialData?.isNationwide || false);

  const pricingTiers = [
    {
      id: 'free' as JobPricingTier,
      name: 'Free',
      price: 0,
      description: 'Basic listing for 7 days',
      features: ['7-day listing', 'Basic visibility', 'Standard support'],
      icon: <CheckCircle2 className="h-5 w-5" />,
      color: 'text-gray-600'
    },
    {
      id: 'standard' as JobPricingTier,
      name: 'Standard',
      price: 49,
      description: 'Enhanced visibility for 30 days',
      features: ['30-day listing', 'Enhanced visibility', 'Email support', 'Social media promotion'],
      icon: <Star className="h-5 w-5" />,
      color: 'text-blue-600',
      popular: true
    },
    {
      id: 'premium' as JobPricingTier,
      name: 'Premium',
      price: 99,
      description: 'Priority placement for 30 days',
      features: ['Priority placement', 'Featured listing badge', 'Priority support', 'Analytics dashboard'],
      icon: <Crown className="h-5 w-5" />,
      color: 'text-purple-600'
    },
    {
      id: 'gold' as JobPricingTier,
      name: 'Gold',
      price: 199,
      description: 'Maximum exposure for 60 days',
      features: ['Top placement', 'Highlighted listing', 'Dedicated support', 'Advanced analytics'],
      icon: <Zap className="h-5 w-5" />,
      color: 'text-yellow-600'
    }
  ];

  const calculatePrice = () => {
    const tier = pricingTiers.find(t => t.id === selectedTier);
    if (!tier || tier.price === 0) return 0;
    
    let basePrice = tier.price;
    
    // Duration discounts
    if (durationMonths >= 12) basePrice *= 0.8; // 20% off
    else if (durationMonths >= 6) basePrice *= 0.85; // 15% off
    else if (durationMonths >= 3) basePrice *= 0.9; // 10% off
    
    // Auto-renew discount
    if (autoRenew) basePrice *= 0.95; // 5% off
    
    // Nationwide posting
    if (isNationwide) basePrice += 5;
    
    return Math.round(basePrice * 100) / 100;
  };

  const handleProceed = () => {
    const pricingData: PricingOptions = {
      selectedPricingTier: selectedTier,
      durationMonths,
      autoRenew,
      isNationwide
    };
    onNext(pricingData);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Choose Your Job Posting Plan</h2>
        <p className="text-gray-600">Select the plan that best fits your hiring needs</p>
      </div>

      <RadioGroup value={selectedTier} onValueChange={(value) => setSelectedTier(value as JobPricingTier)}>
        <div className="grid gap-4">
          {pricingTiers.map((tier) => (
            <Card key={tier.id} className={`relative cursor-pointer transition-all ${
              selectedTier === tier.id ? 'ring-2 ring-primary' : 'hover:shadow-md'
            }`}>
              {tier.popular && (
                <Badge className="absolute -top-2 left-4 bg-primary">Most Popular</Badge>
              )}
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value={tier.id} id={tier.id} />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <div className={tier.color}>{tier.icon}</div>
                      <Label htmlFor={tier.id} className="font-semibold cursor-pointer">
                        {tier.name}
                      </Label>
                      <span className="font-bold text-lg">
                        {tier.price === 0 ? 'Free' : `$${tier.price}`}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{tier.description}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {tier.features.map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </RadioGroup>

      {selectedTier !== 'free' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Additional Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm font-medium">Duration</Label>
              <RadioGroup value={durationMonths.toString()} onValueChange={(value) => setDurationMonths(parseInt(value))}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1" id="1month" />
                  <Label htmlFor="1month">1 Month</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="3" id="3months" />
                  <Label htmlFor="3months">3 Months (10% off)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="6" id="6months" />
                  <Label htmlFor="6months">6 Months (15% off)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="12" id="12months" />
                  <Label htmlFor="12months">12 Months (20% off)</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="autoRenew" 
                checked={autoRenew}
                onCheckedChange={(checked) => setAutoRenew(checked as boolean)}
              />
              <Label htmlFor="autoRenew" className="text-sm">
                Auto-renew (5% additional discount)
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="nationwide" 
                checked={isNationwide}
                onCheckedChange={(checked) => setIsNationwide(checked as boolean)}
              />
              <Label htmlFor="nationwide" className="text-sm">
                Nationwide posting (+$5)
              </Label>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="bg-gray-50">
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Total:</span>
            <span className="text-2xl font-bold">
              {calculatePrice() === 0 ? 'Free' : `$${calculatePrice()}`}
            </span>
          </div>
        </CardContent>
      </Card>

      <div className="flex space-x-3">
        <Button variant="outline" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button onClick={handleProceed} className="flex-1">
          Proceed to Payment
        </Button>
      </div>
    </div>
  );
};

export default JobPricingStep;
