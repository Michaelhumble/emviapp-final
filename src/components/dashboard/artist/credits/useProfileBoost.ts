import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";
import { BoostStatus } from "./types";

/**
 * Custom hook to check if user's profile is boosted
 */
export const useProfileBoost = () => {
  const { user, userProfile } = useAuth();
  const [boostStatus, setBoostStatus] = useState<BoostStatus>({
    isActive: false,
    expiresAt: null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkBoostStatus = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Check if boosted_until is present in userProfile
        if (userProfile?.boosted_until) {
          const expiresAt = userProfile.boosted_until;
          const isActive = new Date(expiresAt) > new Date();
          
          setBoostStatus({
            isActive,
            expiresAt
          });
        } else {
          // Otherwise, fetch from database directly
          const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', user.id)
            .single();

          if (error) throw error;

          // Check if boosted_until exists in data
          if (data && 'boosted_until' in data) {
            const expiresAt = data.boosted_until;
            const isActive = expiresAt ? new Date(expiresAt) > new Date() : false;

            setBoostStatus({
              isActive,
              expiresAt
            });
          } else {
            // Default to inactive if boosted_until not found
            setBoostStatus({
              isActive: false,
              expiresAt: null
            });
          }
        }
      } catch (err) {
        console.error('Error checking boost status:', err);
        setError('Failed to check profile boost status');
      } finally {
        setLoading(false);
      }
    };

    checkBoostStatus();
  }, [user, userProfile]);

  /**
   * Activates profile boost for the specified number of days
   */
  const activateProfileBoost = async (days: number = 30): Promise<boolean> => {
    if (!user?.id) return false;

    try {
      // Calculate expiration date
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + days);
      const expiryDate = expiresAt.toISOString();

      // Create update object, only including properties that exist in the database
      const updateObj: Record<string, any> = { 
        credits: (userProfile?.credits || 0) - 5 // Assuming boost costs 5 credits
      };
      
      // Only add boosted_until if the column exists
      try {
        // Update the user's boosted_until date
        const { error } = await supabase
          .from('users')
          .update({ boosted_until: expiryDate })
          .eq('id', user.id);
          
        if (!error) {
          // Update local state
          setBoostStatus({
            isActive: true,
            expiresAt: expiryDate
          });
          return true;
        }
      } catch (err) {
        console.error('Error activating profile boost:', err);
        setError('Failed to activate profile boost');
        return false;
      }
      
      return false;
    } catch (err) {
      console.error('Error activating profile boost:', err);
      setError('Failed to activate profile boost');
      return false;
    }
  };

  return {
    boostStatus,
    setBoostStatus,
    loading,
    error,
    activateProfileBoost
  };
};
