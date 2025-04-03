
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar, CreditCard } from "lucide-react";
import { format, addDays } from "date-fns";
import { getRenewalPrice } from "@/utils/postingPriceCalculator";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ExpirationBadge from "./ExpirationBadge";

interface RenewPostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  postId: string;
  postType: 'job' | 'salon' | 'booth';
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
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const renewalPrice = getRenewalPrice(postType, isNationwide, fastSalePackage, bundleWithJobPost);
  const newExpirationDate = addDays(new Date(), 30);

  const handleRenew = async () => {
    setIsLoading(true);
    
    try {
      // In a real implementation, we would call a Stripe endpoint here to handle payment
      // For now, we'll just update the expiration date
      
      const { error } = await supabase
        .from('posts')
        .update({ 
          expires_at: newExpirationDate.toISOString(),
          status: 'active',
          updated_at: new Date().toISOString()
        })
        .eq('id', postId);
        
      if (error) throw error;
        
      toast({
        title: "Post renewed successfully!",
        description: `Your post has been extended until ${format(newExpirationDate, "MMMM d, yyyy")}`,
      });
      
      if (onRenewed) onRenewed();
      onOpenChange(false);
    } catch (error) {
      console.error("Error renewing post:", error);
      toast({
        title: "Renewal failed",
        description: "There was a problem renewing your post. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Renew Your Post</DialogTitle>
          <DialogDescription>
            Extend your post for another 30 days
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">Current expiration:</div>
            <ExpirationBadge expiresAt={expiresAt} showTooltip={false} />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">New expiration after renewal:</div>
            <div className="flex items-center gap-1 text-sm font-medium text-emerald-700">
              <Calendar className="h-4 w-4" />
              {format(newExpirationDate, "MMMM d, yyyy")}
            </div>
          </div>
          
          <div className="border-t border-b py-4 my-4">
            <div className="flex items-center justify-between">
              <div className="font-medium">Renewal fee:</div>
              <div className="text-xl font-bold">${renewalPrice.toFixed(2)}</div>
            </div>
            
            <div className="text-xs text-gray-500 mt-1">
              {isNationwide && <span>• Includes nationwide visibility</span>}
              {fastSalePackage && <span>• Includes Fast Sale Package benefits</span>}
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
            onClick={handleRenew} 
            disabled={isLoading}
            className="gap-2"
          >
            <CreditCard className="h-4 w-4" />
            {isLoading ? "Processing..." : `Pay $${renewalPrice.toFixed(2)} & Renew`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RenewPostDialog;
