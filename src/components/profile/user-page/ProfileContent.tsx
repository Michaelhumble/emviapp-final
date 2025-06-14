
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserProfile } from "@/types/profile";

interface ProfileContentProps {
  profile: UserProfile;
}

const ProfileContent: React.FC<ProfileContentProps> = ({ profile }) => {
  const isArtist = profile.role === 'nail-artist' || 
                   profile.role === 'hair-stylist' || 
                   profile.role === 'lash-tech' || 
                   profile.role === 'barber' || 
                   profile.role === 'esthetician' || 
                   profile.role === 'massage-therapist' || 
                   profile.role === 'freelancer';
  const isSalon = profile.role === 'salon' || profile.role === 'salon-owner' || profile.role === 'owner';
  
  return (
    <>
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">About</h2>
        </CardHeader>
        <CardContent>
          {profile.bio ? (
            <p className="text-gray-700 whitespace-pre-line">{profile.bio}</p>
          ) : (
            <p className="text-muted-foreground italic">No bio available</p>
          )}
        </CardContent>
      </Card>
      
      {isArtist && (
        <Card className="mt-6">
          <CardHeader>
            <h2 className="text-xl font-semibold">Portfolio</h2>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground italic">Portfolio section coming soon</p>
          </CardContent>
        </Card>
      )}
      
      {isSalon && (
        <Card className="mt-6">
          <CardHeader>
            <h2 className="text-xl font-semibold">Services</h2>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground italic">Services section coming soon</p>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default ProfileContent;
