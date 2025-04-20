
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ArtistDataContextType, ArtistProfileState, PortfolioImage } from '../types/ArtistDashboardTypes';
import { UserProfile } from '@/context/auth/types';

const ArtistDataContext = createContext<ArtistDataContextType | undefined>(undefined);

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
  
  useEffect(() => {
    fetchArtistProfile();
  }, [user]);
  
  useEffect(() => {
    if (state.artistProfile) {
      processPortfolioImages();
    }
  }, [state.artistProfile]);
  
  const processPortfolioImages = () => {
    setLoadingPortfolio(true);
    
    const urls = state.artistProfile?.portfolio_urls || [];
    const formattedImages: PortfolioImage[] = urls.map((url, index) => {
      const fileName = url.split('/').pop() || `image-${index + 1}`;
      return {
        id: `portfolio-${index}`,
        url: url,
        name: fileName,
        created_at: new Date().toISOString()
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
        // Use a type assertion to access the independent property
        const userData = data as any;
        
        const profileData: ArtistProfileState = {
          ...data,
          id: data.id,
          user_id: data.id,
          full_name: data.full_name || '',
          portfolio: [],
          portfolio_urls: data.portfolio_urls || [],
          referral_count: data.credits || 0,
          affiliate_code: data.referral_code || '',
          avatar_url: data.avatar_url || '',
          profile_completion: data.profile_completion || 0,
          // Use the type-asserted userData to safely access independent
          independent: userData.independent !== undefined ? userData.independent : false,
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

  const firstName = state.artistProfile?.full_name ? state.artistProfile.full_name.split(' ')[0] : "Artist";
  
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
  
  const updateProfile = async (data: Partial<ArtistProfileState>) => {
    if (!user?.id) return;
    
    try {
      setState(prev => ({ ...prev, loading: true }));
      
      const { error } = await supabase
        .from('users')
        .update({
          ...data,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
      await fetchArtistProfile();
      toast.success("Profile updated successfully");
    } catch (err) {
      console.error('Error updating profile:', err);
      toast.error("Failed to update profile");
      setState(prev => ({ ...prev, loading: false }));
    }
  };
  
  const value: ArtistDataContextType = {
    artistProfile: state.artistProfile,
    loading: state.loading,
    error: state.error,
    updateProfile,
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

export const useArtistData = () => {
  const context = useContext(ArtistDataContext);
  if (context === undefined) {
    throw new Error('useArtistData must be used within an ArtistDataProvider');
  }
  return context;
};
