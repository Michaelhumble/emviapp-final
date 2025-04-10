
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";
import { Calendar, Clock, UserPlus, Filter, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookingStatusFilter from "./BookingStatusFilter";
import BookingDateFilter from "./BookingDateFilter";
import BookingTable from "./BookingTable";
import EmptyBookingState from "./EmptyBookingState";
import { Booking, BookingStatus } from "./types";
import { format, isAfter, isBefore, parseISO, startOfDay, endOfDay, addDays } from "date-fns";
import { toast } from "sonner";

const SalonBookingManager = () => {
  const { user, userProfile } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<"list" | "calendar">("list");
  
  // Filters
  const [statusFilter, setStatusFilter] = useState<BookingStatus>("all");
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: startOfDay(new Date()),
    to: endOfDay(addDays(new Date(), 30)),
  });

  // Fetch bookings from Supabase
  useEffect(() => {
    const fetchBookings = async () => {
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
        
        // Transform and sort the data
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
        
        // Sort by date - newest first
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
    };
    
    fetchBookings();
  }, [user?.id]);
  
  // Apply filters
  useEffect(() => {
    const applyFilters = () => {
      let result = [...bookings];
      
      // Apply status filter
      if (statusFilter !== "all") {
        result = result.filter(booking => booking.status === statusFilter);
      }
      
      // Apply date range filter
      if (dateRange.from || dateRange.to) {
        result = result.filter(booking => {
          if (!booking.date) return false;
          
          const bookingDate = startOfDay(booking.date);
          
          const afterFrom = !dateRange.from || isAfter(bookingDate, startOfDay(dateRange.from)) || 
            bookingDate.getTime() === startOfDay(dateRange.from).getTime();
            
          const beforeTo = !dateRange.to || isBefore(bookingDate, endOfDay(dateRange.to)) || 
            bookingDate.getTime() === startOfDay(dateRange.to).getTime();
          
          return afterFrom && beforeTo;
        });
      }
      
      setFilteredBookings(result);
    };
    
    applyFilters();
  }, [bookings, statusFilter, dateRange]);
  
  // Handle booking status updates
  const handleStatusUpdate = async (bookingId: string, newStatus: BookingStatus) => {
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
      
      // Update local state after successful update
      setBookings(prevBookings => 
        prevBookings.map(booking => 
          booking.id === bookingId 
            ? { ...booking, status: newStatus } 
            : booking
        )
      );
      
      toast.success(`Booking ${newStatus === "completed" ? "marked as completed" : "cancelled"}`);
    } catch (err: any) {
      console.error("Error updating booking status:", err);
      toast.error("Failed to update booking status. Please try again.");
    }
  };
  
  const handleRefresh = () => {
    setLoading(true);
    setError(null);
    
    // Re-fetch the bookings
    const fetchBookings = async () => {
      if (!user?.id) return;
      
      try {
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
        
        // Transform and sort the data
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
        
        setBookings(formattedBookings);
        setLoading(false);
        toast.success("Bookings refreshed");
      } catch (err: any) {
        console.error("Error refreshing bookings:", err);
        setError("Failed to refresh bookings. Please try again.");
        setLoading(false);
        toast.error("Failed to refresh bookings");
      }
    };
    
    fetchBookings();
  };
  
  return (
    <Card className="border-blue-100">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg flex items-center">
          <Calendar className="h-5 w-5 text-blue-500 mr-2" />
          Booking Manager
        </CardTitle>
        <div className="flex space-x-2">
          <Button 
            size="sm" 
            variant="outline" 
            onClick={handleRefresh}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-6">
          {/* Filters Section */}
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <BookingStatusFilter 
              value={statusFilter} 
              onChange={setStatusFilter} 
            />
            <BookingDateFilter 
              dateRange={dateRange} 
              onChange={setDateRange} 
            />
          </div>
          
          {/* Tabs for Views */}
          <Tabs 
            value={activeView} 
            onValueChange={(v) => setActiveView(v as "list" | "calendar")}
            className="mt-2"
          >
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="calendar" disabled>Calendar View (Coming Soon)</TabsTrigger>
            </TabsList>
            
            <TabsContent value="list">
              {error ? (
                <div className="py-12 text-center">
                  <div className="bg-red-50 p-4 rounded-lg">
                    <p className="text-red-600">{error}</p>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={handleRefresh}
                    >
                      Try Again
                    </Button>
                  </div>
                </div>
              ) : loading ? (
                <div className="py-12 text-center">
                  <RefreshCw className="h-8 w-8 animate-spin mx-auto text-blue-500 mb-2" />
                  <p className="text-gray-500">Loading bookings...</p>
                </div>
              ) : filteredBookings.length === 0 ? (
                <EmptyBookingState
                  message="No bookings match your filters"
                  showReset={true}
                  onReset={() => {
                    setStatusFilter("all");
                    setDateRange({
                      from: startOfDay(new Date()),
                      to: endOfDay(addDays(new Date(), 30)),
                    });
                  }}
                />
              ) : (
                <BookingTable 
                  bookings={filteredBookings} 
                  onStatusUpdate={handleStatusUpdate} 
                />
              )}
            </TabsContent>
            
            <TabsContent value="calendar">
              <div className="py-12 text-center">
                <Clock className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Calendar View Coming Soon</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  We're working on a calendar view that will help you visualize your bookings more effectively.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalonBookingManager;
