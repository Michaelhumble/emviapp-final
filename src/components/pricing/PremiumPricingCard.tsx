
import React from 'react';
import { motion } from 'framer-motion';
import { Check, Crown, Star, Diamond, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface PricingPlan {
  id: string;
  name: string;
  emotiveTitle: string;
  price: number;
  originalPrice?: number;
  isAnnual: boolean;
  badge?: 'POPULAR' | 'RECOMMENDED' | 'ANNUAL_ONLY';
  features: string[];
  buttonText: string;
  buttonVariant?: 'default' | 'outline';
  isEnterprise?: boolean;
  limitedSpots?: string;
}

interface PremiumPricingCardProps {
  plan: PricingPlan;
  isSelected?: boolean;
  onSelect: () => void;
  isPopular?: boolean;
}

const PremiumPricingCard: React.FC<PremiumPricingCardProps> = ({
  plan,
  isSelected = false,
  onSelect,
  isPopular = false
}) => {
  const getIcon = () => {
    switch (plan.id) {
      case 'diamond':
        return <Diamond className="h-6 w-6 text-cyan-500" />;
      case 'premium':
        return <Crown className="h-6 w-6 text-purple-500" />;
      case 'gold':
        return <Star className="h-6 w-6 text-amber-500" />;
      default:
        return <Sparkles className="h-6 w-6 text-gray-500" />;
    }
  };

  const getCardGradient = () => {
    switch (plan.id) {
      case 'diamond':
        return 'bg-gradient-to-br from-cyan-50/80 via-blue-50/60 to-purple-50/40';
      case 'premium':
        return 'bg-gradient-to-br from-purple-50/80 via-pink-50/60 to-purple-50/40';
      case 'gold':
        return 'bg-gradient-to-br from-amber-50/80 via-orange-50/60 to-yellow-50/40';
      default:
        return 'bg-gradient-to-br from-gray-50/80 via-slate-50/60 to-gray-50/40';
    }
  };

  const getBadgeStyle = () => {
    switch (plan.badge) {
      case 'RECOMMENDED':
        return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white animate-pulse';
      case 'POPULAR':
        return 'bg-gradient-to-r from-amber-500 to-orange-500 text-white';
      case 'ANNUAL_ONLY':
        return 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  if (plan.isEnterprise) {
    return (
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ duration: 0.3 }}
        className="h-full"
      >
        <Card className="h-full p-8 bg-gradient-to-br from-slate-900 to-gray-900 text-white border-0 shadow-2xl">
          <div className="text-center space-y-6">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-gold-400 to-yellow-500 rounded-full flex items-center justify-center">
              <Crown className="h-8 w-8 text-gray-900" />
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
              <p className="text-gray-300 text-sm">Custom Solutions</p>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-300">For salon groups or industry partners</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-400" />
                  Franchise management tools
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-400" />
                  Volume pricing discounts
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-400" />
                  Dedicated account manager
                </li>
              </ul>
            </div>
            
            <Button 
              onClick={onSelect}
              className="w-full bg-gradient-to-r from-gold-500 to-yellow-500 text-gray-900 font-semibold hover:from-gold-600 hover:to-yellow-600"
            >
              Contact Sales
            </Button>
            
            <p className="text-xs text-gray-400">Talk to our team for a tailored package</p>
          </div>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="h-full relative"
    >
      {/* Badge */}
      {plan.badge && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
          <Badge className={`${getBadgeStyle()} px-3 py-1 text-xs font-semibold shadow-lg`}>
            {plan.badge.replace('_', ' ')}
          </Badge>
        </div>
      )}

      {/* Limited Spots Banner */}
      {plan.limitedSpots && (
        <div className="absolute -top-6 right-4 z-10">
          <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
            {plan.limitedSpots}
          </div>
        </div>
      )}

      <Card className={`h-full p-8 ${getCardGradient()} backdrop-blur-md border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300 ${isSelected ? 'ring-2 ring-purple-500 ring-offset-2' : ''}`}>
        <div className="text-center space-y-6">
          {/* Icon */}
          <div className="mx-auto w-16 h-16 bg-white/80 rounded-full flex items-center justify-center shadow-lg">
            {getIcon()}
          </div>
          
          {/* Plan Name */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-1">{plan.name}</h3>
            <p className="text-sm font-medium text-gray-600">{plan.emotiveTitle}</p>
          </div>
          
          {/* Pricing */}
          <div className="space-y-2">
            <div className="flex items-end justify-center gap-2">
              {plan.originalPrice && plan.originalPrice > plan.price && (
                <span className="text-lg text-gray-400 line-through font-playfair">
                  ${plan.originalPrice}
                </span>
              )}
              <span className="text-4xl md:text-5xl font-bold font-playfair bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                ${plan.price}
              </span>
            </div>
            <p className="text-sm text-gray-600">
              {plan.id === 'diamond' ? '/year only' : plan.isAnnual ? '/year' : '/month'}
            </p>
          </div>
          
          {/* Features */}
          <ul className="space-y-3 text-left">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700 leading-relaxed">
                  {index === 0 ? <strong>{feature}</strong> : feature}
                </span>
              </li>
            ))}
          </ul>
          
          {/* CTA Button */}
          <div className="space-y-3">
            <Button 
              onClick={onSelect}
              className={`w-full py-3 font-semibold transition-all duration-300 ${
                plan.id === 'diamond' 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl'
                  : plan.id === 'premium'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl'
                  : plan.id === 'gold'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl'
                  : 'bg-gray-900 hover:bg-gray-800 text-white shadow-lg hover:shadow-xl'
              }`}
            >
              {plan.buttonText}
            </Button>
            
            {/* Trust Microcopy */}
            <p className="text-xs text-gray-500 leading-relaxed">
              {plan.id === 'free' 
                ? 'Risk-free: Only pay when your job is approved.'
                : plan.id === 'diamond'
                ? 'Approval required. Secure PCI-compliant checkout.'
                : 'No hidden fees. Cancel anytime.'
              }
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default PremiumPricingCard;
