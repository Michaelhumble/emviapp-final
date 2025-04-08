
import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Upload } from "lucide-react";

const SalonProfileForm = () => {
  const { user, userProfile, refreshUserProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "", // This will be used as the business name
    salon_name: "",
    location: "",
    bio: "", // This will be used as the description/about
    specialty: "", // This will be used for services offered
    instagram: "",
    website: "",
    avatar_url: "" // This will be used as the logo/cover
  });
  
  // Load initial data
  useEffect(() => {
    if (userProfile) {
      setFormData({
        full_name: userProfile.full_name || "",
        salon_name: userProfile.salon_name || "",
        location: userProfile.location || "",
        bio: userProfile.bio || "",
        specialty: userProfile.specialty || "",
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
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setLoading(true);
    
    try {
      const { error } = await supabase
        .from('users')
        .update({
          full_name: formData.full_name,
          salon_name: formData.salon_name,
          location: formData.location,
          bio: formData.bio,
          specialty: formData.specialty, // Services offered
          instagram: formData.instagram,
          website: formData.website,
          avatar_url: formData.avatar_url,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
      await refreshUserProfile();
      toast.success("Your business profile has been updated.");
    } catch (error) {
      console.error('Error updating business profile:', error);
      toast.error("Failed to update business profile. Please try again.");
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
      
      // Update the form data with the new image URL
      setFormData(prev => ({ ...prev, avatar_url: data.publicUrl }));
      toast.success("Business image uploaded successfully.");
    } catch (error) {
      console.error('Error uploading business image:', error);
      toast.error("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Business Profile Information</h2>
      
      {/* Business Logo/Cover Upload */}
      <div className="mb-6">
        <Label htmlFor="avatar">Business Logo</Label>
        <div className="flex items-center gap-4 mt-2">
          {formData.avatar_url && (
            <div className="relative w-32 h-24 rounded-md overflow-hidden border">
              <img 
                src={formData.avatar_url} 
                alt="Business Logo" 
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
                  {formData.avatar_url ? "Change Logo" : "Upload Logo"}
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
              Recommended: Logo or storefront image
            </p>
          </div>
        </div>
      </div>
      
      {/* Business Name */}
      <div>
        <Label htmlFor="full_name">Business Name</Label>
        <Input
          id="full_name"
          name="full_name"
          value={formData.full_name}
          onChange={handleChange}
          placeholder="Your business name"
          className="mt-1"
          required
        />
      </div>
      
      {/* Salon Name (if different) */}
      <div>
        <Label htmlFor="salon_name">Salon Name (if different)</Label>
        <Input
          id="salon_name"
          name="salon_name"
          value={formData.salon_name || ""}
          onChange={handleChange}
          placeholder="If different from business name"
          className="mt-1"
        />
      </div>
      
      {/* Location */}
      <div>
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          name="location"
          value={formData.location || ""}
          onChange={handleChange}
          placeholder="Business address or area"
          className="mt-1"
        />
      </div>
      
      {/* Services Offered */}
      <div>
        <Label htmlFor="specialty">Services Offered</Label>
        <Input
          id="specialty"
          name="specialty"
          value={formData.specialty || ""}
          onChange={handleChange}
          placeholder="e.g., Full Service Salon, Nail Salon, Barbershop"
          className="mt-1"
        />
      </div>
      
      {/* Description / About */}
      <div>
        <Label htmlFor="bio">About Your Business</Label>
        <Textarea
          id="bio"
          name="bio"
          value={formData.bio || ""}
          onChange={handleChange}
          placeholder="Tell customers about your business and services..."
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
          placeholder="@yourbusiness"
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
          placeholder="https://yourbusiness.com"
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
          "Save Business Profile"
        )}
      </Button>
    </form>
  );
};

export default SalonProfileForm;
