
import React, { useState } from "react";
import { motion } from "framer-motion";
import { addDays, format, startOfWeek, isSameDay } from "date-fns";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Clock,
  User
} from "lucide-react";

// Mock data for example bookings
const MOCK_BOOKINGS = [
  {
    id: 1,
    customerName: "Sarah Johnson",
    service: "Gel Fill",
    date: new Date(2025, 3, 15, 10, 0), // Year, Month (0-indexed), Day, Hour, Minute
    duration: 60, // minutes
  },
  {
    id: 2,
    customerName: "Emma Chen",
    service: "Full Set",
    date: new Date(2025, 3, 15, 13, 30),
    duration: 90,
  },
  {
    id: 3,
    customerName: "Michael Patel",
    service: "Nail Art",
    date: new Date(2025, 3, 16, 11, 0),
    duration: 45,
  },
  {
    id: 4,
    customerName: "Jessica Wu",
    service: "Manicure",
    date: new Date(2025, 3, 17, 14, 0),
    duration: 30,
  },
  {
    id: 5,
    customerName: "Alex Kim",
    service: "Pedicure",
    date: new Date(2025, 3, 19, 15, 30),
    duration: 60,
  },
];

const ArtistBookingCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activeView, setActiveView] = useState<"week" | "day">("week");
  const [selectedBooking, setSelectedBooking] = useState<typeof MOCK_BOOKINGS[0] | null>(null);

  // Get start of current week (using Monday as first day)
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  
  // Generate array of 7 days for the week view
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  
  // Get bookings for a specific day
  const getBookingsForDay = (date: Date) => {
    return MOCK_BOOKINGS.filter(booking => 
      isSameDay(booking.date, date)
    );
  };

  // Navigate to previous week
  const goToPreviousWeek = () => {
    setCurrentDate(prev => addDays(prev, -7));
  };

  // Navigate to next week
  const goToNextWeek = () => {
    setCurrentDate(prev => addDays(prev, 7));
  };

  // Format time (e.g. "10:00 AM")
  const formatTime = (date: Date) => {
    return format(date, "h:mm a");
  };

  // Format duration (e.g. "1 hr" or "30 min")
  const formatDuration = (minutes: number) => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return remainingMinutes > 0 
        ? `${hours} hr ${remainingMinutes} min`
        : `${hours} hr`;
    }
    return `${minutes} min`;
  };

  const handleBookingClick = (booking: typeof MOCK_BOOKINGS[0]) => {
    setSelectedBooking(booking);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-6"
    >
      <Card className="border-purple-100 shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <CardTitle className="text-xl font-serif">My Booking Calendar</CardTitle>
              <CardDescription>
                Stay organized. Show up strong. Let us handle the schedule.
              </CardDescription>
            </div>
            <div className="mt-4 sm:mt-0">
              <Tabs value={activeView} onValueChange={(v) => setActiveView(v as "week" | "day")}>
                <TabsList>
                  <TabsTrigger value="week">Week View</TabsTrigger>
                  <TabsTrigger value="day">Day View</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          {/* Calendar Navigation */}
          <div className="flex justify-between items-center mb-4">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1"
              onClick={goToPreviousWeek}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            
            <h3 className="text-lg font-medium">
              {format(weekStart, "MMMM d")} - {format(weekDays[6], "MMMM d, yyyy")}
            </h3>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1"
              onClick={goToNextWeek}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Week View */}
          {activeView === "week" && (
            <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
              {weekDays.map((day, index) => {
                const dayBookings = getBookingsForDay(day);
                return (
                  <div key={index} className="border rounded-md overflow-hidden">
                    {/* Day Header */}
                    <div className="bg-gray-50 p-2 text-center border-b">
                      <p className="text-sm font-medium text-gray-600">
                        {format(day, "EEE")}
                      </p>
                      <p className="text-lg font-bold">
                        {format(day, "d")}
                      </p>
                    </div>
                    
                    {/* Day Bookings */}
                    <div className="p-2 min-h-[150px]">
                      {dayBookings.length > 0 ? (
                        <div className="space-y-2">
                          {dayBookings.map(booking => (
                            <div 
                              key={booking.id}
                              onClick={() => handleBookingClick(booking)}
                              className="border-l-4 border-purple-400 bg-purple-50 rounded-r p-2 text-sm cursor-pointer hover:bg-purple-100 transition-colors"
                            >
                              <div className="flex justify-between items-center mb-1">
                                <span className="font-medium">
                                  {formatTime(booking.date)}
                                </span>
                                <Badge variant="outline" className="bg-white">
                                  {formatDuration(booking.duration)}
                                </Badge>
                              </div>
                              <p className="font-medium truncate">{booking.service}</p>
                              <div className="flex items-center text-gray-600 text-xs mt-1">
                                <User className="h-3 w-3 mr-1" />
                                {booking.customerName}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="h-full flex items-center justify-center">
                          <p className="text-gray-400 text-sm">No bookings</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          
          {/* Day View */}
          {activeView === "day" && (
            <div className="border rounded-md overflow-hidden">
              {/* Day Header */}
              <div className="bg-gray-50 p-3 text-center border-b">
                <h3 className="text-xl font-medium">
                  {format(currentDate, "EEEE, MMMM d, yyyy")}
                </h3>
              </div>
              
              {/* Day Bookings */}
              <div className="p-4">
                <div className="space-y-3">
                  {getBookingsForDay(currentDate).length > 0 ? (
                    getBookingsForDay(currentDate).map(booking => (
                      <div 
                        key={booking.id}
                        onClick={() => handleBookingClick(booking)}
                        className="flex items-center border rounded-md p-3 cursor-pointer hover:bg-gray-50 transition-colors"
                      >
                        <div className="w-20 text-right pr-4 font-medium text-gray-600">
                          {formatTime(booking.date)}
                        </div>
                        
                        <div className="flex-1 border-l pl-4">
                          <div className="flex justify-between items-center">
                            <h4 className="font-medium">{booking.service}</h4>
                            <Badge variant="outline" className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {formatDuration(booking.duration)}
                            </Badge>
                          </div>
                          <div className="flex items-center text-gray-600 text-sm mt-1">
                            <User className="h-4 w-4 mr-1" />
                            {booking.customerName}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <Calendar className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                      <p className="text-gray-500">No bookings scheduled for this day</p>
                      <Button variant="link" size="sm">
                        Add a booking
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {/* Quick help text */}
          <div className="mt-4 text-sm text-gray-500 text-center">
            <p>Click on any booking to view details and manage appointments.</p>
          </div>
        </CardContent>
      </Card>
      
      {/* Selected Booking Preview Modal (placeholder for future implementation) */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setSelectedBooking(null)}>
          <div className="bg-white p-6 rounded-lg max-w-md w-full" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-medium mb-4">Booking Details</h3>
            <div className="space-y-3">
              <div className="flex">
                <span className="font-medium w-1/3">Client:</span>
                <span>{selectedBooking.customerName}</span>
              </div>
              <div className="flex">
                <span className="font-medium w-1/3">Service:</span>
                <span>{selectedBooking.service}</span>
              </div>
              <div className="flex">
                <span className="font-medium w-1/3">Date:</span>
                <span>{format(selectedBooking.date, "EEEE, MMMM d, yyyy")}</span>
              </div>
              <div className="flex">
                <span className="font-medium w-1/3">Time:</span>
                <span>{formatTime(selectedBooking.date)}</span>
              </div>
              <div className="flex">
                <span className="font-medium w-1/3">Duration:</span>
                <span>{formatDuration(selectedBooking.duration)}</span>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <Button variant="outline" className="mr-2" onClick={() => setSelectedBooking(null)}>
                Close
              </Button>
              <Button>Manage Booking</Button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ArtistBookingCalendar;
