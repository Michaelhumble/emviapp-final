
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { UserProfile } from '@/types/profile';
import { UserRole } from '@/context/auth/types';
import { normalizeRole } from '@/utils/roles';

export const useArtistProfileData = (profileId: string) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', profileId)
          .single();

        if (error) throw error;

        if (data) {
          // Normalize the role from database
          const normalizedRole = normalizeRole(data.role);
          
          // Check if this is an artist profile - update role check
          const validArtistRoles: UserRole[] = ['nail-artist', 'hair-stylist', 'lash-tech', 'barber', 'esthetician', 'massage-therapist', 'freelancer'];
          
          if (!normalizedRole || !validArtistRoles.includes(normalizedRole)) {
            throw new Error('Profile is not an artist profile');
          }

          const transformedProfile: UserProfile = {
            ...data,
            role: normalizedRole,
            badges: Array.isArray(data.badges) ? data.badges : []
          };
          
          setProfile(transformedProfile);
        }
      } catch (err) {
        console.error('Error fetching artist profile:', err);
        setError(err instanceof Error ? err.message : 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    if (profileId) {
      fetchProfile();
    }
  }, [profileId]);

  return { profile, loading, error };
};
