
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Eye } from "lucide-react";
import { UserProfile } from "@/types/profile";
import { getInitials } from "@/utils/userUtils";
import SupportArtistButton from "./SupportArtistButton";

interface ProfileHeaderProps {
  profile: UserProfile;
  isSalonOwner?: boolean;
  handleBooking: () => void;
  viewCount?: number | null;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ 
  profile, 
  isSalonOwner, 
  handleBooking,
  viewCount 
}) => {
  const isBoosted = profile.boosted_until && new Date(profile.boosted_until) > new Date();
  const canSeeViewCount = isSalonOwner || profile?.role === 'artist';
  
  return (
    <Card className="w-full mb-6 overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <Avatar className="h-24 w-24 md:h-32 md:w-32">
            <AvatarImage src={profile.avatar_url || ""} alt={profile.full_name || ""} />
            <AvatarFallback className="text-2xl">
              {getInitials(profile.full_name)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-2 mb-2">
              <h1 className="text-2xl font-bold">{profile.full_name}</h1>
              
              {isBoosted && (
                <Badge variant="secondary" className="bg-gradient-to-r from-amber-200 to-amber-100 text-amber-800">
                  Featured Artist
                </Badge>
              )}
            </div>
            
            {profile.specialty && (
              <p className="text-lg text-muted-foreground mb-2">{profile.specialty}</p>
            )}
            
            <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-4">
              {profile.location && (
                <div className="flex items-center text-muted-foreground text-sm">
                  <MapPin className="h-4 w-4 mr-1" />
                  {profile.location}
                </div>
              )}
              
              {profile.accepts_bookings && (
                <div className="flex items-center text-muted-foreground text-sm">
                  <Calendar className="h-4 w-4 mr-1" />
                  Available for Booking
                </div>
              )}
              
              {canSeeViewCount && viewCount !== null && (
                <div className="flex items-center text-muted-foreground text-sm">
                  <Eye className="h-4 w-4 mr-1" />
                  {viewCount} profile views this month
                </div>
              )}
            </div>
            
            {profile.bio && (
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">{profile.bio}</p>
            )}
            
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              {profile.accepts_bookings && (
                <Button onClick={handleBooking} className="bg-primary hover:bg-primary/90">
                  Book Appointment
                </Button>
              )}
              
              {profile.instagram && (
                <Button 
                  variant="outline" 
                  onClick={() => window.open(`https://instagram.com/${profile.instagram}`, '_blank')}
                >
                  View Instagram
                </Button>
              )}
              
              {/* Support Artist Button */}
              <SupportArtistButton 
                artistId={profile.id} 
                artistName={profile.full_name}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileHeader;
