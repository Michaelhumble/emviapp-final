
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { TimePicker } from "@/components/ui/time-picker";
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  existingBooking?: any;
}

const mockServices = [
  { id: "1", name: "Makeup Session", price: 120 },
  { id: "2", name: "Hair Styling", price: 80 },
  { id: "3", name: "Full Glam Package", price: 200 },
  { id: "4", name: "Bridal Makeup", price: 250 },
];

const BookingModal: React.FC<BookingModalProps> = ({ open, onClose, existingBooking }) => {
  const [clientName, setClientName] = useState(existingBooking?.clientName || "");
  const [serviceId, setServiceId] = useState(existingBooking?.serviceId || "");
  const [date, setDate] = useState<Date | undefined>(existingBooking?.date ? new Date(existingBooking.date) : new Date());
  const [time, setTime] = useState<Date | undefined>(existingBooking?.time ? new Date(existingBooking.time) : new Date());
  const [price, setPrice] = useState(existingBooking?.price?.toString() || "");
  const [notes, setNotes] = useState(existingBooking?.notes || "");
  const [paymentStatus, setPaymentStatus] = useState(existingBooking?.paymentStatus || "unpaid");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const isEdit = !!existingBooking;
  const selectedService = mockServices.find(service => service.id === serviceId);

  // When service selection changes, update the price field
  const handleServiceChange = (value: string) => {
    setServiceId(value);
    const service = mockServices.find(s => s.id === value);
    if (service) {
      setPrice(service.price.toString());
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !serviceId || !date || !time) {
      toast.error("Please fill all required fields");
      return;
    }

    setIsSubmitting(true);

    // Mock API call
    setTimeout(() => {
      const newBooking = {
        id: existingBooking?.id || uuidv4(),
        clientName,
        serviceId,
        serviceName: selectedService?.name || "",
        date: date?.toISOString(),
        time: time?.toISOString(),
        price: parseFloat(price),
        notes,
        paymentStatus,
        status: "confirmed"
      };

      // In a real app, this would be a database call
      console.log("Saving booking:", newBooking);
      
      toast.success(isEdit ? "Booking updated successfully" : "Booking added successfully");
      setIsSubmitting(false);
      onClose();
      
      // Reset form if needed
      if (!isEdit) {
        setClientName("");
        setServiceId("");
        setDate(new Date());
        setTime(new Date());
        setPrice("");
        setNotes("");
        setPaymentStatus("unpaid");
      }
    }, 800);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg bg-white/90 backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle className="text-xl font-serif">
            {isEdit ? "Edit Appointment" : "New Appointment"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label htmlFor="client-name">Client Name</Label>
            <Input
              id="client-name"
              placeholder="Enter client name"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="mt-1"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="service-type">Service Type</Label>
            <Select value={serviceId} onValueChange={handleServiceChange}>
              <SelectTrigger id="service-type" className="mt-1">
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                {mockServices.map((service) => (
                  <SelectItem key={service.id} value={service.id}>
                    {service.name} - ${service.price}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Appointment Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full mt-1 justify-start text-left",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
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
            
            <div>
              <Label>Appointment Time</Label>
              <div className="mt-1">
                <TimePicker
                  date={time}
                  setDate={setTime}
                  className="w-full"
                  granularity="30minutes"
                />
              </div>
            </div>
          </div>
          
          <div>
            <Label htmlFor="price">Price ($)</Label>
            <Input
              id="price"
              type="number"
              placeholder="0.00"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="payment-status">Payment Status</Label>
            <Select value={paymentStatus} onValueChange={setPaymentStatus}>
              <SelectTrigger id="payment-status" className="mt-1">
                <SelectValue placeholder="Select payment status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="unpaid">Unpaid</SelectItem>
                <SelectItem value="partial">Partially Paid</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Add any special requirements or notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-1"
              rows={3}
            />
          </div>
          
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-gradient-to-r from-purple-600 to-pink-500 text-white" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : isEdit ? "Update Booking" : "Create Booking"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
