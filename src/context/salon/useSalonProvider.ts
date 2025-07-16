
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
      
      // Convert Json services to string[] and ensure proper typing
      const transformedSalons: Salon[] = (data || []).map(salon => ({
        ...salon,
        services: Array.isArray(salon.services) ? 
                 salon.services.filter(s => typeof s === 'string') as string[] : 
                 typeof salon.services === 'string' ? [salon.services] : []
      }));
      
      setSalons(transformedSalons);
      
      // Auto-select first salon if none selected and salons exist
      if (transformedSalons.length > 0 && !currentSalon) {
        console.log('Auto-selecting first salon:', transformedSalons[0]);
        setCurrentSalon(transformedSalons[0]);
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
      // Prepare data for database with owner_id and services as Json
      const insertData = {
        ...salonData,
        owner_id: userId,
        services: salonData.services ? salonData.services : null,
        id: crypto.randomUUID(), // Generate ID since it's required
      };
      
      const { data, error } = await supabase
        .from('salons')
        .insert(insertData)
        .select()
        .single();

      if (error) throw error;

      // Transform the data to match Salon type
      const transformedSalon: Salon = {
        ...data,
        services: Array.isArray(data.services) ? 
                 data.services.filter(s => typeof s === 'string') as string[] : 
                 typeof data.services === 'string' ? [data.services] : []
      };

      setSalons(prev => [transformedSalon, ...prev]);
      setCurrentSalon(transformedSalon);
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
      // Prepare data for database with services as Json
      const updateData = {
        ...updates,
        services: updates.services ? updates.services : undefined,
      };
      
      const { data, error } = await supabase
        .from('salons')
        .update(updateData)
        .eq('id', salonId)
        .select()
        .single();

      if (error) throw error;

      // Transform the data to match Salon type
      const transformedSalon: Salon = {
        ...data,
        services: Array.isArray(data.services) ? 
                 data.services.filter(s => typeof s === 'string') as string[] : 
                 typeof data.services === 'string' ? [data.services] : []
      };

      setSalons(prev => prev.map(s => s.id === salonId ? transformedSalon : s));
      if (currentSalon?.id === salonId) {
        setCurrentSalon(transformedSalon);
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
