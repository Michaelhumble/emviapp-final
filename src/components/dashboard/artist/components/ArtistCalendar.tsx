
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useArtistCalendar } from "@/hooks/useArtistCalendar";
import { CalendarDays, Clock, UserPlus } from "lucide-react";
import { format, parseISO } from "date-fns";

const ArtistCalendar = () => {
  const { appointments, blockedTimes } = useArtistCalendar();
  
  // Get today's bookings and scheduled times
  const today = new Date();
  const todayDateString = format(today, 'yyyy-MM-dd');
  
  const todayAppointments = appointments.filter(appointment => 
    format(parseISO(appointment.start_time), 'yyyy-MM-dd') === todayDateString
  ).sort((a, b) => 
    new Date(a.start_time).getTime() - new Date(b.start_time).getTime()
  );
  
  const todayBlocked = blockedTimes.filter(blocked => 
    format(parseISO(blocked.start_time), 'yyyy-MM-dd') === todayDateString
  ).sort((a, b) => 
    new Date(a.start_time).getTime() - new Date(b.start_time).getTime()
  );
  
  const hasBookingsToday = todayAppointments.length > 0;
  const hasBlockedToday = todayBlocked.length > 0;
  
  // Get upcoming bookings (future dates, limit to 5)
  const upcomingAppointments = appointments.filter(appointment => 
    format(parseISO(appointment.start_time), 'yyyy-MM-dd') > todayDateString
  ).sort((a, b) => 
    new Date(a.start_time).getTime() - new Date(b.start_time).getTime()
  ).slice(0, 5);
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">Upcoming Schedule</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Today's Schedule */}
          <div className="space-y-4">
            <h3 className="font-medium flex items-center">
              <CalendarDays className="h-4 w-4 mr-2 text-blue-500" />
              Today's Appointments
            </h3>
            {hasBookingsToday ? (
              <div className="space-y-2">
                {todayAppointments.map((appointment) => (
                  <div key={appointment.id} className="p-3 bg-blue-50 border border-blue-100 rounded-md">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">
                          {format(parseISO(appointment.start_time), 'h:mm a')} - {format(parseISO(appointment.end_time), 'h:mm a')}
                        </div>
                        <div className="text-sm text-gray-600">
                          {appointment.customer_name || "Unnamed Client"}
                        </div>
                      </div>
                      <div className="text-xs text-blue-700 px-2 py-1 bg-blue-100 rounded-full">
                        {appointment.status}
                      </div>
                    </div>
                  </div>
                ))}
                {hasBlockedToday && todayBlocked.map((blocked) => (
                  <div key={blocked.id} className="p-3 bg-gray-50 border border-gray-200 rounded-md">
                    <div className="flex items-start gap-2">
                      <Clock className="h-4 w-4 text-gray-500 mt-0.5" />
                      <div>
                        <div className="font-medium">
                          {format(parseISO(blocked.start_time), 'h:mm a')} - {format(parseISO(blocked.end_time), 'h:mm a')}
                        </div>
                        <div className="text-sm text-gray-600">
                          {blocked.reason || "Blocked Time"}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center rounded-md border border-dashed flex flex-col items-center">
                <CalendarDays className="h-10 w-10 text-gray-300 mb-3" />
                <p className="text-gray-500 mb-1">No appointments scheduled for today</p>
                <p className="text-sm text-gray-400">Enjoy your free time!</p>
              </div>
            )}
          </div>
          
          {/* Upcoming Schedule */}
          <div className="space-y-4">
            <h3 className="font-medium flex items-center">
              <UserPlus className="h-4 w-4 mr-2 text-purple-500" />
              Upcoming Appointments
            </h3>
            {upcomingAppointments.length > 0 ? (
              <div className="space-y-2">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="p-3 bg-purple-50 border border-purple-100 rounded-md">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">
                          {format(parseISO(appointment.start_time), 'EEE, MMM d')}
                        </div>
                        <div className="text-sm">
                          {format(parseISO(appointment.start_time), 'h:mm a')} - {format(parseISO(appointment.end_time), 'h:mm a')}
                        </div>
                        <div className="text-sm text-gray-600">
                          {appointment.customer_name || "Unnamed Client"}
                        </div>
                      </div>
                      <div className="text-xs text-purple-700 px-2 py-1 bg-purple-100 rounded-full">
                        {appointment.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center rounded-md border border-dashed flex flex-col items-center">
                <CalendarDays className="h-10 w-10 text-gray-300 mb-3" />
                <p className="text-gray-500 mb-1">No upcoming appointments</p>
                <p className="text-sm text-gray-400">When you book new clients, they'll appear here</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArtistCalendar;
