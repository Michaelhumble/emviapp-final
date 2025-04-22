
import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useAuth } from '@/context/auth';

interface ArtistDataContextType {
  firstName: string;
  specialty: string;
  loading: boolean;
  portfolioCount: number;
  bookingCount: number;
  reviewCount: number;
  averageRating: number;
}

const defaultContext: ArtistDataContextType = {
  firstName: '',
  specialty: '',
  loading: true,
  portfolioCount: 0,
  bookingCount: 0,
  reviewCount: 0,
  averageRating: 0
};

const ArtistDataContext = createContext<ArtistDataContextType>(defaultContext);

export const ArtistDataProvider = ({ children }: { children: ReactNode }) => {
  const { userProfile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Omit<ArtistDataContextType, 'loading'>>({
    firstName: '',
    specialty: '',
    portfolioCount: 0,
    bookingCount: 0,
    reviewCount: 0,
    averageRating: 0
  });

  useEffect(() => {
    if (userProfile) {
      // Extract first name from full name
      const firstName = userProfile.full_name?.split(' ')[0] || 'Artist';
      const specialty = userProfile.specialty || 'Nail Artist';

      // Set mock data for now - would be replaced with real API calls
      setData({
        firstName,
        specialty,
        portfolioCount: 12,
        bookingCount: 58,
        reviewCount: 24,
        averageRating: 4.9
      });
      
      setLoading(false);
    }
  }, [userProfile]);

  return (
    <ArtistDataContext.Provider value={{ 
      ...data,
      loading
    }}>
      {children}
    </ArtistDataContext.Provider>
  );
};

export const useArtistData = () => useContext(ArtistDataContext);
