
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";
import { BoostStatus } from "./types";
import { isAfter } from "date-fns";

export const useProfileBoost = () => {
  const { user } = useAuth();
  const [boostStatus, setBoostStatus] = useState<BoostStatus>({
    isActive: false,
    expiresAt: null
  });

  // Fetch boost status on hook mount
  useEffect(() => {
    if (user) {
      fetchBoostStatus();
    }
  }, [user]);

  // Fetch the user's boost status from Supabase
  const fetchBoostStatus = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('users')
        .select('boosted_until')
        .eq('id', user.id)
        .single();
      
      if (error) {
        console.error("Error fetching boost status:", error);
        return;
      }
      
      // Check if data has a boosted_until property and if it's not null
      if (data && 'boosted_until' in data && data.boosted_until) {
        const boostExpiryDate = new Date(data.boosted_until);
        const isActive = isAfter(boostExpiryDate, new Date());
        
        setBoostStatus({
          isActive: isActive,
          expiresAt: isActive ? data.boosted_until : null
        });
      }
    } catch (err) {
      console.error("Error in fetchBoostStatus:", err);
    }
  };

  return {
    boostStatus,
    setBoostStatus,
    fetchBoostStatus
  };
};
