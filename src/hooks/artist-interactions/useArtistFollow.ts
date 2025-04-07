
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";
import { UseArtistFollowReturn } from "./types";

export const useArtistFollow = (artistId: string): UseArtistFollowReturn => {
  const { user, isSignedIn } = useAuth();
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Check if artist is followed on mount
  useEffect(() => {
    if (!isSignedIn || !artistId) return;

    const checkFollow = async () => {
      try {
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
        console.log("No existing follow found");
      }
    };
    
    checkFollow();
  }, [isSignedIn, artistId, user?.id]);

  const toggleFollow = async (): Promise<boolean> => {
    if (!isSignedIn || !artistId) {
      return false;
    }

    try {
      setLoading(true);
      
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
      setLoading(false);
    }
  };

  return {
    isFollowing,
    loading,
    toggleFollow
  };
};
