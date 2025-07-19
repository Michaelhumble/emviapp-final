
import { useState, useEffect } from "react";
import { supabaseBypass } from "@/types/supabase-bypass";
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
      // We need to specify the type conversion here because 'reviews' might not be in the generated types yet
      let query = supabaseBypass
        .from('reviews')
        .select('*')
        .eq('status', 'active' as any);

      if (artistId) {
        query = query.eq('artist_id', artistId as any);
      }

      if (salonId) {
        query = query.eq('salon_id', salonId as any);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      // Use a type assertion since we know the structure matches
      setReviews(data as unknown as Review[]);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRatingData = async () => {
    if (!artistId) return;
    
    try {
      // Query individual reviews and calculate average and count
      const { data: reviewsData, error } = await supabaseBypass
        .from('reviews')
        .select('rating')
        .eq('artist_id', artistId as any)
        .eq('status', 'active' as any);

      if (error) throw error;
      
      if (reviewsData && reviewsData.length > 0) {
        const average = (reviewsData as any[]).reduce((sum, review) => sum + ((review as any)?.rating || 0), 0) / reviewsData.length;
        setRatingData({
          average_rating: parseFloat(average.toFixed(1)),
          review_count: reviewsData.length
        });
      } else {
        setRatingData({ average_rating: 0, review_count: 0 });
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
      // Check if user can review this booking (sender and completed status)
      const { data: bookingData, error: bookingError } = await supabaseBypass
        .from('bookings')
        .select('*')
        .eq('id', bookingId as any)
        .eq('sender_id', user.id as any)
        .eq('status', 'completed' as any)
        .single();

      if (bookingError || !bookingData) {
        toast.error("You cannot review this booking");
        return false;
      }
      
      // Check if review already exists
      const { data: existingReview, error: reviewCheckError } = await supabaseBypass
        .from('reviews')
        .select('id')
        .eq('booking_id', bookingId as any)
        .maybeSingle();
        
      if (reviewCheckError) throw reviewCheckError;
      
      if (existingReview) {
        toast.error("You have already reviewed this booking");
        return false;
      }

      // Submit the review
      const { error } = await supabaseBypass
        .from('reviews')
        .insert({
          booking_id: bookingId,
          artist_id: artistId,
          customer_id: user.id,
          salon_id: salonId || null,
          rating,
          comment: comment.trim() || null
        } as any);

      if (error) throw error;

      // Update the booking status to include a review flag
      await supabaseBypass
        .from('bookings')
        .update({ status: 'reviewed' } as any)
        .eq('id', bookingId as any);

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
      const { error } = await supabaseBypass
        .from('reviews')
        .update({ reported: true } as any)
        .eq('id', reviewId as any);

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
