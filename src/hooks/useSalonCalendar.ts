import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useSalon } from '@/context/salon';
import { SalonBooking } from '@/components/dashboard/salon/types';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';

export const useSalonCalendar = () => {
  const { currentSalon } = useSalon();
  const salonId = currentSalon?.id;
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const formattedStartDate = format(startOfMonth(currentMonth), 'yyyy-MM-dd');
  const formattedEndDate = format(endOfMonth(currentMonth), 'yyyy-MM-dd');

  // Fix the type instantiation issue by an explicit type annotation
  const appointmentsQuery = useQuery<SalonBooking[]>({
    queryKey: ['salon-appointments', salonId, formattedStartDate, formattedEndDate],
    queryFn: async () => {
      if (!salonId) return [];

      // Use 'appointments' table instead of 'salon_bookings'
      const { data, error } = await supabase
        .from('appointments')
        .select('*, services:service_id(title, price, duration_minutes)')
        .eq('salon_id', salonId)
        .gte('start_time', formattedStartDate)
        .lte('end_time', formattedEndDate)
        .order('start_time', { ascending: true });

      if (error) throw error;
      return data || [];
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

  // Fixed type safety for appointment mapping with explicit type assertions
  const mappedAppointments: SalonBooking[] = appointmentsQuery.data?.map(apt => {
    // Use optional chaining and type assertions to safely access properties
    const serviceName = apt.services?.title || 'Unknown Service';
    const servicePrice = apt.services?.price || 0;
    
    return {
      id: apt.id,
      client_name: apt.customer_name || '',
      client_email: apt.customer_email,
      client_phone: apt.customer_phone,
      service_name: serviceName,
      service_price: servicePrice,
      date: apt.start_time ? new Date(apt.start_time) : null,
      time: apt.start_time ? format(new Date(apt.start_time), 'HH:mm') : '',
      status: apt.status || 'pending',
      assigned_staff_id: apt.assigned_staff_id,
      assigned_staff_name: apt.assigned_staff_name,
      notes: apt.notes || '',
      created_at: apt.created_at || new Date().toISOString(),
    };
  }) || [];

  const getAppointmentsForDay = (day: Date): SalonBooking[] => {
    return mappedAppointments.filter(appointment =>
      appointment.date && isSameDay(appointment.date, day)
    );
  };

  return {
    currentMonth,
    calendarDays,
    appointments: mappedAppointments,
    isLoading: appointmentsQuery.isLoading,
    error: appointmentsQuery.error,
    goToPreviousMonth,
    goToNextMonth,
    goToToday,
    getAppointmentsForDay,
  };
};
