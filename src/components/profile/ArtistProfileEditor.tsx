
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import ArtistBasicInfo from './artist/ArtistBasicInfo';
import ArtistProfessionalDetails from './artist/ArtistProfessionalDetails';
import ArtistProfilePhoto from './artist/ArtistProfilePhoto';

// List of specialties for artists to choose from
const specialties = [
  "Nail Technician",
  "Hair Stylist",
  "Makeup Artist",
  "Barber",
  "Lash Artist",
  "Tattoo Artist",
  "Massage Therapist",
  "Esthetician",
  "Permanent Makeup Artist",
  "Microblading Specialist",
  "Brow Artist",
  "Waxing Specialist",
  "Hair Colorist",
  "Extension Specialist",
  "Other"
];

// List of experience levels for artists
const skillLevels = [
  "Apprentice",
  "Junior",
  "Intermediate",
  "Senior",
  "Master"
];

const ArtistProfileEditor = () => {
  const { user, userProfile, refreshUserProfile } = useAuth();
  const navigate = useNavigate();
  
  const [fullName, setFullName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [skillLevel, setSkillLevel] = useState("");
  const [skills, setSkills] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [instagram, setInstagram] = useState("");
  const [website, setWebsite] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Initialize form with user profile data
  useEffect(() => {
    if (userProfile) {
      setFullName(userProfile.full_name || "");
      setSpecialty(userProfile.specialty || "");
      setSkillLevel(userProfile.skill_level || "");
      setLocation(userProfile.location || "");
      setBio(userProfile.bio || "");
      setInstagram(userProfile.instagram || "");
      setWebsite(userProfile.website || "");
      setAvatarUrl(userProfile.avatar_url);
      
      // Handle skills array if it exists
      if (userProfile.skills && Array.isArray(userProfile.skills)) {
        setSkills(userProfile.skills.join(", "));
      }
    }
  }, [userProfile]);
  
  if (!user) {
    navigate('/auth/signin');
    return null;
  }
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const removeAvatar = () => {
    setAvatarFile(null);
    setAvatarPreview(null);
    setAvatarUrl(null);
  };
  
  const handleSaveProfile = async () => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to update your profile",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      let updatedAvatarUrl = avatarUrl;
      
      // Handle avatar upload if a new file was selected
      if (avatarFile) {
        const fileExt = avatarFile.name.split('.').pop();
        const fileName = `${user.id}-${Date.now()}.${fileExt}`;
        
        const { error: uploadError, data: uploadData } = await supabase.storage
          .from('avatars')
          .upload(fileName, avatarFile);
        
        if (uploadError) throw uploadError;
        
        if (uploadData) {
          const { data: { publicUrl } } = supabase.storage
            .from('avatars')
            .getPublicUrl(fileName);
          
          updatedAvatarUrl = publicUrl;
        }
      }
      
      // Prepare the skills array from comma-separated string
      const skillsArray = skills.split(',').map(skill => skill.trim()).filter(skill => skill);
      
      // Update user profile in database
      const { error } = await supabase
        .from('users')
        .update({
          full_name: fullName,
          specialty,
          skill_level: skillLevel,
          location,
          bio,
          instagram,
          website,
          avatar_url: updatedAvatarUrl,
          skills: skillsArray,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
      // Refresh the context with updated profile
      await refreshUserProfile();
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully!",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-2xl font-serif">Edit Your Artist Profile</CardTitle>
        <CardDescription>
          Update your professional information to attract clients and opportunities
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="basic">
          <TabsList className="w-full mb-6">
            <TabsTrigger value="basic" className="flex-1">Basic Info</TabsTrigger>
            <TabsTrigger value="details" className="flex-1">Professional Details</TabsTrigger>
            <TabsTrigger value="photo" className="flex-1">Profile Photo</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic">
            <ArtistBasicInfo
              fullName={fullName}
              setFullName={setFullName}
              specialty={specialty}
              setSpecialty={setSpecialty}
              skillLevel={skillLevel}
              setSkillLevel={setSkillLevel}
              location={location}
              setLocation={setLocation}
              specialties={specialties}
              skillLevels={skillLevels}
            />
          </TabsContent>
          
          <TabsContent value="details">
            <ArtistProfessionalDetails
              bio={bio}
              setBio={setBio}
              skills={skills}
              setSkills={setSkills}
              instagram={instagram}
              setInstagram={setInstagram}
              website={website}
              setWebsite={setWebsite}
            />
          </TabsContent>
          
          <TabsContent value="photo" className="space-y-6">
            <ArtistProfilePhoto
              avatarUrl={avatarUrl}
              avatarPreview={avatarPreview}
              onFileChange={handleFileChange}
              onRemoveAvatar={removeAvatar}
              isLoading={isLoading}
            />
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end mt-6">
          <Button
            type="button" 
            onClick={handleSaveProfile}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Saving...
              </>
            ) : (
              "Save Profile"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArtistProfileEditor;
