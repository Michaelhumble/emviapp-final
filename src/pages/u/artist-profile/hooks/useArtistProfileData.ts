
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { UserProfile } from "@/types/profile";
import { Service, PortfolioImage } from "../types";

export const useArtistProfileData = (username?: string) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [portfolioImages, setPortfolioImages] = useState<PortfolioImage[]>([]);
  const [viewCount, setViewCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isSalonOwner, setIsSalonOwner] = useState(false);

  useEffect(() => {
    if (!username) return;
    
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        
        // Fetch artist profile
        const { data: profileData, error: profileError } = await supabase
          .from('users')
          .select('*')
          .eq('id', username)
          .single();
        
        if (profileError) throw profileError;
        
        if (profileData) {
          setProfile(profileData as UserProfile);
          // Use optional chaining to safely access profile_views or default to 0
          setViewCount(profileData?.profile_views || 0);
          
          // Check if salon owner
          if (profileData.role === 'salon' || profileData.role === 'owner') {
            setIsSalonOwner(true);
          }
          
          // Fetch services (mock data for now)
          const mockServices: Service[] = [
            {
              id: '1',
              title: 'Basic Manicure',
              price: 35,
              duration_minutes: 45,
              description: 'Classic manicure with polish of your choice',
              is_visible: true
            },
            {
              id: '2',
              title: 'Gel Nail Extension',
              price: 65,
              duration_minutes: 90,
              description: 'Full gel extensions with custom design options',
              is_visible: true
            },
            {
              id: '3',
              title: 'Nail Art Design',
              price: 25,
              duration_minutes: 30,
              description: 'Creative custom nail art per your request',
              is_visible: true
            }
          ];
          
          setServices(mockServices);
          
          // Fetch portfolio images (mock data for now)
          const mockPortfolio: PortfolioImage[] = [
            {
              id: '1',
              url: 'https://images.unsplash.com/photo-1610992434884-29786a354f88?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
              name: 'French Manicure'
            },
            {
              id: '2',
              url: 'https://images.unsplash.com/photo-1604902396830-efe67c2edc64?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
              name: 'Gel Extension'
            },
            {
              id: '3',
              url: 'https://images.unsplash.com/photo-1604902396106-58a7239de795?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
              name: 'Summer Design'
            }
          ];
          
          setPortfolioImages(mockPortfolio);
        }
      } catch (err) {
        console.error("Error fetching artist profile:", err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfileData();
  }, [username]);

  // Function to increment view count
  const incrementViewCount = async () => {
    if (!profile || !profile.id) return;
    
    try {
      // Safely access profile_views with a fallback to 0
      const currentViews = profile.profile_views || 0;
      
      // Update with the incremented count
      await updateProfileViews(profile.id, currentViews + 1);
      
      // Update local state
      setViewCount(currentViews + 1);
    } catch (error) {
      console.error("Error incrementing view count:", error);
    }
  };

  // When updating profile views in the database function:
  const updateProfileViews = async (profileId: string, newCount: number) => {
    try {
      // Fixed: We should use 'users' table instead of 'profiles'
      const { error } = await supabase
        .from('users')
        .update({ 
          profile_views: newCount 
        })
        .eq('id', profileId);
      
      if (error) throw error;
    } catch (error) {
      console.error("Error updating profile views:", error);
    }
  };

  return {
    profile,
    services,
    portfolioImages,
    viewCount,
    loading,
    error,
    isSalonOwner,
    incrementViewCount
  };
};
