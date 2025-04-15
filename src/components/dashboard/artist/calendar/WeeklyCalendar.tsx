
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, getDay } from 'date-fns';
import { CalendarDays, ChevronLeft, ChevronRight, Clock, Plus, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Types for our calendar data
interface Booking {
  id: string;
  title: string;
  customerName: string;
  start: Date;
  end: Date;
  status: 'confirmed' | 'pending' | 'cancelled';
}

const WeeklyCalendar = () => {
  const { toast } = useToast();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [weekStart, setWeekStart] = useState(startOfWeek(currentDate, { weekStartsOn: 1 })); // Start on Monday
  const [weekDays, setWeekDays] = useState<Date[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Generate the days for the week view
  useEffect(() => {
    const start = startOfWeek(currentDate, { weekStartsOn: 1 });
    setWeekStart(start);
    
    const days = eachDayOfInterval({
      start,
      end: endOfWeek(start, { weekStartsOn: 1 })
    });
    
    setWeekDays(days);
  }, [currentDate]);

  // Mock function to fetch bookings
  useEffect(() => {
    setIsLoading(true);
    
    // Simulating API call with timeout
    setTimeout(() => {
      // Mock data for demonstration
      const mockBookings: Booking[] = [
        {
          id: '1',
          title: 'Gel Manicure',
          customerName: 'Michelle Lee',
          start: addDays(weekStart, 0), // Monday
          end: addDays(weekStart, 0),
          status: 'confirmed'
        },
        {
          id: '2',
          title: 'Full Set Acrylic',
          customerName: 'Sarah Johnson',
          start: addDays(weekStart, 2), // Wednesday
          end: addDays(weekStart, 2),
          status: 'confirmed'
        },
        {
          id: '3',
          title: 'Pedicure',
          customerName: 'Emma Thompson',
          start: addDays(weekStart, 2), // Wednesday
          end: addDays(weekStart, 2),
          status: 'pending'
        },
        {
          id: '4',
          title: 'Nail Art',
          customerName: 'Jasmine Wu',
          start: addDays(weekStart, 4), // Friday
          end: addDays(weekStart, 4),
          status: 'confirmed'
        },
        {
          id: '5',
          title: 'Dip Powder',
          customerName: 'Olivia Martinez',
          start: addDays(weekStart, 5), // Saturday
          end: addDays(weekStart, 5),
          status: 'confirmed'
        },
        {
          id: '6',
          title: 'Manicure & Pedicure',
          customerName: 'Kate Brown',
          start: addDays(weekStart, 5), // Saturday
          end: addDays(weekStart, 5),
          status: 'pending'
        }
      ];
      
      setBookings(mockBookings);
      setIsLoading(false);
    }, 1000);
  }, [weekStart]);

  // Navigate to previous week
  const goToPreviousWeek = () => {
    setCurrentDate(addDays(currentDate, -7));
  };

  // Navigate to next week
  const goToNextWeek = () => {
    setCurrentDate(addDays(currentDate, 7));
  };

  // Navigate to today
  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Get bookings for a specific day
  const getBookingsForDay = (day: Date) => {
    return bookings.filter(booking => isSameDay(booking.start, day));
  };

  // Get the time slots for a day (9 AM to 7 PM)
  const timeSlots = Array.from({ length: 11 }, (_, i) => i + 9); // 9 AM to 7 PM

  return (
    <Card className="shadow-sm border-indigo-100">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <CardTitle className="text-xl font-serif flex items-center">
              <CalendarDays className="h-5 w-5 mr-2 text-indigo-500" />
              Booking Calendar
            </CardTitle>
            <CardDescription>
              Manage your appointments
            </CardDescription>
          </div>
          <div className="flex gap-2 mt-2 sm:mt-0">
            <Button variant="outline" size="sm" onClick={goToPreviousWeek}>
              <ChevronLeft className="h-4 w-4 mr-1" /> Previous
            </Button>
            <Button variant="outline" size="sm" onClick={goToToday}>
              Today
            </Button>
            <Button variant="outline" size="sm" onClick={goToNextWeek}>
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Button 
            onClick={() => toast({
              title: "Feature Coming Soon",
              description: "Booking management will be available in the next update."
            })}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Appointment
          </Button>
        </div>
        
        {/* Week days header */}
        <div className="grid grid-cols-7 gap-1 mb-1">
          {weekDays.map((day, i) => {
            const isToday = isSameDay(day, new Date());
            return (
              <div 
                key={i} 
                className={`text-center p-2 ${
                  isToday ? 'bg-indigo-50 rounded-md font-medium text-indigo-800' : ''
                }`}
              >
                <div className="text-sm">{format(day, 'EEE')}</div>
                <div className={`text-base ${isToday ? 'font-medium' : ''}`}>
                  {format(day, 'dd')}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Calendar grid with events */}
        <div className="rounded-md border overflow-hidden bg-white">
          <div className="grid grid-cols-7 divide-x divide-gray-200 bg-gray-50">
            {weekDays.map((day, dayIndex) => {
              const dayBookings = getBookingsForDay(day);
              const isToday = isSameDay(day, new Date());
              
              return (
                <div 
                  key={dayIndex} 
                  className={`min-h-[200px] ${isToday ? 'bg-indigo-50/40' : ''}`}
                >
                  {isLoading ? (
                    <div className="p-3 space-y-2">
                      <div className="h-14 rounded bg-gray-100 animate-pulse"></div>
                      <div className="h-14 rounded bg-gray-100 animate-pulse"></div>
                    </div>
                  ) : dayBookings.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-center p-4">
                      <p className="text-sm text-gray-400">No appointments</p>
                    </div>
                  ) : (
                    <div className="p-2">
                      {dayBookings.map(booking => (
                        <div 
                          key={booking.id}
                          className={`
                            mb-2 p-2 rounded-md text-xs border
                            ${booking.status === 'confirmed' 
                              ? 'bg-green-50 border-green-200' 
                              : 'bg-amber-50 border-amber-200'}
                          `}
                        >
                          <div className="font-medium break-words whitespace-normal max-w-full">
                            {booking.title}
                          </div>
                          <div className="flex items-start text-gray-500 mt-1">
                            <Users className="h-3 w-3 mr-1 flex-shrink-0 mt-0.5" />
                            <span className="break-words whitespace-normal inline-block max-w-[calc(100%-20px)]">
                              {booking.customerName}
                            </span>
                          </div>
                          <div className="flex items-center text-gray-500 mt-0.5">
                            <Clock className="h-3 w-3 mr-1 flex-shrink-0" />
                            <span className="break-words whitespace-normal">
                              {format(booking.start, 'h:mm a')}
                            </span>
                          </div>
                          <div className={`
                            text-[10px] px-1.5 py-0.5 rounded-full inline-block mt-1
                            ${booking.status === 'confirmed' 
                              ? 'bg-green-200 text-green-800' 
                              : 'bg-amber-200 text-amber-800'}
                          `}>
                            {booking.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklyCalendar;
