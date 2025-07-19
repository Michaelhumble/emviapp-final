import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';

export interface ArtistForHireProfile {
  id?: string;
  user_id: string;
  hourly_rate?: string;
  location?: string;
  years_experience?: string;
  specialties?: string;
  headline?: string;
  bio?: string;
  avatar_url?: string;
  available_for_work?: boolean;
  shifts_available?: string;
  created_at?: string;
  updated_at?: string;
}

export const useArtistForHire = () => {
  const { userProfile } = useAuth();
  const [profile, setProfile] = useState<ArtistForHireProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const fetchProfile = async () => {
    if (!userProfile?.id) return;

    try {
      const { data, error } = await supabase
        .from('artist_for_hire_profiles')
        .select('*')
        .eq('user_id', userProfile.id)
        .maybeSingle();

      if (error) throw error;

      setProfile(data);
    } catch (error) {
      console.error('Error fetching artist for hire profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveProfile = async (profileData: Partial<ArtistForHireProfile>) => {
    if (!userProfile?.id) {
      toast.error('User not authenticated');
      return false;
    }

    setIsSaving(true);
    try {
      const dataToSave = {
        ...profileData,
        user_id: userProfile.id,
      };

      if (profile?.id) {
        // Update existing profile
        const { error } = await supabase
          .from('artist_for_hire_profiles')
          .update(dataToSave)
          .eq('user_id', userProfile.id);

        if (error) throw error;
      } else {
        // Create new profile
        const { data, error } = await supabase
          .from('artist_for_hire_profiles')
          .insert([dataToSave])
          .select()
          .single();

        if (error) throw error;
        setProfile(data);
      }

      // Refresh the profile
      await fetchProfile();
      
      toast.success('Artist For Hire profile updated! ✨', {
        description: 'Your profile is now live for potential clients.'
      });
      
      return true;
    } catch (error) {
      console.error('Error saving artist for hire profile:', error);
      toast.error('Failed to save profile. Please try again.');
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const toggleAvailability = async () => {
    if (!profile && !userProfile?.id) return;

    const newAvailability = !profile?.available_for_work;
    
    const updatedProfile = {
      ...profile,
      available_for_work: newAvailability,
      user_id: userProfile!.id,
    };

    const success = await saveProfile(updatedProfile);
    if (success) {
      setProfile(prev => prev ? { ...prev, available_for_work: newAvailability } : null);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [userProfile?.id]);

  return {
    profile,
    isLoading,
    isSaving,
    saveProfile,
    toggleAvailability,
    refetch: fetchProfile,
  };
};