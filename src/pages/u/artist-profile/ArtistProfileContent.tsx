
import React from "react";
import { UserProfile } from "@/types/profile";
import ProfileHeader from "@/components/artist-profile/ProfileHeader";
import PortfolioGallery from "@/components/artist-profile/PortfolioGallery";
import ServicesSection from "@/components/artist-profile/ServicesSection";
import ContactSection from "@/components/artist-profile/ContactSection";
import BookingRequestSection from "@/components/artist-profile/BookingRequestSection";
import SuggestedArtists from "@/components/artists/SuggestedArtists";
import ReviewsSection from "@/components/reviews/ReviewsSection";
import { Service, PortfolioImage } from "./types";
import { motion } from "framer-motion";

interface ArtistProfileContentProps {
  profile: UserProfile;
  services: Service[];
  portfolioImages: PortfolioImage[];
  viewCount: number | null;
  isSalonOwner: boolean;
}

const ArtistProfileContent: React.FC<ArtistProfileContentProps> = ({ 
  profile, 
  services, 
  portfolioImages, 
  viewCount, 
  isSalonOwner 
}) => {
  const handleBooking = () => {
    if (profile?.booking_url) {
      window.open(profile.booking_url, '_blank');
    }
  };
  
  return (
    <div className="container mx-auto py-12 px-4">
      <motion.div 
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ProfileHeader 
          profile={profile} 
          isSalonOwner={isSalonOwner} 
          handleBooking={handleBooking}
          viewCount={viewCount} 
        />
        
        <PortfolioGallery images={portfolioImages} />
        <ServicesSection services={services} />
        
        {/* Add Reviews Section */}
        <ReviewsSection artistId={profile.id} />
        
        {/* Add Booking Request Section */}
        {profile.accepts_bookings && (
          <BookingRequestSection profile={profile} services={services} />
        )}
        
        <ContactSection profile={profile} isSalonOwner={isSalonOwner} />
        
        {/* Artist suggestions */}
        <div className="mt-12">
          <SuggestedArtists currentArtistId={profile.id} />
        </div>
      </motion.div>
    </div>
  );
};

export default ArtistProfileContent;
