import React, { useState } from "react";
import { useArtistProfileValidation } from "@/hooks/useArtistProfileValidation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Upload } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import IndependentBanner from "./IndependentBanner";

const SPECIALTIES = [
  "Nail Technician",
  "Hair Stylist",
  "Makeup Artist",
  "Esthetician",
  "Tattoo Artist",
  "Barber",
  "Lash Tech",
  "Other"
];

export const ArtistProfileSetupForm = () => {
  const { userProfile } = useAuth();
  const { validateAndSave } = useArtistProfileValidation();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    full_name: userProfile?.full_name || "",
    specialty: userProfile?.specialty || "",
    location: userProfile?.location || "",
    bio: userProfile?.bio || "",
    instagram: userProfile?.instagram || "",
    website: userProfile?.website || "",
    avatar_url: userProfile?.avatar_url || "",
    independent: !!userProfile?.independent,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSpecialtyChange = (value: string) => {
    setFormData(prev => ({ ...prev, specialty: value }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files || !e.target.files[0]) return;
      
      const file = e.target.files[0];
      setUploading(true);
      
      const fileExt = file.name.split('.').pop();
      const filePath = `${userProfile?.id}/${Math.random()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);
        
      if (uploadError) throw uploadError;
      
      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);
        
      setFormData(prev => ({ ...prev, avatar_url: data.publicUrl }));
      
    } catch (error) {
      console.error('Error uploading photo:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleIndependentToggle = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, independent: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await validateAndSave(formData);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-4">
      {formData.independent && <IndependentBanner />}
      <div className="flex flex-col items-center space-y-4">
        <Avatar className="w-24 h-24 border-2">
          <AvatarImage src={formData.avatar_url} />
          <AvatarFallback>
            {formData.full_name?.charAt(0) || "?"}
          </AvatarFallback>
        </Avatar>
        
        <Button
          type="button"
          variant="outline"
          onClick={() => document.getElementById('avatar')?.click()}
          disabled={uploading}
          className="w-full sm:w-auto"
        >
          {uploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              {formData.avatar_url ? "Change Photo" : "Upload Photo"}
            </>
          )}
        </Button>
        <input
          id="avatar"
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>

      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="full_name">Full Name *</Label>
          <Input
            id="full_name"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            placeholder="Your professional name"
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="specialty">Specialty *</Label>
          <Select
            value={formData.specialty}
            onValueChange={handleSpecialtyChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select your specialty" />
            </SelectTrigger>
            <SelectContent>
              {SPECIALTIES.map(specialty => (
                <SelectItem key={specialty} value={specialty}>
                  {specialty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="location">Location *</Label>
          <Input
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="City, State"
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="bio">Bio *</Label>
          <Textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Tell clients about your experience and expertise..."
            className="min-h-[100px]"
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="instagram">Instagram (optional)</Label>
          <Input
            id="instagram"
            name="instagram"
            value={formData.instagram}
            onChange={handleChange}
            placeholder="@yourusername"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="website">Website (optional)</Label>
          <Input
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="https://yourportfolio.com"
            type="url"
          />
        </div>

        <div className="flex gap-2 items-center bg-vivid-purple/5 rounded-lg py-3 px-4 mt-2">
          <Switch
            id="independent"
            checked={formData.independent}
            onCheckedChange={handleIndependentToggle}
            className="data-[state=checked]:bg-vivid-purple"
          />
          <Label htmlFor="independent" className="flex-1 cursor-pointer">
            I work independently (booth renter or private studio)
          </Label>
        </div>
      </div>

      <div className="sticky bottom-0 left-0 right-0 py-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t sm:relative sm:border-0 sm:bg-transparent">
        <Button 
          type="submit" 
          disabled={loading} 
          className="w-full sm:w-auto"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Profile"
          )}
        </Button>
      </div>
    </form>
  );
};
