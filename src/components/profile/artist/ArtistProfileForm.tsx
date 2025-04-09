
import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useProfileCompletion } from "@/components/profile/hooks/useProfileCompletion";
import ArtistProfilePhotoUploader from "./ArtistProfilePhotoUploader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SPECIALTIES = [
  "Nail Technician",
  "Hair Stylist",
  "Makeup Artist",
  "Esthetician",
  "Tattoo Artist",
  "Microblading",
  "Barber",
  "Lash Tech",
  "Other"
];

const ArtistProfileForm = () => {
  const { user, userProfile, refreshUserProfile } = useAuth();
  const { markTaskComplete } = useProfileCompletion();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    specialty: "",
    location: "",
    bio: "",
    instagram: "",
    website: "",
  });
  
  // Load initial data
  useEffect(() => {
    if (userProfile) {
      setFormData({
        full_name: userProfile.full_name || "",
        specialty: userProfile.specialty || "",
        location: userProfile.location || "",
        bio: userProfile.bio || "",
        instagram: userProfile.instagram || "",
        website: userProfile.website || "",
      });
    }
  }, [userProfile]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSpecialtyChange = (value: string) => {
    setFormData(prev => ({ ...prev, specialty: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setLoading(true);
    
    try {
      // Generate referral code if none exists
      let referralCode = userProfile?.affiliate_code;
      if (!referralCode) {
        referralCode = `EMVI${Math.floor(1000 + Math.random() * 9000)}`;
      }
      
      const { error } = await supabase
        .from('users')
        .update({
          full_name: formData.full_name,
          specialty: formData.specialty,
          location: formData.location,
          bio: formData.bio,
          instagram: formData.instagram,
          website: formData.website,
          affiliate_code: referralCode,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
      // Mark tasks as complete
      if (formData.bio) markTaskComplete('bio');
      if (formData.specialty) markTaskComplete('specialty');
      if (formData.location) markTaskComplete('location');
      
      // Refresh user profile in context
      await refreshUserProfile();
      
      toast.success("Profile updated successfully!");
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="space-y-8">
      {/* Profile Photo Upload Card */}
      <Card className="shadow-sm overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50">
          <CardTitle className="text-lg font-medium">Profile Photo</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <ArtistProfilePhotoUploader />
        </CardContent>
      </Card>
      
      {/* Profile Information Card */}
      <Card className="shadow-sm overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50">
          <CardTitle className="text-lg font-medium">Profile Information</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <Label htmlFor="full_name">Full Name</Label>
              <Input
                id="full_name"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                placeholder="Your full name"
                className="mt-1"
                required
              />
            </div>
            
            {/* Specialty */}
            <div>
              <Label htmlFor="specialty">Specialty</Label>
              <Select
                value={formData.specialty}
                onValueChange={handleSpecialtyChange}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select your specialty" />
                </SelectTrigger>
                <SelectContent>
                  {SPECIALTIES.map((specialty) => (
                    <SelectItem key={specialty} value={specialty}>
                      {specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Location */}
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="City, State"
                className="mt-1"
              />
            </div>
            
            {/* Bio */}
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell clients about yourself and your work..."
                className="mt-1 h-24"
              />
            </div>
            
            {/* Social Media */}
            <div>
              <Label htmlFor="instagram">Instagram</Label>
              <Input
                id="instagram"
                name="instagram"
                value={formData.instagram}
                onChange={handleChange}
                placeholder="@yourusername"
                className="mt-1"
              />
            </div>
            
            {/* Website */}
            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://yourwebsite.com"
                className="mt-1"
              />
            </div>
            
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Profile"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ArtistProfileForm;
