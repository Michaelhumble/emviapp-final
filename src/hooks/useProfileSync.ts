
import { useEffect } from 'react';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { UserProfile } from '@/context/auth/types/authTypes';

/**
 * Hook to synchronize user profile data across tabs/devices in real-time
 * Only listens for changes to the authenticated user's profile
 */
export function useProfileSync() {
  const { user, userProfile, refreshUserProfile } = useAuth();
  
  useEffect(() => {
    // Only subscribe to changes if we have an authenticated user
    if (!user?.id) return;
    
    console.log("Setting up real-time profile sync for user", user.id);
    
    // Create a channel subscription for profile changes
    const channel = supabase
      .channel('profile-sync')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'users',
          filter: `id=eq.${user.id}`
        },
        async (payload) => {
          console.log('Profile update detected from another session:', payload);
          
          // If the update was made from this session, we can ignore it
          // as the local state would already be up to date
          if (payload.record && payload.old_record) {
            const oldProfile = payload.old_record as unknown as UserProfile;
            const newProfile = payload.record as unknown as UserProfile;
            
            // Only refresh if important profile fields have changed
            const hasSignificantChanges = 
              oldProfile.full_name !== newProfile.full_name ||
              oldProfile.avatar_url !== newProfile.avatar_url ||
              oldProfile.bio !== newProfile.bio ||
              oldProfile.specialty !== newProfile.specialty ||
              oldProfile.role !== newProfile.role;
              
            if (hasSignificantChanges) {
              // Notify user about the sync
              toast.info("Your profile was updated from another device");
              
              // Refresh the user profile data
              await refreshUserProfile();
            }
          }
        }
      )
      .subscribe();
    
    // Clean up the subscription when the component unmounts
    // or when the user changes
    return () => {
      console.log("Cleaning up real-time profile sync subscription");
      supabase.removeChannel(channel);
    };
  }, [user?.id, refreshUserProfile]);
  
  return null; // This hook doesn't return anything
}
