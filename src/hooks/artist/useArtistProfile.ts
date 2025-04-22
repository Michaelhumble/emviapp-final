
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";
import { ArtistProfile } from "@/types/artist";
import { calculateProfileCompletion } from "@/utils/supabase-helpers";

export const useArtistProfile = (artistId?: string) => {
  const [profile, setProfile] = useState<ArtistProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user, userProfile, userRole } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const targetUserId = artistId || user?.id;
        
        if (!targetUserId) {
          setProfile(null);
          return;
        }

        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", targetUserId)
          .single();

        if (error) throw error;

        // Calculate profile completion
        const profileWithCompletion = {
          ...data,
          profile_completion: calculateProfileCompletion(data, data.role || userRole)
        };

        setProfile(profileWithCompletion);
      } catch (error) {
        console.error("Error fetching artist profile:", error);
        // If the current user's profile was requested, use the context data as fallback
        if (!artistId && userProfile) {
          const profileWithCompletion = {
            ...userProfile,
            profile_completion: calculateProfileCompletion(userProfile, userRole)
          };
          setProfile(profileWithCompletion);
        } else {
          setProfile(null);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [user, userProfile, userRole, artistId]);

  return { profile, isLoading };
};
