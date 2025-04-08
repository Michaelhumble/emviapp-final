
import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";
import { UserProfile } from "@/types/profile";
import { toast } from "sonner";

export const useSuggestedArtists = (currentArtistId?: string) => {
  const [suggestedArtists, setSuggestedArtists] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, userRole } = useAuth();

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
        
        if (user) {
          // For authenticated users, try to fetch based on viewing patterns
          
          // We don't use profile_views directly since it might not exist yet
          // Instead, fetch artists with similar characteristics to the current user
          
          // Get user's preferences
          const { data: userData } = await supabase
            .from('users')
            .select('specialty, location')
            .eq('id', user.id)
            .single();
            
          if (userData?.specialty || userData?.location) {
            // Build query for suggested artists based on user's preferences
            query = supabase
              .from('users')
              .select('*')
              .in('role', ['artist', 'freelancer', 'nail technician/artist'])
              .neq('full_name', '')
              .neq('avatar_url', '');
              
            // Filter by specialty if we have specialty data
            if (userData.specialty) {
              query = query.eq('specialty', userData.specialty);
            }
            
            // Filter by location if we have location data
            if (userData.location) {
              query = query.eq('location', userData.location);
            }
            
            // Exclude current artist if viewing a profile
            if (currentArtistId) {
              query = query.neq('id', currentArtistId);
            }
          } else {
            // Fallback for authenticated users with no preferences
            query = getFallbackQuery(currentArtistId);
          }
        } else {
          // For unauthenticated users, show trending/boosted artists
          query = getFallbackQuery(currentArtistId);
        }
        
        // Add boosting priority and limit
        const { data: artists, error } = await query
          .order('boosted_until', { ascending: false, nullsLast: true })
          .limit(6);
          
        if (error) throw error;
        
        // Shuffle slightly while maintaining boosted priority
        const boostedArtists = artists?.filter(a => a.boosted_until && new Date(a.boosted_until) > new Date()) || [];
        const regularArtists = artists?.filter(a => !a.boosted_until || new Date(a.boosted_until) <= new Date()) || [];
        
        // Randomize regular artists slightly
        const shuffledRegular = regularArtists.sort(() => 0.5 - Math.random());
        
        setSuggestedArtists([...boostedArtists, ...shuffledRegular].slice(0, 6));
      } catch (error) {
        console.error("Error fetching suggested artists:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSuggestedArtists();
  }, [user, userRole, currentArtistId]);
  
  // Helper function for fallback query
  const getFallbackQuery = (currentArtistId?: string) => {
    let query = supabase
      .from('users')
      .select('*')
      .in('role', ['artist', 'freelancer', 'nail technician/artist'])
      .neq('full_name', '')
      .neq('avatar_url', '');
      
    // Exclude current artist if viewing a profile
    if (currentArtistId) {
      query = query.neq('id', currentArtistId);
    }
    
    return query;
  };

  return { suggestedArtists, isLoading };
};
