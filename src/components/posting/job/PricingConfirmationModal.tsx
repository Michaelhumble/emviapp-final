
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle, CreditCard } from 'lucide-react';

interface PricingConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  selectedTier: string;
  finalPrice: number;
  durationMonths: number;
  onConfirmPayment: () => void;
}

const PricingConfirmationModal: React.FC<PricingConfirmationModalProps> = ({
  open,
  onClose,
  selectedTier,
  finalPrice,
  durationMonths,
  onConfirmPayment
}) => {
  const getTierDisplayName = (tier: string) => {
    switch (tier) {
      case 'gold': return 'Gold Featured';
      case 'premium': return 'Premium Boost';
      case 'diamond': return 'Diamond Elite';
      default: return tier;
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            Confirm Your Selection
          </DialogTitle>
          <DialogDescription>
            Review your job posting plan before proceeding to payment
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg space-y-3">
            <div className="flex justify-between">
              <span className="font-medium">Plan:</span>
              <span className="text-purple-600 font-semibold">
                {getTierDisplayName(selectedTier)}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="font-medium">Duration:</span>
              <span>
                {selectedTier === 'diamond' ? '12 months' : '30 days'}
              </span>
            </div>
            
            <div className="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span className="text-purple-600">
                {formatPrice(finalPrice)}
              </span>
            </div>
          </div>

          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>What happens next:</strong>
              <br />
              • Secure payment via Stripe
              <br />
              • Instant job posting activation
              <br />
              • Email confirmation with details
            </p>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button onClick={onConfirmPayment} className="flex-1">
            <CreditCard className="h-4 w-4 mr-2" />
            Proceed to Payment
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PricingConfirmationModal;
