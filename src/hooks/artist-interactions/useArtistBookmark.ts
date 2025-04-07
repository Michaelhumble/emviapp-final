
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";
import { UseArtistBookmarkReturn } from "./types";

export const useArtistBookmark = (artistId: string): UseArtistBookmarkReturn => {
  const { user, isSignedIn } = useAuth();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(false);

  // Check if artist is bookmarked on mount
  useEffect(() => {
    if (!isSignedIn || !artistId) return;

    const checkBookmark = async () => {
      try {
        const { data: bookmarkData, error: bookmarkError } = await supabase
          .from("saved_artists")
          .select("*")
          .eq("viewer_id", user?.id)
          .eq("artist_id", artistId)
          .maybeSingle();
        
        if (bookmarkError) throw bookmarkError;
        setIsBookmarked(!!bookmarkData);
      } catch (error) {
        console.log("No existing bookmark found");
      }
    };
    
    checkBookmark();
  }, [isSignedIn, artistId, user?.id]);

  const toggleBookmark = async (): Promise<boolean> => {
    if (!isSignedIn || !artistId) {
      return false;
    }

    try {
      setLoading(true);
      
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
      setLoading(false);
    }
  };

  return {
    isBookmarked,
    loading,
    toggleBookmark
  };
};
