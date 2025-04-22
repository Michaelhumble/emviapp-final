
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";

// Properly export the interfaces
export interface Booking {
  id: string;
  sender_id: string;
  recipient_id: string;
  client_name?: string;
  client_avatar?: string;
  service_id?: string;
  service_name?: string;
  date_requested?: string;
  time_requested?: string;
  status: 'pending' | 'accepted' | 'declined' | 'completed' | 'cancelled';
  note?: string;
  created_at: string;
}

export interface BookingCounts {
  pending: number;
  accepted: number;
  completed: number;
  total: number;
  declined?: number;
  cancelled?: number;
}

export const useArtistBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [serviceTypes, setServiceTypes] = useState<string[]>([]);
  const { user } = useAuth();
  
  useEffect(() => {
    if (!user) return;
    
    const fetchBookings = async () => {
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('bookings')
          .select(`
            *,
            sender:sender_id(full_name, avatar_url),
            service:service_id(title)
          `)
          .eq('recipient_id', user.id)
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        const formattedBookings: Booking[] = (data || []).map((booking: any) => ({
          id: booking.id,
          sender_id: booking.sender_id,
          recipient_id: booking.recipient_id,
          client_name: booking.sender?.full_name || 'Unknown Client',
          client_avatar: booking.sender?.avatar_url || '',
          service_id: booking.service_id,
          service_name: booking.service?.title || 'Custom Service',
          date_requested: booking.date_requested,
          time_requested: booking.time_requested,
          status: booking.status,
          note: booking.note,
          created_at: booking.created_at
        }));
        
        setBookings(formattedBookings);
        
        // Extract unique service types from bookings
        const uniqueServiceTypes = Array.from(
          new Set(
            formattedBookings
              .filter(booking => booking.service_name)
              .map(booking => booking.service_name as string)
          )
        );
        
        setServiceTypes(uniqueServiceTypes);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBookings();
  }, [user]);
  
  const handleAccept = async (bookingId: string) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: 'accepted' })
        .eq('id', bookingId)
        .eq('recipient_id', user.id);
      
      if (error) throw error;
      
      // Update local state
      setBookings(prev => prev.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: 'accepted' } 
          : booking
      ));
      
      toast.success('Booking accepted successfully');
    } catch (error) {
      console.error('Error accepting booking:', error);
      toast.error('Failed to accept booking');
    }
  };
  
  const handleDecline = async (bookingId: string) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: 'declined' })
        .eq('id', bookingId)
        .eq('recipient_id', user.id);
      
      if (error) throw error;
      
      // Update local state
      setBookings(prev => prev.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: 'declined' } 
          : booking
      ));
      
      toast.success('Booking declined');
    } catch (error) {
      console.error('Error declining booking:', error);
      toast.error('Failed to decline booking');
    }
  };
  
  // Calculate booking counts
  const calculateCounts = (): BookingCounts => {
    const pending = bookings.filter(b => b.status === 'pending').length;
    const accepted = bookings.filter(b => b.status === 'accepted').length;
    const completed = bookings.filter(b => b.status === 'completed').length;
    const declined = bookings.filter(b => b.status === 'declined').length;
    const cancelled = bookings.filter(b => b.status === 'cancelled').length;
    const total = bookings.length;
    
    return {
      pending,
      accepted,
      completed,
      declined,
      cancelled,
      total
    };
  };
  
  return {
    bookings,
    loading,
    handleAccept,
    handleDecline,
    serviceTypes,
    counts: calculateCounts()
  };
};
