
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { UserProfile } from "@/types/profile";
import { Service, PortfolioImage } from "../types";
import { toast } from "sonner";

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
          // Create a UserProfile object with the data from the database
          const userProfile: UserProfile = {
            id: profileData.id,
            full_name: profileData.full_name,
            email: profileData.email,
            phone: profileData.phone,
            bio: profileData.bio,
            specialty: profileData.specialty,
            location: profileData.location,
            avatar_url: profileData.avatar_url,
            role: profileData.role,
            instagram: profileData.instagram,
            website: profileData.website,
            accepts_bookings: profileData.accepts_bookings,
            booking_url: profileData.booking_url,
            // Add other properties as needed
            years_experience: profileData.years_experience || 0,
            // Store the profile views from the database in our local state
            profile_views: profileData.profile_views || 0
          };
          
          setProfile(userProfile);
          // Set the view count from the profileData
          setViewCount(profileData.profile_views || 0);
          
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
        toast.error("Failed to load artist profile");
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
      
      // Update the database
      const { error } = await supabase
        .from('users')
        .update({ 
          // Use 'profile_views' which matches the database column name
          profile_views: newViewCount 
        })
        .eq('id', username);
      
      if (error) {
        console.error("Error updating view count:", error);
        toast.error("Failed to update view count");
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
