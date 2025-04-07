
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";
import { logActivity } from "@/utils/activity";

export type InteractionType = "bookmark" | "follow" | "offer";

export const useArtistInteractions = (artistId: string) => {
  const { user, isSignedIn } = useAuth();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState({
    bookmark: false,
    follow: false,
    offer: false
  });

  // Check if artist is bookmarked or followed on mount
  useEffect(() => {
    if (!isSignedIn || !artistId) return;

    const checkInteractions = async () => {
      try {
        // Check if artist is bookmarked
        const { data: bookmarkData, error: bookmarkError } = await supabase
          .from("saved_artists")
          .select("*")
          .eq("viewer_id", user?.id)
          .eq("artist_id", artistId)
          .maybeSingle();
        
        if (bookmarkError) throw bookmarkError;
        setIsBookmarked(!!bookmarkData);
        
        // Check if artist is followed
        const { data: followData, error: followError } = await supabase
          .from("followers")
          .select("*")
          .eq("viewer_id", user?.id)
          .eq("artist_id", artistId)
          .maybeSingle();
        
        if (followError) throw followError;
        setIsFollowing(!!followData);
      } catch (error) {
        // It's ok if these fail - just means not bookmarked/following
        console.log("No existing interactions found");
      }
    };
    
    checkInteractions();
  }, [isSignedIn, artistId, user?.id]);

  const toggleBookmark = async () => {
    if (!isSignedIn || !artistId) {
      return false;
    }

    try {
      setLoading(prev => ({ ...prev, bookmark: true }));
      
      if (isBookmarked) {
        // Remove bookmark
        const { error } = await supabase
          .from("saved_artists")
          .delete()
          .eq("viewer_id", user?.id)
          .eq("artist_id", artistId);
          
        if (error) throw error;
        
        setIsBookmarked(false);
        toast.success("Artist removed from your list");
      } else {
        // Add bookmark
        const { error } = await supabase
          .from("saved_artists")
          .insert({
            viewer_id: user?.id,
            artist_id: artistId
          });
          
        if (error) throw error;
        
        // Credits are awarded automatically through a database trigger
        setIsBookmarked(true);
        toast.success("Artist saved to your list (+2 credits)");
      }
      
      return true;
    } catch (error) {
      console.error("Error toggling bookmark:", error);
      toast.error("Failed to update your saved artists");
      return false;
    } finally {
      setLoading(prev => ({ ...prev, bookmark: false }));
    }
  };

  const toggleFollow = async () => {
    if (!isSignedIn || !artistId) {
      return false;
    }

    try {
      setLoading(prev => ({ ...prev, follow: true }));
      
      if (isFollowing) {
        // Unfollow artist
        const { error } = await supabase
          .from("followers")
          .delete()
          .eq("viewer_id", user?.id)
          .eq("artist_id", artistId);
          
        if (error) throw error;
        
        setIsFollowing(false);
        toast.success("Unfollowed artist");
      } else {
        // Follow artist
        const { error } = await supabase
          .from("followers")
          .insert({
            viewer_id: user?.id,
            artist_id: artistId
          });
          
        if (error) throw error;
        
        // Credits are awarded automatically through a database trigger
        setIsFollowing(true);
        toast.success("You're now following this artist (+5 credits)");
      }
      
      return true;
    } catch (error) {
      console.error("Error toggling follow:", error);
      toast.error("Failed to update follow status");
      return false;
    } finally {
      setLoading(prev => ({ ...prev, follow: false }));
    }
  };

  const sendOffer = async (message: string) => {
    if (!isSignedIn || !artistId) {
      return false;
    }

    try {
      setLoading(prev => ({ ...prev, offer: true }));
      
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
      setLoading(prev => ({ ...prev, offer: false }));
    }
  };

  return {
    isBookmarked,
    isFollowing,
    loading,
    toggleBookmark,
    toggleFollow,
    sendOffer
  };
};
