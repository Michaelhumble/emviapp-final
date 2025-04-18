
import { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { supabase } from '@/integrations/supabase/client';
import { useSalon } from '@/context/salon';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';

// Define the SalonBooking interface to match the component expectations
interface SalonBooking {
  id: string;
  client_name: string;
  client_email?: string | null;
  client_phone?: string | null;
  service_name: string;
  service_price: number;
  date: Date | null;
  time: string;
  status: 'pending' | 'accepted' | 'completed' | 'cancelled' | 'declined';
  assigned_staff_id?: string;
  assigned_staff_name?: string;
  notes?: string;
  created_at: string;
}

// Define the raw appointment data from Supabase
interface AppointmentData {
  id: string;
  artist_id: string;
  customer_name?: string | null;
  customer_email?: string | null;
  customer_phone?: string | null;
  start_time: string;
  end_time: string;
  status: string;
  assigned_staff_id?: string | null;
  assigned_staff_name?: string | null;
  notes?: string | null;
  created_at: string;
  services?: {
    title?: string;
    price?: number;
    duration_minutes?: number;
  } | null;
}

export const useSalonCalendar = () => {
  const { currentSalon } = useSalon();
  const salonId = currentSalon?.id;
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const formattedStartDate = format(startOfMonth(currentMonth), 'yyyy-MM-dd');
  const formattedEndDate = format(endOfMonth(currentMonth), 'yyyy-MM-dd');

  // Fixed the recursive type error by explicitly typing the return value
  const appointmentsQuery = useQuery<SalonBooking[], Error>({
    queryKey: ['salon-appointments', salonId, formattedStartDate, formattedEndDate],
    queryFn: async () => {
      if (!salonId) return [];

      const { data, error } = await supabase
        .from('appointments')
        .select('*, services:service_id(*)')
        .eq('salon_id', salonId)
        .gte('start_time', formattedStartDate)
        .lte('end_time', formattedEndDate);

      if (error) throw error;
      
      return (data || []).map((apt: AppointmentData) => ({
        id: apt.id,
        client_name: apt.customer_name || '',
        client_email: apt.customer_email,
        client_phone: apt.customer_phone,
        service_name: apt.services?.title || 'Unknown Service',
        service_price: apt.services?.price || 0,
        date: apt.start_time ? new Date(apt.start_time) : null,
        time: apt.start_time ? format(new Date(apt.start_time), 'HH:mm') : '',
        status: apt.status as SalonBooking['status'],
        notes: apt.notes || '',
        created_at: apt.created_at,
      }));
    },
    enabled: !!salonId,
  });

  const goToPreviousMonth = () => {
    setCurrentMonth(prevMonth => {
      return new Date(prevMonth.getFullYear(), prevMonth.getMonth() - 1, 1);
    });
  };

  const goToNextMonth = () => {
    setCurrentMonth(prevMonth => {
      return new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 1);
    });
  };

  const goToToday = () => {
    setCurrentMonth(new Date());
  };

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getAppointmentsForDay = (day: Date): SalonBooking[] => {
    return (appointmentsQuery.data || []).filter(appointment =>
      appointment.date && isSameDay(appointment.date, day)
    );
  };

  return {
    currentMonth,
    calendarDays,
    appointments: appointmentsQuery.data || [],
    isLoading: appointmentsQuery.isLoading,
    error: appointmentsQuery.error,
    goToPreviousMonth,
    goToNextMonth,
    goToToday,
    getAppointmentsForDay,
  };
};
