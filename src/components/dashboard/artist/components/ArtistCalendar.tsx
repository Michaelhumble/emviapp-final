
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useArtistCalendar } from "@/hooks/useArtistCalendar";
import { CalendarDays, ChevronLeft, ChevronRight, Clock, Info, UserPlus, X, Calendar as CalendarIcon, Plus } from "lucide-react";
import { format, parseISO, addDays, subDays, isSameDay, isToday, startOfDay, endOfDay } from "date-fns";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { ManualBookingDialog } from "../calendar/ManualBookingDialog";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";

const TIME_SLOTS = Array.from({ length: 32 }, (_, i) => i + 6); // 6 AM to 10 PM

const ArtistCalendar = () => {
  const { 
    appointments, 
    blockedTimes,
    deleteAppointment,
    deleteBlockedTime
  } = useArtistCalendar();
  
  const { user: auth } = useAuth();
  const [visibleDays, setVisibleDays] = useState(window.innerWidth >= 768 ? 3 : 1);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [showEmptyDays, setShowEmptyDays] = useState(true);
  const calendarRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isManualBookingOpen, setIsManualBookingOpen] = useState(false);
  
  const { data: services } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('id, title, duration_minutes')
        .eq('user_id', auth?.id);
      
      if (error) throw error;
      return data || [];
    }
  });

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
  
  const days = Array.from({ length: visibleDays }, (_, i) => 
    addDays(currentDate, i)
  );
  
  const goToPreviousDay = () => setCurrentDate(prev => subDays(prev, visibleDays));
  const goToNextDay = () => setCurrentDate(prev => addDays(prev, visibleDays));
  const goToToday = () => setCurrentDate(new Date());
  
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
  
  const getAppointmentsForDay = (day: Date) => {
    return appointments.filter(appointment => 
      isSameDay(parseISO(appointment.start_time), day)
    ).sort((a, b) => 
      new Date(a.start_time).getTime() - new Date(b.start_time).getTime()
    );
  };
  
  const getBlockedTimesForDay = (day: Date) => {
    return blockedTimes.filter(blocked => 
      isSameDay(parseISO(blocked.start_time), day)
    ).sort((a, b) => 
      new Date(a.start_time).getTime() - new Date(b.start_time).getTime()
    );
  };
  
  const getAppointmentStyle = (appointment: any) => {
    const startTime = parseISO(appointment.start_time);
    const endTime = parseISO(appointment.end_time);
    
    const startHour = startTime.getHours() + startTime.getMinutes() / 60;
    const endHour = endTime.getHours() + endTime.getMinutes() / 60;
    
    const topPosition = Math.max(0, (startHour - 6) * 60);
    
    const height = Math.max(30, (endHour - startHour) * 60);
    
    return {
      top: `${topPosition}px`,
      height: `${height}px`
    };
  };
  
  const handleAppointmentClick = (appointment: any) => {
    setSelectedBooking(appointment);
  };
  
  const closePreview = () => {
    setSelectedBooking(null);
  };
  
  const dayHasAppointments = (day: Date) => {
    return getAppointmentsForDay(day).length > 0 || getBlockedTimesForDay(day).length > 0;
  };
  
  const visibleDaysArray = !showEmptyDays 
    ? days.filter(day => dayHasAppointments(day))
    : days;
  
  const displayDays = visibleDaysArray.length > 0 ? visibleDaysArray : [days[0]];
  
  const handleDeleteAppointment = async (id: string) => {
    try {
      await deleteAppointment(id);
      setSelectedBooking(null);
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };
  
  const handleDeleteBlockedTime = async (id: string) => {
    try {
      await deleteBlockedTime(id);
      setSelectedBooking(null);
    } catch (error) {
      console.error("Error deleting blocked time:", error);
    }
  };
  
  const handleSaveManualBooking = async (bookingData: any) => {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .insert([{
          ...bookingData,
          artist_id: auth?.id,
          customer_id: null
        }]);

      if (error) throw error;
      toast.success('Manual booking added successfully');
      setIsManualBookingOpen(false);
    } catch (error) {
      console.error('Error adding manual booking:', error);
      toast.error('Failed to add manual booking');
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle className="text-xl flex items-center">
            <CalendarDays className="h-5 w-5 text-blue-500 mr-2" />
            Calendar
          </CardTitle>
          <div className="flex flex-wrap items-center gap-2">
            <Button 
              variant="default" 
              size="sm" 
              className="bg-purple-600 hover:bg-purple-700"
              onClick={() => setIsManualBookingOpen(true)}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Manual Booking
            </Button>

            <Button variant="outline" size="sm" onClick={goToPreviousDay}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={goToToday}>
              Today
            </Button>
            <Button variant="outline" size="sm" onClick={goToNextDay}>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <div className="flex items-center ml-2">
              <label htmlFor="show-empty-days" className="text-sm text-muted-foreground mr-2">
                Show Empty Days
              </label>
              <input
                id="show-empty-days"
                type="checkbox" 
                checked={showEmptyDays}
                onChange={() => setShowEmptyDays(!showEmptyDays)}
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="mb-3 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {format(currentDate, "MMMM yyyy")}
          </div>
        </div>
        
        <div 
          className="relative overflow-x-auto" 
          ref={calendarRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="flex border-b">
            <div className="w-16 shrink-0 border-r bg-muted/30 px-2">
              <div className="h-14"></div>
            </div>
            
            {displayDays.map((day, dayIndex) => {
              const isCurrentDay = isToday(day);
              const dayAppointments = getAppointmentsForDay(day);
              
              return (
                <div 
                  key={dayIndex}
                  className={cn(
                    "min-w-[200px] flex-1 border-r px-1 text-center",
                    isCurrentDay && "bg-blue-50"
                  )}
                >
                  <div className="py-2">
                    <div className={cn(
                      "inline-flex h-8 w-8 items-center justify-center rounded-full text-sm",
                      isCurrentDay && "bg-blue-600 text-white font-medium"
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
          
          <div className="flex h-[960px]">
            <div className="w-16 shrink-0 border-r bg-muted/30">
              {TIME_SLOTS.filter(hour => hour % 2 === 0).map((hour) => (
                <div 
                  key={hour} 
                  className="relative h-[120px]"
                >
                  <div className="absolute -top-2.5 left-0 right-0 text-xs text-muted-foreground text-center">
                    {hour % 12 === 0 ? 12 : hour % 12} {hour >= 12 ? 'PM' : 'AM'}
                  </div>
                </div>
              ))}
            </div>
            
            {displayDays.map((day, dayIndex) => {
              const dayAppointments = getAppointmentsForDay(day);
              const dayBlockedTimes = getBlockedTimesForDay(day);
              
              return (
                <div 
                  key={dayIndex}
                  className={cn(
                    "relative min-w-[200px] flex-1 border-r",
                    isToday(day) && "bg-blue-50/30"
                  )}
                >
                  {TIME_SLOTS.map((hour) => (
                    <div 
                      key={hour}
                      className="border-b h-[30px] border-gray-100"
                    />
                  ))}
                  
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
                          {appointment.services?.title || "Service"}
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
                  
                  {dayBlockedTimes.map((blocked) => {
                    const style = getAppointmentStyle(blocked);
                    
                    return (
                      <div
                        key={blocked.id}
                        className="absolute left-1 right-1 rounded-md px-2 py-1 bg-gray-100 border border-gray-200 shadow-sm cursor-pointer"
                        style={style}
                        onClick={() => handleAppointmentClick(blocked)}
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
        
        {selectedBooking && (
          <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center" onClick={closePreview}>
            <div className="bg-white rounded-lg shadow-lg p-4 max-w-md w-full mx-4 relative" onClick={e => e.stopPropagation()}>
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-2 top-2" 
                onClick={closePreview}
              >
                <X className="h-4 w-4" />
              </Button>
              
              <div className="pt-2">
                <h3 className="text-lg font-medium">
                  {'services' in selectedBooking 
                    ? (selectedBooking.services?.title || "Appointment") 
                    : (selectedBooking.reason || "Blocked Time")}
                </h3>
                
                <div className="mt-4 space-y-3">
                  {'customer_name' in selectedBooking && (
                    <div className="flex items-center">
                      <UserPlus className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">{selectedBooking.customer_name || "Unnamed Client"}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">
                      {format(parseISO(selectedBooking.start_time), "EEE, MMM d, yyyy")} • 
                      {format(parseISO(selectedBooking.start_time), " h:mm a")} - 
                      {format(parseISO(selectedBooking.end_time), " h:mm a")}
                    </span>
                  </div>
                  
                  {'notes' in selectedBooking && selectedBooking.notes && (
                    <div className="flex items-start">
                      <Info className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                      <span className="text-sm">{selectedBooking.notes}</span>
                    </div>
                  )}
                  
                  {'reason' in selectedBooking && selectedBooking.reason && (
                    <div className="flex items-start">
                      <Info className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                      <span className="text-sm">{selectedBooking.reason}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between mt-6">
                    {'status' in selectedBooking && (
                      <Badge className={cn(
                        selectedBooking.status === 'confirmed' 
                          ? "bg-green-100 text-green-800 hover:bg-green-200" 
                          : "bg-amber-100 text-amber-800 hover:bg-amber-200"
                      )}>
                        {selectedBooking.status}
                      </Badge>
                    )}
                    
                    <div className="flex gap-2">
                      {'customer_name' in selectedBooking ? (
                        <Button 
                          size="sm" 
                          variant="destructive" 
                          onClick={() => handleDeleteAppointment(selectedBooking.id)}
                        >
                          Cancel
                        </Button>
                      ) : (
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleDeleteBlockedTime(selectedBooking.id)}
                        >
                          Remove Block
                        </Button>
                      )}
                      <Button size="sm">Manage</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      
      <ManualBookingDialog
        isOpen={isManualBookingOpen}
        onClose={() => setIsManualBookingOpen(false)}
        onSave={handleSaveManualBooking}
        services={services || []}
      />
    </Card>
  );
};

export default ArtistCalendar;
