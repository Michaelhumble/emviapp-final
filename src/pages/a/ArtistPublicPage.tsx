
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { UserProfile } from "@/types/profile";
import Layout from "@/components/layout/Layout";
import { Separator } from "@/components/ui/separator";
import ProfileHeader from "@/components/artist-profile/ProfileHeader";
import ServicesSection from "@/components/artist-profile/ServicesSection";
import PortfolioGallery from "@/components/artist-profile/PortfolioGallery";
import ContactSection from "@/components/artist-profile/ContactSection";
import { Card, CardContent } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

// Types for portfolio images and services
interface PortfolioImage {
  id: string;
  url: string;
  name?: string;
}

interface Service {
  id: string;
  title: string;
  description: string | null;
  price: number;
  duration_minutes: number;
  is_visible: boolean;
}

const ArtistPublicPage = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [portfolioImages, setPortfolioImages] = useState<PortfolioImage[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewCount, setViewCount] = useState<number | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const fadeInAnimation = useScrollAnimation({
    animation: 'fade-in',
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });

  useEffect(() => {
    const fetchArtistProfile = async () => {
      try {
        setLoading(true);
        
        // First try to find by username
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
        
        // Ensure this is actually an artist
        if (userData.role !== 'artist' && userData.role !== 'nail technician/artist' && userData.role !== 'freelancer') {
          setError("This user is not an artist");
          setLoading(false);
          return;
        }
        
        setProfile(userData);
        
        // Increment view count
        if (userData.id) {
          const newCount = (userData.profile_views || 0) + 1;
          await supabase
            .from('users')
            .update({ profile_views: newCount })
            .eq('id', userData.id);
          setViewCount(newCount);
        }
        
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
    };
    
    fetchArtistProfile();
  }, [username]);

  const handleBooking = () => {
    setShowBookingModal(true);
  };
  
  if (loading) {
    return (
      <Layout>
        <div className="container max-w-5xl mx-auto py-8 px-4">
          <div className="animate-pulse space-y-8">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="rounded-full bg-gray-200 h-32 w-32"></div>
              <div className="flex-1 space-y-4">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
              </div>
            </div>
            <div className="h-40 bg-gray-200 rounded"></div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="aspect-square bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (error || !profile) {
    return (
      <Layout>
        <div className="container max-w-5xl mx-auto py-8 px-4">
          <Card className="text-center py-12">
            <CardContent>
              <h2 className="text-2xl font-semibold mb-2">Artist Not Found</h2>
              <p className="text-muted-foreground mb-6">
                The artist profile you're looking for doesn't exist or has been removed.
              </p>
              <button 
                onClick={() => navigate('/artists')}
                className="text-primary hover:underline"
              >
                Browse all artists
              </button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div 
        className="container max-w-5xl mx-auto py-8 px-4"
        ref={fadeInAnimation.ref as React.RefObject<HTMLDivElement>}
        style={fadeInAnimation.style}
        className={`container max-w-5xl mx-auto py-8 px-4 ${fadeInAnimation.isVisible ? fadeInAnimation.className : 'opacity-0'}`}
      >
        <ProfileHeader 
          profile={profile} 
          isSalonOwner={false} 
          handleBooking={handleBooking}
          viewCount={viewCount}
        />
        
        <Separator className="my-8" />
        
        {portfolioImages.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-serif font-semibold mb-4">Portfolio</h2>
            <PortfolioGallery images={portfolioImages} artistName={profile.full_name} />
          </div>
        )}
        
        {services.length > 0 && (
          <ServicesSection services={services} />
        )}
        
        <Separator className="my-8" />
        
        <ContactSection 
          profile={profile} 
          onBookingRequest={handleBooking} 
        />
        
        {/* Testimonials placeholder - can be expanded later */}
        {false && (
          <div className="mt-12">
            <h2 className="text-2xl font-serif font-semibold mb-4">Client Testimonials</h2>
            <Card className="bg-gray-50 p-8 text-center border-dashed">
              <p className="text-muted-foreground">Testimonials coming soon</p>
            </Card>
          </div>
        )}
      </div>
      
      {/* Booking Modal - stub for now */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Request Appointment</h2>
              <p className="mb-4">Booking functionality coming soon!</p>
              <div className="flex justify-end">
                <button 
                  onClick={() => setShowBookingModal(false)}
                  className="px-4 py-2 bg-primary text-white rounded-md"
                >
                  Close
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </Layout>
  );
};

export default ArtistPublicPage;
