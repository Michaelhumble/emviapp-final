
import { useState } from 'react';
import type { DashboardStats } from '@/components/dashboard/artist/types/ArtistDashboardTypes';
import { supabase } from '@/integrations/supabase/client';

export const useArtistStats = (artistId: string | undefined) => {
  const [stats, setStats] = useState<DashboardStats>({
    booking_count: 0,
    completed_services: 0,
    total_earnings: 0,
    average_rating: 0,
    referral_count: 0
  });
  const [isLoadingStats, setIsLoadingStats] = useState(true);

  const fetchStats = async () => {
    if (!artistId) return;
    
    try {
      setIsLoadingStats(true);
      const { data: bookings } = await supabase
        .from('bookings')
        .select('status')
        .eq('recipient_id', artistId);
        
      const counts = {
        booking_count: bookings?.length || 0,
        completed_services: bookings?.filter(b => b.status === 'completed').length || 0,
        total_earnings: 0, // Fetch from earnings table if needed
        average_rating: 0,
        referral_count: 0
      };
      
      setStats(counts);
    } catch (error) {
      console.error('Error fetching artist stats:', error);
    } finally {
      setIsLoadingStats(false);
    }
  };

  return { stats, isLoadingStats, fetchStats };
};
