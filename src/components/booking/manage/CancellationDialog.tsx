import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import type { Booking, Service, CancellationReason } from '@/lib/booking/types';
import { format } from 'date-fns';
import { AlertCircle, Calendar as CalendarIcon } from 'lucide-react';

interface CancellationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  booking: Booking;
  service: Service | null;
  onSuccess: () => void;
}

const cancellationReasons: { value: CancellationReason; label: string }[] = [
  { value: 'schedule_conflict', label: 'Schedule conflict' },
  { value: 'no_longer_needed', label: 'No longer needed' },
  { value: 'found_alternative', label: 'Found alternative provider' },
  { value: 'personal_emergency', label: 'Personal emergency' },
  { value: 'other', label: 'Other reason' },
];

export function CancellationDialog({ 
  open, 
  onOpenChange, 
  booking, 
  service, 
  onSuccess 
}: CancellationDialogProps) {
  const [reason, setReason] = useState<CancellationReason>('schedule_conflict');
  const [reasonText, setReasonText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleCancel = async () => {
    if (!booking.id) {
      toast.error('Invalid booking ID');
      return;
    }

    if (reason === 'other' && !reasonText.trim()) {
      toast.error('Please provide a reason for cancellation');
      return;
    }

    try {
      setSubmitting(true);

      const response = await supabase.functions.invoke('bookings-cancel', {
        body: {
          bookingId: booking.id,
          reason,
          reasonText: reasonText.trim() || undefined,
          managedBy: 'customer'
        }
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error('Error cancelling booking:', error);
      toast.error('Failed to cancel booking. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-destructive" />
            Cancel Booking
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Booking info */}
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-medium mb-2">Booking Details</h3>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>{service?.title || service?.name || 'Service'}</p>
              <p className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                {booking.date_requested ? format(new Date(booking.date_requested), 'EEEE, MMMM d, yyyy') : 'Date TBD'}
                {booking.time_requested && ` at ${booking.time_requested}`}
              </p>
            </div>
          </div>

          {/* Warning */}
          <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
            <div className="flex gap-2">
              <AlertCircle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-destructive mb-1">Cancellation Policy</p>
                <p className="text-muted-foreground">
                  This action cannot be undone. You will receive a cancellation confirmation email.
                </p>
              </div>
            </div>
          </div>

          {/* Reason selection */}
          <div>
            <Label className="text-base font-medium mb-3 block">
              Why are you cancelling?
            </Label>
            <RadioGroup value={reason} onValueChange={(value) => setReason(value as CancellationReason)}>
              {cancellationReasons.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="text-sm cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Additional reason text */}
          {reason === 'other' && (
            <div>
              <Label htmlFor="reason-text" className="text-sm font-medium mb-2 block">
                Please specify
              </Label>
              <Textarea
                id="reason-text"
                placeholder="Please provide details about your cancellation reason..."
                value={reasonText}
                onChange={(e) => setReasonText(e.target.value)}
                className="min-h-[80px]"
              />
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Keep Booking
            </Button>
            <Button
              variant="destructive"
              onClick={handleCancel}
              disabled={submitting}
              className="flex-1"
            >
              {submitting ? 'Cancelling...' : 'Cancel Booking'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}