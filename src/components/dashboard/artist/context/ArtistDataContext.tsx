import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useAuth } from '@/context/auth';
import { PortfolioImage } from '@/types/artist';
import { supabase } from '@/integrations/supabase/client';

interface ArtistDataContextType {
  firstName: string;
  specialty: string;
  loading: boolean;
  portfolioCount: number;
  bookingCount: number;
  reviewCount: number;
  averageRating: number;
  artistProfile: any;
  refreshArtistProfile: () => Promise<void>;
  portfolioImages: PortfolioImage[];
  loadingPortfolio: boolean;
}

const defaultContext: ArtistDataContextType = {
  firstName: '',
  specialty: '',
  loading: true,
  portfolioCount: 0,
  bookingCount: 0,
  reviewCount: 0,
  averageRating: 0,
  artistProfile: null,
  refreshArtistProfile: async () => {},
  portfolioImages: [],
  loadingPortfolio: true
};

const ArtistDataContext = createContext<ArtistDataContextType>(defaultContext);

export const ArtistDataProvider = ({ children }: { children: ReactNode }) => {
  const { userProfile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [loadingPortfolio, setLoadingPortfolio] = useState(true);
  const [data, setData] = useState<Omit<ArtistDataContextType, 'loading' | 'loadingPortfolio' | 'refreshArtistProfile'>>(defaultContext);

  const refreshArtistProfile = async () => {
    if (userProfile) {
      setLoading(true);
      try {
        const firstName = userProfile.full_name?.split(' ')[0] || 'Artist';
        const specialty = userProfile.specialty || 'Nail Artist';

        // Set mock initial data for new artists
        const isNewArtist = !userProfile.profile_completion || userProfile.profile_completion < 20;
        const initialData = {
          firstName,
          specialty,
          portfolioCount: isNewArtist ? 3 : data.portfolioCount,
          bookingCount: isNewArtist ? 0 : data.bookingCount,
          reviewCount: isNewArtist ? 0 : data.reviewCount,
          averageRating: isNewArtist ? 5.0 : data.averageRating,
          artistProfile: {
            ...userProfile,
            id: userProfile.user_id || userProfile.id,
            accepts_bookings: true
          }
        };

        setData(prevData => ({
          ...prevData,
          ...initialData
        }));
      } catch (error) {
        console.error("Error refreshing artist profile:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  // Load portfolio images
  useEffect(() => {
    const loadPortfolio = async () => {
      setLoadingPortfolio(true);
      try {
        const { data: portfolioItems, error } = await supabase
          .from('portfolio_items')
          .select('*')
          .eq('user_id', userProfile?.id)
          .order('order', { ascending: true });

        if (!error && portfolioItems) {
          const transformedItems: PortfolioImage[] = portfolioItems.map(item => ({
            id: item.id,
            url: item.image_url,
            title: item.title,
            description: item.description
          }));

          setData(prev => ({
            ...prev,
            portfolioImages: transformedItems,
            portfolioCount: transformedItems.length
          }));
        }
      } catch (error) {
        console.error("Error loading portfolio:", error);
      } finally {
        setLoadingPortfolio(false);
      }
    };
    
    if (userProfile) {
      loadPortfolio();
    }
  }, [userProfile]);

  useEffect(() => {
    refreshArtistProfile();
  }, [userProfile]);

  return (
    <ArtistDataContext.Provider value={{ 
      ...data,
      loading,
      loadingPortfolio,
      refreshArtistProfile
    }}>
      {children}
    </ArtistDataContext.Provider>
  );
};

export const useArtistData = () => {
  const context = useContext(ArtistDataContext);
  if (!context) {
    throw new Error("useArtistData must be used within an ArtistDataProvider");
  }
  return context;
};
