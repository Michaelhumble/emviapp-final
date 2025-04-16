
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
import { CalendarIcon, Clock, Phone } from "lucide-react";
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
    duration_minutes: "",
    is_manual: true
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

  const durationOptions = [
    { value: "30", label: "30 minutes" },
    { value: "45", label: "45 minutes" },
    { value: "60", label: "1 hour" },
    { value: "75", label: "1 hour 15 minutes" },
    { value: "90", label: "1 hour 30 minutes" },
    { value: "120", label: "2 hours" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !formData.time || !formData.customer_name || !formData.service_id) return;

    setIsSubmitting(true);
    try {
      const [hours, minutes] = formData.time.split(":");
      const startTime = new Date(date);
      startTime.setHours(parseInt(hours), parseInt(minutes));

      // Calculate end time based on duration
      const duration = parseInt(formData.duration_minutes || "60");
      const endTime = new Date(startTime);
      endTime.setMinutes(startTime.getMinutes() + duration);

      await onSave({
        ...formData,
        start_time: startTime.toISOString(),
        end_time: endTime.toISOString(),
        status: "confirmed",
        is_manual: true
      });

      setFormData({
        customer_name: "",
        service_id: "",
        time: "",
        notes: "",
        duration_minutes: "",
        is_manual: true
      });
      setDate(undefined);
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
          <DialogTitle className="text-xl flex items-center">
            <Phone className="h-5 w-5 mr-2 text-purple-600" />
            Add Manual Booking
          </DialogTitle>
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
              className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>

          <div className="space-y-2">
            <Label>Service <span className="text-red-500">*</span></Label>
            <Select
              value={formData.service_id}
              onValueChange={(value) => {
                const selectedService = services.find(s => s.id === value);
                setFormData(prev => ({ 
                  ...prev, 
                  service_id: value,
                  duration_minutes: selectedService ? selectedService.duration_minutes.toString() : prev.duration_minutes
                }));
              }}
            >
              <SelectTrigger className="border-gray-300 focus:border-purple-500 focus:ring-purple-500">
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                {services.map((service) => (
                  <SelectItem key={service.id} value={service.id}>
                    {service.title} ({service.duration_minutes} min)
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
                    "w-full justify-start text-left font-normal border-gray-300 focus:border-purple-500 focus:ring-purple-500",
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
              <SelectTrigger className="border-gray-300 focus:border-purple-500 focus:ring-purple-500">
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
            <Label>Duration <span className="text-red-500">*</span></Label>
            <Select
              value={formData.duration_minutes}
              onValueChange={(value) => setFormData(prev => ({ ...prev, duration_minutes: value }))}
            >
              <SelectTrigger className="border-gray-300 focus:border-purple-500 focus:ring-purple-500">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                {durationOptions.map(({ value, label }) => (
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
              className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={!date || !formData.time || !formData.customer_name || !formData.service_id || !formData.duration_minutes || isSubmitting}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isSubmitting ? "Adding..." : "Add Booking"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
