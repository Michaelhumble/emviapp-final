
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';

// Export this interface so useCreditRedemption can use it
export interface BoostStatus {
  isActive: boolean;
  expiresAt: string | null;
}

export function useProfileBoost() {
  const { user, userProfile } = useAuth();
  const [boostStatus, setBoostStatus] = useState<BoostStatus>({
    isActive: false,
    expiresAt: null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Function to check the boost status
  const checkBoostStatus = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // User profile data
      if (userProfile?.boosted_until) {
        const expiryDate = new Date(userProfile.boosted_until);
        const now = new Date();
        
        if (expiryDate > now) {
          setBoostStatus({
            isActive: true,
            expiresAt: userProfile.boosted_until
          });
        } else {
          setBoostStatus({
            isActive: false,
            expiresAt: null
          });
        }
      } else {
        setBoostStatus({
          isActive: false,
          expiresAt: null
        });
      }
    } catch (err) {
      console.error('Error checking profile boost status:', err);
      setError(err instanceof Error ? err : new Error('Failed to check boost status'));
      setBoostStatus({
        isActive: false,
        expiresAt: null
      });
    } finally {
      setLoading(false);
    }
  }, [user, userProfile]);

  // Check boost status on component mount
  useEffect(() => {
    checkBoostStatus();
  }, [checkBoostStatus]);

  // Function to activate the profile boost
  const activateProfileBoost = async (): Promise<boolean> => {
    if (!user) {
      toast.error('You must be logged in to boost your profile');
      return false;
    }

    if (!userProfile) {
      toast.error('Your profile data is not available');
      return false;
    }

    // Check if user has enough credits
    if ((userProfile.credits || 0) < 100) {
      toast.error('You need at least 100 credits to boost your profile');
      return false;
    }

    try {
      setLoading(true);

      // Calculate boost expiry (30 days from now)
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 30);
      const expiryDateString = expiryDate.toISOString();

      // Update user profile with boosted status and deduct credits
      const { error } = await supabase
        .from('users')
        .update({
          boosted_until: expiryDateString,
          credits: (userProfile.credits || 0) - 100,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;

      // Update boost status state
      setBoostStatus({
        isActive: true,
        expiresAt: expiryDateString
      });

      toast.success('Your profile has been boosted! It will appear higher in search results for 30 days.');
      return true;
    } catch (err) {
      console.error('Error activating profile boost:', err);
      setError(err instanceof Error ? err : new Error('Failed to activate boost'));
      toast.error('Failed to activate profile boost. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    boostStatus,
    loading,
    error,
    checkBoostStatus,
    activateProfileBoost
  };
}
