
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { startOfWeek, endOfWeek, eachDayOfInterval, format } from 'date-fns';
import { useSalon } from '@/context/salon';
import { SalonBooking } from '@/components/dashboard/salon/types';

// Define clear interfaces to prevent infinite type instantiation
interface SalonServiceRecord {
  id: string;
  name: string;
  price: number;
  duration_min: number;
}

interface AppointmentRecord {
  id: string;
  artist_id: string;
  customer_id?: string;
  customer_name?: string;
  customer_email?: string;
  customer_phone?: string;
  service_id?: string;
  start_time: string;
  end_time: string;
  notes?: string;
  status: string;
  created_at: string;
  updated_at: string;
  services?: SalonServiceRecord | null;
  assigned_staff_id?: string;
  assigned_staff_name?: string;
}

interface StaffMember {
  id: string;
  full_name: string;
  specialty: string;
  role: string;
  email: string;
  status: 'active' | 'inactive' | 'pending';
}

interface CalendarState {
  currentDate: Date;
  weekDays: Date[];
  appointments: AppointmentRecord[];
  isLoading: boolean;
  error: string | null;
  staffMembers: StaffMember[];
}

export const useSalonCalendar = () => {
  const { currentSalon } = useSalon();
  const [state, setState] = useState<CalendarState>({
    currentDate: new Date(),
    weekDays: [],
    appointments: [],
    isLoading: true,
    error: null,
    staffMembers: []
  });

  const goToNextWeek = () => {
    setState(prevState => {
      const newDate = new Date(prevState.currentDate);
      newDate.setDate(newDate.getDate() + 7);
      return { ...prevState, currentDate: newDate };
    });
  };

  const goToPreviousWeek = () => {
    setState(prevState => {
      const newDate = new Date(prevState.currentDate);
      newDate.setDate(newDate.getDate() - 7);
      return { ...prevState, currentDate: newDate };
    });
  };

  const goToToday = () => {
    setState(prevState => ({ ...prevState, currentDate: new Date() }));
  };

  useEffect(() => {
    if (!currentSalon?.id) return;

    const calculateWeekDays = () => {
      const start = startOfWeek(state.currentDate, { weekStartsOn: 1 }); // Monday
      const end = endOfWeek(state.currentDate, { weekStartsOn: 1 }); // Sunday
      return eachDayOfInterval({ start, end });
    };

    setState(prevState => ({
      ...prevState,
      weekDays: calculateWeekDays(),
      isLoading: true,
      error: null
    }));

    // Fetch staff members
    const fetchStaffMembers = async () => {
      try {
        const { data, error } = await supabase
          .from('salon_staff')
          .select('*')
          .eq('salon_id', currentSalon.id);

        if (error) throw error;

        const staffMembers = data.map(staff => ({
          id: staff.id,
          full_name: staff.full_name,
          specialty: staff.specialty || '',
          role: staff.role,
          email: staff.email,
          status: staff.status as 'active' | 'inactive' | 'pending'
        }));

        setState(prevState => ({
          ...prevState,
          staffMembers
        }));
      } catch (err) {
        console.error('Error fetching staff members:', err);
      }
    };

    // Fetch appointments for the week
    const fetchAppointments = async () => {
      try {
        const start = startOfWeek(state.currentDate, { weekStartsOn: 1 });
        const end = endOfWeek(state.currentDate, { weekStartsOn: 1 });

        const { data, error } = await supabase
          .from('appointments')
          .select(`
            *,
            services (
              id,
              name,
              price,
              duration_min
            )
          `)
          .eq('salon_id', currentSalon.id)
          .gte('start_time', start.toISOString())
          .lte('end_time', end.toISOString());

        if (error) throw error;

        // Safely cast and map the appointments
        const mappedAppointments: AppointmentRecord[] = [];
        
        if (data) {
          for (const apt of data) {
            // Use type assertion to ensure TypeScript recognizes the properties
            const typedApt = apt as unknown as {
              id: string;
              artist_id: string;
              customer_id?: string;
              customer_name?: string;
              customer_email?: string;
              customer_phone?: string;
              service_id?: string;
              start_time: string;
              end_time: string;
              notes?: string;
              status: string;
              created_at: string;
              updated_at: string;
              services?: SalonServiceRecord | null;
              assigned_staff_id?: string;
              assigned_staff_name?: string;
            };
            
            const appointment: AppointmentRecord = {
              id: typedApt.id,
              artist_id: typedApt.artist_id,
              customer_id: typedApt.customer_id,
              customer_name: typedApt.customer_name,
              customer_email: typedApt.customer_email,
              customer_phone: typedApt.customer_phone,
              service_id: typedApt.service_id,
              start_time: typedApt.start_time,
              end_time: typedApt.end_time,
              notes: typedApt.notes,
              status: typedApt.status,
              created_at: typedApt.created_at,
              updated_at: typedApt.updated_at,
              assigned_staff_id: typedApt.assigned_staff_id,
              assigned_staff_name: typedApt.assigned_staff_name
            };
            
            // Only add services if they exist and have the expected shape
            if (typedApt.services && typeof typedApt.services === 'object' && typedApt.services !== null && 'id' in typedApt.services) {
              appointment.services = {
                id: typedApt.services.id,
                name: typedApt.services.name,
                price: typedApt.services.price,
                duration_min: typedApt.services.duration_min
              };
            } else {
              appointment.services = null;
            }
            
            mappedAppointments.push(appointment);
          }
        }

        setState(prevState => ({
          ...prevState,
          appointments: mappedAppointments,
          isLoading: false
        }));
      } catch (err) {
        console.error('Error fetching appointments:', err);
        setState(prevState => ({
          ...prevState,
          error: 'Failed to load appointments',
          isLoading: false
        }));
      }
    };

    fetchStaffMembers();
    fetchAppointments();
  }, [state.currentDate, currentSalon?.id]);

  const formatAppointmentForDate = (date: Date): SalonBooking[] => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    
    // Filter appointments for this date and map to SalonBooking interface
    return state.appointments
      .filter(apt => apt.start_time.includes(formattedDate))
      .map(apt => ({
        id: apt.id,
        client_name: apt.customer_name || 'Unnamed client',
        client_email: apt.customer_email || null,
        client_phone: apt.customer_phone || null,
        service_name: apt.services?.name || 'Unnamed service',
        service_price: apt.services?.price || 0,
        date: new Date(apt.start_time),
        time: format(new Date(apt.start_time), 'h:mm a'),
        status: apt.status as any,
        assigned_staff_name: apt.assigned_staff_name || null,
        assigned_staff_id: apt.assigned_staff_id || null,
        notes: apt.notes || '',
        created_at: apt.created_at
      }));
  };

  return {
    currentDate: state.currentDate,
    weekDays: state.weekDays,
    appointments: state.appointments,
    isLoading: state.isLoading,
    error: state.error,
    staffMembers: state.staffMembers,
    goToNextWeek,
    goToPreviousWeek,
    goToToday,
    formatAppointmentForDate
  };
};
