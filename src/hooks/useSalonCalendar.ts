
import { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { supabase } from '@/integrations/supabase/client';
import { useSalon } from '@/context/salon';
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';

// Interfaces
interface BookingSlot {
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

  const { data: appointments = [], isLoading, error } = useQuery({
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
      return data || [];
    },
    enabled: !!currentSalon?.id
  });

  // Build calendar data structure
  const calendar: SalonCalendar = {};
  
  appointments.forEach(app => {
    const date = format(new Date(app.start_time), 'yyyy-MM-dd');
    const time = format(new Date(app.start_time), 'HH:mm');
    
    if (!calendar[date]) {
      calendar[date] = {};
    }
    
    if (!calendar[date][time]) {
      calendar[date][time] = [];
    }

    calendar[date][time].push({
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
    });
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
