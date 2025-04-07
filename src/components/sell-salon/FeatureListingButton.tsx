
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { deductCredits, CREDIT_COSTS } from "@/utils/credits";
import { useAuth } from "@/context/auth";

interface FeatureListingButtonProps {
  salonSaleId: string;
  isFeatured: boolean;
  onFeatureSuccess?: () => void;
}

export const FeatureListingButton = ({ 
  salonSaleId, 
  isFeatured, 
  onFeatureSuccess 
}: FeatureListingButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  
  const handleFeatureClick = async () => {
    if (!user) {
      toast.error("You must be logged in to feature a listing");
      return;
    }
    
    // Don't allow featuring a listing that's already featured
    if (isFeatured) {
      toast.info("This listing is already featured");
      return;
    }
    
    setIsLoading(true);
    try {
      // First check if the user has enough credits
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
      
      // Update the listing to featured - Cast to 'any' to avoid TypeScript error about 'is_featured'
      const { error } = await supabase
        .from('salon_sales')
        .update({ is_featured: true } as any)
        .eq('id', salonSaleId)
        .eq('user_id', user.id); // Ensure owner can only update their own listings
      
      if (error) {
        console.error("Error featuring listing:", error);
        toast.error("Could not feature your listing");
        return;
      }
      
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
        className="border-amber-300 text-amber-700 hover:bg-amber-50"
        onClick={handleFeatureClick}
        disabled={isLoading}
      >
        <Star className="h-4 w-4 mr-2" />
        Feature This Listing
      </Button>
      <p className="text-xs text-gray-500 mt-1">
        Nâng cấp để xuất hiện ở đầu danh sách. (10 credits)
      </p>
    </div>
  );
};
