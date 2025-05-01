
import { useEffect } from 'react';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

/**
 * Hook to synchronize profile changes in real-time
 */
export function useProfileSync() {
  const { user, refreshUserProfile } = useAuth();

  useEffect(() => {
    if (!user?.id) return;

    // Set up real-time subscription to the users table for the current user
    const channel = supabase
      .channel(`users-changes-${user.id}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'users',
          filter: `id=eq.${user.id}`,
        },
        async (payload) => {
          try {
            // Get the old and new record from the payload
            const oldRecord = payload.old || {};
            const newRecord = payload.new || {};

            // Check if significant changes were made
            const significantChanges = ['credits', 'role', 'boosted_until'].some(
              field => oldRecord[field] !== newRecord[field]
            );

            // Only refresh and notify for significant changes
            if (significantChanges) {
              await refreshUserProfile();
              
              // Check for specific changes to notify about
              if (oldRecord.credits !== newRecord.credits) {
                const difference = (newRecord.credits || 0) - (oldRecord.credits || 0);
                if (difference > 0) {
                  toast.success(`${difference} credits added to your account!`);
                }
              }
              
              if (oldRecord.role !== newRecord.role) {
                toast.info(`Your account role has been updated to ${newRecord.role || 'customer'}`);
              }
            }
          } catch (error) {
            console.error('Error handling profile update:', error);
          }
        }
      )
      .subscribe();

    // Clean up subscription when unmounting
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id, refreshUserProfile]);
}
