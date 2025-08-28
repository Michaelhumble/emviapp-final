import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { toast } from 'sonner';
import { useSlotGeneration } from '@/hooks/useSlotGeneration';
import { supabase } from '@/integrations/supabase/client';
import type { Booking, Service, BookableSlot } from '@/lib/booking/types';
import { format, addDays } from 'date-fns';
import { Clock, Calendar as CalendarIcon } from 'lucide-react';

interface RescheduleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  booking: Booking;
  service: Service | null;
  onSuccess: () => void;
}

export function RescheduleDialog({ 
  open, 
  onOpenChange, 
  booking, 
  service, 
  onSuccess 
}: RescheduleDialogProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedSlot, setSelectedSlot] = useState<BookableSlot | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const { 
    bookableSlots: slots, 
    loading: slotsLoading,
    generateBookableSlots: generateSlots 
  } = useSlotGeneration();

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedSlot(null);
    
    if (date && booking.recipient_id && service?.id) {
      generateSlots({
        artistId: booking.recipient_id,
        serviceId: service.id,
        date: format(date, 'yyyy-MM-dd')
      });
    }
  };

  const handleSlotSelect = (slot: BookableSlot) => {
    setSelectedSlot(slot);
  };

  const handleReschedule = async () => {
    if (!selectedSlot || !booking.id) {
      toast.error('Please select a new time slot');
      return;
    }

    try {
      setSubmitting(true);

      const response = await supabase.functions.invoke('bookings-reschedule', {
        body: {
          bookingId: booking.id,
          newStartsAt: selectedSlot.starts_at,
          newEndsAt: selectedSlot.ends_at,
          managedBy: 'customer'
        }
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error('Error rescheduling booking:', error);
      toast.error('Failed to reschedule booking. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const availableDates = Array.from({ length: 30 }, (_, i) => addDays(new Date(), i + 1));
  const minDate = new Date();
  const maxDate = addDays(new Date(), 60);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Reschedule Booking
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Current booking info */}
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-medium mb-2">Current Booking</h3>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>{service?.title || service?.name || 'Service'}</p>
              <p className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                {booking.date_requested ? format(new Date(booking.date_requested), 'EEEE, MMMM d, yyyy') : 'Date TBD'}
                {booking.time_requested && ` at ${booking.time_requested}`}
              </p>
            </div>
          </div>

          {/* Date selection */}
          <div>
            <h3 className="font-medium mb-3">Select New Date</h3>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              disabled={(date) => date < minDate || date > maxDate}
              className="rounded-md border w-fit"
            />
          </div>

          {/* Time slots */}
          {selectedDate && (
            <div>
              <h3 className="font-medium mb-3">Available Times</h3>
              
              {slotsLoading ? (
                <div className="text-center py-8">
                  <div className="animate-pulse">Loading available times...</div>
                </div>
              ) : slots.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No available times for this date
                </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {slots.map((slot, index) => (
                    <Button
                      key={index}
                      variant={selectedSlot === slot ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleSlotSelect(slot)}
                      className="text-sm"
                    >
                      {format(new Date(slot.starts_at), 'h:mm a')}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Confirmation */}
          {selectedSlot && (
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <h3 className="font-medium mb-2">New Booking Time</h3>
              <p className="text-sm">
                {format(new Date(selectedSlot.starts_at), 'EEEE, MMMM d, yyyy \'at\' h:mm a')}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleReschedule}
              disabled={!selectedSlot || submitting}
              className="flex-1"
            >
              {submitting ? 'Rescheduling...' : 'Confirm Reschedule'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}