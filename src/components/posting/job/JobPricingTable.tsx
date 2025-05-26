
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Crown, Star, Diamond, Sparkles } from 'lucide-react';
import { DurationSelector } from '@/components/posting/pricing/DurationSelector';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface JobPricingTableProps {
  onPricingSelect: (tier: string, finalPrice: number, durationMonths: number) => void;
  jobData?: any;
}

const JobPricingTable: React.FC<JobPricingTableProps> = ({ onPricingSelect, jobData }) => {
  const [selectedTier, setSelectedTier] = useState<string>('premium');
  const [durationMonths, setDurationMonths] = useState<number>(1);

  const pricingPlans = [
    {
      tier: 'free',
      name: 'Free Listing',
      price: 0,
      duration: '30 days',
      features: ['Basic visibility', 'Standard placement', '30-day duration'],
      icon: <Sparkles className="h-6 w-6 text-gray-500" />,
      color: 'border-gray-200',
      popular: false
    },
    {
      tier: 'gold',
      name: 'Gold Featured',
      price: 19.99,
      duration: '30 days',
      features: ['Featured placement', 'Gold badge highlight', 'Enhanced visibility', 'Priority listing'],
      icon: <Star className="h-6 w-6 text-amber-500" />,
      color: 'border-amber-300',
      popular: false
    },
    {
      tier: 'premium',
      name: 'Premium Listing',
      price: 39.99,
      duration: '30 days',
      features: ['Top placement above Gold', 'Premium badge & styling', 'Advanced analytics', 'Priority customer support', 'Social media promotion'],
      icon: <Crown className="h-6 w-6 text-purple-500" />,
      color: 'border-purple-300',
      popular: true,
      recommended: true
    },
    {
      tier: 'diamond',
      name: 'Diamond Exclusive',
      price: 999.99,
      duration: '1 year', // Fixed duration for Diamond
      features: ['Highest priority placement', 'Diamond exclusive badge', 'Personal account manager', 'Custom listing design', 'Industry spotlight feature', 'Premium placement requires approval'],
      icon: <Diamond className="h-6 w-6 text-cyan-500" />,
      color: 'border-cyan-300',
      popular: false,
      isAnnualOnly: true
    }
  ];

  const handleTierSelect = (tier: string) => {
    setSelectedTier(tier);
    
    // For Diamond tier, always force 12 months and $999.99
    if (tier === 'diamond') {
      setDurationMonths(12);
    }
  };

  const handleDurationChange = (months: number) => {
    // Prevent duration changes for Diamond tier
    if (selectedTier !== 'diamond') {
      setDurationMonths(months);
    }
  };

  const calculateFinalPrice = (tier: string, basePrice: number, months: number) => {
    // Diamond tier always returns fixed price regardless of input
    if (tier === 'diamond') {
      return 999.99;
    }
    
    // Calculate price for other tiers
    let totalPrice = basePrice * months;
    
    // Apply duration discounts for non-Diamond tiers
    if (months >= 12) {
      totalPrice *= 0.80; // 20% discount for 12+ months
    } else if (months >= 6) {
      totalPrice *= 0.85; // 15% discount for 6+ months
    } else if (months >= 3) {
      totalPrice *= 0.90; // 10% discount for 3+ months
    }
    
    return totalPrice;
  };

  const handleProceed = () => {
    const plan = pricingPlans.find(p => p.tier === selectedTier);
    if (!plan) return;

    // For Diamond tier, always use 12 months and $999.99
    if (selectedTier === 'diamond') {
      onPricingSelect('diamond', 999.99, 12);
    } else {
      const finalPrice = calculateFinalPrice(selectedTier, plan.price, durationMonths);
      onPricingSelect(selectedTier, finalPrice, durationMonths);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Choose Your Job Posting Plan</h1>
        <p className="text-gray-600">Select the perfect plan to get maximum visibility for your job posting</p>
      </div>

      {/* Special Diamond Alert */}
      {selectedTier === 'diamond' && (
        <Alert className="mb-6 border-cyan-200 bg-cyan-50">
          <Diamond className="h-4 w-4 text-cyan-600" />
          <AlertDescription className="text-cyan-800">
            Diamond tier is exclusively available as a $999.99 annual plan with premium placement approval required.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {pricingPlans.map((plan) => (
          <Card
            key={plan.tier}
            className={`relative cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedTier === plan.tier
                ? `ring-2 ring-offset-2 ${plan.color.replace('border-', 'ring-')}`
                : plan.color
            } ${plan.popular ? 'scale-105' : ''}`}
            onClick={() => handleTierSelect(plan.tier)}
          >
            {plan.recommended && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                  RECOMMENDED
                </span>
              </div>
            )}
            
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-3">{plan.icon}</div>
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <div className="text-3xl font-bold">
                ${plan.price.toFixed(2)}
                {plan.isAnnualOnly && <span className="text-sm font-normal">/year</span>}
              </div>
              <p className="text-sm text-gray-500">
                {plan.isAnnualOnly ? 'Annual Only' : `for ${plan.duration}`}
              </p>
              
              {plan.tier === 'diamond' && (
                <div className="mt-2">
                  <span className="bg-cyan-100 text-cyan-800 px-2 py-1 rounded-full text-xs">
                    Invite/Bid Only - Limited to 5 spots per industry
                  </span>
                </div>
              )}
            </CardHeader>
            
            <CardContent>
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start text-sm">
                    <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Button
                className={`w-full ${
                  selectedTier === plan.tier
                    ? plan.tier === 'diamond'
                      ? 'bg-cyan-600 hover:bg-cyan-700'
                      : plan.tier === 'premium'
                      ? 'bg-purple-600 hover:bg-purple-700'
                      : plan.tier === 'gold'
                      ? 'bg-amber-600 hover:bg-amber-700'
                      : 'bg-gray-600 hover:bg-gray-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleTierSelect(plan.tier);
                }}
              >
                {selectedTier === plan.tier ? 'Selected' : 
                 plan.tier === 'diamond' ? 'Apply for Diamond' : 'Select Plan'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Duration Selector - Only show for non-Diamond tiers */}
      {selectedTier && selectedTier !== 'diamond' && (
        <div className="mb-8">
          <DurationSelector
            durationMonths={durationMonths}
            onDurationChange={handleDurationChange}
            selectedPricingTier={selectedTier}
            isDiamondPlan={false}
          />
        </div>
      )}

      {/* Diamond Special Display */}
      {selectedTier === 'diamond' && (
        <div className="mb-8 text-center">
          <div className="inline-flex items-center px-6 py-3 rounded-full border-2 border-cyan-600 bg-cyan-600 text-white font-medium">
            <Diamond className="h-5 w-5 mr-2" />
            1 Year - $999.99 (Annual Only)
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Diamond tier requires approval and is limited to 5 spots per industry
          </p>
        </div>
      )}

      <div className="text-center">
        <Button
          onClick={handleProceed}
          className="px-8 py-3 text-lg"
          disabled={!selectedTier}
        >
          {selectedTier === 'diamond' 
            ? 'Apply for Diamond Annual Plan'
            : `Continue with ${selectedTier ? selectedTier.charAt(0).toUpperCase() + selectedTier.slice(1) : ''} Plan`
          }
        </Button>
      </div>
    </div>
  );
};

export default JobPricingTable;
