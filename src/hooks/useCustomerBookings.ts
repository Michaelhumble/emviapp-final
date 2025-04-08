
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";
import { Booking } from "@/components/dashboard/artist/types/ArtistDashboardTypes";
import { ServiceTypeFilter } from "@/hooks/useBookingFilters";
import { useTranslation } from "@/hooks/useTranslation";

export const useCustomerBookings = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [serviceTypes, setServiceTypes] = useState<ServiceTypeFilter[]>([]);
  
  const fetchBookings = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      // Get bookings where the user is the sender
      const { data, error } = await supabase
        .from('bookings')
        .select(`*`)
        .eq('sender_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      if (data) {
        // Transform data to include artist and service details
        const bookingsWithDetails = await Promise.all(
          data.map(async (booking) => {
            // Get artist name
            const { data: artistData, error: artistError } = await supabase
              .from('users')
              .select('full_name')
              .eq('id', booking.recipient_id)
              .single();
            
            if (artistError) {
              console.error("Error fetching artist details:", artistError);
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
              artist_name: artistData?.full_name || "Unknown Artist",
              service_name: serviceName,
              customer_name: "You" // For consistency with artist panel
            } as Booking;
          })
        );
        
        setBookings(bookingsWithDetails);
        
        // Extract unique service types for filtering
        const uniqueServices = Array.from(
          new Map(
            bookingsWithDetails
              .filter(b => b.service_id && b.service_name)
              .map(b => [b.service_id, { id: b.service_id || '', label: b.service_name || '' }])
          ).values()
        );
        
        setServiceTypes(uniqueServices);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error(t({
        english: "Failed to load bookings",
        vietnamese: "Không thể tải lịch hẹn"
      }));
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchBookings();
  }, [user]);
  
  return {
    bookings,
    loading,
    serviceTypes,
    fetchBookings
  };
};
