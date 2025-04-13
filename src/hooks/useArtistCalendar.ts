
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { addDays, startOfWeek, endOfWeek, format, parseISO } from 'date-fns';
import { toast } from 'sonner';

export const useArtistCalendar = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [selectedBlockedTime, setSelectedBlockedTime] = useState<any>(null);
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);
  const [isBlockTimeDialogOpen, setIsBlockTimeDialogOpen] = useState(false);
  
  // Calculate the start and end of the current week
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 }); // Monday as first day
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });
  
  // Generate array of 7 days for the week view
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  
  // Fetch appointments
  const { data: appointments = [], isLoading: isLoadingAppointments } = useQuery({
    queryKey: ['appointments', user?.id, format(weekStart, 'yyyy-MM-dd'), format(weekEnd, 'yyyy-MM-dd')],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('appointments')
        .select('*, services(title, price, duration_minutes)')
        .eq('artist_id', user.id)
        .gte('start_time', weekStart.toISOString())
        .lte('end_time', weekEnd.toISOString())
        .order('start_time', { ascending: true });
      
      if (error) {
        throw error;
      }
      
      return data || [];
    },
    enabled: !!user?.id
  });
  
  // Fetch blocked times
  const { data: blockedTimes = [], isLoading: isLoadingBlockedTimes } = useQuery({
    queryKey: ['blocked-times', user?.id, format(weekStart, 'yyyy-MM-dd'), format(weekEnd, 'yyyy-MM-dd')],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('blocked_times')
        .select('*')
        .eq('artist_id', user.id)
        .gte('start_time', weekStart.toISOString())
        .lte('end_time', weekEnd.toISOString())
        .order('start_time', { ascending: true });
      
      if (error) {
        throw error;
      }
      
      return data || [];
    },
    enabled: !!user?.id
  });
  
  // Create/update appointment mutation
  const { mutateAsync: saveAppointment } = useMutation({
    mutationFn: async (bookingData: any) => {
      if (!user?.id) throw new Error("User not authenticated");
      
      // Prepare the appointment data
      const appointmentData = {
        ...bookingData,
        artist_id: user.id
      };
      
      if (bookingData.id) {
        // Update existing appointment
        const { data, error } = await supabase
          .from('appointments')
          .update(appointmentData)
          .eq('id', bookingData.id)
          .select()
          .single();
        
        if (error) throw error;
        return data;
      } else {
        // Create new appointment
        const { data, error } = await supabase
          .from('appointments')
          .insert(appointmentData)
          .select()
          .single();
        
        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      toast.success('Booking saved successfully');
    },
    onError: (error: any) => {
      toast.error(`Error saving booking: ${error.message}`);
    }
  });
  
  // Create/update blocked time mutation
  const { mutateAsync: saveBlockedTime } = useMutation({
    mutationFn: async (data: any) => {
      if (!user?.id) throw new Error("User not authenticated");
      
      // Prepare the blocked time data
      const blockedTimeData = {
        ...data,
        artist_id: user.id
      };
      
      if (data.id) {
        // Update existing blocked time
        const { data: updatedData, error } = await supabase
          .from('blocked_times')
          .update(blockedTimeData)
          .eq('id', data.id)
          .select()
          .single();
        
        if (error) throw error;
        return updatedData;
      } else {
        // Create new blocked time
        const { data: newData, error } = await supabase
          .from('blocked_times')
          .insert(blockedTimeData)
          .select()
          .single();
        
        if (error) throw error;
        return newData;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blocked-times'] });
      toast.success('Time blocked successfully');
    },
    onError: (error: any) => {
      toast.error(`Error blocking time: ${error.message}`);
    }
  });
  
  // Delete appointment mutation
  const { mutateAsync: deleteAppointment } = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('appointments')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      toast.success('Booking deleted successfully');
    },
    onError: (error: any) => {
      toast.error(`Error deleting booking: ${error.message}`);
    }
  });
  
  // Delete blocked time mutation
  const { mutateAsync: deleteBlockedTime } = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('blocked_times')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blocked-times'] });
      toast.success('Blocked time removed successfully');
    },
    onError: (error: any) => {
      toast.error(`Error removing blocked time: ${error.message}`);
    }
  });
  
  // Navigation functions
  const goToPreviousWeek = () => {
    setCurrentDate(prevDate => addDays(prevDate, -7));
  };
  
  const goToNextWeek = () => {
    setCurrentDate(prevDate => addDays(prevDate, 7));
  };
  
  const goToToday = () => {
    setCurrentDate(new Date());
  };
  
  // Dialog control functions
  const openAddBookingDialog = () => {
    setSelectedBooking(null);
    setIsBookingDialogOpen(true);
  };
  
  const openEditBookingDialog = (booking: any) => {
    setSelectedBooking(booking);
    setIsBookingDialogOpen(true);
  };
  
  const openBlockTimeDialog = () => {
    setSelectedBlockedTime(null);
    setIsBlockTimeDialogOpen(true);
  };
  
  const openEditBlockedTimeDialog = (blockedTime: any) => {
    setSelectedBlockedTime(blockedTime);
    setIsBlockTimeDialogOpen(true);
  };
  
  return {
    currentDate,
    weekDays,
    appointments,
    blockedTimes,
    isLoadingAppointments,
    isLoadingBlockedTimes,
    selectedBooking,
    selectedBlockedTime,
    isBookingDialogOpen,
    isBlockTimeDialogOpen,
    goToPreviousWeek,
    goToNextWeek,
    goToToday,
    openAddBookingDialog,
    openEditBookingDialog,
    openBlockTimeDialog,
    openEditBlockedTimeDialog,
    setIsBookingDialogOpen,
    setIsBlockTimeDialogOpen,
    saveAppointment,
    saveBlockedTime,
    deleteAppointment,
    deleteBlockedTime
  };
};
