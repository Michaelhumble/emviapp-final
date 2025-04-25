import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useAuth } from '@/context/auth';
import { useArtistProfile } from '@/hooks/artist/useArtistProfile';
import { toast } from 'sonner';
import { ArtistDataContextType, ArtistProfileState, PortfolioImage } from '../types/ArtistDashboardTypes';
import { usePortfolioImages } from '@/hooks/artist/usePortfolioImages';

const ArtistDataContext = createContext<ArtistDataContextType | undefined>(undefined);

export const ArtistDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const { profile: artistProfileData, isLoading: profileLoading } = useArtistProfile();
  const { images: portfolioImages, isLoading: loadingPortfolio } = usePortfolioImages();
  const [stats, setStats] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | string | null>(null);
  const [copied, setCopied] = useState(false);

  const artistProfile: ArtistProfileState = {
    id: artistProfileData?.id,
    user_id: artistProfileData?.user_id,
    name: artistProfileData?.full_name,
    full_name: artistProfileData?.full_name,
    avatar: artistProfileData?.avatar_url,
    avatar_url: artistProfileData?.avatar_url,
    bio: artistProfileData?.bio,
    location: artistProfileData?.location,
    specialty: artistProfileData?.specialty,
    experience: artistProfileData?.years_experience,
    rating: artistProfileData?.rating,
    portfolio: portfolioImages,
    portfolio_urls: artistProfileData?.portfolio_urls,
    independent: artistProfileData?.independent,
    accepts_bookings: artistProfileData?.accepts_bookings,
    preferences: artistProfileData?.preferred_language ? [artistProfileData?.preferred_language] : [],
    profile_completion: artistProfileData?.profile_completion,
  };

  const firstName = artistProfile?.full_name?.split(' ')[0] || '';
  const userCredits = artistProfile?.credits || 0;
  
  const bookingCount = { toString: () => "12" };
  const reviewCount = 8;
  const averageRating = { toString: () => "4.8" };

  const fetchArtistStats = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setStats({
        bookingCount: 12,
        completedServices: 8,
        totalEarnings: 750,
        averageRating: 4.8,
        referralCount: 3,
        repeatClientPercentage: 65,
        profileViews: 108
      });
    } catch (err) {
      console.error('Error fetching artist stats:', err);
      setError(err instanceof Error ? err : String(err));
    }
  };

  const loadData = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await fetchArtistStats();
    } catch (err) {
      console.error('Error loading artist data:', err);
      setError(err instanceof Error ? err : String(err));
      
      toast.error("Error loading dashboard data", {
        description: "Please try again or contact support if the issue persists.",
        duration: 5000,
        className: "error-toast"
      });
    } finally {
      setLoading(false);
    }
  };

  const refreshArtistProfile = async () => {
    try {
      setLoading(true);
      await loadData();
    } catch (error) {
      console.error("Error refreshing artist profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyReferralLink = () => {
    if (artistProfile?.affiliate_code) {
      navigator.clipboard.writeText(
        `${window.location.origin}/signup?ref=${artistProfile.affiliate_code}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  useEffect(() => {
    loadData();
  }, [user]);

  useEffect(() => {
    setLoading(profileLoading);
  }, [profileLoading]);

  const value: ArtistDataContextType = {
    profile: artistProfileData,
    stats,
    loading,
    error,
    refresh: loadData,
    
    artistProfile,
    refreshArtistProfile,
    portfolioImages,
    loadingPortfolio,
    bookingCount,
    reviewCount,
    averageRating,
    firstName,
    userCredits,
    copied,
    handleCopyReferralLink,
  };

  return (
    <ArtistDataContext.Provider value={value}>
      {children}
    </ArtistDataContext.Provider>
  );
};

export const useArtistData = () => {
  const context = useContext(ArtistDataContext);
  
  if (context === undefined) {
    console.warn('useArtistData must be used within an ArtistDataProvider');
    return {
      profile: null,
      stats: {},
      loading: false,
      error: new Error('ArtistDataContext used outside of provider'),
      refresh: () => {},
      
      artistProfile: {} as ArtistProfileState,
      refreshArtistProfile: async () => {},
      portfolioImages: [] as PortfolioImage[],
      loadingPortfolio: false,
      bookingCount: { toString: () => "0" },
      reviewCount: 0,
      averageRating: { toString: () => "0" },
      firstName: "",
      userCredits: 0,
      copied: false,
      handleCopyReferralLink: () => {}
    } as ArtistDataContextType;
  }
  
  return context;
};
