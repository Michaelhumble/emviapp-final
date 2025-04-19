
import React, { useState } from "react";
import { useAuth } from "@/context/auth";
import { useSalon } from "@/context/salon";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload } from "lucide-react";

const SalonSettings = () => {
  const { userProfile, updateProfile } = useAuth();
  const { currentSalon, updateSalon } = useSalon();
  
  const [formData, setFormData] = useState({
    salon_name: userProfile?.salon_name || currentSalon?.salon_name || "",
    bio: userProfile?.bio || currentSalon?.about || "",
    logo_url: userProfile?.avatar_url || currentSalon?.logo_url || "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Update profile in auth context
      await updateProfile({
        salon_name: formData.salon_name,
        bio: formData.bio,
        avatar_url: formData.logo_url
      });
      
      // If using the salon context
      if (currentSalon) {
        await updateSalon(currentSalon.id, {
          salon_name: formData.salon_name,
          about: formData.bio,
          logo_url: formData.logo_url
        });
      }
      
      toast.success("Salon profile updated successfully!");
    } catch (error) {
      console.error("Error updating salon profile:", error);
      toast.error("Failed to update salon profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <Avatar className="w-24 h-24">
                <AvatarImage src={formData.logo_url} alt="Salon Logo" />
                <AvatarFallback className="bg-emvi-accent/10 text-emvi-accent font-playfair">
                  {formData.salon_name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <Label htmlFor="logo_url" className="font-inter text-sm font-medium">
                  Logo URL
                </Label>
                <div className="flex mt-1">
                  <Input
                    id="logo_url"
                    name="logo_url"
                    value={formData.logo_url}
                    onChange={handleChange}
                    className="font-inter"
                    placeholder="https://example.com/your-logo.png"
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="ml-2" 
                    onClick={() => toast.info("Upload functionality coming soon!")}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Enter a URL to your salon logo
                </p>
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
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalonSettings;
