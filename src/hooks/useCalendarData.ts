
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Booking, AvailabilityRecord } from '@/types/calendar';
import { startOfWeek, endOfWeek, addDays, format } from 'date-fns';
import { toast } from 'sonner';

export const useCalendarData = (userId: string, userRole: string) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [availability, setAvailability] = useState<AvailabilityRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch bookings and availability data based on user role and ID
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Get current week date range
      const now = new Date();
      const weekStart = startOfWeek(now, { weekStartsOn: 1 }); // Start week on Monday
      const weekEnd = endOfWeek(now, { weekStartsOn: 1 });
      
      // Fetch bookings
      let bookingsQuery;
      
      if (userRole === 'artist') {
        // For artists, get bookings where they are the recipient
        bookingsQuery = await supabase
          .from('appointments')
          .select('*')
          .eq('artist_id', userId)
          .gte('start_time', weekStart.toISOString())
          .lte('end_time', weekEnd.toISOString())
          .order('start_time', { ascending: true });
      } else if (userRole === 'owner') {
        // For salon owners, get all bookings for their salon
        // First, get the salon ID
        const { data: salonData, error: salonError } = await supabase
          .from('salons')
          .select('id')
          .eq('owner_id', userId)
          .single();
        
        if (salonError && salonError.code !== 'PGRST116') {
          throw new Error('Failed to retrieve salon information');
        }
        
        if (salonData) {
          // Then get all bookings for that salon by joining with the salon_staff table
          const { data: staffData, error: staffError } = await supabase
            .from('salon_staff')
            .select('email')
            .eq('salon_id', salonData.id);
          
          if (staffError) throw staffError;
          
          if (staffData && staffData.length > 0) {
            const staffEmails = staffData.map(staff => staff.email);
            
            // Get user IDs from emails
            const { data: artistData, error: artistError } = await supabase
              .from('users')
              .select('id')
              .in('email', staffEmails);
            
            if (artistError) throw artistError;
            
            if (artistData && artistData.length > 0) {
              const artistIds = artistData.map(artist => artist.id);
              
              bookingsQuery = await supabase
                .from('appointments')
                .select('*')
                .in('artist_id', artistIds)
                .gte('start_time', weekStart.toISOString())
                .lte('end_time', weekEnd.toISOString())
                .order('start_time', { ascending: true });
            } else {
              bookingsQuery = { data: [], error: null };
            }
          } else {
            bookingsQuery = { data: [], error: null };
          }
        } else {
          bookingsQuery = { data: [], error: null };
        }
      }
      
      if (bookingsQuery.error) throw bookingsQuery.error;
      
      // Fetch availability settings
      const { data: availabilityData, error: availabilityError } = await supabase
        .from('availability')
        .select('*')
        .eq('artist_id', userId);
        
      if (availabilityError) throw availabilityError;
      
      // Process the data
      setBookings(bookingsQuery.data || []);
      setAvailability(availabilityData || []);
      
    } catch (err: any) {
      console.error('Error fetching calendar data:', err);
      setError(err.message || 'Failed to load calendar data');
      toast.error('Could not load calendar data');
    } finally {
      setIsLoading(false);
    }
  }, [userId, userRole]);
  
  // Create new availability record
  const createAvailability = async (dayOfWeek: string, startTime: string, endTime: string) => {
    try {
      const { data, error } = await supabase
        .from('availability')
        .insert({
          artist_id: userId,
          day_of_week: dayOfWeek,
          start_time: startTime,
          end_time: endTime
        })
        .select()
        .single();
        
      if (error) throw error;
      
      setAvailability(prev => [...prev, data]);
      toast.success('Availability added');
      return data;
    } catch (err: any) {
      console.error('Error creating availability:', err);
      toast.error('Failed to add availability');
      throw err;
    }
  };
  
  // Update existing availability record
  const updateAvailability = async (id: string, startTime: string, endTime: string) => {
    try {
      const { data, error } = await supabase
        .from('availability')
        .update({
          start_time: startTime,
          end_time: endTime
        })
        .eq('id', id)
        .select()
        .single();
        
      if (error) throw error;
      
      setAvailability(prev => 
        prev.map(item => item.id === id ? data : item)
      );
      
      toast.success('Availability updated');
      return data;
    } catch (err: any) {
      console.error('Error updating availability:', err);
      toast.error('Failed to update availability');
      throw err;
    }
  };
  
  // Delete availability record
  const deleteAvailability = async (id: string) => {
    try {
      const { error } = await supabase
        .from('availability')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      setAvailability(prev => 
        prev.filter(item => item.id !== id)
      );
      
      toast.success('Availability removed');
    } catch (err: any) {
      console.error('Error deleting availability:', err);
      toast.error('Failed to remove availability');
      throw err;
    }
  };
  
  // Load data on component mount
  useEffect(() => {
    if (userId) {
      fetchData();
    }
  }, [userId, fetchData]);
  
  return {
    bookings,
    availability,
    isLoading,
    error,
    refreshData: fetchData,
    createAvailability,
    updateAvailability,
    deleteAvailability
  };
};
