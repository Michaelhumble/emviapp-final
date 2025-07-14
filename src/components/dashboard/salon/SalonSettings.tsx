
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/auth";
import { useSalon } from "@/context/salon";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const SalonSettings = () => {
  const { user, userProfile, updateProfile, refreshUserProfile } = useAuth();
  const { currentSalon, updateSalon } = useSalon();
  
  const [formData, setFormData] = useState({
    salon_name: userProfile?.salon_name || currentSalon?.salon_name || "",
    bio: userProfile?.bio || currentSalon?.about || "",
    logo_url: userProfile?.avatar_url || currentSalon?.logo_url || "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Update form when userProfile changes
  useEffect(() => {
    if (userProfile) {
      setFormData({
        salon_name: userProfile.salon_name || "",
        bio: userProfile.bio || "",
        logo_url: userProfile.avatar_url || "",
      });
    }
  }, [userProfile]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image file must be less than 5MB");
        return;
      }
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error("Please select a valid image file");
        return;
      }
      
      setLogoFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadLogo = async () => {
    if (!logoFile || !user) return formData.logo_url;
    
    setIsUploading(true);
    toast.success("Uploading salon logo...");
    
    try {
      const fileExt = logoFile.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      
      const { error: uploadError, data: uploadData } = await supabase.storage
        .from('salon-logos')
        .upload(fileName, logoFile, {
          cacheControl: '3600',
          upsert: false
        });
      
      if (uploadError) {
        throw new Error(`File upload failed: ${uploadError.message}`);
      }
      
      if (uploadData) {
        const { data: { publicUrl } } = supabase.storage
          .from('salon-logos')
          .getPublicUrl(fileName);
        
        setLogoFile(null);
        setLogoPreview(null);
        return publicUrl;
      }
      
      return formData.logo_url;
    } catch (error) {
      console.error('Logo upload error:', error);
      toast.error("Failed to upload logo. Please try again.");
      return formData.logo_url;
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Upload logo if a new file was selected
      const logoUrl = await uploadLogo();
      
      // Update profile in auth context
      await updateProfile({
        salon_name: formData.salon_name,
        bio: formData.bio,
        avatar_url: logoUrl
      });
      
      // Update user profile in database
      const { error } = await supabase
        .from('users')
        .update({
          salon_name: formData.salon_name,
          bio: formData.bio,
          avatar_url: logoUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', user?.id);
      
      if (error) {
        throw new Error(`Database update failed: ${error.message}`);
      }
      
      // If using the salon context
      if (currentSalon) {
        await updateSalon(currentSalon.id, {
          salon_name: formData.salon_name,
          about: formData.bio,
          logo_url: logoUrl
        });
      }
      
      // Refresh the user profile to get updated data
      await refreshUserProfile();
      
      // Update form data with new logo URL
      setFormData(prev => ({ ...prev, logo_url: logoUrl }));
      
      toast.success("Salon profile updated successfully!");
    } catch (error) {
      console.error("Error updating salon profile:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to update salon profile. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const displayLogo = logoPreview || formData.logo_url;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-playfair text-emvi-dark">Salon Settings</h1>
      
      <Card className="border-muted shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-playfair">Profile Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={displayLogo} alt="Salon Logo" />
                  <AvatarFallback className="bg-emvi-accent/10 text-emvi-accent font-playfair">
                    {formData.salon_name.charAt(0) || 'S'}
                  </AvatarFallback>
                </Avatar>
                {(isUploading || isSubmitting) && (
                  <div className="absolute inset-0 bg-background/80 rounded-full flex items-center justify-center">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <Label className="font-inter text-sm font-medium">
                  Salon Logo
                </Label>
                <div className="flex mt-1">
                  <div className="flex-1">
                    <input
                      id="logo-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      disabled={isUploading || isSubmitting}
                    />
                    <Label
                      htmlFor="logo-upload"
                      className={`cursor-pointer bg-secondary hover:bg-secondary/80 text-secondary-foreground px-4 py-2 rounded-md text-sm font-medium inline-flex items-center ${
                        isUploading || isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      {logoFile ? "Change Image" : "Upload Image"}
                    </Label>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Upload a high-quality logo image for your salon (max 5MB)
                </p>
                {logoFile && (
                  <p className="text-xs text-green-600 mt-1">
                    Ready to upload: {logoFile.name}
                  </p>
                )}
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="salon_name" className="font-inter text-sm font-medium">
                  Salon Name
                </Label>
                <Input
                  id="salon_name"
                  name="salon_name"
                  value={formData.salon_name}
                  onChange={handleChange}
                  className="font-inter mt-1"
                  placeholder="Your Salon Name"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="bio" className="font-inter text-sm font-medium">
                  About Your Salon
                </Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="font-inter mt-1 h-32"
                  placeholder="Describe your salon, specialties, and what makes you unique..."
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-emvi-accent hover:bg-emvi-accent/90 mt-4 font-inter"
              disabled={isSubmitting || isUploading}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalonSettings;
