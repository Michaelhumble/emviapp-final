
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AtSign, Calendar, Globe, Instagram, Mail, MapPin, Phone, User } from "lucide-react";
import { UserProfile, getLocationString } from "@/types/profile";
import ImageWithFallback from "@/components/ui/ImageWithFallback";

interface ProfileHeaderProps {
  profile: UserProfile;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profile }) => {
  const locationString = getLocationString(profile.location);

  const getProfileTitle = () => {
    if (profile.role === 'artist' || profile.role === 'nail technician/artist') {
      return profile.specialty || 'Beauty Artist';
    } else if (profile.role === 'salon' || profile.role === 'owner') {
      return profile.salon_name || 'Salon Owner';
    } else if (profile.role === 'vendor' || profile.role === 'supplier' || profile.role === 'beauty supplier') {
      return profile.company_name || 'Beauty Supplier';
    } else if (profile.role === 'freelancer') {
      return profile.specialty || 'Freelancer';
    }
    return '';
  };
  
  const getProfileType = () => {
    switch (profile.role) {
      case 'artist':
      case 'nail technician/artist':
        return 'Artist';
      case 'salon':
      case 'owner':
        return 'Salon';
      case 'vendor':
      case 'supplier':
      case 'beauty supplier':
        return 'Supplier';
      case 'freelancer':
        return 'Freelancer';
      default:
        return 'Member';
    }
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 rounded-full overflow-hidden mb-4 bg-gray-100">
            {profile.avatar_url ? (
              <ImageWithFallback 
                src={profile.avatar_url} 
                alt={profile.full_name} 
                className="w-full h-full object-cover"
                fallbackImage="https://emvi.app/images/fallback-profile.jpg"
              />
            ) : (
              <User className="w-full h-full p-8 text-gray-300" />
            )}
          </div>
          
          <Badge className="mb-2">{getProfileType()}</Badge>
          <h1 className="text-2xl font-bold text-center">{profile.full_name}</h1>
          <p className="text-muted-foreground text-center">{getProfileTitle()}</p>
        </div>
      </CardHeader>
      
      <CardContent>
        <Separator className="my-4" />
        
        <div className="space-y-3">
          {locationString && (
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-gray-400" />
              <span className="text-sm">{locationString}</span>
            </div>
          )}
          
          {profile.phone && (
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2 text-gray-400" />
              <span className="text-sm">{profile.phone}</span>
            </div>
          )}
          
          {profile.email && (
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2 text-gray-400" />
              <span className="text-sm">{profile.email}</span>
            </div>
          )}
          
          {profile.website && (
            <div className="flex items-center">
              <Globe className="h-4 w-4 mr-2 text-gray-400" />
              <a href={profile.website.startsWith('http') ? profile.website : `https://${profile.website}`} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-sm text-blue-600 hover:underline truncate">
                {profile.website}
              </a>
            </div>
          )}
          
          {profile.instagram && (
            <div className="flex items-center">
              <Instagram className="h-4 w-4 mr-2 text-gray-400" />
              <a href={`https://instagram.com/${profile.instagram.replace('@', '')}`} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-sm text-blue-600 hover:underline">
                @{profile.instagram.replace('@', '')}
              </a>
            </div>
          )}
          
          {profile.created_at && (
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-gray-400" />
              <span className="text-sm">Joined {new Date(profile.created_at).toLocaleDateString()}</span>
            </div>
          )}
        </div>
        
        <Separator className="my-4" />
        
        <div className="flex justify-center pt-2">
          <Button variant="default" className="w-full">
            Contact
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileHeader;
