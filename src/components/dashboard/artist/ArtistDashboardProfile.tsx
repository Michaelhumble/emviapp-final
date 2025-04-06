
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit3, Instagram, Globe, Loader } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { getInitials } from "@/utils/userUtils";
import { UserProfile } from "@/context/auth/types";
import { supabase } from "@/integrations/supabase/client";

interface ArtistDashboardProfileProps {
  artistProfile: UserProfile | null;
}

const ArtistDashboardProfile = ({ artistProfile }: ArtistDashboardProfileProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState(artistProfile?.bio || "");
  const [instagram, setInstagram] = useState(artistProfile?.instagram || "");
  const [website, setWebsite] = useState(artistProfile?.website || "");
  const [loading, setLoading] = useState(false);
  const [profileCompletionPercentage, setProfileCompletionPercentage] = useState(() => {
    if (artistProfile) {
      let completedFields = 0;
      let totalFields = 6; // Adjust based on your profile fields
      
      if (artistProfile.full_name) completedFields++;
      if (artistProfile.avatar_url) completedFields++;
      if (artistProfile.bio) completedFields++;
      if (artistProfile.instagram) completedFields++;
      if (artistProfile.website) completedFields++;
      if (artistProfile.location) completedFields++;
      
      return Math.round((completedFields / totalFields) * 100);
    }
    return 0;
  });
  
  // Save profile changes
  const handleSaveProfile = async () => {
    if (!artistProfile) return;
    
    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('users')
        .update({
          bio,
          instagram,
          website,
          updated_at: new Date().toISOString()
        })
        .eq('id', artistProfile.id);
      
      if (error) {
        console.error('Error updating profile:', error);
        toast.error('Failed to update profile');
      } else {
        setIsEditing(false);
        toast.success('Profile updated successfully!');
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

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
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center gap-1"
                  disabled={loading}
                >
                  {isEditing ? "Cancel" : <><Edit3 className="h-3 w-3" /> Edit Profile</>}
                </Button>
              </div>
              
              {isEditing ? (
                <div className="mt-4 space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                    <Input
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Tell us about yourself and your work..."
                      className="w-full"
                    />
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Instagram className="h-4 w-4 text-gray-400" />
                        </span>
                        <Input
                          value={instagram}
                          onChange={(e) => setInstagram(e.target.value)}
                          placeholder="Your Instagram handle"
                          className="pl-10"
                        />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Globe className="h-4 w-4 text-gray-400" />
                        </span>
                        <Input
                          value={website}
                          onChange={(e) => setWebsite(e.target.value)}
                          placeholder="Your website URL"
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      onClick={handleSaveProfile}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader className="h-4 w-4 animate-spin mr-2" />
                          Saving...
                        </>
                      ) : (
                        'Save Changes'
                      )}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="mt-4">
                  <p className="text-gray-700 text-sm">
                    {artistProfile?.bio || bio || (
                      <span className="text-gray-400 italic">No bio added yet. Click Edit Profile to add one!</span>
                    )}
                  </p>
                  
                  <div className="flex flex-wrap gap-3 mt-3">
                    {(artistProfile?.instagram || instagram) ? (
                      <a 
                        href={`https://instagram.com/${(artistProfile?.instagram || instagram).replace('@', '')}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-purple-600 hover:text-purple-800"
                      >
                        <Instagram className="h-4 w-4" />
                        @{(artistProfile?.instagram || instagram).replace('@', '')}
                      </a>
                    ) : (
                      <span className="flex items-center gap-1 text-sm text-gray-400 italic">
                        <Instagram className="h-4 w-4" />
                        Add Instagram profile
                      </span>
                    )}
                    
                    {(artistProfile?.website || website) ? (
                      <a 
                        href={(artistProfile?.website || website).startsWith('http') ? (artistProfile?.website || website) : `https://${artistProfile?.website || website}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-purple-600 hover:text-purple-800"
                      >
                        <Globe className="h-4 w-4" />
                        {(artistProfile?.website || website).replace(/^https?:\/\//, '')}
                      </a>
                    ) : (
                      <span className="flex items-center gap-1 text-sm text-gray-400 italic">
                        <Globe className="h-4 w-4" />
                        Add your website
                      </span>
                    )}
                  </div>
                </div>
              )}
              
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
