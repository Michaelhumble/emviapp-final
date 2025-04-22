
import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useAuth } from '@/context/auth';
import { PortfolioImage } from '@/types/artist';

interface ArtistDataContextType {
  firstName: string;
  specialty: string;
  loading: boolean;
  portfolioCount: number;
  bookingCount: number;
  reviewCount: number;
  averageRating: number;
  
  // Add missing properties
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
  
  // Add default values for missing properties
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
  const [data, setData] = useState<Omit<ArtistDataContextType, 'loading' | 'loadingPortfolio' | 'refreshArtistProfile'>>({
    firstName: '',
    specialty: '',
    portfolioCount: 0,
    bookingCount: 0,
    reviewCount: 0,
    averageRating: 0,
    artistProfile: null,
    portfolioImages: []
  });

  // Function to refresh artist profile
  const refreshArtistProfile = async () => {
    if (userProfile) {
      setLoading(true);
      try {
        // In a real implementation, this would fetch updated data from an API
        // For now, we'll just simulate a refresh delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Update the profile data
        const firstName = userProfile.full_name?.split(' ')[0] || 'Artist';
        const specialty = userProfile.specialty || 'Nail Artist';

        setData(prev => ({
          ...prev,
          firstName,
          specialty,
          artistProfile: {
            ...userProfile,
            id: userProfile.user_id || userProfile.id,
          }
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
        // Mock portfolio data
        const mockPortfolioImages: PortfolioImage[] = [
          {
            id: "1",
            url: "/lovable-uploads/67947adb-5754-4569-aa1c-228d8f9db461.png",
            title: "French Gradient",
            description: "Classic French manicure with a modern gradient twist"
          },
          {
            id: "2",
            url: "/lovable-uploads/70c8662a-4525-4854-a529-62616b5b6c81.png",
            title: "Minimalist Line Art",
            description: "Simple yet elegant line art on a neutral base"
          },
          {
            id: "3",
            url: "/lovable-uploads/81e6d95d-e09b-45f0-a4bc-96358592e462.png",
            title: "Pink Floral Design",
            description: "Delicate floral patterns on a soft pink base"
          },
          {
            id: "4",
            url: "/lovable-uploads/7d585be5-b70d-4d65-b57f-803de81839ba.png",
            title: "Elegant Marble Pattern",
            description: "Luxurious marble effect with gold accents"
          },
          {
            id: "5",
            url: "/lovable-uploads/a3c08446-c1cb-492d-a361-7ec4aca18cfd.png",
            title: "Geometric Abstract",
            description: "Bold geometric patterns with contrasting colors"
          },
          {
            id: "6",
            url: "/lovable-uploads/c9e52825-c7f4-4923-aecf-a92a8799530b.png",
            title: "Glitter Accent",
            description: "Subtle glitter accents on a matte base"
          }
        ];
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 300));
        
        setData(prev => ({
          ...prev,
          portfolioImages: mockPortfolioImages,
          portfolioCount: mockPortfolioImages.length
        }));
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
    if (userProfile) {
      // Extract first name from full name
      const firstName = userProfile.full_name?.split(' ')[0] || 'Artist';
      const specialty = userProfile.specialty || 'Nail Artist';

      // Set mock data for now - would be replaced with real API calls
      setData(prev => ({
        ...prev,
        firstName,
        specialty,
        portfolioCount: 12,
        bookingCount: 58,
        reviewCount: 24,
        averageRating: 4.9,
        artistProfile: {
          ...userProfile,
          id: userProfile.user_id || userProfile.id,
          accepts_bookings: true,
          preferences: []
        }
      }));
      
      setLoading(false);
    }
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

export const useArtistData = () => useContext(ArtistDataContext);
