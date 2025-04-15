
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";

export interface ArtistDashboardStats {
  totalEarnings: number;
  completedBookings: number;
  averageRating: number;
  referralCount: number;
  pendingPayouts: number;
}

export function useArtistDashboardData() {
  const { user } = useAuth();
  const [data, setData] = useState<ArtistDashboardStats>({
    totalEarnings: 0,
    completedBookings: 0,
    averageRating: 0,
    referralCount: 0,
    pendingPayouts: 0
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch dashboard stats
  useEffect(() => {
    if (!user) return;
    
    const fetchDashboardStats = async () => {
      setIsLoading(true);
      try {
        // Fetch basic stats directly
        const { data: bookings, error: bookingsError } = await supabase
          .from('bookings')
          .select('*')
          .eq('recipient_id', user.id);
          
        const { data: completedBookings, error: completedError } = await supabase
          .from('bookings')
          .select('*')
          .eq('recipient_id', user.id)
          .eq('status', 'completed');
          
        const { data: reviewsData, error: reviewsError } = await supabase
          .from('reviews')
          .select('rating')
          .eq('artist_id', user.id);
          
        const { data: referrals, error: referralsError } = await supabase
          .from('referrals')
          .select('*')
          .eq('referrer_id', user.id);
          
        if (bookingsError || completedError || reviewsError || referralsError) {
          throw new Error("Error fetching dashboard stats");
        }
        
        // Calculate average rating
        const avgRating = reviewsData && reviewsData.length > 0
          ? reviewsData.reduce((sum, review) => sum + (review.rating || 0), 0) / reviewsData.length
          : 0;
          
        // Calculate mock earnings based on completed bookings (for demonstration)
        const totalEarnings = (completedBookings?.length || 0) * 100;
        
        // Set the data in the format expected by the component
        setData({
          totalEarnings: totalEarnings,
          completedBookings: completedBookings?.length || 0,
          averageRating: avgRating,
          referralCount: referrals?.length || 0,
          pendingPayouts: totalEarnings * 0.2 // Mock pending amount (20% of total)
        });
      } catch (err) {
        console.error("Dashboard data fetch error:", err);
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardStats();
  }, [user]);

  return { data, isLoading, error };
}
