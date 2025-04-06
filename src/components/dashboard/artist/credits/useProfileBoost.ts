
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';

export const useProfileBoost = () => {
  const [isBoostLoading, setIsBoostLoading] = useState(false);
  const { user, refreshUserProfile } = useAuth();

  const checkBoostStatus = async () => {
    if (!user?.id) {
      return { isActive: false, daysRemaining: 0 };
    }

    try {
      const { data, error } = await supabase
        .from('users')
        .select('boosted_until')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error checking boost status:', error);
        return { isActive: false, daysRemaining: 0 };
      }

      if (!data.boosted_until) {
        return { isActive: false, daysRemaining: 0 };
      }

      const boostExpiryDate = new Date(data.boosted_until);
      const now = new Date();
      
      if (boostExpiryDate > now) {
        const diffTime = Math.abs(boostExpiryDate.getTime() - now.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return { isActive: true, daysRemaining: diffDays };
      }

      return { isActive: false, daysRemaining: 0 };
    } catch (error) {
      console.error('Error checking boost status:', error);
      return { isActive: false, daysRemaining: 0 };
    }
  };

  const activateBoost = async (days: number) => {
    if (!user?.id) {
      toast.error('You must be logged in to boost your profile');
      return false;
    }

    setIsBoostLoading(true);

    try {
      // Calculate the expiry date
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + days);

      const { error } = await supabase
        .from('users')
        .update({ boosted_until: expiryDate.toISOString() })
        .eq('id', user.id);

      if (error) {
        console.error('Error activating boost:', error);
        toast.error('Failed to activate profile boost');
        return false;
      }

      // Refresh user profile to update the UI
      await refreshUserProfile();
      
      return true;
    } catch (error) {
      console.error('Error activating boost:', error);
      toast.error('Failed to activate profile boost');
      return false;
    } finally {
      setIsBoostLoading(false);
    }
  };

  return {
    activateBoost,
    checkBoostStatus,
    isBoostLoading
  };
};
