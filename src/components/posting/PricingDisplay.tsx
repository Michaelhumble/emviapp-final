
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Check, CreditCard, Info, CircleDollarSign } from 'lucide-react';
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

  return (
    <motion.div
      initial={{ opacity: 0.8 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white rounded-xl border border-[#F7E7CE]/30 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
        <div className="bg-gradient-to-r from-[#F8F8FF] to-[#f7e7ce15] p-5 border-b border-[#F7E7CE]/20">
          <h3 className="font-medium text-xl font-playfair text-[#1D1E1E]">Payment Summary</h3>
        </div>
        
        <div className="p-6 space-y-5">
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

          {autoRenew && !isFreePlan && (
            <div className="flex items-start">
              <CalendarDays className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
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
