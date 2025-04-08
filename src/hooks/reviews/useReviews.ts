
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";
import { Review, ArtistRating } from "@/types/reviews";

export const useReviews = (artistId?: string, salonId?: string) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [ratingData, setRatingData] = useState<ArtistRating>({ average_rating: 0, review_count: 0 });
  const { user } = useAuth();

  useEffect(() => {
    if (artistId || salonId) {
      fetchReviews();
      fetchRatingData();
    }
  }, [artistId, salonId]);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from("reviews")
        .select("*")
        .eq("status", "active");

      if (artistId) {
        query = query.eq("artist_id", artistId);
      }

      if (salonId) {
        query = query.eq("salon_id", salonId);
      }

      const { data, error } = await query.order("created_at", { ascending: false });

      if (error) throw error;
      setReviews(data as Review[]);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRatingData = async () => {
    if (!artistId) return;
    
    try {
      // Call the database function to get rating data
      const { data, error } = await supabase.rpc("get_artist_rating", {
        artist_id: artistId
      });

      if (error) throw error;
      if (data) {
        setRatingData(data as ArtistRating);
      }
    } catch (error) {
      console.error("Error fetching rating data:", error);
    }
  };

  const submitReview = async (bookingId: string, artistId: string, rating: number, comment: string, salonId?: string) => {
    if (!user) {
      toast.error("You must be logged in to leave a review");
      return false;
    }

    try {
      // Check if user can review this booking
      const { data: canReview, error: checkError } = await supabase.rpc("can_review_booking", {
        booking_id: bookingId,
        user_id: user.id
      });

      if (checkError) throw checkError;
      if (!canReview) {
        toast.error("You cannot review this booking");
        return false;
      }

      // Submit the review
      const { error } = await supabase.from("reviews").insert({
        booking_id: bookingId,
        artist_id: artistId,
        customer_id: user.id,
        salon_id: salonId || null,
        rating,
        comment: comment.trim() || null
      });

      if (error) throw error;

      // Update the booking status to include a review flag
      await supabase
        .from("bookings")
        .update({ status: "reviewed" })
        .eq("id", bookingId);

      toast.success("Review submitted successfully!");
      fetchReviews();
      fetchRatingData();
      return true;
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review");
      return false;
    }
  };

  const reportReview = async (reviewId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from("reviews")
        .update({ reported: true })
        .eq("id", reviewId);

      if (error) throw error;
      toast.success("Review reported to moderators");
      fetchReviews();
    } catch (error) {
      console.error("Error reporting review:", error);
      toast.error("Failed to report review");
    }
  };

  return {
    reviews,
    loading,
    ratingData,
    submitReview,
    reportReview,
    refreshReviews: fetchReviews
  };
};
