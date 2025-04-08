
import { Link } from "react-router-dom";
import { Edit, Calendar, MapPin, Phone, Mail, Instagram, Link as LinkIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserProfile as UserProfileType } from "@/types/profile";
import { formatDate, getRoleDisplay } from "./utils/profileHelpers";
import { getRoleTheme, getRoleBadgeStyle } from "./utils/themeHelpers";
import { useAuth } from "@/context/auth";
import ProfileAISupport from "./ProfileAISupport";

interface ProfileSidebarProps {
  userProfile: UserProfileType;
}

const ProfileSidebar = ({ userProfile }: ProfileSidebarProps) => {
  const { userRole } = useAuth();
  const theme = getRoleTheme(userRole);
  const badgeStyle = getRoleBadgeStyle(userRole);
  
  return (
    <div className="lg:col-span-1">
      <Card className={`sticky top-24 border-gray-100 shadow-sm overflow-hidden mb-6 ${theme.borderColor}`}>
        <div className={`bg-gradient-to-r ${theme.lightBg} pt-8 px-6 pb-6 relative`}>
          <div className="absolute top-4 right-4">
            <Link to="/profile/edit">
              <Button size="sm" variant="ghost" className={`h-8 w-8 p-0 ${theme.hoverColor}`}>
                <Edit className={`h-4 w-4 ${theme.iconColor}`} />
              </Button>
            </Link>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="h-24 w-24 rounded-full overflow-hidden border-4 border-white shadow-md bg-white mb-3">
              {userProfile.avatar_url ? (
                <img 
                  src={userProfile.avatar_url} 
                  alt={userProfile.full_name} 
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-gray-100 text-gray-400">
                  {userProfile.full_name?.charAt(0).toUpperCase() || "U"}
                </div>
              )}
            </div>
            
            <h2 className="text-xl font-serif font-medium text-center">{userProfile.full_name}</h2>
            
            <div className="mt-1 mb-2">
              <Badge variant="secondary" className={`font-normal ${badgeStyle}`}>
                {getRoleDisplay(userProfile.role)}
              </Badge>
            </div>
            
            {userProfile.specialty && (
              <p className={`text-sm ${theme.textColor} text-center`}>{userProfile.specialty}</p>
            )}
          </div>
        </div>
        
        <CardContent className="p-5">
          <div className="space-y-4">
            {userProfile.location && (
              <div className="flex items-center text-sm">
                <MapPin className={`h-4 w-4 ${theme.iconColor} mr-2`} />
                <span>{userProfile.location}</span>
              </div>
            )}
            
            {userProfile.email && (
              <div className="flex items-center text-sm">
                <Mail className={`h-4 w-4 ${theme.iconColor} mr-2`} />
                <span>{userProfile.email}</span>
              </div>
            )}
            
            {userProfile.phone && (
              <div className="flex items-center text-sm">
                <Phone className={`h-4 w-4 ${theme.iconColor} mr-2`} />
                <span>{userProfile.phone}</span>
              </div>
            )}
            
            {userProfile.instagram && (
              <div className="flex items-center text-sm">
                <Instagram className={`h-4 w-4 ${theme.iconColor} mr-2`} />
                <a 
                  href={`https://instagram.com/${userProfile.instagram.replace('@', '')}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  @{userProfile.instagram.replace('@', '')}
                </a>
              </div>
            )}
            
            {userProfile.website && (
              <div className="flex items-center text-sm">
                <LinkIcon className={`h-4 w-4 ${theme.iconColor} mr-2`} />
                <a 
                  href={userProfile.website.startsWith('http') ? userProfile.website : `https://${userProfile.website}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline truncate max-w-[200px]"
                >
                  {userProfile.website}
                </a>
              </div>
            )}
            
            {userProfile.created_at && (
              <div className="flex items-center text-sm">
                <Calendar className={`h-4 w-4 ${theme.iconColor} mr-2`} />
                <span>Joined {formatDate(userProfile.created_at)}</span>
              </div>
            )}
          </div>
          
          <div className="mt-6">
            <Button className={`w-full ${theme.accentColor}`} asChild>
              <Link to="/profile/edit">Edit Profile</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <ProfileAISupport />
    </div>
  );
};

export default ProfileSidebar;
