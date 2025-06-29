
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export interface PricingConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  tier: string;
  isLoading: boolean;
}

const PricingConfirmationModal: React.FC<PricingConfirmationModalProps> = ({
  open,
  onOpenChange,
  onConfirm,
  tier,
  isLoading
}) => {
  const getTierDetails = (tierName: string) => {
    switch (tierName) {
      case 'premium':
        return { name: 'Premium', price: '$39.99', duration: '30 days' };
      case 'featured':
        return { name: 'Featured', price: '$79.99', duration: '30 days' };
      default:
        return { name: 'Unknown', price: '$0', duration: 'Unknown' };
    }
  };

  const tierDetails = getTierDetails(tier);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Your Job Posting</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <p className="text-lg font-medium mb-2">
            {tierDetails.name} Job Posting
          </p>
          <p className="text-muted-foreground mb-4">
            Your job will be visible for {tierDetails.duration} with enhanced features.
          </p>
          <div className="bg-muted p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-medium">Total Cost:</span>
              <span className="text-2xl font-bold">{tierDetails.price}</span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              'Proceed to Payment'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PricingConfirmationModal;
