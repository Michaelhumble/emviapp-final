
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { Booking, BookingFormData } from "../types/booking";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";

export const useBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // Fetch bookings for the current user (both sent and received)
  useEffect(() => {
    const fetchBookings = async () => {
      if (!user?.id) return;

      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("bookings")
          .select("*")
          .or(`sender_id.eq.${user.id},recipient_id.eq.${user.id}`)
          .order("created_at", { ascending: false });

        if (error) {
          throw error;
        }

        setBookings(data as Booking[]);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  // Create a new booking request
  const createBooking = async (bookingData: BookingFormData) => {
    if (!user?.id) {
      setError("You must be logged in to create a booking");
      return null;
    }

    try {
      // Convert BookingFormData to the format expected by the database
      const bookingDbData = {
        recipient_id: bookingData.recipientId,
        date_requested: bookingData.date,
        time_requested: bookingData.time,
        note: bookingData.note,
      };

      const { data, error } = await supabase
        .from("bookings")
        .insert([
          {
            ...bookingDbData,
            sender_id: user.id,
            status: "pending"
          }
        ])
        .select()
        .single();

      if (error) {
        throw error;
      }

      setBookings(prev => [data as Booking, ...prev]);
      toast.success("Booking request sent successfully");
      return data;
    } catch (err) {
      console.error("Error creating booking:", err);
      toast.error("Failed to send booking request");
      return null;
    }
  };

  // Update the status of a booking
  const updateBookingStatus = async (bookingId: string, status: 'accepted' | 'declined' | 'completed') => {
    try {
      const { data, error } = await supabase
        .from("bookings")
        .update({ status })
        .eq("id", bookingId)
        .select()
        .single();

      if (error) {
        throw error;
      }

      setBookings(prev => prev.map(booking => 
        booking.id === bookingId ? { ...booking, status } : booking
      ));
      
      toast.success(`Booking ${status} successfully`);
      return data as Booking;
    } catch (err) {
      console.error(`Error updating booking status to ${status}:`, err);
      toast.error(`Failed to ${status} booking`);
      return null;
    }
  };

  return {
    bookings,
    loading,
    error,
    createBooking,
    updateBookingStatus
  };
};

export default useBookings;
