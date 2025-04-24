
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { ArtistDataContextType, ArtistProfileState, PortfolioImage } from '../types/ArtistDashboardTypes';
import { toast } from "sonner";
import { usePortfolioImages } from '@/hooks/portfolio/usePortfolioImages';

interface ArtistData {
  profile?: any;
  services?: any[];
  portfolio?: any[];
}

const defaultContextValue: ArtistDataContextType = {
  data: null,
  loading: true,
  error: null,
  refetch: async () => {},
  // Add missing properties that components are trying to use
  artistProfile: {},
  refreshProfile: () => {},
  refreshArtistProfile: async () => {},
  updateProfile: async () => {},
  handleCopyReferralLink: () => {},
  copied: false,
  firstName: "",
  userCredits: 0,
  portfolioImages: [],
  loadingPortfolio: true,
  bookingCount: { total: 0, pending: 0, accepted: 0, completed: 0 },
  reviewCount: 0,
  averageRating: 0
};

const ArtistDataContext = createContext<ArtistDataContextType>(defaultContextValue);

export const ArtistDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<ArtistData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [artistProfile, setArtistProfile] = useState<ArtistProfileState>({});
  const [copied, setCopied] = useState(false);
  const [userCredits, setUserCredits] = useState(0);
  const { user } = useAuth();
  const { images: portfolioImages, isLoading: loadingPortfolio } = usePortfolioImages();
  
  // Mock data for metrics
  const [bookingCount, setBookingCount] = useState({ 
    total: 0, pending: 0, accepted: 0, completed: 0 
  });
  const [reviewCount, setReviewCount] = useState(0);
  const [averageRating, setAverageRating] = useState(0);

  const fetchArtistData = async () => {
    if (!user?.id) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // We'll wrap all fetch operations in a Promise.race with a timeout
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error("Data fetch timeout")), 8000);
      });
      
      // Actual data fetching
      const dataFetchPromise = async () => {
        // You can fetch whatever artist data you need here
        const { data: profileData, error: profileError } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single();
          
        if (profileError) throw profileError;
        
        // Update artist profile state
        setArtistProfile(profileData || {});
        
        // Set user credits
        setUserCredits(profileData?.credits || 0);
        
        // Fetch services (adjust table name if needed)
        const { data: servicesData, error: servicesError } = await supabase
          .from('services')
          .select('*')
          .eq('user_id', user.id);
          
        if (servicesError) throw servicesError;
        
        // Fetch booking counts
        const { data: bookingsData, error: bookingsError } = await supabase
          .from('bookings')
          .select('status')
          .eq('recipient_id', user.id);
          
        if (!bookingsError && bookingsData) {
          const counts = {
            total: bookingsData.length,
            pending: bookingsData.filter(b => b.status === 'pending').length,
            accepted: bookingsData.filter(b => b.status === 'accepted').length,
            completed: bookingsData.filter(b => b.status === 'completed').length
          };
          setBookingCount(counts);
        }
        
        // Fetch reviews data
        const { data: reviewsData, error: reviewsError } = await supabase
          .from('reviews')
          .select('rating')
          .eq('artist_id', user.id);
          
        if (!reviewsError && reviewsData && reviewsData.length > 0) {
          setReviewCount(reviewsData.length);
          const totalRating = reviewsData.reduce((sum, review) => sum + review.rating, 0);
          setAverageRating(parseFloat((totalRating / reviewsData.length).toFixed(1)));
        }
        
        return {
          profile: profileData,
          services: servicesData || [],
        };
      };
      
      // Race between data fetch and timeout
      const result = await Promise.race([dataFetchPromise(), timeoutPromise]);
      setData(result as ArtistData);
      setError(null);
    } catch (err) {
      console.error('Error fetching artist data:', err);
      setError(err instanceof Error ? err : new Error('Failed to load dashboard data'));
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const refreshArtistProfile = useCallback(async () => {
    if (!user?.id) return;
    
    try {
      const { data: profileData, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();
        
      if (error) throw error;
      
      setArtistProfile(profileData || {});
      setUserCredits(profileData?.credits || 0);
      
    } catch (err) {
      console.error('Error refreshing artist profile:', err);
      toast.error('Failed to refresh profile data');
    }
  }, [user?.id]);

  const updateProfile = async (data: Partial<ArtistProfileState>) => {
    if (!user?.id) return;
    
    try {
      const { error } = await supabase
        .from('users')
        .update(data)
        .eq('id', user.id);
        
      if (error) throw error;
      
      // Update local state
      setArtistProfile(prev => ({ ...prev, ...data }));
      toast.success('Profile updated successfully');
      
    } catch (err) {
      console.error('Error updating profile:', err);
      toast.error('Failed to update profile');
    }
  };

  const handleCopyReferralLink = () => {
    if (!artistProfile.referral_code) return;
    
    try {
      const referralLink = `${window.location.origin}/sign-up?ref=${artistProfile.referral_code}`;
      navigator.clipboard.writeText(referralLink);
      setCopied(true);
      toast.success('Referral link copied to clipboard!');
      
      setTimeout(() => {
        setCopied(false);
      }, 3000);
      
    } catch (err) {
      toast.error('Failed to copy link');
      console.error(err);
    }
  };

  // Initial data fetch when component mounts
  useEffect(() => {
    if (user?.id) {
      fetchArtistData();
    } else {
      setLoading(false);
    }
  }, [user?.id]);

  // Calculate first name for greeting
  const firstName = artistProfile?.full_name?.split(' ')[0] || '';

  return (
    <ArtistDataContext.Provider 
      value={{ 
        data, 
        loading, 
        error, 
        refetch: fetchArtistData,
        artistProfile,
        refreshProfile: refreshArtistProfile,
        refreshArtistProfile,
        updateProfile,
        handleCopyReferralLink,
        copied,
        firstName,
        userCredits,
        portfolioImages,
        loadingPortfolio,
        bookingCount,
        reviewCount,
        averageRating
      }}
    >
      {children}
    </ArtistDataContext.Provider>
  );
};

export const useArtistData = () => {
  const context = useContext(ArtistDataContext);
  if (context === undefined) {
    throw new Error('useArtistData must be used within an ArtistDataProvider');
  }
  return context;
};
