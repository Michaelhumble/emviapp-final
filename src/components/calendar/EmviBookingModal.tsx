
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";
import { Booking } from "@/types/booking";
import { cn } from "@/lib/utils";
import { CalendarRole } from "./EmviCalendar";

// Mock services data - in a real app, this would come from the database
const MOCK_SERVICES = [
  { id: "1", name: "Regular Makeup", duration: 60, price: 85 },
  { id: "2", name: "Bridal Makeup", duration: 90, price: 150 },
  { id: "3", name: "Full Glam Package", duration: 120, price: 200 },
  { id: "4", name: "Natural Look", duration: 45, price: 70 },
];

// Time slots from 9 AM to 7 PM
const TIME_SLOTS = Array.from({ length: 11 }, (_, i) => {
  const hour = i + 9;
  return {
    value: `${hour % 12 || 12}:00 ${hour >= 12 ? 'PM' : 'AM'}`,
    label: `${hour % 12 || 12}:00 ${hour >= 12 ? 'PM' : 'AM'}`,
  };
});

interface EmviBookingModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (booking: any) => void;
  booking?: Partial<Booking> | null;
  role: CalendarRole;
}

const EmviBookingModal: React.FC<EmviBookingModalProps> = ({
  open,
  onClose,
  onSave,
  booking,
  role,
}) => {
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [notes, setNotes] = useState("");
  const [price, setPrice] = useState<number | "">("");

  const isEditMode = Boolean(booking?.id);

  useEffect(() => {
    if (booking) {
      setClientName(booking.client_name || "");
      setClientEmail("");  // These fields don't exist in the current Booking type
      setClientPhone("");  // but would be good to add in a real implementation
      setSelectedDate(booking.date_requested ? new Date(booking.date_requested) : undefined);
      setSelectedTime(booking.time_requested || "");
      setSelectedService(booking.service_name || "");
      setNotes(booking.note || "");
      setPrice(booking.price || "");
    } else {
      resetForm();
    }
  }, [booking]);

  const resetForm = () => {
    setClientName("");
    setClientEmail("");
    setClientPhone("");
    setSelectedDate(new Date());
    setSelectedTime("");
    setSelectedService("");
    setNotes("");
    setPrice("");
  };

  const handleSave = () => {
    const newBooking = {
      client_name: clientName,
      email: clientEmail,
      phone: clientPhone,
      date_requested: selectedDate ? format(selectedDate, "yyyy-MM-dd") : undefined,
      time_requested: selectedTime,
      service_name: selectedService,
      note: notes,
      price: price === "" ? undefined : Number(price),
      status: "pending",
    };

    onSave(newBooking);
    resetForm();
  };

  const handleServiceSelect = (value: string) => {
    setSelectedService(value);
    const service = MOCK_SERVICES.find(s => s.name === value);
    if (service) {
      setPrice(service.price);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-[550px] bg-white p-0 overflow-hidden">
        <DialogHeader className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 border-b">
          <DialogTitle className="text-xl font-serif text-gray-800">
            {isEditMode ? "Edit Appointment" : "New Appointment"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="client-name">Client Name</Label>
              <Input
                id="client-name"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="border-gray-200"
                placeholder="Enter client name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="client-email">Client Email</Label>
              <Input
                id="client-email"
                type="email"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                className="border-gray-200"
                placeholder="Email address"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="client-phone">Client Phone</Label>
              <Input
                id="client-phone"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                className="border-gray-200"
                placeholder="Phone number"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="service">Service</Label>
              <Select value={selectedService} onValueChange={handleServiceSelect}>
                <SelectTrigger id="service" className="border-gray-200">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  {MOCK_SERVICES.map((service) => (
                    <SelectItem key={service.id} value={service.name}>
                      {service.name} (${service.price})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal border-gray-200",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : "Select a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label>Time</Label>
              <Select value={selectedTime} onValueChange={setSelectedTime}>
                <SelectTrigger className="border-gray-200">
                  <SelectValue placeholder="Select time">
                    {selectedTime || (
                      <span className="flex items-center text-muted-foreground">
                        <Clock className="mr-2 h-4 w-4" />
                        Select time
                      </span>
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {TIME_SLOTS.map((slot) => (
                    <SelectItem key={slot.value} value={slot.value}>
                      {slot.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))}
                className="border-gray-200"
                placeholder="0"
              />
            </div>
            
            {role === "artist" && (
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select defaultValue="pending">
                  <SelectTrigger id="status" className="border-gray-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="border-gray-200 min-h-24"
              placeholder="Add any notes or special requests"
            />
          </div>
        </div>
        
        <DialogFooter className="p-6 border-t bg-gray-50">
          <Button variant="outline" onClick={onClose} className="border-gray-200">
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            className="bg-gradient-to-r from-purple-600 to-pink-500 text-white"
            disabled={!clientName || !selectedDate || !selectedTime || !selectedService}
          >
            {isEditMode ? "Update Appointment" : "Create Appointment"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EmviBookingModal;
