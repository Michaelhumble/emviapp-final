
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Crown, Zap } from 'lucide-react';

export interface PremiumJobPricingCardsProps {
  onPricingSelect: (tier: string, finalPrice: number, durationMonths: number) => void;
  jobData?: any;
  disabled?: boolean;
}

const PremiumJobPricingCards: React.FC<PremiumJobPricingCardsProps> = ({ 
  onPricingSelect, 
  jobData,
  disabled = false 
}) => {
  const pricingTiers = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      duration: 7,
      description: 'Basic job posting',
      features: [
        '7-day visibility',
        'Basic job details',
        'Standard support'
      ],
      icon: Star,
      popular: false,
      buttonText: 'Post for Free'
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 39.99,
      duration: 30,
      description: 'Enhanced visibility',
      features: [
        '30-day visibility',
        'Priority placement',
        'Enhanced job details',
        'Email support'
      ],
      icon: Crown,
      popular: true,
      buttonText: 'Choose Premium'
    },
    {
      id: 'featured',
      name: 'Featured',
      price: 79.99,
      duration: 30,
      description: 'Maximum exposure',
      features: [
        '30-day visibility',
        'Top placement',
        'Highlighted listing',
        'Priority support',
        'Social media boost'
      ],
      icon: Zap,
      popular: false,
      buttonText: 'Go Featured'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {pricingTiers.map((tier) => {
        const Icon = tier.icon;
        return (
          <Card 
            key={tier.id} 
            className={`relative ${tier.popular ? 'border-primary shadow-lg' : ''}`}
          >
            {tier.popular && (
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
                Most Popular
              </Badge>
            )}
            
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">{tier.name}</CardTitle>
              <div className="text-3xl font-bold">
                {tier.price === 0 ? 'Free' : `$${tier.price}`}
              </div>
              <p className="text-muted-foreground">{tier.description}</p>
            </CardHeader>
            
            <CardContent>
              <ul className="space-y-3 mb-6">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                className="w-full" 
                variant={tier.popular ? 'default' : 'outline'}
                onClick={() => onPricingSelect(tier.id, tier.price, tier.duration)}
                disabled={disabled}
              >
                {tier.buttonText}
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default PremiumJobPricingCards;
