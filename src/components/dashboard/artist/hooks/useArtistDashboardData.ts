
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { 
  DashboardStats, 
  BookingWithDetails, 
  EarningsData 
} from '../types/ArtistDashboardTypes';
import { format, subMonths, startOfMonth, endOfMonth } from 'date-fns';

export const useArtistDashboardData = (activeTab: string) => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    booking_count: 0,
    completed_services: 0,
    total_earnings: 0,
    average_rating: 0,
    referral_count: 0,
    repeat_client_percentage: 0
  });
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [recentBookings, setRecentBookings] = useState<BookingWithDetails[]>([]);
  const [isLoadingBookings, setIsLoadingBookings] = useState(true);
  const [earningsData, setEarningsData] = useState<EarningsData>({
    monthly_earnings: [],
    total_earnings: 0,
    pending_payouts: 0
  });
  const [isLoadingEarnings, setIsLoadingEarnings] = useState(true);

  // Fetch data when tab changes or user changes
  useEffect(() => {
    if (!user?.id) return;
    
    if (activeTab === 'overview') {
      fetchStatsData();
      fetchRecentBookings();
    } else if (activeTab === 'earnings') {
      fetchEarningsData();
    }
  }, [activeTab, user]);

  const fetchStatsData = async () => {
    if (!user?.id) return;
    
    setIsLoadingStats(true);
    try {
      // Get booking stats
      const { data: bookingData, error: bookingError } = await supabase
        .from('appointments')
        .select('id, status')
        .eq('artist_id', user.id);
      
      if (bookingError) throw bookingError;
      
      // Get completed bookings with earnings data
      const { data: completedBookingsData, error: completedError } = await supabase
        .from('completed_bookings')
        .select('commission_earned')
        .eq('artist_id', user.id);
      
      if (completedError) throw completedError;
      
      // Get ratings data
      const { data: ratingsData, error: ratingsError } = await supabase
        .from('reviews')
        .select('rating')
        .eq('artist_id', user.id)
        .eq('status', 'active');
      
      if (ratingsError) throw ratingsError;
      
      // Count referrals
      const { count: referralCount, error: referralError } = await supabase
        .from('referrals')
        .select('id', { count: 'exact' })
        .eq('referrer_id', user.id);
      
      if (referralError) throw referralError;
      
      // Calculate repeat clients
      const { data: clientsData, error: clientsError } = await supabase
        .from('appointments')
        .select('customer_id, count')
        .eq('artist_id', user.id)
        .not('customer_id', 'is', null)
        .group('customer_id');
      
      if (clientsError) throw clientsError;
      
      // Calculate stats from fetched data
      const bookingCount = bookingData?.length || 0;
      const completedServices = completedBookingsData?.length || 0;
      
      // Sum total earnings
      const totalEarnings = completedBookingsData?.reduce((sum, booking) => 
        sum + (booking.commission_earned || 0), 0) || 0;
      
      // Calculate average rating
      const ratings = ratingsData?.map(r => r.rating) || [];
      const averageRating = ratings.length 
        ? parseFloat((ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length).toFixed(1))
        : 0;
      
      // Calculate repeat client percentage
      const repeatClients = clientsData?.filter(client => (client.count as number) > 1).length || 0;
      const totalClients = clientsData?.length || 0;
      const repeatClientPercentage = totalClients 
        ? Math.round((repeatClients / totalClients) * 100) 
        : 0;
      
      setStats({
        booking_count: bookingCount,
        completed_services: completedServices,
        total_earnings: totalEarnings,
        average_rating: averageRating,
        referral_count: referralCount || 0,
        repeat_client_percentage: repeatClientPercentage
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Use fallback stats
      setStats({
        booking_count: 0,
        completed_services: 0,
        total_earnings: 0,
        average_rating: 0,
        referral_count: 0,
        repeat_client_percentage: 0
      });
    } finally {
      setIsLoadingStats(false);
    }
  };

  const fetchRecentBookings = async () => {
    if (!user?.id) return;
    
    setIsLoadingBookings(true);
    try {
      // Get recent bookings with service details
      const { data, error } = await supabase
        .from('appointments')
        .select(`
          id, 
          artist_id,
          customer_id, 
          customer_name,
          service_id, 
          start_time, 
          end_time, 
          status, 
          created_at,
          notes,
          services (
            title,
            price
          )
        `)
        .eq('artist_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);
      
      if (error) throw error;
      
      // Transform data to match BookingWithDetails
      const transformedBookings: BookingWithDetails[] = data.map(booking => ({
        id: booking.id,
        sender_id: booking.customer_id || '',
        recipient_id: booking.artist_id,
        client_name: booking.customer_name || 'Client',
        service_name: booking.services?.title || 'Service',
        service_id: booking.service_id,
        date_requested: format(new Date(booking.start_time), 'yyyy-MM-dd'),
        time_requested: format(new Date(booking.start_time), 'h:mm a'),
        appointment_time: booking.start_time,
        status: booking.status as any,
        created_at: booking.created_at,
        price: booking.services?.price,
        note: booking.notes
      }));
      
      setRecentBookings(transformedBookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setRecentBookings([]);
    } finally {
      setIsLoadingBookings(false);
    }
  };

  const fetchEarningsData = async () => {
    if (!user?.id) return;
    
    setIsLoadingEarnings(true);
    try {
      // Get monthly earnings for last 6 months
      const months = Array.from({ length: 6 }, (_, i) => {
        const date = subMonths(new Date(), i);
        return {
          start: startOfMonth(date).toISOString(),
          end: endOfMonth(date).toISOString(),
          name: format(date, 'MMM')
        };
      }).reverse();
      
      const monthlyEarnings = await Promise.all(
        months.map(async (month) => {
          const { data, error } = await supabase
            .from('completed_bookings')
            .select('commission_earned')
            .eq('artist_id', user.id)
            .gte('completed_at', month.start)
            .lte('completed_at', month.end);
          
          if (error) throw error;
          
          const amount = data.reduce((sum, booking) => 
            sum + (booking.commission_earned || 0), 0);
          
          return { month: month.name, amount };
        })
      );
      
      // Get total earnings (all time)
      const { data: totalData, error: totalError } = await supabase
        .from('completed_bookings')
        .select('commission_earned')
        .eq('artist_id', user.id);
      
      if (totalError) throw totalError;
      
      const totalEarnings = totalData.reduce((sum, booking) => 
        sum + (booking.commission_earned || 0), 0);
      
      // Get pending payouts (completed but not paid)
      const { data: pendingData, error: pendingError } = await supabase
        .from('completed_bookings')
        .select('commission_earned')
        .eq('artist_id', user.id)
        .eq('paid', false);
      
      if (pendingError) throw pendingError;
      
      const pendingPayouts = pendingData.reduce((sum, booking) => 
        sum + (booking.commission_earned || 0), 0);
      
      setEarningsData({
        monthly_earnings: monthlyEarnings,
        total_earnings: totalEarnings,
        pending_payouts: pendingPayouts
      });
    } catch (error) {
      console.error('Error fetching earnings data:', error);
      // Use fallback data
      setEarningsData({
        monthly_earnings: [
          { month: 'Jan', amount: 0 },
          { month: 'Feb', amount: 0 },
          { month: 'Mar', amount: 0 },
          { month: 'Apr', amount: 0 },
          { month: 'May', amount: 0 },
          { month: 'Jun', amount: 0 }
        ],
        total_earnings: 0,
        pending_payouts: 0
      });
    } finally {
      setIsLoadingEarnings(false);
    }
  };

  return {
    stats,
    isLoadingStats,
    recentBookings,
    isLoadingBookings,
    earningsData,
    isLoadingEarnings
  };
};
