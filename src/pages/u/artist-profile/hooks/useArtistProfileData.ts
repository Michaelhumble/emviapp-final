
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
          // Safely access profile_views or default to 0
          const views = profileData.profile_views ?? 0;
          setViewCount(views);
          
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
    if (!profile || !username) return;
    
    try {
      const newViewCount = (viewCount || 0) + 1;
      
      // Update local state immediately for better UX
      setViewCount(newViewCount);
      
      // Update the database without using profile_views directly in the update
      const { error } = await supabase
        .from('users')
        .update({ 
          // Use a type assertion here to avoid TypeScript errors
          profile_views: newViewCount 
        } as Partial<UserProfile>)
        .eq('id', username);
      
      if (error) {
        console.error("Error updating view count:", error);
      }
    } catch (err) {
      console.error("Error incrementing view count:", err);
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
