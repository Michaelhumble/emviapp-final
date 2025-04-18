
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { format, startOfWeek, endOfWeek, subWeeks, addWeeks } from 'date-fns';

type BookingStats = {
  totalBookings: number;
  totalRevenue: number;
  avgBookingsPerWeek: number;
  recentBookings: Array<{
    date: string;
    count: number;
    revenue: number;
  }>;
};

type BookingStatsOptions = {
  salonId: string;
  startDate?: Date;
  endDate?: Date;
  timeFrame?: 'weekly' | 'monthly' | 'yearly';
};

export const useSalonBookingsStats = ({ 
  salonId, 
  startDate = new Date(), 
  endDate, 
  timeFrame = 'weekly' 
}: BookingStatsOptions) => {
  const [stats, setStats] = useState<BookingStats>({
    totalBookings: 0,
    totalRevenue: 0,
    avgBookingsPerWeek: 0,
    recentBookings: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        
        // Adjust date range based on timeFrame
        const adjustedStartDate = timeFrame === 'weekly' 
          ? startOfWeek(startDate) 
          : timeFrame === 'monthly'
            ? startOfMonth(startDate)
            : startOfYear(startDate);
        
        const adjustedEndDate = endDate || (
          timeFrame === 'weekly' 
            ? endOfWeek(startDate)
            : timeFrame === 'monthly'
              ? endOfMonth(startDate)
              : endOfYear(startDate)
        );

        const { data, error } = await supabase
          .from('completed_bookings')
          .select('*')
          .eq('salon_id', salonId)
          .gte('completed_at', adjustedStartDate.toISOString())
          .lte('completed_at', adjustedEndDate.toISOString());

        if (error) throw error;

        // Process booking stats
        const totalBookings = data.length;
        const totalRevenue = data.reduce((sum, booking) => sum + (booking.service_price || 0), 0);
        const avgBookingsPerWeek = totalBookings / getWeeksBetween(adjustedStartDate, adjustedEndDate);

        const recentBookings = processRecentBookings(data);

        setStats({
          totalBookings,
          totalRevenue,
          avgBookingsPerWeek,
          recentBookings
        });
      } catch (err) {
        console.error('Error fetching salon booking stats:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [salonId, startDate, endDate, timeFrame]);

  return { stats, loading, error };
};

// Utility functions
const getWeeksBetween = (start: Date, end: Date): number => {
  const days = (end.getTime() - start.getTime()) / (1000 * 3600 * 24);
  return days / 7;
};

const processRecentBookings = (bookings: any[]) => {
  const bookingsByDate: Record<string, { count: number; revenue: number }> = {};

  bookings.forEach(booking => {
    const date = format(new Date(booking.completed_at), 'yyyy-MM-dd');
    if (!bookingsByDate[date]) {
      bookingsByDate[date] = { count: 0, revenue: 0 };
    }
    bookingsByDate[date].count++;
    bookingsByDate[date].revenue += booking.service_price || 0;
  });

  return Object.entries(bookingsByDate).map(([date, data]) => ({
    date,
    ...data
  }));
};

// Add missing date utility functions
const startOfMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

const endOfMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};

const startOfYear = (date: Date): Date => {
  return new Date(date.getFullYear(), 0, 1);
};

const endOfYear = (date: Date): Date => {
  return new Date(date.getFullYear(), 11, 31);
};
