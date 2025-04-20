
import { useState, useCallback, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSalon } from "@/context/salon";
import { SalonBooking } from "../../types";
import { toast } from "sonner";

export const useSalonBookings = () => {
  const { currentSalon } = useSalon();
  const [bookings, setBookings] = useState<SalonBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchBookings = useCallback(async () => {
    if (!currentSalon?.id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // First get all staff IDs for the salon
      const { data: staffData, error: staffError } = await supabase
        .from('salon_staff')
        .select('id')
        .eq('salon_id', currentSalon.id);
        
      if (staffError) {
        console.error("Error fetching staff:", staffError);
        setError(new Error("Failed to fetch staff data"));
        setLoading(false);
        return;
      }
      
      // If no staff, return empty array
      if (!staffData || staffData.length === 0) {
        setBookings([]);
        setLoading(false);
        return;
      }
      
      const staffIds = staffData.map(staff => staff.id);
      
      // Fetch the bookings
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          sender:sender_id(id, full_name, email, phone),
          service:service_id(id, title, price, duration_minutes),
          recipient:recipient_id(id, full_name)
        `)
        .in('recipient_id', staffIds)
        .order('date_requested', { ascending: true });

      if (error) {
        console.error('Error fetching salon bookings:', error);
        setError(new Error("Failed to load bookings"));
        setLoading(false);
        return;
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
    } catch (err: any) {
      console.error("Error fetching salon bookings:", err);
      setError(new Error("Failed to load bookings"));
    } finally {
      setLoading(false);
    }
  }, [currentSalon?.id]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  return {
    bookings,
    loading,
    error,
    fetchBookings
  };
};
