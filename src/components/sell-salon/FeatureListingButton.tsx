import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { deductCredits, CREDIT_COSTS, checkCredits } from "@/utils/credits";
import { useAuth } from "@/context/auth";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface FeatureListingButtonProps {
  salonSaleId: string;
  isFeatured: boolean;
  onFeatureSuccess?: () => void;
  isOwner?: boolean;
}

export const FeatureListingButton = ({ 
  salonSaleId, 
  isFeatured, 
  onFeatureSuccess,
  isOwner = true // Default to true for backward compatibility
}: FeatureListingButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasCredits, setHasCredits] = useState(true);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const { user } = useAuth();
  
  React.useEffect(() => {
    const checkUserCredits = async () => {
      if (!user) return;
      
      const userCredits = await checkCredits(user.id);
      setHasCredits(userCredits >= CREDIT_COSTS.FEATURED_LISTING);
    };
    
    checkUserCredits();
  }, [user]);
  
  const openConfirmDialog = () => {
    if (!user) {
      toast.error("You must be logged in to feature a listing");
      return;
    }
    
    if (isFeatured) {
      toast.info("This listing is already featured");
      return;
    }
    
    if (!hasCredits) {
      toast.error("Not enough credits to feature this listing", {
        description: "Please purchase more credits to continue."
      });
      return;
    }
    
    setConfirmDialogOpen(true);
  };
  
  const handleFeatureClick = async () => {
    setConfirmDialogOpen(false);
    setIsLoading(true);
    
    try {
      const deducted = await deductCredits({
        userId: user.id,
        amount: CREDIT_COSTS.FEATURED_LISTING,
        reason: "Feature salon listing"
      });
      
      if (!deducted) {
        toast.error("Not enough credits to feature this listing", {
          description: "Please purchase more credits to continue."
        });
        return;
      }
      
      const { error } = await supabase
        .from('salon_sales')
        .update({ is_featured: true } as any)
        .eq('id', salonSaleId)
        .eq('user_id', user.id);
      
      if (error) {
        console.error("Error featuring listing:", error);
        toast.error("Could not feature your listing");
        return;
      }
      
      await supabase.from('activity_log').insert({
        user_id: user.id,
        activity_type: 'feature_listing',
        description: `Featured salon listing (ID: ${salonSaleId})`,
        metadata: { 
          salonSaleId,
          credits_used: CREDIT_COSTS.FEATURED_LISTING
        }
      });
      
      toast.success("Your salon listing is now featured!", {
        description: "It will appear at the top of search results."
      });
      
      if (onFeatureSuccess) {
        onFeatureSuccess();
      }
    } catch (error) {
      console.error("Error in feature listing process:", error);
      toast.error("An error occurred while featuring your listing");
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!isOwner) {
    return null;
  }
  
  if (isFeatured) {
    return (
      <div className="flex items-center text-sm text-amber-600">
        <Star className="h-4 w-4 fill-amber-500 mr-1" />
        Featured Listing
      </div>
    );
  }
  
  return (
    <div>
      <Button
        variant="outline"
        size="sm"
        className={`border-amber-300 text-amber-700 ${hasCredits ? 'hover:bg-amber-50' : 'opacity-60 cursor-not-allowed'}`}
        onClick={openConfirmDialog}
        disabled={isLoading || !hasCredits}
        title={!hasCredits ? "Not enough credits" : "Feature this listing"}
      >
        <Star className="h-4 w-4 mr-2" />
        <span className="hidden sm:inline">Feature This Listing</span>
        <span className="sm:hidden">Feature</span>
      </Button>
      <p className="text-xs text-gray-500 mt-1">
        Nâng cấp để xuất hiện ở đầu danh sách. (10 credits)
      </p>
      
      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Feature this salon listing?</DialogTitle>
            <DialogDescription>
              This will deduct 10 credits from your account and feature your listing at the top of search results.
            </DialogDescription>
          </DialogHeader>
          
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-md my-4">
            <div className="flex items-center text-amber-800">
              <Star className="h-5 w-5 text-amber-500 mr-2" />
              <div>
                <p className="font-medium">Featured Listing Benefits</p>
                <ul className="text-sm mt-1">
                  <li>• Higher visibility to potential buyers</li>
                  <li>• Appears at the top of search results</li>
                  <li>• Special highlighted display</li>
                </ul>
              </div>
            </div>
          </div>
          
          <DialogFooter className="flex sm:justify-between">
            <Button 
              variant="outline" 
              onClick={() => setConfirmDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
              onClick={handleFeatureClick}
              disabled={isLoading}
            >
              {isLoading ? (
                <>Processing...</>
              ) : (
                <>
                  <Star className="h-4 w-4 mr-2" />
                  Đẩy tin lên nổi bật (10 Credits)
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
