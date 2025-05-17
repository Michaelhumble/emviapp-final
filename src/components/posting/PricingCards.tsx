
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { JobPricingOption } from '@/utils/posting/types';
import { cn } from '@/lib/utils';
import { CheckCircle, Clock, Fire, Lock, Sparkles } from 'lucide-react';
import DurationSelector from './DurationSelector';
import { Badge } from '@/components/ui/badge';

interface PricingCardsProps {
  pricingOptions: JobPricingOption[];
  selectedPricing: string;
  onChange: (pricingId: string) => void;
  selectedDuration: number;
  onDurationChange: (duration: number) => void;
}

const PricingCards: React.FC<PricingCardsProps> = ({
  pricingOptions,
  selectedPricing,
  onChange,
  selectedDuration,
  onDurationChange
}) => {
  const [showConfetti, setShowConfetti] = useState<string | null>(null);
  const [goldSpotsLeft, setGoldSpotsLeft] = useState(3);
  
  // If Diamond plan is selected, force 12 month duration
  useEffect(() => {
    if (selectedPricing === 'diamond' && selectedDuration !== 12) {
      onDurationChange(12);
    }
  }, [selectedPricing, selectedDuration, onDurationChange]);
  
  const handlePricingChange = (pricingId: string) => {
    onChange(pricingId);
    
    // Show confetti animation when selecting paid plans
    if (pricingId !== 'free' && pricingId !== selectedPricing) {
      setShowConfetti(pricingId);
      setTimeout(() => setShowConfetti(null), 2000);
    }
  };
  
  // Add null check for pricingOptions
  if (!pricingOptions || pricingOptions.length === 0) {
    return null;
  }
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 overflow-x-auto pb-2">
        {pricingOptions.map((option) => {
          const isPremium = option.id === 'premium';
          const isGold = option.id === 'gold';
          const isDiamond = option.id === 'diamond';
          const isFree = option.id === 'free';
          
          return (
            <motion.div
              key={option.id}
              className={cn(
                "border rounded-lg overflow-hidden cursor-pointer transition-all relative",
                selectedPricing === option.id
                  ? "border-purple-600 shadow-md ring-2 ring-purple-200"
                  : "border-gray-200 hover:border-gray-300 hover:shadow-sm",
                isPremium && "z-10",
                isDiamond && "opacity-90 cursor-not-allowed"
              )}
              whileTap={!isDiamond ? { scale: 0.98 } : {}}
              onClick={() => !isDiamond && handlePricingChange(option.id)}
              initial={isPremium ? { scale: 1.03 } : { scale: 1 }}
              animate={selectedPricing === option.id 
                ? { scale: 1.03, boxShadow: '0 10px 25px -5px rgba(124, 58, 237, 0.25)' }
                : isPremium 
                  ? { scale: 1.02, boxShadow: '0 4px 15px -3px rgba(124, 58, 237, 0.15)' }
                  : { scale: 1 }
              }
              transition={{ duration: 0.2 }}
            >
              {/* Confetti effect when selected */}
              {showConfetti === option.id && (
                <motion.div 
                  className="absolute inset-0 z-20 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <motion.div 
                      className="text-4xl"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1.5, opacity: 1 }}
                      exit={{ scale: 2, opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      ✓
                    </motion.div>
                  </div>
                </motion.div>
              )}
              
              {/* Premium Plan Glow Effect */}
              {isPremium && (
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-100 to-pink-100 opacity-70 glow-effect"></div>
              )}
              
              {/* Diamond Plan Blur Effect */}
              {isDiamond && (
                <div className="absolute inset-0 z-10 backdrop-blur-sm bg-white/30 flex items-center justify-center">
                  <div className="text-center p-4 space-y-2">
                    <Lock className="h-8 w-8 mx-auto text-purple-800/70" />
                    <p className="font-semibold text-purple-900">Invite Only</p>
                    <p className="text-sm text-gray-600">Waitlist Opens Soon</p>
                  </div>
                </div>
              )}
              
              <div className={cn(
                "px-6 py-4 relative",
                option.popular || isPremium ? "bg-gradient-to-r from-amber-50 to-amber-100" : "bg-gray-50"
              )}>
                {/* Plan badge area */}
                <div className="mb-3 min-h-[28px] flex flex-wrap gap-2">
                  {isPremium && (
                    <Badge className="bg-amber-500 text-white flex items-center gap-1 animate-subtle-pulse">
                      <Fire className="h-3 w-3" />
                      <span>Best Value (Most Popular)</span>
                    </Badge>
                  )}
                  
                  {isGold && (
                    <Badge className="bg-yellow-500 text-white flex items-center gap-1">
                      <Sparkles className="h-3 w-3" />
                      <span>Limited</span>
                    </Badge>
                  )}
                  
                  {isGold && (
                    <Badge variant="outline" className="bg-white/80 border-yellow-200 text-yellow-700 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>Only {goldSpotsLeft} left this month</span>
                    </Badge>
                  )}
                  
                  {isFree && (
                    <Badge variant="outline" className="bg-white/80 border-gray-200 text-gray-600">
                      Basic
                    </Badge>
                  )}
                </div>
                
                <h3 className="font-bold text-lg">{option.name}</h3>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-bold">${option.price.toFixed(2)}</span>
                  {option.wasPrice && option.wasPrice > option.price && (
                    <span className="text-sm text-gray-500 line-through">${option.wasPrice}</span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {option.vietnameseDescription || option.description}
                </p>
                
                {/* FOMO trust blurbs */}
                <div className="mt-3 text-xs text-gray-600 italic">
                  {isPremium && (
                    <p className="font-medium">99% of salons choose this — Instantly featured to 10,000+ candidates</p>
                  )}
                  {isGold && (
                    <p className="font-medium">Priority queue — Only {goldSpotsLeft} spots left!</p>
                  )}
                  {isFree && (
                    <p>Good for slow months. Upgrade anytime for more applicants.</p>
                  )}
                </div>
              </div>
              
              <div className="p-4 bg-white">
                <ul className="space-y-2">
                  {option.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          );
        })}
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-center mb-1">
          <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
            🎉 Over 1,300 jobs filled in the last 30 days!
          </span>
        </p>
      </div>
      
      <div className="mt-4">
        <p className="text-center text-sm text-gray-600 mb-4">Select subscription length:</p>
        <DurationSelector 
          selectedDuration={selectedDuration} 
          onChange={onDurationChange}
          selectedPricing={selectedPricing}
        />
      </div>
    </div>
  );
};

export default PricingCards;
