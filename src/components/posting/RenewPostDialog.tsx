
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuth } from "@/context/auth";
import StripeCheckout from "../payments/StripeCheckout";
import { getRenewalPrice } from "@/utils/posting/promotionalText";

export interface RenewPostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  postId: string;
  postType: 'salon' | 'job' | 'booth';
  isNationwide: boolean;
  expiresAt: string;
  fastSalePackage: boolean;
  bundleWithJobPost: boolean;
  onRenewed: () => void;
}

const RenewPostDialog = ({
  open,
  onOpenChange,
  postId,
  postType,
  isNationwide,
  expiresAt,
  fastSalePackage,
  bundleWithJobPost,
  onRenewed
}: RenewPostDialogProps) => {
  const { userProfile } = useAuth();
  const [processing, setProcessing] = useState(false);

  const getPostTypeName = () => {
    switch (postType) {
      case 'job':
        return 'Job Post';
      case 'salon':
        return 'Salon Listing';
      case 'booth':
        return 'Booth Rental';
      default:
        return 'Post';
    }
  };

  const renewalPrice = getRenewalPrice(postType, isNationwide, fastSalePackage, bundleWithJobPost);
  
  const handleSuccess = () => {
    setProcessing(false);
    toast.success("Post renewal successful!", {
      description: `Your ${getPostTypeName()} has been renewed for 30 more days.`
    });
    onRenewed();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Renew Your Post</DialogTitle>
          <DialogDescription>
            Extend your {getPostTypeName()} for an additional 30 days.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="space-y-3">
            <div className="text-sm">
              <span className="font-medium">Current expiration:</span> {new Date(expiresAt).toLocaleDateString()}
            </div>
            
            <div className="text-sm">
              <span className="font-medium">New expiration:</span> {new Date(new Date().setDate(new Date().getDate() + 30)).toLocaleDateString()}
            </div>
            
            <div className="mt-4 bg-gray-50 p-3 rounded-md">
              <div className="flex justify-between">
                <span className="font-medium">Renewal price:</span>
                <span>${renewalPrice}</span>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <StripeCheckout
            amount={renewalPrice}
            productName={`${getPostTypeName()} Renewal`}
            buttonText="Renew Now"
            onSuccess={handleSuccess}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RenewPostDialog;
