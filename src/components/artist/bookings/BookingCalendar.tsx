
import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Clock, DollarSign, MoreHorizontal, User, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { format, startOfWeek, endOfWeek, addDays, isToday, isSameDay, parseISO } from 'date-fns';
import { Booking, useArtistBookings, BookingViewType } from '@/hooks/useArtistBookings';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

const BookingCalendar: React.FC = () => {
  const {
    bookings,
    isLoading,
    viewType,
    setViewType,
    selectedDate,
    setSelectedDate,
    updateBookingStatus
  } = useArtistBookings();

  // Create date navigation handler
  const handleDateChange = (amount: number) => {
    const newDate = new Date(selectedDate);
    
    switch (viewType) {
      case 'day':
        newDate.setDate(newDate.getDate() + amount);
        break;
      case 'week':
        newDate.setDate(newDate.getDate() + (amount * 7));
        break;
      case 'month':
        newDate.setMonth(newDate.getMonth() + amount);
        break;
    }
    
    setSelectedDate(newDate);
  };

  // Get week days for weekly view
  const getWeekDays = () => {
    const startDate = startOfWeek(selectedDate, { weekStartsOn: 0 });
    const endDate = endOfWeek(selectedDate, { weekStartsOn: 0 });
    const days = [];
    let day = startDate;
    
    while (day <= endDate) {
      days.push(new Date(day));
      day = addDays(day, 1);
    }
    
    return days;
  };

  // Get bookings for a specific day
  const getBookingsForDay = (date: Date) => {
    return bookings.filter(booking => {
      // If booking doesn't have a date_requested, return false
      if (!booking.date_requested) return false;
      
      const bookingDate = parseISO(booking.date_requested);
      return isSameDay(bookingDate, date);
    });
  };

  // Generate formatted time display
  const formatTimeDisplay = (timeStr: string | null) => {
    if (!timeStr) return 'No time specified';
    
    // If time is already in a format like "2:30 PM", return as is
    if (timeStr.includes('AM') || timeStr.includes('PM')) {
      return timeStr;
    }
    
    // If time is in 24-hour format like "14:30", convert to 12-hour
    try {
      const [hours, minutes] = timeStr.split(':').map(Number);
      const period = hours >= 12 ? 'PM' : 'AM';
      const displayHours = hours % 12 || 12;
      
      return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
    } catch (error) {
      return timeStr;
    }
  };

  // Get color for booking status
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'declined':
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Handle booking status change
  const handleStatusChange = async (bookingId: string, newStatus: string) => {
    await updateBookingStatus(bookingId, newStatus);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-6"
    >
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="flex items-center text-xl font-serif">
                <Calendar className="h-5 w-5 mr-2 text-purple-500" />
                Booking Calendar
              </CardTitle>
              <CardDescription>
                Manage appointments and booking requests
              </CardDescription>
            </div>
            
            {/* Calendar view tabs */}
            <div className="flex items-center space-x-2">
              <Tabs value={viewType} onValueChange={value => setViewType(value as BookingViewType)}>
                <TabsList>
                  <TabsTrigger value="day">Day</TabsTrigger>
                  <TabsTrigger value="week">Week</TabsTrigger>
                  <TabsTrigger value="month">Month</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          {/* Date navigation */}
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => handleDateChange(-1)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <h3 className="text-lg font-medium">
              {viewType === 'day' && format(selectedDate, 'MMMM d, yyyy')}
              {viewType === 'week' && (
                `${format(startOfWeek(selectedDate, { weekStartsOn: 0 }), 'MMM d')} - 
                 ${format(endOfWeek(selectedDate, { weekStartsOn: 0 }), 'MMM d, yyyy')}`
              )}
              {viewType === 'month' && format(selectedDate, 'MMMM yyyy')}
            </h3>
            
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => handleDateChange(1)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-start gap-4">
                  <Skeleton className="h-14 w-14 rounded-md" />
                  <div className="flex-1">
                    <Skeleton className="h-5 w-40 mb-2" />
                    <Skeleton className="h-4 w-20 mb-2" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              {viewType === 'day' ? (
                <DayView 
                  selectedDate={selectedDate} 
                  bookings={getBookingsForDay(selectedDate)}
                  formatTimeDisplay={formatTimeDisplay}
                  getStatusColor={getStatusColor}
                  handleStatusChange={handleStatusChange}
                />
              ) : viewType === 'week' ? (
                <WeekView
                  weekDays={getWeekDays()}
                  getBookingsForDay={getBookingsForDay}
                  formatTimeDisplay={formatTimeDisplay}
                  getStatusColor={getStatusColor}
                  handleStatusChange={handleStatusChange}
                />
              ) : (
                <MonthView
                  selectedDate={selectedDate}
                  bookings={bookings}
                  setSelectedDate={setSelectedDate}
                  setViewType={setViewType}
                />
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Day View Component
interface DayViewProps {
  selectedDate: Date;
  bookings: Booking[];
  formatTimeDisplay: (timeStr: string | null) => string;
  getStatusColor: (status: string) => string;
  handleStatusChange: (bookingId: string, newStatus: string) => Promise<void>;
}

const DayView: React.FC<DayViewProps> = ({ 
  selectedDate, 
  bookings,
  formatTimeDisplay,
  getStatusColor,
  handleStatusChange
}) => {
  // Sort bookings by time
  const sortedBookings = [...bookings].sort((a, b) => {
    // If no time_requested, place at the end
    if (!a.time_requested) return 1;
    if (!b.time_requested) return -1;
    
    return a.time_requested.localeCompare(b.time_requested);
  });

  return (
    <div className="space-y-4">
      <div className="bg-purple-50 rounded-md p-3 text-center">
        <h3 className={cn(
          "text-lg font-medium",
          isToday(selectedDate) && "text-purple-600"
        )}>
          {format(selectedDate, 'EEEE, MMMM d')}
          {isToday(selectedDate) && " (Today)"}
        </h3>
      </div>
      
      {sortedBookings.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-md">
          <Clock className="h-10 w-10 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500">No bookings for this day</p>
        </div>
      ) : (
        <div className="space-y-3">
          {sortedBookings.map(booking => (
            <BookingCard
              key={booking.id}
              booking={booking}
              formatTimeDisplay={formatTimeDisplay}
              getStatusColor={getStatusColor}
              handleStatusChange={handleStatusChange}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Week View Component
interface WeekViewProps {
  weekDays: Date[];
  getBookingsForDay: (date: Date) => Booking[];
  formatTimeDisplay: (timeStr: string | null) => string;
  getStatusColor: (status: string) => string;
  handleStatusChange: (bookingId: string, newStatus: string) => Promise<void>;
}

const WeekView: React.FC<WeekViewProps> = ({ 
  weekDays,
  getBookingsForDay,
  formatTimeDisplay,
  getStatusColor,
  handleStatusChange
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
      {weekDays.map((day) => {
        const dayBookings = getBookingsForDay(day);
        const sortedBookings = [...dayBookings].sort((a, b) => {
          if (!a.time_requested) return 1;
          if (!b.time_requested) return -1;
          return a.time_requested.localeCompare(b.time_requested);
        });
        
        return (
          <div key={day.toString()} className="border rounded-md overflow-hidden">
            <div className={cn(
              "p-2 text-center font-medium",
              isToday(day) ? "bg-purple-100 text-purple-700" : "bg-gray-50"
            )}>
              <div className="text-sm">{format(day, 'EEE')}</div>
              <div className={cn(
                "text-lg",
                isToday(day) && "font-bold"
              )}>
                {format(day, 'd')}
              </div>
            </div>
            
            <div className="p-2 max-h-[15rem] overflow-y-auto">
              {sortedBookings.length === 0 ? (
                <div className="text-center py-3 text-xs text-gray-500">
                  No bookings
                </div>
              ) : (
                <div className="space-y-2">
                  {sortedBookings.map(booking => (
                    <div 
                      key={booking.id} 
                      className="p-2 rounded-md text-xs border"
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium truncate">
                          {booking.client_name}
                        </span>
                        <Badge 
                          variant="outline" 
                          className={cn("text-[10px] ml-1", getStatusColor(booking.status))}
                        >
                          {booking.status}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-1 text-gray-500">
                        <Clock className="h-3 w-3" />
                        <span>{formatTimeDisplay(booking.time_requested)}</span>
                      </div>
                      
                      {booking.service_title && (
                        <div className="mt-1 truncate">
                          {booking.service_title}
                        </div>
                      )}
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-6 w-6 p-0 mt-1"
                          >
                            <MoreHorizontal className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {booking.status === 'pending' && (
                            <>
                              <DropdownMenuItem onClick={() => handleStatusChange(booking.id, 'accepted')}>
                                Accept
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleStatusChange(booking.id, 'declined')}>
                                Decline
                              </DropdownMenuItem>
                            </>
                          )}
                          {booking.status === 'accepted' && (
                            <DropdownMenuItem onClick={() => handleStatusChange(booking.id, 'completed')}>
                              Mark Completed
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem onClick={() => console.log('View details')}>
                            View Details
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Month View Component
interface MonthViewProps {
  selectedDate: Date;
  bookings: Booking[];
  setSelectedDate: (date: Date) => void;
  setViewType: (viewType: BookingViewType) => void;
}

const MonthView: React.FC<MonthViewProps> = ({ 
  selectedDate, 
  bookings,
  setSelectedDate,
  setViewType
}) => {
  // Create a counter for bookings by date
  const bookingsByDate: Record<string, number> = {};
  
  bookings.forEach(booking => {
    if (booking.date_requested) {
      const dateStr = booking.date_requested;
      bookingsByDate[dateStr] = (bookingsByDate[dateStr] || 0) + 1;
    }
  });
  
  // Get month data (days in month, first day, etc)
  const daysInMonth = new Date(
    selectedDate.getFullYear(), 
    selectedDate.getMonth() + 1, 
    0
  ).getDate();
  
  const firstDayOfMonth = new Date(
    selectedDate.getFullYear(), 
    selectedDate.getMonth(), 
    1
  ).getDay();
  
  // Generate month grid (including padding days)
  const monthDays = [];
  
  // Add prev month padding
  for (let i = 0; i < firstDayOfMonth; i++) {
    monthDays.push(null);
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
    monthDays.push(date);
  }
  
  // Handle day click
  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setViewType('day');
  };
  
  return (
    <div className="grid grid-cols-7 gap-1">
      {/* Day headers */}
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((dayName) => (
        <div 
          key={dayName} 
          className="text-center font-medium text-xs text-gray-500 pb-1"
        >
          {dayName}
        </div>
      ))}
      
      {/* Calendar grid */}
      {monthDays.map((day, index) => {
        if (day === null) {
          return <div key={`empty-${index}`} className="p-2 text-center" />;
        }
        
        const dateStr = format(day, 'yyyy-MM-dd');
        const bookingCount = bookingsByDate[dateStr] || 0;
        const isCurrentDay = isToday(day);
        
        return (
          <div 
            key={dateStr}
            className={cn(
              "p-2 rounded-md border border-transparent hover:border-purple-200 cursor-pointer transition-colors",
              isCurrentDay && "bg-purple-50 border-purple-200"
            )}
            onClick={() => handleDayClick(day)}
          >
            <div className="text-center">
              <span className={cn(
                "inline-flex items-center justify-center w-7 h-7 rounded-full",
                isCurrentDay && "bg-purple-500 text-white"
              )}>
                {format(day, 'd')}
              </span>
            </div>
            
            {bookingCount > 0 && (
              <div className="mt-1 text-center">
                <Badge
                  variant="secondary"
                  className="text-xs"
                >
                  {bookingCount} {bookingCount === 1 ? 'booking' : 'bookings'}
                </Badge>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

// Booking Card Component
interface BookingCardProps {
  booking: Booking;
  formatTimeDisplay: (timeStr: string | null) => string;
  getStatusColor: (status: string) => string;
  handleStatusChange: (bookingId: string, newStatus: string) => Promise<void>;
}

const BookingCard: React.FC<BookingCardProps> = ({ 
  booking,
  formatTimeDisplay,
  getStatusColor,
  handleStatusChange
}) => {
  return (
    <Card key={booking.id} className="overflow-hidden border border-gray-200">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium flex items-center">
                <User className="h-4 w-4 mr-1.5 text-gray-400" />
                {booking.client_name || 'Unknown Client'}
              </h4>
              <Badge 
                variant="outline" 
                className={getStatusColor(booking.status)}
              >
                {booking.status}
              </Badge>
            </div>
            
            <div className="flex items-center text-sm text-gray-500 mb-1">
              <Clock className="h-4 w-4 mr-1.5" />
              {formatTimeDisplay(booking.time_requested)}
            </div>
            
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge variant="outline" className="bg-gray-50">
                {booking.service_title || 'No service selected'}
              </Badge>
              
              {booking.service_price && (
                <Badge variant="outline" className="bg-gray-50 flex items-center">
                  <DollarSign className="h-3 w-3 mr-1" />
                  {booking.service_price}
                </Badge>
              )}
            </div>
            
            {booking.note && (
              <div className="mt-3 text-sm text-gray-500 bg-gray-50 p-2 rounded border">
                {booking.note}
              </div>
            )}
          </div>
        </div>
        
        {booking.status === 'pending' && (
          <div className="flex gap-2 mt-3 pt-3 border-t">
            <Button
              size="sm"
              variant="default"
              className="flex-1"
              onClick={() => handleStatusChange(booking.id, 'accepted')}
            >
              Accept
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="flex-1"
              onClick={() => handleStatusChange(booking.id, 'declined')}
            >
              Decline
            </Button>
          </div>
        )}
        
        {booking.status === 'accepted' && (
          <div className="flex justify-end mt-3 pt-3 border-t">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleStatusChange(booking.id, 'completed')}
            >
              Mark as Completed
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BookingCalendar;
