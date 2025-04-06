import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { BoostStatus } from "./types";
import { addDays } from "date-fns";

export const useProfileBoost = () => {
  const [boostStatus, setBoostStatus] = useState<BoostStatus>({
    isActive: false,
    expiresAt: null
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBoostStatus = async () => {
      try {
        setLoading(true);
        const { data: userData, error } = await supabase
          .from('users')
          .select('boosted_until')
          .eq('id', supabase.auth.getUser().then(res => res.data.user?.id))
          .single();

        if (error) {
          console.error('Error fetching boost status:', error);
          return;
        }

        // Check if boosted_until exists and is in the future
        if (userData?.boosted_until) {
          const boostDate = new Date(userData.boosted_until);
          const now = new Date();
          
          setBoostStatus({
            isActive: boostDate > now,
            expiresAt: userData.boosted_until as string
          });
        }
      } catch (err) {
        console.error('Unexpected error fetching boost status:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBoostStatus();
  }, []);

  // Calculate new expiration date (7 days from now or extend existing)
  const getNewExpirationDate = (): Date => {
    if (boostStatus.isActive && boostStatus.expiresAt) {
      // If already boosted, add 7 days to current expiration
      return addDays(new Date(boostStatus.expiresAt), 7);
    }
    // Otherwise, 7 days from now
    return addDays(new Date(), 7);
  };

  return { boostStatus, setBoostStatus, loading, getNewExpirationDate };
};
