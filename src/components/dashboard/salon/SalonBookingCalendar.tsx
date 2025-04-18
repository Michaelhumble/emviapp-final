
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger, 
  DialogFooter, 
  DialogClose 
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { 
  Calendar, 
  CalendarPlus, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Plus, 
  RefreshCw, 
  X, 
  Check,
  Phone,
  Mail,
  User
} from "lucide-react";
import { useForm } from "react-hook-form";
import { format, addMinutes, isBefore, isAfter, parseISO } from "date-fns";
import { toast } from "sonner";
import { useSalonCalendar, CalendarAppointment } from "@/hooks/useSalonCalendar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AppointmentFormValues {
  clientName: string;
  clientEmail?: string;
  clientPhone?: string;
  serviceId: string;
  staffId: string;
  date: Date;
  startTime: string;
  notes?: string;
}

const SalonBookingCalendar = () => {
  const {
    selectedDate,
    setSelectedDate,
    weekDates,
    appointments,
    teamMembers,
    services,
    isLoading,
    error,
    getAppointmentsForDay,
    saveAppointment,
    updateAppointmentStatus,
    deleteAppointment,
    goToPreviousWeek,
    goToNextWeek,
    goToToday,
    refreshAppointments
  } = useSalonCalendar();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<CalendarAppointment | null>(null);
  const [isDetailsSheetOpen, setIsDetailsSheetOpen] = useState(false);

  const form = useForm<AppointmentFormValues>({
    defaultValues: {
      clientName: "",
      clientEmail: "",
      clientPhone: "",
      serviceId: "",
      staffId: "",
      date: new Date(),
      startTime: "09:00",
      notes: ""
    }
  });

  const handleAppointmentClick = (appointment: CalendarAppointment) => {
    setSelectedAppointment(appointment);
    setIsDetailsSheetOpen(true);
  };

  const handleAddAppointment = () => {
    form.reset({
      clientName: "",
      clientEmail: "",
      clientPhone: "",
      serviceId: "",
      staffId: "",
      date: selectedDate,
      startTime: "09:00",
      notes: ""
    });
    setIsAddModalOpen(true);
  };

  const onSubmitAppointment = async (data: AppointmentFormValues) => {
    // Find the selected service
    const selectedService = services.find(service => service.id === data.serviceId);
    if (!selectedService) {
      toast.error("Please select a valid service");
      return;
    }

    // Find the selected staff member
    const selectedStaff = teamMembers.find(staff => staff.id === data.staffId);
    if (!selectedStaff) {
      toast.error("Please select a valid staff member");
      return;
    }

    // Convert form data to appointment
    const startDate = new Date(data.date);
    const [hours, minutes] = data.startTime.split(":").map(Number);
    startDate.setHours(hours, minutes, 0, 0);
    
    const endDate = addMinutes(startDate, selectedService.durationMinutes);
    
    // Check if the time slot is available (no overlap with existing appointments)
    const staffAppointments = appointments.filter(apt => 
      apt.staffId === data.staffId && 
      isBefore(apt.startTime, endDate) && 
      isAfter(apt.endTime, startDate)
    );
    
    if (staffAppointments.length > 0) {
      toast.error("This time slot is already booked for the selected staff member");
      return;
    }
    
    // Create new appointment
    const appointment: Omit<CalendarAppointment, 'id' | 'createdAt'> = {
      clientName: data.clientName,
      clientEmail: data.clientEmail,
      clientPhone: data.clientPhone,
      serviceName: selectedService.id, // This would be the service ID
      servicePrice: selectedService.price,
      serviceDuration: selectedService.durationMinutes,
      startTime: startDate,
      endTime: endDate,
      status: "accepted",
      notes: data.notes,
      staffId: data.staffId,
      staffName: selectedStaff.name,
      staffAvatar: selectedStaff.avatarUrl
    };
    
    const success = await saveAppointment(appointment);
    
    if (success) {
      setIsAddModalOpen(false);
      form.reset();
    }
  };

  const handleMarkAsComplete = async (appointmentId: string) => {
    const success = await updateAppointmentStatus(appointmentId, "completed");
    if (success) {
      setIsDetailsSheetOpen(false);
      setSelectedAppointment(null);
    }
  };

  const handleDelete = async (appointmentId: string) => {
    if (confirm("Are you sure you want to delete this appointment?")) {
      const success = await deleteAppointment(appointmentId);
      if (success) {
        setIsDetailsSheetOpen(false);
        setSelectedAppointment(null);
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    return date < today;
  };

  // Time slots for the form
  const timeSlots = Array.from({ length: 13 * 4 }, (_, i) => {
    const hour = Math.floor(i / 4) + 8; // Start from 8 AM
    const minute = (i % 4) * 15;
    return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
  });

  return (
    <Card className="border-blue-100 shadow-sm overflow-hidden">
      <CardHeader className="pb-3 border-b">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <CardTitle className="text-xl flex items-center text-purple-800">
              <Calendar className="h-5 w-5 mr-2 text-purple-500" />
              Booking Calendar
            </CardTitle>
            <CardDescription>
              Manage your salon's appointments
            </CardDescription>
          </div>
          
          <div className="flex space-x-2 mt-2 sm:mt-0">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={goToPreviousWeek}
              className="text-purple-700"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={goToToday}
              className="text-purple-700"
            >
              Today
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={goToNextWeek}
              className="text-purple-700"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="font-medium text-purple-700">
            {weekDates.length > 0 && (
              <>
                {format(weekDates[0], "MMMM d")} - {format(weekDates[weekDates.length - 1], "MMMM d, yyyy")}
              </>
            )}
          </div>
          
          <div className="flex space-x-2">
            <Button 
              size="sm" 
              onClick={handleAddAppointment}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              <Plus className="h-4 w-4 mr-1.5" />
              Add Appointment
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={refreshAppointments}
              disabled={isLoading}
              className="text-purple-700"
            >
              <RefreshCw className={`h-4 w-4 mr-1.5 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>
        
        {/* Week days header */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {weekDates.map((date, index) => (
            <div 
              key={index} 
              className={`text-center p-2 font-medium rounded-t-md ${
                format(date, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd") 
                  ? "bg-purple-100 text-purple-800" 
                  : isPastDate(new Date(date)) 
                    ? "bg-gray-100 text-gray-500" 
                    : "bg-gray-50 text-gray-700"
              }`}
            >
              <div className="text-sm">{format(date, "EEE")}</div>
              <div>{format(date, "d")}</div>
            </div>
          ))}
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-7 gap-2 h-[600px]">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="border rounded-md p-2 h-full overflow-y-auto">
                <Skeleton className="h-20 w-full mb-2" />
                <Skeleton className="h-20 w-full mb-2" />
                <Skeleton className="h-20 w-full" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">
            <p>{error}</p>
            <Button 
              onClick={refreshAppointments} 
              variant="outline" 
              className="mt-2"
            >
              Try Again
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-7 gap-2 h-[600px]">
            {weekDates.map((date, dayIndex) => {
              const dayAppointments = getAppointmentsForDay(date);
              const isPast = isPastDate(new Date(date));
              
              return (
                <div 
                  key={dayIndex} 
                  className={`border rounded-md p-2 h-full overflow-y-auto ${
                    isPast ? "bg-gray-50" : ""
                  }`}
                >
                  {/* Mobile view date header (only shown in mobile) */}
                  <div className="sm:hidden text-center font-medium mb-2 pb-1 border-b">
                    {format(date, "EEE, MMM d")}
                  </div>
                  
                  {dayAppointments.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-32 text-gray-400 text-sm">
                      <CalendarPlus className="h-6 w-6 mb-1" />
                      <p>No appointments</p>
                    </div>
                  ) : (
                    dayAppointments
                      .sort((a, b) => a.startTime.getTime() - b.startTime.getTime())
                      .map((appointment) => (
                        <div 
                          key={appointment.id}
                          onClick={() => handleAppointmentClick(appointment)}
                          className={`mb-2 p-2 border rounded cursor-pointer transition-colors ${
                            isPast ? "opacity-60 " : ""
                          } ${
                            appointment.status === "cancelled" 
                              ? "bg-gray-100 border-gray-200" 
                              : "bg-purple-50 border-purple-100 hover:bg-purple-100"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-medium text-purple-800">
                              {format(appointment.startTime, "h:mm a")}
                            </span>
                            <Badge 
                              variant="outline" 
                              className={`text-xs px-1.5 py-0 ${getStatusColor(appointment.status)}`}
                            >
                              {appointment.status}
                            </Badge>
                          </div>
                          
                          <div className="font-medium text-sm truncate">
                            {appointment.clientName}
                          </div>
                          
                          <div className="text-xs text-gray-600 truncate">
                            {appointment.serviceName}
                          </div>
                          
                          <div className="flex items-center mt-1">
                            <Avatar className="h-5 w-5 mr-1">
                              <AvatarImage src={appointment.staffAvatar} />
                              <AvatarFallback className="text-[10px] bg-purple-100 text-purple-800">
                                {getInitials(appointment.staffName)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-gray-600 truncate">
                              {appointment.staffName}
                            </span>
                          </div>
                        </div>
                      ))
                  )}
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
      
      {/* Add Appointment Dialog */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Appointment</DialogTitle>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitAppointment)} className="space-y-4">
              <FormField
                control={form.control}
                name="clientName"
                rules={{ required: "Client name is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client Name*</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter client name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="clientEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email (optional)</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="client@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="clientPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone (optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="(123) 456-7890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="serviceId"
                  rules={{ required: "Service is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service*</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {services.map(service => (
                            <SelectItem key={service.id} value={service.id}>
                              {service.name} (${service.price} - {service.durationMinutes}min)
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="staffId"
                  rules={{ required: "Staff member is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Staff Member*</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select staff member" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {teamMembers.map(staff => (
                            <SelectItem key={staff.id} value={staff.id}>
                              {staff.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="date"
                  rules={{ required: "Date is required" }}
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date*</FormLabel>
                      <FormControl>
                        <Input 
                          type="date" 
                          value={field.value ? format(field.value, "yyyy-MM-dd") : ""} 
                          onChange={(e) => {
                            field.onChange(e.target.value ? new Date(e.target.value) : null);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="startTime"
                  rules={{ required: "Start time is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Time*</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {timeSlots.map(time => (
                            <SelectItem key={time} value={time}>
                              {format(new Date(`2000-01-01T${time}:00`), "h:mm a")}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes (optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Add any additional notes..." 
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsAddModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Save Appointment
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Appointment Details Sheet */}
      <Sheet open={isDetailsSheetOpen} onOpenChange={setIsDetailsSheetOpen}>
        <SheetContent className="sm:max-w-md">
          {selectedAppointment && (
            <>
              <SheetHeader>
                <SheetTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-purple-500" />
                  Appointment Details
                </SheetTitle>
                <SheetDescription>
                  {format(selectedAppointment.startTime, "EEEE, MMMM d, yyyy")}
                </SheetDescription>
              </SheetHeader>
              
              <div className="py-6 space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium">{selectedAppointment.clientName}</h3>
                    <Badge 
                      variant="outline" 
                      className={`mt-1 ${getStatusColor(selectedAppointment.status)}`}
                    >
                      {selectedAppointment.status}
                    </Badge>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Time</div>
                    <div className="font-medium">
                      {format(selectedAppointment.startTime, "h:mm a")} - {format(selectedAppointment.endTime, "h:mm a")}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {selectedAppointment.serviceDuration} minutes
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Contact Information</h4>
                  
                  {selectedAppointment.clientEmail && (
                    <div className="flex items-center mb-2">
                      <Mail className="h-4 w-4 mr-2 text-gray-500" />
                      <a href={`mailto:${selectedAppointment.clientEmail}`} className="text-sm text-blue-600">
                        {selectedAppointment.clientEmail}
                      </a>
                    </div>
                  )}
                  
                  {selectedAppointment.clientPhone && (
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-gray-500" />
                      <a href={`tel:${selectedAppointment.clientPhone}`} className="text-sm text-blue-600">
                        {selectedAppointment.clientPhone}
                      </a>
                    </div>
                  )}
                  
                  {!selectedAppointment.clientEmail && !selectedAppointment.clientPhone && (
                    <p className="text-sm text-gray-500">No contact information provided</p>
                  )}
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Service</h4>
                    <div className="font-medium">${selectedAppointment.servicePrice}</div>
                  </div>
                  <p className="text-sm">{selectedAppointment.serviceName}</p>
                </div>
                
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Staff Member</h4>
                  <div className="flex items-center">
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarImage src={selectedAppointment.staffAvatar} />
                      <AvatarFallback className="bg-purple-100 text-purple-800">
                        {getInitials(selectedAppointment.staffName)}
                      </AvatarFallback>
                    </Avatar>
                    <span>{selectedAppointment.staffName}</span>
                  </div>
                </div>
                
                {selectedAppointment.notes && (
                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-2">Notes</h4>
                    <p className="text-sm whitespace-pre-line">{selectedAppointment.notes}</p>
                  </div>
                )}
                
                <div className="border-t pt-4 flex flex-col sm:flex-row gap-2">
                  {selectedAppointment.status !== 'completed' && (
                    <Button 
                      onClick={() => handleMarkAsComplete(selectedAppointment.id)}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Mark as Completed
                    </Button>
                  )}
                  
                  <Button 
                    variant="outline" 
                    className="text-red-600 border-red-200 hover:bg-red-50"
                    onClick={() => handleDelete(selectedAppointment.id)}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Delete Appointment
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </Card>
  );
};

export default SalonBookingCalendar;
