
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
  const [staffMembers, setStaffMembers] = useState<Array<{id: string, name: string}>>([]);

  const fetchBookings = useCallback(async () => {
    if (!user?.id) return;
    
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from("bookings")
        .select(`
          *,
          sender:sender_id(id, full_name, email, phone),
          service:service_id(id, title, price, duration_minutes),
          assigned_staff:assigned_staff_id(id, full_name)
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
        assignedStaffId: booking.metadata?.assigned_staff_id || null,
        assignedStaffName: booking.assigned_staff?.full_name || null
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

  const fetchStaffMembers = useCallback(async () => {
    if (!user?.id) return;
    
    try {
      // In a real implementation, you'd fetch staff members associated with this salon
      // For now, using a mock approach since salon_id field might not exist yet
      const { data, error } = await supabase
        .from("users")
        .select("id, full_name")
        .eq("role", "artist");
      
      if (error) {
        throw error;
      }
      
      setStaffMembers(data.map(staff => ({
        id: staff.id,
        name: staff.full_name
      })));
    } catch (err: any) {
      console.error("Error fetching staff members:", err);
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
      
      toast.success(`Booking ${newStatus === "completed" ? "marked as completed" : "status updated"}`);
      return true;
    } catch (err: any) {
      console.error("Error updating booking status:", err);
      toast.error("Failed to update booking status. Please try again.");
      return false;
    }
  };

  const assignStaffToBooking = async (bookingId: string, staffId: string) => {
    if (!user?.id) return;
    
    try {
      // Need to explicitly type the update to include the metadata field
      interface BookingUpdate {
        metadata: {
          assigned_staff_id: string;
        };
      }
      
      const updateData: BookingUpdate = {
        metadata: { assigned_staff_id: staffId }
      };
      
      const { error } = await supabase
        .from("bookings")
        .update(updateData)
        .eq("id", bookingId)
        .eq("recipient_id", user.id);
      
      if (error) {
        throw error;
      }
      
      // Find the staff name for display
      const staffMember = staffMembers.find(s => s.id === staffId);
      
      setBookings(prevBookings => 
        prevBookings.map(booking => 
          booking.id === bookingId 
            ? { 
                ...booking, 
                assignedStaffId: staffId,
                assignedStaffName: staffMember?.name || null
              } 
            : booking
        )
      );
      
      toast.success("Staff assigned successfully");
      return true;
    } catch (err: any) {
      console.error("Error assigning staff to booking:", err);
      toast.error("Failed to assign staff. Please try again.");
      return false;
    }
  };

  const updateBookingDetails = async (bookingId: string, updates: {
    date?: Date,
    time?: string,
    notes?: string
  }) => {
    if (!user?.id) return;
    
    try {
      const updateData: any = {};
      if (updates.date) updateData.date_requested = updates.date.toISOString().split('T')[0];
      if (updates.time) updateData.time_requested = updates.time;
      if (updates.notes !== undefined) updateData.note = updates.notes;
      
      const { error } = await supabase
        .from("bookings")
        .update(updateData)
        .eq("id", bookingId)
        .eq("recipient_id", user.id);
      
      if (error) {
        throw error;
      }
      
      setBookings(prevBookings => 
        prevBookings.map(booking => 
          booking.id === bookingId 
            ? { 
                ...booking, 
                date: updates.date || booking.date,
                time: updates.time || booking.time,
                notes: updates.notes !== undefined ? updates.notes : booking.notes
              } 
            : booking
        )
      );
      
      toast.success("Booking updated successfully");
      return true;
    } catch (err: any) {
      console.error("Error updating booking details:", err);
      toast.error("Failed to update booking. Please try again.");
      return false;
    }
  };
  
  useEffect(() => {
    if (user?.id) {
      fetchBookings();
      fetchStaffMembers();
    }
  }, [user?.id, fetchBookings, fetchStaffMembers]);

  return {
    bookings,
    loading,
    error,
    staffMembers,
    refresh: fetchBookings,
    updateBookingStatus,
    assignStaffToBooking,
    updateBookingDetails
  };
};
