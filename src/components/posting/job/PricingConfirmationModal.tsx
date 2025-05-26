
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Crown, Star, Diamond, Sparkles } from 'lucide-react';

interface PricingConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  selectedTier: string;
  finalPrice: number;
  durationMonths?: number;
  onConfirmPayment: () => void;
}

const PricingConfirmationModal: React.FC<PricingConfirmationModalProps> = ({
  open,
  onClose,
  selectedTier,
  finalPrice,
  durationMonths = 1,
  onConfirmPayment,
}) => {
  const getTierDetails = () => {
    switch (selectedTier) {
      case 'diamond':
        return {
          name: 'Diamond Exclusive',
          icon: <Diamond className="h-6 w-6 text-cyan-500" />,
          color: 'text-cyan-600',
          bgColor: 'bg-cyan-50',
          features: ['Top diamond placement', 'Personal account manager', 'Premium features'],
          duration: '1 year', // Diamond is ALWAYS 1 year
          price: '$999.99' // Diamond is ALWAYS $999.99
        };
      case 'premium':
        return {
          name: 'Premium Listing',
          icon: <Crown className="h-6 w-6 text-purple-500" />,
          color: 'text-purple-600',
          bgColor: 'bg-purple-50',
          features: ['Premium placement above Gold', 'Advanced analytics', 'Priority support'],
          duration: getDurationDisplay(durationMonths),
          price: `$${finalPrice.toFixed(2)}`
        };
      case 'gold':
        return {
          name: 'Gold Featured Listing',
          icon: <Star className="h-6 w-6 text-amber-500" />,
          color: 'text-amber-600',
          bgColor: 'bg-amber-50',
          features: ['Featured placement', 'Gold badge highlight', 'Enhanced visibility'],
          duration: getDurationDisplay(durationMonths),
          price: `$${finalPrice.toFixed(2)}`
        };
      default:
        return {
          name: 'Free Listing',
          icon: <Sparkles className="h-6 w-6 text-gray-500" />,
          color: 'text-gray-600',
          bgColor: 'bg-gray-50',
          features: ['Basic search visibility', 'Standard placement', '30-day duration'],
          duration: getDurationDisplay(durationMonths),
          price: '$0.00'
        };
    }
  };

  const getDurationDisplay = (months: number) => {
    switch (months) {
      case 1:
        return '30 days';
      case 3:
        return '90 days';
      case 6:
        return '180 days';
      case 12:
        return '1 year';
      default:
        return `${months * 30} days`;
    }
  };

  const tierDetails = getTierDetails();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {tierDetails.icon}
            Confirm Your {tierDetails.name}
          </DialogTitle>
          <DialogDescription>
            Review your selection before proceeding to payment
          </DialogDescription>
        </DialogHeader>

        <div className={`p-4 rounded-lg ${tierDetails.bgColor}`}>
          <div className="flex justify-between items-center mb-3">
            <span className="font-medium">Plan:</span>
            <span className={`font-semibold ${tierDetails.color}`}>
              {tierDetails.name}
            </span>
          </div>
          
          <div className="flex justify-between items-center mb-3">
            <span className="font-medium">Duration:</span>
            <span>{tierDetails.duration}</span>
          </div>
          
          <div className="flex justify-between items-center mb-4">
            <span className="font-medium">Total:</span>
            <span className="text-xl font-bold">
              {tierDetails.price}
            </span>
          </div>

          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-700">Included features:</p>
            {tierDetails.features.map((feature, index) => (
              <p key={index} className="text-sm text-gray-600">• {feature}</p>
            ))}
          </div>
          
          {selectedTier === 'diamond' && (
            <div className="mt-3 p-2 bg-cyan-100 rounded text-xs text-cyan-800">
              Annual exclusive plan - No monthly options available
            </div>
          )}
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={onConfirmPayment}
            className={`${
              selectedTier === 'diamond' 
                ? 'bg-cyan-600 hover:bg-cyan-700'
                : selectedTier === 'premium'
                ? 'bg-purple-600 hover:bg-purple-700'
                : selectedTier === 'gold'
                ? 'bg-amber-600 hover:bg-amber-700'
                : 'bg-gray-600 hover:bg-gray-700'
            }`}
          >
            Proceed to Payment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PricingConfirmationModal;
