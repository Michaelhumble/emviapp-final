
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useAuth } from '@/context/auth';
import { useArtistProfile } from '@/hooks/artist/useArtistProfile';
import { useToast } from '@/components/ui/use-toast';
import { ArtistDataContextType, ArtistProfileState, PortfolioImage } from '../types/ArtistDashboardTypes';
import { usePortfolioImages } from '@/hooks/artist/usePortfolioImages';

// Create context with default values
const ArtistDataContext = createContext<ArtistDataContextType | undefined>(undefined);

// Provider component
export const ArtistDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const { profile: artistProfileData, isLoading: profileLoading } = useArtistProfile();
  const { images: portfolioImages, isLoading: loadingPortfolio } = usePortfolioImages();
  const [stats, setStats] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | string | null>(null);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  // Map artist profile data to the expected structure
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
    // Fix the error by checking if preferences exists first
    preferences: artistProfileData?.preferred_language ? [artistProfileData?.preferred_language] : [],
    profile_completion: artistProfileData?.profile_completion,
  };

  const firstName = artistProfile?.full_name?.split(' ')[0] || '';
  const userCredits = artistProfile?.credits || 0;
  
  // Mock values for metrics
  const bookingCount = { toString: () => "12" };
  const reviewCount = 8;
  const averageRating = { toString: () => "4.8" };

  const fetchArtistStats = async () => {
    // Simulate fetching artist stats - replace with actual stats fetching
    try {
      // Simulate network delay
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
      
      // Fix Toast options - use the correct property name
      toast({
        title: "Error loading dashboard data",
        description: "Please try again or contact support if the issue persists.",
        // Remove incorrect "variant" property and use the right property for error state
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Function to refresh artist profile
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

  // Handle copy referral link
  const handleCopyReferralLink = () => {
    if (artistProfile?.affiliate_code) {
      navigator.clipboard.writeText(
        `${window.location.origin}/signup?ref=${artistProfile.affiliate_code}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Load data on mount and when user changes
  useEffect(() => {
    loadData();
  }, [user]);

  // Detect loading state from both sources
  useEffect(() => {
    setLoading(profileLoading);
  }, [profileLoading]);

  // Context value
  const value: ArtistDataContextType = {
    profile: artistProfileData,
    stats,
    loading,
    error,
    refresh: loadData,
    
    // Add all required properties to match the interface
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

// Hook to use the context
export const useArtistData = () => {
  const context = useContext(ArtistDataContext);
  
  // Return a safe default if used outside provider
  if (context === undefined) {
    console.warn('useArtistData must be used within an ArtistDataProvider');
    return {
      profile: null,
      stats: {},
      loading: false,
      error: new Error('ArtistDataContext used outside of provider'),
      refresh: () => {},
      
      // Add missing properties to the default value
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
