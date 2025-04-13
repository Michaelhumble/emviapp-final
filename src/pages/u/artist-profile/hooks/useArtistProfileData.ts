
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { UserProfile } from "@/types/profile";
import { PortfolioImage, Service } from "../types";

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
      
      // Convert database user to UserProfile type, safely handling potentially missing properties
      const artistProfile: UserProfile = {
        id: userData.id,
        email: userData.email || '',
        full_name: userData.full_name,
        avatar_url: userData.avatar_url,
        role: userData.role,
        bio: userData.bio,
        specialty: userData.specialty,
        location: userData.location,
        instagram: userData.instagram,
        website: userData.website,
        phone: userData.phone,
        profile_views: typeof (userData as any).profile_views === 'number' ? (userData as any).profile_views : 0,
        boosted_until: userData.boosted_until,
        badges: Array.isArray(userData.badges) ? userData.badges : [],
        accepts_bookings: userData.accepts_bookings,
        booking_url: userData.booking_url,
        contact_link: userData.contact_link,
        completed_profile_tasks: Array.isArray(userData.completed_profile_tasks) 
          ? userData.completed_profile_tasks 
          : [],
        preferences: Array.isArray(userData.preferences) ? userData.preferences : [],
        preferred_language: userData.preferred_language,
        years_experience: typeof (userData as any).years_experience === 'number' ? (userData as any).years_experience : 0,
        created_at: userData.created_at,
        updated_at: userData.updated_at,
        professional_name: (userData as any).professional_name || ''
      };
      
      setProfile(artistProfile);
      setViewCount(artistProfile.profile_views || 0);
      
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
              name: item.title || 'Portfolio Item', // Ensure name is always provided as a string
              description: item.description || ''
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
          // Map the services data to match the Service interface
          const mappedServices = servicesData.map((service: any) => ({
            id: service.id,
            name: service.title || '', // Map title to name for compatibility
            title: service.title || '',
            description: service.description || 'No description provided', // Ensure description is always a string
            price: service.price,
            price_type: service.price_type || 'fixed', // Ensure price_type is always provided
            duration: service.duration,
            duration_minutes: service.duration_minutes,
            image_url: service.image_url,
            category: service.category,
            created_at: service.created_at,
            updated_at: service.updated_at
          }));
          
          setServices(mappedServices);
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
      // Using typecast as any for the update to avoid TypeScript errors
      const { error } = await supabase
        .from('users')
        .update({ profile_views: newCount } as any)
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

export default useArtistProfileData;
