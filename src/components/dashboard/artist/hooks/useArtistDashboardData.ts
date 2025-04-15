
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { 
  DashboardStats, 
  BookingWithDetails, 
  EarningsData 
} from '../types/ArtistDashboardTypes';

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

  // Fetch data when tab changes to 'overview'
  useEffect(() => {
    if (activeTab === 'overview') {
      fetchStatsData();
      fetchRecentBookings();
    } else if (activeTab === 'earnings') {
      fetchEarningsData();
    }
  }, [activeTab, user]);

  const fetchStatsData = async () => {
    if (!user) return;
    
    setIsLoadingStats(true);
    try {
      // In a real app, we would fetch from the API
      // For now we'll use mock data
      setTimeout(() => {
        setStats({
          booking_count: 8,
          completed_services: 152,
          total_earnings: 1248,
          average_rating: 4.8,
          referral_count: 5,
          repeat_client_percentage: 62
        });
        setIsLoadingStats(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setIsLoadingStats(false);
    }
  };

  const fetchRecentBookings = async () => {
    if (!user) return;
    
    setIsLoadingBookings(true);
    try {
      // In a real app, we would fetch from the API
      // For now we'll use mock data
      setTimeout(() => {
        setRecentBookings([
          {
            id: '1',
            sender_id: 'client-123',
            recipient_id: user.id,
            service_id: 'service-1',
            service_name: 'Manicure',
            date_requested: '2025-04-15',
            time_requested: '10:00 AM',
            appointment_time: '2025-04-15T10:00:00',
            status: 'confirmed',
            created_at: '2025-04-10T08:30:00',
            price: 40,
            note: 'First time customer'
          },
          {
            id: '2',
            sender_id: 'client-456',
            recipient_id: user.id,
            service_id: 'service-2',
            service_name: 'Haircut',
            date_requested: '2025-04-16',
            time_requested: '2:30 PM',
            appointment_time: '2025-04-16T14:30:00',
            status: 'pending',
            created_at: '2025-04-12T09:15:00',
            price: 65,
            note: ''
          },
          {
            id: '3',
            sender_id: 'client-789',
            recipient_id: user.id,
            service_id: 'service-3',
            service_name: 'Pedicure',
            date_requested: '2025-04-18',
            time_requested: '11:15 AM',
            appointment_time: '2025-04-18T11:15:00',
            status: 'confirmed',
            created_at: '2025-04-14T14:45:00',
            price: 50,
            note: 'Returning customer'
          }
        ]);
        setIsLoadingBookings(false);
      }, 1200);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setIsLoadingBookings(false);
    }
  };

  const fetchEarningsData = async () => {
    if (!user) return;
    
    setIsLoadingEarnings(true);
    try {
      // In a real app, we would fetch from the API
      // For now we'll use mock data
      setTimeout(() => {
        setEarningsData({
          monthly_earnings: [
            { month: 'Jan', amount: 500 },
            { month: 'Feb', amount: 650 },
            { month: 'Mar', amount: 800 },
            { month: 'Apr', amount: 950 },
            { month: 'May', amount: 1100 },
            { month: 'Jun', amount: 850 }
          ],
          total_earnings: 4850,
          pending_payouts: 750
        });
        setIsLoadingEarnings(false);
      }, 1500);
    } catch (error) {
      console.error('Error fetching earnings data:', error);
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
