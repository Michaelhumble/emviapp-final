
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Sparkles, Crown, Diamond } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { DurationSelector } from '@/components/posting/pricing/DurationSelector';
import { SummaryTotals } from '@/components/posting/pricing/SummaryTotals';
import { calculatePricing } from '@/utils/posting/pricing';

interface JobPricingTableProps {
  onPricingSelect: (selectedTier: string, finalPrice: number, durationMonths: number) => void;
  jobData?: any;
}

const pricingTiers = [
  {
    id: 'free',
    name: 'Basic',
    price: 0,
    description: 'Get started with basic job posting',
    features: [
      'Basic job listing',
      '30-day visibility',
      'Standard support',
      'Basic applicant tracking'
    ],
    icon: Check,
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200'
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 29,
    popular: true,
    description: 'Enhanced visibility and features',
    features: [
      'Priority placement',
      'Featured badge',
      'Extended 60-day visibility',
      'Advanced applicant filtering',
      'Email notifications'
    ],
    icon: Sparkles,
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200'
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 59,
    description: 'Maximum exposure and premium features',
    features: [
      'Top placement guarantee',
      'Premium badge',
      '90-day visibility',
      'Unlimited applicant access',
      'Priority support',
      'Analytics dashboard'
    ],
    icon: Crown,
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200'
  },
  {
    id: 'diamond',
    name: 'Diamond',
    price: 199,
    description: 'Ultimate package for serious hiring',
    features: [
      'Exclusive top position',
      'Diamond badge',
      '120-day visibility',
      'Dedicated account manager',
      'Custom branding',
      'Advanced analytics',
      'Social media promotion'
    ],
    icon: Diamond,
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  }
];

const JobPricingTable: React.FC<JobPricingTableProps> = ({ onPricingSelect, jobData }) => {
  const [selectedTier, setSelectedTier] = useState<string>('standard');
  const [durationMonths, setDurationMonths] = useState<number>(1);
  const [autoRenew, setAutoRenew] = useState<boolean>(true);

  const { originalPrice, finalPrice, discountPercentage } = calculatePricing(
    selectedTier,
    durationMonths,
    autoRenew,
    false, // isFirstPost
    false  // isNationwide
  );

  const handleContinue = () => {
    onPricingSelect(selectedTier, finalPrice, durationMonths);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Choose Your Job Posting Plan</h2>
        <p className="text-gray-600 text-lg">
          Get your job in front of qualified candidates with our flexible pricing options
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {pricingTiers.map((tier) => {
          const Icon = tier.icon;
          const isSelected = selectedTier === tier.id;
          
          return (
            <Card
              key={tier.id}
              className={cn(
                'relative cursor-pointer transition-all duration-200 hover:shadow-lg',
                tier.bgColor,
                tier.borderColor,
                isSelected ? 'ring-2 ring-purple-500 shadow-lg transform scale-105' : 'hover:border-purple-300'
              )}
              onClick={() => setSelectedTier(tier.id)}
            >
              {tier.popular && (
                <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white">
                  Most Popular
                </Badge>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-2">
                  <Icon className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl">{tier.name}</CardTitle>
                <div className="text-3xl font-bold text-gray-900">
                  ${tier.price}
                  <span className="text-sm font-normal text-gray-500">/month</span>
                </div>
                <p className="text-sm text-gray-600">{tier.description}</p>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button
                  className={cn(
                    'w-full mt-6',
                    isSelected 
                      ? 'bg-purple-600 hover:bg-purple-700' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  )}
                  onClick={() => setSelectedTier(tier.id)}
                >
                  {isSelected ? 'Selected' : 'Select Plan'}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="bg-white rounded-lg border p-6 space-y-6">
        <DurationSelector
          durationMonths={durationMonths}
          onDurationChange={setDurationMonths}
          selectedPricingTier={selectedTier}
          isDiamondPlan={selectedTier === 'diamond'}
        />
        
        <SummaryTotals
          originalPrice={originalPrice}
          finalPrice={finalPrice}
          discountPercentage={discountPercentage}
          durationMonths={durationMonths}
          autoRenew={autoRenew}
          onAutoRenewChange={setAutoRenew}
        />
        
        <div className="flex justify-between items-center pt-4 border-t">
          <p className="text-sm text-gray-500">
            Secure payment processed by Stripe
          </p>
          <Button
            size="lg"
            className="bg-purple-600 hover:bg-purple-700 text-white px-8"
            onClick={handleContinue}
          >
            Continue to Payment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobPricingTable;
