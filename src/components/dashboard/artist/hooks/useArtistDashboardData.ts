
import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";
import { BookingWithDetails } from "@/hooks/artist/hooks/useArtistBookings";
import { Booking } from "@/types/booking";

// Define interfaces for better type safety
export interface DashboardStats {
  totalBookings: number;
  pendingBookings: number;
  completedBookings: number;
  totalEarnings: number;
  averageRating: number;
}

export interface EarningsData {
  currentMonth: number;
  previousMonth: number;
  total: number;
}

export function useArtistDashboardData(activeTab: string) {
  const [stats, setStats] = useState<DashboardStats>({
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    totalEarnings: 0,
    averageRating: 0
  });
  const [recentBookings, setRecentBookings] = useState<BookingWithDetails[]>([]);
  const [earningsData, setEarningsData] = useState<EarningsData>({
    currentMonth: 0,
    previousMonth: 0,
    total: 0
  });
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [isLoadingBookings, setIsLoadingBookings] = useState(true);
  const [isLoadingEarnings, setIsLoadingEarnings] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  const { user } = useAuth();
  
  useEffect(() => {
    if (!user) return;
    
    const fetchDashboardData = async () => {
      try {
        setIsLoadingStats(true);
        setError(null);
        
        // Fetch booking stats
        const { data: bookingsData, error: bookingsError } = await supabase
          .from('bookings')
          .select('*')
          .eq('recipient_id', user.id);
          
        if (bookingsError) throw bookingsError;
        
        // Calculate stats
        const totalBookings = bookingsData?.length || 0;
        const pendingBookings = bookingsData?.filter(b => b.status === 'pending').length || 0;
        const completedBookings = bookingsData?.filter(b => b.status === 'completed').length || 0;
        
        // Fetch earnings data (from completed_bookings table if available)
        const { data: earningsData, error: earningsError } = await supabase
          .from('completed_bookings')
          .select('commission_earned, created_at')
          .eq('artist_id', user.id);
          
        if (earningsError && earningsError.message !== 'No rows found') {
          console.error("Earnings data error:", earningsError);
          // Continue execution even if this fails
        }
        
        // Calculate earnings
        const totalEarnings = earningsData ? 
          earningsData.reduce((sum, item) => sum + (item.commission_earned || 0), 0) : 
          0;
        
        // Mock average rating for now
        const averageRating = 4.8;
        
        setStats({
          totalBookings,
          pendingBookings,
          completedBookings,
          totalEarnings,
          averageRating
        });
        
        // Set mock earnings data
        setEarningsData({
          currentMonth: totalEarnings * 0.6,
          previousMonth: totalEarnings * 0.4,
          total: totalEarnings
        });
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
        setError(err instanceof Error ? err : new Error('Failed to load dashboard data'));
      } finally {
        setIsLoadingStats(false);
        setIsLoadingEarnings(false);
      }
      
      try {
        setIsLoadingBookings(true);
        
        // Fetch recent bookings
        const { data: recentBookingsData, error: recentBookingsError } = await supabase
          .from('bookings')
          .select('*')
          .eq('recipient_id', user.id)
          .order('created_at', { ascending: false })
          .limit(5);
          
        if (recentBookingsError) throw recentBookingsError;
        
        setRecentBookings(recentBookingsData as BookingWithDetails[] || []);
      } catch (err) {
        console.error("Error fetching recent bookings:", err);
        setError(err instanceof Error ? err : new Error('Failed to load recent bookings'));
      } finally {
        setIsLoadingBookings(false);
      }
    };
    
    if (activeTab === 'Overview') {
      fetchDashboardData();
    } else {
      // Reset loading states for other tabs
      setIsLoadingStats(false);
      setIsLoadingBookings(false);
      setIsLoadingEarnings(false);
    }
  }, [user, activeTab]);
  
  return {
    stats,
    isLoadingStats,
    recentBookings,
    isLoadingBookings,
    earningsData,
    isLoadingEarnings,
    error
  };
}
