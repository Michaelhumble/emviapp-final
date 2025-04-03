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
import { Loader2, Upload, AtSign, Building, MapPin, DollarSign } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const specialties = [
  "Nail Technician",
  "Hair Stylist",
  "Makeup Artist",
  "Barber",
  "Lash Artist",
  "Tattoo Artist",
  "Massage Therapist",
  "Esthetician",
  "Other"
];

const BoothRenterSetup = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [fullName, setFullName] = useState("");
  const [specialty, setSpecialty] = useState<string>("");
  const [salonName, setSalonName] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [instagram, setInstagram] = useState("");
  const [rentalRate, setRentalRate] = useState("");
  const [isLookingForNewBooth, setIsLookingForNewBooth] = useState(false);
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
        const fileName = `renter-${user.id}-${Date.now()}.${fileExt}`;
        
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
          specialty,
          salon_name: salonName,
          location,
          bio,
          instagram,
          rental_rate: rentalRate,
          looking_for_booth: isLookingForNewBooth,
          avatar_url: avatarUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
      toast.success("Profile setup complete!");
      navigate('/dashboard/artist'); // Booth renters use the artist dashboard
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
            <CardTitle className="text-3xl font-serif">Complete Your Booth Renter Profile</CardTitle>
            <CardDescription>
              Help clients find you and potentially discover new booth opportunities
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
                    placeholder="Your professional name" 
                    value={fullName} 
                    onChange={(e) => setFullName(e.target.value)} 
                    required 
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="specialty">Specialty</Label>
                  <Select 
                    value={specialty} 
                    onValueChange={setSpecialty}
                    required
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
                  <Label htmlFor="salonName" className="flex items-center">
                    <Building className="h-4 w-4 mr-2" /> Current Salon Name
                  </Label>
                  <Input 
                    id="salonName" 
                    placeholder="Where you currently rent a booth" 
                    value={salonName} 
                    onChange={(e) => setSalonName(e.target.value)} 
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
                  <Label htmlFor="rentalRate" className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-2" /> Current Rental Rate (optional)
                  </Label>
                  <Input 
                    id="rentalRate" 
                    placeholder="Example: $200/week" 
                    value={rentalRate} 
                    onChange={(e) => setRentalRate(e.target.value)} 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="isLookingForNewBooth" className="cursor-pointer">
                    I'm looking for a new booth to rent
                  </Label>
                  <Switch
                    id="isLookingForNewBooth"
                    checked={isLookingForNewBooth}
                    onCheckedChange={setIsLookingForNewBooth}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea 
                    id="bio" 
                    placeholder="Tell clients about your experience, style, and specialties" 
                    value={bio} 
                    onChange={(e) => setBio(e.target.value)} 
                    rows={4}
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="instagram" className="flex items-center">
                    <AtSign className="h-4 w-4 mr-2" /> Instagram (optional)
                  </Label>
                  <Input
                    id="instagram"
                    placeholder="Instagram username (without @)"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
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

export default BoothRenterSetup;
