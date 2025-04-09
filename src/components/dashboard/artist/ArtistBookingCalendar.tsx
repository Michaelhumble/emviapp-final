
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import {
  CalendarClock,
  Clock,
  UserPlus,
  CheckCircle,
  XCircle,
  MessageSquare,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus
} from "lucide-react";
import { addDays, format, isSameDay, startOfWeek } from "date-fns";
import { useAuth } from "@/context/auth";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Sample booking data
const SAMPLE_BOOKINGS = [
  {
    id: "b1",
    customer_name: "Emma Nguyen",
    service: "Acrylic Full Set",
    date: new Date(2025, 3, 15, 10, 0),
    status: "confirmed" as "confirmed",
    customer_avatar: "",
    message: "Can you do a marble design? I love your work from Instagram!"
  },
  {
    id: "b2",
    customer_name: "Sophia Johnson",
    service: "Gel Manicure",
    date: new Date(2025, 3, 16, 14, 30),
    status: "pending" as "pending",
    customer_avatar: "",
    message: "Looking forward to trying your salon for the first time!"
  },
  {
    id: "b3",
    customer_name: "Alex Kim",
    service: "Nail Art Design",
    date: new Date(2025, 3, 18, 16, 0),
    status: "confirmed" as "confirmed",
    customer_avatar: "",
    message: "I'd like something similar to the blue floral design in your portfolio."
  }
];

// Sample availability data
const SAMPLE_AVAILABILITY = {
  Monday: { isAvailable: true, startTime: "09:00", endTime: "17:00" },
  Tuesday: { isAvailable: true, startTime: "09:00", endTime: "17:00" },
  Wednesday: { isAvailable: true, startTime: "09:00", endTime: "17:00" },
  Thursday: { isAvailable: true, startTime: "09:00", endTime: "17:00" },
  Friday: { isAvailable: true, startTime: "09:00", endTime: "17:00" },
  Saturday: { isAvailable: true, startTime: "10:00", endTime: "15:00" },
  Sunday: { isAvailable: false, startTime: "", endTime: "" }
};

const TIME_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", 
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", 
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
  "18:00", "18:30", "19:00", "19:30"
];

interface DaySchedule {
  day: string;
  isAvailable: boolean;
  startTime?: string;
  endTime?: string;
}

interface Booking {
  id: string;
  customer_name: string;
  service: string;
  date: Date;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  customer_avatar?: string;
  message?: string;
}

