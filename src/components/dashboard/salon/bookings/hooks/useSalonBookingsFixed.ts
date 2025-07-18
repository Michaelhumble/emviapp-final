
import { useState, useCallback, useEffect } from "react";
import { supabaseBypass } from "@/types/supabase-bypass";
import { useSalon } from "@/context/salon";
import { SalonBooking } from "../../types";
import { toast } from "sonner";

export const useSalonBookingsFixed = () => {
  const { currentSalon } = useSalon();
  const [bookings, setBookings] = useState<SalonBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [artists, setArtists] = useState<Array<{id: string, name: string}>>([]);
  const [loadingTimedOut, setLoadingTimedOut] = useState(false);

  // Setup a timeout to prevent infinite loading
  useEffect(() => {
    const timer = setTimeout(() => {
      if (loading) {
        setLoadingTimedOut(true);
        setLoading(false);
        console.warn("Booking data fetch timed out");
      }
    }, 10000); // 10 second timeout

    return () => clearTimeout(timer);
  }, [loading]);

  const fetchArtists = useCallback(async () => {
    if (!currentSalon?.id) return;
    
    try {
      const { data, error } = await supabaseBypass
        .from('salon_staff')
        .select('id, full_name')
        .eq('salon_id', currentSalon.id)
        .eq('status', 'active');
        
      if (error) {
        console.warn("Non-critical error fetching artists:", error);
        return; // Continue execution with empty artists array rather than failing
      }
      
      setArtists(data?.map(artist => ({
        id: artist.id,
        name: artist.full_name
      })) || []);
    } catch (err) {
      console.warn("Error fetching artists:", err);
      // Don't throw or set error state - this should be non-critical
    }
  }, [currentSalon?.id]);
  
  const fetchBookings = useCallback(async () => {
    if (!currentSalon?.id) {
      setLoading(false);
      return Promise.resolve(); // Return a resolved promise for chaining
    }

    try {
      setLoading(true);
      setError(null);
      setLoadingTimedOut(false);

      // First get all staff IDs for the salon
      const { data: staffData, error: staffError } = await supabaseBypass
        .from('salon_staff')
        .select('id')
        .eq('salon_id', currentSalon.id);
        
      if (staffError) {
        console.error("Error fetching staff:", staffError);
        setError(new Error("Failed to fetch staff data"));
        setBookings([]);
        setLoading(false);
        return Promise.reject(staffError);
      }
      
      // If no staff, return empty array but don't treat as error
      if (!staffData || staffData.length === 0) {
        setBookings([]);
        setLoading(false);
        return Promise.resolve();
      }
      
      const staffIds = staffData.map(staff => staff.id);
      
      // Fetch the bookings
      const { data, error } = await supabaseBypass
        .from('bookings')
        .select(`
          *,
          sender:sender_id(id, full_name, email, phone),
          service:service_id(id, title, price, duration_minutes),
          recipient:recipient_id(id, full_name)
        `)
        .in('recipient_id', staffIds)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching salon bookings:', error);
        setError(new Error("Failed to load bookings"));
        setBookings([]); 
        setLoading(false);
        return Promise.reject(error);
      }

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
      return Promise.resolve();
    } catch (err: any) {
      console.error("Error in fetchBookings:", err);
      setError(new Error("Failed to load bookings"));
      setBookings([]);
      return Promise.reject(err);
    } finally {
      setLoading(false);
    }
  }, [currentSalon?.id]);

  // Call fetchBookings and fetchArtists on initial render
  useEffect(() => {
    fetchArtists();
    fetchBookings().catch(err => {
      console.error("Initial bookings fetch failed:", err);
    });
  }, [fetchArtists, fetchBookings]);
  
  const updateBookingStatus = async (bookingId: string, newStatus: SalonBooking['status']) => {
    try {
      setLoading(true);
      
      const { error } = await supabaseBypass
        .from('bookings')
        .update({ status: newStatus } as any)
        .eq('id', bookingId);
        
      if (error) {
        console.error("Error updating booking status:", error);
        toast.error("Failed to update booking status. Please try again.");
        return false;
      }
      
      setBookings(prev => 
        prev.map(booking => 
          booking.id === bookingId ? { ...booking, status: newStatus } : booking
        )
      );
      
      toast.success(`Booking ${newStatus === 'completed' ? 'marked as completed' : 'status updated'}`);
      return true;
    } catch (err) {
      console.error("Error updating booking status:", err);
      toast.error("Failed to update booking status");
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  const assignArtistToBooking = async (bookingId: string, artistId: string, artistName: string) => {
    try {
      setLoading(true);
      
      // First update the booking data locally for instant UI feedback
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
      
      // Then update in the database
      const { error } = await supabaseBypass
        .from('bookings')
        .update({ 
          recipient_id: artistId,
          metadata: { assigned_staff_id: artistId }
        } as any)
        .eq('id', bookingId);
        
      if (error) {
        console.error("Error assigning artist to booking:", error);
        toast.error("Failed to assign artist in database, but UI updated. Please refresh.");
        // We could revert the UI state here if needed
        return false;
      }
      
      toast.success("Artist assigned to booking");
      return true;
    } catch (err) {
      console.error("Error assigning artist to booking:", err);
      toast.error("Failed to assign artist");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    bookings,
    loading,
    error,
    artists,
    fetchBookings,
    updateBookingStatus,
    assignArtistToBooking,
    loadingTimedOut
  };
};
