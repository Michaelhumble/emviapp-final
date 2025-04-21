
import { useEffect } from 'react';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export function useReferralNotifications() {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    // Set up a real-time listener for notifications of type 'referral_success'
    const subscription = supabase
      .channel('referral_notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${user.id} AND type=eq.referral_success`
        },
        (payload) => {
          // Extract notification data
          const notification = payload.new;
          
          // Show success toast when new referral notification arrives
          toast.success(
            notification.message || '🎉 You earned credits for a referral!',
            {
              duration: 6000,
              action: {
                label: 'View',
                onClick: () => {
                  // You could navigate to referrals page or dashboard here
                  window.location.href = '/dashboard/customer';
                }
              }
            }
          );
        }
      )
      .subscribe();

    // Clean up subscription on component unmount
    return () => {
      subscription.unsubscribe();
    };
  }, [user]);

  return null; // This hook doesn't return anything, it just sets up listeners
}
