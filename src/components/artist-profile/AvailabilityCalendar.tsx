
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clock, Calendar as CalendarIcon, CheckCircle2 } from 'lucide-react';
import { addDays, format, startOfWeek, addWeeks, subWeeks } from 'date-fns';

// This would come from the API in a real app
const availabilityData = [
  { day: 'Monday', slots: ['9:00 AM', '10:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'] },
  { day: 'Tuesday', slots: ['11:00 AM', '1:00 PM', '2:00 PM'] },
  { day: 'Wednesday', slots: ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM'] },
  { day: 'Thursday', slots: ['2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'] },
  { day: 'Friday', slots: ['10:00 AM', '11:00 AM', '3:00 PM', '4:00 PM'] },
  { day: 'Saturday', slots: ['10:00 AM', '11:00 AM'] },
  { day: 'Sunday', slots: [] },
];

const AvailabilityCalendar = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [view, setView] = useState<'day' | 'week'>('week');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  // Calculate week view dates
  const weekStart = startOfWeek(date, { weekStartsOn: 1 }); // Monday as first day
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const getDayName = (day: Date) => {
    return format(day, 'EEEE');
  };

  const getDayAvailability = (dayName: string) => {
    const dayData = availabilityData.find(d => d.day === dayName);
    return dayData ? dayData.slots : [];
  };

  const handleNextWeek = () => {
    setDate(addWeeks(date, 1));
  };

  const handlePrevWeek = () => {
    setDate(subWeeks(date, 1));
  };

  const handleSlotSelect = (slot: string) => {
    setSelectedTimeSlot(slot);
  };

  return (
    <Card className="border-gray-100 shadow-sm overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center">
          <CalendarIcon className="mr-2 h-5 w-5 text-purple-500" />
          Availability Calendar
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={handlePrevWeek}>Previous</Button>
            <Button variant="outline" size="sm" onClick={handleNextWeek}>Next</Button>
          </div>
          
          <Select value={view} onValueChange={(value: 'day' | 'week') => setView(value)}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="View" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Day View</SelectItem>
              <SelectItem value="week">Week View</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {view === 'week' ? (
          <div className="grid grid-cols-7 gap-2">
            {weekDays.map((day, index) => {
              const dayName = getDayName(day);
              const daySlots = getDayAvailability(dayName);
              const isAvailable = daySlots.length > 0;
              
              return (
                <div key={index} className="text-center">
                  <div className={`mb-2 py-2 rounded-md ${isAvailable ? 'bg-green-50' : 'bg-gray-50'}`}>
                    <p className="font-medium">{format(day, 'EEE')}</p>
                    <p className="text-sm text-gray-500">{format(day, 'd MMM')}</p>
                  </div>
                  
                  {isAvailable ? (
                    <Badge variant="outline" className="bg-green-50 text-green-700 w-full flex justify-center py-1">
                      <CheckCircle2 className="h-3 w-3 mr-1" /> Available
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-gray-50 text-gray-500 w-full flex justify-center py-1">
                      Unavailable
                    </Badge>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h3 className="font-medium">{format(date, 'EEEE, MMMM d, yyyy')}</h3>
            </div>
            
            <div className="space-y-2">
              {getDayAvailability(format(date, 'EEEE')).length > 0 ? (
                getDayAvailability(format(date, 'EEEE')).map((slot, index) => (
                  <motion.div 
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div 
                      className={`flex items-center p-3 rounded-md cursor-pointer border 
                        ${selectedTimeSlot === slot ? 'bg-purple-50 border-purple-200' : 'bg-gray-50 border-gray-100'}`}
                      onClick={() => handleSlotSelect(slot)}
                    >
                      <Clock className="h-4 w-4 mr-2 text-purple-500" />
                      <span>{slot}</span>
                      
                      {selectedTimeSlot === slot && (
                        <Button size="sm" className="ml-auto bg-purple-600 hover:bg-purple-700">
                          Book This Time
                        </Button>
                      )}
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-6 bg-gray-50 rounded-md">
                  <p className="text-gray-500">No availability on this day</p>
                  <Button variant="outline" className="mt-2" onClick={() => setDate(new Date())}>
                    Check Another Day
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
        
        {view === 'week' && (
          <div className="mt-4 pt-4 border-t">
            <Button className="w-full bg-purple-600 hover:bg-purple-700">Request Appointment</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AvailabilityCalendar;
