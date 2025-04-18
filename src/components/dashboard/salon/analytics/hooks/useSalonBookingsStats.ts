
import { useState, useEffect } from 'react';
import { useSalon } from '@/context/salon';
import { supabase } from '@/integrations/supabase/client';
import { BookingsStats, ChartBookingData } from '@/types/salon';

interface BookingData {
  status: string;
  created_at: string;
}

export const useSalonBookingsStats = () => {
  const { currentSalon } = useSalon();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [stats, setStats] = useState<BookingsStats>({
    total: 0,
    pending: 0,
    accepted: 0,
    completed: 0,
    cancelled: 0,
    chartData: []
  });

  useEffect(() => {
    const fetchBookingStats = async () => {
      if (!currentSalon) return;
      
      try {
        setIsLoading(true);
        
        // Get bookings data
        const { data: bookingsData, error: bookingsError } = await supabase
          .from('bookings')
          .select('status, created_at')
          .eq('salon_id', currentSalon.id);
          
        if (bookingsError) throw bookingsError;
        
        // Define stats object with initial values
        const counts: BookingsStats = {
          total: 0,
          pending: 0,
          accepted: 0,
          completed: 0,
          cancelled: 0,
          chartData: []
        };
        
        if (bookingsData && bookingsData.length > 0) {
          // Count statuses manually
          bookingsData.forEach((booking: BookingData) => {
            const status = booking.status as string;
            
            // Increment total
            counts.total += 1;
            
            // Increment specific status
            if (status === 'pending') counts.pending += 1;
            else if (status === 'accepted') counts.accepted += 1;
            else if (status === 'completed') counts.completed += 1;
            else if (status === 'cancelled') counts.cancelled += 1;
          });
          
          // Process weekly data for chart
          counts.chartData = processWeeklyData(bookingsData);
        }
        
        setStats(counts);
      } catch (err) {
        console.error('Error fetching salon booking stats:', err);
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBookingStats();
  }, [currentSalon]);
  
  return { stats, isLoading, error };
};

// Helper function to process weekly data
const processWeeklyData = (data: BookingData[]): ChartBookingData[] => {
  // Group bookings by week
  const weeks: Record<string, number> = {};
  
  // Get bookings from the last 12 weeks
  const now = new Date();
  const twelveWeeksAgo = new Date();
  twelveWeeksAgo.setDate(now.getDate() - 12 * 7);
  
  // Initialize the last 12 weeks with 0 counts
  for (let i = 0; i < 12; i++) {
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - (i * 7));
    const weekLabel = `Week ${12-i}`;
    weeks[weekLabel] = 0;
  }
  
  // Count bookings per week
  data.forEach((booking: BookingData) => {
    const bookingDate = new Date(booking.created_at);
    if (bookingDate >= twelveWeeksAgo) {
      // Find which week this belongs to
      const weeksAgo = Math.floor((now.getTime() - bookingDate.getTime()) / (7 * 24 * 60 * 60 * 1000));
      const weekLabel = `Week ${12-weeksAgo}`;
      if (weeks[weekLabel] !== undefined) {
        weeks[weekLabel]++;
      }
    }
  });
  
  // Convert to array format for the chart
  return Object.entries(weeks).map(([weekLabel, count]) => ({
    weekLabel,
    count
  })).reverse();
};
