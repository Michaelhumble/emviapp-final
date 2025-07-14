
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Plus } from "lucide-react";
import { format } from "date-fns";
import { WeeklyCalendar } from "./calendar/WeeklyCalendar";
import { useAuth } from "@/context/auth";
import { useCalendarNavigation } from "@/hooks/calendar/useCalendarNavigation";
import { useSalonBookings } from "@/hooks/useSalonBookings";
import type { Appointment } from "@/hooks/calendar/useAppointments";
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

const SalonBookingCalendar = () => {
  const { user } = useAuth();
  const { currentDate, weekDays, goToPreviousWeek, goToNextWeek, goToToday } = useCalendarNavigation();
  const { bookings, loading, createBooking } = useSalonBookings();

  // Transform bookings to appointments format
  const appointments: Appointment[] = bookings.map(booking => ({
    id: booking.id,
    artist_id: booking.artist_id || user?.id || '',
    customer_name: booking.client_name,
    start_time: `${booking.booking_date}T${booking.booking_time}:00`,
    end_time: `${booking.booking_date}T${new Date(`1970-01-01T${booking.booking_time}:00`).getTime() + (booking.duration_minutes * 60000) > 86400000 ? '23:59' : new Date(new Date(`1970-01-01T${booking.booking_time}:00`).getTime() + (booking.duration_minutes * 60000)).toTimeString().slice(0, 5)}:00`,
    notes: booking.notes,
    status: booking.status || 'confirmed',
    created_at: booking.created_at || new Date().toISOString(),
    updated_at: booking.updated_at || new Date().toISOString(),
    duration_minutes: booking.duration_minutes,
    services: {
      title: booking.service_name
    }
  }));
  const [isNewBookingOpen, setIsNewBookingOpen] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    client_name: "",
    service_name: "",
    booking_date: "",
    booking_time: "",
    duration_minutes: 60,
    notes: ""
  });

  const handleCreateBooking = async () => {
    const success = await createBooking({
      client_name: bookingForm.client_name,
      service_name: bookingForm.service_name,
      booking_date: bookingForm.booking_date,
      booking_time: bookingForm.booking_time,
      duration_minutes: bookingForm.duration_minutes,
      notes: bookingForm.notes
    });
    
    if (success) {
      setIsNewBookingOpen(false);
      setBookingForm({
        client_name: "",
        service_name: "",
        booking_date: "",
        booking_time: "",
        duration_minutes: 60,
        notes: ""
      });
    }
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
          {loading ? (
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
                value={bookingForm.client_name}
                onChange={(e) => setBookingForm(prev => ({ ...prev, client_name: e.target.value }))}
                placeholder="Enter client name"
              />
            </div>
            <div>
              <Label htmlFor="service">Service</Label>
              <Input
                id="service"
                value={bookingForm.service_name}
                onChange={(e) => setBookingForm(prev => ({ ...prev, service_name: e.target.value }))}
                placeholder="Enter service type"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="booking-date">Date</Label>
                <Input
                  id="booking-date"
                  type="date"
                  value={bookingForm.booking_date}
                  onChange={(e) => setBookingForm(prev => ({ ...prev, booking_date: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="booking-time">Time</Label>
                <Input
                  id="booking-time"
                  type="time"
                  value={bookingForm.booking_time}
                  onChange={(e) => setBookingForm(prev => ({ ...prev, booking_time: e.target.value }))}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                id="duration"
                type="number"
                value={bookingForm.duration_minutes}
                onChange={(e) => setBookingForm(prev => ({ ...prev, duration_minutes: parseInt(e.target.value) || 60 }))}
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
