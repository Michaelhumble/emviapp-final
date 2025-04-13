import React from "react";
import { getLocationString } from "@/types/profile";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Eye } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ImageWithFallback from "@/components/ui/ImageWithFallback";

interface ProfileHeaderProps {
  profile: any; // Using any to bypass TypeScript errors for now
  isSalonOwner: boolean;
  handleBooking: () => void;
  viewCount: number | null;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ 
  profile, 
  isSalonOwner, 
  handleBooking,
  viewCount 
}) => {
  // Get location string
  const locationString = getLocationString(profile.location);

  // Get initials for avatar fallback
  const getInitials = () => {
    if (!profile.full_name) return 'A';
    return profile.full_name
      .split(' ')
      .map(name => name[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="mb-12">
      <div className="flex flex-col md:flex-row items-start gap-6">
        <div className="relative flex-shrink-0 overflow-hidden">
          <Avatar className="h-24 w-24 md:h-32 md:w-32 rounded-full border-4 border-white shadow-md">
            <AvatarImage 
              src={profile.avatar_url || undefined} 
              alt={profile.full_name || 'Artist'} 
              className="object-cover"
            />
            <AvatarFallback className="text-2xl bg-purple-100 text-purple-700">
              <ImageWithFallback
                src={profile.avatar_url || undefined}
                alt={profile.full_name || 'Artist'}
                className="h-full w-full object-cover"
                fallbackImage="https://emvi.app/images/fallback-profile.jpg"
              />
            </AvatarFallback>
          </Avatar>
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
              <Badge variant="secondary" className="font-normal">
                {profile.specialty}
              </Badge>
            )}
            
            {locationString && (
              <div className="flex items-center text-muted-foreground text-sm">
                <MapPin className="h-3.5 w-3.5 mr-1" />
                <span>{locationString}</span>
              </div>
            )}
            
            {(profile.years_experience) && (
              <div className="flex items-center text-muted-foreground text-sm">
                <Calendar className="h-3.5 w-3.5 mr-1" />
                <span>{profile.years_experience} years experience</span>
              </div>
            )}
            
            {viewCount !== null && (
              <div className="flex items-center text-muted-foreground text-sm">
                <Eye className="h-3.5 w-3.5 mr-1" />
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
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849-.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
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

export default ProfileHeader;
