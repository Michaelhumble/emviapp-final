
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { useState } from "react";
import { PostType } from "@/utils/posting/types";
import { 
  getBasePrice, 
  getNationwidePrice, 
  getFastSalePackagePrice,
  getShowAtTopPrice,
  getRenewalPrice
} from "@/utils/posting/promotionalText";

interface RenewPostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  postType: PostType;
  postTitle: string;
}

const RenewPostDialog = ({
  open,
  onOpenChange,
  onConfirm,
  postType,
  postTitle
}: RenewPostDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleConfirm = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      onConfirm();
      onOpenChange(false);
    }, 1500);
  };
  
  const renewalPrice = getRenewalPrice(postType);
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-amber-500" />
            Renew Your Post
          </DialogTitle>
          <DialogDescription>
            Your post "{postTitle}" has expired. Would you like to renew it?
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="bg-amber-50 p-3 rounded-md border border-amber-100">
            <p className="text-amber-800 text-sm">
              Renewing your post will make it visible again for another 30 days. The renewal fee is ${renewalPrice}.
            </p>
          </div>
          
          <div className="text-sm space-y-2">
            <p className="font-medium">What happens when you renew:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Your post becomes active and visible in search results</li>
              <li>The post retains all original information and settings</li>
              <li>30-day visibility period starts immediately</li>
            </ul>
          </div>
        </div>
        
        <DialogFooter className="sm:justify-between">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : `Renew for $${renewalPrice}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RenewPostDialog;
