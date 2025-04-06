
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";

export const useProfileBoost = () => {
  const { user, refreshUserProfile } = useAuth();
  const [isBoostLoading, setIsBoostLoading] = useState(false);

  const activateBoost = async (days: number) => {
    if (!user) return false;
    setIsBoostLoading(true);

    try {
      // Calculate the boost end date
      const boostEndDate = new Date();
      boostEndDate.setDate(boostEndDate.getDate() + days);
      
      // Update the user profile with the boost end date
      const { error } = await supabase
        .from('users')
        .update({ 
          boosted_until: boostEndDate.toISOString() 
        })
        .eq('id', user.id);

      if (error) {
        console.error("Error activating profile boost:", error);
        toast.error("Failed to activate profile boost");
        return false;
      }

      // Refresh the user profile to get the updated boosted_until value
      await refreshUserProfile();
      
      toast.success(`Profile boost activated for ${days} days!`);
      return true;
    } catch (err) {
      console.error("Unexpected error in activateBoost:", err);
      toast.error("Something went wrong with your boost");
      return false;
    } finally {
      setIsBoostLoading(false);
    }
  };

  const checkBoostStatus = async () => {
    if (!user) return { isActive: false, daysRemaining: 0 };
    
    try {
      // Fetch the current user's boosted_until value
      const { data, error } = await supabase
        .from('users')
        .select('boosted_until')
        .eq('id', user.id)
        .single();

      if (error || !data) {
        console.error("Error checking boost status:", error);
        return { isActive: false, daysRemaining: 0 };
      }

      if (!data.boosted_until) {
        return { isActive: false, daysRemaining: 0 };
      }

      const boostEndDate = new Date(data.boosted_until);
      const currentDate = new Date();
      
      // Check if the boost is still active
      const isActive = boostEndDate > currentDate;
      
      // Calculate days remaining if boost is active
      const daysRemaining = isActive 
        ? Math.ceil((boostEndDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24))
        : 0;
      
      return { isActive, daysRemaining };
    } catch (err) {
      console.error("Unexpected error in checkBoostStatus:", err);
      return { isActive: false, daysRemaining: 0 };
    }
  };

  return {
    activateBoost,
    checkBoostStatus,
    isBoostLoading
  };
};
