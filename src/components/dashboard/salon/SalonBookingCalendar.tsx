
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { WeeklyCalendar } from "./calendar/WeeklyCalendar";
import { useAuth } from "@/context/auth";
import { useAppointments } from "@/hooks/calendar/useAppointments";
import { useCalendarNavigation } from "@/hooks/calendar/useCalendarNavigation";

const SalonBookingCalendar = () => {
  const { user } = useAuth();
  const { currentDate, weekDays, goToPreviousWeek, goToNextWeek, goToToday } = useCalendarNavigation();
  const { appointments, isLoadingAppointments } = useAppointments(weekDays[0], weekDays[6]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-playfair text-emvi-dark">Booking Calendar</h1>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={goToPreviousWeek}
            className="text-emvi-dark hover:text-emvi-accent"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={goToNextWeek}
            className="text-emvi-dark hover:text-emvi-accent"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={goToToday}
            className="ml-2"
          >
            Today
          </Button>
          
          <span className="ml-4 text-lg font-playfair">
            {format(weekDays[0], "MMMM d")} - {format(weekDays[6], "MMMM d, yyyy")}
          </span>
        </div>
      </div>

      <Card className="border-muted">
        <CardContent className="p-0">
          {isLoadingAppointments ? (
            <div className="flex justify-center items-center h-[600px]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emvi-accent"></div>
            </div>
          ) : (
            <WeeklyCalendar 
              weekDays={weekDays}
              appointments={appointments}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SalonBookingCalendar;
