
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { UserProfile } from '@/types/profile';

interface ProfileFormData {
  full_name: string;
  bio: string;
  specialty: string;
  location: string;
  instagram: string;
  website: string;
}

interface UseProfileFormProps {
  onProfileUpdate?: (updatedProfile: UserProfile) => void;
}

export const useProfileForm = ({ onProfileUpdate }: UseProfileFormProps = {}) => {
  const { user, userProfile, refreshUserProfile } = useAuth();
  const [updating, setUpdating] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>({
    full_name: '',
    bio: '',
    specialty: '',
    location: '',
    instagram: '',
    website: '',
  });

  // Load initial data
  useEffect(() => {
    if (userProfile) {
      setFormData({
        full_name: userProfile.full_name || '',
        bio: userProfile.bio || '',
        specialty: userProfile.specialty || '',
        location: userProfile.location || '',
        instagram: userProfile.instagram || '',
        website: userProfile.website || '',
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
    
    setUpdating(true);
    
    try {
      // Generate referral code if none exists
      let referralCode = userProfile?.referral_code;
      if (!referralCode) {
        referralCode = `EMVI${Math.floor(1000 + Math.random() * 9000)}`;
      }
      
      const { error } = await supabase
        .from('users')
        .update({
          full_name: formData.full_name,
          bio: formData.bio,
          specialty: formData.specialty,
          location: formData.location,
          instagram: formData.instagram,
          website: formData.website,
          referral_code: referralCode,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
      await refreshUserProfile();
      toast.success("Profile updated successfully");
      
      if (onProfileUpdate && userProfile) {
        // When calling onProfileUpdate, we need to make sure the object conforms to UserProfile
        // Make a copy of the userProfile and spread in our form data to maintain type compatibility
        const updatedProfile: UserProfile = {
          ...userProfile,
          full_name: formData.full_name,
          bio: formData.bio,
          specialty: formData.specialty,
          location: formData.location,
          instagram: formData.instagram,
          website: formData.website,
          referral_code: referralCode,
          preferred_language: userProfile.preferred_language as "en" | "vi" | "es" | undefined
        };
        
        onProfileUpdate(updatedProfile);
      }
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  return {
    formData,
    updating,
    handleChange,
    handleSpecialtyChange,
    handleSubmit
  };
};
