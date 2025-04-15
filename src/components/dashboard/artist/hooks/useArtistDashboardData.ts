
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';

// Define simpler types to avoid deep nesting
interface StatItem {
  label: string;
  value: string | number;
  change?: number;
  changeType?: 'increase' | 'decrease' | 'neutral';
  icon?: string;
}

interface BookingItem {
  id: string;
  customerName: string;
  date: string;
  time: string;
  service: string;
  status: string;
}

interface EarningsData {
  totalEarnings: number;
  periodEarnings: number;
  earningsChange: number;
  earningsData: { name: string; earnings: number }[];
}

export const useArtistDashboardData = (activeTab: string) => {
  const { user } = useAuth();
  const [stats, setStats] = useState<StatItem[]>([]);
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [recentBookings, setRecentBookings] = useState<BookingItem[]>([]);
  const [isLoadingBookings, setIsLoadingBookings] = useState(true);
  const [earningsData, setEarningsData] = useState<EarningsData>({
    totalEarnings: 0,
    periodEarnings: 0,
    earningsChange: 0,
    earningsData: []
  });
  const [isLoadingEarnings, setIsLoadingEarnings] = useState(true);

  // Fetch stats data when tab changes to 'overview'
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
        setStats([
          {
            label: 'Profile Views',
            value: 152,
            change: 12,
            changeType: 'increase',
            icon: 'eye'
          },
          {
            label: 'Bookings',
            value: 8,
            change: 2,
            changeType: 'increase',
            icon: 'calendar'
          },
          {
            label: 'Earnings',
            value: '$1,248',
            change: 5,
            changeType: 'increase',
            icon: 'dollar-sign'
          },
          {
            label: 'Reviews',
            value: '4.8',
            change: 0,
            changeType: 'neutral',
            icon: 'star'
          }
        ]);
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
            customerName: 'Sarah Johnson',
            date: '2025-04-15',
            time: '10:00 AM',
            service: 'Manicure',
            status: 'confirmed'
          },
          {
            id: '2',
            customerName: 'Michael Brown',
            date: '2025-04-16',
            time: '2:30 PM',
            service: 'Haircut',
            status: 'pending'
          },
          {
            id: '3',
            customerName: 'Emma Wilson',
            date: '2025-04-18',
            time: '11:15 AM',
            service: 'Pedicure',
            status: 'confirmed'
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
          totalEarnings: 4850,
          periodEarnings: 1248,
          earningsChange: 8.5,
          earningsData: [
            { name: 'Jan', earnings: 500 },
            { name: 'Feb', earnings: 650 },
            { name: 'Mar', earnings: 800 },
            { name: 'Apr', earnings: 950 },
            { name: 'May', earnings: 1100 },
            { name: 'Jun', earnings: 850 }
          ]
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
