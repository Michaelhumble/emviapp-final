
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Salon } from './types';
import { toast } from 'sonner';

export const useSalonProvider = (userId?: string) => {
  const [salons, setSalons] = useState<Salon[]>([]);
  const [currentSalon, setCurrentSalon] = useState<Salon | null>(null);
  const [isLoadingSalons, setIsLoadingSalons] = useState(true);

  const fetchSalons = useCallback(async () => {
    if (!userId) {
      console.log('No user ID provided, skipping salon fetch');
      setIsLoadingSalons(false);
      return;
    }

    try {
      setIsLoadingSalons(true);
      console.log('Fetching salons for user:', userId);
      
      const { data, error } = await supabase
        .from('salons')
        .select('*')
        .eq('owner_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching salons:', error);
        toast.error('Failed to load salons');
        throw error;
      }

      console.log('Fetched salons:', data);
      setSalons(data || []);
      
      // Auto-select first salon if none selected and salons exist
      if (data && data.length > 0 && !currentSalon) {
        console.log('Auto-selecting first salon:', data[0]);
        setCurrentSalon(data[0]);
      }
    } catch (error) {
      console.error('Error in fetchSalons:', error);
      setSalons([]);
    } finally {
      setIsLoadingSalons(false);
    }
  }, [userId, currentSalon]);

  const createSalon = async (salonData: Partial<Salon>) => {
    if (!userId) {
      toast.error('User not authenticated');
      return false;
    }

    try {
      const { data, error } = await supabase
        .from('salons')
        .insert({
          ...salonData,
          owner_id: userId,
        })
        .select()
        .single();

      if (error) throw error;

      setSalons(prev => [data, ...prev]);
      setCurrentSalon(data);
      toast.success('Salon created successfully!');
      return true;
    } catch (error) {
      console.error('Error creating salon:', error);
      toast.error('Failed to create salon');
      return false;
    }
  };

  const selectSalon = (salonId: string) => {
    const salon = salons.find(s => s.id === salonId);
    if (salon) {
      console.log('Selecting salon:', salon);
      setCurrentSalon(salon);
    }
  };

  const updateSalon = async (salonId: string, updates: Partial<Salon>) => {
    try {
      const { data, error } = await supabase
        .from('salons')
        .update(updates)
        .eq('id', salonId)
        .select()
        .single();

      if (error) throw error;

      setSalons(prev => prev.map(s => s.id === salonId ? data : s));
      if (currentSalon?.id === salonId) {
        setCurrentSalon(data);
      }
      toast.success('Salon updated successfully!');
      return true;
    } catch (error) {
      console.error('Error updating salon:', error);
      toast.error('Failed to update salon');
      return false;
    }
  };

  const deleteSalon = async (salonId: string) => {
    try {
      const { error } = await supabase
        .from('salons')
        .delete()
        .eq('id', salonId);

      if (error) throw error;

      setSalons(prev => prev.filter(s => s.id !== salonId));
      if (currentSalon?.id === salonId) {
        setCurrentSalon(null);
      }
      toast.success('Salon deleted successfully!');
      return true;
    } catch (error) {
      console.error('Error deleting salon:', error);
      toast.error('Failed to delete salon');
      return false;
    }
  };

  const refreshSalons = async () => {
    await fetchSalons();
  };

  useEffect(() => {
    fetchSalons();
  }, [fetchSalons]);

  return {
    salons,
    currentSalon,
    isLoadingSalons,
    createSalon,
    selectSalon,
    refreshSalons,
    updateSalon,
    deleteSalon,
  };
};
