import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { Booking } from '@/types/booking';
import { supabase } from '@/integrations/supabase/client';

interface BookingRescheduleDialogProps {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
  onReschedule: (bookingId: string, newDate: Date, newTime: string) => Promise<void>;
}

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  '18:00', '18:30', '19:00', '19:30', '20:00'
];

export const BookingRescheduleDialog: React.FC<BookingRescheduleDialogProps> = ({
  booking,
  isOpen,
  onClose,
  onReschedule
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [isRescheduling, setIsRescheduling] = useState(false);

  const handleReschedule = async () => {
    if (!booking || !selectedDate || !selectedTime) {
      toast.error('Please select both date and time');
      return;
    }

    setIsRescheduling(true);
    try {
      await onReschedule(booking.id, selectedDate, selectedTime);
      toast.success('Booking rescheduled successfully');
      onClose();
    } catch (error) {
      toast.error('Failed to reschedule booking');
      console.error('Reschedule error:', error);
    } finally {
      setIsRescheduling(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Reschedule Booking</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {booking && (
            <div className="p-4 bg-muted rounded-lg">
              <p className="font-medium">{booking.client_name}</p>
              <p className="text-sm text-muted-foreground">{booking.service_name}</p>
              <p className="text-sm text-muted-foreground">
                Current: {booking.date_requested} at {booking.time_requested}
              </p>
            </div>
          )}

          <div>
            <label className="text-sm font-medium mb-2 block">Select New Date</label>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) => date < new Date()}
              className="rounded-md border"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Select New Time</label>
            <Select value={selectedTime} onValueChange={setSelectedTime}>
              <SelectTrigger>
                <SelectValue placeholder="Choose time slot" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handleReschedule} 
              disabled={!selectedDate || !selectedTime || isRescheduling}
              className="flex-1"
            >
              {isRescheduling ? 'Rescheduling...' : 'Reschedule'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};