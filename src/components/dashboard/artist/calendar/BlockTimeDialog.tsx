
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { BlockedTime } from "@/hooks/calendar/useBlockedTimes";
import { TimePicker } from "@/components/ui/time-picker";

interface BlockTimeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (blockedTimeData: Partial<BlockedTime>) => Promise<void>;
  onDelete?: (id: string) => Promise<void>;
  blockedTime?: BlockedTime | null;
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
  const [date, setDate] = useState<Date | undefined>(
    blockedTime ? new Date(blockedTime.start_time) : new Date()
  );
  const [startTime, setStartTime] = useState<Date | undefined>(
    blockedTime ? new Date(blockedTime.start_time) : undefined
  );
  const [endTime, setEndTime] = useState<Date | undefined>(
    blockedTime ? new Date(blockedTime.end_time) : undefined
  );
  const [reason, setReason] = useState(blockedTime?.reason || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Reset form when blockedTime changes
  useEffect(() => {
    if (blockedTime) {
      setDate(new Date(blockedTime.start_time));
      setStartTime(new Date(blockedTime.start_time));
      setEndTime(new Date(blockedTime.end_time));
      setReason(blockedTime.reason || "");
    } else {
      setDate(new Date());
      setStartTime(undefined);
      setEndTime(undefined);
      setReason("");
    }
  }, [blockedTime, isOpen]);
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !startTime || !endTime) {
      toast.error("Please select date and times");
      return;
    }
    
    // Validate time range
    if (startTime >= endTime) {
      toast.error("End time must be after start time");
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Create full datetime by combining date with times
      const startDateTime = new Date(date);
      startDateTime.setHours(startTime.getHours(), startTime.getMinutes(), 0);
      
      const endDateTime = new Date(date);
      endDateTime.setHours(endTime.getHours(), endTime.getMinutes(), 0);
      
      const blockedTimeData: Partial<BlockedTime> = {
        id: blockedTime?.id,
        start_time: startDateTime.toISOString(),
        end_time: endDateTime.toISOString(),
        reason: reason.trim() || null
      };
      
      await onSave(blockedTimeData);
      onClose();
    } catch (error: any) {
      toast.error(`Error saving time block: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handle deletion
  const handleDelete = async () => {
    if (blockedTime?.id && onDelete) {
      try {
        setIsSubmitting(true);
        await onDelete(blockedTime.id);
        onClose();
      } catch (error: any) {
        toast.error(`Error deleting time block: ${error.message}`);
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Blocked Time" : "Block Time Slot"}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* Date Picker */}
            <div className="grid gap-2">
              <Label htmlFor="date">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            {/* Time Selection */}
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="startTime">Start Time</Label>
                <TimePicker 
                  date={startTime}
                  setDate={setStartTime}
                  granularity="30minutes" 
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="endTime">End Time</Label>
                <TimePicker 
                  date={endTime}
                  setDate={setEndTime}
                  granularity="30minutes" 
                />
              </div>
            </div>
            
            {/* Reason */}
            <div className="grid gap-2">
              <Label htmlFor="reason">Reason (Optional)</Label>
              <Textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={3}
                placeholder="e.g., Personal appointment, Out of office, etc."
              />
            </div>
          </div>
          
          <DialogFooter className="flex justify-between">
            {isEditing && onDelete && (
              <Button type="button" variant="destructive" onClick={handleDelete} disabled={isSubmitting}>
                {isSubmitting ? "Deleting..." : "Delete Block"}
              </Button>
            )}
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </span>
                ) : isEditing ? "Update Block" : "Block Time"}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BlockTimeDialog;
