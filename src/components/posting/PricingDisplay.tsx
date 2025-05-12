
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Check, X, Info, Star, Crown, CircleDollarSign, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';

interface PricingDisplayProps {
  basePrice: number;
  duration: number;
  pricingId: string;
  autoRenew: boolean;
  originalPrice: number;
  finalPrice: number;
  discountPercentage: number;
}

const PricingDisplay: React.FC<PricingDisplayProps> = ({
  basePrice,
  duration,
  pricingId,
  autoRenew,
  originalPrice,
  finalPrice,
  discountPercentage,
}) => {
  const isFreePlan = pricingId === 'free';
  const dollarSavings = originalPrice - finalPrice;

  // Plan title mapping
  const getPlanTitle = () => {
    switch(pricingId) {
      case 'free': return 'Basic Plan – Free (first-time only)';
      case 'standard': return 'Standard — $9.99/mo';
      case 'premium': return 'Premium Listing — $24.99/mo';
      case 'gold': return 'Gold Featured — $14.99/mo';
      default: return 'Job Listing Plan';
    }
  };
  
  // Plan subtitle mapping
  const getPlanSubtitle = () => {
    switch(pricingId) {
      case 'free': return 'No credit card required. Limited visibility.';
      case 'standard': return 'Smart visibility for most businesses';
      case 'premium': return 'Highlight your listing & match with better candidates';
      case 'gold': return 'Premium exposure across homepage & listings';
      default: return '';
    }
  };
  
  // Badge mapping
  const getPlanBadge = () => {
    switch(pricingId) {
      case 'free': return { icon: '✨', text: 'For new users' };
      case 'standard': return { icon: '🔥', text: 'Chosen by 8,200+ salons' };
      case 'premium': return { icon: '💎', text: 'Most loved by salons' };
      case 'gold': return { icon: '⭐', text: 'Built to help you grow faster' };
      default: return { icon: '', text: '' };
    }
  };

  // Card styling
  const getCardStyling = () => {
    switch(pricingId) {
      case 'free':
        return "bg-gray-50 border border-gray-200 shadow";
      case 'standard':
        return "bg-white border border-blue-200 shadow-lg";
      case 'premium':
        return "bg-gradient-to-r from-[#F5F3FF] to-[#EDE7FF] border border-purple-200 shadow-lg";
      case 'gold':
        return "bg-gradient-to-r from-[#FFF4D4] to-[#FFEAC2] border border-amber-200 shadow-lg";
      default:
        return "bg-white border border-gray-200 shadow";
    }
  };

  const badge = getPlanBadge();

  return (
    <motion.div
      initial={{ opacity: 0.8 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex-1"
    >
      <div className={`rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl h-full flex flex-col ${getCardStyling()}`}>
        <div className="p-5 border-b border-[#F7E7CE]/20">
          {badge.text && (
            <div className="mb-2">
              <Badge variant="secondary" className={`
                py-1 px-3 text-xs font-medium 
                ${pricingId === 'standard' ? 'bg-blue-100 text-blue-700' : ''}
                ${pricingId === 'premium' ? 'bg-purple-100 text-purple-700' : ''}
                ${pricingId === 'gold' ? 'bg-amber-100 text-amber-700' : ''}
                ${pricingId === 'free' ? 'bg-gray-100 text-gray-700' : ''}
              `}>
                {badge.icon} {badge.text}
              </Badge>
            </div>
          )}
          
          <h3 className="font-medium text-xl font-playfair text-[#1D1E1E]">{getPlanTitle()}</h3>
          <p className="text-sm text-gray-600 mt-1">{getPlanSubtitle()}</p>
        </div>
        
        <div className="p-6 space-y-5 flex-grow">
          <div className="flex items-start justify-between">
            <div className="flex items-start">
              <CircleDollarSign className="h-5 w-5 text-[#50C878] mr-3 mt-0.5" />
              <div>
                <span className="font-medium font-playfair">
                  {isFreePlan ? 'Free Basic Plan' : `${duration} Month${duration > 1 ? 's' : ''} Plan`}
                </span>
                {!isFreePlan && (
                  <div className="text-sm text-gray-600">
                    ${basePrice.toFixed(2)}/mo × {duration} month{duration > 1 ? 's' : ''}
                  </div>
                )}
              </div>
            </div>
            <div className="font-medium">
              {isFreePlan ? '$0.00' : `$${originalPrice.toFixed(2)}`}
            </div>
          </div>
          
          {!isFreePlan && discountPercentage > 0 && (
            <motion.div 
              className="flex items-start justify-between text-[#50C878]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-start">
                <Check className="h-5 w-5 mr-3 mt-0.5" />
                <div>
                  <span className="font-medium">{duration}-month discount</span>
                  <div className="text-sm">
                    Save {discountPercentage}% on {duration}-month plan
                  </div>
                </div>
              </div>
              <div className="font-medium">-${dollarSavings.toFixed(2)}</div>
            </motion.div>
          )}

          {/* Features section */}
          <div className="space-y-2 pt-3">
            {pricingId === 'standard' && (
              <>
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">Increased visibility</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">Better search placement</span>
                </div>
              </>
            )}
            
            {pricingId === 'premium' && (
              <>
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">Top placement in listings</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">Highlighted in search results</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">Higher visibility</span>
                </div>
              </>
            )}
            
            {pricingId === 'gold' && (
              <>
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">Premium placement</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">Homepage feature</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">Free listing boost</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">Priority support</span>
                </div>
              </>
            )}
            
            {pricingId === 'free' && (
              <>
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">Limited visibility</span>
                </div>
                <div className="flex items-center">
                  <X className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-400">Premium placement</span>
                </div>
                <div className="flex items-center">
                  <X className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-400">Homepage feature</span>
                </div>
                <div className="flex items-center">
                  <X className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-400">Listing boost</span>
                </div>
              </>
            )}
          </div>

          {autoRenew && !isFreePlan && (
            <div className="flex items-start pt-2">
              <CreditCard className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
              <div className="text-sm text-blue-700">
                <span className="font-medium">Auto-renew enabled</span>
                <p className="text-blue-600 text-xs mt-0.5">
                  Your subscription will automatically renew every {duration} month{duration > 1 ? 's' : ''}.
                  You can cancel at any time.
                </p>
              </div>
            </div>
          )}
          
          <div className="border-t border-[#F7E7CE]/30 pt-5 mt-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xl font-semibold text-[#1D1E1E] font-playfair">Total</span>
              <motion.span 
                className="text-2xl font-bold text-[#1D1E1E] font-playfair"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              >
                ${isFreePlan ? '0.00' : finalPrice.toFixed(2)}
              </motion.span>
            </div>
            
            {!isFreePlan && (
              <div className="flex items-start mt-3 text-sm text-gray-600">
                <Info className="h-4 w-4 mr-2 flex-shrink-0 mt-0.5 text-blue-500" />
                <div>
                  {autoRenew ? (
                    <p>You'll be charged ${finalPrice.toFixed(2)} now, then ${finalPrice.toFixed(2)} every {duration} month{duration > 1 ? 's' : ''}.</p>
                  ) : (
                    <p>One-time payment for {duration} month{duration > 1 ? 's' : ''} of service.</p>
                  )}
                </div>
              </div>
            )}
            
            {!isFreePlan && discountPercentage > 0 && (
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-3"
              >
                <Badge variant="secondary" className="bg-[#50C878]/10 text-[#50C878] hover:bg-[#50C878]/20 font-medium py-1">
                  You save ${dollarSavings.toFixed(2)} ({discountPercentage}%)
                </Badge>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PricingDisplay;
