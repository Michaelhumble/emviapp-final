
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
          // For authenticated users, fetch based on viewing history
          
          // 1. Get the top specialties and locations this user has viewed
          const { data: viewedData, error: viewedError } = await supabase
            .from('profile_views')
            .select('artist_id')
            .eq('viewer_id', user.id)
            .order('viewed_at', { ascending: false })
            .limit(10);
            
          if (viewedError) throw viewedError;
          
          if (viewedData && viewedData.length > 0) {
            // Get artists similar to those they've viewed
            const artistIds = viewedData.map(view => view.artist_id);
            
            // Get specialty and location data for the viewed artists
            const { data: viewedArtists, error: artistError } = await supabase
              .from('users')
              .select('specialty, location')
              .in('id', artistIds);
              
            if (artistError) throw artistError;
            
            // Extract specialties and locations
            const specialties = viewedArtists
              ?.map(a => a.specialty)
              .filter(Boolean) || [];
              
            const locations = viewedArtists
              ?.map(a => a.location)
              .filter(Boolean) || [];
            
            // Build query for suggested artists based on specialties and locations
            query = supabase
              .from('users')
              .select('*')
              .in('role', ['artist', 'freelancer', 'nail technician/artist'])
              .neq('full_name', '')
              .neq('avatar_url', '');
              
            // Filter by specialty if we have specialties data
            if (specialties.length > 0) {
              query = query.in('specialty', specialties);
            }
            
            // Filter by location if we have location data
            if (locations.length > 0) {
              // Use ilike for partial matching of locations
              const locationFilter = locations.length > 1 
                ? locations.map(loc => `location.ilike.%${loc}%`).join(',') 
                : `location.ilike.%${locations[0]}%`;
              query = query.or(locationFilter);
            }
            
            // Exclude current artist if viewing a profile
            if (currentArtistId) {
              query = query.neq('id', currentArtistId);
            }
          } else {
            // Fallback for authenticated users with no viewing history
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
