
import React from "react";
import { motion } from "framer-motion";
import { UserProfile } from "@/types/profile";
import { Separator } from "@/components/ui/separator";
import ProfileHeader from "@/components/artist-profile/ProfileHeader";
import ServicesSection from "@/components/artist-profile/ServicesSection";
import PortfolioGallery from "@/components/artist-profile/PortfolioGallery";
import ContactSection from "@/components/artist-profile/ContactSection";
import { PortfolioImage, Service } from "./types";

interface ArtistProfileContentProps {
  profile: UserProfile;
  portfolioImages: PortfolioImage[];
  services: Service[];
  viewCount: number | null;
  isSalonOwner: boolean;
}

const ArtistProfileContent: React.FC<ArtistProfileContentProps> = ({
  profile,
  portfolioImages,
  services,
  viewCount,
  isSalonOwner
}) => {
  const [showBookingModal, setShowBookingModal] = React.useState(false);

  const handleBooking = () => {
    setShowBookingModal(true);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="container max-w-5xl mx-auto py-8 px-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={item}>
        <ProfileHeader 
          profile={profile} 
          isSalonOwner={isSalonOwner} 
          handleBooking={handleBooking}
          viewCount={viewCount}
        />
      </motion.div>
      
      <Separator className="my-8" />
      
      {portfolioImages.length > 0 && (
        <motion.div variants={item} className="mb-12">
          <h2 className="text-2xl font-serif font-semibold mb-4">Portfolio</h2>
          <PortfolioGallery images={portfolioImages} artistName={profile.full_name} />
        </motion.div>
      )}
      
      {services.length > 0 && (
        <motion.div variants={item}>
          <ServicesSection services={services} />
        </motion.div>
      )}
      
      <Separator className="my-8" />
      
      <motion.div variants={item}>
        <ContactSection 
          profile={profile} 
          onBookingRequest={handleBooking} 
        />
      </motion.div>
      
      {/* Booking Modal - stub for now */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-6">
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
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ArtistProfileContent;
