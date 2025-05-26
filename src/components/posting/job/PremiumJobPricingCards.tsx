
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Crown, Star, Diamond, Shield, Flame, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface PremiumJobPricingCardsProps {
  onPricingSelect: (tier: string, finalPrice: number, durationMonths: number) => void;
  jobData?: any;
}

const PremiumJobPricingCards: React.FC<PremiumJobPricingCardsProps> = ({ 
  onPricingSelect,
  jobData 
}) => {
  const [selectedTier, setSelectedTier] = useState<string>('gold');

  const pricingOptions = [
    {
      id: 'gold',
      name: 'Gold Featured',
      price: 19.99,
      originalPrice: null,
      duration: '30 days',
      badge: 'Popular',
      badgeColor: 'bg-gradient-to-r from-amber-500 to-yellow-500',
      cardGradient: 'bg-gradient-to-br from-amber-50 to-yellow-50',
      borderColor: 'border-amber-200',
      icon: Crown,
      iconColor: 'text-amber-600',
      iconBg: 'bg-gradient-to-br from-amber-100 to-yellow-100',
      spotsLeft: '8 left',
      features: [
        'Featured placement in search',
        'Gold badge on listing',
        'Priority visibility',
        'Basic analytics',
        '2x more applications'
      ]
    },
    {
      id: 'premium',
      name: 'Premium Listing',
      price: 39.99,
      originalPrice: 49.99,
      duration: '30 days',
      badge: 'Recommended',
      badgeColor: 'bg-gradient-to-r from-purple-500 to-indigo-500',
      cardGradient: 'bg-gradient-to-br from-purple-50 to-indigo-50',
      borderColor: 'border-purple-200',
      icon: Shield,
      iconColor: 'text-purple-600',
      iconBg: 'bg-gradient-to-br from-purple-100 to-indigo-100',
      spotsLeft: '5 left',
      features: [
        'Top placement guarantee',
        'Premium badge & highlighting',
        'Advanced analytics dashboard',
        'Social media auto-promotion',
        '4x more quality applications',
        'Dedicated support'
      ]
    },
    {
      id: 'diamond',
      name: 'Diamond Exclusive',
      price: 999.99,
      originalPrice: 1199.88,
      duration: '12 months',
      badge: 'Annual Only',
      badgeColor: 'bg-gradient-to-r from-cyan-500 to-blue-500',
      cardGradient: 'bg-gradient-to-br from-cyan-50 to-blue-50',
      borderColor: 'border-cyan-200',
      icon: Diamond,
      iconColor: 'text-cyan-600',
      iconBg: 'bg-gradient-to-br from-cyan-100 to-blue-100',
      spotsLeft: '2 left',
      features: [
        'Highest priority placement',
        'Diamond status & verification',
        'Personal account manager',
        'Custom branding options',
        'Unlimited job posts for 1 year',
        'VIP candidate screening',
        'Priority customer support'
      ]
    }
  ];

  const handleCardSelect = (option: any) => {
    setSelectedTier(option.id);
    const durationMonths = option.id === 'diamond' ? 12 : 1;
    onPricingSelect(option.id, option.price, durationMonths);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {pricingOptions.map((option, index) => {
          const IconComponent = option.icon;
          const isSelected = selectedTier === option.id;
          const isRecommended = option.badge === 'Recommended';
          
          return (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                y: -4,
                transition: { duration: 0.2 }
              }}
              className={cn(
                "relative overflow-hidden rounded-2xl border-2 cursor-pointer transition-all duration-300",
                option.cardGradient,
                option.borderColor,
                isSelected 
                  ? "ring-4 ring-offset-2 ring-purple-500 shadow-xl" 
                  : "shadow-lg hover:shadow-xl",
                isRecommended && "scale-105 lg:scale-110"
              )}
              onClick={() => handleCardSelect(option)}
            >
              {/* Top Badge */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                <Badge className={cn(
                  "px-4 py-1.5 text-white font-semibold text-sm border-0 shadow-lg",
                  option.badgeColor
                )}>
                  {option.badge}
                </Badge>
              </div>

              {/* Spots Left Indicator */}
              <div className="absolute top-4 right-4">
                <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm">
                  <Clock className="h-3 w-3 text-orange-500" />
                  <span className="text-xs font-medium text-gray-700">{option.spotsLeft}</span>
                </div>
              </div>

              <div className="p-8 pt-12">
                {/* Luxury Icon */}
                <div className="flex justify-center mb-6">
                  <div className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg",
                    option.iconBg
                  )}>
                    <IconComponent className={cn("w-8 h-8", option.iconColor)} />
                  </div>
                </div>

                {/* Plan Name */}
                <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">
                  {option.name}
                </h3>

                {/* Pricing */}
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <span className="text-4xl font-bold text-gray-900">
                      ${option.price}
                    </span>
                    {option.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">
                        ${option.originalPrice}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">
                    {option.duration} • {option.id === 'diamond' ? 'Best Value' : 'Standard billing'}
                  </p>
                  {option.originalPrice && (
                    <div className="mt-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                        Save ${(option.originalPrice - option.price).toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {option.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                        <Check className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="text-sm text-gray-700 leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  className={cn(
                    "w-full py-3 font-semibold text-base rounded-xl transition-all duration-200",
                    isSelected
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg"
                      : "bg-white border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50"
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardSelect(option);
                  }}
                >
                  {isSelected ? 'Selected' : `Choose ${option.name}`}
                </Button>

                {/* Trust Badge */}
                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-500">
                    💳 Secure payment • 🔄 Cancel anytime
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-center mt-12"
      >
        <div className="bg-white rounded-2xl shadow-lg p-6 max-w-2xl mx-auto">
          <h4 className="text-lg font-semibold text-gray-900 mb-2">
            🚀 Ready to find your perfect team member?
          </h4>
          <p className="text-gray-600 text-sm">
            All plans include our quality guarantee. Start attracting top talent today!
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default PremiumJobPricingCards;
