
import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth";
import { supabaseBypass } from '@/types/supabase-bypass';
import { UserProfile } from "@/types/profile";
import { toast } from "sonner";

export const useSuggestedArtists = (currentArtistId?: string) => {
  const [suggestedArtists, setSuggestedArtists] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, userRole, userProfile } = useAuth();

  useEffect(() => {
    const fetchSuggestedArtists = async () => {
      try {
        setIsLoading(true);
        
        // Skip suggestions if the viewer is an artist (for now)
        if (userRole === 'artist' || userRole === 'freelancer' || userRole === 'nail technician/artist') {
          setSuggestedArtists([]);
          setIsLoading(false);
          return;
        }

        let query;
        
        if (user && userProfile?.location) {
          // For authenticated users with a location, prioritize matching by location
          console.log("Fetching artists based on location:", userProfile.location);
          
          // Get artists with the same location
          query = supabaseBypass
            .from('profiles')
            .select('*')
            .in('role' as any, ['artist', 'freelancer', 'nail technician/artist'])
            .neq('avatar_url' as any, '')
            .ilike('location' as any, `%${userProfile.location.split(',')[0]}%`)
            .order('boosted_until' as any, { ascending: false });
            
          // Exclude current artist if viewing a profile
          if (currentArtistId) {
            query = query.neq('id' as any, currentArtistId);
          }
        } else {
          // Fallback for unauthenticated users or those without location
          query = getFallbackQuery(currentArtistId);
        }
        
        // Add boosting priority and limit
        const { data: artists, error } = await query.limit(10);
          
        if (error) throw error;
        
        // Sort results: boosted first, then randomize slightly
        const boostedArtists = (artists as any)?.filter((a: any) => a.boosted_until && new Date(a.boosted_until) > new Date()) || [];
        const regularArtists = (artists as any)?.filter((a: any) => !a.boosted_until || new Date(a.boosted_until) <= new Date()) || [];
        
        // Randomize regular artists slightly
        const shuffledRegular = regularArtists.sort(() => 0.5 - Math.random());
        
        setSuggestedArtists([...boostedArtists, ...shuffledRegular]);
        console.log("Fetched suggested artists:", boostedArtists.length + shuffledRegular.length);
      } catch (error) {
        console.error("Error fetching suggested artists:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSuggestedArtists();
  }, [user, userRole, userProfile, currentArtistId]);
  
  // Helper function for fallback query
  const getFallbackQuery = (currentArtistId?: string) => {
    let query = supabaseBypass
      .from('profiles')
      .select('*')
      .in('role' as any, ['artist', 'freelancer', 'nail technician/artist'])
      .neq('full_name' as any, '')
      .neq('avatar_url' as any, '');
      
    // Exclude current artist if viewing a profile
    if (currentArtistId) {
      query = query.neq('id' as any, currentArtistId);
    }
    
    return query;
  };

  return { suggestedArtists, isLoading };
};
