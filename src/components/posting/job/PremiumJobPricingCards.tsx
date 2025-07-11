
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Eye, 
  Calendar, 
  MapPin, 
  Award, 
  Star, 
  TrendingUp, 
  BarChart, 
  Crown, 
  Shield, 
  Headphones, 
  Diamond, 
  Briefcase, 
  Sparkles,
  Clock,
  CheckCircle,
  Zap,
  Globe
} from 'lucide-react';
import { calculatePricing } from '@/utils/posting/pricing';
import { cn } from '@/lib/utils';

interface PremiumJobPricingCardsProps {
  onPricingSelect: (tier: string, finalPrice: number, durationMonths: number) => void;
  jobData?: any;
}

const PremiumJobPricingCards: React.FC<PremiumJobPricingCardsProps> = ({ 
  onPricingSelect,
  jobData 
}) => {
  const [selectedPlan, setSelectedPlan] = useState<string>('gold');
  const [durationMonths, setDurationMonths] = useState<number>(3);
  const [autoRenew, setAutoRenew] = useState<boolean>(true);
  const [isNationwide, setIsNationwide] = useState<boolean>(false);

  // FOMO counters
  const [goldSpotsLeft, setGoldSpotsLeft] = useState(8);
  const [diamondSpotsLeft, setDiamondSpotsLeft] = useState(2);

  useEffect(() => {
    // Simulate countdown for spots (demo purposes)
    const interval = setInterval(() => {
      if (Math.random() > 0.95) {
        setGoldSpotsLeft(prev => Math.max(1, prev - 1));
      }
      if (Math.random() > 0.98) {
        setDiamondSpotsLeft(prev => Math.max(1, prev - 1));
      }
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const pricingPlans = [
    {
      id: 'free',
      name: 'Free Listing',
      description: 'Perfect for testing the waters',
      basePrice: 0,
      features: [
        { icon: Eye, text: 'Basic visibility' },
        { icon: Calendar, text: '30-day duration' },
        { icon: MapPin, text: 'Standard placement' }
      ],
      cta: 'Start Free',
      popular: false,
      gradient: 'from-gray-100 to-gray-200',
      borderGradient: 'from-gray-300 to-gray-400'
    },
    {
      id: 'gold',
      name: 'Gold Featured',
      description: 'Stand out from the crowd',
      basePrice: 18.99, // FIXED: Correct Gold Featured monthly price to $18.99
      features: [
        { icon: Award, text: 'Featured placement' },
        { icon: Star, text: 'Gold badge' },
        { icon: TrendingUp, text: 'Priority listing' },
        { icon: BarChart, text: 'Enhanced visibility' }
      ],
      cta: 'Unlock Gold',
      popular: true,
      gradient: 'from-amber-100 to-yellow-200',
      borderGradient: 'from-amber-400 to-yellow-500',
      spotsLeft: goldSpotsLeft
    },
    {
      id: 'premium',
      name: 'Premium Listing',
      description: 'Maximum exposure and insights',
      basePrice: 39.99,
      features: [
        { icon: Crown, text: 'Top placement' },
        { icon: Award, text: 'Premium badge' },
        { icon: BarChart, text: 'Analytics dashboard' },
        { icon: Headphones, text: 'Priority support' }
      ],
      cta: 'Upgrade Premium',
      popular: false,
      gradient: 'from-purple-100 to-indigo-200',
      borderGradient: 'from-purple-400 to-indigo-500'
    },
    {
      id: 'diamond',
      name: 'Diamond Exclusive',
      description: 'White-glove service and exclusivity',
      basePrice: 999.99,
      isAnnual: true,
      features: [
        { icon: Diamond, text: 'Highest placement' },
        { icon: Shield, text: 'Diamond badge' },
        { icon: Briefcase, text: 'Personal manager' },
        { icon: Sparkles, text: 'Exclusive analytics' }
      ],
      cta: 'Apply Diamond',
      popular: false,
      gradient: 'from-cyan-100 to-blue-200',
      borderGradient: 'from-cyan-400 to-blue-500',
      spotsLeft: diamondSpotsLeft
    }
  ];

  const durationOptions = [
    { months: 1, label: '1 Month', discount: 0 },
    { months: 3, label: '3 Months', discount: 10 },
    { months: 6, label: '6 Months', discount: 15 },
    { months: 12, label: '12 Months', discount: 20 }
  ];

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    const plan = pricingPlans.find(p => p.id === planId);
    if (plan) {
      const finalDuration = plan.isAnnual ? 12 : durationMonths;
      const pricing = calculatePricing(
        planId as any,
        finalDuration,
        autoRenew,
        false,
        isNationwide
      );
      onPricingSelect(planId, pricing.finalPrice, finalDuration);
    }
  };

  const getPlanPricing = (plan: any) => {
    if (plan.id === 'diamond') {
      return { finalPrice: plan.basePrice, originalPrice: 1199.99, discountPercentage: 17 };
    }
    return calculatePricing(
      plan.id as any,
      plan.isAnnual ? 12 : durationMonths,
      autoRenew,
      false,
      isNationwide
    );
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30 overflow-hidden">
      {/* Ambient Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-0 w-64 h-64 bg-amber-200/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 pt-8"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-purple-800 to-gray-900 bg-clip-text text-transparent"
          >
            Invest in Your Dream Team
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-600 mb-8"
          >
            Only a few Gold and Diamond spots remain this quarter!
          </motion.p>

          {/* FOMO Counters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-6 mb-12"
          >
            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 border border-amber-200 shadow-lg">
              <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div>
              <span className="font-medium text-amber-700">{goldSpotsLeft}/15 Gold spots left</span>
              <div className="w-16 h-2 bg-amber-100 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-amber-400 to-yellow-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${(goldSpotsLeft / 15) * 100}%` }}
                  transition={{ duration: 1, delay: 0.8 }}
                ></motion.div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 border border-cyan-200 shadow-lg">
              <div className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse"></div>
              <span className="font-medium text-cyan-700">{diamondSpotsLeft}/5 Diamond spots left</span>
              <div className="w-16 h-2 bg-cyan-100 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${(diamondSpotsLeft / 5) * 100}%` }}
                  transition={{ duration: 1, delay: 1 }}
                ></motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Duration Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="max-w-4xl mx-auto mb-8 px-4"
        >
          <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
            <h3 className="text-lg font-semibold text-center mb-4">Choose Your Duration</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {durationOptions.map((option) => (
                <motion.button
                  key={option.months}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setDurationMonths(option.months)}
                  className={cn(
                    "px-6 py-3 rounded-xl border-2 transition-all duration-200 relative overflow-hidden",
                    durationMonths === option.months
                      ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white border-purple-500 shadow-lg"
                      : "bg-white/80 border-gray-200 hover:border-purple-300 hover:bg-white"
                  )}
                >
                  <span className="relative z-10 font-medium">{option.label}</span>
                  {option.discount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      -{option.discount}%
                    </span>
                  )}
                </motion.button>
              ))}
            </div>

            {/* Toggle Options */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <Switch
                  id="auto-renew"
                  checked={autoRenew}
                  onCheckedChange={setAutoRenew}
                />
                <Label htmlFor="auto-renew" className="text-sm font-medium">
                  Auto-renew (Save 5%)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="nationwide"
                  checked={isNationwide}
                  onCheckedChange={setIsNationwide}
                />
                <Label htmlFor="nationwide" className="text-sm font-medium">
                  Nationwide visibility (+$5)
                </Label>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="max-w-7xl mx-auto px-4 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingPlans.map((plan, index) => {
              const pricing = getPlanPricing(plan);
              const isSelected = selectedPlan === plan.id;
              
              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.02,
                    transition: { duration: 0.2 } 
                  }}
                  className="relative group"
                >
                  {/* Popular Badge */}
                  {plan.popular && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20"
                    >
                      <Badge className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-4 py-1 shadow-lg">
                        Most Popular
                      </Badge>
                    </motion.div>
                  )}

                  {/* Spots Left Badge */}
                  {plan.spotsLeft && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="absolute -top-2 -right-2 z-20"
                    >
                      <Badge variant="destructive" className="animate-pulse">
                        {plan.spotsLeft} left
                      </Badge>
                    </motion.div>
                  )}

                  <Card 
                    className={cn(
                      "relative overflow-hidden border-2 transition-all duration-300 cursor-pointer h-full",
                      "backdrop-blur-sm bg-white/80",
                      isSelected 
                        ? `border-transparent bg-gradient-to-br ${plan.gradient} shadow-2xl` 
                        : "border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl",
                      plan.id === 'diamond' && "hover:shadow-cyan-400/25"
                    )}
                    onClick={() => handlePlanSelect(plan.id)}
                  >
                    {/* Background Gradient Overlay */}
                    <div className={cn(
                      "absolute inset-0 opacity-0 transition-opacity duration-300",
                      isSelected && "opacity-100",
                      `bg-gradient-to-br ${plan.gradient}`
                    )}></div>

                    {/* Selection Border Glow */}
                    {isSelected && (
                      <div className={cn(
                        "absolute inset-0 rounded-lg",
                        `bg-gradient-to-r ${plan.borderGradient} opacity-75 blur-sm`
                      )}></div>
                    )}

                    {/* Diamond Shimmer Effect */}
                    {plan.id === 'diamond' && (
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-pulse"></div>
                      </div>
                    )}

                    <div className="relative z-10">
                      <CardHeader className="text-center pb-4">
                        <CardTitle className="text-xl font-bold mb-2">{plan.name}</CardTitle>
                        <p className="text-sm text-gray-600 mb-4">{plan.description}</p>
                        
                        {/* Pricing Display */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-center gap-2">
                            <span className="text-3xl font-bold">
                              ${pricing.finalPrice.toFixed(2)}
                            </span>
                            {!plan.isAnnual && <span className="text-gray-500">/mo</span>}
                            {plan.isAnnual && <span className="text-gray-500">/year</span>}
                          </div>
                          
                          {pricing.discountPercentage > 0 && (
                            <div className="flex items-center justify-center gap-2">
                              <span className="text-sm text-gray-500 line-through">
                                ${pricing.originalPrice.toFixed(2)}
                              </span>
                              <Badge variant="secondary" className="text-green-600">
                                {pricing.discountPercentage}% off
                              </Badge>
                            </div>
                          )}
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        {/* Features List */}
                        <ul className="space-y-3">
                          {plan.features.map((feature, featureIndex) => (
                            <motion.li
                              key={featureIndex}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 + featureIndex * 0.1 }}
                              className="flex items-center gap-3"
                            >
                              <div className={cn(
                                "p-2 rounded-lg",
                                plan.id === 'free' && "bg-gray-100",
                                plan.id === 'gold' && "bg-amber-100",
                                plan.id === 'premium' && "bg-purple-100",
                                plan.id === 'diamond' && "bg-cyan-100"
                              )}>
                                <feature.icon className={cn(
                                  "h-4 w-4",
                                  plan.id === 'free' && "text-gray-600",
                                  plan.id === 'gold' && "text-amber-600",
                                  plan.id === 'premium' && "text-purple-600",
                                  plan.id === 'diamond' && "text-cyan-600"
                                )} />
                              </div>
                              <span className="text-sm font-medium">{feature.text}</span>
                            </motion.li>
                          ))}
                        </ul>

                        {/* CTA Button */}
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            className={cn(
                              "w-full py-3 font-semibold transition-all duration-200",
                              plan.id === 'free' && "bg-gray-600 hover:bg-gray-700",
                              plan.id === 'gold' && "bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 shadow-lg hover:shadow-xl",
                              plan.id === 'premium' && "bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 shadow-lg hover:shadow-xl",
                              plan.id === 'diamond' && "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-lg hover:shadow-xl"
                            )}
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePlanSelect(plan.id);
                            }}
                          >
                            {isSelected ? 'Selected' : plan.cta}
                            {isSelected && <CheckCircle className="ml-2 h-4 w-4" />}
                          </Button>
                        </motion.div>
                      </CardContent>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* All Plans Include Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="max-w-4xl mx-auto px-4"
        >
          <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
            <h3 className="text-lg font-semibold text-center mb-4">All Plans Include</h3>
            <div className="flex flex-wrap justify-center gap-8">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Headphones className="h-5 w-5 text-green-600" />
                </div>
                <span className="font-medium">Premium Support</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Zap className="h-5 w-5 text-blue-600" />
                </div>
                <span className="font-medium">Instant Activation</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Clock className="h-5 w-5 text-purple-600" />
                </div>
                <span className="font-medium">Cancel Anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Globe className="h-5 w-5 text-orange-600" />
                </div>
                <span className="font-medium">Global Reach</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PremiumJobPricingCards;
