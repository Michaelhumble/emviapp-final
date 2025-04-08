
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";
import { logActivity } from "@/utils/activity";
import { UseArtistOfferReturn } from "./types";

export const useArtistOffer = (artistId: string): UseArtistOfferReturn => {
  const { user, isSignedIn } = useAuth();
  const [loading, setLoading] = useState(false);

  const sendOffer = async (message: string): Promise<boolean> => {
    if (!isSignedIn || !artistId) {
      return false;
    }

    try {
      setLoading(true);
      
      // For now, we'll use a fixed credit cost of 5 credits
      const creditCost = 5;
      
      // Send offer to artist
      const { error } = await supabase
        .from("offers_sent")
        .insert({
          sender_id: user?.id,
          artist_id: artistId,
          message,
          credits_used: creditCost
        });
        
      if (error) throw error;
      
      // Deduct credits using our new function
      // Use type assertion to work around TypeScript error
      const { error: deductError } = await supabase.rpc('redeem_credits' as any, {
        p_user_id: user?.id,
        p_amount: creditCost,
        p_redemption_type: 'offer',
        p_target_id: artistId
      });
      
      if (deductError) {
        console.error("Error deducting credits:", deductError);
        // Still continue as the offer was sent
      }
      
      // Log activity
      await logActivity({
        userId: user?.id || '',
        activityType: 'profile_updated',
        description: `Sent an offer to an artist`,
        metadata: { artistId, creditCost }
      });
      
      toast.success("Offer sent to artist");
      return true;
    } catch (error) {
      console.error("Error sending offer:", error);
      toast.error("Failed to send offer");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    sendOffer
  };
};
