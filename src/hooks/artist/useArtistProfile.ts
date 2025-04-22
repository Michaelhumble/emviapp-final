
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";
import { ArtistProfile } from "@/types/artist";

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

        // For now, we'll use mock data since there seems to be an issue with the table schema
        // This will be replaced with actual database queries once the schema is fixed
        const mockProfile: ArtistProfile = {
          id: targetUserId,
          user_id: targetUserId,
          full_name: userProfile?.full_name || "Artist Name",
          specialty: userProfile?.specialty || "Nail Artist",
          bio: userProfile?.bio || "Professional nail artist with a passion for creative designs.",
          location: userProfile?.location || "New York, NY",
          years_experience: userProfile?.years_experience || 3,
          instagram: userProfile?.instagram || "nailartist",
          website: userProfile?.website || "https://example.com",
          skills: userProfile?.skills || ["Gel nails", "Nail art", "Acrylics"],
          portfolio_urls: userProfile?.portfolio_urls || [],
          avatar_url: userProfile?.avatar_url || "",
          independent: userProfile?.independent || true,
          accepts_bookings: true,
          rating: 4.9,
          profile_completion: 85
        };

        setProfile(mockProfile);
      } catch (error) {
        console.error("Error fetching artist profile:", error);
        // If the current user's profile was requested, use the context data as fallback
        if (!artistId && userProfile) {
          const profileWithCompletion: ArtistProfile = {
            id: user?.id,
            user_id: user?.id,
            full_name: userProfile.full_name,
            specialty: userProfile.specialty,
            bio: userProfile.bio,
            location: userProfile.location,
            years_experience: userProfile.years_experience,
            instagram: userProfile.instagram,
            website: userProfile.website,
            skills: userProfile.skills,
            portfolio_urls: userProfile.portfolio_urls,
            avatar_url: userProfile.avatar_url,
            independent: userProfile.independent,
            accepts_bookings: true,
            rating: 4.8,
            profile_completion: 80
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
