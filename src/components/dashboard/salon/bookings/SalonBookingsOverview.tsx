
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useSalon } from "@/context/salon";
import { toast } from "sonner";
import ManualBookingModal from "./ManualBookingModal";
import EmptyBookingState from "../bookings/EmptyBookingState";
import { SalonBooking } from "../types";

const SalonBookingsOverview = () => {
  const { currentSalon } = useSalon();
  const [bookings, setBookings] = useState<SalonBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const fetchBookings = async () => {
    if (!currentSalon?.id) return;

    setLoading(true);
    setLoadingTimedOut(false);

    try {
      // First get all staff IDs for the salon
      const { data: staffData, error: staffError } = await supabase
        .from('salon_staff')
        .select('id')
        .eq('salon_id', currentSalon.id);
        
      if (staffError) {
        console.error("Error fetching staff:", staffError);
        toast.error("Failed to load bookings. Please try again.");
        setLoading(false);
        return;
      }
      
      // If no staff, return empty array but don't treat as error
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
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching salon bookings:', error);
        toast.error("Failed to load bookings. Please try again.");
        setLoading(false);
        return;
      }

      if (!data) {
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
    } catch (err) {
      console.error("Error in fetchBookings:", err);
      toast.error("Failed to load bookings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!currentSalon?.id) return;
    fetchBookings();
  }, [currentSalon?.id]);

  const handleAddBooking = async () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleBookingCreated = () => {
    fetchBookings();
  };

  if (loading) {
    return (
      <Card className="border-blue-100">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg flex items-center">
            <Calendar className="h-5 w-5 text-blue-500 mr-2" />
            Recent Bookings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="py-8 text-center">
            <div className="animate-pulse mx-auto h-8 w-8 rounded-full border-4 border-t-blue-500 border-b-blue-700 border-l-blue-500 border-r-blue-700"></div>
            <p className="mt-4 text-gray-500">Loading bookings...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (loadingTimedOut) {
    return (
      <Card className="border-blue-100">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg flex items-center">
            <Calendar className="h-5 w-5 text-blue-500 mr-2" />
            Recent Bookings
          </CardTitle>
          <Button size="sm" onClick={fetchBookings}>Retry</Button>
        </CardHeader>
        <CardContent>
          <div className="py-8 text-center text-amber-600">
            <p>Loading bookings took too long. Please check your connection and try again.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!bookings || bookings.length === 0) {
    return (
      <Card className="border-blue-100">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg flex items-center">
            <Calendar className="h-5 w-5 text-blue-500 mr-2" />
            Recent Bookings
          </CardTitle>
          <Button size="sm" onClick={handleAddBooking}>Add Booking</Button>
        </CardHeader>
        <CardContent>
          <EmptyBookingState 
            message="No bookings yet. You can manually add bookings or share your salon link for clients to book."
          />
          {isModalOpen && (
            <ManualBookingModal 
              open={isModalOpen} 
              onClose={handleModalClose}
              onBookingCreated={handleBookingCreated}
            />
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-blue-100">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg flex items-center">
          <Calendar className="h-5 w-5 text-blue-500 mr-2" />
          Recent Bookings
        </CardTitle>
        <Button size="sm" onClick={handleAddBooking}>Add Booking</Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {bookings.slice(0, 3).map((booking) => (
            <div key={booking.id} className="flex items-start p-3 border rounded-lg">
              <div className="flex-grow">
                <div className="font-medium">{booking.client_name}</div>
                <div className="text-sm text-gray-500">
                  {booking.service_name} • {booking.date?.toLocaleDateString() || 'No date'} • {booking.time || 'No time'}
                </div>
                {booking.assigned_staff_name && (
                  <div className="text-xs text-gray-500 mt-1">
                    Assigned to: {booking.assigned_staff_name}
                  </div>
                )}
              </div>
              <div className="flex-shrink-0">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  booking.status === 'accepted' ? 'bg-green-100 text-green-800' :
                  booking.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                  booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                  booking.status === 'declined' ? 'bg-gray-100 text-gray-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </span>
              </div>
            </div>
          ))}
          
          {bookings.length > 3 && (
            <div className="text-center mt-4">
              <Button variant="outline" size="sm" asChild>
                <a href="/dashboard/bookings">View All Bookings</a>
              </Button>
            </div>
          )}
        </div>
        
        {isModalOpen && (
          <ManualBookingModal 
            open={isModalOpen} 
            onClose={handleModalClose}
            onBookingCreated={handleBookingCreated}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default SalonBookingsOverview;
