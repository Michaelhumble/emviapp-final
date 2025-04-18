
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './auth';
import { Salon } from './salon/types';

type SalonContextType = {
  currentSalonId: string | null;
  setCurrentSalonId: (id: string | null) => void;
  salonName: string | null;
  userSalons: any[] | null;
  loading: boolean;
  salons?: Salon[];
  currentSalon?: Salon | null;
  isLoadingSalons?: boolean;
  createSalon?: (salonData: Partial<Salon>) => Promise<boolean>;
  selectSalon?: (salonId: string) => void;
  refreshSalons?: () => Promise<void>;
  updateSalon?: (salonId: string, data: Partial<Salon>) => Promise<boolean>;
  deleteSalon?: (salonId: string) => Promise<boolean>;
};

const SalonContext = createContext<SalonContextType>({
  currentSalonId: null,
  setCurrentSalonId: () => {},
  salonName: null,
  userSalons: null,
  loading: true,
});

export const useSalonContext = () => useContext(SalonContext);

// To make imports cleaner/more consistent, we'll export an alias
export const useSalon = useSalonContext;

interface SalonProviderProps {
  children: ReactNode;
}

export const SalonProvider: React.FC<SalonProviderProps> = ({ children }) => {
  const { user, userProfile } = useAuth();
  const [currentSalonId, setCurrentSalonId] = useState<string | null>(null);
  const [salonName, setSalonName] = useState<string | null>(null);
  const [userSalons, setUserSalons] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSalons = async () => {
      if (!user) {
        setUserSalons(null);
        setCurrentSalonId(null);
        setSalonName(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // First, check if user has salon access
        const { data: accessData, error: accessError } = await supabase
          .from('user_salon_access')
          .select('salon_id, access_type')
          .eq('user_id', user.id);

        if (accessError) throw accessError;

        if (accessData && accessData.length > 0) {
          // User has salon access, fetch those salons
          const salonIds = accessData.map(access => access.salon_id);
          
          const { data: salonsData, error: salonsError } = await supabase
            .from('salons')
            .select('*')
            .in('id', salonIds);

          if (salonsError) throw salonsError;

          if (salonsData && salonsData.length > 0) {
            setUserSalons(salonsData);
            
            // Get the stored salon ID from localStorage, or use the first one
            const storedSalonId = localStorage.getItem('currentSalonId');
            const validStoredId = storedSalonId && 
              salonsData.some(salon => salon.id === storedSalonId) ? 
              storedSalonId : salonsData[0].id;
            
            setCurrentSalonId(validStoredId);
            
            // Set salon name
            const currentSalon = salonsData.find(salon => salon.id === validStoredId);
            setSalonName(currentSalon?.salon_name || null);
          } else {
            setUserSalons([]);
          }
        } else {
          // No salon access found
          setUserSalons([]);
        }
      } catch (error) {
        console.error('Error fetching salon data:', error);
        setUserSalons([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSalons();
  }, [user]);

  // Update localStorage when currentSalonId changes
  useEffect(() => {
    if (currentSalonId) {
      localStorage.setItem('currentSalonId', currentSalonId);
      
      // Update salon name
      if (userSalons) {
        const currentSalon = userSalons.find(salon => salon.id === currentSalonId);
        setSalonName(currentSalon?.salon_name || null);
      }
    }
  }, [currentSalonId, userSalons]);

  return (
    <SalonContext.Provider value={{ 
      currentSalonId, 
      setCurrentSalonId, 
      salonName,
      userSalons,
      loading,
    }}>
      {children}
    </SalonContext.Provider>
  );
};
