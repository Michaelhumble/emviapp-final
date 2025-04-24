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
  credits: 0,
  instagram: '',
  website: ''
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
      
      if (loadAttempts > 5) {
        throw new Error("Too many load attempts. Please refresh the page.");
      }

      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('recipient_id', user.id);

      if (error) throw error;

      const upcomingBookings = (data || []).filter(booking => 
        booking.status === 'pending' || booking.status === 'confirmed'
      ).length;

      const totalBookings = (data || []).length;
      setBookingCount(totalBookings);
      
      const earningsThisMonth = (data || [])
        .filter(booking => booking.status === 'completed')
        .reduce((sum, booking) => {
          let bookingValue = 0;
          if (booking.metadata && typeof booking.metadata === 'object') {
            const price = booking.metadata.price;
            if (typeof price === 'number') {
              bookingValue = price;
            }
          }
          return sum + bookingValue;
        }, 0);
      
      const uniqueClients = new Set((data || []).map(booking => booking.sender_id));

      setStats({
        upcoming_bookings: upcomingBookings,
        total_bookings: totalBookings,
        earnings_this_month: earningsThisMonth,
        total_clients: uniqueClients.size
      });
      
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
        instagram: userProfile?.instagram || '',
        website: userProfile?.website || ''
      });
    } catch (err) {
      console.error('Error fetching artist profile:', err);
    }
  };
  
  const fetchPortfolioImages = async () => {
    if (!user?.id) return;
    
    try {
      setLoadingPortfolio(true);
      
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

  const refreshArtistProfile = async () => {
    await fetchArtistProfile();
    await fetchPortfolioImages();
  };

  useEffect(() => {
    fetchArtistData();
    fetchArtistProfile();
    fetchPortfolioImages();
  }, [user?.id, userProfile]);

  useEffect(() => {
    if (error && loadAttempts < 3) {
      const retryTimer = setTimeout(() => {
        console.log(`Retrying artist data fetch (attempt ${loadAttempts + 1})`);
        fetchArtistData();
      }, 3000);
      
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
