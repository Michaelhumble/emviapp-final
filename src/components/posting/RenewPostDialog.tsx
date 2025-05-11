import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { usePostPayment } from '@/hooks/usePostPayment';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { PricingOptions } from '@/utils/posting/types';

interface RenewPostDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  postId: string;
  postType: 'job' | 'salon';
  isNationwide: boolean;
  expiresAt: string;
  fastSalePackage?: boolean;
  bundleWithJobPost?: boolean;
  onRenewed?: () => void;
}

const RenewPostDialog = ({
  open,
  onOpenChange,
  postId,
  postType,
  isNationwide,
  expiresAt,
  fastSalePackage = false,
  bundleWithJobPost = false,
  onRenewed
}: RenewPostDialogProps) => {
  const [selectedPlan, setSelectedPlan] = useState('standard');
  const { initiatePayment, isLoading } = usePostPayment();

  const handlePlanChange = (newPricing: string) => {
    setSelectedPlan(newPricing);
  };

  const handleRenew = async () => {
    // Setup renewal pricing options
    const pricingOptions: PricingOptions = {
      selectedPricingTier: selectedPlan,
      isRenewal: true,
      durationMonths: 1,
      isNationwide,
      fastSalePackage,
      bundleWithJobPost,
      autoRenew: false
    };

    try {
      const result = await initiatePayment(postType, { id: postId }, pricingOptions);
      if (onRenewed) {
        onRenewed();
      }
      toast.success("Post renewal initiated successfully!");
      if (onOpenChange) {
        onOpenChange(false);
      }
    } catch (error) {
      console.error("Failed to renew post:", error);
      toast.error("Failed to renew post. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Renew Your Post</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            Your post expired on {new Date(expiresAt).toLocaleDateString()}. Renew now to make it active again.
          </p>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Renewal Plan</label>
            <div className="grid grid-cols-1 gap-2">
              <div 
                className={`border rounded-lg p-3 cursor-pointer ${selectedPlan === 'standard' ? 'border-primary bg-primary/5' : 'border-gray-200'}`}
                onClick={() => handlePlanChange('standard')}
              >
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">Standard</p>
                    <p className="text-sm text-gray-500">30 days visibility</p>
                  </div>
                  <p className="font-semibold">$9.99</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end space-x-2">
            <Button variant="outline" onClick={() => onOpenChange && onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleRenew} disabled={isLoading}>
              {isLoading ? "Processing..." : "Renew Post"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RenewPostDialog;
