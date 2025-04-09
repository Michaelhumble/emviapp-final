
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { UserProfile, UserRole } from "@/types/profile";
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
  
  // Fetch profile data
  useEffect(() => {
    const fetchArtistProfile = async () => {
      if (!username) {
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        
        // Fetch user profile
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
            role: profileData.role as UserRole,
            instagram: profileData.instagram,
            website: profileData.website,
            accepts_bookings: profileData.accepts_bookings,
            booking_url: profileData.booking_url,
            years_experience: profileData.years_experience || 0,
            profile_views: profileData.profile_views || 0
          };
          
          setProfile(userProfile);
          // Set the view count from the profileData
          setViewCount(profileData.profile_views || 0);
          
          // Check if salon owner
          setIsSalonOwner(userProfile.role === 'salon' || userProfile.role === 'owner');
          
          // Fetch services
          const { data: servicesData, error: servicesError } = await supabase
            .from('services')
            .select('*')
            .eq('user_id', username)
            .eq('is_visible', true);
          
          if (servicesError) throw servicesError;
          
          setServices(servicesData || []);
          
          // Fetch portfolio images from portfolio_items table
          const { data: portfolioData, error: portfolioError } = await supabase
            .from('portfolio_items')
            .select('id, image_url, title')
            .eq('user_id', username);
          
          if (portfolioError) throw portfolioError;
          
          if (portfolioData) {
            // Transform the data to match the PortfolioImage structure
            const formattedPortfolioData: PortfolioImage[] = portfolioData.map(item => ({
              id: item.id,
              url: item.image_url,
              name: item.title || `Portfolio image`
            }));
            
            setPortfolioImages(formattedPortfolioData);
          } else {
            // Fallback to portfolio_urls if no dedicated portfolio items
            if (profileData.portfolio_urls && profileData.portfolio_urls.length > 0) {
              const portfolioUrls = profileData.portfolio_urls.map((url: string, index: number) => ({
                id: `portfolio-${index}`,
                url,
                name: `Portfolio image ${index + 1}`
              }));
              
              setPortfolioImages(portfolioUrls);
            }
          }
        } else {
          setError(new Error("Artist profile not found"));
        }
      } catch (err) {
        console.error("Error fetching artist profile:", err);
        setError(err as Error);
        toast.error("Failed to load artist profile");
      } finally {
        setLoading(false);
      }
    };
    
    fetchArtistProfile();
  }, [username]);
  
  // Function to increment the view count
  const incrementViewCount = async () => {
    if (!profile) return;
    
    try {
      // Update the local view count
      const newViewCount = (viewCount || 0) + 1;
      setViewCount(newViewCount);
      
      // Update the database
      const { error } = await supabase
        .from('users')
        .update({ 
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
