
import { useState, useEffect } from 'react';
import { supabaseBypass } from "@/types/supabase-bypass";
import { useAuth } from '@/context/auth';
import { CustomerBooking } from '@/components/dashboard/customer/bookings/types';
import { toast } from 'sonner';

export interface CustomerFavorite {
  id: string;
  name: string;
  avatar_url?: string;
  type: 'artist' | 'salon';
  specialty?: string;
  location?: string;
}

export interface CustomerStats {
  totalBookings: number;
  completedBookings: number;
  pendingBookings: number;
  totalReviews: number;
  currentStreak: number;
  totalPoints: number;
  referralCount: number;
  profileCompletion: number;
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedAt?: string;
  progress?: number;
  target?: number;
}

export interface CustomerActivity {
  id: string;
  type: 'booking' | 'review' | 'referral' | 'profile_update' | 'achievement';
  title: string;
  description: string;
  timestamp: string;
  points?: number;
  icon: string;
}

export const useCustomerDashboard = () => {
  const { user, userProfile } = useAuth();
  const [bookings, setBookings] = useState<CustomerBooking[]>([]);
  const [favorites, setFavorites] = useState<CustomerFavorite[]>([]);
  const [stats, setStats] = useState<CustomerStats>({
    totalBookings: 0,
    completedBookings: 0,
    pendingBookings: 0,
    totalReviews: 0,
    currentStreak: 0,
    totalPoints: 0,
    referralCount: 0,
    profileCompletion: 0,
    achievements: []
  });
  const [activities, setActivities] = useState<CustomerActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const calculateProfileCompletion = (profile: any) => {
    if (!profile) return 0;
    
    const fields = [
      profile.full_name,
      profile.avatar_url,
      profile.location,
      profile.bio,
      profile.phone
    ];
    
    const completedFields = fields.filter(field => field && field.trim() !== '').length;
    return Math.round((completedFields / fields.length) * 100);
  };

  const generateAchievements = (userStats: any, profile: any): Achievement[] => {
    const achievements: Achievement[] = [
      {
        id: 'profile_complete',
        name: 'Profile Master',
        description: 'Complete your profile 100%',
        icon: '👤',
        earned: calculateProfileCompletion(profile) === 100,
        progress: calculateProfileCompletion(profile),
        target: 100
      },
      {
        id: 'first_booking',
        name: 'First Booking',
        description: 'Make your first booking',
        icon: '🎉',
        earned: userStats.totalBookings > 0
      },
      {
        id: 'five_bookings',
        name: 'Regular Customer',
        description: 'Complete 5 bookings',
        icon: '⭐',
        earned: userStats.completedBookings >= 5,
        progress: userStats.completedBookings,
        target: 5
      },
      {
        id: 'first_referral',
        name: 'Friend Magnet',
        description: 'Refer your first friend',
        icon: '🤝',
        earned: userStats.referralCount > 0
      },
      {
        id: 'streak_master',
        name: 'Streak Master',
        description: 'Maintain a 7-day streak',
        icon: '🔥',
        earned: userStats.currentStreak >= 7,
        progress: userStats.currentStreak,
        target: 7
      }
    ];

    return achievements.map(achievement => ({
      ...achievement,
      earnedAt: achievement.earned ? new Date().toISOString() : undefined
    }));
  };

  useEffect(() => {
    const fetchCustomerData = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        setError(null);
        
        // Fetch bookings with related data
        const { data: bookingsData, error: bookingsError } = await supabaseBypass
          .from('bookings')
          .select(`
            id, 
            created_at, 
            date_requested, 
            time_requested, 
            status, 
            note,
            service_id,
            recipient_id
          `)
          .eq('sender_id', user.id as any)
          .order('created_at', { ascending: false });
        
        if (bookingsError) throw bookingsError;
        
        // Fetch artist details for each booking
        let enhancedBookings: CustomerBooking[] = [];
        if (bookingsData && bookingsData.length > 0) {
          enhancedBookings = await Promise.all((bookingsData as any[]).map(async (booking: any) => {
            let artistData = null;
            let serviceData = null;
            
            if (booking?.recipient_id) {
              const { data: artist, error: artistError } = await supabaseBypass
                .from('profiles')
                .select('id, full_name, avatar_url')
                .eq('id', booking.recipient_id as any)
                .maybeSingle();
                
              if (!artistError && artist) {
                artistData = artist;
              }
            }

            if (booking?.service_id) {
              const { data: service, error: serviceError } = await supabaseBypass
                .from('services')
                .select('id, title, price')
                .eq('id', booking.service_id as any)
                .maybeSingle();
                
              if (!serviceError && service) {
                serviceData = service;
              }
            }
            
            return {
              ...booking,
              artist: artistData,
              service: serviceData
            } as CustomerBooking;
          }));
        }
        
        // Fetch saved artists (favorites)
        const { data: savedArtistsData, error: favoritesError } = await supabaseBypass
          .from('saved_artists')
          .select('id, artist_id, viewer_id')
          .eq('viewer_id', user.id as any);
          
        const formattedFavorites: CustomerFavorite[] = [];
        
        if (savedArtistsData && savedArtistsData.length > 0) {
          const artistIds = (savedArtistsData as any[]).map((item: any) => item?.artist_id).filter(Boolean);

          if (artistIds.length > 0) {
            const { data: artistsData, error: artistsError } = await supabaseBypass
              .from('profiles')
              .select('id, full_name, avatar_url, specialty, location')
              .in('id', artistIds as any);

            if (!artistsError && artistsData) {
              (savedArtistsData as any[]).forEach((savedArtist: any) => {
                const artistDetail = (artistsData as any[]).find((artist: any) => artist?.id === savedArtist?.artist_id);
                if (artistDetail?.full_name) {
                  formattedFavorites.push({
                    id: savedArtist?.id,
                    name: artistDetail?.full_name,
                    avatar_url: artistDetail?.avatar_url,
                    type: 'artist',
                    specialty: artistDetail?.specialty,
                    location: artistDetail?.location
                  });
                }
              });
            }
          }
        }

        // Calculate real statistics
        const totalBookings = enhancedBookings.length;
        const completedBookings = enhancedBookings.filter(b => b.status === 'completed').length;
        const pendingBookings = enhancedBookings.filter(b => ['pending', 'accepted'].includes(b.status || '')).length;
        
        // Get referral count from user profile
        const referralCount = userProfile?.referral_count || 0;
        
        // Calculate profile completion
        const profileCompletion = calculateProfileCompletion(userProfile);
        
        // Simple streak calculation (can be enhanced with actual daily usage data)
        const currentStreak = Math.min(7, totalBookings); // Simplified for now
        
        // Calculate points (booking = 25pts, completed = 50pts, referral = 100pts)
        const totalPoints = (totalBookings * 25) + (completedBookings * 25) + (referralCount * 100);

        const statsData: CustomerStats = {
          totalBookings,
          completedBookings,
          pendingBookings,
          totalReviews: 0, // Would need reviews table
          currentStreak,
          totalPoints,
          referralCount,
          profileCompletion,
          achievements: generateAchievements({ totalBookings, completedBookings, referralCount, currentStreak }, userProfile)
        };

        // Generate activity feed from bookings and achievements
        const recentActivities: CustomerActivity[] = [
          ...enhancedBookings.slice(0, 3).map(booking => ({
            id: `booking-${booking.id}`,
            type: 'booking' as const,
            title: booking.status === 'completed' ? 'Booking Completed' : 'New Booking',
            description: `${booking.status === 'completed' ? 'Completed booking' : 'Booked'} with ${booking.artist?.full_name || 'Artist'}`,
            timestamp: booking.created_at,
            points: booking.status === 'completed' ? 50 : 25,
            icon: booking.status === 'completed' ? '✅' : '📅'
          })),
          ...statsData.achievements.filter(a => a.earned).slice(0, 2).map(achievement => ({
            id: `achievement-${achievement.id}`,
            type: 'achievement' as const,
            title: `Achievement Unlocked: ${achievement.name}`,
            description: achievement.description,
            timestamp: achievement.earnedAt || new Date().toISOString(),
            points: 100,
            icon: achievement.icon
          }))
        ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        
        setBookings(enhancedBookings);
        setFavorites(formattedFavorites);
        setStats(statsData);
        setActivities(recentActivities);
      } catch (error) {
        console.error('Error fetching customer dashboard data:', error);
        setError('Failed to load your dashboard. Please try again later.');
        toast.error('Could not load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerData();

    // Set up real-time subscriptions
    const bookingsSubscription = supabaseBypass
      .channel('customer-bookings')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'bookings', filter: `sender_id=eq.${user?.id}` }, 
        () => { fetchCustomerData(); }
      )
      .subscribe();

    const favoritesSubscription = supabaseBypass
      .channel('customer-favorites')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'saved_artists', filter: `viewer_id=eq.${user?.id}` }, 
        () => { fetchCustomerData(); }
      )
      .subscribe();

    return () => {
      supabaseBypass.removeChannel(bookingsSubscription);
      supabaseBypass.removeChannel(favoritesSubscription);
    };
  }, [user, userProfile]);

  return { 
    bookings, 
    upcomingBookings: bookings.filter(b => b.status !== 'completed' && b.status !== 'cancelled').slice(0, 3),
    previousBookings: bookings.filter(b => b.status === 'completed'),
    favorites, 
    stats,
    activities,
    loading, 
    error 
  };
};
