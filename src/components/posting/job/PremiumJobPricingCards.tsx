
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Crown, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface PremiumJobPricingCardsProps {
  onPricingSelect: (tier: string, finalPrice: number, durationMonths: number) => void;
  jobData?: any;
}

const PremiumJobPricingCards: React.FC<PremiumJobPricingCardsProps> = ({ 
  onPricingSelect,
  jobData 
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  const pricingTiers = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      duration: 30,
      description: 'Basic job posting',
      features: [
        'Basic job listing',
        '30 days active',
        'Standard visibility',
        'Basic support'
      ],
      icon: <Zap className="h-6 w-6" />,
      color: 'bg-gray-100 text-gray-900',
      buttonColor: 'bg-gray-600 hover:bg-gray-700'
    },
    {
      id: 'gold',
      name: 'Gold',
      price: 29,
      duration: 30,
      description: 'Enhanced visibility',
      features: [
        'Everything in Free',
        'Featured placement',
        'Priority in search',
        'Enhanced analytics',
        'Email support'
      ],
      icon: <Star className="h-6 w-6" />,
      color: 'bg-yellow-100 text-yellow-900',
      buttonColor: 'bg-yellow-600 hover:bg-yellow-700',
      popular: true
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 49,
      duration: 30,
      description: 'Maximum exposure',
      features: [
        'Everything in Gold',
        'Top of listings',
        'Social media promotion',
        'Detailed analytics',
        'Priority support'
      ],
      icon: <Crown className="h-6 w-6" />,
      color: 'bg-purple-100 text-purple-900',
      buttonColor: 'bg-purple-600 hover:bg-purple-700'
    },
    {
      id: 'diamond',
      name: 'Diamond',
      price: 99,
      duration: 30,
      description: 'Ultimate package',
      features: [
        'Everything in Premium',
        'Dedicated account manager',
        'Custom branding',
        'Advanced targeting',
        'Phone support'
      ],
      icon: <Crown className="h-6 w-6" />,
      color: 'bg-blue-100 text-blue-900',
      buttonColor: 'bg-blue-600 hover:bg-blue-700'
    }
  ];

  const handlePricingSelect = async (tier: string, price: number, duration: number) => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    setSelectedTier(tier);
    
    try {
      await onPricingSelect(tier, price, duration);
    } catch (error) {
      console.error('Pricing selection error:', error);
    } finally {
      setIsSubmitting(false);
      setSelectedTier(null);
    }
  };

  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Job Posting Plan</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Select the perfect plan to get your job posting the visibility it deserves
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {pricingTiers.map((tier, index) => (
          <motion.div
            key={tier.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative"
          >
            <Card className={`relative overflow-hidden ${tier.popular ? 'ring-2 ring-yellow-500' : ''}`}>
              {tier.popular && (
                <div className="absolute top-0 left-0 right-0 bg-yellow-500 text-white text-center py-1 text-sm font-medium">
                  Most Popular
                </div>
              )}
              
              <CardHeader className={`text-center ${tier.color} ${tier.popular ? 'pt-8' : ''}`}>
                <div className="flex justify-center mb-2">
                  {tier.icon}
                </div>
                <CardTitle className="text-xl font-bold">{tier.name}</CardTitle>
                <div className="text-3xl font-bold">
                  {tier.price === 0 ? 'Free' : `$${tier.price}`}
                  {tier.price > 0 && <span className="text-sm font-normal">/month</span>}
                </div>
                <p className="text-sm">{tier.description}</p>
              </CardHeader>
              
              <CardContent className="pt-6">
                <ul className="space-y-3 mb-6">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button
                  onClick={() => handlePricingSelect(tier.id, tier.price, tier.duration)}
                  disabled={isSubmitting}
                  className={`w-full ${tier.buttonColor} text-white`}
                >
                  {isSubmitting && selectedTier === tier.id ? 'Processing...' : 
                   tier.price === 0 ? 'Post for Free' : `Select ${tier.name}`}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PremiumJobPricingCards;
