
import React from "react";
import { getLocationString } from "@/types/profile";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Mail, Phone, MapPin, Instagram, Globe, Share2 } from "lucide-react";
import { toast } from "sonner";

interface ContactSectionProps {
  profile: any; // Using any to bypass TypeScript errors for now
  onBookingRequest: () => void;
}

const ContactSection: React.FC<ContactSectionProps> = ({ profile, onBookingRequest }) => {
  const handleEmailClick = () => {
    if (profile.email) {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const handlePhoneClick = () => {
    if (profile.phone) {
      window.location.href = `tel:${profile.phone}`;
    }
  };

  const handleInstagramClick = () => {
    if (profile.instagram) {
      window.open(`https://instagram.com/${profile.instagram.replace('@', '')}`, '_blank');
    }
  };

  const handleWebsiteClick = () => {
    if (profile.website) {
      const url = profile.website.startsWith('http') ? profile.website : `https://${profile.website}`;
      window.open(url, '_blank');
    }
  };

  const handleShareClick = () => {
    const url = window.location.href;
    
    if (navigator.share) {
      navigator.share({
        title: `${profile.full_name} - ${profile.specialty || 'Artist Profile'}`,
        text: `Check out ${profile.full_name}'s profile on EmviApp!`,
        url: url,
      }).catch(error => {
        console.log('Error sharing', error);
        copyToClipboard(url);
      });
    } else {
      copyToClipboard(url);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast.success("Profile link copied to clipboard!");
      },
      () => {
        toast.error("Failed to copy link");
      }
    );
  };

  // Get location string
  const locationString = getLocationString(profile.location);

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-serif font-semibold mb-4">Contact</h2>
      
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profile.accepts_bookings && (
              <Button 
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                onClick={onBookingRequest}
              >
                <Calendar className="mr-2 h-4 w-4" />
                Book Appointment
              </Button>
            )}
            
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={handleShareClick}
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share Profile
            </Button>
            
            {profile.instagram && (
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={handleInstagramClick}
              >
                <Instagram className="mr-2 h-4 w-4" />
                Instagram
              </Button>
            )}
            
            {profile.website && (
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={handleWebsiteClick}
              >
                <Globe className="mr-2 h-4 w-4" />
                Website
              </Button>
            )}
          </div>
          
          {locationString && (
            <div className="mt-6 flex items-start">
              <MapPin className="h-5 w-5 text-muted-foreground mt-0.5 mr-2" />
              <div>
                <h3 className="font-medium">Location</h3>
                <p className="text-muted-foreground">{locationString}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactSection;
