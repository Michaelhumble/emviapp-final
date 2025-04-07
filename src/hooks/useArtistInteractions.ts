
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";

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
        const { data: bookmarkData } = await supabase
          .from("saved_artists")
          .select("*")
          .eq("viewer_id", user?.id)
          .eq("artist_id", artistId)
          .single();
        
        setIsBookmarked(!!bookmarkData);
        
        // Check if artist is followed
        const { data: followData } = await supabase
          .from("followers")
          .select("*")
          .eq("viewer_id", user?.id)
          .eq("artist_id", artistId)
          .single();
        
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
        await supabase
          .from("saved_artists")
          .delete()
          .eq("viewer_id", user?.id)
          .eq("artist_id", artistId);
        
        setIsBookmarked(false);
        toast.success("Artist removed from your list");
      } else {
        // Add bookmark
        await supabase
          .from("saved_artists")
          .insert({
            viewer_id: user?.id,
            artist_id: artistId
          });
        
        setIsBookmarked(true);
        toast.success("Artist saved to your list");
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
        await supabase
          .from("followers")
          .delete()
          .eq("viewer_id", user?.id)
          .eq("artist_id", artistId);
        
        setIsFollowing(false);
        toast.success("Unfollowed artist");
      } else {
        // Follow artist
        await supabase
          .from("followers")
          .insert({
            viewer_id: user?.id,
            artist_id: artistId
          });
        
        setIsFollowing(true);
        toast.success("You're now following this artist");
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
      await supabase
        .from("offers_sent")
        .insert({
          sender_id: user?.id,
          artist_id: artistId,
          message,
          credits_used: creditCost
        });
      
      // In a real implementation, you would also deduct credits from the user's account
      
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
