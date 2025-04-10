
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, Calendar as CalendarIcon, Plus, UserPlus, X } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

// Mock data for appointments
const mockAppointments = [
  {
    id: "1",
    clientName: "Jessica Lee",
    service: "Full Set Gel Nails",
    staffName: "Tina Stylist",
    date: new Date(2025, 3, 11, 10, 0), // April 11, 2025, 10:00 AM
    duration: 60,
  },
  {
    id: "2",
    clientName: "Michael Brown",
    service: "Haircut & Style",
    staffName: "Mark Barber",
    date: new Date(2025, 3, 11, 14, 30), // April 11, 2025, 2:30 PM
    duration: 45,
  },
  {
    id: "3",
    clientName: "Sarah Johnson",
    service: "Manicure & Pedicure",
    staffName: "Laura Nail Tech",
    date: new Date(2025, 3, 12, 11, 0), // April 12, 2025, 11:00 AM
    duration: 90,
  },
];

// Mock data for staff members
const mockStaffMembers = [
  { id: "1", name: "Tina Stylist", role: "Hair Stylist" },
  { id: "2", name: "Mark Barber", role: "Barber" },
  { id: "3", name: "Laura Nail Tech", role: "Nail Technician" },
];

// Mock data for services
const mockServices = [
  { id: "1", name: "Full Set Gel Nails", duration: 60, price: 45 },
  { id: "2", name: "Haircut & Style", duration: 45, price: 35 },
  { id: "3", name: "Manicure & Pedicure", duration: 90, price: 60 },
  { id: "4", name: "Color Treatment", duration: 120, price: 85 },
];

const SalonBookingCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [newBooking, setNewBooking] = useState({
    clientName: "",
    service: "",
    staffId: "",
    time: "09:00",
  });

  // Filter appointments for the selected date
  const appointmentsForSelectedDate = selectedDate
    ? mockAppointments.filter(
        (apt) =>
          apt.date.getDate() === selectedDate.getDate() &&
          apt.date.getMonth() === selectedDate.getMonth() &&
          apt.date.getFullYear() === selectedDate.getFullYear()
      )
    : [];

  const handleAddBooking = () => {
    // Validate form
    if (!newBooking.clientName || !newBooking.service || !newBooking.staffId || !newBooking.time) {
      toast.error("Please fill out all required fields");
      return;
    }

    // In a real implementation, this would send data to Supabase
    toast.success(`Booking added for ${newBooking.clientName}`);
    setIsBookingModalOpen(false);
    
    // Reset form
    setNewBooking({
      clientName: "",
      service: "",
      staffId: "",
      time: "09:00",
    });
  };

  const formatAppointmentTime = (date: Date) => {
    return format(date, "h:mm a"); // e.g., "10:00 AM"
  };

  return (
    <Card className="border-blue-100">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg flex items-center">
          <CalendarIcon className="h-5 w-5 text-blue-500 mr-2" />
          Booking Calendar
        </CardTitle>
        <Button size="sm" onClick={() => setIsBookingModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Booking
        </Button>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Calendar picker */}
          <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
            <h3 className="font-medium mb-3 text-gray-700">Select Date</h3>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="border border-gray-100 rounded-md shadow-sm"
            />
          </div>
          
          {/* Appointments for the selected date */}
          <div className="md:col-span-2">
            <h3 className="font-medium mb-3 text-gray-700">
              Appointments for {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "today"}
            </h3>
            
            {appointmentsForSelectedDate.length === 0 ? (
              <div className="bg-gray-50 rounded-lg p-8 text-center border border-dashed border-gray-200">
                <Clock className="h-10 w-10 mx-auto mb-2 text-gray-400" />
                <p className="text-gray-500">No appointments scheduled for this date.</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-4"
                  onClick={() => setIsBookingModalOpen(true)}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Appointment
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {appointmentsForSelectedDate.map((apt) => (
                  <div 
                    key={apt.id} 
                    className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100 shadow-sm"
                  >
                    <div className="flex items-center">
                      <div className="bg-blue-100 rounded-full h-10 w-10 flex items-center justify-center text-blue-600 mr-3">
                        {apt.clientName.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium">{apt.clientName}</p>
                        <div className="flex text-sm text-gray-500">
                          <span className="mr-2">{formatAppointmentTime(apt.date)}</span>
                          <span>•</span>
                          <span className="ml-2">{apt.service}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      with <span className="font-medium">{apt.staffName}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
      
      {/* New Booking Modal */}
      <Dialog open={isBookingModalOpen} onOpenChange={setIsBookingModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Booking</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="clientName">Client Name</Label>
              <Input
                id="clientName"
                placeholder="Enter client name"
                value={newBooking.clientName}
                onChange={(e) => setNewBooking({...newBooking, clientName: e.target.value})}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="service">Service</Label>
              <Select 
                value={newBooking.service} 
                onValueChange={(value) => setNewBooking({...newBooking, service: value})}
              >
                <SelectTrigger id="service">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  {mockServices.map((service) => (
                    <SelectItem key={service.id} value={service.id}>
                      {service.name} ({service.duration} min - ${service.price})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="staffMember">Staff Member</Label>
              <Select 
                value={newBooking.staffId} 
                onValueChange={(value) => setNewBooking({...newBooking, staffId: value})}
              >
                <SelectTrigger id="staffMember">
                  <SelectValue placeholder="Select staff member" />
                </SelectTrigger>
                <SelectContent>
                  {mockStaffMembers.map((staff) => (
                    <SelectItem key={staff.id} value={staff.id}>
                      {staff.name} ({staff.role})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={newBooking.time}
                onChange={(e) => setNewBooking({...newBooking, time: e.target.value})}
              />
            </div>
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleAddBooking}>
              Add Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default SalonBookingCalendar;
