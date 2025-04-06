
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
            .select('boosted_until')
            .eq('id', user.id)
            .maybeSingle();

          if (error) {
            // Check if the error is about the column not existing
            if (error.message && error.message.includes("boosted_until")) {
              console.log("boosted_until column may not exist, setting default values");
              setBoostStatus({
                isActive: false,
                expiresAt: null
              });
            } else {
              throw error;
            }
          } else if (data && data.boosted_until) {
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
        // Set default values on error
        setBoostStatus({
          isActive: false,
          expiresAt: null
        });
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

      // Try to update the user's boosted_until date
      const { error } = await supabase
        .from('users')
        .update({ 
          boosted_until: expiryDate,
          credits: (userProfile?.credits || 0) - 5 // Assuming boost costs 5 credits
        })
        .eq('id', user.id);
          
      if (error) {
        // If the error is about the column not existing
        if (error.message && error.message.includes("boosted_until")) {
          console.log("boosted_until column doesn't exist, only updating credits");
          
          // Try updating only the credits
          const { error: creditsError } = await supabase
            .from('users')
            .update({ 
              credits: (userProfile?.credits || 0) - 5
            })
            .eq('id', user.id);
            
          if (creditsError) {
            throw creditsError;
          }
          
          // Still update local state even if we can't store in DB
          setBoostStatus({
            isActive: true,
            expiresAt: expiryDate
          });
          return true;
        } else {
          throw error;
        }
      }
      
      // Update local state
      setBoostStatus({
        isActive: true,
        expiresAt: expiryDate
      });
      return true;
      
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
