
import React from 'react';
import { motion } from 'framer-motion';
import { jobPricingOptions } from '@/utils/posting/jobPricing';
import { JobPricingTier } from '@/utils/posting/types';

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
  discountPercentage
}) => {
  // Get the selected pricing tier details
  const selectedPricing = jobPricingOptions.find(option => option.id === pricingId || option.tier === pricingId);
  if (!selectedPricing) return null;
  
  // Calculate end date
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + duration * 30);
  
  // Format date
  const formattedEndDate = endDate.toLocaleDateString('en-US', { 
    year: 'numeric',
    month: 'long', 
    day: 'numeric'
  });
  
  // For free plan or $0 plans, don't show this component
  if (finalPrice <= 0) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="border rounded-lg p-4 bg-gray-50"
    >
      <h3 className="font-medium text-gray-700 mb-2">Pricing Summary</h3>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Base price ({selectedPricing.name})</span>
          <span>${basePrice.toFixed(2)}/month</span>
        </div>
        
        <div className="flex justify-between">
          <span>Duration</span>
          <span>{duration} month{duration > 1 ? 's' : ''}</span>
        </div>
        
        {discountPercentage > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Duration discount</span>
            <span>-{discountPercentage}%</span>
          </div>
        )}
        
        <div className="border-t pt-2 mt-2">
          <div className="flex justify-between font-medium">
            <span>Subtotal</span>
            {discountPercentage > 0 ? (
              <div>
                <span className="line-through text-gray-500 mr-2">${originalPrice.toFixed(2)}</span>
                <span>${finalPrice.toFixed(2)}</span>
              </div>
            ) : (
              <span>${finalPrice.toFixed(2)}</span>
            )}
          </div>
        </div>
        
        <div className="text-gray-500 text-xs mt-4">
          {autoRenew ? (
            <p>Your subscription will automatically renew every {duration} month{duration > 1 ? 's' : ''}. You can cancel anytime.</p>
          ) : (
            <p>Your listing will expire on {formattedEndDate} unless manually renewed.</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PricingDisplay;
