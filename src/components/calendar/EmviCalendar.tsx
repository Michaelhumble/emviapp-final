
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, List, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { format, startOfWeek, addDays, subWeeks, addWeeks } from "date-fns";
import { toast } from "sonner";
import WeekView from "./views/WeekView";
import MonthView from "./views/MonthView";
import ListViewCalendar from "./views/ListView";
import { useCalendar } from "./hooks/useCalendar";
import EmviBookingModal from "./EmviBookingModal";
import { Booking } from "@/types/booking";
import { cn } from "@/lib/utils";

export type CalendarRole = "artist" | "salon" | "customer";

export interface EmviCalendarProps {
  role: CalendarRole;
  bookings?: Booking[];
  className?: string;
  onAddBooking?: (booking: any) => void;
  onUpdateBooking?: (booking: any) => void;
  onDeleteBooking?: (id: string) => void;
  onDateChange?: (startDate: Date, endDate: Date) => void;
  isLoading?: boolean;
}

const EmviCalendar: React.FC<EmviCalendarProps> = ({
  role,
  bookings = [],
  className,
  onAddBooking,
  onUpdateBooking,
  onDeleteBooking,
  onDateChange,
  isLoading = false,
}) => {
  const [calendarView, setCalendarView] = useState<"week" | "month" | "list">("week");
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Partial<Booking> | null>(null);
  
  const { 
    currentDate,
    weekDays,
    goToPreviousWeek,
    goToNextWeek,
    goToToday,
  } = useCalendar({
    onDateChange,
  });

  const handleAddBooking = () => {
    setSelectedBooking(null);
    setShowBookingModal(true);
  };

  const handleEditBooking = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowBookingModal(true);
  };

  const handleSaveBooking = (bookingData: any) => {
    if (selectedBooking?.id) {
      onUpdateBooking?.({...bookingData, id: selectedBooking.id});
      toast.success("Appointment updated successfully");
    } else {
      onAddBooking?.(bookingData);
      toast.success("New appointment created");
    }
    setShowBookingModal(false);
  };

  const handleCopyBookingLink = () => {
    navigator.clipboard.writeText(`https://emvi.app/book/${role === 'artist' ? 'artist' : 'salon'}/your-username`);
    toast.success('Booking link copied to clipboard!');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn("w-full", className)}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-serif text-gray-800">Booking Calendar</h1>
          <p className="text-gray-600 mt-1 font-light">Manage your appointments and availability</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button 
            onClick={handleAddBooking}
            className="bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-md hover:shadow-lg transition-shadow"
          >
            <Plus className="mr-1.5 h-4 w-4" /> New Appointment
          </Button>
          
          <Button
            variant="outline"
            onClick={handleCopyBookingLink}
            className="border-purple-200 hover:border-purple-300"
          >
            Copy Booking Link
          </Button>
        </div>
      </div>

      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-md rounded-xl overflow-hidden">
        <div className="p-4 md:p-6 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-pink-50">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <Tabs 
              value={calendarView} 
              onValueChange={(v) => setCalendarView(v as "week" | "month" | "list")}
              className="w-full max-w-[400px]"
            >
              <TabsList className="bg-white/50 backdrop-blur-sm">
                <TabsTrigger value="week" className="flex items-center">
                  <CalendarDays className="h-3.5 w-3.5 mr-1.5" />
                  Weekly
                </TabsTrigger>
                <TabsTrigger value="month" className="flex items-center">
                  <CalendarDays className="h-3.5 w-3.5 mr-1.5" />
                  Monthly
                </TabsTrigger>
                <TabsTrigger value="list" className="flex items-center">
                  <List className="h-3.5 w-3.5 mr-1.5" />
                  List
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={goToPreviousWeek}
                className="h-8 w-8 p-0 rounded-full"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={goToToday}
                className="h-8"
              >
                Today
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={goToNextWeek}
                className="h-8 w-8 p-0 rounded-full"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              
              <p className="text-sm font-medium text-gray-600 ml-2 hidden md:block">
                {format(weekDays[0], "MMMM d")} - {format(weekDays[6], "MMMM d, yyyy")}
              </p>
            </div>
          </div>
        </div>
        
        <CardContent className="p-0">
          <TabsContent value="week" className="m-0 focus:outline-none">
            <div className="p-6">
              <WeekView 
                weekDays={weekDays}
                bookings={bookings}
                isLoading={isLoading}
                onBookingClick={handleEditBooking}
                onTimeSlotClick={(day, hour) => {
                  setSelectedBooking({
                    date_requested: format(day, 'yyyy-MM-dd'),
                    time_requested: `${hour % 12 || 12}:00 ${hour >= 12 ? 'PM' : 'AM'}`,
                    status: 'pending'
                  });
                  setShowBookingModal(true);
                }}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="month" className="m-0 focus:outline-none">
            <MonthView 
              currentDate={currentDate}
              bookings={bookings}
              isLoading={isLoading}
              onBookingClick={handleEditBooking}
              onDateClick={(date) => {
                setSelectedBooking({
                  date_requested: format(date, 'yyyy-MM-dd'),
                  status: 'pending'
                });
                setShowBookingModal(true);
              }}
            />
          </TabsContent>
          
          <TabsContent value="list" className="m-0 focus:outline-none">
            <div className="p-6">
              <ListViewCalendar 
                bookings={bookings}
                isLoading={isLoading}
                onBookingClick={handleEditBooking}
              />
            </div>
          </TabsContent>
        </CardContent>
      </Card>
      
      <EmviBookingModal 
        open={showBookingModal} 
        onClose={() => setShowBookingModal(false)}
        onSave={handleSaveBooking}
        booking={selectedBooking}
        role={role}
      />
    </motion.div>
  );
};

export default EmviCalendar;
