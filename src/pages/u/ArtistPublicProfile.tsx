
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/layout/Layout";
import { toast } from "sonner";
import { useAuth } from "@/context/auth";

import { UserProfile } from "@/types/profile";
import ProfileHeader from "@/components/artist-profile/ProfileHeader";
import PortfolioGallery from "@/components/artist-profile/PortfolioGallery";
import ServicesSection from "@/components/artist-profile/ServicesSection";
import ContactSection from "@/components/artist-profile/ContactSection";
import ProfileLoading from "@/components/artist-profile/ProfileLoading";
import ProfileNotFound from "@/components/artist-profile/ProfileNotFound";
import SuggestedArtists from "@/components/artists/SuggestedArtists";

interface Service {
  id: string;
  title: string;
  description: string | null;
  price: number;
  duration_minutes: number;
  is_visible: boolean;
}

interface PortfolioImage {
  id: string;
  url: string;
  name: string;
}

const ArtistPublicProfile = () => {
  const { username } = useParams<{ username: string }>();
  const location = useLocation();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [portfolioImages, setPortfolioImages] = useState<PortfolioImage[]>([]);
  const [viewCount, setViewCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, userRole } = useAuth();
  
  const isSalonOwner = userRole === 'salon' || userRole === 'owner';
  
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        
        let { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('id', username)
          .maybeSingle();
        
        if (userError || !userData) {
          const { data: nameData, error: nameError } = await supabase
            .from('users')
            .select('*')
            .ilike('full_name', `%${username}%`)
            .limit(1)
            .maybeSingle();
          
          if (nameError || !nameData) {
            setError("Artist profile not found");
            setLoading(false);
            return;
          }
          
          userData = nameData;
        }
        
        setProfile(userData as UserProfile);
        
        if (userData) {
          const { data: servicesData, error: servicesError } = await supabase
            .from("services")
            .select("*")
            .eq("user_id", userData.id)
            .eq("is_visible", true);
          
          if (servicesError) throw servicesError;
          setServices(servicesData as Service[] || []);
          
          if (userData.portfolio_urls && userData.portfolio_urls.length > 0) {
            const images = userData.portfolio_urls.map((url, index) => ({
              id: `portfolio-${index}`,
              url,
              name: `Portfolio Image ${index + 1}`
            }));
            setPortfolioImages(images);
          }
          
          // Track profile view if authenticated and not viewing own profile
          if (user && user.id !== userData.id) {
            // Store view information in activity_log instead of profile_views
            try {
              // Determine source page from referrer or path
              const sourcePage = location.state?.source || 
                            (location.pathname.includes('/explore') ? 'directory' :
                             location.pathname.includes('/search') ? 'search' : 'direct');
            
              // Create an activity log entry for the profile view
              await supabase
                .from('activity_log')
                .insert({
                  user_id: user.id,
                  activity_type: 'profile_view',
                  description: `Viewed ${userData.full_name}'s profile`,
                  metadata: {
                    artist_id: userData.id,
                    source_page: sourcePage,
                    viewer_role: userRole || 'unknown'
                  }
                });
            } catch (viewError) {
              // Silently handle errors
              console.log("Note: View may not be recorded", viewError);
            }
            
            // Get view count for display (only for artists and salon owners)
            if (isSalonOwner || userRole === 'artist') {
              try {
                // Count profile views from activity log in the last 30 days
                const { count } = await supabase
                  .from('activity_log')
                  .select('*', { count: 'exact', head: true })
                  .eq('activity_type', 'profile_view')
                  .contains('metadata', { artist_id: userData.id })
                  .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());
                  
                setViewCount(count);
              } catch (countError) {
                console.error("Error counting views:", countError);
              }
            }
          }
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setError("Failed to load artist profile");
        toast.error("Failed to load artist profile");
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfileData();
  }, [username, user, userRole, location, isSalonOwner]);
  
  const handleBooking = () => {
    if (profile?.booking_url) {
      window.open(profile.booking_url, '_blank');
    }
  };
  
  if (loading) {
    return (
      <Layout>
        <ProfileLoading />
      </Layout>
    );
  }
  
  if (error || !profile) {
    return (
      <Layout>
        <ProfileNotFound />
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <ProfileHeader 
            profile={profile} 
            isSalonOwner={isSalonOwner} 
            handleBooking={handleBooking}
            viewCount={viewCount} 
          />
          
          <PortfolioGallery images={portfolioImages} />
          <ServicesSection services={services} />
          <ContactSection profile={profile} isSalonOwner={isSalonOwner} />
          
          {/* Artist suggestions */}
          <div className="mt-12">
            <SuggestedArtists currentArtistId={profile.id} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ArtistPublicProfile;
