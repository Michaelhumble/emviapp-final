
import React from 'react';
import { motion } from 'framer-motion';
import { Check, Diamond, Star, Crown, Shield, Sparkles, Lock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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
}

interface PremiumPricingCardProps {
  plan: PricingPlan;
  onSelect: () => void;
  isPopular?: boolean;
}

const PremiumPricingCard: React.FC<PremiumPricingCardProps> = ({
  plan,
  onSelect,
  isPopular = false
}) => {
  const isDiamond = plan.id === 'diamond';
  const isGold = plan.id === 'gold';
  const isPremium = plan.id === 'premium';

  const getCardStyle = () => {
    if (isDiamond) {
      return "relative overflow-hidden bg-gradient-to-br from-cyan-50/90 via-blue-50/80 to-indigo-50/90 border-2 border-cyan-200/50 shadow-2xl transform scale-105";
    }
    if (isPremium) {
      return "relative overflow-hidden bg-gradient-to-br from-purple-50/90 via-indigo-50/80 to-pink-50/90 border-2 border-purple-200/50 shadow-xl";
    }
    if (isGold) {
      return "relative overflow-hidden bg-gradient-to-br from-amber-50/90 via-yellow-50/80 to-orange-50/90 border-2 border-amber-200/50 shadow-xl";
    }
    return "relative overflow-hidden bg-white/90 border border-gray-200/50 shadow-lg";
  };

  const getBadgeStyle = () => {
    if (plan.badge === 'ANNUAL_ONLY') {
      return "bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-0 animate-pulse";
    }
    if (plan.badge === 'RECOMMENDED') {
      return "bg-gradient-to-r from-purple-500 to-indigo-600 text-white border-0";
    }
    if (plan.badge === 'POPULAR') {
      return "bg-gradient-to-r from-amber-500 to-orange-600 text-white border-0";
    }
    return "bg-gray-100 text-gray-700";
  };

  const getPlanIcon = () => {
    if (isDiamond) return <Diamond className="h-6 w-6 text-cyan-600" />;
    if (isPremium) return <Crown className="h-6 w-6 text-purple-600" />;
    if (isGold) return <Star className="h-6 w-6 text-amber-600" />;
    return <Shield className="h-6 w-6 text-gray-500" />;
  };

  const getFeatureIcon = (index: number) => {
    const icons = [Shield, Star, Sparkles, Crown, Check];
    const IconComponent = icons[index % icons.length];
    const colorClass = isDiamond ? "text-cyan-500" : 
                     isPremium ? "text-purple-500" : 
                     isGold ? "text-amber-500" : "text-gray-500";
    return <IconComponent className={`h-4 w-4 ${colorClass} mr-3 flex-shrink-0`} />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: isDiamond ? 1.02 : 1.01 }}
      transition={{ duration: 0.3 }}
      className={isDiamond ? "col-span-1 md:col-span-1 lg:col-span-1" : ""}
    >
      <Card className={`${getCardStyle()} backdrop-blur-xl hover:shadow-3xl transition-all duration-500 h-full`}>
        {/* Animated Background Effects */}
        {isDiamond && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-blue-400/10 to-indigo-400/10"
            animate={{
              background: [
                "linear-gradient(45deg, rgba(6, 182, 212, 0.1) 0%, rgba(59, 130, 246, 0.1) 50%, rgba(99, 102, 241, 0.1) 100%)",
                "linear-gradient(45deg, rgba(99, 102, 241, 0.1) 0%, rgba(6, 182, 212, 0.1) 50%, rgba(59, 130, 246, 0.1) 100%)",
                "linear-gradient(45deg, rgba(59, 130, 246, 0.1) 0%, rgba(99, 102, 241, 0.1) 50%, rgba(6, 182, 212, 0.1) 100%)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
          />
        )}

        <div className="relative z-10 p-8">
          {/* Badge */}
          {plan.badge && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute -top-3 left-1/2 transform -translate-x-1/2"
            >
              <Badge className={`${getBadgeStyle()} px-4 py-1 text-xs font-bold tracking-wide shadow-lg`}>
                {plan.badge === 'ANNUAL_ONLY' && <Lock className="h-3 w-3 mr-1" />}
                {plan.badge}
              </Badge>
            </motion.div>
          )}

          {/* Limited Spots */}
          {plan.limitedSpots && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mb-4"
            >
              <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-red-700">{plan.limitedSpots}</span>
                  <div className="w-16 h-2 bg-red-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-red-400 to-red-600"
                      initial={{ width: "0%" }}
                      animate={{ width: isDiamond ? "40%" : "53%" }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Plan Icon & Title */}
          <div className="text-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 }}
              className="mb-3"
            >
              {getPlanIcon()}
            </motion.div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
            <p className="text-sm text-gray-600 font-medium">{plan.emotiveTitle}</p>
          </div>

          {/* Pricing */}
          <div className="text-center mb-8">
            <div className="flex items-baseline justify-center mb-2">
              <span className="text-5xl font-bold font-playfair text-gray-900">
                ${plan.price}
              </span>
              {plan.originalPrice && (
                <span className="text-lg text-gray-500 line-through ml-2">
                  ${plan.originalPrice}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600">
              {isDiamond ? 'Annual Only' : plan.isAnnual ? 'per year' : 'per month'}
            </p>
          </div>

          {/* Features */}
          <ul className="space-y-4 mb-8">
            {plan.features.map((feature, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex items-start"
              >
                {getFeatureIcon(index)}
                <span className="text-sm text-gray-700 leading-relaxed">{feature}</span>
              </motion.li>
            ))}
          </ul>

          {/* CTA Button */}
          <Button
            onClick={onSelect}
            className={`w-full py-4 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${
              isDiamond
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white'
                : isPremium
                ? 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white'
                : isGold
                ? 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white'
                : 'bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-700'
            }`}
          >
            {plan.buttonText}
          </Button>

          {/* Trust Badge */}
          <div className="mt-4 text-center">
            <div className="flex items-center justify-center text-xs text-gray-500">
              <Shield className="h-3 w-3 mr-1" />
              <span>Secure checkout • Cancel anytime</span>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default PremiumPricingCard;
