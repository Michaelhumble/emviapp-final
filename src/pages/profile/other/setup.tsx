import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/context/auth';
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2, Upload, MapPin, Link } from "lucide-react";

const OtherRoleSetup = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [roleName, setRoleName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [location, setLocation] = useState("");
  const [contactLink, setContactLink] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  useEffect(() => {
    if (!user) {
      navigate('/auth/signin');
    }
  }, [user, navigate]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (!user) {
      toast.error("You must be logged in to complete your profile");
      setIsSubmitting(false);
      return;
    }
    
    try {
      let imageUrl = null;
      
      // Upload profile image if selected
      if (profileImage) {
        const fileExt = profileImage.name.split('.').pop();
        const fileName = `other-${user.id}-${Date.now()}.${fileExt}`;
        
        const { error: uploadError, data: uploadData } = await supabase.storage
          .from('avatars')
          .upload(fileName, profileImage);
        
        if (uploadError) throw uploadError;
        
        if (uploadData) {
          const { data: { publicUrl } } = supabase.storage
            .from('avatars')
            .getPublicUrl(fileName);
          
          imageUrl = publicUrl;
        }
      }
      
      // Update user profile
      const { error } = await supabase
        .from('users')
        .update({
          custom_role: roleName,
          specialty,
          location,
          contact_link: contactLink,
          avatar_url: imageUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
      toast.success("Profile setup complete!");
      navigate('/dashboard/customer'); // Default to customer dashboard for now
    } catch (error) {
      console.error("Error setting up profile:", error);
      toast.error("Failed to set up your profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-12 px-4">
      <div className="container max-w-2xl mx-auto">
        <Card className="border border-border/50 shadow-md bg-card/80 backdrop-blur-sm">
          <CardHeader className="text-center space-y-1">
            <CardTitle className="text-3xl font-serif">Complete Your Profile</CardTitle>
            <CardDescription>
              Tell us more about your role in the beauty industry
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {/* Profile Image Upload */}
              <div className="flex flex-col items-center space-y-4">
                <div className="h-24 w-24 rounded-full border-2 border-primary flex items-center justify-center overflow-hidden bg-muted">
                  {imagePreview ? (
                    <img 
                      src={imagePreview} 
                      alt="Profile preview" 
                      className="h-full w-full object-cover" 
                    />
                  ) : (
                    <Upload className="h-8 w-8 text-muted-foreground" />
                  )}
                </div>
                
                <div>
                  <Input
                    id="profileImage"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <Label 
                    htmlFor="profileImage" 
                    className="cursor-pointer bg-secondary hover:bg-secondary/80 text-secondary-foreground px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Upload Profile Image
                  </Label>
                </div>
              </div>
              
              {/* Basic Info */}
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="roleName">Your Role in the Beauty Industry</Label>
                  <Textarea 
                    id="roleName" 
                    placeholder="Example: Beauty School Instructor, Esthetician, Beauty Influencer, etc." 
                    value={roleName} 
                    onChange={(e) => setRoleName(e.target.value)} 
                    required 
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="specialty">Your Specialty</Label>
                  <Input 
                    id="specialty" 
                    placeholder="What's your main focus or skill set?" 
                    value={specialty} 
                    onChange={(e) => setSpecialty(e.target.value)} 
                    required 
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="location" className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" /> Location
                  </Label>
                  <Input 
                    id="location" 
                    placeholder="City, State" 
                    value={location} 
                    onChange={(e) => setLocation(e.target.value)} 
                    required 
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="contactLink" className="flex items-center">
                    <Link className="h-4 w-4 mr-2" /> Contact or Booking Link
                  </Label>
                  <Input 
                    id="contactLink" 
                    placeholder="Website, booking page, or social media profile" 
                    value={contactLink} 
                    onChange={(e) => setContactLink(e.target.value)} 
                  />
                </div>
              </div>
            </CardContent>
            
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting}
                size="lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Saving Profile...
                  </>
                ) : (
                  "Complete Setup & Continue"
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default OtherRoleSetup;
