
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';

export type Salon = {
  id: string;
  owner_id?: string;
  salon_name: string;
  logo_url?: string;
  location?: string;
  about?: string;
  website?: string;
  instagram?: string;
  phone?: string;
  created_at: string;
  updated_at?: string;
};

type SalonContextType = {
  salons: Salon[];
  currentSalon: Salon | null;
  isLoadingSalons: boolean;
  createSalon: (salonData: Partial<Salon>) => Promise<boolean>;
  selectSalon: (salonId: string) => void;
  refreshSalons: () => Promise<void>;
  updateSalon: (salonId: string, data: Partial<Salon>) => Promise<boolean>;
  deleteSalon: (salonId: string) => Promise<boolean>;
};

const SalonContext = createContext<SalonContextType>({
  salons: [],
  currentSalon: null,
  isLoadingSalons: true,
  createSalon: async () => false,
  selectSalon: () => {},
  refreshSalons: async () => {},
  updateSalon: async () => false,
  deleteSalon: async () => false,
});

export const SalonProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [salons, setSalons] = useState<Salon[]>([]);
  const [currentSalon, setCurrentSalon] = useState<Salon | null>(null);
  const [isLoadingSalons, setIsLoadingSalons] = useState(true);

  // Fetch salons owned by the current user
  const fetchSalons = async () => {
    if (!user?.id) return;
    setIsLoadingSalons(true);

    try {
      const { data, error } = await supabase
        .from('salons')
        .select('*')
        .eq('owner_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Properly cast the data
      const salonData: Salon[] = data || [];
      setSalons(salonData);
      
      // If there's at least one salon and no current salon is set, select the first one
      if (salonData.length > 0 && !currentSalon) {
        setCurrentSalon(salonData[0]);
        // Save selected salon to localStorage
        localStorage.setItem('selected_salon_id', salonData[0].id);
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
    if (!user?.id) return false;

    try {
      // Create new salon data with owner_id
      const newSalonData = {
        salon_name: salonData.salon_name || 'New Salon',
        logo_url: salonData.logo_url,
        location: salonData.location,
        about: salonData.about,
        website: salonData.website,
        instagram: salonData.instagram,
        phone: salonData.phone,
        owner_id: user.id
      };
      
      // Use explicit any type to avoid TypeScript issues
      const result = await supabase
        .from('salons')
        .insert(newSalonData)
        .select();
        
      const { data, error } = result;

      if (error) {
        if (error.message.includes('maximum of 3 salons')) {
          toast.error('You have reached the maximum limit of 3 salons');
        } else {
          toast.error('Failed to create salon');
        }
        throw error;
      }

      if (data && data.length > 0) {
        const newSalon = data[0] as Salon;
        setSalons(prev => [newSalon, ...prev]);
        setCurrentSalon(newSalon);
        localStorage.setItem('selected_salon_id', newSalon.id);
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
      const result = await supabase
        .from('salons')
        .update(data)
        .eq('id', salonId)
        .eq('owner_id', user?.id);
        
      const { error } = result;

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
    if (!confirm('Are you sure you want to delete this salon? This action cannot be undone.')) {
      return false;
    }

    try {
      const result = await supabase
        .from('salons')
        .delete()
        .eq('id', salonId)
        .eq('owner_id', user?.id);
        
      const { error } = result;

      if (error) throw error;

      // Update local state
      setSalons(prev => prev.filter(salon => salon.id !== salonId));

      // If the deleted salon was the current one, select another one if available
      if (currentSalon?.id === salonId) {
        const remainingSalons = salons.filter(salon => salon.id !== salonId);
        if (remainingSalons.length > 0) {
          setCurrentSalon(remainingSalons[0]);
          localStorage.setItem('selected_salon_id', remainingSalons[0].id);
        } else {
          setCurrentSalon(null);
          localStorage.removeItem('selected_salon_id');
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
      localStorage.setItem('selected_salon_id', salonId);
    }
  };

  // Initial load
  useEffect(() => {
    if (user?.id) {
      // Check if there's a saved salon selection
      const savedSalonId = localStorage.getItem('selected_salon_id');
      
      // Fetch salons first
      fetchSalons().then(() => {
        // After fetching, try to select the saved salon
        if (savedSalonId) {
          const salon = salons.find(s => s.id === savedSalonId);
          if (salon) {
            setCurrentSalon(salon);
          }
        }
      });
    }
  }, [user?.id]);

  const value = {
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

export const useSalon = () => useContext(SalonContext);
