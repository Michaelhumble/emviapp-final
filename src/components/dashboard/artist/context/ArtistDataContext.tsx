
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { ArtistProfileState, PortfolioImage } from '../types/ArtistDashboardTypes';

interface ArtistStats {
  upcoming_bookings: number;
  total_bookings: number;
  earnings_this_month: number;
  total_clients: number;
}

interface ArtistDataContextType {
  loading: boolean;
  error: Error | null;
  stats: ArtistStats;
  refreshData: () => Promise<void>;
  
  // Add missing properties that components are trying to use
  artistProfile: ArtistProfileState;
  refreshArtistProfile: () => Promise<void>;
  portfolioImages: PortfolioImage[];
  loadingPortfolio: boolean;
  bookingCount: number;
  reviewCount: number;
  averageRating: number;
}

const defaultStats: ArtistStats = {
  upcoming_bookings: 0,
  total_bookings: 0,
  earnings_this_month: 0,
  total_clients: 0
};

const defaultArtistProfile: ArtistProfileState = {
  id: '',
  name: '',
  avatar: '',
  specialty: '',
  credits: 0
};

const ArtistDataContext = createContext<ArtistDataContextType>({
  loading: false,
  error: null,
  stats: defaultStats,
  refreshData: async () => {},
  artistProfile: defaultArtistProfile,
  refreshArtistProfile: async () => {},
  portfolioImages: [],
  loadingPortfolio: false,
  bookingCount: 0,
  reviewCount: 0,
  averageRating: 4.5
});

export const useArtistData = () => useContext(ArtistDataContext);

interface ArtistDataProviderProps {
  children: ReactNode;
}

export const ArtistDataProvider = ({ children }: ArtistDataProviderProps) => {
  const { user, userProfile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [stats, setStats] = useState<ArtistStats>(defaultStats);
  const [loadAttempts, setLoadAttempts] = useState(0);
  const [artistProfile, setArtistProfile] = useState<ArtistProfileState>(defaultArtistProfile);
  const [portfolioImages, setPortfolioImages] = useState<PortfolioImage[]>([]);
  const [loadingPortfolio, setLoadingPortfolio] = useState(false);
  const [bookingCount, setBookingCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [averageRating, setAverageRating] = useState(4.5);

  const fetchArtistData = async () => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setLoadAttempts(prev => prev + 1);
      
      // Break out if we've tried too many times to prevent loops
      if (loadAttempts > 5) {
        throw new Error("Too many load attempts. Please refresh the page.");
      }

      // Fetch artist stats from Supabase
      // This is a placeholder for actual data fetching logic
      // In a real implementation, you would query your database tables
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('recipient_id', user.id);

      if (error) throw error;

      // Process the data to calculate stats
      const upcomingBookings = (data || []).filter(booking => 
        booking.status === 'pending' || booking.status === 'confirmed'
      ).length;

      const totalBookings = (data || []).length;
      setBookingCount(totalBookings);
      
      // Mock earnings calculation - in real app, you'd query a proper earnings table
      const earningsThisMonth = (data || [])
        .filter(booking => booking.status === 'completed')
        .reduce((sum, booking) => {
          // Handle case where booking may not have price property
          const bookingPrice = typeof booking.price === 'number' ? booking.price : 0;
          return sum + bookingPrice;
        }, 0);
      
      // Get unique client count
      const uniqueClients = new Set((data || []).map(booking => booking.sender_id));

      setStats({
        upcoming_bookings: upcomingBookings,
        total_bookings: totalBookings,
        earnings_this_month: earningsThisMonth,
        total_clients: uniqueClients.size
      });
      
      // Fetch ratings from reviews
      const { data: reviewData, error: reviewError } = await supabase
        .from('reviews')
        .select('rating')
        .eq('artist_id', user.id);
        
      if (!reviewError && reviewData) {
        const reviews = reviewData.length;
        const avgRating = reviews > 0 
          ? reviewData.reduce((sum, review) => sum + review.rating, 0) / reviews
          : 4.5;
          
        setReviewCount(reviews);
        setAverageRating(parseFloat(avgRating.toFixed(1)));
      }
      
      // Reset error state if successful
      setError(null);
      
    } catch (err) {
      console.error('Error fetching artist data:', err);
      setError(err instanceof Error ? err : new Error('Failed to load artist data'));
    } finally {
      setLoading(false);
    }
  };
  
  const fetchArtistProfile = async () => {
    if (!user?.id) return;
    
    try {
      // Get artist profile from user profile data
      setArtistProfile({
        id: user.id,
        name: userProfile?.full_name || '',
        avatar: userProfile?.avatar_url || '',
        bio: userProfile?.bio || '',
        specialty: userProfile?.specialty || '',
        location: userProfile?.location || '',
        experience: userProfile?.years_experience || 0,
        rating: averageRating,
        portfolio: portfolioImages,
        full_name: userProfile?.full_name || '',
        user_id: user.id,
        credits: userProfile?.credits || 0,
        referral_count: userProfile?.referral_count || 0,
        affiliate_code: userProfile?.referral_code || '',
        portfolio_urls: userProfile?.portfolio_urls || [],
        preferred_language: userProfile?.preferred_language || 'English',
        accepts_bookings: userProfile?.accepts_bookings || false,
        preferences: userProfile?.preferences || [],
        avatar_url: userProfile?.avatar_url || '',
        profile_completion: userProfile?.profile_completion || 0,
        independent: userProfile?.independent || true,
      });
    } catch (err) {
      console.error('Error fetching artist profile:', err);
    }
  };
  
  const fetchPortfolioImages = async () => {
    if (!user?.id) return;
    
    try {
      setLoadingPortfolio(true);
      
      // Get portfolio from user's portfolio_urls
      const portfolioUrls = userProfile?.portfolio_urls || [];
      
      if (portfolioUrls.length > 0) {
        const images = portfolioUrls.map((url, index) => ({
          id: `portfolio-${index}`,
          url,
          title: `Portfolio Item ${index + 1}`,
          name: `Image ${index + 1}`,
          created_at: new Date().toISOString()
        }));
        
        setPortfolioImages(images);
      }
    } catch (err) {
      console.error('Error fetching portfolio:', err);
    } finally {
      setLoadingPortfolio(false);
    }
  };

  // Function to refresh the artist profile
  const refreshArtistProfile = async () => {
    await fetchArtistProfile();
    await fetchPortfolioImages();
  };

  // Initial data load
  useEffect(() => {
    fetchArtistData();
    fetchArtistProfile();
    fetchPortfolioImages();
  }, [user?.id, userProfile]);

  // Set up error recovery with retry mechanism
  useEffect(() => {
    if (error && loadAttempts < 3) {
      // Auto-retry once after a brief delay
      const retryTimer = setTimeout(() => {
        console.log(`Retrying artist data fetch (attempt ${loadAttempts + 1})`);
        fetchArtistData();
      }, 3000); // 3 second delay before retry
      
      return () => clearTimeout(retryTimer);
    }
  }, [error, loadAttempts]);

  return (
    <ArtistDataContext.Provider value={{ 
      loading, 
      error, 
      stats, 
      refreshData: fetchArtistData,
      artistProfile,
      refreshArtistProfile,
      portfolioImages,
      loadingPortfolio,
      bookingCount,
      reviewCount,
      averageRating
    }}>
      {children}
    </ArtistDataContext.Provider>
  );
};
