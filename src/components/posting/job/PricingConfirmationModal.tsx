
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
import { Card, CardContent } from '@/components/ui/card';
import { Check } from 'lucide-react';

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
  onConfirmPayment,
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const getTierName = (tier: string) => {
    const tierNames: Record<string, string> = {
      free: 'Free',
      gold: 'Gold',
      premium: 'Premium',
      diamond: 'Diamond',
    };
    return tierNames[tier] || tier;
  };

  const getTierFeatures = (tier: string): string[] => {
    const features: Record<string, string[]> = {
      free: [
        'Basic job listing',
        '30-day visibility',
        'Standard support',
      ],
      gold: [
        'Enhanced visibility',
        '30-day listing',
        'Priority support',
        'Featured badge',
      ],
      premium: [
        'Premium visibility',
        '30-day listing',
        'Priority support',
        'Featured badge',
        'Top search results',
      ],
      diamond: [
        'Maximum visibility',
        '12-month listing',
        'Dedicated support',
        'Premium badge',
        'Top placement guaranteed',
        'Analytics dashboard',
      ],
    };
    return features[tier] || [];
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Confirm Your Selection</DialogTitle>
          <DialogDescription>
            Please review your job posting plan before proceeding to payment.
          </DialogDescription>
        </DialogHeader>

        <Card>
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <div className="text-2xl font-bold text-purple-600">
                {getTierName(selectedTier)} Plan
              </div>
              
              <div className="text-3xl font-bold">
                {finalPrice === 0 ? 'Free' : formatPrice(finalPrice)}
              </div>
              
              {durationMonths > 1 && (
                <div className="text-sm text-gray-600">
                  {durationMonths} month{durationMonths > 1 ? 's' : ''} duration
                </div>
              )}

              <div className="space-y-2 mt-4">
                <div className="font-semibold text-sm text-gray-700">
                  What's included:
                </div>
                {getTierFeatures(selectedTier).map((feature, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <DialogFooter className="space-x-2">
          <Button variant="outline" onClick={onClose}>
            Change Plan
          </Button>
          <Button onClick={onConfirmPayment}>
            {finalPrice === 0 ? 'Post Job' : 'Proceed to Payment'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PricingConfirmationModal;
