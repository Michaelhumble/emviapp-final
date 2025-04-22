
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Star, CheckCircle, MessageCircle, Clock, MapPin, Instagram, Globe, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { UserProfile, getLocationString } from "@/types/profile";

interface ArtistProfileDetailsProps {
  profile: UserProfile;
  onBookNow: () => void;
  rating?: number;
  reviewCount?: number;
}

const ArtistProfileDetails = ({ 
  profile, 
  onBookNow, 
  rating = 5.0, 
  reviewCount = 0 
}: ArtistProfileDetailsProps) => {
  const [showFullBio, setShowFullBio] = useState(false);
  
  const location = getLocationString(profile.location);
  
  // Extract initials for avatar fallback
  const getInitials = () => {
    if (!profile.full_name) return "A";
    return profile.full_name
      .split(" ")
      .map(name => name[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };
  
  // Truncate bio for initial display
  const maxBioLength = 300;
  const bioIsTruncated = profile.bio && profile.bio.length > maxBioLength;
  const truncatedBio = profile.bio && bioIsTruncated 
    ? profile.bio.substring(0, maxBioLength) + "..." 
    : profile.bio;
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0">
          <Avatar className="h-28 w-28 md:h-32 md:w-32 border-4 border-white shadow-md">
            <AvatarImage 
              src={profile.avatar_url} 
              alt={profile.full_name || "Artist"} 
            />
            <AvatarFallback className="text-2xl bg-primary/10 text-primary">
              {getInitials()}
            </AvatarFallback>
          </Avatar>
        </div>
        
        <div className="flex-1 space-y-4">
          <div>
            <h1 className="text-3xl font-serif font-medium">{profile.full_name}</h1>
            
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mt-1">
              <div className="flex items-center text-amber-500">
                <Star className="fill-current h-4 w-4" />
                <span className="ml-1 font-medium">{rating.toFixed(1)}</span>
                {reviewCount > 0 && (
                  <span className="text-muted-foreground text-sm ml-1">
                    ({reviewCount} {reviewCount === 1 ? "review" : "reviews"})
                  </span>
                )}
              </div>
              
              {profile.specialty && (
                <Badge variant="secondary" className="font-normal">
                  {profile.specialty}
                </Badge>
              )}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
            {profile.years_experience && (
              <div className="flex items-center">
                <Clock className="h-3.5 w-3.5 mr-1.5" />
                <span>{profile.years_experience} years experience</span>
              </div>
            )}
            
            {location && (
              <div className="flex items-center">
                <MapPin className="h-3.5 w-3.5 mr-1.5" />
                <span>{location}</span>
              </div>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100 px-2 py-1 flex items-center">
              <CheckCircle className="h-3 w-3 mr-1" /> 
              Verified Artist
            </Badge>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100 px-2 py-1 flex items-center">
              <MessageCircle className="h-3 w-3 mr-1" /> 
              Fast Response
            </Badge>
          </div>
          
          <div className="flex flex-wrap gap-3 pt-1">
            {profile.instagram && (
              <Link to={`https://instagram.com/${profile.instagram}`} target="_blank" rel="noopener">
                <Button variant="ghost" size="sm" className="h-9 text-pink-600 hover:text-pink-700 hover:bg-pink-50 px-3">
                  <Instagram className="h-4 w-4 mr-1.5" />
                  @{profile.instagram}
                </Button>
              </Link>
            )}
            
            {profile.website && (
              <Link 
                to={profile.website.startsWith('http') ? profile.website : `https://${profile.website}`} 
                target="_blank" 
                rel="noopener"
              >
                <Button variant="ghost" size="sm" className="h-9 text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-3">
                  <Globe className="h-4 w-4 mr-1.5" />
                  Website
                </Button>
              </Link>
            )}
            
            {profile.accepts_bookings && (
              <Button 
                size="sm" 
                className="h-9 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white md:hidden"
                onClick={onBookNow}
              >
                <Calendar className="h-4 w-4 mr-1.5" />
                Book Now
              </Button>
            )}
          </div>
        </div>
      </div>
      
      <Separator />
      
      {profile.bio && (
        <div className="space-y-3">
          <h2 className="text-xl font-serif font-medium">About Me</h2>
          <div className="text-muted-foreground">
            <p>{showFullBio ? profile.bio : truncatedBio}</p>
            {bioIsTruncated && (
              <Button 
                variant="link" 
                className="p-0 h-auto text-primary"
                onClick={() => setShowFullBio(!showFullBio)}
              >
                {showFullBio ? "Show less" : "Read more"}
              </Button>
            )}
          </div>
        </div>
      )}
      
      <Separator />
    </div>
  );
};

export default ArtistProfileDetails;
