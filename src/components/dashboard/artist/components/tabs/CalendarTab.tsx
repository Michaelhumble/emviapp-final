
import { useArtistCalendar } from "@/hooks/useArtistCalendar";
import { format, isToday, isSameDay } from "date-fns";
import { motion } from "framer-motion";
import { Calendar, ChevronLeft, ChevronRight, Clock, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

const statusColors = {
  pending: "bg-amber-100 text-amber-800 border-amber-200",
  accepted: "bg-emerald-100 text-emerald-800 border-emerald-200",
  completed: "bg-blue-100 text-blue-800 border-blue-200",
  declined: "bg-red-100 text-red-800 border-red-200",
  cancelled: "bg-gray-100 text-gray-800 border-gray-200"
};

const CalendarTab = () => {
  const { 
    currentDate,
    weekDays,
    appointments,
    blockedTimes,
    isLoadingAppointments,
    goToPreviousWeek,
    goToNextWeek,
    goToToday
  } = useArtistCalendar();
  
  const [activeDay, setActiveDay] = useState<Date | null>(new Date());

  // Get appointments for a specific day
  const getAppointmentsForDay = (date: Date) => {
    return appointments.filter(appointment => {
      const appointmentDate = new Date(appointment.start_time);
      return isSameDay(appointmentDate, date);
    }).sort((a, b) => {
      return new Date(a.start_time).getTime() - new Date(b.start_time).getTime();
    });
  };

  // Get the status badge for an appointment
  const getStatusBadge = (status: string) => {
    const colorClass = statusColors[status as keyof typeof statusColors] || statusColors.pending;
    
    return (
      <Badge variant="outline" className={`${colorClass} border px-2 py-0.5 text-xs`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-serif flex items-center">
          <Calendar className="h-6 w-6 text-primary mr-2" /> 
          Booking Calendar
        </h2>
        
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={goToPreviousWeek}
            className="h-9"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          
          <Button 
            variant="outline"
            size="sm"
            onClick={goToToday}
            className="h-9"
          >
            Today
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={goToNextWeek}
            className="h-9"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
      
      <div className="text-center mb-2 text-muted-foreground">
        <h3 className="text-lg font-medium">
          Week of {format(weekDays[0], "MMMM d")} - {format(weekDays[6], "MMMM d, yyyy")}
        </h3>
      </div>
      
      {/* Calendar week view */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {weekDays.map((day, i) => {
          const isActive = activeDay ? isSameDay(day, activeDay) : isToday(day);
          const dayAppointments = getAppointmentsForDay(day);
          
          return (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: i * 0.05 }}
              className="flex flex-col"
              onClick={() => setActiveDay(day)}
            >
              <div className={`text-center p-2 rounded-t-lg ${
                isActive 
                  ? 'bg-primary text-primary-foreground font-medium' 
                  : isToday(day)
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'bg-muted'
              }`}>
                <div className="text-xs uppercase">{format(day, "EEE")}</div>
                <div className={`text-xl ${isActive ? 'text-white' : ''}`}>
                  {format(day, "d")}
                </div>
              </div>
              
              <div className={`flex-1 min-h-[100px] p-1 text-center rounded-b-lg text-xs border-x border-b ${
                isActive 
                  ? 'border-primary/30 bg-primary/5' 
                  : 'border-muted-foreground/20'
              }`}>
                {dayAppointments.length > 0 ? (
                  <div className="text-muted-foreground">
                    {dayAppointments.length} booking{dayAppointments.length !== 1 ? 's' : ''}
                  </div>
                ) : (
                  <div className="text-muted-foreground mt-4">No bookings</div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
      
      {/* Daily appointments view */}
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">
          {activeDay 
            ? `Appointments for ${format(activeDay, "EEEE, MMMM d")}` 
            : `Today's Appointments (${format(new Date(), "MMMM d")})`}
        </h3>
        
        {isLoadingAppointments ? (
          <div className="space-y-2">
            {[1, 2, 3].map(i => (
              <Card key={i}>
                <CardContent className="p-0">
                  <Skeleton className="h-20 w-full rounded-md" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {getAppointmentsForDay(activeDay || new Date()).length > 0 ? (
              getAppointmentsForDay(activeDay || new Date()).map((appointment, i) => (
                <motion.div
                  key={appointment.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: i * 0.05 }}
                >
                  <Card className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardContent className="p-0">
                      <div className="flex flex-col sm:flex-row">
                        <div className="w-full sm:w-24 p-3 bg-muted flex flex-row sm:flex-col justify-between sm:justify-center items-center sm:items-center sm:text-center">
                          <Clock className="h-4 w-4 text-muted-foreground mb-0 sm:mb-1" />
                          <div className="text-sm font-medium">
                            {format(new Date(appointment.start_time), "h:mm a")}
                          </div>
                        </div>
                        
                        <div className="flex-1 p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center">
                                <h4 className="font-medium">
                                  {appointment.services?.title || "Custom Service"}
                                </h4>
                                <div className="ml-2">
                                  {getStatusBadge(appointment.status)}
                                </div>
                              </div>
                              
                              <div className="flex items-center mt-1 text-sm text-muted-foreground">
                                <User className="h-3.5 w-3.5 mr-1" />
                                {appointment.customer_name || "Client"}
                              </div>
                            </div>
                            
                            <div className="flex space-x-1">
                              {appointment.notes && (
                                <div className="text-xs max-w-[200px] text-muted-foreground">
                                  {appointment.notes}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-8 border rounded-md bg-muted/30">
                <Calendar className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                <p className="text-muted-foreground">No appointments for this day</p>
                <p className="text-sm text-muted-foreground mt-1">Your next client is just around the corner!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarTab;
