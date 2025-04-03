
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, Upload } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const salonTypes = [
  "Nail Salon",
  "Hair Salon",
  "Barbershop",
  "Mixed Service Salon",
  "Spa",
  "Tattoo Shop",
  "Makeup Studio",
  "Lash & Brow Bar",
  "Other"
];

const artistNumbers = [
  "1-3",
  "4-6",
  "7-10",
  "11-15",
  "16-20",
  "21+"
];

const SalonOwnerSetup = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [salonName, setSalonName] = useState("");
  const [salonType, setSalonType] = useState<string>("");
  const [address, setAddress] = useState("");
  const [artistCount, setArtistCount] = useState<string>("");
  const [isHiring, setIsHiring] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (!user) {
      toast.error("You must be logged in to complete your profile");
      setIsSubmitting(false);
      return;
    }
    
    try {
      let logoUrl = null;
      
      // Upload logo if selected
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
          
          logoUrl = publicUrl;
        }
      }
      
      // Update user profile
      const { error } = await supabase
        .from('users')
        .update({
          salon_name: salonName,
          salon_type: salonType,
          business_address: address,
          artist_count: artistCount,
          is_hiring: isHiring,
          avatar_url: logoUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
      toast.success("Salon profile setup complete!");
      navigate('/dashboard/owner');
    } catch (error) {
      console.error("Error setting up profile:", error);
      toast.error("Failed to set up your salon profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-12 px-4">
      <div className="container max-w-2xl mx-auto">
        <Card className="border border-border/50 shadow-md bg-card/80 backdrop-blur-sm">
          <CardHeader className="text-center space-y-1">
            <CardTitle className="text-3xl font-serif">Complete Your Salon Profile</CardTitle>
            <CardDescription>
              Help professionals and customers discover your salon
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {/* Logo Upload */}
              <div className="flex flex-col items-center space-y-4">
                <div className="h-32 w-32 rounded-md border-2 border-primary flex items-center justify-center overflow-hidden bg-muted">
                  {logoPreview ? (
                    <img 
                      src={logoPreview} 
                      alt="Salon logo preview" 
                      className="h-full w-full object-cover" 
                    />
                  ) : (
                    <Upload className="h-10 w-10 text-muted-foreground" />
                  )}
                </div>
                
                <div>
                  <Input
                    id="logo"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <Label 
                    htmlFor="logo" 
                    className="cursor-pointer bg-secondary hover:bg-secondary/80 text-secondary-foreground px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Upload Salon Logo or Image
                  </Label>
                </div>
              </div>
              
              {/* Basic Info */}
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="salonName">Salon Name</Label>
                  <Input 
                    id="salonName" 
                    placeholder="Your salon name" 
                    value={salonName} 
                    onChange={(e) => setSalonName(e.target.value)} 
                    required 
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="salonType">Type of Salon</Label>
                  <Select 
                    value={salonType} 
                    onValueChange={setSalonType}
                    required
                  >
                    <SelectTrigger id="salonType">
                      <SelectValue placeholder="Select salon type" />
                    </SelectTrigger>
                    <SelectContent>
                      {salonTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="address">Business Address</Label>
                  <Input 
                    id="address" 
                    placeholder="Full street address" 
                    value={address} 
                    onChange={(e) => setAddress(e.target.value)} 
                    required 
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="artistCount">How many artists work at your salon?</Label>
                  <Select 
                    value={artistCount} 
                    onValueChange={setArtistCount}
                    required
                  >
                    <SelectTrigger id="artistCount">
                      <SelectValue placeholder="Number of artists" />
                    </SelectTrigger>
                    <SelectContent>
                      {artistNumbers.map((number) => (
                        <SelectItem key={number} value={number}>
                          {number}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="isHiring" className="cursor-pointer">
                    Are you currently hiring?
                  </Label>
                  <Switch
                    id="isHiring"
                    checked={isHiring}
                    onCheckedChange={setIsHiring}
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

export default SalonOwnerSetup;
