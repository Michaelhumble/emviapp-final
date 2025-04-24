
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';

interface ArtistStats {
  upcoming_bookings: number;
  total_bookings: number;
  earnings_this_month: number;
  total_clients: number;
}

interface ArtistDataContextType {
  loading: boolean;
  error: Error | null;
  stats: ArtistStats;
  refreshData: () => Promise<void>;
}

const defaultStats: ArtistStats = {
  upcoming_bookings: 0,
  total_bookings: 0,
  earnings_this_month: 0,
  total_clients: 0
};

const ArtistDataContext = createContext<ArtistDataContextType>({
  loading: false,
  error: null,
  stats: defaultStats,
  refreshData: async () => {}
});

export const useArtistData = () => useContext(ArtistDataContext);

interface ArtistDataProviderProps {
  children: ReactNode;
}

export const ArtistDataProvider = ({ children }: ArtistDataProviderProps) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [stats, setStats] = useState<ArtistStats>(defaultStats);
  const [loadAttempts, setLoadAttempts] = useState(0);

  const fetchArtistData = async () => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setLoadAttempts(prev => prev + 1);
      
      // Break out if we've tried too many times to prevent loops
      if (loadAttempts > 5) {
        throw new Error("Too many load attempts. Please refresh the page.");
      }

      // Fetch artist stats from Supabase
      // This is a placeholder for actual data fetching logic
      // In a real implementation, you would query your database tables
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('recipient_id', user.id);

      if (error) throw error;

      // Process the data to calculate stats
      const upcomingBookings = (data || []).filter(booking => 
        booking.status === 'pending' || booking.status === 'confirmed'
      ).length;

      const totalBookings = (data || []).length;
      
      // Mock earnings calculation - in real app, you'd query a proper earnings table
      const earningsThisMonth = (data || [])
        .filter(booking => booking.status === 'completed')
        .reduce((sum, booking) => sum + (booking.price || 0), 0);
      
      // Get unique client count
      const uniqueClients = new Set((data || []).map(booking => booking.sender_id));

      setStats({
        upcoming_bookings: upcomingBookings,
        total_bookings: totalBookings,
        earnings_this_month: earningsThisMonth,
        total_clients: uniqueClients.size
      });
      
      // Reset error state if successful
      setError(null);
      
    } catch (err) {
      console.error('Error fetching artist data:', err);
      setError(err instanceof Error ? err : new Error('Failed to load artist data'));
    } finally {
      setLoading(false);
    }
  };

  // Initial data load
  useEffect(() => {
    fetchArtistData();
  }, [user?.id]);

  // Set up error recovery with retry mechanism
  useEffect(() => {
    if (error && loadAttempts < 3) {
      // Auto-retry once after a brief delay
      const retryTimer = setTimeout(() => {
        console.log(`Retrying artist data fetch (attempt ${loadAttempts + 1})`);
        fetchArtistData();
      }, 3000); // 3 second delay before retry
      
      return () => clearTimeout(retryTimer);
    }
  }, [error, loadAttempts]);

  return (
    <ArtistDataContext.Provider value={{ loading, error, stats, refreshData: fetchArtistData }}>
      {children}
    </ArtistDataContext.Provider>
  );
};
