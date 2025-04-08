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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, Upload, Calendar } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const genderOptions = [
  "Female",
  "Male",
  "Non-binary",
  "Prefer not to say",
  "Other"
];

const serviceOptions = [
  "Nail Art",
  "Hair Styling",
  "Makeup",
  "Tattoo",
  "Eyelash Extensions",
  "Brows",
  "Barber",
  "Massage",
  "Facials",
  "Other"
];

const CustomerSetup = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState<string>("");
  const [zipCode, setZipCode] = useState("");
  const [birthday, setBirthday] = useState("");
  const [favoritePlace, setFavoritePlace] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  
  useEffect(() => {
    if (!user) {
      navigate('/auth/signin');
    }
  }, [user, navigate]);

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

  const toggleService = (service: string) => {
    setSelectedServices(current =>
      current.includes(service)
        ? current.filter(s => s !== service)
        : [...current, service]
    );
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
      let avatarUrl = null;
      
      // Upload avatar if selected
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
          
          avatarUrl = publicUrl;
        }
      }
      
      // Update user profile
      const { error } = await supabase
        .from('users')
        .update({
          full_name: fullName,
          gender_identity: gender,
          zip_code: zipCode,
          birthday,
          favorite_place: favoritePlace,
          interested_services: selectedServices,
          avatar_url: avatarUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
      toast.success("Profile setup complete!");
      navigate('/dashboard/customer');
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
            <CardTitle className="text-3xl font-serif">Complete Your Customer Profile</CardTitle>
            <CardDescription>
              Help us personalize your beauty experience
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {/* Profile Image Upload */}
              <div className="flex flex-col items-center space-y-4">
                <div className="h-24 w-24 rounded-full border-2 border-primary flex items-center justify-center overflow-hidden bg-muted">
                  {avatarPreview ? (
                    <img 
                      src={avatarPreview} 
                      alt="Profile preview" 
                      className="h-full w-full object-cover" 
                    />
                  ) : (
                    <Upload className="h-8 w-8 text-muted-foreground" />
                  )}
                </div>
                
                <div>
                  <Input
                    id="avatar"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <Label 
                    htmlFor="avatar" 
                    className="cursor-pointer bg-secondary hover:bg-secondary/80 text-secondary-foreground px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Upload Profile Photo
                  </Label>
                </div>
              </div>
              
              {/* Basic Info */}
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input 
                    id="fullName" 
                    placeholder="Your name" 
                    value={fullName} 
                    onChange={(e) => setFullName(e.target.value)} 
                    required 
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="gender">Gender Identity (optional)</Label>
                  <Select 
                    value={gender} 
                    onValueChange={setGender}
                  >
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select your gender identity" />
                    </SelectTrigger>
                    <SelectContent>
                      {genderOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="zipCode">Zip Code</Label>
                  <Input 
                    id="zipCode" 
                    placeholder="Your zip code" 
                    value={zipCode} 
                    onChange={(e) => setZipCode(e.target.value)} 
                    required 
                  />
                </div>
              </div>
              
              {/* Services */}
              <div className="space-y-3">
                <Label>Services You're Interested In</Label>
                <div className="grid grid-cols-2 gap-3">
                  {serviceOptions.map((service) => (
                    <div key={service} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`service-${service}`} 
                        checked={selectedServices.includes(service)}
                        onCheckedChange={() => toggleService(service)}
                      />
                      <Label 
                        htmlFor={`service-${service}`}
                        className="cursor-pointer text-sm"
                      >
                        {service}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Optional Info */}
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="birthday" className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" /> Birthday (optional)
                  </Label>
                  <Input 
                    id="birthday" 
                    type="date"
                    value={birthday} 
                    onChange={(e) => setBirthday(e.target.value)} 
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="favoritePlace">Favorite Artist/Salon (optional)</Label>
                  <Input 
                    id="favoritePlace" 
                    placeholder="Name of your favorite salon or artist" 
                    value={favoritePlace} 
                    onChange={(e) => setFavoritePlace(e.target.value)} 
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

export default CustomerSetup;
