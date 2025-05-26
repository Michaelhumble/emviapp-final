
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, Shield, Diamond, Check, Globe, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
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
  const [selectedTier, setSelectedTier] = useState<string>('premium');
  const [durations, setDurations] = useState({
    free: 1,
    gold: 3,
    premium: 6,
    diamond: 12
  });
  const [autoRenew, setAutoRenew] = useState(true);
  const [nationwide, setNationwide] = useState(false);

  const tiers = [
    {
      id: 'free',
      name: 'Free Listing',
      icon: <Check className="h-12 w-12 text-gray-500" />,
      badge: null,
      basePrice: 0,
      gradient: 'from-gray-50 to-gray-100',
      borderColor: 'border-gray-200',
      features: [
        'Basic visibility for 30 days',
        'Standard job placement',
        'Email notifications',
        'Basic applicant management'
      ]
    },
    {
      id: 'gold',
      name: 'Gold Featured',
      icon: <Crown className="h-12 w-12 text-amber-500" />,
      badge: { text: 'POPULAR', color: 'bg-gradient-to-r from-orange-400 to-amber-500' },
      basePrice: 19.99,
      gradient: 'from-amber-50 to-yellow-100',
      borderColor: 'border-amber-300',
      features: [
        'Gold badge & highlighting',
        'Priority in recommendations',
        'Email notifications for applicants',
        'Basic analytics dashboard',
        'Featured placement'
      ]
    },
    {
      id: 'premium',
      name: 'Premium Listing',
      icon: <Shield className="h-12 w-12 text-purple-600" />,
      badge: { text: 'RECOMMENDED', color: 'bg-gradient-to-r from-purple-500 to-indigo-600' },
      basePrice: 39.99,
      gradient: 'from-purple-50 to-indigo-100',
      borderColor: 'border-purple-300',
      features: [
        'Premium badge & styling',
        'Advanced applicant filtering',
        'Detailed analytics & insights',
        'Priority customer support',
        'Social media boost',
        'Top placement guarantee'
      ]
    },
    {
      id: 'diamond',
      name: 'Diamond Exclusive',
      icon: <Diamond className="h-12 w-12 text-cyan-500" />,
      badge: { text: 'ANNUAL ONLY', color: 'bg-gradient-to-r from-cyan-400 to-blue-500' },
      basePrice: 999.99,
      gradient: 'from-cyan-50 to-blue-100',
      borderColor: 'border-cyan-300',
      features: [
        'Exclusive top placement',
        'Diamond badge & premium styling',
        'Personal account manager',
        'White-glove service',
        'Custom branding options',
        'Advanced recruitment tools',
        '24/7 priority support'
      ],
      fixedDuration: true
    }
  ];

  const durationOptions = [
    { months: 1, label: '1 Month', discount: 0 },
    { months: 3, label: '3 Months', discount: 10 },
    { months: 6, label: '6 Months', discount: 15 },
    { months: 12, label: '12 Months', discount: 20 }
  ];

  const calculatePrice = (tier: any, duration: number) => {
    if (tier.id === 'free') return 0;
    if (tier.id === 'diamond') return 999.99;
    
    const discount = durationOptions.find(d => d.months === duration)?.discount || 0;
    const baseTotal = tier.basePrice * duration;
    const discountAmount = (baseTotal * discount) / 100;
    const autoRenewDiscount = autoRenew && duration === 1 ? baseTotal * 0.05 : 0;
    const finalPrice = baseTotal - discountAmount - autoRenewDiscount;
    const nationwidePrice = nationwide ? 5 : 0;
    
    return finalPrice + nationwidePrice;
  };

  const getOriginalPrice = (tier: any, duration: number) => {
    if (tier.id === 'free') return 0;
    if (tier.id === 'diamond') return 1199.88;
    return tier.basePrice * duration;
  };

  const handleTierSelect = (tierId: string) => {
    setSelectedTier(tierId);
  };

  const handleDurationSelect = (tierId: string, duration: number) => {
    setDurations(prev => ({ ...prev, [tierId]: duration }));
  };

  const handleProceed = () => {
    const tier = tiers.find(t => t.id === selectedTier);
    if (!tier) return;
    
    const duration = tier.fixedDuration ? 12 : durations[selectedTier as keyof typeof durations];
    const finalPrice = calculatePrice(tier, duration);
    
    onPricingSelect(selectedTier, finalPrice, duration);
  };

  return (
    <div className="space-y-8">
      {/* Auto-Renew and Nationwide Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-200 shadow-lg"
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <Switch
                checked={autoRenew}
                onCheckedChange={setAutoRenew}
                className="data-[state=checked]:bg-purple-600"
              />
              <div>
                <span className="font-semibold text-gray-900">Auto-Renew Enabled</span>
                <Badge variant="secondary" className="ml-2 bg-green-100 text-green-800">
                  Save 5%
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Globe className="h-5 w-5 text-blue-500" />
            <Switch
              checked={nationwide}
              onCheckedChange={setNationwide}
              className="data-[state=checked]:bg-blue-600"
            />
            <div>
              <span className="font-semibold text-gray-900">Nationwide Visibility</span>
              <Badge variant="secondary" className="ml-2 bg-blue-100 text-blue-800">
                +$5
              </Badge>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tiers.map((tier, index) => {
          const isSelected = selectedTier === tier.id;
          const duration = tier.fixedDuration ? 12 : durations[tier.id as keyof typeof durations];
          const finalPrice = calculatePrice(tier, duration);
          const originalPrice = getOriginalPrice(tier, duration);
          const hasDiscount = originalPrice > finalPrice && tier.id !== 'free';

          return (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                "relative group cursor-pointer transition-all duration-300",
                "bg-gradient-to-br rounded-3xl p-6 border-2",
                tier.gradient,
                tier.borderColor,
                isSelected 
                  ? "ring-4 ring-purple-500/20 shadow-2xl scale-105 border-purple-500" 
                  : "hover:shadow-xl hover:scale-102 hover:border-purple-300"
              )}
              onClick={() => handleTierSelect(tier.id)}
            >
              {/* Badge */}
              {tier.badge && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className={cn(
                    "text-white font-bold px-4 py-1 text-xs tracking-wide",
                    tier.badge.color
                  )}>
                    {tier.badge.text}
                  </Badge>
                </div>
              )}

              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
                  {tier.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-center text-gray-900 mb-2">
                {tier.name}
              </h3>

              {/* Pricing */}
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-3xl font-bold text-gray-900">
                    ${finalPrice.toFixed(2)}
                  </span>
                  {tier.id !== 'free' && tier.id !== 'diamond' && (
                    <span className="text-sm text-gray-500">/{duration}mo</span>
                  )}
                  {tier.id === 'diamond' && (
                    <span className="text-sm text-gray-500">/year</span>
                  )}
                </div>
                
                {hasDiscount && (
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-sm text-gray-500 line-through">
                      ${originalPrice.toFixed(2)}
                    </span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                      Save {Math.round(((originalPrice - finalPrice) / originalPrice) * 100)}%
                    </Badge>
                  </div>
                )}
              </div>

              {/* Duration Selector - Not for Diamond */}
              {!tier.fixedDuration && (
                <div className="mb-6">
                  <p className="text-sm font-medium text-gray-700 mb-3">Duration</p>
                  <div className="grid grid-cols-2 gap-2">
                    {durationOptions.map((option) => (
                      <button
                        key={option.months}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDurationSelect(tier.id, option.months);
                        }}
                        className={cn(
                          "text-xs p-2 rounded-lg border transition-all",
                          "flex flex-col items-center gap-1",
                          duration === option.months
                            ? "bg-purple-600 text-white border-purple-600"
                            : "bg-white/60 border-gray-200 hover:bg-purple-50"
                        )}
                      >
                        <span className="font-medium">{option.label}</span>
                        {option.discount > 0 && (
                          <span className="text-[10px] bg-green-100 text-green-800 px-1 rounded">
                            -{option.discount}%
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Features */}
              <div className="space-y-2 mb-6">
                <p className="text-sm font-medium text-gray-700">Features Included</p>
                <ul className="space-y-1">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-xs text-gray-600">
                      <Check className="h-3 w-3 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <Button
                className={cn(
                  "w-full font-semibold transition-all",
                  isSelected
                    ? "bg-purple-600 hover:bg-purple-700 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  handleTierSelect(tier.id);
                }}
              >
                {isSelected ? 'Selected' : `Choose ${tier.name}`}
              </Button>
            </motion.div>
          );
        })}
      </div>

      {/* Proceed Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-center"
      >
        <Button
          onClick={handleProceed}
          size="lg"
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold px-12 py-4 text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all"
        >
          <Sparkles className="h-5 w-5 mr-2" />
          Continue with {tiers.find(t => t.id === selectedTier)?.name}
        </Button>
      </motion.div>
    </div>
  );
};

export default PremiumJobPricingCards;
