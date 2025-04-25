
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { format, addHours, parseISO } from 'date-fns';
import { Clock, Trash2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BookingStateWrapper } from '@/components/booking/BookingStateWrapper';
import { useBookingErrorHandler } from '@/hooks/useBookingErrorHandler';

interface BlockTimeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => Promise<void>;
  onDelete?: (id: string) => Promise<void>;
  blockedTime?: any;
  isEditing?: boolean;
}

const BlockTimeDialog: React.FC<BlockTimeDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  blockedTime,
  isEditing = false
}) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [startTime, setStartTime] = useState<string>("09:00");
  const [endTime, setEndTime] = useState<string>("10:00");
  const [reason, setReason] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { handleBookingError } = useBookingErrorHandler();

  useEffect(() => {
    if (blockedTime) {
      const startDate = new Date(blockedTime.start_time);
      const endDate = new Date(blockedTime.end_time);
      
      setDate(startDate);
      setStartTime(format(startDate, 'HH:mm'));
      setEndTime(format(endDate, 'HH:mm'));
      setReason(blockedTime.reason || '');
    } else {
      // Reset form for new block
      setDate(new Date());
      setStartTime("09:00");
      setEndTime("10:00");
      setReason("");
    }
  }, [blockedTime, isOpen]);

  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const formattedHour = hour.toString().padStart(2, '0');
        const formattedMinute = minute.toString().padStart(2, '0');
        options.push(`${formattedHour}:${formattedMinute}`);
      }
    }
    return options;
  };

  const timeOptions = generateTimeOptions();

  const handleSubmit = async () => {
    if (!date) {
      setError(new Error("Please select a date"));
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const [startHour, startMinute] = startTime.split(':').map(Number);
      const [endHour, endMinute] = endTime.split(':').map(Number);
      
      const startDate = new Date(date);
      startDate.setHours(startHour, startMinute, 0, 0);
      
      const endDate = new Date(date);
      endDate.setHours(endHour, endMinute, 0, 0);
      
      if (endDate <= startDate) {
        throw new Error("End time must be after start time");
      }

      const data = {
        ...(blockedTime?.id ? { id: blockedTime.id } : {}),
        start_time: startDate.toISOString(),
        end_time: endDate.toISOString(),
        reason
      };

      await onSave(data);
      onClose();
    } catch (err) {
      handleBookingError(err);
      setError(err instanceof Error ? err : new Error("Failed to save blocked time"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!blockedTime?.id) return;
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      if (onDelete) {
        await onDelete(blockedTime.id);
        onClose();
      }
    } catch (err) {
      handleBookingError(err);
      setError(err instanceof Error ? err : new Error("Failed to delete blocked time"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => !isSubmitting && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Edit Blocked Time' : 'Block Time Off'}
          </DialogTitle>
        </DialogHeader>
        
        <BookingStateWrapper
          loading={isSubmitting}
          error={error}
          loadingComponent={<div className="p-4 text-center">Processing...</div>}
        >
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="date">Date</Label>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate as (date: Date | undefined) => void}
                disabled={(date) => {
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  return date < today;
                }}
                className="border rounded-md"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="start-time">Start Time</Label>
                <Select value={startTime} onValueChange={setStartTime}>
                  <SelectTrigger id="start-time" className="w-full">
                    <Clock className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Start Time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeOptions.map(time => (
                      <SelectItem key={`start-${time}`} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="end-time">End Time</Label>
                <Select value={endTime} onValueChange={setEndTime}>
                  <SelectTrigger id="end-time" className="w-full">
                    <Clock className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="End Time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeOptions.map(time => (
                      <SelectItem key={`end-${time}`} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="reason">Reason (Optional)</Label>
              <Textarea
                id="reason"
                placeholder="Why are you blocking this time?"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>
          </div>
        </BookingStateWrapper>
        
        <DialogFooter className="flex justify-between">
          <div>
            {isEditing && onDelete && (
              <Button 
                variant="destructive" 
                onClick={handleDelete}
                disabled={isSubmitting}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BlockTimeDialog;
