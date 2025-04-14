
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarDays, UserCircle, Clock, Calendar } from "lucide-react";
import { format } from "date-fns";
import BookingStatusBadge from "@/components/dashboard/salon/bookings/components/BookingStatusBadge";

interface AppointmentProps {
  dashboardType: 'artist' | 'salon';
}

const UpcomingAppointments = ({ dashboardType }: AppointmentProps) => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        
        // Get today's date at midnight for comparison
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        // Query parameter depends on dashboard type
        const queryParam = dashboardType === 'artist' ? 'recipient_id' : 'recipient_id'; // For salon, should be adjusted if salon_id is added
        
        const { data, error } = await supabase
          .from('bookings')
          .select(`
            *,
            sender:sender_id(id, full_name, email, phone),
            service:service_id(id, title, price, duration_minutes)
          `)
          .eq(queryParam, user.id)
          .gte('date_requested', today.toISOString().split('T')[0])
          .order('date_requested', { ascending: true })
          .limit(5);
        
        if (error) throw error;
        
        // Format appointments
        const formattedAppointments = data.map((booking: any) => ({
          id: booking.id,
          customerName: booking.sender?.full_name || "Unknown Client",
          serviceName: booking.service?.title || "General Service",
          date: booking.date_requested ? new Date(booking.date_requested) : null,
          time: booking.time_requested || "",
          status: booking.status,
          note: booking.note || ""
        }));
        
        setAppointments(formattedAppointments);
      } catch (err: any) {
        console.error("Error fetching appointments:", err);
        setError("Failed to load appointments. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchAppointments();
  }, [user, dashboardType]);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">Upcoming Appointments</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          // Loading skeleton
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col space-y-2">
                <Skeleton className="h-5 w-1/3" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/4" />
              </div>
            ))}
          </div>
        ) : error ? (
          // Error state
          <div className="text-center py-6 text-gray-500">
            <p>{error}</p>
          </div>
        ) : appointments.length > 0 ? (
          // Appointments list
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div 
                key={appointment.id} 
                className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <UserCircle className="h-4 w-4 text-gray-400" />
                      <span className="font-medium">{appointment.customerName}</span>
                    </div>
                    
                    <div className="flex items-center gap-1.5 mt-1 text-sm text-gray-600">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>
                        {appointment.date ? format(appointment.date, 'MMM dd, yyyy') : 'No date'}
                      </span>
                      
                      {appointment.time && (
                        <>
                          <span className="mx-1">•</span>
                          <Clock className="h-3.5 w-3.5" />
                          <span>{appointment.time}</span>
                        </>
                      )}
                    </div>
                    
                    <div className="text-sm mt-1">
                      {appointment.serviceName}
                    </div>
                  </div>
                  
                  <div>
                    <BookingStatusBadge status={appointment.status} />
                  </div>
                </div>
                
                {appointment.note && (
                  <div className="mt-2 text-sm text-gray-500 p-2 bg-gray-50 rounded border border-gray-100">
                    {appointment.note}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          // Empty state
          <div className="text-center py-10 border border-dashed rounded-lg">
            <CalendarDays className="h-10 w-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No upcoming appointments yet</p>
            <p className="text-sm text-gray-400 mt-1">
              Your scheduled appointments will appear here
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UpcomingAppointments;
