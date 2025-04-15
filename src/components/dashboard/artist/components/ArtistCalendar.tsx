
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useArtistCalendar } from "@/hooks/useArtistCalendar";
import { CalendarDays, ChevronLeft, ChevronRight, Clock, Info, UserPlus } from "lucide-react";
import { format, parseISO, addDays, subDays, isSameDay } from "date-fns";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const TIME_SLOTS = Array.from({ length: 32 }, (_, i) => i + 6); // 6 AM to 10 PM

const ArtistCalendar = () => {
  const { appointments, blockedTimes } = useArtistCalendar();
  const [visibleDays, setVisibleDays] = useState(window.innerWidth >= 768 ? 3 : 1);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  
  // Handle responsive layout
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setVisibleDays(5);
      } else if (window.innerWidth >= 768) {
        setVisibleDays(3);
      } else {
        setVisibleDays(1);
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Generate visible days
  const days = Array.from({ length: visibleDays }, (_, i) => 
    addDays(currentDate, i)
  );
  
  // Navigate between days
  const goToPreviousDay = () => setCurrentDate(prev => subDays(prev, visibleDays));
  const goToNextDay = () => setCurrentDate(prev => addDays(prev, visibleDays));
  const goToToday = () => setCurrentDate(new Date());
  
  // Handle swipe for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe) {
      goToNextDay();
    } else if (isRightSwipe) {
      goToPreviousDay();
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  };
  
  // Get appointments for a specific day
  const getAppointmentsForDay = (day: Date) => {
    return appointments.filter(appointment => 
      isSameDay(parseISO(appointment.start_time), day)
    ).sort((a, b) => 
      new Date(a.start_time).getTime() - new Date(b.start_time).getTime()
    );
  };
  
  // Get blocked times for a specific day
  const getBlockedTimesForDay = (day: Date) => {
    return blockedTimes.filter(blocked => 
      isSameDay(parseISO(blocked.start_time), day)
    ).sort((a, b) => 
      new Date(a.start_time).getTime() - new Date(b.start_time).getTime()
    );
  };
  
  // Calculate position and height for appointment blocks
  const getAppointmentStyle = (appointment: any) => {
    const startTime = parseISO(appointment.start_time);
    const endTime = parseISO(appointment.end_time);
    
    const startHour = startTime.getHours() + startTime.getMinutes() / 60;
    const endHour = endTime.getHours() + endTime.getMinutes() / 60;
    
    // Calculate top position (relative to 6 AM start)
    const topPosition = Math.max(0, (startHour - 6) * 60);
    
    // Calculate height (1 hour = 60px)
    const height = Math.max(30, (endHour - startHour) * 60);
    
    return {
      top: `${topPosition}px`,
      height: `${height}px`
    };
  };
  
  // Handle click on appointment
  const handleAppointmentClick = (appointment: any) => {
    setSelectedBooking(appointment);
  };
  
  // Close appointment preview
  const closePreview = () => {
    setSelectedBooking(null);
  };
  
  // Check if day has any appointments
  const dayHasAppointments = (day: Date) => {
    return getAppointmentsForDay(day).length > 0 || getBlockedTimesForDay(day).length > 0;
  };
  
  // Filter days that have appointments (for collapsing empty days)
  const daysWithAppointments = days.filter(day => dayHasAppointments(day));
  const visibleDaysArray = daysWithAppointments.length > 0 ? daysWithAppointments : days;
  
  return (
    <Card>
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Calendar</CardTitle>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={goToPreviousDay}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={goToToday}>
            Today
          </Button>
          <Button variant="outline" size="sm" onClick={goToNextDay}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="mb-3 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {format(currentDate, "MMMM yyyy")}
          </div>
        </div>
        
        {/* Calendar Grid */}
        <div 
          className="relative overflow-x-auto" 
          ref={calendarRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Days Header */}
          <div className="flex border-b">
            <div className="w-16 shrink-0 border-r bg-muted/30 px-2">
              <div className="h-14"></div>
            </div>
            
            {visibleDaysArray.map((day, dayIndex) => {
              const isToday = isSameDay(day, new Date());
              const dayAppointments = getAppointmentsForDay(day);
              
              return (
                <div 
                  key={dayIndex}
                  className={cn(
                    "min-w-[200px] flex-1 border-r px-1 text-center",
                    isToday && "bg-blue-50"
                  )}
                >
                  <div className="py-2">
                    <div className={cn(
                      "inline-flex h-8 w-8 items-center justify-center rounded-full text-sm",
                      isToday && "bg-blue-600 text-white font-medium"
                    )}>
                      {format(day, "d")}
                    </div>
                    <div className="text-sm font-medium">
                      {format(day, "EEE")}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {dayAppointments.length} {dayAppointments.length === 1 ? 'appt' : 'appts'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Time Grid */}
          <div className="flex h-[960px]"> {/* 16 hours * 60px per hour */}
            {/* Time Labels */}
            <div className="w-16 shrink-0 border-r bg-muted/30">
              {TIME_SLOTS.filter(hour => hour % 2 === 0).map((hour) => (
                <div 
                  key={hour} 
                  className="relative h-[120px]" // 2 hours = 120px
                >
                  <div className="absolute -top-2.5 left-0 right-0 text-xs text-muted-foreground text-center">
                    {hour % 12 === 0 ? 12 : hour % 12} {hour >= 12 ? 'PM' : 'AM'}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Appointments Columns */}
            {visibleDaysArray.map((day, dayIndex) => {
              const dayAppointments = getAppointmentsForDay(day);
              const dayBlockedTimes = getBlockedTimesForDay(day);
              
              return (
                <div 
                  key={dayIndex}
                  className={cn(
                    "relative min-w-[200px] flex-1 border-r",
                    isSameDay(day, new Date()) && "bg-blue-50/30"
                  )}
                >
                  {/* Hour Lines */}
                  {TIME_SLOTS.map((hour) => (
                    <div 
                      key={hour}
                      className="border-b h-[30px] border-gray-100"
                    />
                  ))}
                  
                  {/* Appointment Blocks */}
                  {dayAppointments.map((appointment) => {
                    const style = getAppointmentStyle(appointment);
                    const isConfirmed = appointment.status === 'confirmed';
                    
                    return (
                      <div
                        key={appointment.id}
                        className={cn(
                          "absolute left-1 right-1 rounded-md px-2 py-1 shadow-sm cursor-pointer transition-all hover:shadow-md",
                          isConfirmed 
                            ? "bg-green-50 border border-green-200" 
                            : "bg-amber-50 border border-amber-200"
                        )}
                        style={style}
                        onClick={() => handleAppointmentClick(appointment)}
                      >
                        <div className="text-xs font-medium truncate">
                          {format(parseISO(appointment.start_time), "h:mm a")}
                        </div>
                        <div className="text-xs font-medium truncate">
                          {appointment.service_name || "Service"}
                        </div>
                        <div className="text-xs truncate">
                          {appointment.customer_name || "Client"}
                        </div>
                        <div className="mt-1">
                          <Badge variant="outline" className={cn(
                            "text-[10px] py-0 h-4",
                            isConfirmed ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                          )}>
                            {appointment.status}
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
                  
                  {/* Blocked Time Blocks */}
                  {dayBlockedTimes.map((blocked) => {
                    const style = getAppointmentStyle(blocked);
                    
                    return (
                      <div
                        key={blocked.id}
                        className="absolute left-1 right-1 rounded-md px-2 py-1 bg-gray-100 border border-gray-200 shadow-sm"
                        style={style}
                      >
                        <div className="text-xs font-medium truncate">
                          {format(parseISO(blocked.start_time), "h:mm a")}
                        </div>
                        <div className="text-xs text-gray-600 truncate">
                          {blocked.reason || "Blocked"}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Booking Preview */}
        {selectedBooking && (
          <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center" onClick={closePreview}>
            <div className="bg-white rounded-lg shadow-lg p-4 max-w-md w-full mx-4" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-medium">{selectedBooking.service_name || "Appointment"}</h3>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={closePreview}>
                  <span className="sr-only">Close</span>
                  <span className="text-xl">×</span>
                </Button>
              </div>
              
              <div className="mt-4 space-y-3">
                <div className="flex items-center">
                  <UserPlus className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{selectedBooking.customer_name || "Unnamed Client"}</span>
                </div>
                
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">
                    {format(parseISO(selectedBooking.start_time), "EEE, MMM d, yyyy")} • 
                    {format(parseISO(selectedBooking.start_time), " h:mm a")} - 
                    {format(parseISO(selectedBooking.end_time), " h:mm a")}
                  </span>
                </div>
                
                <div className="flex items-center justify-between mt-6">
                  <Badge className={cn(
                    selectedBooking.status === 'confirmed' 
                      ? "bg-green-100 text-green-800 hover:bg-green-200" 
                      : "bg-amber-100 text-amber-800 hover:bg-amber-200"
                  )}>
                    {selectedBooking.status}
                  </Badge>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">Cancel</Button>
                    <Button size="sm">Manage</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ArtistCalendar;
