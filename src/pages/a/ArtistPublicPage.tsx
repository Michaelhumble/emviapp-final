
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { UserProfile } from "@/types/profile";
import Layout from "@/components/layout/Layout";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

// Import the new components
import ArtistProfileLoading from "./artist-profile/ArtistProfileLoading";
import ArtistProfileError from "./artist-profile/ArtistProfileError";
import ArtistProfileContent from "./artist-profile/ArtistProfileContent";
import { PortfolioImage, Service } from "./artist-profile/types";

const ArtistPublicPage = () => {
  const { username } = useParams<{ username: string }>();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [portfolioImages, setPortfolioImages] = useState<PortfolioImage[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewCount, setViewCount] = useState<number | null>(null);
  const [isSalonOwner] = useState(false);

  const fadeInAnimation = useScrollAnimation({
    animation: 'fade-in',
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });

  useEffect(() => {
    const fetchArtistProfile = async () => {
      try {
        setLoading(true);
        
        let { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('instagram', username)
          .single();
        
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
        
        if (userData.role !== 'artist' && userData.role !== 'nail technician/artist' && userData.role !== 'freelancer') {
          setError("This user is not an artist");
          setLoading(false);
          return;
        }
        
        // Convert database user to UserProfile type
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
          profile_views: userData.profile_views || 0,
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
          years_experience: userData.years_experience,
          created_at: userData.created_at,
          updated_at: userData.updated_at
        };
        
        setProfile(artistProfile);
        
        if (userData.id) {
          const newCount = (userData.profile_views || 0) + 1;
          await supabase
            .from('users')
            .update({ profile_views: newCount })
            .eq('id', userData.id);
          setViewCount(newCount);
        }
        
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
    };
    
    fetchArtistProfile();
  }, [username]);

  return (
    <Layout>
      <div 
        ref={fadeInAnimation.ref as React.RefObject<HTMLDivElement>}
        style={fadeInAnimation.style}
        className={fadeInAnimation.isVisible ? fadeInAnimation.className : 'opacity-0'}
      >
        {loading ? (
          <ArtistProfileLoading />
        ) : error || !profile ? (
          <ArtistProfileError errorMessage={error || "Artist not found"} />
        ) : (
          <ArtistProfileContent 
            profile={profile}
            portfolioImages={portfolioImages}
            services={services}
            viewCount={viewCount}
            isSalonOwner={isSalonOwner}
          />
        )}
      </div>
    </Layout>
  );
};

export default ArtistPublicPage;
