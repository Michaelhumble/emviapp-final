
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, ExternalLink, BookOpen } from 'lucide-react';
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import ProAccessGate from "@/components/pro-access/ProAccessGate";
import { UserProfile } from "@/types/profile";

interface ProfileHeaderProps {
  profile: UserProfile;
  isSalonOwner: boolean;
  handleBooking: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ 
  profile, 
  isSalonOwner, 
  handleBooking 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <Avatar className="h-24 w-24 md:h-32 md:w-32">
          {profile.avatar_url ? (
            <AvatarImage src={profile.avatar_url} alt={profile.full_name || ""} />
          ) : (
            <AvatarFallback className="bg-purple-100 text-purple-800 text-xl">
              {profile.full_name?.charAt(0) || "A"}
            </AvatarFallback>
          )}
        </Avatar>
        
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-serif font-bold mb-2">{profile.full_name}</h1>
          <p className="text-purple-700 font-medium">{profile.specialty || "Nail Artist"}</p>
          {profile.location && (
            <p className="text-gray-500 mt-1">
              {isSalonOwner ? (
                <ProAccessGate blur={false}>
                  {profile.location}
                </ProAccessGate>
              ) : (
                profile.location
              )}
            </p>
          )}
          
          <div className="mt-6">
            {profile.accepts_bookings && profile.booking_url ? (
              isSalonOwner ? (
                <ProAccessGate>
                  <Button 
                    className="bg-purple-600 hover:bg-purple-700"
                    onClick={handleBooking}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Book Me
                    <ExternalLink className="ml-2 h-3.5 w-3.5" />
                  </Button>
                </ProAccessGate>
              ) : (
                <Button 
                  className="bg-purple-600 hover:bg-purple-700"
                  onClick={handleBooking}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Book Me
                  <ExternalLink className="ml-2 h-3.5 w-3.5" />
                </Button>
              )
            ) : (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <Button className="bg-purple-600 hover:bg-purple-700" disabled>
                        <BookOpen className="mr-2 h-4 w-4" />
                        Booking Coming Soon
                      </Button>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Online booking will be available soon!</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>
      </div>
      
      {profile.bio && (
        <div className="mt-8">
          <h2 className="text-lg font-medium mb-2">About Me</h2>
          <p className="text-gray-700 whitespace-pre-line">{profile.bio}</p>
        </div>
      )}
    </div>
  );
};

export default ProfileHeader;
