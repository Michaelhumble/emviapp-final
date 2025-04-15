
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface ArtistDashboardStats {
  totalEarnings: number;
  completedBookings: number;
  averageRating: number;
  referralCount: number;
  pendingPayouts: number;
}

export function useArtistDashboardData() {
  const [data, setData] = useState<ArtistDashboardStats>({
    totalEarnings: 0,
    completedBookings: 0,
    averageRating: 0,
    referralCount: 0,
    pendingPayouts: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      setIsLoading(true);
      const { data: res, error } = await supabase.rpc("get_artist_dashboard_stats");

      if (error) {
        console.error("Dashboard data fetch error:", error.message);
        setError(error);
      } else {
        const safeData = res as Partial<ArtistDashboardStats>;
        setData({
          totalEarnings: safeData.totalEarnings ?? 0,
          completedBookings: safeData.completedBookings ?? 0,
          averageRating: safeData.averageRating ?? 0,
          referralCount: safeData.referralCount ?? 0,
          pendingPayouts: safeData.pendingPayouts ?? 0,
        });
      }

      setIsLoading(false);
    };

    fetchDashboardStats();
  }, []);

  return { data, isLoading, error };
}
