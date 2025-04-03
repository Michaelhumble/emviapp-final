
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, AtSign, Globe, Upload, ImageOff } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
      toast.error("You must be logged in to update your profile");
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
      
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
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
          
          <TabsContent value="basic" className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input 
                  id="fullName" 
                  placeholder="Your professional name" 
                  value={fullName} 
                  onChange={(e) => setFullName(e.target.value)} 
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="specialty">Specialty</Label>
                <Select 
                  value={specialty} 
                  onValueChange={setSpecialty}
                >
                  <SelectTrigger id="specialty">
                    <SelectValue placeholder="Select your specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    {specialties.map((specialtyOption) => (
                      <SelectItem key={specialtyOption} value={specialtyOption}>
                        {specialtyOption}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="skillLevel">Experience Level</Label>
                <Select 
                  value={skillLevel} 
                  onValueChange={setSkillLevel}
                >
                  <SelectTrigger id="skillLevel">
                    <SelectValue placeholder="Select your experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    {skillLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input 
                  id="location" 
                  placeholder="City, State" 
                  value={location} 
                  onChange={(e) => setLocation(e.target.value)} 
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="details" className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea 
                  id="bio" 
                  placeholder="Tell clients about your experience, style, and specialties" 
                  value={bio} 
                  onChange={(e) => setBio(e.target.value)} 
                  rows={4}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="skills">Skills (comma separated)</Label>
                <Input
                  id="skills"
                  placeholder="Acrylic nails, Gel, Nail art, Pedicures"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="instagram">Instagram</Label>
                <div className="flex items-center">
                  <AtSign className="h-5 w-5 mr-2 text-muted-foreground" />
                  <Input
                    id="instagram"
                    placeholder="Username (without @)"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="website">Website or Portfolio</Label>
                <div className="flex items-center">
                  <Globe className="h-5 w-5 mr-2 text-muted-foreground" />
                  <Input
                    id="website"
                    placeholder="https://your-portfolio-site.com"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="photo" className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="h-40 w-40 rounded-full border-2 border-primary flex items-center justify-center overflow-hidden bg-muted">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Profile preview" className="h-full w-full object-cover" />
                ) : avatarUrl ? (
                  <img src={avatarUrl} alt="Profile" className="h-full w-full object-cover" />
                ) : (
                  <Upload className="h-12 w-12 text-muted-foreground" />
                )}
              </div>
              
              <div className="flex gap-4">
                <Input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Label 
                  htmlFor="avatar" 
                  className="cursor-pointer bg-secondary hover:bg-secondary/80 text-secondary-foreground px-4 py-2 rounded-md text-sm font-medium"
                >
                  {avatarUrl || avatarPreview ? "Change Photo" : "Upload Photo"}
                </Label>
                
                {(avatarUrl || avatarPreview) && (
                  <Button
                    type="button"
                    variant="outline"
                    className="text-destructive"
                    onClick={removeAvatar}
                  >
                    <ImageOff className="h-4 w-4 mr-2" />
                    Remove
                  </Button>
                )}
              </div>
            </div>
            
            <div className="bg-muted/50 p-4 rounded-md">
              <h4 className="text-sm font-medium mb-2">Photo Tips:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Use good lighting and a neutral background</li>
                <li>• Show your face clearly</li>
                <li>• Professional attire builds client trust</li>
                <li>• Square or portrait orientation works best</li>
              </ul>
            </div>
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
