import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSalon } from "@/context/salon";
import { SalonBooking } from "../../types";
import { toast } from "sonner";

export const useSalonBookings = () => {
  const { currentSalon } = useSalon();
  const [bookings, setBookings] = useState<SalonBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [artists, setArtists] = useState<Array<{id: string, name: string}>>([]);

  const fetchArtists = useCallback(async () => {
    if (!currentSalon?.id) return;
    
    try {
      const { data, error } = await supabase
        .from('salon_staff')
        .select('id, full_name')
        .eq('salon_id', currentSalon.id)
        .eq('status', 'active');
        
      if (error) throw error;
      
      setArtists(data.map(artist => ({
        id: artist.id,
        name: artist.full_name
      })));
    } catch (err) {
      console.error("Error fetching artists:", err);
    }
  }, [currentSalon?.id]);
  
  const fetchBookings = useCallback(async () => {
    if (!currentSalon?.id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data: staffData, error: staffError } = await supabase
        .from('salon_staff')
        .select('id')
        .eq('salon_id', currentSalon.id);
        
      if (staffError) throw staffError;
      
      if (!staffData || staffData.length === 0) {
        setBookings([]);
        setLoading(false);
        return;
      }
      
      const staffIds = staffData.map(staff => staff.id);
      
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          sender:sender_id(id, full_name, email, phone),
          service:service_id(id, title, price, duration_minutes),
          recipient:recipient_id(id, full_name)
        `)
        .in('recipient_id', staffIds)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedBookings = (data || []).map(booking => {
        const senderData = booking.sender as { full_name?: string; email?: string; phone?: string } | null;
        const serviceData = booking.service as { title?: string; price?: number; duration_minutes?: number } | null;
        const recipientData = booking.recipient as { full_name?: string } | null;
        
        const clientName = senderData?.full_name || "Unknown Client";
        const clientEmail = senderData?.email || null;
        const clientPhone = senderData?.phone || null;
        const serviceName = serviceData?.title || "General Service";
        const servicePrice = serviceData?.price || 0;
        const staffName = recipientData?.full_name || null;
        
        const bookingStatus = booking.status || 'pending';
        const validStatus = ['pending', 'accepted', 'completed', 'cancelled', 'declined'].includes(bookingStatus) 
          ? bookingStatus as SalonBooking['status']
          : 'pending';
        
        return {
          id: booking.id,
          client_name: clientName,
          client_email: clientEmail,
          client_phone: clientPhone,
          service_name: serviceName,
          service_price: servicePrice,
          date: booking.date_requested ? new Date(booking.date_requested) : null,
          time: booking.time_requested || "",
          status: validStatus,
          assigned_staff_name: staffName,
          assigned_staff_id: booking.recipient_id,
          notes: booking.note,
          created_at: booking.created_at
        } as SalonBooking;
      });

      setBookings(formattedBookings);
    } catch (err: any) {
      console.error("Error fetching salon bookings:", err);
      setError(new Error("Failed to load bookings"));
      toast.error("Could not load booking data");
    } finally {
      setLoading(false);
    }
  }, [currentSalon?.id]);
  
  const updateBookingStatus = async (bookingId: string, newStatus: SalonBooking['status']) => {
    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('bookings')
        .update({ status: newStatus })
        .eq('id', bookingId);
        
      if (error) throw error;
      
      setBookings(prev => 
        prev.map(booking => 
          booking.id === bookingId ? { ...booking, status: newStatus } : booking
        )
      );
      
      toast.success(`Booking ${newStatus === 'completed' ? 'marked as completed' : 'status updated'}`);
    } catch (err) {
      console.error("Error updating booking status:", err);
      toast.error("Failed to update booking status");
    } finally {
      setLoading(false);
    }
  };
  
  const assignArtistToBooking = async (bookingId: string, artistId: string, artistName: string) => {
    try {
      setLoading(true);
      
      setBookings(prev => 
        prev.map(booking => 
          booking.id === bookingId 
            ? { 
                ...booking, 
                assigned_staff_id: artistId,
                assigned_staff_name: artistName 
              } 
            : booking
        )
      );
      
      toast.success("Artist assigned to booking");
    } catch (err) {
      console.error("Error assigning artist to booking:", err);
      toast.error("Failed to assign artist");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
    fetchArtists();
  }, [fetchBookings, fetchArtists]);

  return {
    bookings,
    loading,
    error,
    artists,
    fetchBookings,
    updateBookingStatus,
    assignArtistToBooking
  };
};
