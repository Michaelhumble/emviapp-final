
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { UserProfile } from "@/types/profile";

export interface PortfolioImage {
  id: string;
  url: string;
  name?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string | null;
  price: number;
  duration_minutes: number;
  is_visible: boolean;
}

export const useArtistProfileData = (username: string | undefined) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [portfolioImages, setPortfolioImages] = useState<PortfolioImage[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewCount, setViewCount] = useState<number | null>(null);
  const [isSalonOwner, setIsSalonOwner] = useState(false);

  const fetchData = useCallback(async () => {
    if (!username) {
      setError("Username is required");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      
      // First try to find by username (instagram handle)
      let { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('instagram', username)
        .single();
      
      // If not found by username, try with ID
      if (userError || !userData) {
        const { data: idData, error: idError } = await supabase
          .from('users')
          .select('*')
          .eq('id', username)
          .single();
          
        if (idError) {
          setError("Artist not found");
          setLoading(false);
          return;
        }
        
        userData = idData;
      }
      
      // Check if this is an artist profile
      if (userData.role !== 'artist' && userData.role !== 'nail technician/artist' && userData.role !== 'freelancer') {
        setError("This user is not an artist");
        setLoading(false);
        return;
      }
      
      setProfile(userData);
      setViewCount(userData.profile_views || 0);
      
      // Fetch portfolio images
      if (userData.id) {
        const { data: portfolioData } = await supabase
          .from('portfolio_items')
          .select('*')
          .eq('user_id', userData.id)
          .order('created_at', { ascending: false });
          
        if (portfolioData) {
          setPortfolioImages(
            portfolioData.map(item => ({
              id: item.id,
              url: item.image_url,
              name: item.title
            }))
          );
        }
        
        // Fetch services
        const { data: servicesData } = await supabase
          .from('services')
          .select('*')
          .eq('user_id', userData.id)
          .eq('is_visible', true)
          .order('price', { ascending: true });
          
        if (servicesData) {
          setServices(servicesData);
        }
      }
    } catch (err) {
      console.error("Error fetching artist profile:", err);
      setError("Failed to load artist profile");
    } finally {
      setLoading(false);
    }
  }, [username]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const incrementViewCount = useCallback(async () => {
    if (profile?.id) {
      const newCount = (viewCount || 0) + 1;
      const { error } = await supabase
        .from('users')
        .update({ profile_views: newCount })
        .eq('id', profile.id);
        
      if (!error) {
        setViewCount(newCount);
      }
    }
  }, [profile, viewCount]);

  return {
    profile,
    portfolioImages,
    services,
    loading,
    error,
    viewCount,
    isSalonOwner,
    incrementViewCount
  };
};
