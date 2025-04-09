
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { useAuth } from "@/context/auth";
import { format, isSameDay } from "date-fns";
import { CalendarClock, CheckCircle, Clock, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Booking {
  id: string;
  date: Date;
  client: string;
  service: string;
  status: "confirmed" | "pending" | "cancelled";
  time: string;
}

const ArtistCalendar = () => {
  const { userProfile } = useAuth();
  const [date, setDate] = useState<Date>(new Date());
  const preferredLanguage = userProfile?.preferred_language || "English";
  const isVietnamese = preferredLanguage === 'vi' || preferredLanguage === 'Vietnamese';
  
  // Dummy data - would be fetched from database in a real app
  const bookings: Booking[] = [
    {
      id: "1",
      date: new Date(),
      client: "Jane Smith",
      service: "Full Set",
      status: "confirmed",
      time: "10:00 AM"
    },
    {
      id: "2",
      date: new Date(),
      client: "Alice Johnson",
      service: "Gel Manicure",
      status: "pending",
      time: "2:30 PM"
    },
    {
      id: "3",
      date: new Date(new Date().setDate(new Date().getDate() + 2)),
      client: "Sarah Williams",
      service: "Nail Art",
      status: "confirmed",
      time: "11:15 AM"
    }
  ];
  
  // Get bookings for selected date
  const selectedDateBookings = bookings.filter(booking => 
    isSameDay(booking.date, date)
  );
  
  // Generate days with bookings for calendar highlight
  const daysWithBookings = bookings.map(booking => booking.date);
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-green-100 text-green-800 border-green-200";
      case "pending": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "cancelled": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "pending": return <Clock className="h-4 w-4 text-yellow-600" />;
      case "cancelled": return <XCircle className="h-4 w-4 text-red-600" />;
      default: return null;
    }
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <CalendarClock className="mr-2 h-5 w-5 text-primary" />
          {isVietnamese ? "Lịch Hẹn" : "Schedule"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => newDate && setDate(newDate)}
              className="rounded-md border"
              modifiers={{
                booked: daysWithBookings
              }}
              modifiersStyles={{
                booked: { backgroundColor: '#f0f9ff', fontWeight: 'bold', borderRadius: '0' }
              }}
            />
          </div>
          <div>
            <h3 className="font-medium mb-3">
              {isVietnamese ? "Hẹn cho " : "Appointments for "}
              {format(date, 'MMMM d, yyyy')}
            </h3>
            
            {selectedDateBookings.length > 0 ? (
              <div className="space-y-3">
                {selectedDateBookings.map((booking) => (
                  <div 
                    key={booking.id} 
                    className="p-3 border rounded-md flex justify-between items-center"
                  >
                    <div>
                      <div className="font-medium">{booking.client}</div>
                      <div className="text-sm text-gray-500">{booking.service}</div>
                      <div className="text-sm font-medium flex items-center mt-1">
                        <Clock className="h-3 w-3 mr-1 text-gray-400" /> 
                        {booking.time}
                      </div>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`flex items-center ${getStatusColor(booking.status)}`}
                    >
                      {getStatusIcon(booking.status)}
                      <span className="ml-1 capitalize">{booking.status}</span>
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                {isVietnamese 
                  ? "Không có cuộc hẹn nào cho ngày này" 
                  : "No appointments for this day"}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArtistCalendar;
