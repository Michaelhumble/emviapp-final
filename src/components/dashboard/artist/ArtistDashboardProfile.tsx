
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Edit3, Instagram, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { getInitials } from "@/utils/userUtils";
import { UserProfile } from "@/context/auth/types";
import { calculateProfileCompletion } from "@/utils/supabase-helpers";
import { useAuth } from "@/context/auth";

interface ArtistDashboardProfileProps {
  artistProfile: UserProfile | null;
}

const ArtistDashboardProfile = ({ artistProfile }: ArtistDashboardProfileProps) => {
  const { userRole } = useAuth();
  const profileCompletionPercentage = calculateProfileCompletion(artistProfile, userRole);

  return (
    <section className="mb-8">
      <Card className="overflow-hidden border border-gray-100">
        <div className="h-32 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400"></div>
        <CardContent className="relative p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0 -mt-16">
              <Avatar className="h-24 w-24 border-4 border-white shadow-md">
                {artistProfile?.avatar_url ? (
                  <AvatarImage src={artistProfile.avatar_url} alt={artistProfile.full_name || "Artist"} />
                ) : (
                  <AvatarFallback className="text-2xl bg-purple-100 text-purple-600">
                    {getInitials(artistProfile?.full_name || "Nail Artist")}
                  </AvatarFallback>
                )}
              </Avatar>
            </div>
            
            <div className="flex-grow">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-serif font-semibold">
                    {artistProfile?.full_name || "Nail Artist"}
                  </h2>
                  <p className="text-gray-500 text-sm">
                    {artistProfile?.specialty || (
                      <span className="text-gray-400 italic">Add your specialty to complete your profile</span>
                    )}
                  </p>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  asChild
                  className="flex items-center gap-1"
                >
                  <Link to="/profile/edit">
                    <Edit3 className="h-3 w-3" /> Edit Profile
                  </Link>
                </Button>
              </div>
              
              <div className="mt-4">
                <p className="text-gray-700 text-sm">
                  {artistProfile?.bio || (
                    <span className="text-gray-400 italic">No bio added yet. Click Edit Profile to add one!</span>
                  )}
                </p>
                
                <div className="flex flex-wrap gap-3 mt-3">
                  {artistProfile?.instagram ? (
                    <a 
                      href={`https://instagram.com/${artistProfile.instagram.replace('@', '')}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-purple-600 hover:text-purple-800"
                    >
                      <Instagram className="h-4 w-4" />
                      @{artistProfile.instagram.replace('@', '')}
                    </a>
                  ) : (
                    <span className="flex items-center gap-1 text-sm text-gray-400 italic">
                      <Instagram className="h-4 w-4" />
                      Add Instagram profile
                    </span>
                  )}
                  
                  {artistProfile?.website ? (
                    <a 
                      href={artistProfile.website.startsWith('http') ? artistProfile.website : `https://${artistProfile.website}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-purple-600 hover:text-purple-800"
                    >
                      <Globe className="h-4 w-4" />
                      {artistProfile.website.replace(/^https?:\/\//, '')}
                    </a>
                  ) : (
                    <span className="flex items-center gap-1 text-sm text-gray-400 italic">
                      <Globe className="h-4 w-4" />
                      Add your website
                    </span>
                  )}
                </div>
              </div>
              
              <div className="mt-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Profile Completion</span>
                  <span className="text-sm text-gray-500">{profileCompletionPercentage}%</span>
                </div>
                <Progress value={profileCompletionPercentage} className="h-2" />
                
                {profileCompletionPercentage < 100 && (
                  <p className="text-xs text-gray-500 mt-1">
                    Complete your profile to attract more clients!
                  </p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default ArtistDashboardProfile;
