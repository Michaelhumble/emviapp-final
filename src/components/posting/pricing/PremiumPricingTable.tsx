
import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, Crown, Star, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  duration: string;
  description: string;
  features: string[];
  badge?: string;
  isPopular?: boolean;
  isExclusive?: boolean;
  spotsLeft?: number;
}

interface PremiumPricingTableProps {
  onPlanSelect: (plan: PricingPlan) => void;
  selectedPlan?: string;
  isFirstPost?: boolean;
}

const pricingPlans: PricingPlan[] = [
  {
    id: 'standard',
    name: 'Standard',
    price: 24.99,
    duration: 'month',
    description: 'Great for short-term posts',
    features: [
      'Job post for 30 days',
      'Basic visibility',
      'Email notifications',
      'Standard support'
    ]
  },
  {
    id: 'gold',
    name: 'Gold',
    price: 49.99,
    duration: '3 months',
    description: 'Save $25 — Most popular!',
    features: [
      'Job post for 90 days',
      'Enhanced visibility',
      'Priority in search results',
      'Email & SMS notifications',
      'Priority support',
      'Featured badge'
    ],
    badge: 'Best Value',
    isPopular: true
  },
  {
    id: 'diamond',
    name: 'Diamond',
    price: 999.99,
    duration: 'year',
    description: 'Only 2 left. Exclusive, bid or apply only.',
    features: [
      'Job post for 365 days',
      'Maximum visibility',
      'Top of search results',
      'All notifications',
      'VIP support',
      'Exclusive Diamond badge',
      'Personal account manager',
      'Custom branding options'
    ],
    badge: 'VIP',
    isExclusive: true,
    spotsLeft: 2
  }
];

const PremiumPricingTable: React.FC<PremiumPricingTableProps> = ({
  onPlanSelect,
  selectedPlan,
  isFirstPost = false
}) => {
  const handlePlanSelect = (plan: PricingPlan) => {
    console.log('Premium plan selected:', plan);
    onPlanSelect(plan);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8" data-testid="premium-pricing-table">
      {/* Headline */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Fast-Track Your Salon's Success — Premium Listings That Overdeliver
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Choose the perfect plan to showcase your opportunity and attract top talent
        </p>
      </div>

      {/* First Post Free Banner */}
      {isFirstPost && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 mb-8 text-center"
          data-testid="first-post-banner"
        >
          <div className="flex items-center justify-center gap-2">
            <Star className="w-5 h-5 text-green-600" />
            <span className="text-green-800 font-semibold">
              🎉 Your first job post is always FREE! (Business info required)
            </span>
            <Star className="w-5 h-5 text-green-600" />
          </div>
        </motion.div>
      )}

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {pricingPlans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={cn(
              "relative rounded-2xl border-2 p-6 transition-all duration-200 cursor-pointer hover:shadow-xl",
              plan.isPopular && "border-blue-500 shadow-lg scale-105 bg-gradient-to-br from-blue-50 to-indigo-50",
              plan.isExclusive && "border-purple-500 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50",
              !plan.isPopular && !plan.isExclusive && "border-gray-200 hover:border-gray-300 bg-white",
              selectedPlan === plan.id && "ring-2 ring-blue-500"
            )}
            onClick={() => handlePlanSelect(plan)}
          >
            {/* Badges */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              {plan.badge && (
                <Badge 
                  className={cn(
                    "text-xs font-semibold px-3 py-1",
                    plan.isPopular && "bg-blue-600 text-white",
                    plan.isExclusive && "bg-purple-600 text-white"
                  )}
                  data-testid={plan.isPopular ? "best-value-badge" : plan.isExclusive ? "vip-badge" : undefined}
                >
                  {plan.badge}
                </Badge>
              )}
            </div>

            {/* Exclusive Scarcity Indicator */}
            {plan.isExclusive && plan.spotsLeft && (
              <div className="absolute -top-3 -right-3">
                <div 
                  className="bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse"
                  data-testid="diamond-scarcity"
                >
                  Only {plan.spotsLeft} left
                </div>
              </div>
            )}

            {/* Popular Plan Glow */}
            {plan.isPopular && (
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20"></div>
            )}

            {/* Exclusive Plan Glow */}
            {plan.isExclusive && (
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25"></div>
            )}

            <div className="relative">
              {/* Plan Header */}
              <div className="text-center mb-6">
                <div className="flex items-center justify-center mb-2">
                  {plan.isExclusive && <Crown className="w-6 h-6 text-purple-600 mr-2" />}
                  {plan.isPopular && <Zap className="w-6 h-6 text-blue-600 mr-2" />}
                  <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                </div>
                
                <div className="mb-2">
                  <span 
                    className="text-4xl font-bold text-gray-900"
                    data-testid={`${plan.id}-price`}
                  >
                    ${plan.price}
                  </span>
                  <span className="text-gray-600">/{plan.duration}</span>
                </div>
                
                <p className="text-sm text-gray-600 font-medium">{plan.description}</p>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-6">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <Button
                className={cn(
                  "w-full font-semibold py-3",
                  plan.isPopular && "bg-blue-600 hover:bg-blue-700 text-white",
                  plan.isExclusive && "bg-purple-600 hover:bg-purple-700 text-white",
                  !plan.isPopular && !plan.isExclusive && "bg-gray-900 hover:bg-gray-800 text-white"
                )}
                onClick={() => handlePlanSelect(plan)}
              >
                {plan.isExclusive ? 'Apply / Bid' : 'Select Plan'}
              </Button>

              {/* Diamond Spot Reserved Indicator */}
              {plan.isExclusive && (
                <div className="text-center mt-2">
                  <span className="text-xs text-purple-600 font-medium">
                    1 spot reserved
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer Text */}
      <div className="text-center text-sm text-gray-600 max-w-4xl mx-auto">
        <p className="mb-2">
          <strong>First job post is always FREE</strong> (requires card/business info). 
          All paid plans renew automatically, cancel anytime.
        </p>
        <p>
          <strong>Diamond:</strong> Invite/Bid only. Limited availability.
        </p>
      </div>
    </div>
  );
};

export default PremiumPricingTable;
