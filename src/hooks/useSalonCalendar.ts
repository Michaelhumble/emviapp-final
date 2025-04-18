
import { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { supabase } from '@/integrations/supabase/client';
import { useSalon } from '@/context/salon';
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';

// Define explicit interface for the raw data from Supabase
interface AppointmentData {
  id: string;
  start_time: string;
  end_time: string;
  customer_name: string | null;
  customer_email: string | null;
  customer_phone: string | null;
  service_id: string;
  status: string;
  notes: string | null;
  services: {
    title?: string;
    price?: number;
  } | null;
}

// Interface for the processed booking slot
export interface BookingSlot {
  id: string;
  start: string;
  end: string;
  clientName: string;
  clientEmail?: string | null;
  clientPhone?: string | null;
  serviceId: string;
  serviceName: string;
  servicePrice: number;
  status: 'pending' | 'accepted' | 'completed' | 'cancelled' | 'declined';
  notes?: string;
}

// Define calendar type explicitly
export type SalonCalendar = Record<string, Record<string, BookingSlot[]>>;

export interface SalonCalendarReturn {
  calendar: SalonCalendar;
  currentMonth: Date;
  calendarDays: Date[];
  isLoading: boolean;
  error: Error | null;
  goToPreviousMonth: () => void;
  goToNextMonth: () => void;
  goToToday: () => void;
}

export const useSalonCalendar = (): SalonCalendarReturn => {
  const { currentSalon } = useSalon();
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const startDate = format(startOfMonth(currentMonth), 'yyyy-MM-dd');
  const endDate = format(endOfMonth(currentMonth), 'yyyy-MM-dd');

  // Use explicit typing for the query result
  const { data: appointmentsData = [], isLoading, error } = useQuery<AppointmentData[], Error>({
    queryKey: ['salon-appointments', currentSalon?.id, startDate, endDate],
    queryFn: async () => {
      if (!currentSalon?.id) return [];

      const { data, error } = await supabase
        .from('appointments')
        .select('*, services(*)')
        .eq('salon_id', currentSalon.id)
        .gte('start_time', startDate)
        .lte('end_time', endDate);

      if (error) throw error;
      return (data || []) as AppointmentData[];
    },
    enabled: !!currentSalon?.id
  });

  // Build calendar data structure
  const calendar: SalonCalendar = {};
  
  appointmentsData.forEach(app => {
    const date = format(new Date(app.start_time), 'yyyy-MM-dd');
    const time = format(new Date(app.start_time), 'HH:mm');
    
    if (!calendar[date]) {
      calendar[date] = {};
    }
    
    if (!calendar[date][time]) {
      calendar[date][time] = [];
    }

    // Create a BookingSlot with explicit construction
    const bookingSlot: BookingSlot = {
      id: app.id,
      start: app.start_time,
      end: app.end_time,
      clientName: app.customer_name || 'Unknown',
      clientEmail: app.customer_email,
      clientPhone: app.customer_phone,
      serviceId: app.service_id || '',
      serviceName: app.services?.title || 'Unknown Service',
      servicePrice: app.services?.price || 0,
      status: app.status as BookingSlot['status'],
      notes: app.notes || undefined
    };

    calendar[date][time].push(bookingSlot);
  });

  const calendarDays = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth)
  });

  const goToPreviousMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const goToToday = () => {
    setCurrentMonth(new Date());
  };

  return {
    calendar,
    currentMonth,
    calendarDays,
    isLoading,
    error: error as Error | null,
    goToPreviousMonth,
    goToNextMonth,
    goToToday
  };
};
