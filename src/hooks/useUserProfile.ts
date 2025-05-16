
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';

interface UserProfile {
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
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) throw error;
        setProfile(data);
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
