
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface BlockTimeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => Promise<void>;
  blockedTime?: any;
  isEditing?: boolean;
}

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
  "18:00", "18:30", "19:00", "19:30", "20:00"
];

const BlockTimeDialog: React.FC<BlockTimeDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  blockedTime,
  isEditing = false
}) => {
  const [date, setDate] = useState<Date | undefined>(
    blockedTime ? new Date(blockedTime.start_time) : new Date()
  );
  const [startTime, setStartTime] = useState(
    blockedTime ? format(new Date(blockedTime.start_time), "HH:mm") : "09:00"
  );
  const [endTime, setEndTime] = useState(
    blockedTime ? format(new Date(blockedTime.end_time), "HH:mm") : "17:00"
  );
  const [reason, setReason] = useState(blockedTime?.reason || "");
  
  // Reset form when blockedTime changes
  useEffect(() => {
    if (blockedTime) {
      setDate(new Date(blockedTime.start_time));
      setStartTime(format(new Date(blockedTime.start_time), "HH:mm"));
      setEndTime(format(new Date(blockedTime.end_time), "HH:mm"));
      setReason(blockedTime.reason || "");
    } else {
      setDate(new Date());
      setStartTime("09:00");
      setEndTime("17:00");
      setReason("");
    }
  }, [blockedTime, isOpen]);
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date) {
      toast.error("Please select a date");
      return;
    }
    
    try {
      // Create start and end datetime by combining date with time
      const [startHour, startMinute] = startTime.split(':').map(Number);
      const [endHour, endMinute] = endTime.split(':').map(Number);
      
      const startDateTime = new Date(date);
      startDateTime.setHours(startHour, startMinute, 0);
      
      const endDateTime = new Date(date);
      endDateTime.setHours(endHour, endMinute, 0);
      
      // Validate time range
      if (startDateTime >= endDateTime) {
        toast.error("End time must be after start time");
        return;
      }
      
      const data = {
        id: blockedTime?.id,
        start_time: startDateTime.toISOString(),
        end_time: endDateTime.toISOString(),
        reason
      };
      
      await onSave(data);
      onClose();
    } catch (error: any) {
      toast.error(`Error saving blocked time: ${error.message}`);
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
                <Select value={startTime} onValueChange={setStartTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={`start-${time}`} value={time}>{time}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="endTime">End Time</Label>
                <Select value={endTime} onValueChange={setEndTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={`end-${time}`} value={time}>{time}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Reason */}
            <div className="grid gap-2">
              <Label htmlFor="reason">Reason (Optional)</Label>
              <Textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="E.g., Personal day off, Training, Vacation"
                rows={3}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {isEditing ? "Update" : "Block Time"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BlockTimeDialog;
