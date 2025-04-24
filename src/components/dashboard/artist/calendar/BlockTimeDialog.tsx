
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TimePicker } from "@/components/ui/time-picker";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface BlockTimeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (blockedTime: any) => Promise<void>;
  onDelete?: (id: string) => Promise<void>;
  blockedTime: any | null;
  isEditing: boolean;
}

const BlockTimeDialog = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  blockedTime,
  isEditing
}: BlockTimeDialogProps) => {
  const [startDate, setStartDate] = useState<Date | undefined>(
    blockedTime?.start_time ? new Date(blockedTime.start_time) : new Date()
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    blockedTime?.end_time ? new Date(blockedTime.end_time) : new Date(new Date().setHours(new Date().getHours() + 1))
  );
  const [reason, setReason] = useState(blockedTime?.reason || '');
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleSave = async () => {
    if (!startDate || !endDate) {
      toast.error('Please select start and end times');
      return;
    }
    
    setSaving(true);
    
    try {
      await onSave({
        id: blockedTime?.id,
        start_time: startDate.toISOString(),
        end_time: endDate.toISOString(),
        reason
      });
      
      toast.success(isEditing ? 'Blocked time updated' : 'Time blocked successfully');
      onClose();
    } catch (error) {
      console.error('Error saving blocked time:', error);
      toast.error('Failed to save blocked time');
    } finally {
      setSaving(false);
    }
  };
  
  const handleDelete = async () => {
    if (!blockedTime?.id) return;
    
    setDeleting(true);
    
    try {
      await onDelete?.(blockedTime.id);
      toast.success('Blocked time removed');
      onClose();
    } catch (error) {
      console.error('Error deleting blocked time:', error);
      toast.error('Failed to remove blocked time');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Blocked Time' : 'Block Time Slot'}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label>Start Date & Time</Label>
            <div className="grid grid-cols-2 gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "justify-start text-left",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              
              <TimePicker
                date={startDate}
                setDate={setStartDate}
                granularity="30minutes"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>End Date & Time</Label>
            <div className="grid grid-cols-2 gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "justify-start text-left",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              
              <TimePicker
                date={endDate}
                setDate={setEndDate}
                granularity="30minutes"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Reason (optional)</Label>
            <Textarea
              placeholder="Enter reason for blocking this time slot"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
          
          <div className="flex justify-between pt-4">
            <div>
              {isEditing && onDelete && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={saving || deleting}
                >
                  {deleting ? "Deleting..." : "Delete"}
                </Button>
              )}
            </div>
            
            <div className="flex space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={saving || deleting}
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleSave}
                disabled={!startDate || !endDate || saving || deleting}
              >
                {saving ? "Saving..." : isEditing ? "Update" : "Block Time"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BlockTimeDialog;
