
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Diamond, Star, Crown, Shield, Eye, BarChart3, Headphones, Award, Zap, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  isEnterprise?: boolean;
}

interface PremiumPricingCardProps {
  plan: PricingPlan;
  onSelect: () => void;
  isPopular?: boolean;
}

const getFeatureIcon = (feature: string) => {
  if (feature.includes('visibility') || feature.includes('search') || feature.includes('placement')) {
    return <Eye className="h-4 w-4" />;
  }
  if (feature.includes('analytics') || feature.includes('insights')) {
    return <BarChart3 className="h-4 w-4" />;
  }
  if (feature.includes('support') || feature.includes('consultation')) {
    return <Headphones className="h-4 w-4" />;
  }
  if (feature.includes('badge') || feature.includes('highlight')) {
    return <Award className="h-4 w-4" />;
  }
  if (feature.includes('manager') || feature.includes('exclusive')) {
    return <Crown className="h-4 w-4" />;
  }
  if (feature.includes('secure') || feature.includes('priority')) {
    return <Shield className="h-4 w-4" />;
  }
  return <Check className="h-4 w-4" />;
};

const PremiumPricingCard: React.FC<PremiumPricingCardProps> = ({
  plan,
  onSelect,
  isPopular = false
}) => {
  const isDiamond = plan.id === 'diamond';
  const isGold = plan.id === 'gold';
  const isPremium = plan.id === 'premium';
  const isFree = plan.id === 'free';
  const isEnterprise = plan.isEnterprise;

  if (isEnterprise) return null; // Don't render Enterprise card

  const getCardGradient = () => {
    if (isDiamond) return 'bg-gradient-to-br from-cyan-50/80 via-blue-50/60 to-indigo-50/80';
    if (isPremium) return 'bg-gradient-to-br from-purple-50/80 via-pink-50/60 to-purple-50/80';
    if (isGold) return 'bg-gradient-to-br from-amber-50/80 via-yellow-50/60 to-orange-50/80';
    return 'bg-gradient-to-br from-gray-50/80 via-white to-gray-50/80';
  };

  const getBorderGradient = () => {
    if (isDiamond) return 'border-cyan-200/50';
    if (isPremium) return 'border-purple-200/50';
    if (isGold) return 'border-amber-200/50';
    return 'border-gray-200/50';
  };

  const getBadgeColor = () => {
    if (plan.badge === 'POPULAR') return 'bg-gradient-to-r from-amber-500 to-orange-500 text-white';
    if (plan.badge === 'RECOMMENDED') return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white';
    if (plan.badge === 'ANNUAL_ONLY') return 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white';
    return 'bg-gray-100 text-gray-700';
  };

  const getButtonGradient = () => {
    if (isDiamond) return 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700';
    if (isPremium) return 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700';
    if (isGold) return 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700';
    return 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800';
  };

  const cardScale = isDiamond ? 'lg:scale-105' : '';
  const cardHeight = isDiamond ? 'min-h-[520px]' : 'min-h-[480px]';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className={cn('relative', cardScale)}
    >
      {/* Animated Background Glow */}
      {isDiamond && (
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 rounded-2xl blur-lg opacity-20 animate-pulse" />
      )}
      
      <Card className={cn(
        'relative overflow-hidden border-2 backdrop-blur-md shadow-xl transition-all duration-300',
        getCardGradient(),
        getBorderGradient(),
        cardHeight,
        'hover:shadow-2xl hover:border-opacity-80'
      )}>
        {/* Badge */}
        {plan.badge && (
          <div className="absolute top-4 right-4 z-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <Badge className={cn(
                'px-3 py-1 text-xs font-semibold border-0',
                getBadgeColor()
              )}>
                {isDiamond && <Diamond className="h-3 w-3 mr-1" />}
                {isGold && <Star className="h-3 w-3 mr-1" />}
                {isPremium && <Crown className="h-3 w-3 mr-1" />}
                {plan.badge === 'ANNUAL_ONLY' ? 'INVITE ONLY' : plan.badge}
              </Badge>
            </motion.div>
          </div>
        )}

        {/* Limited Spots */}
        {plan.limitedSpots && (
          <div className="absolute top-16 right-4 z-10">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="bg-red-100 border border-red-200 rounded-full px-2 py-1"
            >
              <span className="text-xs text-red-700 font-medium">{plan.limitedSpots}</span>
            </motion.div>
          </div>
        )}

        <CardHeader className="text-center pb-4">
          <div className="space-y-3">
            {/* Plan Icon */}
            <div className="flex justify-center">
              {isDiamond && (
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Diamond className="h-8 w-8 text-cyan-500" />
                </motion.div>
              )}
              {isPremium && <Crown className="h-8 w-8 text-purple-500" />}
              {isGold && <Star className="h-8 w-8 text-amber-500" />}
              {isFree && <Shield className="h-8 w-8 text-gray-500" />}
            </div>

            <CardTitle className="text-2xl font-playfair">{plan.name}</CardTitle>
            
            {/* Pricing */}
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-2">
                <motion.span 
                  className="text-4xl font-bold text-gray-900"
                  key={plan.price}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  ${plan.price === 0 ? '0' : plan.price.toFixed(2)}
                </motion.span>
                {isDiamond && (
                  <span className="text-sm text-gray-600 self-end mb-1">/year</span>
                )}
              </div>
              
              {plan.originalPrice && (
                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm text-gray-500 line-through">
                    ${plan.originalPrice.toFixed(2)}
                  </span>
                  <Badge className="bg-green-100 text-green-700 border-green-200">
                    Save 20%
                  </Badge>
                </div>
              )}
              
              {isDiamond && (
                <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
                  <Lock className="h-3 w-3" />
                  <span>Annual Only</span>
                </div>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Features */}
          <ul className="space-y-3">
            {plan.features.map((feature, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3"
              >
                <div className={cn(
                  'rounded-full p-1 mt-0.5',
                  isDiamond ? 'bg-cyan-100 text-cyan-600' :
                  isPremium ? 'bg-purple-100 text-purple-600' :
                  isGold ? 'bg-amber-100 text-amber-600' :
                  'bg-gray-100 text-gray-600'
                )}>
                  {getFeatureIcon(feature)}
                </div>
                <span className="text-sm text-gray-700 leading-relaxed">{feature}</span>
              </motion.li>
            ))}
          </ul>

          {/* CTA Button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={onSelect}
              className={cn(
                'w-full py-3 text-white font-semibold shadow-lg border-0',
                plan.buttonVariant === 'outline' 
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                  : getButtonGradient()
              )}
            >
              {plan.buttonText}
              {isDiamond && <Zap className="h-4 w-4 ml-2" />}
            </Button>
          </motion.div>

          {/* Trust Badge */}
          <div className="text-center">
            <p className="text-xs text-gray-500">
              {isDiamond ? 'Risk-free: Pay only when approved' : 
               isFree ? 'No credit card required' :
               'Secure PCI-compliant checkout'}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PremiumPricingCard;
