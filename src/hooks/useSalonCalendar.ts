
import { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { supabase } from '@/integrations/supabase/client';
import { useSalon } from '@/context/salon';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';

// Simple flat types to avoid complex inference
export interface AppointmentData {
  id: string;
  artist_id: string;
  customer_name: string | null;
  customer_email: string | null;
  customer_phone: string | null;
  start_time: string;
  end_time: string;
  status: string;
  assigned_staff_id: string | null;
  assigned_staff_name: string | null;
  notes: string | null;
  created_at: string;
  services: {
    title: string | undefined;
    price: number | undefined;
    duration_minutes: number | undefined;
  } | null;
}

export interface SalonBooking {
  id: string;
  client_name: string;
  client_email: string | null;
  client_phone: string | null;
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

export interface SalonCalendarReturn {
  currentMonth: Date;
  calendarDays: Date[];
  appointments: SalonBooking[];
  isLoading: boolean;
  error: Error | null;
  goToPreviousMonth: () => void;
  goToNextMonth: () => void;
  goToToday: () => void;
  getAppointmentsForDay: (day: Date) => SalonBooking[];
}

export const useSalonCalendar = (): SalonCalendarReturn => {
  const { currentSalon } = useSalon();
  const salonId = currentSalon?.id;
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const formattedStartDate = format(startOfMonth(currentMonth), 'yyyy-MM-dd');
  const formattedEndDate = format(endOfMonth(currentMonth), 'yyyy-MM-dd');

  // Simple fetch function with explicit return type
  const fetchAppointments = async (): Promise<AppointmentData[]> => {
    if (!salonId) return [];

    const { data, error } = await supabase
      .from('appointments')
      .select('*, services:service_id(*)')
      .eq('salon_id', salonId)
      .gte('start_time', formattedStartDate)
      .lte('end_time', formattedEndDate);

    if (error) throw error;
    
    return data as AppointmentData[] || [];
  };

  // Direct query with no type inference complexity
  const queryResult = useQuery({
    queryKey: ['salon-appointments', salonId, formattedStartDate, formattedEndDate],
    queryFn: fetchAppointments,
    enabled: !!salonId
  });
  
  // Extract data, loading and error states with explicit typing
  const isLoading = queryResult.isLoading;
  const error = queryResult.error as Error | null;
  const appointmentsData = (queryResult.data || []) as AppointmentData[];

  // Transform data with explicit typing after fetching
  const appointments: SalonBooking[] = appointmentsData.map(item => ({
    id: item.id,
    client_name: item.customer_name || '',
    client_email: item.customer_email,
    client_phone: item.customer_phone,
    service_name: item.services?.title || 'Unknown Service',
    service_price: item.services?.price || 0,
    date: item.start_time ? new Date(item.start_time) : null,
    time: item.start_time ? format(new Date(item.start_time), 'HH:mm') : '',
    status: (item.status || 'pending') as SalonBooking['status'],
    assigned_staff_id: item.assigned_staff_id || undefined,
    assigned_staff_name: item.assigned_staff_name || undefined,
    notes: item.notes || '',
    created_at: item.created_at
  }));

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
    return appointments.filter(appointment =>
      appointment.date && isSameDay(appointment.date, day)
    );
  };

  // Explicitly return with the defined interface type
  return {
    currentMonth,
    calendarDays,
    appointments,
    isLoading,
    error,
    goToPreviousMonth,
    goToNextMonth,
    goToToday,
    getAppointmentsForDay,
  };
};
