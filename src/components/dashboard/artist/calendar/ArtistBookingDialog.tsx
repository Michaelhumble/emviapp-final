
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { TimePicker } from "@/components/ui/time-picker";
import { useAuth } from "@/context/auth";
import { Appointment } from "@/hooks/calendar/useAppointments";

interface Service {
  id: string;
  title: string;
  price: number;
  duration_minutes: number;
}

interface BookingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (bookingData: any) => Promise<void>;
  onDelete?: (id: string) => Promise<void>;
  booking?: any;
  isEditing?: boolean;
}

const ArtistBookingDialog: React.FC<BookingDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  booking,
  isEditing = false
}) => {
  const { user } = useAuth();
  const [date, setDate] = useState<Date | undefined>(
    booking?.start_time ? new Date(booking.start_time) : new Date()
  );
  const [startTime, setStartTime] = useState<Date | undefined>(
    booking?.start_time ? new Date(booking.start_time) : undefined
  );
  const [endTime, setEndTime] = useState<Date | undefined>(
    booking?.end_time ? new Date(booking.end_time) : undefined
  );
  const [customerName, setCustomerName] = useState(booking?.customer_name || "");
  const [customerEmail, setCustomerEmail] = useState(booking?.customer_email || "");
  const [customerPhone, setCustomerPhone] = useState(booking?.customer_phone || "");
  const [serviceId, setServiceId] = useState(booking?.service_id || "");
  const [notes, setNotes] = useState(booking?.notes || "");
  const [status, setStatus] = useState(booking?.status || "confirmed");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Load artist's services
  const { data: services = [], isLoading: isLoadingServices } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_visible', true)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching services:', error);
        throw error;
      }
      return data;
    },
    enabled: !!user?.id
  });
  
  // Reset form when booking changes
  useEffect(() => {
    if (booking) {
      setDate(new Date(booking.start_time));
      setStartTime(new Date(booking.start_time));
      setEndTime(new Date(booking.end_time));
      setCustomerName(booking.customer_name || "");
      setCustomerEmail(booking.customer_email || "");
      setCustomerPhone(booking.customer_phone || "");
      setServiceId(booking.service_id || "");
      setNotes(booking.notes || "");
      setStatus(booking.status || "confirmed");
    } else {
      setDate(new Date());
      setStartTime(undefined);
      setEndTime(undefined);
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
    
    if (!date || !startTime || !endTime) {
      toast.error("Please select date and times");
      return;
    }
    
    if (!customerName.trim()) {
      toast.error("Please enter a customer name");
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
      
      // Check for booking conflicts
      const { data: existingBookings, error: conflictError } = await supabase
        .from('appointments')
        .select('id, start_time, end_time')
        .eq('artist_id', user?.id)
        .neq('id', booking?.id || 'none') // Exclude current booking if editing
        .or(`start_time.lte.${endDateTime.toISOString()},end_time.gte.${startDateTime.toISOString()}`);
      
      if (conflictError) {
        console.error('Error checking booking conflicts:', conflictError);
      } else if (existingBookings && existingBookings.length > 0) {
        toast.error("This time slot conflicts with an existing booking");
        setIsSubmitting(false);
        return;
      }
      
      const bookingData: Partial<Appointment> = {
        id: booking?.id,
        customer_name: customerName.trim(),
        customer_email: customerEmail.trim() || null,
        customer_phone: customerPhone.trim() || null,
        service_id: serviceId || null,
        start_time: startDateTime.toISOString(),
        end_time: endDateTime.toISOString(),
        notes: notes.trim() || null,
        status,
        is_manual: true
      };
      
      await onSave(bookingData);
      onClose();
    } catch (error: any) {
      console.error('Error saving booking:', error);
      toast.error(`Error saving booking: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handle deletion
  const handleDelete = async () => {
    if (booking?.id && onDelete) {
      try {
        setIsSubmitting(true);
        await onDelete(booking.id);
        onClose();
      } catch (error: any) {
        console.error('Error deleting booking:', error);
        toast.error(`Error deleting booking: ${error.message}`);
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  
  // Update end time when a service is selected
  const handleServiceChange = (value: string) => {
    setServiceId(value);
    
    // If a service is selected, automatically set end time based on duration
    if (value && startTime) {
      const selectedService = services.find((service: Service) => service.id === value);
      if (selectedService?.duration_minutes) {
        const newEndTime = new Date(startTime);
        newEndTime.setMinutes(newEndTime.getMinutes() + selectedService.duration_minutes);
        setEndTime(newEndTime);
      }
    }
  };

  // Update end time when start time changes
  const handleStartTimeChange = (newStartTime: Date | undefined) => {
    setStartTime(newStartTime);
    
    if (newStartTime && serviceId) {
      const selectedService = services.find((service: Service) => service.id === serviceId);
      if (selectedService?.duration_minutes) {
        const newEndTime = new Date(newStartTime);
        newEndTime.setMinutes(newEndTime.getMinutes() + selectedService.duration_minutes);
        setEndTime(newEndTime);
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
                    id="date"
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
                  setDate={handleStartTimeChange}
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
            
            {/* Customer Info */}
            <div className="grid gap-2">
              <Label htmlFor="customerName">Customer Name <span className="text-red-500">*</span></Label>
              <Input
                id="customerName"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
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
                <SelectTrigger id="service">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">No specific service</SelectItem>
                  {services.map((service: Service) => (
                    <SelectItem key={service.id} value={service.id}>
                      {service.title} - ${service.price} ({service.duration_minutes} min)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Status */}
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
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
                placeholder="Add any special requests or notes about this booking"
              />
            </div>
          </div>
          
          <DialogFooter className="flex flex-col-reverse sm:flex-row justify-between gap-2">
            {isEditing && onDelete && (
              <Button type="button" variant="destructive" onClick={handleDelete} disabled={isSubmitting} className="w-full sm:w-auto mt-2 sm:mt-0">
                {isSubmitting ? "Deleting..." : "Delete Booking"}
              </Button>
            )}
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose} 
                disabled={isSubmitting}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full sm:w-auto"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </span>
                ) : isEditing ? "Update Booking" : "Add Booking"}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ArtistBookingDialog;
