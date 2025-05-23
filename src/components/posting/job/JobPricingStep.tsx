
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Check, Star, Zap } from "lucide-react";
import { PricingOptions } from "@/utils/posting/types";

const pricingTiers = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    duration: 30,
    features: ['Basic job listing', '30-day visibility', 'Standard support'],
    popular: false,
    color: 'border-gray-200'
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 49,
    duration: 60,
    features: ['Enhanced visibility', '60-day listing', 'Priority support', 'Email notifications'],
    popular: true,
    color: 'border-blue-500'
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 99,
    duration: 90,
    features: ['Maximum visibility', '90-day listing', 'Featured placement', 'Premium support', 'Analytics dashboard'],
    popular: false,
    color: 'border-purple-500'
  },
  {
    id: 'diamond',
    name: 'Diamond',
    price: 199,
    duration: 120,
    features: ['Ultimate visibility', '120-day listing', 'Top placement', 'Dedicated support', 'Advanced analytics', 'Priority matching'],
    popular: false,
    color: 'border-yellow-500'
  }
];

interface JobPricingStepProps {
  onSubmit: (pricingOptions: PricingOptions) => void;
  isLoading?: boolean;
}

const JobPricingStep = ({ onSubmit, isLoading = false }: JobPricingStepProps) => {
  const [selectedTier, setSelectedTier] = useState('standard');
  const [autoRenew, setAutoRenew] = useState(false);
  const [duration, setDuration] = useState('30');

  const handleSubmit = () => {
    const selectedPlan = pricingTiers.find(tier => tier.id === selectedTier);
    if (!selectedPlan) return;

    const pricingOptions: PricingOptions = {
      selectedPricingTier: selectedTier,
      duration: parseInt(duration),
      autoRenew,
      totalPrice: selectedPlan.price,
      features: selectedPlan.features
    };

    onSubmit(pricingOptions);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Choose Your Job Listing Plan</h2>
        <p className="text-gray-600">Select the plan that best fits your hiring needs</p>
      </div>

      <RadioGroup value={selectedTier} onValueChange={setSelectedTier} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {pricingTiers.map((tier) => (
          <div key={tier.id} className="relative">
            <Card className={`cursor-pointer transition-all hover:shadow-md ${
              selectedTier === tier.id ? `ring-2 ring-blue-500 ${tier.color}` : tier.color
            }`}>
              <CardHeader className="text-center pb-4">
                {tier.popular && (
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-500">
                    <Star className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                )}
                <div className="flex items-center justify-center space-x-2">
                  <RadioGroupItem value={tier.id} id={tier.id} />
                  <Label htmlFor={tier.id} className="font-semibold text-lg cursor-pointer">
                    {tier.name}
                  </Label>
                </div>
                <div className="text-3xl font-bold">
                  ${tier.price}
                  {tier.price > 0 && <span className="text-sm font-normal text-gray-500">/listing</span>}
                </div>
                <p className="text-sm text-gray-500">{tier.duration} days visibility</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        ))}
      </RadioGroup>

      {/* Duration Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="h-5 w-5 mr-2" />
            Listing Duration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={duration} onValueChange={setDuration} className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="30" id="duration-30" />
              <Label htmlFor="duration-30">30 days</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="60" id="duration-60" />
              <Label htmlFor="duration-60">60 days (10% off)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="90" id="duration-90" />
              <Label htmlFor="duration-90">90 days (20% off)</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Auto-renewal */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="auto-renew" className="font-medium">Auto-renewal</Label>
              <p className="text-sm text-gray-500">Automatically renew your listing when it expires</p>
            </div>
            <Switch
              id="auto-renew"
              checked={autoRenew}
              onCheckedChange={setAutoRenew}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button 
          onClick={handleSubmit} 
          disabled={isLoading}
          className="px-8 py-2"
          size="lg"
        >
          {isLoading ? "Processing..." : "Continue to Payment"}
        </Button>
      </div>
    </div>
  );
};

export default JobPricingStep;
