
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Salon } from './types';
import { toast } from 'sonner';

export const useSalonProvider = (userId: string | undefined) => {
  const [salons, setSalons] = useState<Salon[]>([]);
  const [currentSalon, setCurrentSalon] = useState<Salon | null>(null);
  const [isLoadingSalons, setIsLoadingSalons] = useState(true);

  // Fetch salons owned by the current user
  const fetchSalons = async () => {
    if (!userId) return;
    setIsLoadingSalons(true);

    try {
      // Use explicit type casting to avoid deep instantiation issues
      const { data, error } = await supabase
        .from('salons')
        .select('*')
        .eq('id', userId)
        .order('created_at', { ascending: false }) as unknown as { 
          data: Salon[] | null; 
          error: any; 
        };

      if (error) throw error;

      // Safely handle the data with explicit type assertion
      const salonData = (data || []) as Salon[];
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
    if (!userId) return false;

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
        owner_id: userId
      };
      
      // Use explicit type casting to avoid deep instantiation issues
      const { data, error } = await supabase
        .from('salons')
        .insert(newSalonData)
        .select() as unknown as { 
          data: Salon[] | null; 
          error: any; 
        };
        
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
      // Use explicit type casting to avoid deep instantiation issues
      const { error } = await supabase
        .from('salons')
        .update(data)
        .eq('id', salonId)
        .eq('owner_id', userId) as unknown as { 
          error: any; 
        };

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
      // Use explicit type casting to avoid deep instantiation issues
      const { error } = await supabase
        .from('salons')
        .delete()
        .eq('id', salonId)
        .eq('owner_id', userId) as unknown as { 
          error: any; 
        };

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

  // Initial load and salon selection from localStorage
  useEffect(() => {
    if (userId) {
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
  }, [userId]);

  return {
    salons,
    currentSalon,
    isLoadingSalons,
    createSalon,
    selectSalon,
    refreshSalons: fetchSalons,
    updateSalon,
    deleteSalon
  };
};
