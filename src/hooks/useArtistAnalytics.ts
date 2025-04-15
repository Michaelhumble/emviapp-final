
import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';

export interface AnalyticsData {
  profileViews: number;
  totalBookings: number;
  pendingBookings: number;
  completedBookings: number;
  cancelledBookings: number;
}

export interface TopService {
  id: string;
  title: string;
  count: number;
  percentage: number;
}

export interface Period {
  value: string;
  label: string;
  days: number;
}

export interface RevenueData {
  totalRevenue: number;
  averagePerBooking: number;
  percentChange: number;
}

export interface BookingData {
  totalBookings: number;
  pendingBookings: number;
  completedBookings: number;
  cancelledBookings: number;
}

export const ANALYTICS_PERIODS: Period[] = [
  { value: "7days", label: "Last 7 Days", days: 7 },
  { value: "30days", label: "Last 30 Days", days: 30 },
  { value: "90days", label: "Last 90 Days", days: 90 },
  { value: "year", label: "Last Year", days: 365 },
];

export function useArtistAnalytics() {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    profileViews: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    cancelledBookings: 0,
  });
  const [bookings, setBookings] = useState<BookingData>({
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    cancelledBookings: 0,
  });
  const [revenue, setRevenue] = useState<RevenueData>({
    totalRevenue: 0,
    averagePerBooking: 0,
    percentChange: 0,
  });
  const [topServices, setTopServices] = useState<TopService[]>([]);
  const [profileViews, setProfileViews] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [period, setPeriod] = useState<Period>(ANALYTICS_PERIODS[0]);
  
  // Define periods for the analytics
  const periods = useMemo(() => ANALYTICS_PERIODS, []);

  // Fetch analytics data when user or period changes
  useEffect(() => {
    if (user) {
      fetchAnalytics();
    }
  }, [user, period]);

  const fetchAnalytics = async () => {
    if (!user) return;
    setIsLoading(true);
    setError(null);

    try {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - period.days);
      
      // Get profile views
      const { data: viewData, error: viewError } = await supabase
        .from('users')
        .select('profile_views')
        .eq('id', user.id)
        .single();

      if (viewError) throw viewError;

      const profileViews = viewData?.profile_views || 0;
      setProfileViews(profileViews);

      // Fetch bookings by status
      const { data: bookingData, error: bookingError } = await supabase
        .from('bookings')
        .select('status, service_id')
        .eq('recipient_id', user.id)
        .gte('created_at', startDate.toISOString());

      if (bookingError) throw bookingError;

      // Count bookings by status
      let totalBookings = bookingData?.length || 0;
      let pendingBookings = bookingData?.filter(b => b.status === 'pending').length || 0;
      let completedBookings = bookingData?.filter(b => b.status === 'completed').length || 0;
      let cancelledBookings = bookingData?.filter(b => b.status === 'cancelled').length || 0;

      setBookings({
        totalBookings,
        pendingBookings,
        completedBookings,
        cancelledBookings
      });

      // Get completed bookings with service info for revenue calculation
      const { data: completedData, error: completedError } = await supabase
        .from('bookings')
        .select(`
          id,
          services:service_id (
            title,
            price
          )
        `)
        .eq('recipient_id', user.id)
        .eq('status', 'completed')
        .gte('created_at', startDate.toISOString());

      if (completedError) throw completedError;

      // Calculate revenue
      const currentRevenue = completedData?.reduce((sum, booking) => {
        return sum + (booking.services?.price || 0);
      }, 0) || 0;

      // For percentage change, get previous period's data
      const previousStartDate = new Date(startDate);
      previousStartDate.setDate(previousStartDate.getDate() - period.days);
      
      const { data: previousCompletedData, error: previousError } = await supabase
        .from('bookings')
        .select(`
          id,
          services:service_id (
            price
          )
        `)
        .eq('recipient_id', user.id)
        .eq('status', 'completed')
        .gte('created_at', previousStartDate.toISOString())
        .lt('created_at', startDate.toISOString());

      if (previousError) throw previousError;

      const previousRevenue = previousCompletedData?.reduce((sum, booking) => {
        return sum + (booking.services?.price || 0);
      }, 0) || 0;

      // Calculate percentage change
      let percentChange = 0;
      if (previousRevenue > 0) {
        percentChange = ((currentRevenue - previousRevenue) / previousRevenue) * 100;
      }

      // Calculate average booking value
      const averagePerBooking = completedBookings > 0 
        ? currentRevenue / completedBookings 
        : 0;

      setRevenue({
        totalRevenue: currentRevenue,
        averagePerBooking,
        percentChange
      });

      // Get top services
      if (bookingData && bookingData.length > 0) {
        // Get all service IDs from bookings
        const serviceIds = bookingData
          .filter(booking => booking.service_id)
          .map(booking => booking.service_id);

        if (serviceIds.length > 0) {
          // Get service details
          const { data: servicesData, error: servicesError } = await supabase
            .from('services')
            .select('id, title')
            .in('id', serviceIds);

          if (servicesError) throw servicesError;

          // Count occurrences of each service
          const serviceCounts: Record<string, { id: string, title: string, count: number }> = {};
          
          bookingData.forEach(booking => {
            if (booking.service_id) {
              if (!serviceCounts[booking.service_id]) {
                const service = servicesData?.find(s => s.id === booking.service_id);
                if (service) {
                  serviceCounts[booking.service_id] = {
                    id: service.id,
                    title: service.title,
                    count: 0
                  };
                }
              }
              
              if (serviceCounts[booking.service_id]) {
                serviceCounts[booking.service_id].count++;
              }
            }
          });

          // Convert to array and sort by count
          const topServicesArray = Object.values(serviceCounts)
            .sort((a, b) => b.count - a.count)
            .slice(0, 3)
            .map(service => ({
              id: service.id,
              title: service.title,
              count: service.count,
              percentage: (service.count / totalBookings) * 100
            }));

          setTopServices(topServicesArray);
        } else {
          setTopServices([]);
        }
      } else {
        setTopServices([]);
      }

      // Update analytics state with all data
      setAnalytics({
        profileViews,
        totalBookings,
        pendingBookings,
        completedBookings,
        cancelledBookings,
      });
    } catch (err) {
      console.error('Error fetching analytics:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch analytics'));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    analytics,
    bookings,
    revenue,
    topServices,
    profileViews,
    isLoading,
    error,
    period,
    setPeriod,
    periods,
    refreshAnalytics: fetchAnalytics,
  };
}
