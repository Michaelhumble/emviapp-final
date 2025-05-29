
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, User, MapPin } from 'lucide-react';
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const OtherProfileEditor = () => {
  const { user, userProfile, refreshUserProfile } = useAuth();
  const navigate = useNavigate();
  
  const [fullName, setFullName] = useState("");
  const [customRole, setCustomRole] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [contactLink, setContactLink] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Initialize form with user profile data
  useEffect(() => {
    if (userProfile) {
      setFullName(userProfile.full_name || "");
      setCustomRole(userProfile.custom_role || "");
      setLocation(userProfile.location || "");
      setBio(userProfile.bio || "");
      setContactLink(userProfile.contact_link || "");
      setAvatarUrl(userProfile.avatar_url);
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
        const fileName = `other-${user.id}-${Date.now()}.${fileExt}`;
        
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
      
      // Update user profile in database
      const { error } = await supabase
        .from('users')
        .update({
          full_name: fullName,
          custom_role: customRole,
          location,
          bio,
          contact_link: contactLink,
          avatar_url: updatedAvatarUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
      // Refresh the context with updated profile
      await refreshUserProfile();
      
      toast.success("Your profile has been updated.");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-serif">Edit Your Profile</CardTitle>
        <CardDescription>
          Update your profile information and preferences
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="flex flex-col items-center space-y-4">
              <h3 className="text-lg font-medium">Profile Photo</h3>
              
              <div className="h-40 w-40 rounded-full border-2 border-primary flex items-center justify-center bg-muted relative overflow-hidden">
                {avatarPreview || avatarUrl ? (
                  <img
                    src={avatarPreview || avatarUrl || ""}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-muted">
                    <User className="h-16 w-16 text-muted-foreground" />
                  </div>
                )}
                
                {isLoading && (
                  <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                )}
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <div>
                  <input
                    id="avatar"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    disabled={isLoading}
                  />
                  <Label
                    htmlFor="avatar"
                    className={`cursor-pointer bg-secondary hover:bg-secondary/80 text-secondary-foreground px-3 py-2 rounded-md text-sm font-medium inline-flex items-center ${
                      isLoading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                    {avatarUrl || avatarPreview ? "Change Photo" : "Upload Photo"}
                  </Label>
                </div>
                
                {(avatarUrl || avatarPreview) && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={removeAvatar}
                    disabled={isLoading}
                    className="text-destructive hover:text-destructive"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      <line x1="10" y1="11" x2="10" y2="17"></line>
                      <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                    Remove
                  </Button>
                )}
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2 space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Profile Information</h3>
              
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    placeholder="Your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="customRole">Your Role in Beauty Industry</Label>
                  <Input
                    id="customRole"
                    placeholder="e.g. Beauty School Instructor, Esthetician, etc."
                    value={customRole}
                    onChange={(e) => setCustomRole(e.target.value)}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="location" className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" /> Location
                  </Label>
                  <Input
                    id="location"
                    placeholder="City, State"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="bio">About You</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us about yourself and your role in the beauty industry"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={4}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="contactLink">Contact or Booking Link (Optional)</Label>
                  <Input
                    id="contactLink"
                    placeholder="Your website, booking page, or social media profile"
                    value={contactLink}
                    onChange={(e) => setContactLink(e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-8">
              <Button
                type="button" 
                onClick={handleSaveProfile}
                disabled={isLoading}
                className="min-w-[120px]"
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
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OtherProfileEditor;
