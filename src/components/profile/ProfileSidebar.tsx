
import React from 'react';
import { useAuth } from '@/context/auth';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Calendar, Star, Crown } from 'lucide-react';

const ProfileSidebar = () => {
  const { userProfile, user } = useAuth();

  if (!user) return null;

  const displayName = userProfile?.full_name || user.email || 'User';
  const initials = displayName.substring(0, 2).toUpperCase();
  const isPremium = userProfile?.is_premium || false;

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <Avatar className="h-20 w-20">
            <AvatarImage 
              src={userProfile?.avatar_url || userProfile?.profile_image} 
              alt={displayName} 
            />
            <AvatarFallback className="text-lg font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
        </div>
        <CardTitle className="flex items-center justify-center gap-2">
          {displayName}
          {isPremium && <Crown className="h-4 w-4 text-yellow-500" />}
        </CardTitle>
        {userProfile?.role && (
          <Badge variant="secondary" className="w-fit mx-auto">
            {userProfile.role}
          </Badge>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {userProfile?.bio && (
          <p className="text-sm text-muted-foreground text-center">
            {userProfile.bio}
          </p>
        )}
        
        {userProfile?.location && (
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{userProfile.location}</span>
          </div>
        )}
        
        {userProfile?.created_at && (
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>Joined {new Date(userProfile.created_at).getFullYear()}</span>
          </div>
        )}
        
        {userProfile?.profile_views && (
          <div className="flex items-center gap-2 text-sm">
            <Star className="h-4 w-4 text-muted-foreground" />
            <span>{userProfile.profile_views} profile views</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileSidebar;
