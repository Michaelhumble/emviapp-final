import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';

export interface DashboardStats {
  totalRevenue: number;
  newCustomers: number;
  totalBookings: number;
  averageRating: number;
}

export function useOwnerDashboardData() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalRevenue: 0,
    newCustomers: 0,
    totalBookings: 0,
    averageRating: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (user) {
      fetchDashboardData('week'); // Default period
    } else {
      setIsLoading(false);
    }
  }, [user]);

  const fetchDashboardData = async (period: string) => {
    if (!user) return;

    setIsLoading(true);
    setError(null);

    try {
      const { start, end } = getDateRange(period);

      // Fetch total revenue
      const { data: revenueData, error: revenueError } = await supabase
        .from('bookings')
        .select('service_price')
        .eq('recipient_id', user.id)
        .gte('created_at', start.toISOString())
        .lte('created_at', end.toISOString());

      if (revenueError) throw new Error(revenueError.message);

      const totalRevenue = revenueData?.reduce((sum, booking) => sum + (booking.service_price || 0), 0) || 0;

      // Fetch new customers
      const { data: customerData, error: customerError } = await supabase
        .from('users')
        .select('id')
        .eq('role', 'customer')
        .gte('created_at', start.toISOString())
        .lte('created_at', end.toISOString());

      if (customerError) throw new Error(customerError.message);

      const newCustomers = customerData?.length || 0;

      // Fetch total bookings
      const { data: bookingData, error: bookingError } = await supabase
        .from('bookings')
        .select('id')
        .eq('recipient_id', user.id)
        .gte('created_at', start.toISOString())
        .lte('created_at', end.toISOString());

      if (bookingError) throw new Error(bookingError.message);

      const totalBookings = bookingData?.length || 0;

      // Fetch average rating (this is a placeholder, you'll need to adapt it to your data structure)
      const averageRating = 4.5; // Replace with actual data fetching

      setStats({
        totalRevenue,
        newCustomers,
        totalBookings,
        averageRating,
      });
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch dashboard data'));
    } finally {
      setIsLoading(false);
    }
  };

  const getDateRange = (period: string) => {
    let start = new Date();
    let end = new Date();

    switch (period) {
      case 'week':
        start.setDate(start.getDate() - 7);
        break;
      case 'month':
        start.setMonth(start.getMonth() - 1);
        break;
      case 'year':
        start.setFullYear(start.getFullYear() - 1);
        break;
      default:
        start.setDate(start.getDate() - 7); // Default to week
    }

    return { start, end };
  };

  return {
    stats,
    isLoading,
    error,
    fetchDashboardData,
  };
}
