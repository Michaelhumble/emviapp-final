
import React from 'react';
import { motion } from 'framer-motion';
import { Check, Crown, Star, Shield, Lock } from 'lucide-react';
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
  limitedSpots?: string;
  features: string[];
  buttonText: string;
  buttonVariant: 'default' | 'outline';
  isWaitlistOnly?: boolean;
}

interface PremiumPricingCardProps {
  plan: PricingPlan;
  onSelect: () => void;
  isPopular?: boolean;
}

const PremiumPricingCard = ({ plan, onSelect, isPopular }: PremiumPricingCardProps) => {
  const isDiamond = plan.id === 'diamond';
  const isFree = plan.id === 'free';
  const isGold = plan.id === 'gold';
  const isPremium = plan.id === 'premium';

  const getCardClasses = () => {
    if (isDiamond) {
      return "relative overflow-hidden bg-gradient-to-br from-cyan-50/80 via-blue-50/60 to-indigo-50/80 border-2 border-cyan-200 shadow-2xl backdrop-blur-md transform hover:scale-[1.02] transition-all duration-300";
    }
    if (isPremium) {
      return "relative overflow-hidden bg-gradient-to-br from-purple-50/80 via-indigo-50/60 to-blue-50/80 border-2 border-purple-200 shadow-xl backdrop-blur-md transform hover:scale-[1.02] transition-all duration-300";
    }
    if (isGold) {
      return "relative overflow-hidden bg-gradient-to-br from-amber-50/80 via-yellow-50/60 to-orange-50/80 border-2 border-amber-200 shadow-xl backdrop-blur-md transform hover:scale-[1.02] transition-all duration-300";
    }
    return "relative overflow-hidden bg-white/80 border border-gray-200 shadow-lg backdrop-blur-md transform hover:scale-[1.02] transition-all duration-300";
  };

  const getBadgeColor = () => {
    if (plan.badge === 'POPULAR') return "bg-amber-500 text-white";
    if (plan.badge === 'RECOMMENDED') return "bg-purple-500 text-white";
    if (plan.badge === 'ANNUAL_ONLY') return "bg-cyan-500 text-white";
    return "bg-gray-500 text-white";
  };

  const getButtonClasses = () => {
    if (plan.isWaitlistOnly) {
      return "w-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-300";
    }
    if (isDiamond) {
      return "w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-300";
    }
    if (isPremium) {
      return "w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-300";
    }
    if (isGold) {
      return "w-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-300";
    }
    if (plan.buttonVariant === 'outline') {
      return "w-full border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 font-semibold py-3 rounded-xl transition-all duration-300";
    }
    return "w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 rounded-xl transition-all duration-300";
  };

  return (
    <Card className={`${getCardClasses()} ${isDiamond ? 'lg:scale-105' : ''}`}>
      {/* Animated background for Diamond */}
      {isDiamond && (
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-100/30 via-blue-100/20 to-indigo-100/30 animate-pulse" />
      )}
      
      {/* Badge */}
      {plan.badge && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <Badge className={`${getBadgeColor()} px-4 py-1 text-xs font-bold tracking-wide shadow-lg`}>
              {plan.badge === 'POPULAR' && <Star className="h-3 w-3 mr-1" />}
              {plan.badge === 'RECOMMENDED' && <Crown className="h-3 w-3 mr-1" />}
              {plan.badge === 'ANNUAL_ONLY' && <Lock className="h-3 w-3 mr-1" />}
              {plan.badge.replace('_', ' ')}
            </Badge>
          </motion.div>
        </div>
      )}

      <div className="relative z-10 p-8">
        {/* Plan Name & Title */}
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold font-playfair text-gray-900 mb-2">
            {plan.name}
          </h3>
          <p className="text-sm text-gray-600 font-medium">
            {plan.emotiveTitle}
          </p>
        </div>

        {/* Price */}
        <div className="text-center mb-6">
          <div className="flex items-baseline justify-center gap-2">
            <span className="text-4xl font-bold font-playfair text-gray-900">
              ${plan.price}
            </span>
            {plan.originalPrice && (
              <span className="text-lg text-gray-500 line-through">
                ${plan.originalPrice}
              </span>
            )}
          </div>
          {isDiamond && (
            <p className="text-sm text-cyan-700 font-medium mt-1">
              Annual Only • 12 months
            </p>
          )}
          {!isDiamond && !isFree && (
            <p className="text-sm text-gray-600 mt-1">
              per {plan.isAnnual ? 'year' : 'month'}
            </p>
          )}
        </div>

        {/* Limited Spots */}
        {plan.limitedSpots && (
          <div className="text-center mb-6">
            <Badge variant="outline" className="border-red-300 text-red-700 bg-red-50 animate-pulse">
              {plan.limitedSpots}
            </Badge>
          </div>
        )}

        {/* Features */}
        <ul className="space-y-3 mb-8">
          {plan.features.map((feature, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className="flex items-start gap-3"
            >
              <div className={`p-1 rounded-full mt-0.5 ${
                isDiamond ? 'bg-cyan-100' : 
                isPremium ? 'bg-purple-100' : 
                isGold ? 'bg-amber-100' : 
                'bg-green-100'
              }`}>
                <Check className={`h-3 w-3 ${
                  isDiamond ? 'text-cyan-600' : 
                  isPremium ? 'text-purple-600' : 
                  isGold ? 'text-amber-600' : 
                  'text-green-600'
                }`} />
              </div>
              <span className="text-sm text-gray-700 font-medium leading-relaxed">
                {feature}
              </span>
            </motion.li>
          ))}
        </ul>

        {/* Waitlist Warning for Diamond */}
        {plan.isWaitlistOnly && (
          <div className="mb-4 p-3 bg-cyan-50 border border-cyan-200 rounded-lg">
            <p className="text-xs text-cyan-800 text-center font-medium">
              All spots filled. Joining waitlist for future availability.
            </p>
          </div>
        )}

        {/* CTA Button */}
        <Button
          onClick={onSelect}
          className={getButtonClasses()}
          disabled={false}
        >
          {plan.buttonText}
        </Button>

        {/* Trust Badge */}
        <div className="mt-4 text-center">
          <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
            <Shield className="h-3 w-3" />
            <span>Secure • No hidden fees • Cancel anytime</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PremiumPricingCard;
