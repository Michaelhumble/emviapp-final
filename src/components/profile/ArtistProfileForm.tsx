
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
import { Loader2, Upload } from "lucide-react";

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
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    specialty: "",
    location: "",
    bio: "",
    instagram: "",
    website: "",
    avatar_url: ""
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
        avatar_url: userProfile.avatar_url || ""
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
      const { error } = await supabase
        .from('users')
        .update({
          full_name: formData.full_name,
          specialty: formData.specialty,
          location: formData.location,
          bio: formData.bio,
          instagram: formData.instagram,
          website: formData.website,
          avatar_url: formData.avatar_url,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
      await refreshUserProfile();
      toast.success("Your profile has been updated.");
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0 || !user) return;
    
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const filePath = `${user.id}/${Math.random().toString(36).substring(2)}.${fileExt}`;
    
    setUploading(true);
    
    try {
      // Upload the file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);
        
      if (uploadError) throw uploadError;
      
      // Get the public URL for the uploaded file
      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
      
      // Update the form data with the new avatar URL
      setFormData(prev => ({ ...prev, avatar_url: data.publicUrl }));
      toast.success("Profile photo uploaded successfully.");
    } catch (error) {
      console.error('Error uploading profile photo:', error);
      toast.error("Failed to upload profile photo. Please try again.");
    } finally {
      setUploading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Artist Profile Information</h2>
      
      {/* Profile Photo Upload */}
      <div className="mb-6">
        <Label htmlFor="avatar">Profile Photo</Label>
        <div className="flex items-center gap-4 mt-2">
          {formData.avatar_url && (
            <div className="relative w-24 h-24 rounded-full overflow-hidden border">
              <img 
                src={formData.avatar_url} 
                alt="Profile" 
                className="object-cover w-full h-full"
              />
            </div>
          )}
          <div>
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById('avatar')?.click()}
              disabled={uploading}
              className="flex items-center gap-2"
            >
              {uploading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  {formData.avatar_url ? "Change Photo" : "Upload Photo"}
                </>
              )}
            </Button>
            <input
              id="avatar"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
              disabled={uploading}
            />
            <p className="text-xs text-gray-500 mt-1">
              Recommended: Square image, at least 300x300px
            </p>
          </div>
        </div>
      </div>
      
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
          value={formData.bio || ""}
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
          value={formData.instagram || ""}
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
          value={formData.website || ""}
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
  );
};

export default ArtistProfileForm;
