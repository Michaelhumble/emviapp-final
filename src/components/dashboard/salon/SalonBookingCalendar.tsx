
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Plus } from "lucide-react";
import { format } from "date-fns";
import { WeeklyCalendar } from "./calendar/WeeklyCalendar";
import { useAuth } from "@/context/auth";
import { useAppointments } from "@/hooks/calendar/useAppointments";
import { useCalendarNavigation } from "@/hooks/calendar/useCalendarNavigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const SalonBookingCalendar = () => {
  const { user } = useAuth();
  const { currentDate, weekDays, goToPreviousWeek, goToNextWeek, goToToday } = useCalendarNavigation();
  const { appointments, isLoadingAppointments } = useAppointments(weekDays[0], weekDays[6]);
  const [isNewBookingOpen, setIsNewBookingOpen] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    clientName: "",
    service: "",
    date: "",
    time: "",
    duration: "60",
    notes: ""
  });

  const handleCreateBooking = () => {
    toast.success("Booking created successfully!", {
      description: `${bookingForm.clientName} scheduled for ${bookingForm.service} on ${bookingForm.date}`
    });
    setIsNewBookingOpen(false);
    setBookingForm({
      clientName: "",
      service: "",
      date: "",
      time: "",
      duration: "60",
      notes: ""
    });
  };

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
        
        <Button 
          onClick={() => setIsNewBookingOpen(true)}
          className="bg-purple-600 hover:bg-purple-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Booking
        </Button>
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

      {/* New Booking Dialog */}
      <Dialog open={isNewBookingOpen} onOpenChange={setIsNewBookingOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Booking</DialogTitle>
            <DialogDescription>
              Add a new appointment to the calendar
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="client-name">Client Name</Label>
              <Input
                id="client-name"
                value={bookingForm.clientName}
                onChange={(e) => setBookingForm(prev => ({ ...prev, clientName: e.target.value }))}
                placeholder="Enter client name"
              />
            </div>
            <div>
              <Label htmlFor="service">Service</Label>
              <Input
                id="service"
                value={bookingForm.service}
                onChange={(e) => setBookingForm(prev => ({ ...prev, service: e.target.value }))}
                placeholder="Enter service type"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="booking-date">Date</Label>
                <Input
                  id="booking-date"
                  type="date"
                  value={bookingForm.date}
                  onChange={(e) => setBookingForm(prev => ({ ...prev, date: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="booking-time">Time</Label>
                <Input
                  id="booking-time"
                  type="time"
                  value={bookingForm.time}
                  onChange={(e) => setBookingForm(prev => ({ ...prev, time: e.target.value }))}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                id="duration"
                type="number"
                value={bookingForm.duration}
                onChange={(e) => setBookingForm(prev => ({ ...prev, duration: e.target.value }))}
                placeholder="60"
              />
            </div>
            <div>
              <Label htmlFor="booking-notes">Notes</Label>
              <Textarea
                id="booking-notes"
                value={bookingForm.notes}
                onChange={(e) => setBookingForm(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Any special notes or requests..."
                rows={3}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleCreateBooking} className="flex-1">
                Create Booking
              </Button>
              <Button variant="outline" onClick={() => setIsNewBookingOpen(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SalonBookingCalendar;
