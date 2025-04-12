
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Phone, Instagram, Link as LinkIcon, Contact2 } from "lucide-react";
import { formatUserRole } from "@/utils/userUtils";
import { UserProfile, getLocationString } from "@/types/profile";
import ProfilePublicPreview from "./ProfilePublicPreview";

interface ProfileSidebarProps {
  userProfile: UserProfile;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ userProfile }) => {
  const {
    full_name,
    avatar_url,
    username,
    role,
    created_at,
    phone,
    instagram,
    website,
    bio,
    contact_link
  } = userProfile;
  
  // Get location as string
  const locationString = getLocationString(userProfile.location);
  
  const formatDate = (timestamp: string | number) => {
    if (!timestamp) return 'Not available';
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      <ProfilePublicPreview />
      
      <Card className="border border-gray-100 shadow-sm">
        <CardContent className="flex flex-col items-center p-6">
          <Avatar className="h-24 w-24 rounded-full border-4 border-white shadow-md">
            <AvatarImage src={avatar_url} alt={full_name || "Avatar"} />
            <AvatarFallback>{full_name?.charAt(0).toUpperCase() || 'U'}</AvatarFallback>
          </Avatar>
          
          <div className="mt-4 text-center">
            <h2 className="text-lg font-semibold">{full_name || username}</h2>
            <p className="text-sm text-gray-500">{formatUserRole(role)}</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2 mt-3">
            {role && (
              <Badge variant="secondary" className="capitalize">{role}</Badge>
            )}
          </div>
          
          <div className="w-full mt-5 space-y-3">
            {bio && (
              <div className="text-sm text-gray-700 text-center line-clamp-3">
                {bio}
              </div>
            )}
            
            {locationString && (
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{locationString}</span>
              </div>
            )}
            
            {phone && (
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="h-4 w-4 mr-2" />
                <span>{phone}</span>
              </div>
            )}
            
            {instagram && (
              <div className="flex items-center text-sm text-gray-600">
                <Instagram className="h-4 w-4 mr-2" />
                <Link to={`https://instagram.com/${instagram}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {instagram}
                </Link>
              </div>
            )}
            
            {website && (
              <div className="flex items-center text-sm text-gray-600">
                <LinkIcon className="h-4 w-4 mr-2" />
                <Link to={website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Website
                </Link>
              </div>
            )}

            {contact_link && (
              <div className="flex items-center text-sm text-gray-600">
                <Contact2 className="h-4 w-4 mr-2" />
                <Link to={contact_link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Contact Me
                </Link>
              </div>
            )}
            
            {created_at && (
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Joined {formatDate(created_at)}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSidebar;
