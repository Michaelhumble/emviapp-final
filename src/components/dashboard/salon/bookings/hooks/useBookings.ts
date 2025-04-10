
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";
import { Booking } from "../types";
import { toast } from "sonner";
import { startOfDay, endOfDay, addDays } from "date-fns";

export const useBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = useCallback(async () => {
    if (!user?.id) return;
    
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from("bookings")
        .select(`
          *,
          sender:sender_id(id, full_name, email, phone),
          service:service_id(id, title, price, duration_minutes)
        `)
        .eq("recipient_id", user.id);
      
      if (error) {
        throw error;
      }
      
      const formattedBookings = data.map((booking: any): Booking => ({
        id: booking.id,
        clientName: booking.sender?.full_name || "Unknown Client",
        clientEmail: booking.sender?.email || "",
        clientPhone: booking.sender?.phone || "",
        serviceName: booking.service?.title || "General Service",
        servicePrice: booking.service?.price || 0,
        serviceDuration: booking.service?.duration_minutes || 60,
        date: booking.date_requested ? new Date(booking.date_requested) : null,
        time: booking.time_requested || "",
        status: booking.status,
        notes: booking.note || "",
        createdAt: booking.created_at,
      }));
      
      formattedBookings.sort((a, b) => {
        if (!a.date && !b.date) return 0;
        if (!a.date) return 1;
        if (!b.date) return -1;
        return b.date.getTime() - a.date.getTime();
      });
      
      setBookings(formattedBookings);
      setLoading(false);
    } catch (err: any) {
      console.error("Error fetching bookings:", err);
      setError("Failed to load bookings. Please try again.");
      setLoading(false);
    }
  }, [user?.id]);

  const updateBookingStatus = async (bookingId: string, newStatus: string) => {
    if (!user?.id) return;
    
    try {
      const { error } = await supabase
        .from("bookings")
        .update({ status: newStatus })
        .eq("id", bookingId)
        .eq("recipient_id", user.id);
      
      if (error) {
        throw error;
      }
      
      setBookings(prevBookings => 
        prevBookings.map(booking => 
          booking.id === bookingId 
            ? { ...booking, status: newStatus } 
            : booking
        )
      );
      
      toast.success(`Booking ${newStatus === "completed" ? "marked as completed" : "cancelled"}`);
      return true;
    } catch (err: any) {
      console.error("Error updating booking status:", err);
      toast.error("Failed to update booking status. Please try again.");
      return false;
    }
  };
  
  useEffect(() => {
    if (user?.id) {
      fetchBookings();
    }
  }, [user?.id, fetchBookings]);

  return {
    bookings,
    loading,
    error,
    refresh: fetchBookings,
    updateBookingStatus
  };
};
