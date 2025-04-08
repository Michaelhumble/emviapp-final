
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ArtistDataContextType, ArtistProfileState, PortfolioImage } from '../types/ArtistDashboardTypes';
import { UserProfile } from '@/context/auth/types';

// Create the context with a default value
const ArtistDataContext = createContext<ArtistDataContextType | undefined>(undefined);

// Provider component
export const ArtistDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user, refreshUserProfile } = useAuth();
  const [state, setState] = useState<{
    artistProfile: ArtistProfileState | null;
    loading: boolean;
    error: Error | null;
  }>({
    artistProfile: null,
    loading: true,
    error: null
  });
  const [copied, setCopied] = useState(false);
  const [portfolioImages, setPortfolioImages] = useState<PortfolioImage[]>([]);
  const [loadingPortfolio, setLoadingPortfolio] = useState(true);
  
  // Fetch user profile data from Supabase
  useEffect(() => {
    fetchArtistProfile();
  }, [user]);
  
  // Process portfolio URLs into proper format when artist profile changes
  useEffect(() => {
    if (state.artistProfile) {
      processPortfolioImages();
    }
  }, [state.artistProfile]);
  
  const processPortfolioImages = () => {
    setLoadingPortfolio(true);
    
    const urls = state.artistProfile?.portfolio_urls || [];
    const formattedImages: PortfolioImage[] = urls.map((url, index) => {
      // Extract file name from URL
      const fileName = url.split('/').pop() || `image-${index + 1}`;
      return {
        id: `portfolio-${index}`,
        url: url,
        name: fileName
      };
    });
    
    setPortfolioImages(formattedImages);
    setLoadingPortfolio(false);
  };
  
  const fetchArtistProfile = async () => {
    if (!user) {
      setState(prev => ({ ...prev, loading: false }));
      setLoadingPortfolio(false);
      return;
    }
    
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      setLoadingPortfolio(true);
      
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) {
        console.error('Error fetching artist profile:', error);
        setState(prev => ({
          ...prev,
          error: new Error('Failed to load your profile data. Please try again later.')
        }));
        toast.error('Could not load profile data');
      } else if (data) {
        // Transform data to match ArtistProfileState
        const profileData: ArtistProfileState = {
          ...data,
          id: data.id,
          user_id: data.id,
          full_name: data.full_name || '',
          portfolio_images: [],
          portfolio_urls: data.portfolio_urls || [],
          referral_count: data.credits || 0,
          affiliate_code: data.referral_code || '',
        };
        
        setState(prev => ({ ...prev, artistProfile: profileData }));
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setState(prev => ({
        ...prev,
        error: new Error('An unexpected error occurred. Please try again later.')
      }));
      toast.error('Could not load profile data');
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  };
  
  // Copy referral link
  const handleCopyReferralLink = () => {
    const referralCode = state.artistProfile?.affiliate_code || `EMVI${Math.floor(1000 + Math.random() * 9000)}`;
    const referralLink = `https://emviapp.com/join?ref=${referralCode}`;
    
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success("Referral link copied to clipboard!");
    
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  // Format first name for greeting
  const firstName = state.artistProfile?.full_name ? state.artistProfile.full_name.split(' ')[0] : "Artist";
  
  // Get credits from the user profile data
  const userCredits = state.artistProfile?.credits !== undefined 
    ? state.artistProfile.credits 
    : (state.artistProfile?.referral_count || 0);

  const refreshArtistProfile = async () => {
    await refreshUserProfile();
    await fetchArtistProfile();
  };

  const refreshProfile = () => {
    fetchArtistProfile();
  };
  
  const value: ArtistDataContextType = {
    artistProfile: state.artistProfile,
    loading: state.loading,
    error: state.error,
    refreshProfile,
    handleCopyReferralLink,
    copied,
    firstName,
    userCredits,
    refreshArtistProfile,
    portfolioImages,
    loadingPortfolio
  };
  
  return <ArtistDataContext.Provider value={value}>{children}</ArtistDataContext.Provider>;
};

// Hook to use the context
export const useArtistData = () => {
  const context = useContext(ArtistDataContext);
  if (context === undefined) {
    throw new Error('useArtistData must be used within an ArtistDataProvider');
  }
  return context;
};
