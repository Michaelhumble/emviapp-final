
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, Plus, Users } from "lucide-react";
import { format, startOfWeek, endOfWeek, eachDayOfInterval, addDays, isToday, isSameDay, addWeeks, subWeeks } from "date-fns";
import { motion } from "framer-motion";

// Mock appointment data
const appointments = [
  {
    id: 1,
    client: "Jessica Miller",
    avatar: "https://i.pravatar.cc/150?img=5",
    service: "Gel Manicure",
    start: new Date(2025, 3, 22, 10, 0),
    end: new Date(2025, 3, 22, 11, 30),
    status: "confirmed"
  },
  {
    id: 2,
    client: "Michael Chen",
    avatar: "https://i.pravatar.cc/150?img=3",
    service: "Full Set Acrylics",
    start: new Date(2025, 3, 22, 13, 0),
    end: new Date(2025, 3, 22, 15, 0),
    status: "confirmed"
  },
  {
    id: 3,
    client: "Emma Davis",
    avatar: "https://i.pravatar.cc/150?img=9",
    service: "Nail Art Design",
    start: new Date(2025, 3, 23, 11, 0),
    end: new Date(2025, 3, 23, 12, 30),
    status: "confirmed"
  },
  {
    id: 4,
    client: "James Wilson",
    avatar: "https://i.pravatar.cc/150?img=4",
    service: "Pedicure",
    start: new Date(2025, 3, 24, 14, 0),
    end: new Date(2025, 3, 24, 15, 30),
    status: "pending"
  },
  {
    id: 5,
    client: "Olivia Taylor",
    avatar: "https://i.pravatar.cc/150?img=8",
    service: "Nail Polish Change",
    start: new Date(2025, 3, 25, 16, 0),
    end: new Date(2025, 3, 25, 16, 30),
    status: "confirmed"
  }
];

// Hours for the day view
const hours = Array.from({ length: 12 }, (_, i) => i + 9); // 9am to 8pm

const CalendarTab = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 3, 22)); // Use a fixed date for demo
  const [currentView, setCurrentView] = useState("week");
  
  // Get the current week days
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 0 });
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });
  
  const nextWeek = () => {
    setCurrentDate(addWeeks(currentDate, 1));
  };
  
  const prevWeek = () => {
    setCurrentDate(subWeeks(currentDate, 1));
  };
  
  // Filter appointments for the current week
  const weekAppointments = appointments.filter(appointment => {
    const appointmentDate = new Date(appointment.start);
    return appointmentDate >= weekStart && appointmentDate <= weekEnd;
  });
  
  // Get appointments for a specific day
  const getAppointmentsForDay = (day: Date) => {
    return appointments.filter(appointment => 
      isSameDay(day, new Date(appointment.start))
    );
  };
  
  // Format time from date
  const formatTime = (date: Date) => {
    return format(date, "h:mm a");
  };
  
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <CardTitle className="text-lg font-medium">Appointment Calendar</CardTitle>
          <p className="text-sm text-gray-500 mt-1">Manage your schedule and bookings</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-white rounded-lg shadow-sm border flex">
            <Button
              variant="ghost"
              className={`rounded-r-none ${currentView === 'week' ? 'bg-gray-100' : ''}`}
              onClick={() => setCurrentView('week')}
            >
              Week
            </Button>
            <Button
              variant="ghost"
              className={`rounded-l-none ${currentView === 'day' ? 'bg-gray-100' : ''}`}
              onClick={() => setCurrentView('day')}
            >
              Day
            </Button>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Booking
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={prevWeek}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-lg font-medium">
            {format(weekStart, "MMMM d")} - {format(weekEnd, "MMMM d, yyyy")}
          </h2>
          <Button variant="ghost" onClick={nextWeek}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        {currentView === 'week' ? (
          <div className="grid grid-cols-7 gap-2 overflow-x-auto">
            {weekDays.map((day, dayIdx) => (
              <div key={dayIdx} className="min-w-[130px]">
                <div 
                  className={`text-center p-2 mb-2 rounded-lg ${
                    isToday(day) ? 'bg-purple-100 text-purple-800' : ''
                  }`}
                >
                  <div className="text-sm font-medium">{format(day, "EEE")}</div>
                  <div className="text-lg">{format(day, "d")}</div>
                </div>
                
                <div className="space-y-2">
                  {getAppointmentsForDay(day).length > 0 ? (
                    getAppointmentsForDay(day).map((appointment) => (
                      <motion.div
                        key={appointment.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-2 rounded-lg text-xs ${
                          appointment.status === 'confirmed' 
                            ? 'bg-blue-50 border border-blue-100' 
                            : 'bg-amber-50 border border-amber-100'
                        }`}
                      >
                        <div className="font-medium truncate">{appointment.client}</div>
                        <div className="flex items-center mt-1 text-gray-600">
                          <Clock className="h-3 w-3 mr-1" />
                          {formatTime(appointment.start)} - {formatTime(appointment.end)}
                        </div>
                        <div className="mt-1 truncate">{appointment.service}</div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-gray-500 text-xs">No appointments</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-4">
              <Button variant="ghost" size="sm" className="h-8">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous Day
              </Button>
              <h3 className="text-base font-medium">
                {format(currentDate, "EEEE, MMMM d, yyyy")}
              </h3>
              <Button variant="ghost" size="sm" className="h-8">
                Next Day
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            
            {hours.map((hour) => {
              const hoursAppointments = appointments.filter(appointment => {
                const appointmentHour = new Date(appointment.start).getHours();
                return (
                  isSameDay(currentDate, new Date(appointment.start)) && 
                  appointmentHour === hour
                );
              });
              
              return (
                <div key={hour} className="flex border-t pt-2">
                  <div className="w-16 text-gray-500 text-sm pt-1">
                    {hour === 12 ? '12 PM' : hour < 12 ? `${hour} AM` : `${hour - 12} PM`}
                  </div>
                  <div className="flex-1">
                    {hoursAppointments.length > 0 ? (
                      hoursAppointments.map((appointment) => (
                        <motion.div
                          key={appointment.id}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className={`p-3 rounded-lg mb-2 ${
                            appointment.status === 'confirmed' 
                              ? 'bg-blue-50 border border-blue-100' 
                              : 'bg-amber-50 border border-amber-100'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <img 
                                src={appointment.avatar} 
                                alt={appointment.client} 
                                className="w-8 h-8 rounded-full mr-2 object-cover"
                              />
                              <div>
                                <h4 className="font-medium">{appointment.client}</h4>
                                <p className="text-sm text-gray-600">{appointment.service}</p>
                              </div>
                            </div>
                            <div className="text-sm text-gray-600">
                              {formatTime(appointment.start)} - {formatTime(appointment.end)}
                            </div>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="h-8 flex items-center pl-2 text-gray-400 text-sm border-l-2 border-dashed border-gray-200">
                        Available
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
        
        <div className="flex items-center justify-between mt-6 pt-4 border-t">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-400 mr-2"></div>
              <span className="text-sm text-gray-600">Confirmed</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-amber-400 mr-2"></div>
              <span className="text-sm text-gray-600">Pending</span>
            </div>
          </div>
          <div className="flex items-center">
            <CalendarIcon className="h-4 w-4 mr-2 text-gray-500" />
            <span className="text-sm text-gray-600">
              {weekAppointments.length} appointments this week
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CalendarTab;
