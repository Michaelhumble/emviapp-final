import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar, Clock, Mail, MapPin, Send } from "lucide-react";
import { format } from "date-fns";
import { UserProfile } from "@/types/profile";
import { Service } from "./types";
import { AvailabilityBookingForm } from "@/components/booking/AvailabilityBookingForm";
import { BookingDialog } from "@/components/booking/BookingDialog";

interface ArtistProfileContentProps {
  profile: UserProfile;
  services: Service[];
  portfolioImages: { id: string; url: string }[];
  viewCount?: number;
  isSalonOwner?: boolean;
}

const ArtistProfileContent: React.FC<ArtistProfileContentProps> = ({
  profile,
  services,
  portfolioImages,
  viewCount,
  isSalonOwner
}) => {
  const [activeTab, setActiveTab] = useState<string>("portfolio");
  const [openBookingDialog, setOpenBookingDialog] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const handleOpenBooking = (service?: Service | null) => {
    if (service) {
      setSelectedService(service);
    } else {
      setSelectedService(services[0] || null);
    }
    setOpenBookingDialog(true);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <ProfileHeader
            profile={profile}
            isSalonOwner={isSalonOwner}
            handleBooking={handleOpenBooking}
            viewCount={viewCount}
          />

          {profile.accepts_bookings && services.length > 0 && (
            <div className="mt-6 mb-8">
              <Button 
                onClick={() => handleOpenBooking()} 
                className="w-full sm:w-auto"
                size="lg"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Book with {profile.full_name}
              </Button>
              <p className="text-sm text-gray-500 mt-2">
                <Clock className="inline h-3 w-3 mr-1" />
                Usually responds within 24 hours
              </p>
            </div>
          )}
          
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
            onBookingRequest={handleOpenBooking} 
          />
        </div>
        
        <div className="md:col-span-1">
          <Card className="mb-6">
            <CardContent className="p-4">
              <h3 className="font-serif text-xl font-semibold mb-4">Services</h3>
              <div className="space-y-4">
                {services.length > 0 ? (
                  services.map((service) => (
                    <div key={service.id} className="border-b pb-3 last:border-0">
                      <div className="flex justify-between">
                        <h4 className="font-medium">{service.title}</h4>
                        <span className="font-medium">${service.price}</span>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">{service.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">
                          {service.duration_minutes} min
                        </span>
                        {profile.accepts_bookings && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleOpenBooking(service)}
                          >
                            Book
                          </Button>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 italic">No services listed</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <BookingDialog
        isOpen={openBookingDialog}
        onOpenChange={setOpenBookingDialog}
        profile={profile}
        services={services}
      />
    </div>
  );
};

export default ArtistProfileContent;
