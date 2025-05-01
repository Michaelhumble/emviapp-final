
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Instagram, Globe, CalendarDays, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { formatDistance } from 'date-fns';
import { UserProfile as ProfileType } from '@/types/profile';
import { formatLocation } from '@/utils/location';

interface UserProfileProps {
  profile?: ProfileType;
  showActions?: boolean;
  isCurrentUser?: boolean;
  showTabs?: boolean;
  onMessage?: () => void;
  onBook?: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({
  profile: externalProfile,
  showActions = true,
  isCurrentUser = false,
  showTabs = true,
  onMessage,
  onBook,
}) => {
  const { userProfile: authUserProfile } = useAuth();
  
  // Use the external profile if provided, otherwise use the auth user profile
  // Convert from auth UserProfile to ProfileType if needed
  const profile = externalProfile || convertToProfileType(authUserProfile);
  
  if (!profile) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p>Profile not available</p>
        </CardContent>
      </Card>
    );
  }

  // Extract profile information
  const {
    full_name,
    bio,
    avatar_url,
    specialty,
    location,
    instagram,
    website,
    created_at,
    role
  } = profile;
  
  const memberSince = created_at 
    ? formatDistance(new Date(created_at), new Date(), { addSuffix: true })
    : 'Recently joined';
  
  return (
    <Card className="overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 pt-6 pb-10 px-6 relative mb-16">
        <Avatar className="w-24 h-24 border-4 border-white absolute bottom-0 transform translate-y-1/2 left-6 shadow-md">
          <AvatarImage src={avatar_url} alt={full_name || 'User'} />
          <AvatarFallback className="text-lg bg-gradient-to-br from-indigo-300 to-purple-300">
            {full_name?.charAt(0) || '?'}
          </AvatarFallback>
        </Avatar>
      </div>
      
      <CardContent className="p-6 pt-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold">
                {full_name || 'Unnamed User'}
              </h2>
              
              {role && (
                <Badge variant="outline" className="text-xs capitalize">
                  {role}
                </Badge>
              )}
            </div>
            
            {specialty && (
              <p className="text-muted-foreground">{specialty}</p>
            )}
            
            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground mt-2">
              {location && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{typeof location === 'string' ? location : formatLocation(location)}</span>
                </div>
              )}
              
              {instagram && (
                <a 
                  href={`https://instagram.com/${instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="flex items-center gap-1 hover:text-foreground transition-colors"
                >
                  <Instagram className="h-4 w-4" />
                  <span>{instagram}</span>
                </a>
              )}
              
              {website && (
                <a 
                  href={website.startsWith('http') ? website : `https://${website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-foreground transition-colors"
                >
                  <Globe className="h-4 w-4" />
                  <span>Website</span>
                </a>
              )}
              
              <div className="flex items-center gap-1">
                <CalendarDays className="h-4 w-4" />
                <span>Member {memberSince}</span>
              </div>
            </div>
          </div>
          
          {showActions && (
            <div className="flex flex-wrap gap-2 self-start">
              {isCurrentUser ? (
                <Button variant="outline" asChild>
                  <Link to="/profile/edit">Edit Profile</Link>
                </Button>
              ) : (
                <>
                  {onMessage && (
                    <Button variant="outline" onClick={onMessage}>
                      <MessageCircle className="mr-1 h-4 w-4" />
                      Message
                    </Button>
                  )}
                  
                  {onBook && (
                    <Button onClick={onBook}>
                      Book Now
                    </Button>
                  )}
                </>
              )}
            </div>
          )}
        </div>
        
        {bio && (
          <div className="mt-6">
            <h3 className="text-sm font-medium mb-2">About</h3>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{bio}</p>
          </div>
        )}
        
        {showTabs && (
          <Tabs defaultValue="portfolio" className="mt-8">
            <TabsList className="mb-4">
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="portfolio">
              <p className="text-sm text-muted-foreground">Portfolio items will appear here.</p>
            </TabsContent>
            
            <TabsContent value="services">
              <p className="text-sm text-muted-foreground">Services will appear here.</p>
            </TabsContent>
            
            <TabsContent value="reviews">
              <p className="text-sm text-muted-foreground">Reviews will appear here.</p>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
};

// Helper function to convert from auth UserProfile to the ProfileType
function convertToProfileType(profile: any): ProfileType | null {
  if (!profile) return null;
  
  return {
    ...profile,
    // Ensure the communication_preferences is a string array
    communication_preferences: Array.isArray(profile.communication_preferences) 
      ? profile.communication_preferences
      : profile.communication_preferences 
        ? Object.keys(profile.communication_preferences).filter(key => profile.communication_preferences[key])
        : []
  };
}

export default UserProfile;
