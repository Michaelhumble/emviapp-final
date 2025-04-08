
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Building, Globe, Instagram, MapPin, Phone } from 'lucide-react';
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const SalonProfileEditor = () => {
  const { user, userProfile, refreshUserProfile } = useAuth();
  const navigate = useNavigate();
  
  const [salonName, setSalonName] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");
  const [instagram, setInstagram] = useState("");
  const [website, setWebsite] = useState("");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Initialize form with user profile data
  useEffect(() => {
    if (userProfile) {
      setSalonName(userProfile.salon_name || "");
      setLocation(userProfile.location || "");
      setBio(userProfile.bio || "");
      setPhone(userProfile.phone || "");
      setInstagram(userProfile.instagram || "");
      setWebsite(userProfile.website || "");
      setLogoUrl(userProfile.avatar_url);
    }
  }, [userProfile]);
  
  if (!user) {
    navigate('/auth/signin');
    return null;
  }
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLogoFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const removeLogo = () => {
    setLogoFile(null);
    setLogoPreview(null);
    setLogoUrl(null);
  };
  
  const handleSaveProfile = async () => {
    if (!user) {
      toast.error("You must be logged in to update your salon profile");
      return;
    }
    
    setIsLoading(true);
    
    try {
      let updatedLogoUrl = logoUrl;
      
      // Handle logo upload if a new file was selected
      if (logoFile) {
        const fileExt = logoFile.name.split('.').pop();
        const fileName = `salon-${user.id}-${Date.now()}.${fileExt}`;
        
        const { error: uploadError, data: uploadData } = await supabase.storage
          .from('avatars')
          .upload(fileName, logoFile);
        
        if (uploadError) throw uploadError;
        
        if (uploadData) {
          const { data: { publicUrl } } = supabase.storage
            .from('avatars')
            .getPublicUrl(fileName);
          
          updatedLogoUrl = publicUrl;
        }
      }
      
      // Update user profile in database
      const { error } = await supabase
        .from('users')
        .update({
          salon_name: salonName,
          location,
          bio,
          phone,
          instagram,
          website,
          avatar_url: updatedLogoUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
      // Refresh the context with updated profile
      await refreshUserProfile();
      
      toast.success("Your profile has been updated.");
    } catch (error) {
      console.error("Error updating salon profile:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-serif">Edit Your Salon Profile</CardTitle>
        <CardDescription>
          Update your salon information to attract clients and professionals
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="info" className="w-full">
          <TabsList className="w-full mb-6">
            <TabsTrigger value="info" className="flex-1">Basic Info</TabsTrigger>
            <TabsTrigger value="details" className="flex-1">About & Contact</TabsTrigger>
            <TabsTrigger value="logo" className="flex-1">Logo</TabsTrigger>
          </TabsList>
          
          <TabsContent value="info" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Salon Information</h3>
              
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="salonName" className="flex items-center gap-1">
                    <Building className="h-4 w-4" /> Salon Name
                  </Label>
                  <Input
                    id="salonName"
                    placeholder="Your salon's name"
                    value={salonName}
                    onChange={(e) => setSalonName(e.target.value)}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="location" className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" /> Location
                  </Label>
                  <Input
                    id="location"
                    placeholder="Salon address or city/state"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="details" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">About & Contact Information</h3>
              
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="bio">About Your Salon</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell potential clients and professionals about your salon"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={4}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="phone" className="flex items-center gap-1">
                    <Phone className="h-4 w-4" /> Phone
                  </Label>
                  <Input
                    id="phone"
                    placeholder="Contact phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="instagram" className="flex items-center gap-1">
                    <Instagram className="h-4 w-4" /> Instagram
                  </Label>
                  <Input
                    id="instagram"
                    placeholder="Instagram username (without @)"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="website" className="flex items-center gap-1">
                    <Globe className="h-4 w-4" /> Website
                  </Label>
                  <Input
                    id="website"
                    placeholder="Your salon's website URL"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="logo" className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <h3 className="text-lg font-medium">Salon Logo or Image</h3>
              
              <div className="h-40 w-40 rounded-lg border-2 border-primary flex items-center justify-center bg-muted relative overflow-hidden">
                {logoPreview || logoUrl ? (
                  <img
                    src={logoPreview || logoUrl || ""}
                    alt="Salon logo"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-muted">
                    <Building className="h-12 w-12 text-muted-foreground" />
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
                    id="logo"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    disabled={isLoading}
                  />
                  <Label
                    htmlFor="logo"
                    className={`cursor-pointer bg-secondary hover:bg-secondary/80 text-secondary-foreground px-3 py-2 rounded-md text-sm font-medium inline-flex items-center ${
                      isLoading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                    {logoUrl || logoPreview ? "Change Image" : "Upload Image"}
                  </Label>
                </div>
                
                {(logoUrl || logoPreview) && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={removeLogo}
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
              
              <p className="text-sm text-muted-foreground text-center max-w-md">
                Upload a high-quality logo or image of your salon to make a great first impression with potential clients and professionals.
              </p>
            </div>
          </TabsContent>
        </Tabs>
        
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
      </CardContent>
    </Card>
  );
};

export default SalonProfileEditor;
