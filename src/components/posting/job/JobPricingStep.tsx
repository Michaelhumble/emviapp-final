
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Zap } from "lucide-react";
import { PricingOptions, JobPricingTier } from "@/utils/posting/types";

interface JobPricingStepProps {
  onSubmit: (pricingOptions: PricingOptions) => void;
  isLoading?: boolean;
}

const JobPricingStep = ({ onSubmit, isLoading = false }: JobPricingStepProps) => {
  const [selectedTier, setSelectedTier] = useState<JobPricingTier>('standard');
  const [durationMonths, setDurationMonths] = useState(1);

  const pricingTiers = [
    {
      id: 'free' as JobPricingTier,
      name: 'Free Post',
      price: 0,
      description: 'Basic job posting',
      features: ['7-day listing', 'Basic visibility', 'Standard support'],
      tag: 'Limited Time'
    },
    {
      id: 'standard' as JobPricingTier,
      name: 'Standard',
      price: 29,
      description: 'Enhanced visibility and features',
      features: ['30-day listing', 'Enhanced visibility', 'Priority support', 'Social media sharing'],
      popular: true
    },
    {
      id: 'premium' as JobPricingTier,
      name: 'Premium',
      price: 59,
      description: 'Maximum exposure and priority placement',
      features: ['60-day listing', 'Top placement', 'Featured badge', 'Priority support', 'Analytics dashboard'],
      tag: 'Most Popular'
    },
    {
      id: 'gold' as JobPricingTier,
      name: 'Gold',
      price: 99,
      description: 'Premium features with extended reach',
      features: ['90-day listing', 'Premium placement', 'Gold badge', 'Dedicated support', 'Advanced analytics', 'Social promotion'],
      tag: 'Best Value'
    }
  ];

  const handleTierChange = (value: string) => {
    setSelectedTier(value as JobPricingTier);
  };

  const handleSubmit = () => {
    const selectedPricing = pricingTiers.find(tier => tier.id === selectedTier);
    
    const pricingOptions: PricingOptions = {
      selectedPricingTier: selectedTier,
      durationMonths,
      isFirstPost: false,
      autoRenew: false
    };

    onSubmit(pricingOptions);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Choose Your Job Posting Plan</h2>
        <p className="text-muted-foreground">
          Select the plan that best fits your hiring needs
        </p>
      </div>

      <RadioGroup value={selectedTier} onValueChange={handleTierChange}>
        <div className="grid gap-4">
          {pricingTiers.map((tier) => (
            <Card 
              key={tier.id} 
              className={`relative cursor-pointer transition-all hover:shadow-md ${
                selectedTier === tier.id ? 'ring-2 ring-primary' : ''
              } ${tier.popular ? 'border-primary' : ''}`}
            >
              {tier.tag && (
                <Badge className="absolute -top-2 left-4 bg-primary">
                  {tier.tag}
                </Badge>
              )}
              
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value={tier.id} id={tier.id} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{tier.name}</CardTitle>
                      <div className="text-right">
                        <div className="text-2xl font-bold">
                          ${tier.price}
                          {tier.price > 0 && <span className="text-sm font-normal text-muted-foreground">/post</span>}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{tier.description}</p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-2">
                  {tier.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
              
              <Label htmlFor={tier.id} className="absolute inset-0 cursor-pointer" />
            </Card>
          ))}
        </div>
      </RadioGroup>

      <div className="flex justify-between items-center pt-6">
        <div className="text-sm text-muted-foreground">
          Duration: {durationMonths} month{durationMonths > 1 ? 's' : ''}
        </div>
        
        <Button 
          onClick={handleSubmit} 
          size="lg"
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Continue to Payment'}
        </Button>
      </div>
    </div>
  );
};

export default JobPricingStep;
