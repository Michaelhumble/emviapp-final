
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';
import { addDays, format } from 'date-fns';

export const useProfileBoost = () => {
  const { user, userProfile, refreshUserProfile } = useAuth();
  const [isBoostLoading, setIsBoostLoading] = useState(false);
  
  /**
   * Check the current boost status
   */
  const checkBoostStatus = useCallback(async () => {
    if (!user?.id || !userProfile) {
      return { isActive: false, daysRemaining: 0 };
    }
    
    try {
      const { data, error } = await supabase
        .from('users')
        .select('boosted_until')
        .eq('id', user.id)
        .single();
      
      if (error) throw error;
      
      if (!data.boosted_until) {
        return { isActive: false, daysRemaining: 0 };
      }
      
      const boostDate = new Date(data.boosted_until);
      const now = new Date();
      
      // Check if boost is active
      if (boostDate > now) {
        // Calculate days remaining
        const diffTime = Math.abs(boostDate.getTime() - now.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return { isActive: true, daysRemaining: diffDays };
      }
      
      return { isActive: false, daysRemaining: 0 };
    } catch (error) {
      console.error('Error checking boost status:', error);
      return { isActive: false, daysRemaining: 0 };
    }
  }, [user?.id, userProfile]);
  
  /**
   * Activate a profile boost for a specific number of days
   */
  const activateBoost = useCallback(async (days: number) => {
    if (!user?.id) {
      toast.error('You must be logged in to boost your profile');
      return false;
    }
    
    setIsBoostLoading(true);
    
    try {
      // Calculate the new expiration date
      const boostUntil = format(addDays(new Date(), days), "yyyy-MM-dd'T'HH:mm:ss'Z'");
      
      // Update user profile with the new boosted_until date
      const { error } = await supabase
        .from('users')
        .update({ boosted_until: boostUntil })
        .eq('id', user.id);
        
      if (error) throw error;
      
      // Refresh the user profile to get the updated information
      await refreshUserProfile();
      
      toast.success(`Your profile has been boosted for ${days} days!`);
      return true;
    } catch (error) {
      console.error('Error activating profile boost:', error);
      toast.error('Failed to activate your profile boost. Please try again.');
      return false;
    } finally {
      setIsBoostLoading(false);
    }
  }, [user?.id, refreshUserProfile]);
  
  return {
    activateBoost,
    checkBoostStatus,
    isBoostLoading
  };
};
