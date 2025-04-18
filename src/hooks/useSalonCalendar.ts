import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useSalon } from '@/context/salon';
import { format, startOfWeek, endOfWeek, addDays, isSameDay, parseISO } from 'date-fns';
import { toast } from 'sonner';

export interface CalendarAppointment {
  id: string;
  clientName: string;
  clientEmail?: string;
  clientPhone?: string;
  serviceName: string;
  servicePrice: number;
  serviceDuration: number;
  startTime: Date;
  endTime: Date;
  status: 'pending' | 'accepted' | 'completed' | 'cancelled';
  notes?: string;
  staffId: string;
  staffName: string;
  staffAvatar?: string;
  createdAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  specialty?: string;
  avatarUrl?: string;
}

export interface Service {
  id: string;
  name: string;
  price: number;
  durationMinutes: number;
  description?: string;
}

interface SalonServiceRecord {
  id: string;
  name: string;
  price: number;
  duration_min: number;
  description?: string;
}

interface StaffRecord {
  id: string;
  full_name: string;
  specialty?: string;
  avatar_url?: string;
}

interface AppointmentRecord {
  id: string;
  customer_name: string;
  customer_email?: string;
  customer_phone?: string;
  start_time: string;
  end_time: string;
  status: string;
  notes?: string;
  artist_id: string;
  created_at: string;
  services?: SalonServiceRecord;
  assigned_staff?: StaffRecord;
}

