
import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";
import ProfileHeader from "@/components/artist-profile/ProfileHeader";
import ServicesSection from "@/components/artist-profile/ServicesSection";
import PortfolioGallery from "@/components/artist-profile/PortfolioGallery";
import ContactSection from "@/components/artist-profile/ContactSection";
import { Card, CardContent } from "@/components/ui/card";
import { Service, PortfolioImage } from "./types";

interface ArtistProfileContentProps {
  profile: any; // Using any to bypass TypeScript errors for now
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
  const [showBookingModal, setShowBookingModal] = useState(false);

  const handleBooking = () => {
    setShowBookingModal(true);
  };

  return (
    <div className="container max-w-5xl mx-auto py-8 px-4">
      <div>
        <ProfileHeader 
          profile={profile} 
          isSalonOwner={isSalonOwner} 
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
      </div>
      
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
    </div>
  );
};

export default ArtistProfileContent;
