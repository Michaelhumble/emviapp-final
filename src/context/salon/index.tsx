
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Salon, SalonContextType } from './types';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Create context with default values
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

// Provider component
export const SalonProvider = ({ children }: { children: ReactNode }) => {
  const [salon, setSalon] = useState<Salon | null>(null);
  const [loading, setLoading] = useState(false);
  const [salons, setSalons] = useState<Salon[]>([]);
  const [currentSalon, setCurrentSalon] = useState<Salon | null>(null);
  const [isLoadingSalons, setIsLoadingSalons] = useState(true);

  // Fetch salons
  const fetchSalons = async () => {
    setIsLoadingSalons(true);
    try {
      const { data, error } = await supabase
        .from('salons')
        .select('*');
      
      if (error) throw error;
      
      const salonData = data as Salon[];
      setSalons(salonData);
      
      if (salonData.length > 0 && !currentSalon) {
        setCurrentSalon(salonData[0]);
        setSalon(salonData[0]);
      }
    } catch (err) {
      console.error('Error fetching salons:', err);
      toast.error('Failed to load your salons');
    } finally {
      setIsLoadingSalons(false);
    }
  };

  // Create a new salon
  const createSalon = async (salonData: Partial<Salon>): Promise<boolean> => {
    try {
      const newSalonData = {
        salon_name: salonData.salon_name || 'New Salon',
        logo_url: salonData.logo_url,
        location: salonData.location,
        about: salonData.about,
        website: salonData.website,
        instagram: salonData.instagram,
        phone: salonData.phone,
      };
      
      const { data, error } = await supabase
        .from('salons')
        .insert(newSalonData)
        .select();
        
      if (error) {
        toast.error('Failed to create salon');
        throw error;
      }

      if (data && data.length > 0) {
        const newSalon = data[0] as Salon;
        setSalons(prev => [newSalon, ...prev]);
        setCurrentSalon(newSalon);
        setSalon(newSalon);
        toast.success('New salon created successfully');
        return true;
      }

      return false;
    } catch (err) {
      console.error('Error creating salon:', err);
      return false;
    }
  };

  // Update a salon
  const updateSalon = async (salonId: string, data: Partial<Salon>): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('salons')
        .update(data)
        .eq('id', salonId);

      if (error) throw error;

      // Update local state
      setSalons(prev => 
        prev.map(salon => 
          salon.id === salonId ? { ...salon, ...data } : salon
        )
      );

      // If the current salon was updated, update that too
      if (currentSalon?.id === salonId) {
        setCurrentSalon(prev => prev ? { ...prev, ...data } : null);
        setSalon(prev => prev ? { ...prev, ...data } : null);
      }

      toast.success('Salon updated successfully');
      return true;
    } catch (err) {
      console.error('Error updating salon:', err);
      toast.error('Failed to update salon');
      return false;
    }
  };

  // Delete a salon
  const deleteSalon = async (salonId: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('salons')
        .delete()
        .eq('id', salonId);

      if (error) throw error;

      // Update local state
      setSalons(prev => prev.filter(salon => salon.id !== salonId));

      // If the deleted salon was the current one, select another one if available
      if (currentSalon?.id === salonId) {
        const remainingSalons = salons.filter(salon => salon.id !== salonId);
        if (remainingSalons.length > 0) {
          setCurrentSalon(remainingSalons[0]);
          setSalon(remainingSalons[0]);
        } else {
          setCurrentSalon(null);
          setSalon(null);
        }
      }

      toast.success('Salon deleted successfully');
      return true;
    } catch (err) {
      console.error('Error deleting salon:', err);
      toast.error('Failed to delete salon');
      return false;
    }
  };

  // Select a salon
  const selectSalon = (salonId: string) => {
    const salon = salons.find(s => s.id === salonId);
    if (salon) {
      setCurrentSalon(salon);
      setSalon(salon);
    }
  };

  // Initial fetch of salons
  useEffect(() => {
    fetchSalons();
  }, []);

  // Create the value object
  const value = {
    salon,
    setSalon,
    loading,
    salons,
    currentSalon,
    isLoadingSalons,
    createSalon,
    selectSalon,
    refreshSalons: fetchSalons,
    updateSalon,
    deleteSalon
  };

  return <SalonContext.Provider value={value}>{children}</SalonContext.Provider>;
};

// Custom hook for using the context
export const useSalon = () => {
  const context = useContext(SalonContext);
  if (context === undefined) {
    throw new Error('useSalon must be used within a SalonProvider');
  }
  return context;
};
