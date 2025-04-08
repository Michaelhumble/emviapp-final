
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Clock, Check, X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

// Mock availability data
const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const mockAvailability = {
  Mon: ["9:00 AM - 5:00 PM"],
  Tue: ["9:00 AM - 5:00 PM"],
  Wed: ["10:00 AM - 6:00 PM"],
  Thu: ["9:00 AM - 5:00 PM"],
  Fri: ["9:00 AM - 5:00 PM"],
  Sat: ["10:00 AM - 3:00 PM"],
  Sun: []
};

// Mock upcoming bookings
const upcomingBookings = [
  { id: 1, client: "Jennifer L.", service: "Full Set - Acrylic", date: "2025-04-07", time: "11:00 AM" },
  { id: 2, client: "Maria K.", service: "Gel Polish Manicure", date: "2025-04-08", time: "2:30 PM" },
];

const ArtistBookingCalendar = () => {
  const [currentDate] = useState(new Date());
  
  // Format date as Month YYYY
  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-serif">Booking Calendar</CardTitle>
        <CardDescription>Manage your schedule and availability</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Mini calendar header */}
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium">{formatMonthYear(currentDate)}</h3>
          <div className="flex space-x-1">
            <Button variant="outline" size="sm" className="h-7 w-7 p-0">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="h-7 w-7 p-0">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Availability section */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm flex items-center">
            <Clock className="h-4 w-4 mr-1 text-purple-500" />
            Weekly Availability
          </h4>
          
          <div className="grid grid-cols-7 gap-1 text-center">
            {daysOfWeek.map((day) => (
              <div key={day} className="text-xs font-medium">
                {day}
              </div>
            ))}
            
            {daysOfWeek.map((day) => (
              <div key={`status-${day}`} 
                className={`h-7 rounded-full flex items-center justify-center text-xs
                  ${mockAvailability[day as keyof typeof mockAvailability]?.length 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-400'}`}
              >
                {mockAvailability[day as keyof typeof mockAvailability]?.length 
                  ? <Check className="h-3 w-3" /> 
                  : <X className="h-3 w-3" />}
              </div>
            ))}
          </div>
          
          <Button size="sm" variant="outline" className="w-full">
            <CalendarIcon className="h-4 w-4 mr-1" />
            Edit Availability
          </Button>
        </div>
        
        {/* Upcoming bookings */}
        <div className="space-y-3 pt-2">
          <h4 className="font-medium text-sm">Upcoming Appointments</h4>
          
          {upcomingBookings.length > 0 ? (
            <div className="space-y-2">
              {upcomingBookings.map((booking, index) => (
                <motion.div 
                  key={booking.id}
                  className="p-3 rounded-lg bg-purple-50 border border-purple-100"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-sm">{booking.client}</p>
                      <p className="text-xs text-gray-600">{booking.service}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-medium text-purple-700">{booking.time}</p>
                      <p className="text-xs text-gray-600">
                        {new Date(booking.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-sm text-gray-500">
              No upcoming appointments
            </div>
          )}
          
          <Button size="sm" className="w-full">
            View All Bookings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArtistBookingCalendar;
