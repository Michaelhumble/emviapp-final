import { useState, useEffect } from 'react';
import { supabaseBypass } from "@/types/supabase-bypass";
import { useAuth } from '@/context/auth';
import { Review } from '@/types/reviews';

export function useCustomerReviews() {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = async () => {
    if (!user?.id) return;

    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabaseBypass
        .from('reviews')
        .select('*')
        .eq('customer_id', user.id as any)
        .eq('status', 'active' as any)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Fetch artist/salon details separately
      const reviewsWithDetails = await Promise.all(
        ((data || []) as any[]).map(async (review: any) => {
          let artistData = null;
          let salonData = null;

          if (review?.artist_id) {
            const { data: artist } = await supabaseBypass
              .from('profiles')
              .select('id, full_name, avatar_url')
              .eq('id', review.artist_id as any)
              .maybeSingle();
            artistData = artist;
          }

          if (review?.salon_id) {
            const { data: salon } = await supabaseBypass
              .from('salons')
              .select('id, salon_name')
              .eq('id', review.salon_id as any)
              .maybeSingle();
            salonData = salon;
          }

          return {
            ...review,
            artist: artistData,
            salon: salonData
          } as Review & { artist?: any; salon?: any };
        })
      );

      setReviews(reviewsWithDetails);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setError('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [user?.id]);

  return {
    reviews,
    loading,
    error,
    refetch: fetchReviews
  };
}