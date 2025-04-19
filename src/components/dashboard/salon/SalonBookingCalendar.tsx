
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { format, isSameDay } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";

interface Booking {
  id: string;
  clientName: string;
  service: string;
  time: string;
  duration: number;
  date: Date;
}

const SalonBookingCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  
  useEffect(() => {
    const fetchBookings = async () => {
      if (!user?.id) return;
      
      try {
        setLoading(true);
        
        // Fetch bookings without relying on implicit join relationships
        const { data, error } = await supabase
          .from('bookings')
          .select('id, date_requested, time_requested, note, status, service_id, sender_id, recipient_id')
          .eq('recipient_id', user.id)
          .not('status', 'eq', 'cancelled');
        
        if (error) throw error;
        
        if (!data || data.length === 0) {
          setBookings([]);
          setLoading(false);
          return;
        }
        
        // Create a list to store enhanced bookings
        const enhancedBookings: Booking[] = [];
        
        // Process each booking to get client and service details
        for (const booking of data) {
          // Get client info
          let clientName = "Client";
          if (booking.sender_id) {
            const { data: clientData } = await supabase
              .from('users')
              .select('full_name')
              .eq('id', booking.sender_id)
              .single();
            
            clientName = clientData?.full_name || "Client";
          }
          
          // Get service info
          let service = "Service";
          let duration = 60;
          if (booking.service_id) {
            const { data: serviceData } = await supabase
              .from('services')
              .select('title, duration_minutes')
              .eq('id', booking.service_id)
              .single();
            
            service = serviceData?.title || "Service";
            duration = serviceData?.duration_minutes || 60;
          }
          
          // Create booking object with all needed info
          enhancedBookings.push({
            id: booking.id,
            clientName,
            service,
            time: booking.time_requested || "No time specified",
            duration,
            date: booking.date_requested ? new Date(booking.date_requested) : new Date(),
          });
        }
        
        setBookings(enhancedBookings);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        toast.error("Could not load booking data");
      } finally {
        setLoading(false);
      }
    };
    
    fetchBookings();
  }, [user?.id, date]);
  
  const filteredBookings = date 
    ? bookings.filter(booking => isSameDay(booking.date, date))
    : [];
  
  const formattedDate = date ? format(date, "MMMM d, yyyy") : "";

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-playfair text-emvi-dark">Booking Calendar</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-muted shadow-sm md:col-span-1">
          <CardHeader>
            <CardTitle className="text-xl font-playfair">Select Date</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
        
        <Card className="border-muted shadow-sm md:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl font-playfair">
              Appointments for {formattedDate}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emvi-accent"></div>
              </div>
            ) : filteredBookings.length > 0 ? (
              <div className="space-y-4">
                {filteredBookings.map((booking) => (
                  <div 
                    key={booking.id} 
                    className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50"
                  >
                    <div>
                      <h3 className="font-medium font-inter">{booking.clientName}</h3>
                      <p className="text-sm text-muted-foreground">{booking.service}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium font-inter">{booking.time}</p>
                      <p className="text-sm text-muted-foreground">{booking.duration} min</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-muted-foreground">No appointments scheduled for this date.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SalonBookingCalendar;
