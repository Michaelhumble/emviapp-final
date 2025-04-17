import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";
import ProfileHeader from "@/components/artist-profile/ProfileHeader";
import ServicesSection from "@/components/artist-profile/ServicesSection";
import PortfolioGallery from "@/components/artist-profile/PortfolioGallery";
import ContactSection from "@/components/artist-profile/ContactSection";
import { BookingDialog } from "@/components/booking/BookingDialog";
import { Service, PortfolioImage } from "./types";

interface ArtistProfileContentProps {
  profile: any;
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
  const [showBookingDialog, setShowBookingDialog] = useState(false);

  const handleBooking = () => {
    setShowBookingDialog(true);
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

        <BookingDialog
          isOpen={showBookingDialog}
          onOpenChange={setShowBookingDialog}
          profile={profile}
          services={services}
        />
        
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
    </div>
  );
};

export default ArtistProfileContent;
