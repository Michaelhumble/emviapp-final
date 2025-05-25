
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Crown, Zap, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface PricingConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  selectedTier: string;
  finalPrice: number;
  onConfirmPayment: () => void;
}

const PricingConfirmationModal: React.FC<PricingConfirmationModalProps> = ({
  open,
  onClose,
  selectedTier,
  finalPrice,
  onConfirmPayment
}) => {
  const getTierDetails = (tier: string) => {
    switch (tier) {
      case 'free':
        return {
          name: 'Free Tier',
          icon: <Check className="h-5 w-5" />,
          color: 'text-gray-600',
          bgColor: 'bg-gray-100',
          benefits: ['Basic listing', 'Local visibility', '7-day duration']
        };
      case 'standard':
        return {
          name: 'Standard',
          icon: <Star className="h-5 w-5" />,
          color: 'text-blue-600',
          bgColor: 'bg-blue-100',
          benefits: ['2x visibility', '30-day listing', 'Regional reach']
        };
      case 'premium':
        return {
          name: 'Premium',
          icon: <Zap className="h-5 w-5" />,
          color: 'text-purple-600',
          bgColor: 'bg-purple-100',
          benefits: ['4x visibility', 'Priority placement', 'Advanced analytics']
        };
      case 'gold':
        return {
          name: 'Gold Elite',
          icon: <Crown className="h-5 w-5" />,
          color: 'text-amber-600',
          bgColor: 'bg-amber-100',
          benefits: ['Unlimited edits', 'Premium badge', 'Dedicated support']
        };
      default:
        return {
          name: 'Standard',
          icon: <Star className="h-5 w-5" />,
          color: 'text-blue-600',
          bgColor: 'bg-blue-100',
          benefits: ['Enhanced listing']
        };
    }
  };

  const tierDetails = getTierDetails(selectedTier);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Confirm Your Selection
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Selected Plan Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl"
          >
            <div className={`inline-flex p-3 rounded-full ${tierDetails.bgColor} mb-3`}>
              <div className={tierDetails.color}>
                {tierDetails.icon}
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">{tierDetails.name}</h3>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              ${finalPrice}
              {finalPrice > 0 && <span className="text-base font-normal text-gray-500">/month</span>}
            </div>
            
            <div className="space-y-2">
              {tierDetails.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center justify-center gap-2 text-sm text-gray-600">
                  <Check className="h-4 w-4 text-green-500" />
                  {benefit}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Time-sensitive offer */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-red-700 mb-2">
              <Clock className="h-4 w-4" />
              <span className="font-semibold">Limited Time Offer</span>
            </div>
            <p className="text-sm text-red-600">
              50% off your first month! This deal expires soon.
            </p>
          </div>

          {/* Upgrade suggestion */}
          {selectedTier === 'free' || selectedTier === 'standard' ? (
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-semibold text-purple-800 mb-2">💡 Pro Tip</h4>
              <p className="text-sm text-purple-700">
                Premium and Gold plans get 4x more quality applicants on average!
              </p>
            </div>
          ) : null}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Go Back
            </Button>
            <Button onClick={onConfirmPayment} className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              Proceed to Payment
            </Button>
          </div>
          
          <p className="text-xs text-gray-500 text-center">
            Secure payment • Cancel anytime • 30-day money-back guarantee
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PricingConfirmationModal;
