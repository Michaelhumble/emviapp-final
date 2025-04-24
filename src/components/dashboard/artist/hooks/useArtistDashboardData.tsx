
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';

export interface ArtistStat {
  label: string;
  value: string | number;
  icon: string;
  change?: number;
}

export interface BookingData {
  id: string;
  client_name: string;
  service_name: string;
  date_requested: string;
  time_requested: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

export const useArtistDashboardData = (activeTab: string) => {
  const { user } = useAuth();
  const [stats, setStats] = useState<ArtistStat[]>([]);
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [recentBookings, setRecentBookings] = useState<BookingData[]>([]);
  const [isLoadingBookings, setIsLoadingBookings] = useState(true);
  const [error, setError] = useState<Error | null>(null);  
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  // Fetch stats when the dashboard is loaded or refreshed
  useEffect(() => {
    if (!user?.id) return;
    
    const fetchDashboardData = async () => {
      try {
        setIsLoadingStats(true);
        setError(null);
        
        // Set a timeout to prevent infinite loading
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Dashboard data fetch timeout')), 10000)
        );
        
        // Create the actual fetch promise
        const fetchPromise = (async () => {
          // In a real implementation, you would fetch real data
          // This is simulated data for demonstration purposes
          
          // Fetch bookings count
          const { count: totalBookings, error: countError } = await supabase
            .from('bookings')
            .select('*', { count: 'exact', head: true })
            .eq('recipient_id', user.id);
            
          if (countError) throw countError;
          
          // Fetch pending bookings
          const { count: pendingCount, error: pendingError } = await supabase
            .from('bookings')
            .select('*', { count: 'exact', head: true })
            .eq('recipient_id', user.id)
            .eq('status', 'pending');
            
          if (pendingError) throw pendingError;
          
          // Fetch this month's earnings
          const startOfMonth = new Date();
          startOfMonth.setDate(1);
          startOfMonth.setHours(0, 0, 0, 0);
          
          // Return the processed data
          return {
            totalBookings: totalBookings || 0,
            pendingBookings: pendingCount || 0,
            monthlyEarnings: Math.floor(Math.random() * 1000) + 500 // Placeholder
          };
        })();
        
        // Race between timeout and fetch
        const result = await Promise.race([fetchPromise, timeoutPromise]);
        
        setStats([
          {
            label: 'Total Bookings',
            value: result.totalBookings,
            icon: 'calendar',
            change: 5
          },
          {
            label: 'Pending Requests',
            value: result.pendingBookings,
            icon: 'clock',
            change: -2
          },
          {
            label: 'This Month',
            value: `$${result.monthlyEarnings}`,
            icon: 'dollar-sign',
            change: 12
          },
          {
            label: 'Avg. Rating',
            value: '4.8',
            icon: 'star',
            change: 0.2
          }
        ]);
        
        setLastRefresh(new Date());
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError(err instanceof Error ? err : new Error('Failed to load dashboard data'));
      } finally {
        setIsLoadingStats(false);
      }
    };
    
    fetchDashboardData();
  }, [user?.id]);
  
  // Fetch recent bookings for the overview tab
  useEffect(() => {
    if (!user?.id || activeTab !== 'Overview') return;
    
    const fetchRecentBookings = async () => {
      try {
        setIsLoadingBookings(true);
        
        const { data, error } = await supabase
          .from('bookings')
          .select('*')
          .eq('recipient_id', user.id)
          .order('created_at', { ascending: false })
          .limit(5);
          
        if (error) throw error;
        
        // Transform to expected format
        const formattedBookings = (data || []).map(booking => ({
          id: booking.id,
          client_name: booking.client_name || 'Unknown Client',
          service_name: booking.service_type || 'Service',
          date_requested: booking.date_requested || '',
          time_requested: booking.time_requested || '',
          status: booking.status as 'pending' | 'confirmed' | 'completed' | 'cancelled'
        }));
        
        setRecentBookings(formattedBookings);
      } catch (err) {
        console.error('Error fetching recent bookings:', err);
        // Don't set the main error state for this secondary data
      } finally {
        setIsLoadingBookings(false);
      }
    };
    
    fetchRecentBookings();
  }, [user?.id, activeTab]);
  
  // Add default earnings data
  const earningsData = {
    monthly_earnings: [
      {month: "Jan", amount: 2400},
      {month: "Feb", amount: 1398},
      {month: "Mar", amount: 2800},
      {month: "Apr", amount: 3908},
      {month: "May", amount: 4800},
      {month: "Jun", amount: 3800},
    ],
    total_earnings: 21450,
    pending_payouts: 1250
  };
  
  const isLoadingEarnings = false;
  
  return {
    stats,
    isLoadingStats,
    recentBookings,
    isLoadingBookings,
    error,
    lastRefresh,
    earningsData,
    isLoadingEarnings
  };
};
