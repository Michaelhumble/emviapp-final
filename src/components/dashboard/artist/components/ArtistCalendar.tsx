
import React, { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Calendar, Clock, User, Film, Phone } from "lucide-react";
import { format, addDays, startOfWeek, addWeeks, subWeeks, parseISO, differenceInMinutes } from 'date-fns';
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAppointments } from "@/hooks/useAppointments";
import { Appointment } from "@/types/appointment";
import { ManualBookingDialog } from '../calendar/ManualBookingDialog';

// Type definition for a time slot
interface TimeSlot {
  hour: number;
  minute: number;
  label: string;
}

// Helper function to generate time slots
const generateTimeSlots = (): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  for (let hour = 9; hour <= 20; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      slots.push({
        hour,
        minute,
        label: `${hour % 12 === 0 ? 12 : hour % 12}:${minute === 0 ? '00' : minute} ${hour >= 12 ? 'PM' : 'AM'}`
      });
    }
  }
  return slots;
};

const timeSlots = generateTimeSlots();

// Component for a single day column in the calendar
const DayColumn = ({ 
  date, 
  appointments = [],
  onBookingSelect
}: { 
  date: Date; 
  appointments: Appointment[];
  onBookingSelect: (appointment: Appointment) => void;
}) => {
  // Format appointments for this day
  const filteredAppointments = appointments.filter(appointment => {
    const appointmentDate = parseISO(appointment.start_time);
    return appointmentDate.getDate() === date.getDate() &&
           appointmentDate.getMonth() === date.getMonth() &&
           appointmentDate.getFullYear() === date.getFullYear();
  });

  return (
    <div className="min-w-[150px] flex-1">
      <div className="text-center p-2 border-b font-medium">
        <div className="text-sm">{format(date, 'EEE')}</div>
        <div>{format(date, 'MMM d')}</div>
      </div>
      <div className="h-[600px] overflow-y-auto relative">
        {timeSlots.map((slot, idx) => (
          <div key={idx} className="border-b border-gray-100 h-[50px] relative">
            <div className="absolute left-0 text-xs text-gray-400 px-1">
              {idx % 2 === 0 && slot.label}
            </div>
          </div>
        ))}
        
        {filteredAppointments.map((appointment) => {
          const startTime = parseISO(appointment.start_time);
          const endTime = parseISO(appointment.end_time);
          const durationMinutes = differenceInMinutes(endTime, startTime);
          const startHour = startTime.getHours();
          const startMinute = startTime.getMinutes();
          
          // Calculate position
          const minutesSince9AM = (startHour - 9) * 60 + startMinute;
          const topPosition = (minutesSince9AM / 30) * 50;
          const height = (durationMinutes / 30) * 50;
          
          // Determine style based on type or status
          const isManual = appointment.is_manual;
          const bgColor = isManual 
            ? 'bg-purple-100 border-purple-300 text-purple-800' 
            : appointment.status === 'confirmed' 
              ? 'bg-green-100 border-green-300 text-green-800'
              : 'bg-blue-100 border-blue-300 text-blue-800';
          
          return (
            <Card
              key={appointment.id}
              className={`absolute left-0 right-0 mx-1 p-1 rounded cursor-pointer overflow-hidden shadow-sm ${bgColor}`}
              style={{
                top: `${topPosition}px`,
                height: `${height}px`,
                minHeight: '25px'
              }}
              onClick={() => onBookingSelect(appointment)}
            >
              <div className="flex flex-col h-full overflow-hidden">
                <div className="flex justify-between items-start">
                  <div className="font-medium text-xs truncate">
                    {isManual && <Phone className="h-3 w-3 inline mr-1" />}
                    {appointment.customer_name}
                  </div>
                  {isManual && (
                    <Badge variant="outline" className="bg-purple-50 text-purple-700 text-[10px] px-1 py-0">
                      Manual
                    </Badge>
                  )}
                </div>
                <div className="text-[10px] truncate mt-0.5">
                  {format(startTime, 'h:mma')} - {format(endTime, 'h:mma')}
                </div>
                {height > 50 && (
                  <div className="text-[10px] truncate">
                    {appointment.services?.name || 'Service'}
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

const ArtistCalendar = () => {
  const [currentWeek, setCurrentWeek] = useState<Date>(startOfWeek(new Date(), { weekStartsOn: 0 }));
  const [selectedBooking, setSelectedBooking] = useState<Appointment | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isManualBookingOpen, setIsManualBookingOpen] = useState(false);
  
  const { appointments, isLoading, error, refetch } = useAppointments();
  
  const handleNextWeek = () => {
    setCurrentWeek(addWeeks(currentWeek, 1));
  };
  
  const handlePreviousWeek = () => {
    setCurrentWeek(subWeeks(currentWeek, 1));
  };
  
  const handleBookingSelect = (appointment: Appointment) => {
    setSelectedBooking(appointment);
    setIsDetailsOpen(true);
  };
  
  const handleManualBookingComplete = () => {
    setIsManualBookingOpen(false);
    refetch();
  };
  
  // Generate the 7 days of the week
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(currentWeek, i));
  
  if (isLoading) {
    return <div className="p-8 text-center">Loading calendar...</div>;
  }
  
  if (error) {
    return <div className="p-8 text-center text-red-500">Error loading appointments</div>;
  }
  
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="flex justify-between items-center p-4 border-b">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handlePreviousWeek}>
            Previous
          </Button>
          <span className="font-medium">
            {format(weekDays[0], 'MMM d')} - {format(weekDays[6], 'MMM d, yyyy')}
          </span>
          <Button variant="outline" size="sm" onClick={handleNextWeek}>
            Next
          </Button>
        </div>
        <Button 
          variant="outline" 
          className="flex items-center gap-1"
          onClick={() => setIsManualBookingOpen(true)}
        >
          <Plus className="h-4 w-4" />
          <span>Add Manual Booking</span>
        </Button>
      </div>
      
      <div className="overflow-x-auto">
        <div className="flex min-w-[1050px]">
          {weekDays.map((day, idx) => (
            <DayColumn 
              key={idx} 
              date={day} 
              appointments={appointments || []} 
              onBookingSelect={handleBookingSelect}
            />
          ))}
        </div>
      </div>
      
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
          </DialogHeader>
          
          {selectedBooking && (
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-gray-100 p-3 rounded-full">
                  <User className="h-6 w-6 text-gray-500" />
                </div>
                <div>
                  <h3 className="font-medium">{selectedBooking.customer_name}</h3>
                  <p className="text-sm text-gray-500">{selectedBooking.customer_phone || 'No phone provided'}</p>
                  <p className="text-sm text-gray-500">{selectedBooking.customer_email || 'No email provided'}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div className="text-sm">
                    {format(parseISO(selectedBooking.start_time), 'MMM d, yyyy')}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-gray-400" />
                  <div className="text-sm">
                    {format(parseISO(selectedBooking.start_time), 'h:mm a')} - {format(parseISO(selectedBooking.end_time), 'h:mm a')}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Film className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="font-medium text-sm">Service</div>
                  <div>{selectedBooking.services?.name || 'Service not specified'}</div>
                </div>
              </div>
              
              {selectedBooking.notes && (
                <div className="bg-gray-50 p-3 rounded">
                  <div className="font-medium text-sm mb-1">Notes</div>
                  <p className="text-sm">{selectedBooking.notes}</p>
                </div>
              )}
              
              {selectedBooking.is_manual && (
                <Badge className="bg-purple-100 text-purple-800 mt-2">
                  <Phone className="h-3 w-3 mr-1" /> Manual Booking
                </Badge>
              )}
              
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>Close</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      <ManualBookingDialog 
        open={isManualBookingOpen} 
        onOpenChange={setIsManualBookingOpen}
        onComplete={handleManualBookingComplete}
      />
    </div>
  );
};

export default ArtistCalendar;
