
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export const useSalonProfileEditor = () => {
  const { user, userProfile, refreshUserProfile } = useAuth();
  const navigate = useNavigate();
  
  const [salonName, setSalonName] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");
  const [instagram, setInstagram] = useState("");
  const [website, setWebsite] = useState("");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Initialize form with user profile data
  useEffect(() => {
    if (userProfile) {
      setSalonName(userProfile.salon_name || "");
      setLocation(userProfile.location || "");
      setBio(userProfile.bio || "");
      setPhone(userProfile.phone || "");
      setInstagram(userProfile.instagram || "");
      setWebsite(userProfile.website || "");
      setLogoUrl(userProfile.avatar_url);
    }
  }, [userProfile]);
  
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
  
  const removeLogo = () => {
    setLogoFile(null);
    setLogoPreview(null);
    setLogoUrl(null);
  };
  
  const handleSaveProfile = async () => {
    if (!user) {
      toast.error("You must be logged in to update your salon profile");
      return;
    }
    
    setIsLoading(true);
    
    try {
      let updatedLogoUrl = logoUrl;
      
      // Handle logo upload if a new file was selected
      if (logoFile) {
        // Validate file size (5MB limit)
        if (logoFile.size > 5 * 1024 * 1024) {
          throw new Error("Image file must be less than 5MB");
        }
        
        // Validate file type
        if (!logoFile.type.startsWith('image/')) {
          throw new Error("Please select a valid image file");
        }
        
        toast.success("Uploading salon logo...");
        
        const fileExt = logoFile.name.split('.').pop();
        const fileName = `${user.id}/${Date.now()}.${fileExt}`;
        
        const { error: uploadError, data: uploadData } = await supabase.storage
          .from('salon-logos')
          .upload(fileName, logoFile, {
            cacheControl: '3600',
            upsert: false
          });
        
        if (uploadError) {
          console.error('Logo upload error:', uploadError);
          throw new Error(`File upload failed: ${uploadError.message}`);
        }
        
        if (uploadData) {
          const { data: { publicUrl } } = supabase.storage
            .from('salon-logos')
            .getPublicUrl(fileName);
          
          updatedLogoUrl = publicUrl;
          setLogoUrl(publicUrl);
          setLogoPreview(null); // Clear preview since we now have the real URL
          setLogoFile(null); // Clear file since it's uploaded
        }
      }
      
      // Update user profile in database
      const { error } = await supabase
        .from('profiles')
        .update({
          salon_name: salonName,
          location,
          bio,
          phone,
          instagram,
          website,
          avatar_url: updatedLogoUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
      
      if (error) {
        console.error('Supabase update error:', error);
        throw new Error(`Database update failed: ${error.message}`);
      }
      
      // Refresh the context with updated profile
      await refreshUserProfile();
      
      toast.success("Salon profile updated successfully!");
    } catch (error) {
      console.error("Error updating salon profile:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to update profile. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    salonName,
    location,
    bio,
    phone,
    instagram,
    website,
    logoFile,
    logoUrl,
    logoPreview,
    isLoading,
    navigate,
    setSalonName,
    setLocation,
    setBio,
    setPhone,
    setInstagram,
    setWebsite,
    handleFileChange,
    removeLogo,
    handleSaveProfile
  };
};
