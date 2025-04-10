
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useSalonProfileEditor = () => {
  const { user, userProfile, refreshUserProfile } = useAuth();
  
  const [salonName, setSalonName] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [phone, setPhone] = useState('');
  const [instagram, setInstagram] = useState('');
  const [website, setWebsite] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [googleReviewLink, setGoogleReviewLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Load initial data
  useEffect(() => {
    if (userProfile) {
      setSalonName(userProfile.salon_name || '');
      setLocation(userProfile.location || '');
      setBio(userProfile.bio || '');
      setPhone(userProfile.phone || '');
      setInstagram(userProfile.instagram || '');
      setWebsite(userProfile.website || '');
      setLogoUrl(userProfile.avatar_url || '');
      setGoogleReviewLink(userProfile.google_review_link || '');
      
      if (userProfile.avatar_url) {
        setLogoPreview(userProfile.avatar_url);
      }
    }
  }, [userProfile]);
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0 || !user) return;
    
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    
    setIsLoading(true);
    
    try {
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file);
        
      if (uploadError) throw uploadError;
      
      const { data } = supabase.storage.from('avatars').getPublicUrl(fileName);
      setLogoUrl(data.publicUrl);
      setLogoPreview(data.publicUrl);
      
    } catch (error) {
      console.error('Error uploading salon logo:', error);
      toast.error('Failed to upload logo. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const removeLogo = () => {
    setLogoUrl('');
    setLogoPreview(null);
  };
  
  const handleSaveProfile = async () => {
    if (!user) return;
    
    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('users')
        .update({
          salon_name: salonName,
          location,
          bio,
          phone,
          instagram,
          website,
          avatar_url: logoUrl,
          google_review_link: googleReviewLink,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
      await refreshUserProfile();
      toast.success('Salon profile updated successfully');
    } catch (error) {
      console.error('Error updating salon profile:', error);
      toast.error('Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    salonName,
    location,
    bio,
    phone,
    instagram,
    website,
    logoUrl,
    logoPreview,
    googleReviewLink,
    isLoading,
    setSalonName,
    setLocation,
    setBio,
    setPhone,
    setInstagram,
    setWebsite,
    setGoogleReviewLink,
    handleFileChange,
    removeLogo,
    handleSaveProfile
  };
};
