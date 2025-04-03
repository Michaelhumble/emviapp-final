import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Upload, Instagram, Globe, Loader2, PlusCircle, X } from "lucide-react";

interface SalonProfile {
  id: string;
  salon_name: string;
  logo_url?: string;
  location?: string;
  about?: string;
  website?: string;
  instagram?: string;
  phone?: string;
  photos?: SalonPhoto[];
}

interface SalonPhoto {
  id: string;
  photo_url: string;
  caption?: string;
  order_number?: number;
}

const SalonProfileEditor = () => {
  const { user, refreshUserProfile } = useAuth();
  const [profile, setProfile] = useState<SalonProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [photos, setPhotos] = useState<SalonPhoto[]>([]);
  const [newPhotos, setNewPhotos] = useState<File[]>([]);
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  
  useEffect(() => {
    if (user) {
      fetchSalonProfile();
    }
  }, [user]);
  
  const fetchSalonProfile = async () => {
    try {
      setLoading(true);
      
      // Fetch salon profile
      const { data: salonData, error: salonError } = await supabase
        .from("salons")
        .select("*")
        .eq("id", user?.id)
        .single();
      
      if (salonError && salonError.code !== 'PGRST116') {
        throw salonError;
      }
      
      // Fetch salon photos if salon exists
      let photoData: SalonPhoto[] = [];
      if (salonData) {
        const { data: photos, error: photosError } = await supabase
          .from("salon_photos")
          .select("*")
          .eq("salon_id", user?.id)
          .order("order_number", { ascending: true });
          
        if (photosError) {
          throw photosError;
        }
        
        photoData = photos || [];
      }
      
      // Create profile object from various sources
      const profileData: SalonProfile = {
        id: user?.id as string,
        salon_name: salonData?.salon_name || "",
        logo_url: salonData?.logo_url || undefined,
        location: salonData?.location || undefined,
        about: salonData?.about || undefined,
        website: salonData?.website || undefined,
        instagram: salonData?.instagram || undefined,
        phone: salonData?.phone || undefined,
      };
      
      setProfile(profileData);
      setPhotos(photoData);
      
      if (profileData.logo_url) {
        setLogoPreview(profileData.logo_url);
      }
    } catch (error) {
      console.error("Error fetching salon profile:", error);
      toast.error("Failed to load your profile information.");
    } finally {
      setLoading(false);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (profile) {
      setProfile({
        ...profile,
        [name]: value,
      });
    }
  };
  
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      
      // Only add up to 5 photos total
      const allowedNewPhotos = Math.max(0, 5 - photos.length);
      const filesToAdd = filesArray.slice(0, allowedNewPhotos);
      
      setNewPhotos([...newPhotos, ...filesToAdd]);
      
      // Create previews for the new photos
      filesToAdd.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPhotoPreviews(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };
  
  const removeExistingPhoto = async (photoId: string) => {
    try {
      const { error } = await supabase
        .from("salon_photos")
        .delete()
        .eq("id", photoId);
      
      if (error) throw error;
      
      // Remove from state
      setPhotos(photos.filter(photo => photo.id !== photoId));
      toast.success("Photo removed successfully");
    } catch (error) {
      console.error("Error removing photo:", error);
      toast.error("Failed to remove photo");
    }
  };
  
  const removeNewPhoto = (index: number) => {
    setNewPhotos(newPhotos.filter((_, i) => i !== index));
    setPhotoPreviews(photoPreviews.filter((_, i) => i !== index));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    
    setSaving(true);
    
    try {
      let logoUrl = profile.logo_url;
      
      // Upload logo if changed
      if (logoFile) {
        const fileExt = logoFile.name.split('.').pop();
        const fileName = `salon-logo-${user?.id}-${Date.now()}.${fileExt}`;
        
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
      
      // Check if salon exists
      const { data: existingSalon, error: checkError } = await supabase
        .from("salons")
        .select("id")
        .eq("id", user?.id)
        .maybeSingle();
      
      if (checkError) throw checkError;
      
      // Insert or update salon
      if (!existingSalon) {
        // Create new salon
        const { error: insertError } = await supabase
          .from("salons")
          .insert({
            id: user?.id,
            salon_name: profile.salon_name,
            logo_url: logoUrl,
            location: profile.location,
            about: profile.about,
            website: profile.website,
            instagram: profile.instagram,
            phone: profile.phone
          });
        
        if (insertError) throw insertError;
      } else {
        // Update existing salon
        const { error: updateError } = await supabase
          .from("salons")
          .update({
            salon_name: profile.salon_name,
            logo_url: logoUrl,
            location: profile.location,
            about: profile.about,
            website: profile.website,
            instagram: profile.instagram,
            phone: profile.phone,
            updated_at: new Date().toISOString()
          })
          .eq("id", user?.id);
        
        if (updateError) throw updateError;
      }
      
      // Upload new photos
      for (let i = 0; i < newPhotos.length; i++) {
        const photo = newPhotos[i];
        const fileExt = photo.name.split('.').pop();
        const fileName = `salon-photo-${user?.id}-${Date.now()}-${i}.${fileExt}`;
        
        const { error: uploadError, data: uploadData } = await supabase.storage
          .from('salon_photos')
          .upload(fileName, photo);
        
        if (uploadError) throw uploadError;
        
        if (uploadData) {
          const { data: { publicUrl } } = supabase.storage
            .from('salon_photos')
            .getPublicUrl(fileName);
          
          // Add to salon_photos table
          const { error: photoError } = await supabase
            .from("salon_photos")
            .insert({
              salon_id: user?.id,
              photo_url: publicUrl,
              order_number: photos.length + i + 1
            });
          
          if (photoError) throw photoError;
        }
      }
      
      // Also update user profile for convenience
      await supabase
        .from("users")
        .update({
          salon_name: profile.salon_name,
          avatar_url: logoUrl,
          updated_at: new Date().toISOString()
        })
        .eq("id", user?.id);
      
      // Refresh the user profile in context
      await refreshUserProfile();
      
      // Refetch salon data to get the newly uploaded photos
      await fetchSalonProfile();
      
      // Clear photo uploads state
      setNewPhotos([]);
      setPhotoPreviews([]);
      
      toast.success("Salon profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update your profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-12 bg-muted rounded w-1/3"></div>
        <div className="h-64 bg-muted rounded"></div>
        <div className="h-12 bg-muted rounded w-1/4"></div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-8">
        {/* Logo Upload */}
        <Card>
          <CardHeader>
            <CardTitle>Salon Logo</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="h-40 w-40 rounded-md border-2 border-primary flex items-center justify-center overflow-hidden bg-muted">
              {logoPreview ? (
                <img 
                  src={logoPreview} 
                  alt="Salon logo preview" 
                  className="h-full w-full object-cover" 
                />
              ) : (
                <Upload className="h-12 w-12 text-muted-foreground" />
              )}
            </div>
            
            <div className="mt-4">
              <Input
                id="logo"
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="hidden"
              />
              <Label 
                htmlFor="logo" 
                className="cursor-pointer bg-secondary hover:bg-secondary/80 text-secondary-foreground px-4 py-2 rounded-md text-sm font-medium"
              >
                {logoPreview ? "Change Logo" : "Upload Logo"}
              </Label>
            </div>
          </CardContent>
        </Card>
        
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Salon Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="salon_name">Salon Name</Label>
              <Input 
                id="salon_name" 
                name="salon_name" 
                value={profile?.salon_name || ""} 
                onChange={handleChange} 
                required 
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone" 
                name="phone" 
                value={profile?.phone || ""} 
                onChange={handleChange} 
                placeholder="Business phone number" 
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input 
                id="location" 
                name="location" 
                value={profile?.location || ""} 
                onChange={handleChange} 
                placeholder="City, State or full address" 
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="about">About Your Salon</Label>
              <Textarea 
                id="about" 
                name="about" 
                value={profile?.about || ""} 
                onChange={handleChange} 
                placeholder="Describe your salon, services, and what makes it special" 
                className="min-h-[120px]" 
              />
            </div>
          </CardContent>
        </Card>
        
        {/* Social Media */}
        <Card>
          <CardHeader>
            <CardTitle>Web & Social Media</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="website" className="flex items-center gap-2">
                <Globe className="h-4 w-4" /> Website
              </Label>
              <Input 
                id="website" 
                name="website" 
                value={profile?.website || ""} 
                onChange={handleChange} 
                placeholder="https://yoursalon.com" 
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="instagram" className="flex items-center gap-2">
                <Instagram className="h-4 w-4" /> Instagram
              </Label>
              <Input 
                id="instagram" 
                name="instagram" 
                value={profile?.instagram || ""} 
                onChange={handleChange} 
                placeholder="@yoursalon" 
              />
            </div>
          </CardContent>
        </Card>
        
        {/* Salon Photos */}
        <Card>
          <CardHeader>
            <CardTitle>Salon Photos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Existing photos */}
            {photos.length > 0 && (
              <div>
                <Label className="mb-2 block">Current Photos</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
                  {photos.map((photo) => (
                    <div key={photo.id} className="relative group">
                      <div className="h-40 rounded-md overflow-hidden">
                        <img 
                          src={photo.photo_url} 
                          alt="Salon" 
                          className="h-full w-full object-cover" 
                        />
                      </div>
                      <button 
                        type="button"
                        onClick={() => removeExistingPhoto(photo.id)}
                        className="absolute top-2 right-2 bg-black/70 hover:bg-black text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* New photo previews */}
            {photoPreviews.length > 0 && (
              <div>
                <Label className="mb-2 block">New Photos to Upload</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
                  {photoPreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <div className="h-40 rounded-md overflow-hidden">
                        <img 
                          src={preview} 
                          alt="Preview" 
                          className="h-full w-full object-cover" 
                        />
                      </div>
                      <button 
                        type="button"
                        onClick={() => removeNewPhoto(index)}
                        className="absolute top-2 right-2 bg-black/70 hover:bg-black text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Upload new photos */}
            {(photos.length + newPhotos.length) < 5 && (
              <div>
                <Input
                  id="photos"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                  multiple
                />
                <Label 
                  htmlFor="photos" 
                  className="cursor-pointer border-2 border-dashed border-gray-300 rounded-md p-6 text-center flex flex-col items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <PlusCircle className="h-8 w-8 text-gray-400 mb-2" />
                  <span className="block text-sm font-medium">
                    Add salon photos ({5 - photos.length - newPhotos.length} remaining)
                  </span>
                  <span className="text-xs text-gray-500 mt-1">
                    JPG, PNG or WebP (max 5MB each)
                  </span>
                </Label>
              </div>
            )}
          </CardContent>
        </Card>
        
        <CardFooter className="flex justify-end px-0">
          <Button 
            type="submit" 
            disabled={saving}
            className="min-w-[150px]"
          >
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Saving...
              </>
            ) : "Save Changes"}
          </Button>
        </CardFooter>
      </div>
    </form>
  );
};

export default SalonProfileEditor;
