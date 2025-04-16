
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";

interface ManualBookingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (booking: any) => Promise<void>;
  services: Array<{ id: string; title: string; duration_minutes: number }>;
}

export const ManualBookingDialog = ({ isOpen, onClose, onSave, services }: ManualBookingDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
    customer_name: "",
    service_id: "",
    time: "",
    notes: "",
  });

  const timeSlots = Array.from({ length: 32 }, (_, i) => {
    const hour = Math.floor(i / 2) + 8; // Start from 8 AM
    const minutes = (i % 2) * 30;
    const timeString = `${hour.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
    return {
      value: timeString,
      label: format(new Date().setHours(hour, minutes), "h:mm a")
    };
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !formData.time || !formData.customer_name || !formData.service_id) return;

    setIsSubmitting(true);
    try {
      const [hours, minutes] = formData.time.split(":");
      const startTime = new Date(date);
      startTime.setHours(parseInt(hours), parseInt(minutes));

      const selectedService = services.find(s => s.id === formData.service_id);
      const endTime = new Date(startTime);
      endTime.setMinutes(startTime.getMinutes() + (selectedService?.duration_minutes || 60));

      await onSave({
        ...formData,
        start_time: startTime.toISOString(),
        end_time: endTime.toISOString(),
        is_manual: true,
        status: "confirmed"
      });

      setFormData({
        customer_name: "",
        service_id: "",
        time: "",
        notes: "",
      });
      setDate(undefined);
      onClose();
    } catch (error) {
      console.error("Error saving manual booking:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">Add Manual Booking</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="customer_name">Client Name <span className="text-red-500">*</span></Label>
            <Input
              id="customer_name"
              value={formData.customer_name}
              onChange={(e) => setFormData(prev => ({ ...prev, customer_name: e.target.value }))}
              placeholder="Enter client name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Service <span className="text-red-500">*</span></Label>
            <Select
              value={formData.service_id}
              onValueChange={(value) => setFormData(prev => ({ ...prev, service_id: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                {services.map((service) => (
                  <SelectItem key={service.id} value={service.id}>
                    {service.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Date <span className="text-red-500">*</span></Label>
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
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label>Time <span className="text-red-500">*</span></Label>
            <Select
              value={formData.time}
              onValueChange={(value) => setFormData(prev => ({ ...prev, time: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select time">
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    {formData.time ? 
                      format(new Date(`2000-01-01T${formData.time}`), "h:mm a") 
                      : "Select time"
                    }
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map(({ value, label }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Add phone number or special instructions..."
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={!date || !formData.time || !formData.customer_name || !formData.service_id || isSubmitting}
            >
              {isSubmitting ? "Adding..." : "Add Booking"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
