
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
import { Separator } from "@/components/ui/separator";

interface ArtistProfileContentProps {
  profile: UserProfile;
  services: Service[];
  portfolioImages: { id: string; url: string }[];
  viewCount?: number;
  isSalonOwner?: boolean;
}

// ProfileHeader component to display the artist's profile information
const ProfileHeader: React.FC<{ 
  profile: UserProfile; 
  isSalonOwner?: boolean; 
  handleBooking: () => void; 
  viewCount?: number;
}> = ({ profile, isSalonOwner, handleBooking, viewCount }) => {
  // Get location string
  const getLocationString = (location: any) => {
    if (!location) return '';
    if (typeof location === 'string') return location;
    return '';
  };

  const locationString = getLocationString(profile.location);

  return (
    <div className="mb-12">
      <div className="flex flex-col md:flex-row items-start gap-6">
        <div className="relative flex-shrink-0 overflow-hidden rounded-full h-24 w-24 md:h-32 md:w-32 border-4 border-white shadow-md">
          <img 
            src={profile.avatar_url || "https://emvi.app/images/fallback-profile.jpg"} 
            alt={profile.full_name || 'Artist'}
            className="h-full w-full object-cover"
          />
        </div>
        
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
            <h1 className="text-3xl font-serif font-semibold">{profile.full_name}</h1>
            
            <div className="flex flex-wrap gap-2">
              {profile.accepts_bookings && (
                <Button 
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  onClick={handleBooking}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Appointment
                </Button>
              )}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4">
            {profile.specialty && (
              <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded font-normal">
                {profile.specialty}
              </span>
            )}
            
            {locationString && (
              <div className="flex items-center text-muted-foreground text-sm">
                <MapPin className="h-3.5 w-3.5 mr-1" />
                <span>{locationString}</span>
              </div>
            )}
            
            {viewCount !== undefined && (
              <div className="flex items-center text-muted-foreground text-sm">
                <Clock className="h-3.5 w-3.5 mr-1" />
                <span>{viewCount} profile views</span>
              </div>
            )}
          </div>
          
          {profile.bio && (
            <p className="text-gray-700 max-w-3xl mb-4">
              {profile.bio}
            </p>
          )}
          
          <div className="flex flex-wrap gap-3">
            {profile.instagram && (
              <a 
                href={`https://instagram.com/${profile.instagram}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-sm text-purple-600 hover:text-purple-800 transition-colors"
              >
                <div className="bg-purple-50 p-1.5 rounded-full mr-2">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.583.07 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849-.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
                <span>@{profile.instagram}</span>
              </a>
            )}
            
            {profile.website && (
              <a 
                href={profile.website.startsWith('http') ? profile.website : `https://${profile.website}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
              >
                <div className="bg-blue-50 p-1.5 rounded-full mr-2">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </div>
                <span>Website</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// PortfolioGallery component to display the artist's portfolio
const PortfolioGallery: React.FC<{ 
  images: { id: string; url: string }[]; 
  artistName: string;
}> = ({ images, artistName }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {images.map((image) => (
        <div key={image.id} className="relative aspect-square overflow-hidden rounded-md">
          <img
            src={image.url}
            alt={`${artistName}'s work`}
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
        </div>
      ))}
    </div>
  );
};

// ServicesSection component to display the artist's services
const ServicesSection: React.FC<{ services: Service[] }> = ({ services }) => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-serif font-semibold mb-4">Services</h2>
      <div className="space-y-6">
        {services.map((service) => (
          <div key={service.id} className="bg-white p-4 rounded-lg border shadow-sm">
            <div className="flex justify-between mb-2">
              <h3 className="font-medium text-lg">{service.title}</h3>
              <span className="font-medium">${service.price}</span>
            </div>
            <p className="text-gray-600 mb-2">{service.description}</p>
            <div className="text-sm text-gray-500">{service.duration_minutes} minutes</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ContactSection component to display contact information
const ContactSection: React.FC<{
  profile: UserProfile;
  onBookingRequest: () => void;
}> = ({ profile, onBookingRequest }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-serif font-semibold mb-4">Contact</h2>
      
      <div className="flex flex-wrap gap-4">
        {profile.email && (
          <a 
            href={`mailto:${profile.email}`}
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
          >
            <Mail className="h-5 w-5" />
            <span>{profile.email}</span>
          </a>
        )}
        
        {profile.phone && (
          <a 
            href={`tel:${profile.phone}`}
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
          >
            <Phone className="h-5 w-5" />
            <span>{profile.phone}</span>
          </a>
        )}
        
        <Button 
          variant="outline" 
          onClick={onBookingRequest}
          className="gap-2"
        >
          <Send className="h-4 w-4" />
          <span>Send Message</span>
        </Button>
      </div>
    </div>
  );
};

// Phone icon component
const Phone = (props: any) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

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
