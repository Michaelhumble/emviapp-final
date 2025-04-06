
import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { BoostStatus, ProfileBoostHook } from "./types";
import { differenceInDays } from "date-fns";

export const useProfileBoost = (): ProfileBoostHook => {
  const { user, userProfile, refreshUserProfile } = useAuth();
  const [isBoostLoading, setIsBoostLoading] = useState(false);
  const [boostStatus, setBoostStatus] = useState<BoostStatus>({
    isActive: false,
    expiresAt: null,
    daysRemaining: 0
  });

  // Check boost status on component mount
  useEffect(() => {
    if (user) {
      checkBoostStatus();
    }
  }, [user, userProfile?.boosted_until]);

  // Check if the user has an active profile boost
  const checkBoostStatus = async () => {
    if (!user) return { isActive: false, daysRemaining: 0 };
    
    setIsBoostLoading(true);
    
    try {
      // Check boosted_until in the profile first
      if (userProfile?.boosted_until) {
        const boostedUntil = new Date(userProfile.boosted_until);
        const now = new Date();
        
        if (boostedUntil > now) {
          const daysRemaining = differenceInDays(boostedUntil, now);
          
          setBoostStatus({
            isActive: true,
            expiresAt: userProfile.boosted_until,
            daysRemaining: daysRemaining
          });
          
          return { isActive: true, daysRemaining };
        }
      }
      
      // If not boosted or boost expired, fetch latest from database
      const { data, error } = await supabase
        .from('users')
        .select('boosted_until')
        .eq('id', user.id)
        .single();
      
      if (error) {
        console.error("Error checking boost status:", error);
        setBoostStatus({ isActive: false, expiresAt: null, daysRemaining: 0 });
        return { isActive: false, daysRemaining: 0 };
      }
      
      if (data?.boosted_until) {
        const boostedUntil = new Date(data.boosted_until);
        const now = new Date();
        
        if (boostedUntil > now) {
          const daysRemaining = differenceInDays(boostedUntil, now);
          
          setBoostStatus({
            isActive: true,
            expiresAt: data.boosted_until,
            daysRemaining
          });
          
          return { isActive: true, daysRemaining };
        }
      }
      
      // No active boost
      setBoostStatus({ isActive: false, expiresAt: null, daysRemaining: 0 });
      return { isActive: false, daysRemaining: 0 };
    } catch (error) {
      console.error("Error checking boost status:", error);
      return { isActive: false, daysRemaining: 0 };
    } finally {
      setIsBoostLoading(false);
    }
  };

  // Activate the profile boost
  const activateBoost = async (days: number): Promise<boolean> => {
    if (!user) {
      toast.error("You need to be logged in to boost your profile");
      return false;
    }
    
    setIsBoostLoading(true);
    
    try {
      // Calculate boosted_until date (now + days)
      const boostUntil = new Date();
      boostUntil.setDate(boostUntil.getDate() + days);
      
      // Update the database
      const { error } = await supabase
        .from('users')
        .update({ 
          boosted_until: boostUntil.toISOString() 
        })
        .eq('id', user.id);
      
      if (error) {
        console.error("Error activating boost:", error);
        toast.error("Failed to activate profile boost");
        return false;
      }
      
      // Refresh user profile to get updated data
      await refreshUserProfile();
      
      toast.success(`Your profile has been boosted for ${days} days!`);
      return true;
    } catch (error) {
      console.error("Error activating boost:", error);
      toast.error("Failed to activate profile boost");
      return false;
    } finally {
      setIsBoostLoading(false);
    }
  };

  return {
    boostStatus,
    setBoostStatus,
    activateBoost,
    checkBoostStatus,
    isBoostLoading
  };
};
