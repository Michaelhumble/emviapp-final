
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Copy, Calendar, Share2 } from "lucide-react";
import ProfileHeader from "@/components/artist-profile/ProfileHeader";
import ServicesSection from "@/components/artist-profile/ServicesSection";
import PortfolioGallery from "@/components/artist-profile/PortfolioGallery";
import ContactSection from "@/components/artist-profile/ContactSection";
import { UserProfile } from "@/types/profile";
import { PortfolioImage, Service } from "./types"; // Using local types instead of a/artist-profile/types
import { useIsMobile } from "@/hooks/use-mobile";

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
  const [showBookingModal, setShowBookingModal] = useState(false);
  const isMobile = useIsMobile();

  const handleBooking = () => {
    setShowBookingModal(true);
  };

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(
      () => {
        toast.success("Profile link copied to clipboard!");
      },
      (err) => {
        console.error('Failed to copy link: ', err);
        toast.error("Failed to copy link");
      }
    );
  };

  const handleShare = async () => {
    const shareData = {
      title: `${profile.full_name} on EmviApp`,
      text: `Check out ${profile.full_name}'s profile on EmviApp`,
      url: window.location.href,
    };
    
    if (navigator.share && isMobile) {
      try {
        await navigator.share(shareData);
        toast.success("Thanks for sharing!");
      } catch (err) {
        console.log("Error sharing:", err);
        handleCopyLink();
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="container max-w-5xl mx-auto py-6 sm:py-8 px-4">
      <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-serif font-semibold">{profile.full_name}</h1>
        <div className="flex gap-2">
          {isMobile ? (
            <Button variant="outline" size="sm" onClick={handleShare} className="min-h-[40px]">
              <Share2 className="h-4 w-4 mr-2" /> Share
            </Button>
          ) : (
            <Button variant="outline" size="sm" onClick={handleCopyLink} className="min-h-[40px]">
              <Copy className="h-4 w-4 mr-2" /> Copy Link
            </Button>
          )}
        </div>
      </div>

      <div>
        <ProfileHeader 
          profile={profile} 
          isSalonOwner={isSalonOwner} 
          handleBooking={handleBooking}
          viewCount={viewCount}
        />
        
        <Separator className="my-6 sm:my-8" />
        
        {portfolioImages.length > 0 && (
          <div className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-serif font-semibold mb-4">Portfolio</h2>
            <PortfolioGallery images={portfolioImages} artistName={profile.full_name} />
          </div>
        )}
        
        {services.length > 0 && (
          <ServicesSection services={services} />
        )}
        
        <Separator className="my-6 sm:my-8" />
        
        <ContactSection 
          profile={profile} 
          onBookingRequest={handleBooking} 
        />
      </div>
      
      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Request Appointment</h2>
              <p className="mb-4">Booking functionality coming soon! For now, please contact the artist directly.</p>
              <div className="flex justify-end">
                <Button 
                  onClick={() => setShowBookingModal(false)}
                  className="px-4 py-2 bg-primary text-white rounded-md min-h-[44px]"
                >
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ArtistProfileContent;
