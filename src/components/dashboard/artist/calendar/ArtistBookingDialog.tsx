
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Service {
  id: string;
  name: string;
  price: number;
  duration: number;
}

interface BookingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (bookingData: any) => Promise<void>;
  onDelete?: (id: string) => Promise<void>; // Add onDelete as optional property
  booking?: any;
  isEditing?: boolean;
}

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
  "18:00", "18:30", "19:00", "19:30", "20:00"
];

const ArtistBookingDialog: React.FC<BookingDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  booking,
  isEditing = false
}) => {
  const [date, setDate] = useState<Date | undefined>(
    booking ? new Date(booking.start_time) : new Date()
  );
  const [startTime, setStartTime] = useState(
    booking ? format(new Date(booking.start_time), "HH:mm") : "09:00"
  );
  const [endTime, setEndTime] = useState(
    booking ? format(new Date(booking.end_time), "HH:mm") : "09:30"
  );
  const [customerName, setCustomerName] = useState(booking?.customer_name || "");
  const [customerEmail, setCustomerEmail] = useState(booking?.customer_email || "");
  const [customerPhone, setCustomerPhone] = useState(booking?.customer_phone || "");
  const [serviceId, setServiceId] = useState(booking?.service_id || "");
  const [notes, setNotes] = useState(booking?.notes || "");
  const [status, setStatus] = useState(booking?.status || "confirmed");
  
  // Load artist's services
  const { data: services = [] } = useQuery({
    queryKey: ['artist-services'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('artist_services')
        .select('*');
      
      if (error) throw error;
      return data;
    }
  });
  
  // Reset form when booking changes
  useEffect(() => {
    if (booking) {
      setDate(new Date(booking.start_time));
      setStartTime(format(new Date(booking.start_time), "HH:mm"));
      setEndTime(format(new Date(booking.end_time), "HH:mm"));
      setCustomerName(booking.customer_name || "");
      setCustomerEmail(booking.customer_email || "");
      setCustomerPhone(booking.customer_phone || "");
      setServiceId(booking.service_id || "");
      setNotes(booking.notes || "");
      setStatus(booking.status || "confirmed");
    } else {
      setDate(new Date());
      setStartTime("09:00");
      setEndTime("09:30");
      setCustomerName("");
      setCustomerEmail("");
      setCustomerPhone("");
      setServiceId("");
      setNotes("");
      setStatus("confirmed");
    }
  }, [booking, isOpen]);
  
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
      
      const bookingData = {
        id: booking?.id,
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
        service_id: serviceId || null,
        start_time: startDateTime.toISOString(),
        end_time: endDateTime.toISOString(),
        notes,
        status
      };
      
      await onSave(bookingData);
      onClose();
    } catch (error: any) {
      toast.error(`Error saving booking: ${error.message}`);
    }
  };
  
  // Handle deletion
  const handleDelete = async () => {
    if (booking?.id && onDelete) {
      try {
        await onDelete(booking.id);
        onClose();
      } catch (error: any) {
        toast.error(`Error deleting booking: ${error.message}`);
      }
    }
  };
  
  // Update end time when a service is selected
  const handleServiceChange = (value: string) => {
    setServiceId(value);
    
    // If a service is selected, automatically set end time based on duration
    if (value) {
      const selectedService = services.find((service: Service) => service.id === value);
      if (selectedService?.duration) {
        const [startHour, startMinute] = startTime.split(':').map(Number);
        const startDateTime = new Date();
        startDateTime.setHours(startHour, startMinute, 0);
        
        const endDateTime = new Date(startDateTime);
        endDateTime.setMinutes(endDateTime.getMinutes() + selectedService.duration);
        
        setEndTime(format(endDateTime, "HH:mm"));
      }
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Booking" : "Add New Booking"}</DialogTitle>
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
            
            {/* Customer Info */}
            <div className="grid gap-2">
              <Label htmlFor="customerName">Customer Name</Label>
              <Input
                id="customerName"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="customerEmail">Email (Optional)</Label>
                <Input
                  id="customerEmail"
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="customerPhone">Phone (Optional)</Label>
                <Input
                  id="customerPhone"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                />
              </div>
            </div>
            
            {/* Service Selection */}
            <div className="grid gap-2">
              <Label htmlFor="service">Service</Label>
              <Select value={serviceId} onValueChange={handleServiceChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">No specific service</SelectItem>
                  {services.map((service: Service) => (
                    <SelectItem key={service.id} value={service.id}>
                      {service.name} - ${service.price} ({service.duration} min)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Status */}
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Notes */}
            <div className="grid gap-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          
          <DialogFooter className="flex justify-between">
            {isEditing && onDelete && (
              <Button type="button" variant="destructive" onClick={handleDelete}>
                Delete Booking
              </Button>
            )}
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                {isEditing ? "Update Booking" : "Add Booking"}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ArtistBookingDialog;
