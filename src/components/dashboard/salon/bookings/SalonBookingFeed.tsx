import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Clock, User, Scissors, Calendar, 
  CheckCircle2, AlertCircle, Clock3,
  Check, X, CheckCircle
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

interface BookingItem {
  id: string;
  time: string;
  customerName: string;
  serviceName: string;
  technician: string | null;
  duration: number;
  status: string;
  date: Date | null;
}

type BookingFilter = "all" | "today" | "upcoming" | "completed";

const SalonBookingFeed = () => {
  const { user } = useAuth();
  const [filterStatus, setFilterStatus] = useState<BookingFilter>("today");
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Load bookings from Supabase
  useEffect(() => {
    if (!user) return;
    
    const fetchBookings = async () => {
      setLoading(true);
      try {
        // First fetch bookings
        const { data: bookingsData, error: bookingsError } = await supabase
          .from('bookings')
          .select(`
            id, 
            date_requested, 
            time_requested, 
            status, 
            note,
            service_id,
            sender_id,
            metadata
          `)
          .eq('recipient_id', user.id)
          .order('date_requested', { ascending: true });
        
        if (bookingsError) throw bookingsError;
        
        // Process each booking to get additional data
        const formattedBookings: BookingItem[] = await Promise.all((bookingsData || []).map(async (booking) => {
          // Get customer name
          let customerName = "Unknown Customer";
          if (booking.sender_id) {
            const { data: userData, error: userError } = await supabase
              .from('users')
              .select('full_name')
              .eq('id', booking.sender_id)
              .single();
            
            if (!userError && userData) {
              customerName = userData.full_name;
            }
          }
          
          // Get service details
          let serviceName = "General Service";
          let duration = 60;
          if (booking.service_id) {
            const { data: serviceData, error: serviceError } = await supabase
              .from('services')
              .select('title, duration_minutes')
              .eq('id', booking.service_id)
              .single();
              
            if (!serviceError && serviceData) {
              serviceName = serviceData.title;
              duration = serviceData.duration_minutes || 60;
            }
          }
          
          // Extract assigned staff from metadata
          const metadata = booking.metadata as Record<string, any> || {};
          const technician = metadata.assigned_staff_name || null;
          
          return {
            id: booking.id,
            time: booking.time_requested || "No time specified",
            customerName,
            serviceName,
            technician,
            duration,
            status: booking.status || "pending",
            date: booking.date_requested ? new Date(booking.date_requested) : null
          };
        }));
        
        setBookings(formattedBookings);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBookings();
    
    // Subscribe to booking changes
    const channel = supabase
      .channel('booking-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'bookings',
          filter: `recipient_id=eq.${user.id}`
        },
        (payload) => {
          console.log('Booking change detected:', payload);
          
          // Refresh bookings when changes occur
          fetchBookings();
          
          // Show notification for new bookings
          if (payload.eventType === 'INSERT') {
            toast.info("New booking received!", {
              description: "You have a new appointment request",
              duration: 5000
            });
          }
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);
  
  // Format duration to display nicely
  const formatDuration = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (remainingMinutes === 0) {
      return `${hours} hr`;
    }
    
    return `${hours} hr ${remainingMinutes} min`;
  };
  
  // Get status badge component
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
      case "accepted":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Confirmed</Badge>;
      case "pending":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
      case "completed":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Completed</Badge>;
      case "cancelled":
      case "declined":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Cancelled</Badge>;
      default:
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">{status}</Badge>;
    }
  };
  
  const handleStatusChange = async (bookingId: string, newStatus: string) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: newStatus })
        .eq('id', bookingId)
        .eq('recipient_id', user.id);
      
      if (error) throw error;
      
      // Update local state
      setBookings(prev => 
        prev.map(booking => 
          booking.id === bookingId 
            ? { ...booking, status: newStatus } 
            : booking
        )
      );
      
      // Show success toast
      toast.success(`Booking ${newStatus === "completed" ? "marked as completed" : "updated"}`);
    } catch (err) {
      console.error("Error updating booking status:", err);
      toast.error("Failed to update booking status");
    }
  };
  
  // Filter bookings based on selected tab
  const filteredBookings = bookings.filter(booking => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const isToday = booking.date && 
      booking.date.getDate() === today.getDate() && 
      booking.date.getMonth() === today.getMonth() && 
      booking.date.getFullYear() === today.getFullYear();
      
    if (filterStatus === "all") return true;
    if (filterStatus === "today") return isToday;
    if (filterStatus === "upcoming") {
      return (booking.status === "confirmed" || booking.status === "accepted" || booking.status === "pending") && 
        booking.date && booking.date >= today;
    }
    if (filterStatus === "completed") return booking.status === "completed";
    return true;
  });
  
  const formatDate = (date: Date | null) => {
    if (!date) return "No date";
    return format(date, "MMM dd, yyyy");
  };
  
  const renderBookings = () => {
    if (loading) {
      return (
        <div className="space-y-4 max-h-[400px] overflow-y-auto p-1">
          {[1, 2, 3].map((index) => (
            <Card key={index} className="overflow-hidden border border-muted">
              <div className="flex flex-col md:flex-row">
                <div className="bg-muted/20 p-4 flex flex-row md:flex-col items-center justify-center md:min-w-[100px] md:w-[100px] border-b md:border-b-0 md:border-r border-muted">
                  <Skeleton className="h-4 w-16" />
                </div>
                <div className="flex-1 p-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <div>
                      <Skeleton className="h-5 w-32 mb-2" />
                      <Skeleton className="h-4 w-40" />
                    </div>
                    <div>
                      <Skeleton className="h-6 w-20" />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      );
    }
    
    if (filteredBookings.length === 0) {
      return (
        <div className="text-center py-8 text-muted-foreground">
          <Calendar className="mx-auto h-8 w-8 mb-2 text-muted-foreground/60" />
          <p>No bookings found</p>
        </div>
      );
    }
    
    return (
      <div className="space-y-4 max-h-[400px] overflow-y-auto p-1">
        {filteredBookings.map(booking => (
          <Card key={booking.id} className="overflow-hidden border border-muted">
            <div className="flex flex-col md:flex-row">
              {/* Time section */}
              <div className="bg-muted/20 p-4 flex flex-row md:flex-col items-center justify-center md:min-w-[100px] md:w-[100px] border-b md:border-b-0 md:border-r border-muted">
                <Clock className="h-4 w-4 mb-0 md:mb-2 mr-2 md:mr-0 text-muted-foreground" />
                <div className="text-center font-medium">{booking.time}</div>
              </div>
              
              {/* Booking details */}
              <div className="flex-1 p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="font-medium">{booking.customerName}</span>
                    </div>
                    <div className="flex items-center mt-1 text-sm">
                      <Scissors className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{booking.serviceName}</span>
                    </div>
                    <div className="flex items-center mt-1 text-sm">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{formatDate(booking.date)}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-row md:flex-col items-center md:items-end gap-2 md:gap-1">
                    {getStatusBadge(booking.status)}
                    <div className="text-sm text-muted-foreground">
                      {formatDuration(booking.duration)}
                    </div>
                  </div>
                </div>
                
                {booking.technician && (
                  <div className="mt-2 pt-2 border-t border-muted flex items-center">
                    <div className="text-sm text-muted-foreground flex items-center">
                      <span className="inline-block h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                      Assigned to: <span className="font-medium ml-1">{booking.technician}</span>
                    </div>
                  </div>
                )}
                
                {/* Status control buttons */}
                {booking.status === "pending" && (
                  <div className="mt-3 pt-3 border-t border-muted flex justify-end gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-red-200 text-red-600 hover:bg-red-50"
                      onClick={() => handleStatusChange(booking.id, "declined")}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Decline
                    </Button>
                    <Button 
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={() => handleStatusChange(booking.id, "accepted")}
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Accept
                    </Button>
                  </div>
                )}
                
                {(booking.status === "accepted" || booking.status === "confirmed") && (
                  <div className="mt-3 pt-3 border-t border-muted flex justify-end">
                    <Button 
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleStatusChange(booking.id, "completed")}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Mark Completed
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  };
  
  return (
    <Card className="mt-8">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-xl">Bookings Overview</CardTitle>
        </div>
        <Tabs value={filterStatus} onValueChange={(value) => setFilterStatus(value as BookingFilter)}>
          <TabsList>
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="all">All</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        {renderBookings()}
      </CardContent>
    </Card>
  );
};

export default SalonBookingFeed;