const ArtistBookingCalendar = () => {
  const { userProfile } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [view, setView] = useState<"calendar" | "list" | "weekly">("calendar");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [availability, setAvailability] = useState<Record<string, { isAvailable: boolean, startTime: string, endTime: string }>>(SAMPLE_AVAILABILITY);
  const [acceptsBookings, setAcceptsBookings] = useState(userProfile?.accepts_bookings || false);
  
  // Get bookings for selected date
  const getDayBookings = (date: Date) => {
    return SAMPLE_BOOKINGS.filter(booking => 
      isSameDay(booking.date, date)
    );
  };
  
  // Handle day schedule change
  const handleDayScheduleChange = (day: string, field: string, value: any) => {
    setAvailability(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value
      }
    }));
  };
  
  // Get week days for weekly view
  const getWeekDays = (date: Date) => {
    const start = startOfWeek(date, { weekStartsOn: 1 });
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  };
  
  const weekDays = getWeekDays(selectedDate);
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle className="text-xl font-serif">Booking Calendar</CardTitle>
              <CardDescription>
                Manage your appointments and availability
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Switch 
                id="accepts-bookings" 
                checked={acceptsBookings} 
                onCheckedChange={setAcceptsBookings}
              />
              <Label htmlFor="accepts-bookings" className="font-medium">
                Accept Bookings
              </Label>
              <Button 
                variant="outline" 
                size="sm" 
                className="ml-4"
                onClick={() => setIsSettingsOpen(true)}
              >
                <CalendarClock className="h-4 w-4 mr-2" />
                Set Availability
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          {/* View Tabs */}
          <Tabs defaultValue={view} value={view} onValueChange={(v) => setView(v as any)} className="mb-6">
            <TabsList>
              <TabsTrigger value="calendar">
                <CalendarIcon className="h-4 w-4 mr-2" />
                Calendar
              </TabsTrigger>
              <TabsTrigger value="weekly">
                <CalendarClock className="h-4 w-4 mr-2" />
                Weekly
              </TabsTrigger>
              <TabsTrigger value="list">
                <MessageSquare className="h-4 w-4 mr-2" />
                Bookings
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          {/* Calendar View */}
          {view === "calendar" && (
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  className="border rounded-md p-4"
                />
              </div>
              
              <div className="md:w-1/2">
                <h3 className="font-medium mb-4">
                  Bookings for {format(selectedDate, "MMMM d, yyyy")}
                </h3>
                
                {getDayBookings(selectedDate).length > 0 ? (
                  <div className="space-y-4">
                    {getDayBookings(selectedDate).map(booking => (
                      <div 
                        key={booking.id} 
                        className="border rounded-lg p-4 flex justify-between items-center hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => setSelectedBooking(booking)}
                      >
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarFallback>{booking.customer_name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">{booking.customer_name}</h4>
                            <p className="text-sm text-muted-foreground">{booking.service}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <p className="text-sm font-medium">
                            {format(booking.date, "h:mm a")}
                          </p>
                          <Badge className={booking.status === "pending" ? "bg-amber-500 hover:bg-amber-600" : "bg-green-500 hover:bg-green-600"}>
                            {booking.status === "pending" ? "Pending" : "Confirmed"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 border rounded-lg">
                    <CalendarClock className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                    <p className="text-muted-foreground">No bookings for this date</p>
                    <Button variant="link" size="sm" className="mt-2">
                      <Plus className="h-4 w-4 mr-1" />
                      Add Booking
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Weekly View */}
          {view === "weekly" && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">
                  Week of {format(weekDays[0], "MMM d")} - {format(weekDays[6], "MMM d, yyyy")}
                </h3>
                <div className="flex">
                  <Button variant="outline" size="icon" className="mr-2">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-7 gap-2">
                {weekDays.map((date, i) => {
                  const dayName = format(date, "EEEE");
                  const dayAvailability = availability[dayName];
                  const isAvailable = dayAvailability?.isAvailable;
                  
                  return (
                    <div key={i} className="border rounded-md overflow-hidden">
                      <div className={`text-center p-2 ${isAvailable ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-500'}`}>
                        <p className="text-xs font-medium">{format(date, "EEE")}</p>
                        <p className="text-lg font-bold">{format(date, "d")}</p>
                      </div>
                      
                      <div className="p-2 h-40 overflow-y-auto">
                        {isAvailable ? (
                          <>
                            <p className="text-xs text-gray-500 mb-1">
                              {dayAvailability.startTime} - {dayAvailability.endTime}
                            </p>
                            {getDayBookings(date).map(booking => (
                              <div 
                                key={booking.id} 
                                className={`text-xs p-1.5 mb-1 rounded ${
                                  booking.status === "confirmed" 
                                    ? "bg-green-100 text-green-800"
                                    : "bg-amber-100 text-amber-800"
                                }`}
                                onClick={() => setSelectedBooking(booking)}
                              >
                                {format(booking.date, "h:mm a")} - {booking.customer_name}
                              </div>
                            ))}
                          </>
                        ) : (
                          <p className="text-xs text-gray-400 text-center mt-4">
                            Not Available
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          
          {/* List View */}
          {view === "list" && (
            <div>
              <Tabs defaultValue="all">
                <TabsList className="mb-6">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all">
                  <div className="space-y-4">
                    {SAMPLE_BOOKINGS.map(booking => (
                      <Card key={booking.id} className="overflow-hidden">
                        <CardContent className="p-0">
                          <div className="flex flex-col sm:flex-row">
                            <div className={`p-4 sm:w-2/3 ${
                              booking.status === "pending" 
                                ? "border-l-4 border-amber-500" 
                                : "border-l-4 border-green-500"
                            }`}>
                              <div className="flex items-center mb-2">
                                <Avatar className="h-8 w-8 mr-2">
                                  <AvatarFallback>{booking.customer_name[0]}</AvatarFallback>
                                </Avatar>
                                <h4 className="font-medium">{booking.customer_name}</h4>
                                <Badge className="ml-auto" variant={booking.status === "pending" ? "outline" : "default"}>
                                  {booking.status === "pending" ? "Pending" : "Confirmed"}
                                </Badge>
                              </div>
                              
                              <div className="flex items-center text-sm text-muted-foreground mb-1">
                                <CalendarIcon className="h-3.5 w-3.5 mr-1" />
                                <span>{format(booking.date, "MMMM d, yyyy")}</span>
                                <span className="mx-1">•</span>
                                <Clock className="h-3.5 w-3.5 mr-1" />
                                <span>{format(booking.date, "h:mm a")}</span>
                              </div>
                              
                              <p className="text-sm font-medium">Service: {booking.service}</p>
                              
                              {booking.message && (
                                <div className="mt-2 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                                  <p className="italic">"{booking.message}"</p>
                                </div>
                              )}
                            </div>
                            
                            <div className="bg-gray-50 p-4 flex sm:flex-col justify-end items-center sm:w-1/3 sm:space-y-2">
                              <Button 
                                variant="default" 
                                size="sm" 
                                className="mr-2 sm:mr-0 sm:w-full"
                                onClick={() => setSelectedBooking(booking)}
                              >
                                <MessageSquare className="h-4 w-4 mr-2" />
                                View
                              </Button>
                              
                              {booking.status === "pending" && (
                                <>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    className="bg-white border-green-500 text-green-600 hover:bg-green-50 sm:w-full"
                                  >
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Accept
                                  </Button>
                                  
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    className="bg-white border-red-500 text-red-600 hover:bg-red-50 mt-2 sm:w-full"
                                  >
                                    <XCircle className="h-4 w-4 mr-2" />
                                    Decline
                                  </Button>
                                </>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="pending">
                  <div className="space-y-4">
                    {SAMPLE_BOOKINGS.filter(b => b.status === "pending").map(booking => (
                      <Card key={booking.id}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-medium">{booking.customer_name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {format(booking.date, "MMMM d, yyyy")} at {format(booking.date, "h:mm a")}
                              </p>
                            </div>
                            <div className="flex space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="text-green-600 hover:bg-green-50"
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Accept
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="text-red-600 hover:bg-red-50"
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Decline
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    
                    {SAMPLE_BOOKINGS.filter(b => b.status === "pending").length === 0 && (
                      <div className="text-center py-12 border rounded-lg">
                        <CheckCircle className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                        <p className="text-muted-foreground">No pending bookings</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="confirmed">
                  <div className="space-y-4">
                    {SAMPLE_BOOKINGS.filter(b => b.status === "confirmed").map(booking => (
                      <Card key={booking.id}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-medium">{booking.customer_name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {format(booking.date, "MMMM d, yyyy")} at {format(booking.date, "h:mm a")}
                              </p>
                            </div>
                            <div>
                              <Button variant="outline" size="sm">
                                <MessageSquare className="h-4 w-4 mr-1" />
                                Message
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    
                    {SAMPLE_BOOKINGS.filter(b => b.status === "confirmed").length === 0 && (
                      <div className="text-center py-12 border rounded-lg">
                        <CalendarClock className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                        <p className="text-muted-foreground">No confirmed bookings</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="completed">
                  <div className="text-center py-12 border rounded-lg">
                    <CheckCircle className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                    <p className="text-muted-foreground">No completed bookings yet</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Booking Details Dialog */}
      <Dialog open={!!selectedBooking} onOpenChange={(open) => !open && setSelectedBooking(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
            <DialogDescription>
              View and manage appointment details
            </DialogDescription>
          </DialogHeader>
          
          {selectedBooking && (
            <div className="py-4">
              <div className="flex items-center mb-4">
                <Avatar className="h-12 w-12 mr-3">
                  <AvatarFallback>{selectedBooking.customer_name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{selectedBooking.customer_name}</h3>
                  <p className="text-sm text-muted-foreground">Customer</p>
                </div>
                <Badge className="ml-auto" variant={selectedBooking.status === "pending" ? "outline" : "default"}>
                  {selectedBooking.status === "pending" ? "Pending" : "Confirmed"}
                </Badge>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex">
                  <div className="w-1/3 text-sm font-medium">Service</div>
                  <div className="w-2/3 text-sm">{selectedBooking.service}</div>
                </div>
                <Separator />
                
                <div className="flex">
                  <div className="w-1/3 text-sm font-medium">Date</div>
                  <div className="w-2/3 text-sm">{format(selectedBooking.date, "MMMM d, yyyy")}</div>
                </div>
                <Separator />
                
                <div className="flex">
                  <div className="w-1/3 text-sm font-medium">Time</div>
                  <div className="w-2/3 text-sm">{format(selectedBooking.date, "h:mm a")}</div>
                </div>
                <Separator />
                
                <div className="flex">
                  <div className="w-1/3 text-sm font-medium">Duration</div>
                  <div className="w-2/3 text-sm">60 minutes</div>
                </div>
              </div>
              
              {selectedBooking.message && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-2">Customer Message</h4>
                  <div className="bg-gray-50 p-3 rounded-md text-sm">
                    <p className="italic">{selectedBooking.message}</p>
                  </div>
                </div>
              )}
              
              {selectedBooking.status === "pending" && (
                <div className="space-y-4">
                  <Textarea 
                    placeholder="Add a response or special instructions..."
                    className="resize-none"
                    rows={3}
                  />
                  
                  <div className="flex space-x-2">
                    <Button variant="default" className="w-full bg-green-600 hover:bg-green-700">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Accept Booking
                    </Button>
                    <Button variant="outline" className="w-full text-red-600 hover:bg-red-50">
                      <XCircle className="h-4 w-4 mr-2" />
                      Decline
                    </Button>
                  </div>
                </div>
              )}
              
              {selectedBooking.status === "confirmed" && (
                <div className="space-y-4">
                  <Button variant="outline" className="w-full">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Message Customer
                  </Button>
                  <Button variant="secondary" className="w-full bg-red-100 text-red-700 hover:bg-red-200">
                    <XCircle className="h-4 w-4 mr-2" />
                    Cancel Booking
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Availability Settings Dialog */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Set Your Availability</DialogTitle>
            <DialogDescription>
              Configure your working hours for each day of the week
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
            {Object.entries(availability).map(([day, schedule]) => (
              <div key={day} className="flex items-center space-x-2">
                <Switch 
                  id={`${day}-available`}
                  checked={schedule.isAvailable}
                  onCheckedChange={(checked) => handleDayScheduleChange(day, 'isAvailable', checked)}
                />
                <Label htmlFor={`${day}-available`} className="w-24">{day}</Label>
                
                {schedule.isAvailable && (
                  <>
                    <Select 
                      value={schedule.startTime}
                      onValueChange={(value) => handleDayScheduleChange(day, 'startTime', value)}
                    >
                      <SelectTrigger className="w-24">
                        <SelectValue placeholder="Start" />
                      </SelectTrigger>
                      <SelectContent>
                        {TIME_SLOTS.map(time => (
                          <SelectItem key={`${day}-start-${time}`} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <span className="text-muted-foreground">to</span>
                    
                    <Select 
                      value={schedule.endTime}
                      onValueChange={(value) => handleDayScheduleChange(day, 'endTime', value)}
                    >
                      <SelectTrigger className="w-24">
                        <SelectValue placeholder="End" />
                      </SelectTrigger>
                      <SelectContent>
                        {TIME_SLOTS.map(time => (
                          <SelectItem key={`${day}-end-${time}`} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </>
                )}
              </div>
            ))}
            
            <div className="pt-4">
              <h4 className="text-sm font-medium mb-2">Booking Preferences</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch id="confirm-auto" />
                  <Label htmlFor="confirm-auto">Auto-confirm bookings</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="buffer-time" />
                  <Label htmlFor="buffer-time">Add 15-minute buffer between appointments</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="advance-notice" />
                  <Label htmlFor="advance-notice">Require 24-hour advance notice</Label>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSettingsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsSettingsOpen(false)}>
              Save Availability
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ArtistBookingCalendar;
