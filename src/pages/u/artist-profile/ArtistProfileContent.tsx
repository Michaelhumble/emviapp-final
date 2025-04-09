
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

  // SEO-friendly location text
  const locationText = profile.location 
    ? `${profile.specialty || 'Beauty Professional'} in ${profile.location}`
    : profile.specialty || 'Beauty Professional';
  
  return (
    <main className="container mx-auto py-12 px-4">
      <motion.div 
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <header>
          <ProfileHeader 
            profile={profile} 
            isSalonOwner={isSalonOwner} 
            handleBooking={handleBooking}
            viewCount={viewCount} 
          />

          {/* Add SEO-friendly text */}
          <h1 className="sr-only">{profile.full_name} | {locationText}</h1>
          {profile.specialty && profile.location && (
            <p className="text-lg text-center text-gray-700 mt-4 mb-8">
              Top-rated {profile.specialty} in {profile.location}
            </p>
          )}
        </header>
        
        <section id="portfolio" aria-labelledby="portfolio-heading">
          <h2 id="portfolio-heading" className="text-2xl font-serif font-semibold mb-6">Portfolio</h2>
          <PortfolioGallery images={portfolioImages} artistName={profile.full_name} />
        </section>
        
        <section id="services" aria-labelledby="services-heading" className="mt-12">
          <h2 id="services-heading" className="text-2xl font-serif font-semibold mb-6">Services</h2>
          <ServicesSection services={services} />
        </section>
        
        <section id="reviews" aria-labelledby="reviews-heading" className="mt-12">
          <h2 id="reviews-heading" className="text-2xl font-serif font-semibold mb-6">Client Reviews</h2>
          <ReviewsSection artistId={profile.id} />
        </section>
        
        {profile.accepts_bookings && (
          <section id="booking" aria-labelledby="booking-heading" className="mt-12">
            <h2 id="booking-heading" className="text-2xl font-serif font-semibold mb-6">Book an Appointment</h2>
            <BookingRequestSection profile={profile} services={services} />
          </section>
        )}
        
        <section id="contact" aria-labelledby="contact-heading" className="mt-12">
          <h2 id="contact-heading" className="text-2xl font-serif font-semibold mb-6">Contact Information</h2>
          <ContactSection profile={profile} isSalonOwner={isSalonOwner} />
        </section>
        
        <section id="suggested-artists" aria-labelledby="suggested-heading" className="mt-16">
          <h2 id="suggested-heading" className="text-2xl font-serif font-semibold mb-6">Similar Artists You May Like</h2>
          <SuggestedArtists currentArtistId={profile.id} />
        </section>
      </motion.div>
    </main>
  );
};

export default ArtistProfileContent;
