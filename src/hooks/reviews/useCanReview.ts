
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
      // Use a more type-safe approach for calling RPC functions
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('id', bookingId)
        .eq('sender_id', user.id)
        .eq('status', 'completed')
        .single();

      if (error) throw error;
      
      // Check if there's already a review for this booking
      const { data: existingReview, error: reviewError } = await supabase
        .from('reviews')
        .select('id')
        .eq('booking_id', bookingId)
        .maybeSingle();
        
      if (reviewError) throw reviewError;
      
      // Can review if booking exists (from first query) and no review exists yet
      setCanReview(!!data && !existingReview);
    } catch (error) {
      console.error("Error checking if user can review:", error);
      setCanReview(false);
    } finally {
      setLoading(false);
    }
  };

  return { canReview, loading, refreshCanReview: checkCanReview };
};
