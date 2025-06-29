import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { usePostPayment } from '@/hooks/usePostPayment';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { JobPricingTier } from '@/utils/posting/types';

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
  const [selectedPlan, setSelectedPlan] = useState<JobPricingTier>('premium');
  const [selectedDuration, setSelectedDuration] = useState<number>(1);
  const { initiatePayment, isLoading } = usePostPayment();

  const handlePlanChange = (newPricing: JobPricingTier) => {
    setSelectedPlan(newPricing);
  };

  const handleDurationChange = (months: number) => {
    setSelectedDuration(months);
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

  const handleRenew = async () => {
    // Setup renewal pricing options with required fields matching PricingOptions interface
    const pricingOptions = {
      selectedPricingTier: selectedPlan,
      durationMonths: selectedDuration,
      isRenewal: true,
      fastSalePackage,
      bundleWithJobPost,
      autoRenew: false,
      isFirstPost: false // Required field for PricingOptions
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
                className={`border rounded-lg p-3 cursor-pointer ${selectedPlan === 'premium' ? 'border-primary bg-primary/5' : 'border-gray-200'}`}
                onClick={() => handlePlanChange('premium')}
              >
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">Premium</p>
                    <p className="text-sm text-gray-500">{getDurationDisplay(selectedDuration)} visibility</p>
                  </div>
                  <p className="font-semibold">$39.99</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Select Duration</label>
            <div className="grid grid-cols-2 gap-2">
              {[1, 3, 6, 12].map((months) => (
                <div 
                  key={months}
                  className={`border rounded-lg p-3 cursor-pointer ${selectedDuration === months ? 'border-primary bg-primary/5' : 'border-gray-200'}`}
                  onClick={() => handleDurationChange(months)}
                >
                  <p className="text-sm font-medium">{getDurationDisplay(months)}</p>
                </div>
              ))}
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
