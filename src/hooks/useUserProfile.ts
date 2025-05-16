
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';

export interface UserProfile {
  id?: string;
  email?: string;
  name?: string;
  phone_number?: string;
  created_at?: string;
  updated_at?: string;
}

export const useUserProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.id) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        // Using 'users' table instead of 'profiles' as it appears to be the correct table based on schema
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) throw error;
        
        // Convert the data to match UserProfile interface
        const userProfile: UserProfile = {
          id: data.id,
          email: data.email,
          name: data.full_name,
          phone_number: data.phone,
          created_at: data.created_at,
          updated_at: data.updated_at
        };
        
        setProfile(userProfile);
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch profile'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [user?.id]);

  return { profile, isLoading, error };
};
