
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';

interface ArtistData {
  // Add any artist data fields here
  profile?: any;
  services?: any[];
  portfolio?: any[];
}

interface ArtistDataContextType {
  data: ArtistData | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

const ArtistDataContext = createContext<ArtistDataContextType | undefined>(undefined);

export const ArtistDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<ArtistData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();

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
        
        // Fetch services (adjust table name if needed)
        const { data: servicesData, error: servicesError } = await supabase
          .from('services')
          .select('*')
          .eq('user_id', user.id);
          
        if (servicesError) throw servicesError;
        
        // Fetch portfolio items (adjust table name if needed)
        const { data: portfolioData, error: portfolioError } = await supabase
          .from('portfolio_items')
          .select('*')
          .eq('user_id', user.id);
          
        if (portfolioError) throw portfolioError;
        
        return {
          profile: profileData,
          services: servicesData || [],
          portfolio: portfolioData || []
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

  useEffect(() => {
    if (user?.id) {
      fetchArtistData();
    } else {
      setLoading(false);
    }
  }, [user?.id]);

  return (
    <ArtistDataContext.Provider 
      value={{ 
        data, 
        loading, 
        error, 
        refetch: fetchArtistData 
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