export function useSalonCalendar(initialDate = new Date()) {
  const { currentSalon } = useSalon();
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate);
  const [weekDates, setWeekDates] = useState<Date[]>([]);
  const [appointments, setAppointments] = useState<CalendarAppointment[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const startDate = startOfWeek(selectedDate, { weekStartsOn: 1 });
    const endDate = endOfWeek(selectedDate, { weekStartsOn: 1 });
    
    const dates: Date[] = [];
    let currentDate = startDate;
    
    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate = addDays(currentDate, 1);
    }
    
    setWeekDates(dates);
  }, [selectedDate]);

  useEffect(() => {
    const fetchStaff = async () => {
      if (!currentSalon?.id) return;
      
      try {
        const { data, error } = await supabase
          .from('salon_staff')
          .select('id, full_name, specialty, avatar_url')
          .eq('salon_id', currentSalon.id)
          .eq('status', 'active');
          
        if (error) throw error;
        
        if (data) {
          setTeamMembers(data.map(staff => ({
            id: staff.id,
            name: staff.full_name,
            specialty: staff.specialty,
            avatarUrl: staff.avatar_url
          })));
        }
      } catch (err) {
        console.error("Error fetching staff:", err);
        setError("Failed to load staff members");
      }
    };
    
    fetchStaff();
  }, [currentSalon?.id]);

  useEffect(() => {
    const fetchServices = async () => {
      if (!currentSalon?.id) return;
      
      try {
        const { data, error } = await supabase
          .from('salon_services')
          .select('id, name, price, duration_min, description')
          .eq('salon_id', currentSalon.id);
          
        if (error) throw error;
        
        if (data) {
          setServices(data.map(service => ({
            id: service.id,
            name: service.name,
            price: service.price,
            durationMinutes: service.duration_min,
            description: service.description
          })));
        }
      } catch (err) {
        console.error("Error fetching services:", err);
        setError("Failed to load services");
      }
    };
    
    fetchServices();
  }, [currentSalon?.id]);

  const fetchAppointments = useCallback(async () => {
    if (!currentSalon?.id || weekDates.length === 0) return;
    
    setIsLoading(true);
    
    try {
      const startDate = format(weekDates[0], 'yyyy-MM-dd');
      const endDate = format(weekDates[weekDates.length - 1], 'yyyy-MM-dd');
      
      const { data, error } = await supabase
        .from('appointments')
        .select(`
          *,
          services(name, price, duration_min),
          assigned_staff:artist_id(id, full_name, avatar_url)
        `)
        .eq('salon_id', currentSalon.id)
        .gte('start_time', `${startDate}T00:00:00`)
        .lte('start_time', `${endDate}T23:59:59`);
          
      if (error) throw error;
      
      const formattedAppointments: CalendarAppointment[] = data?.map((apt: AppointmentRecord) => {
        const serviceData = apt.services || {
          id: '',
          name: 'Unknown Service',
          price: 0,
          duration_min: 60
        };
        
        const staffData = apt.assigned_staff || {
          id: apt.artist_id,
          full_name: 'Unassigned',
          avatar_url: undefined
        };
        
        return {
          id: apt.id,
          clientName: apt.customer_name || 'Client',
          clientEmail: apt.customer_email,
          clientPhone: apt.customer_phone,
          serviceName: serviceData.name,
          servicePrice: serviceData.price,
          serviceDuration: serviceData.duration_min,
          startTime: new Date(apt.start_time),
          endTime: new Date(apt.end_time),
          status: apt.status as 'pending' | 'accepted' | 'completed' | 'cancelled',
          notes: apt.notes,
          staffId: staffData.id,
          staffName: staffData.full_name,
          staffAvatar: staffData.avatar_url,
          createdAt: apt.created_at
        };
      }) || [];
      
      setAppointments(formattedAppointments);
      setError(null);
    } catch (err) {
      console.error("Error fetching appointments:", err);
      setError("Failed to load appointments");
    } finally {
      setIsLoading(false);
    }
  }, [currentSalon?.id, weekDates]);

  const saveAppointment = async (appointment: Omit<CalendarAppointment, 'id' | 'createdAt'> & { id?: string }) => {
    if (!currentSalon?.id) return false;
    
    try {
      const appointmentData = {
        salon_id: currentSalon.id,
        customer_name: appointment.clientName,
        customer_email: appointment.clientEmail,
        customer_phone: appointment.clientPhone,
        artist_id: appointment.staffId,
        service_id: appointment.serviceName,
        start_time: appointment.startTime.toISOString(),
        end_time: appointment.endTime.toISOString(),
        status: appointment.status,
        notes: appointment.notes
      };
      
      if (appointment.id) {
        const { error } = await supabase
          .from('appointments')
          .update(appointmentData)
          .eq('id', appointment.id);
          
        if (error) throw error;
        
        toast.success("Appointment updated successfully");
      } else {
        const { error } = await supabase
          .from('appointments')
          .insert(appointmentData);
          
        if (error) throw error;
        
        toast.success("Appointment created successfully");
      }
      
      await fetchAppointments();
      return true;
    } catch (err) {
      console.error("Error saving appointment:", err);
      toast.error("Failed to save appointment");
      return false;
    }
  };

  const updateAppointmentStatus = async (appointmentId: string, status: CalendarAppointment['status']) => {
    if (!currentSalon?.id) return false;
    
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ status })
        .eq('id', appointmentId)
        .eq('salon_id', currentSalon.id);
        
      if (error) throw error;
      
      setAppointments(prev => 
        prev.map(apt => 
          apt.id === appointmentId ? { ...apt, status } : apt
        )
      );
      
      toast.success(`Appointment marked as ${status}`);
      return true;
    } catch (err) {
      console.error("Error updating appointment status:", err);
      toast.error("Failed to update appointment status");
      return false;
    }
  };

  const deleteAppointment = async (appointmentId: string) => {
    if (!currentSalon?.id) return false;
    
    try {
      const { error } = await supabase
        .from('appointments')
        .delete()
        .eq('id', appointmentId)
        .eq('salon_id', currentSalon.id);
        
      if (error) throw error;
      
      setAppointments(prev => prev.filter(apt => apt.id !== appointmentId));
      
      toast.success("Appointment deleted successfully");
      return true;
    } catch (err) {
      console.error("Error deleting appointment:", err);
      toast.error("Failed to delete appointment");
      return false;
    }
  };

  const getAppointmentsForDay = (day: Date) => {
    return appointments.filter(apt => isSameDay(apt.startTime, day));
  };

  const goToPreviousWeek = () => {
    setSelectedDate(prev => addDays(prev, -7));
  };

  const goToNextWeek = () => {
    setSelectedDate(prev => addDays(prev, 7));
  };

  const goToToday = () => {
    setSelectedDate(new Date());
  };

  useEffect(() => {
    if (currentSalon?.id && weekDates.length > 0) {
      fetchAppointments();
    }
  }, [currentSalon?.id, weekDates, fetchAppointments]);

  return {
    selectedDate,
    setSelectedDate,
    weekDates,
    appointments,
    teamMembers,
    services,
    isLoading,
    error,
    getAppointmentsForDay,
    saveAppointment,
    updateAppointmentStatus,
    deleteAppointment,
    goToPreviousWeek,
    goToNextWeek,
    goToToday,
    refreshAppointments: fetchAppointments
  };
}
