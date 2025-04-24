
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/utils/cn";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface EmviBookingModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  role: "artist" | "salon" | "customer";
}

const EmviBookingModal: React.FC<EmviBookingModalProps> = ({ 
  open, 
  onClose, 
  onSubmit,
  role
}) => {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [clientName, setClientName] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [note, setNote] = useState("");
  const [price, setPrice] = useState("");

  const times = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", 
    "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", 
    "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", 
    "6:00 PM", "6:30 PM", "7:00 PM"
  ];

  const services = role === "artist" ? [
    "Makeup Session", "Bridal Makeup", "Full Glam Package", "Natural Look", "Editorial Makeup"
  ] : [
    "Haircut", "Hair Styling", "Hair Coloring", "Beard Trim", "Full Service Package"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !time || !clientName || !serviceType) {
      alert("Please fill in all required fields");
      return;
    }
    
    onSubmit({
      client_name: clientName,
      service_name: serviceType,
      date_requested: date ? format(date, "yyyy-MM-dd") : "",
      time_requested: time,
      note: note,
      price: price ? Number(price) : undefined
    });
    
    resetForm();
  };
  
  const resetForm = () => {
    setDate(undefined);
    setTime("");
    setClientName("");
    setServiceType("");
    setNote("");
    setPrice("");
  };
  
  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center font-serif">New Booking</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 sm:col-span-1">
                <Label htmlFor="date" className="mb-1 block">Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="date"
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "MMMM d, yyyy") : <span>Select date</span>}
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

              <div className="col-span-2 sm:col-span-1">
                <Label htmlFor="time" className="mb-1 block">Time</Label>
                <Select value={time} onValueChange={setTime}>
                  <SelectTrigger id="time">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {times.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="clientName" className="mb-1 block">Client Name</Label>
              <Input
                id="clientName"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Enter client name"
              />
            </div>

            <div>
              <Label htmlFor="serviceType" className="mb-1 block">Service Type</Label>
              <Select value={serviceType} onValueChange={setServiceType}>
                <SelectTrigger id="serviceType">
                  <SelectValue placeholder="Select service type" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service} value={service}>
                      {service}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="price" className="mb-1 block">Price ($)</Label>
              <Input
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter price"
              />
            </div>

            <div>
              <Label htmlFor="note" className="mb-1 block">Note (Optional)</Label>
              <Textarea
                id="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add any additional details here..."
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">
              Create Booking
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EmviBookingModal;
