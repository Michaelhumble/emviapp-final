
import React, { useState, useEffect } from 'react';
import { format, isSameDay, isAfter, isBefore, isToday, parseISO } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronLeft, ChevronRight, Plus, Calendar, Clock, User, Phone, Mail, FileText, CheckCircle2, Trash2, Loader2 } from 'lucide-react';
import { useSalonCalendar, CalendarAppointment, TeamMember, Service } from '@/hooks/useSalonCalendar';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface AppointmentFormData {
  id?: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  serviceId: string;
  staffId: string;
  date: string;
  startTime: string;
  endTime: string;
  notes: string;
}

const SalonBookingCalendar = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [activeTab, setActiveTab] = useState<"week" | "list">(isMobile ? "list" : "week");
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [detailsSheetOpen, setDetailsSheetOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<CalendarAppointment | null>(null);
  const [formData, setFormData] = useState<AppointmentFormData>({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    serviceId: '',
    staffId: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    startTime: '09:00',
    endTime: '10:00',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
  } = useSalonCalendar();

  // Update active tab based on screen size
  useEffect(() => {
    setActiveTab(isMobile ? "list" : "week");
  }, [isMobile]);

  // Reset form when dialog closes
  useEffect(() => {
    if (!addDialogOpen) {
      setFormData({
        clientName: '',
        clientEmail: '',
        clientPhone: '',
        serviceId: '',
        staffId: '',
        date: format(new Date(), 'yyyy-MM-dd'),
        startTime: '09:00',
        endTime: '10:00',
        notes: ''
      });
    }
  }, [addDialogOpen]);

  // Helper to get duration from service
  const getServiceDuration = (serviceId: string): number => {
    const service = services.find(s => s.id === serviceId);
    return service ? service.durationMinutes : 60;
  };

  // Update end time when service or start time changes
  useEffect(() => {
    if (formData.serviceId && formData.startTime) {
      const duration = getServiceDuration(formData.serviceId);
      const [hours, minutes] = formData.startTime.split(':').map(Number);
      
      const startDate = new Date();
      startDate.setHours(hours, minutes, 0, 0);
      
      const endDate = new Date(startDate);
      endDate.setMinutes(endDate.getMinutes() + duration);
      
      const endTime = `${String(endDate.getHours()).padStart(2, '0')}:${String(endDate.getMinutes()).padStart(2, '0')}`;
      
      setFormData(prev => ({
        ...prev,
        endTime
      }));
    }
  }, [formData.serviceId, formData.startTime]);

  // Edit appointment
  const handleEditAppointment = () => {
    if (!selectedAppointment) return;
    
    const startTime = format(selectedAppointment.startTime, 'HH:mm');
    const endTime = format(selectedAppointment.endTime, 'HH:mm');
    const date = format(selectedAppointment.startTime, 'yyyy-MM-dd');
    
    // Find service ID from name
    const service = services.find(s => s.name === selectedAppointment.serviceName);
    
    setFormData({
      id: selectedAppointment.id,
      clientName: selectedAppointment.clientName,
      clientEmail: selectedAppointment.clientEmail || '',
      clientPhone: selectedAppointment.clientPhone || '',
      serviceId: service ? service.id : '',
      staffId: selectedAppointment.staffId,
      date,
      startTime,
      endTime,
      notes: selectedAppointment.notes || ''
    });
    
    setDetailsSheetOpen(false);
    setAddDialogOpen(true);
  };

  // Delete appointment
  const handleDeleteAppointment = async () => {
    if (!selectedAppointment) return;
    
    const confirmed = window.confirm('Are you sure you want to delete this appointment?');
    if (!confirmed) return;
    
    const success = await deleteAppointment(selectedAppointment.id);
    if (success) {
      setDetailsSheetOpen(false);
      toast.success('Appointment deleted successfully');
    }
  };

  // Mark appointment as complete
  const handleMarkComplete = async () => {
    if (!selectedAppointment) return;
    
    const success = await updateAppointmentStatus(selectedAppointment.id, 'completed');
    if (success) {
      setSelectedAppointment({
        ...selectedAppointment,
        status: 'completed'
      });
      toast.success('Appointment marked as completed');
    }
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const startDateTime = new Date(`${formData.date}T${formData.startTime}`);
      const endDateTime = new Date(`${formData.date}T${formData.endTime}`);
      
      // Validate times
      if (isAfter(startDateTime, endDateTime)) {
        toast.error('Start time must be before end time');
        return;
      }
      
      // Find service from ID
      const service = services.find(s => s.id === formData.serviceId);
      if (!service) {
        toast.error('Please select a valid service');
        return;
      }
      
      // Find staff from ID
      const staff = teamMembers.find(s => s.id === formData.staffId);
      if (!staff) {
        toast.error('Please select a team member');
        return;
      }
      
      const appointmentData: Omit<CalendarAppointment, 'createdAt'> & { id?: string } = {
        id: formData.id,
        clientName: formData.clientName,
        clientEmail: formData.clientEmail,
        clientPhone: formData.clientPhone,
        serviceName: service.id, // Pass ID for backend
        servicePrice: service.price,
        serviceDuration: service.durationMinutes,
        startTime: startDateTime,
        endTime: endDateTime,
        status: 'accepted',
        notes: formData.notes,
        staffId: staff.id,
        staffName: staff.name,
        staffAvatar: staff.avatarUrl
      };
      
      const success = await saveAppointment(appointmentData);
      if (success) {
        setAddDialogOpen(false);
      }
    } catch (error) {
      console.error('Error saving appointment:', error);
      toast.error('Failed to save appointment');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render time slots for week view
  const renderTimeSlots = () => {
    const hours = Array.from({ length: 12 }, (_, i) => i + 9); // 9am to 8pm
    
    return (
      <div className="grid grid-cols-8 gap-2 min-w-max">
        {/* Time labels column */}
        <div className="col-span-1">
          {hours.map(hour => (
            <div key={hour} className="h-20 border-b border-gray-100 pt-2 text-xs text-gray-500 text-right pr-2">
              {hour % 12 === 0 ? 12 : hour % 12}:00 {hour >= 12 ? 'PM' : 'AM'}
            </div>
          ))}
        </div>
        
        {/* Days columns */}
        {weekDates.map(day => (
          <div key={day.toISOString()} className="col-span-1 relative">
            {hours.map(hour => {
              const timeSlotDate = new Date(day);
              timeSlotDate.setHours(hour, 0, 0, 0);
              const isPast = isBefore(timeSlotDate, new Date());
              
              return (
                <div 
                  key={`${day.toISOString()}-${hour}`} 
                  className={`h-20 border border-gray-100 rounded ${isPast ? 'bg-gray-50' : 'bg-white'}`}
                />
              );
            })}
            
            {/* Overlay appointments */}
            {getAppointmentsForDay(day).map(appointment => {
              const startHour = appointment.startTime.getHours();
              const startMinute = appointment.startTime.getMinutes();
              const endHour = appointment.endTime.getHours();
              const endMinute = appointment.endTime.getMinutes();
              
              // Calculate position (relative to 9am start)
              const startOffset = (startHour - 9) * 60 + startMinute;
              const duration = (endHour * 60 + endMinute) - (startHour * 60 + startMinute);
              
              const isPast = isBefore(appointment.endTime, new Date());
              
              // Status color mapping
              const statusColors = {
                pending: 'bg-yellow-100 border-yellow-300 text-yellow-800',
                accepted: 'bg-blue-100 border-blue-300 text-blue-800',
                completed: 'bg-green-100 border-green-300 text-green-800',
                cancelled: 'bg-gray-100 border-gray-300 text-gray-500'
              };
              
              return (
                <div 
                  key={appointment.id}
                  onClick={() => {
                    setSelectedAppointment(appointment);
                    setDetailsSheetOpen(true);
                  }}
                  className={`absolute w-[95%] left-[2.5%] rounded border ${statusColors[appointment.status]} p-1 text-xs cursor-pointer transition-opacity hover:opacity-90 ${isPast ? 'opacity-60' : 'opacity-100'}`}
                  style={{
                    top: `${(startOffset / 60) * 5}rem`,
                    height: `${(duration / 60) * 5}rem`,
                  }}
                >
                  <div className="font-medium truncate">{appointment.clientName}</div>
                  <div className="truncate">{appointment.serviceName}</div>
                  <div className="text-2xs">{format(appointment.startTime, 'h:mm a')}</div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  // Render appointments in list view
  const renderAppointmentsList = () => {
    if (appointments.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <Calendar className="h-12 w-12 text-gray-300 mb-4" />
          <h3 className="text-lg font-medium mb-2">No Appointments</h3>
          <p className="text-gray-500 mb-4">There are no appointments scheduled yet.</p>
          <Button onClick={() => setAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Appointment
          </Button>
        </div>
      );
    }
    
    // Group appointments by date
    const groupedAppointments: Record<string, CalendarAppointment[]> = {};
    
    appointments.forEach(appointment => {
      const date = format(appointment.startTime, 'yyyy-MM-dd');
      if (!groupedAppointments[date]) {
        groupedAppointments[date] = [];
      }
      groupedAppointments[date].push(appointment);
    });
    
    // Sort dates
    const sortedDates = Object.keys(groupedAppointments).sort();
    
    return (
      <div className="space-y-6">
        {sortedDates.map(date => {
          const dateAppointments = groupedAppointments[date];
          const formattedDate = format(parseISO(date), 'EEEE, MMMM d, yyyy');
          const isDateToday = isToday(parseISO(date));
          
          return (
            <div key={date} className="space-y-2">
              <div className="flex items-center">
                <h3 className="text-lg font-medium">{formattedDate}</h3>
                {isDateToday && (
                  <Badge className="ml-2 bg-blue-500">Today</Badge>
                )}
              </div>
              
              <div className="space-y-2">
                {dateAppointments.map(appointment => {
                  const isPast = isBefore(appointment.endTime, new Date());
                  
                  // Status badge mapping
                  const statusBadges = {
                    pending: <Badge variant="outline" className="border-yellow-400 text-yellow-600">Pending</Badge>,
                    accepted: <Badge variant="outline" className="border-blue-400 text-blue-600">Confirmed</Badge>,
                    completed: <Badge variant="outline" className="border-green-400 text-green-600">Completed</Badge>,
                    cancelled: <Badge variant="outline" className="border-gray-400 text-gray-600">Cancelled</Badge>
                  };
                  
                  return (
                    <div 
                      key={appointment.id}
                      onClick={() => {
                        setSelectedAppointment(appointment);
                        setDetailsSheetOpen(true);
                      }}
                      className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-sm ${isPast ? 'bg-gray-50' : 'bg-white'}`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">{appointment.clientName}</h4>
                          <p className="text-sm text-gray-500">
                            {format(appointment.startTime, 'h:mm a')} - {format(appointment.endTime, 'h:mm a')}
                          </p>
                        </div>
                        {statusBadges[appointment.status]}
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600">
                        <div className="flex items-center mr-4">
                          <User className="h-3 w-3 mr-1 text-gray-400" />
                          {appointment.staffName}
                        </div>
                        <div>
                          <FileText className="h-3 w-3 mr-1 inline text-gray-400" />
                          {appointment.serviceName}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <Card className="border-purple-100">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
          <CardTitle className="font-serif">Salon Booking Calendar</CardTitle>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={goToPreviousWeek}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={goToToday}>
              Today
            </Button>
            <Button variant="outline" size="sm" onClick={goToNextWeek}>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button onClick={() => setAddDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Appointment
            </Button>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <h3 className="text-lg font-medium">
            {format(weekDates[0], 'MMMM d')} - {format(weekDates[6], 'MMMM d, yyyy')}
          </h3>
          
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "week" | "list")}>
            <TabsList>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="list">List</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 md:p-6">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-10 w-10 text-purple-500 animate-spin mb-4" />
            <p className="text-gray-500">Loading calendar...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <Button onClick={goToToday}>Try Again</Button>
          </div>
        ) : (
          <TabsContent value="week" className={activeTab === "week" ? "block" : "hidden"}>
            {/* Weekday headers */}
            <div className="grid grid-cols-8 gap-2 mb-2">
              <div className="col-span-1"></div>
              {weekDates.map(date => {
                const isCurrentDate = isToday(date);
                
                return (
                  <div key={date.toISOString()} className="col-span-1 text-center">
                    <div className={`text-sm font-medium ${isCurrentDate ? 'text-purple-600' : ''}`}>
                      {format(date, 'EEE')}
                    </div>
                    <div className={`text-2xl leading-none ${isCurrentDate ? 'text-purple-600 font-bold' : ''}`}>
                      {format(date, 'd')}
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Calendar grid */}
            <div className="overflow-x-auto mt-4 pb-4">
              {renderTimeSlots()}
            </div>
          </TabsContent>
        )}
        
        <TabsContent value="list" className={activeTab === "list" ? "block" : "hidden"}>
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="h-10 w-10 text-purple-500 animate-spin mb-4" />
              <p className="text-gray-500">Loading appointments...</p>
            </div>
          ) : (
            renderAppointmentsList()
          )}
        </TabsContent>
      </CardContent>
      
      {/* Add/Edit Appointment Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{formData.id ? 'Edit Appointment' : 'Add New Appointment'}</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="clientName">Client Name</Label>
                  <Input 
                    id="clientName" 
                    value={formData.clientName} 
                    onChange={(e) => setFormData({...formData, clientName: e.target.value})} 
                    required 
                  />
                </div>
                
                <div className="col-span-1">
                  <Label htmlFor="clientEmail">Email</Label>
                  <Input 
                    id="clientEmail" 
                    type="email" 
                    value={formData.clientEmail} 
                    onChange={(e) => setFormData({...formData, clientEmail: e.target.value})} 
                  />
                </div>
                
                <div className="col-span-1">
                  <Label htmlFor="clientPhone">Phone</Label>
                  <Input 
                    id="clientPhone" 
                    value={formData.clientPhone} 
                    onChange={(e) => setFormData({...formData, clientPhone: e.target.value})} 
                  />
                </div>
                
                <div className="col-span-2">
                  <Label htmlFor="serviceId">Service</Label>
                  <Select 
                    value={formData.serviceId} 
                    onValueChange={(value) => setFormData({...formData, serviceId: value})}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map(service => (
                        <SelectItem key={service.id} value={service.id}>
                          {service.name} - ${service.price} ({service.durationMinutes} min)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="col-span-2">
                  <Label htmlFor="staffId">Staff Member</Label>
                  <Select 
                    value={formData.staffId} 
                    onValueChange={(value) => setFormData({...formData, staffId: value})}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select staff member" />
                    </SelectTrigger>
                    <SelectContent>
                      {teamMembers.map(member => (
                        <SelectItem key={member.id} value={member.id}>
                          {member.name}{member.specialty ? ` (${member.specialty})` : ''}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="col-span-1">
                  <Label htmlFor="date">Date</Label>
                  <Input 
                    id="date" 
                    type="date" 
                    value={formData.date} 
                    onChange={(e) => setFormData({...formData, date: e.target.value})} 
                    required 
                  />
                </div>
                
                <div className="col-span-1">
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input 
                    id="startTime" 
                    type="time" 
                    value={formData.startTime} 
                    onChange={(e) => setFormData({...formData, startTime: e.target.value})} 
                    required 
                  />
                </div>
                
                <div className="col-span-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea 
                    id="notes" 
                    value={formData.notes} 
                    onChange={(e) => setFormData({...formData, notes: e.target.value})} 
                    rows={3} 
                  />
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {formData.id ? 'Update' : 'Add'} Appointment
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Appointment Details Sheet */}
      <Sheet open={detailsSheetOpen} onOpenChange={setDetailsSheetOpen}>
        <SheetContent>
          {selectedAppointment && (
            <>
              <SheetHeader>
                <SheetTitle>Appointment Details</SheetTitle>
                <SheetDescription>
                  {format(selectedAppointment.startTime, 'EEEE, MMMM d, yyyy')}
                </SheetDescription>
              </SheetHeader>
              
              <div className="py-6 space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium">{selectedAppointment.clientName}</h3>
                      <p className="text-sm text-gray-500">
                        {format(selectedAppointment.startTime, 'h:mm a')} - {format(selectedAppointment.endTime, 'h:mm a')}
                      </p>
                    </div>
                    
                    <Badge
                      className={`
                        ${selectedAppointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100' : ''}
                        ${selectedAppointment.status === 'accepted' ? 'bg-blue-100 text-blue-800 hover:bg-blue-100' : ''}
                        ${selectedAppointment.status === 'completed' ? 'bg-green-100 text-green-800 hover:bg-green-100' : ''}
                        ${selectedAppointment.status === 'cancelled' ? 'bg-gray-100 text-gray-800 hover:bg-gray-100' : ''}
                      `}
                    >
                      {selectedAppointment.status.charAt(0).toUpperCase() + selectedAppointment.status.slice(1)}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-[24px_1fr] gap-x-2 gap-y-3">
                    <User className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium">Staff</p>
                      <p className="text-sm text-gray-500">{selectedAppointment.staffName}</p>
                    </div>
                    
                    <FileText className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium">Service</p>
                      <p className="text-sm text-gray-500">
                        {selectedAppointment.serviceName} - ${selectedAppointment.servicePrice}
                      </p>
                    </div>
                    
                    {selectedAppointment.clientEmail && (
                      <>
                        <Mail className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium">Email</p>
                          <p className="text-sm text-gray-500">{selectedAppointment.clientEmail}</p>
                        </div>
                      </>
                    )}
                    
                    {selectedAppointment.clientPhone && (
                      <>
                        <Phone className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium">Phone</p>
                          <p className="text-sm text-gray-500">{selectedAppointment.clientPhone}</p>
                        </div>
                      </>
                    )}
                    
                    {selectedAppointment.notes && (
                      <>
                        <FileText className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium">Notes</p>
                          <p className="text-sm text-gray-500">{selectedAppointment.notes}</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={handleEditAppointment}
                    >
                      Edit
                    </Button>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    {selectedAppointment.status !== 'completed' && (
                      <Button
                        className="flex-1 bg-green-600 text-white hover:bg-green-700"
                        onClick={handleMarkComplete}
                      >
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Mark as Completed
                      </Button>
                    )}
                    
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={handleDeleteAppointment}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
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
