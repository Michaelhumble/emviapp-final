
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";
import { Booking, BookingCounts } from "@/components/dashboard/artist/types/ArtistDashboardTypes";

export const useArtistBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [counts, setCounts] = useState<BookingCounts>({ pending: 0, upcoming: 0 });
  const [loading, setLoading] = useState(true);
  const [serviceTypes, setServiceTypes] = useState<Array<{ id: string; label: string }>>([]);
  const { user } = useAuth();

  const fetchBookings = async () => {
    try {
      setLoading(true);
      
      if (!user) return;
      
      // Get bookings where the artist is the recipient
      const { data, error } = await supabase
        .from('bookings')
        .select(`*`)
        .eq('recipient_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      if (data) {
        // Transform data to include customer names
        const bookingsWithUserDetails = await Promise.all(
          data.map(async (booking) => {
            // Get customer name
            const { data: userData, error: userError } = await supabase
              .from('users')
              .select('full_name')
              .eq('id', booking.sender_id)
              .single();
            
            // Check for errors but don't throw
            if (userError) {
              console.error("Error fetching customer details:", userError);
            }
            
            // Get service details if possible
            let serviceName = "";
            if (booking.service_id) {
              const { data: serviceData, error: serviceError } = await supabase
                .from('services')
                .select('title')
                .eq('id', booking.service_id)
                .single();
                
              if (!serviceError && serviceData) {
                serviceName = serviceData.title;
              }
            }
            
            return {
              ...booking,
              customer_name: userData?.full_name || "Unknown",
              service_name: serviceName
            } as Booking;
          })
        );
        
        setBookings(bookingsWithUserDetails);
        
        // Calculate counts
        const pendingCount = bookingsWithUserDetails.filter(b => b.status === 'pending').length;
        const upcomingCount = bookingsWithUserDetails.filter(b => 
          b.status === 'accepted' && 
          new Date(b.date_requested) >= new Date()
        ).length;
        
        setCounts({
          pending: pendingCount,
          upcoming: upcomingCount
        });
        
        // Extract unique service types for filtering
        const uniqueServices = Array.from(
          new Map(
            bookingsWithUserDetails
              .filter(b => b.service_id && b.service_name)
              .map(b => [b.service_id, { id: b.service_id || '', label: b.service_name || '' }])
          ).values()
        );
        
        setServiceTypes(uniqueServices);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (bookingId: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: 'accepted' })
        .eq('id', bookingId);
      
      if (error) throw error;
      
      toast.success("Booking accepted");
      
      // Update the local state
      setBookings(prev => 
        prev.map(booking => 
          booking.id === bookingId 
            ? { ...booking, status: 'accepted' as const } 
            : booking
        )
      );
      
      // Update counts
      setCounts(prev => ({
        pending: Math.max(0, prev.pending - 1),
        upcoming: prev.upcoming + 1
      }));
    } catch (error) {
      console.error("Error accepting booking:", error);
      toast.error("Failed to accept booking");
    }
  };
  
  const handleDecline = async (bookingId: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: 'declined' })
        .eq('id', bookingId);
      
      if (error) throw error;
      
      toast.success("Booking declined");
      
      // Update the local state
      setBookings(prev => 
        prev.map(booking => 
          booking.id === bookingId 
            ? { ...booking, status: 'declined' as const } 
            : booking
        )
      );
      
      // Update counts
      setCounts(prev => ({
        pending: Math.max(0, prev.pending - 1),
        upcoming: prev.upcoming
      }));
    } catch (error) {
      console.error("Error declining booking:", error);
      toast.error("Failed to decline booking");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [user]);

  return {
    bookings,
    counts,
    loading,
    serviceTypes,
    handleAccept,
    handleDecline,
    refreshBookings: fetchBookings
  };
};
