
import { createContext, useContext, ReactNode, useState } from 'react';
import { useSalonProvider } from './useSalonProvider';
import { useAuth } from '@/context/auth';
import { Salon, SalonContextType } from './types';

// Create the context with default values matching the SalonContextType
const SalonContext = createContext<SalonContextType>({
  salon: null,
  setSalon: () => {},
  loading: false,
  salons: [],
  currentSalon: null,
  isLoadingSalons: true,
  createSalon: async () => false,
  selectSalon: () => {},
  refreshSalons: async () => {},
  updateSalon: async () => false,
  deleteSalon: async () => false
});

export const SalonProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [salon, setSalon] = useState<Salon | null>(null);
  const salonState = useSalonProvider(user?.id);
  const loading = salonState.isLoadingSalons;
  
  // Create a complete context value that includes all required properties
  const contextValue: SalonContextType = {
    ...salonState,
    salon: salonState.currentSalon || salon,
    setSalon,
    loading
  };

  return (
    <SalonContext.Provider value={contextValue}>
      {children}
    </SalonContext.Provider>
  );
};

export const useSalon = () => useContext(SalonContext);
