
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";

export const useCanReview = (bookingId?: string) => {
  const [canReview, setCanReview] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (bookingId && user) {
      checkCanReview();
    } else {
      setCanReview(false);
      setLoading(false);
    }
  }, [bookingId, user]);

  const checkCanReview = async () => {
    if (!bookingId || !user) {
      setCanReview(false);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.rpc("can_review_booking", {
        booking_id: bookingId,
        user_id: user.id
      });

      if (error) throw error;
      setCanReview(!!data);
    } catch (error) {
      console.error("Error checking if user can review:", error);
      setCanReview(false);
    } finally {
      setLoading(false);
    }
  };

  return { canReview, loading, refreshCanReview: checkCanReview };
};
