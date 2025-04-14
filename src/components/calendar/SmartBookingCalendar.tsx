
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarClock, ChevronLeft, ChevronRight, Settings } from "lucide-react";
import { useCalendarData } from '@/hooks/useCalendarData';
import { addDays, format, startOfWeek, subDays } from 'date-fns';
import CalendarWeekView from './CalendarWeekView';
import CalendarDayView from './CalendarDayView';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import CalendarSettings from './CalendarSettings';

interface SmartBookingCalendarProps {
  userRole: string | undefined;
  userId: string;
}

export const SmartBookingCalendar: React.FC<SmartBookingCalendarProps> = ({ userRole, userId }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarView, setCalendarView] = useState<'day' | 'week'>('week');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  // Check if screen is mobile
  const isMobile = useMediaQuery('(max-width: 640px)');
  
  // Automatically switch to day view on mobile
  useEffect(() => {
    if (isMobile) {
      setCalendarView('day');
    } else {
      setCalendarView('week');
    }
  }, [isMobile]);
  
  // Calculate the current week
  const weekStartDate = startOfWeek(currentDate, { weekStartsOn: 1 }); // Start week on Monday
  const weekDates = Array.from({ length: 7 }, (_, i) => addDays(weekStartDate, i));
  
  // Get calendar data from custom hook
  const { 
    bookings, 
    availability, 
    isLoading, 
    error, 
    refreshData,
    createAvailability,
    updateAvailability,
    deleteAvailability 
  } = useCalendarData(userId, userRole || 'artist');
  
  // Navigation functions
  const goToPreviousWeek = () => {
    setCurrentDate(prevDate => subDays(prevDate, 7));
  };
  
  const goToNextWeek = () => {
    setCurrentDate(prevDate => addDays(prevDate, 7));
  };
  
  const goToToday = () => {
    setCurrentDate(new Date());
  };
  
  // Go to previous/next day in day view
  const goToPreviousDay = () => {
    setCurrentDate(prevDate => subDays(prevDate, 1));
  };
  
  const goToNextDay = () => {
    setCurrentDate(prevDate => addDays(prevDate, 1));
  };
  
  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center p-6">
            <h3 className="text-lg font-medium text-red-500 mb-2">Error Loading Calendar</h3>
            <p className="text-gray-500 mb-4">{error}</p>
            <Button onClick={refreshData}>Try Again</Button>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="border-blue-100 shadow-md">
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <CalendarClock className="h-5 w-5 text-blue-500" />
            <CardTitle className="text-xl">
              {calendarView === 'week' 
                ? `Week of ${format(weekStartDate, 'MMM d, yyyy')}`
                : format(currentDate, 'EEEE, MMMM d, yyyy')
              }
            </CardTitle>
          </div>
          
          <div className="flex gap-2">
            {calendarView === 'week' ? (
              <>
                <Button variant="outline" size="sm" onClick={goToPreviousWeek}>
                  <ChevronLeft className="h-4 w-4 mr-1" /> Previous
                </Button>
                <Button variant="outline" size="sm" onClick={goToToday}>Today</Button>
                <Button variant="outline" size="sm" onClick={goToNextWeek}>
                  Next <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" onClick={goToPreviousDay}>
                  <ChevronLeft className="h-4 w-4 mr-1" /> Prev
                </Button>
                <Button variant="outline" size="sm" onClick={goToToday}>Today</Button>
                <Button variant="outline" size="sm" onClick={goToNextDay}>
                  Next <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="mb-4 flex justify-between items-center">
          <Tabs value={calendarView} onValueChange={(value) => setCalendarView(value as 'day' | 'week')}>
            <TabsList>
              <TabsTrigger value="day">Day View</TabsTrigger>
              <TabsTrigger value="week" disabled={isMobile}>Week View</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Button variant="outline" size="sm" onClick={() => setIsSettingsOpen(true)}>
            <Settings className="h-4 w-4 mr-1" /> Settings
          </Button>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            {calendarView === 'week' ? (
              <CalendarWeekView 
                weekDates={weekDates}
                bookings={bookings}
                availability={availability}
                onCreateAvailability={createAvailability}
                onUpdateAvailability={updateAvailability}
                onDeleteAvailability={deleteAvailability}
                userRole={userRole || 'artist'}
              />
            ) : (
              <CalendarDayView 
                currentDate={currentDate}
                bookings={bookings}
                availability={availability}
                onCreateAvailability={createAvailability}
                onUpdateAvailability={updateAvailability}
                onDeleteAvailability={deleteAvailability}
                userRole={userRole || 'artist'}
              />
            )}
          </>
        )}
      </CardContent>
      
      <CalendarSettings 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
    </Card>
  );
};
