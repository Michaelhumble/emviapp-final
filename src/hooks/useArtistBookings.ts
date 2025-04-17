
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";

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

export const useArtistBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  
  useEffect(() => {
    if (!user) return;
    
    const fetchBookings = async () => {
      try {
        setLoading(true);
        
        // Get bookings where current user is the recipient (artist)
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
        
        // Format bookings
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
  
  return {
    bookings,
    loading,
    handleAccept,
    handleDecline
  };
};
