
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Shield, Crown, Diamond, Users, Clock, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

interface JobPricingTableProps {
  onPricingSelect: (tier: string, finalPrice: number, durationMonths: number) => void;
  jobData?: any;
}

const JobPricingTable: React.FC<JobPricingTableProps> = ({ onPricingSelect, jobData }) => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      id: 'free',
      name: 'Free Listing',
      emotiveTitle: 'Essential',
      monthlyPrice: 0,
      annualPrice: 0,
      features: [
        'Basic search visibility',
        '30-day listing duration', 
        'Standard placement position',
        'Secure posting platform',
        'Mobile-optimized display'
      ],
      buttonText: 'Start Free',
      buttonVariant: 'outline' as const,
      gradientClass: 'from-slate-50 to-gray-100',
      borderClass: 'border-gray-200'
    },
    {
      id: 'gold',
      name: 'Gold Featured',
      emotiveTitle: 'Professional',
      monthlyPrice: 19.99,
      annualPrice: 191.92,
      originalAnnual: 239.88,
      badge: 'POPULAR',
      limitedSpots: '8/15 spots available',
      features: [
        'Featured placement above standard',
        'Gold verification badge',
        'Enhanced search visibility',
        'Basic performance analytics',
        'Priority customer support'
      ],
      buttonText: 'Select Gold',
      buttonVariant: 'default' as const,
      gradientClass: 'from-amber-50 to-yellow-50',
      borderClass: 'border-amber-200',
      accentColor: 'amber'
    },
    {
      id: 'premium',
      name: 'Premium Listing',
      emotiveTitle: 'Executive', 
      monthlyPrice: 39.99,
      annualPrice: 383.92,
      originalAnnual: 479.88,
      badge: 'RECOMMENDED',
      limitedSpots: '5/15 spots available',
      features: [
        'Premium placement above Gold',
        'Premium verification badge',
        'Advanced analytics dashboard',
        'Priority support consultation',
        'Targeted visibility optimization'
      ],
      buttonText: 'Select Premium',
      buttonVariant: 'default' as const,
      gradientClass: 'from-purple-50 to-indigo-50',
      borderClass: 'border-purple-200',
      accentColor: 'purple',
      isRecommended: true
    },
    {
      id: 'diamond',
      name: 'Diamond Exclusive',
      emotiveTitle: 'Elite',
      monthlyPrice: 999.99,
      annualPrice: 999.99,
      badge: 'INVITE ONLY',
      limitedSpots: '2/5 spots available',
      features: [
        'Highest diamond placement',
        'Diamond elite verification',
        'Personal account manager',
        'Premium analytics insights',
        'Exclusive annual benefits'
      ],
      buttonText: 'Request Invitation',
      buttonVariant: 'default' as const,
      gradientClass: 'from-cyan-50 to-blue-50',
      borderClass: 'border-cyan-200',
      accentColor: 'cyan',
      isDiamond: true
    }
  ];

  const getPrice = (plan: any) => {
    if (plan.isDiamond) return plan.annualPrice;
    return isAnnual ? plan.annualPrice : plan.monthlyPrice;
  };

  const getOriginalPrice = (plan: any) => {
    if (plan.isDiamond || !isAnnual) return null;
    return plan.originalAnnual;
  };

  const getSavingsPercentage = (plan: any) => {
    if (!isAnnual || plan.isDiamond || !plan.originalAnnual) return null;
    return Math.round(((plan.originalAnnual - plan.annualPrice) / plan.originalAnnual) * 100);
  };

  const handlePlanSelect = (plan: any) => {
    const price = getPrice(plan);
    const duration = plan.isDiamond ? 12 : (isAnnual ? 12 : 1);
    onPricingSelect(plan.id, price, duration);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="font-playfair text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Supercharge Your Salon's
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent block">
              Success
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-8 font-medium leading-relaxed">
            Every plan unlocks new ways to attract talent, win more clients, and grow your brand—
            <span className="font-semibold text-gray-800">risk-free, with no hidden fees.</span>
          </p>
          
          {/* Trust Badges */}
          <div className="flex items-center justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-500" />
              <span>Secure PCI-compliant checkout</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-purple-500" />
              <span>No hidden fees</span>
            </div>
          </div>
        </motion.div>

        {/* Billing Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-center mb-12"
        >
          <div className="flex items-center gap-4 bg-white/80 backdrop-blur-md rounded-full p-2 shadow-lg border border-gray-200">
            <span className={cn(
              "text-sm font-medium px-4 py-2 rounded-full transition-all",
              !isAnnual ? 'text-gray-900 bg-white shadow-sm' : 'text-gray-500'
            )}>
              Monthly
            </span>
            
            <Switch
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
              className="data-[state=checked]:bg-purple-600"
            />
            
            <div className="flex items-center gap-3">
              <span className={cn(
                "text-sm font-medium px-4 py-2 rounded-full transition-all",
                isAnnual ? 'text-gray-900 bg-white shadow-sm' : 'text-gray-500'
              )}>
                Annual
              </span>
              
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ 
                  scale: isAnnual ? 1 : 0.8, 
                  opacity: isAnnual ? 1 : 0.7 
                }}
                transition={{ duration: 0.3 }}
              >
                <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
                  Save 20%
                </Badge>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* FOMO Elements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-6 mb-16"
        >
          <div className="flex items-center gap-2 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-full px-4 py-2">
            <Users className="h-4 w-4 text-red-500" />
            <span className="text-sm font-medium text-red-700">
              Only <strong>12/15</strong> Diamond spots left this year
            </span>
          </div>
          
          <div className="flex items-center gap-2 bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-full px-4 py-2">
            <Clock className="h-4 w-4 text-orange-500" />
            <span className="text-sm font-medium text-orange-700">
              Next price increase in <strong>48:00:00</strong>
            </span>
          </div>
          
          <div className="flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-full px-4 py-2">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <span className="text-sm font-medium text-green-700">
              <strong>127 salons</strong> upgraded this week
            </span>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={cn(
                "relative",
                plan.isRecommended && "lg:transform lg:scale-110"
              )}
            >
              <Card className={cn(
                "relative overflow-hidden p-8 h-full transition-all duration-500 cursor-pointer group",
                "bg-gradient-to-br backdrop-blur-sm shadow-xl hover:shadow-2xl",
                "border-2 hover:border-opacity-50",
                plan.gradientClass,
                plan.borderClass,
                plan.isDiamond && "ring-2 ring-cyan-200 shadow-cyan-100/50"
              )}>
                {/* Background Glow Effect */}
                <div className={cn(
                  "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                  plan.accentColor === 'amber' && "bg-gradient-to-br from-amber-100/20 to-yellow-100/20",
                  plan.accentColor === 'purple' && "bg-gradient-to-br from-purple-100/20 to-indigo-100/20",
                  plan.accentColor === 'cyan' && "bg-gradient-to-br from-cyan-100/20 to-blue-100/20"
                )} />
                
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute top-4 right-4">
                    <Badge className={cn(
                      "font-medium tracking-wide",
                      plan.badge === 'POPULAR' && "bg-gradient-to-r from-amber-500 to-yellow-500 text-white",
                      plan.badge === 'RECOMMENDED' && "bg-gradient-to-r from-purple-500 to-indigo-500 text-white animate-pulse",
                      plan.badge === 'INVITE ONLY' && "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                    )}>
                      {plan.badge}
                    </Badge>
                  </div>
                )}

                <div className="relative z-10 h-full flex flex-col">
                  {/* Plan Icon */}
                  <div className="mb-6">
                    {plan.id === 'diamond' && <Diamond className="h-8 w-8 text-cyan-600" />}
                    {plan.id === 'premium' && <Crown className="h-8 w-8 text-purple-600" />}
                    {plan.id === 'gold' && <Shield className="h-8 w-8 text-amber-600" />}
                    {plan.id === 'free' && <Check className="h-8 w-8 text-gray-600" />}
                  </div>

                  {/* Plan Name */}
                  <div className="mb-4">
                    <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-1">
                      {plan.name}
                    </h3>
                    <p className="text-sm font-medium text-gray-600">
                      {plan.emotiveTitle}
                    </p>
                  </div>

                  {/* Pricing */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-playfair font-bold text-gray-900">
                        ${getPrice(plan)}
                      </span>
                      {!plan.isDiamond && (
                        <span className="text-gray-500 font-medium">
                          /{isAnnual ? 'year' : 'month'}
                        </span>
                      )}
                      {plan.isDiamond && (
                        <span className="text-gray-500 font-medium">/year</span>
                      )}
                    </div>
                    
                    {getOriginalPrice(plan) && (
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-lg text-gray-400 line-through">
                          ${getOriginalPrice(plan)}
                        </span>
                        <Badge className="bg-green-100 text-green-800 text-xs">
                          Save {getSavingsPercentage(plan)}%
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Limited Spots */}
                  {plan.limitedSpots && (
                    <div className="mb-6">
                      <div className={cn(
                        "text-xs font-medium px-3 py-1.5 rounded-full border",
                        plan.accentColor === 'amber' && "bg-amber-50 text-amber-700 border-amber-200",
                        plan.accentColor === 'purple' && "bg-purple-50 text-purple-700 border-purple-200",
                        plan.accentColor === 'cyan' && "bg-cyan-50 text-cyan-700 border-cyan-200"
                      )}>
                        {plan.limitedSpots}
                      </div>
                    </div>
                  )}

                  {/* Features */}
                  <div className="flex-1 mb-8">
                    <ul className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Check className={cn(
                            "h-4 w-4 mt-0.5 flex-shrink-0",
                            plan.accentColor === 'amber' && "text-amber-600",
                            plan.accentColor === 'purple' && "text-purple-600", 
                            plan.accentColor === 'cyan' && "text-cyan-600",
                            !plan.accentColor && "text-gray-600"
                          )} />
                          <span className="text-sm font-medium text-gray-700 leading-relaxed">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <Button
                    onClick={() => handlePlanSelect(plan)}
                    variant={plan.buttonVariant}
                    className={cn(
                      "w-full font-semibold py-3 transition-all duration-300",
                      plan.buttonVariant === 'outline' 
                        ? "border-2 border-gray-300 text-gray-700 hover:bg-gray-50"
                        : cn(
                            "text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02]",
                            plan.accentColor === 'amber' && "bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600",
                            plan.accentColor === 'purple' && "bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600",
                            plan.accentColor === 'cyan' && "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                          )
                    )}
                  >
                    {plan.buttonText}
                  </Button>

                  {/* Trust Microcopy */}
                  <p className="text-xs text-gray-500 text-center mt-3">
                    {plan.id === 'free' ? 'No payment required' : 'Secure checkout • Cancel anytime'}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Enterprise Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-md mx-auto"
        >
          <Card className="p-8 bg-gradient-to-br from-gray-900 to-black text-white shadow-2xl border-gray-700">
            <div className="text-center">
              <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="font-playfair text-2xl font-bold mb-2">Enterprise</h3>
              <p className="text-gray-300 mb-6">Custom Solutions</p>
              <p className="text-gray-400 text-sm mb-6">
                For salon groups or industry partners—talk to our team for a tailored package.
              </p>
              <Button 
                variant="outline" 
                className="w-full border-gray-600 text-white hover:bg-gray-800"
              >
                Contact Sales
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default JobPricingTable;
