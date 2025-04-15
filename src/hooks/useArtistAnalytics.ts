
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';

export interface AnalyticsPeriod {
  label: string;
  value: string;
  days: number;
}

export interface BookingSummary {
  totalBookings: number;
  completedBookings: number;
  pendingBookings: number;
  cancelledBookings: number;
}

export interface RevenueSummary {
  totalRevenue: number;
  averagePerBooking: number;
  percentChange: number;
}

export interface TopService {
  id: string;
  title: string;
  count: number;
  percentage: number;
}

export interface AnalyticsData {
  bookings: BookingSummary;
  revenue: RevenueSummary;
  topServices: TopService[];
  profileViews: number;
  isLoading: boolean;
  error: Error | null;
}

export const ANALYTICS_PERIODS: AnalyticsPeriod[] = [
  { label: 'Last 7 Days', value: 'week', days: 7 },
  { label: 'Last 30 Days', value: 'month', days: 30 },
  { label: 'Last 90 Days', value: 'quarter', days: 90 },
  { label: 'This Year', value: 'year', days: 365 },
];

export function useArtistAnalytics() {
  const { user } = useAuth();
  const [period, setPeriod] = useState<AnalyticsPeriod>(ANALYTICS_PERIODS[0]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    bookings: { totalBookings: 0, completedBookings: 0, pendingBookings: 0, cancelledBookings: 0 },
    revenue: { totalRevenue: 0, averagePerBooking: 0, percentChange: 0 },
    topServices: [],
    profileViews: 0,
    isLoading: true,
    error: null
  });

  useEffect(() => {
    if (user) {
      fetchAnalytics();
    } else {
      setIsLoading(false);
    }
  }, [user, period]);

  const fetchAnalytics = async () => {
    if (!user) return;

    setIsLoading(true);
    setError(null);

    try {
      // Calculate date ranges
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - period.days);
      
      // Previous period for comparison
      const prevEndDate = new Date(startDate);
      const prevStartDate = new Date(startDate);
      prevStartDate.setDate(prevStartDate.getDate() - period.days);

      // 1. Fetch booking data
      const { data: bookingData, error: bookingError } = await supabase
        .from('bookings')
        .select('id, status, service_id, created_at')
        .eq('recipient_id', user.id)
        .gte('created_at', startDate.toISOString())
        .lte('created_at', endDate.toISOString());

      if (bookingError) throw new Error(bookingError.message);

      // 2. Fetch completed bookings for revenue data
      const { data: completedData, error: completedError } = await supabase
        .from('completed_bookings')
        .select('service_price')
        .eq('artist_id', user.id)
        .gte('completed_at', startDate.toISOString())
        .lte('completed_at', endDate.toISOString());

      if (completedError) throw new Error(completedError.message);

      // 3. Fetch previous period data for comparison
      const { data: prevCompletedData, error: prevCompletedError } = await supabase
        .from('completed_bookings')
        .select('id')
        .eq('artist_id', user.id)
        .gte('completed_at', prevStartDate.toISOString())
        .lte('completed_at', prevEndDate.toISOString());

      if (prevCompletedError) throw new Error(prevCompletedError.message);

      // 4. Fetch profile views
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('profile_views')
        .eq('id', user.id)
        .single();

      if (userError) throw new Error(userError.message);

      // 5. Calculate top services
      const serviceCount: Record<string, number> = {};
      bookingData?.forEach(booking => {
        if (booking.service_id) {
          serviceCount[booking.service_id] = (serviceCount[booking.service_id] || 0) + 1;
        }
      });

      // Fetch service details for the top services
      const serviceIds = Object.keys(serviceCount);
      const { data: servicesData, error: servicesError } = await supabase
        .from('services')
        .select('id, title')
        .in('id', serviceIds.length > 0 ? serviceIds : ['no-services']);

      if (servicesError) throw new Error(servicesError.message);

      // Calculate top services with percentages
      const totalServiceCount = Object.values(serviceCount).reduce((sum, count) => sum + count, 0);
      const topServices = servicesData
        ?.map(service => ({
          id: service.id,
          title: service.title,
          count: serviceCount[service.id] || 0,
          percentage: totalServiceCount > 0 
            ? ((serviceCount[service.id] || 0) / totalServiceCount) * 100 
            : 0
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 3);

      // Process booking stats
      const totalBookings = bookingData?.length || 0;
      const completedBookings = bookingData?.filter(b => b.status === 'completed')?.length || 0;
      const pendingBookings = bookingData?.filter(b => b.status === 'pending')?.length || 0;
      const cancelledBookings = bookingData?.filter(b => b.status === 'cancelled' || b.status === 'declined')?.length || 0;

      // Calculate revenue metrics
      const totalRevenue = completedData?.reduce((sum, booking) => sum + (booking.service_price || 0), 0) || 0;
      const averagePerBooking = completedBookings > 0 ? totalRevenue / completedBookings : 0;
      
      // Calculate percent change in revenue
      const prevPeriodBookings = prevCompletedData?.length || 0;
      let percentChange = 0;
      if (prevPeriodBookings > 0) {
        percentChange = ((completedBookings - prevPeriodBookings) / prevPeriodBookings) * 100;
      }

      // Set the analytics data
      setAnalyticsData({
        bookings: {
          totalBookings,
          completedBookings,
          pendingBookings,
          cancelledBookings
        },
        revenue: {
          totalRevenue,
          averagePerBooking,
          percentChange
        },
        topServices: topServices || [],
        profileViews: userData?.profile_views || 0,
        isLoading: false,
        error: null
      });
    } catch (err) {
      console.error('Error fetching analytics:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch analytics'));
      setAnalyticsData(prev => ({ ...prev, isLoading: false, error: err as Error }));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    ...analyticsData,
    period,
    setPeriod,
    isLoading,
    error,
    periods: ANALYTICS_PERIODS,
    refreshAnalytics: fetchAnalytics
  };
}
