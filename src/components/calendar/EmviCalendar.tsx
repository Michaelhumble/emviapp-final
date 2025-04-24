
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { ChevronLeft, ChevronRight, Calendar, Plus, List, Grid3X3 } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EmviBookingModal from "./EmviBookingModal";
import WeekView from "./WeekView";
import MonthView from "./MonthView";
import ListView from "./ListView";
import CalendarLoadingState from "./CalendarLoadingState";
import { Booking } from "@/types/booking";

interface EmviCalendarProps {
  role: "artist" | "salon" | "customer";
  bookings: Booking[];
  onAddBooking?: (booking: any) => void;
  onUpdateBooking?: (booking: any) => void;
  onDeleteBooking?: (id: string) => void;
  onDateChange?: (startDate: Date, endDate: Date) => void;
  isLoading?: boolean;
  error?: string | null;
}

const EmviCalendar = ({
  role,
  bookings = [],
  onAddBooking,
  onUpdateBooking,
  onDeleteBooking,
  onDateChange,
  isLoading = false,
  error = null
}: EmviCalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedView, setSelectedView] = useState<"week" | "month" | "list">("week");
  const [showModal, setShowModal] = useState(false);
  const [loadingTimeout, setLoadingTimeout] = useState(false);
  const [internalLoadingState, setInternalLoadingState] = useState(true);

  // Reset internal loading state after component load
  useEffect(() => {
    const timer = setTimeout(() => {
      setInternalLoadingState(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Set loading timeout to prevent infinite loading
  useEffect(() => {
    if (isLoading) {
      const timeoutId = setTimeout(() => {
        setLoadingTimeout(true);
      }, 10000); // 10 second timeout

      return () => clearTimeout(timeoutId);
    } else {
      setLoadingTimeout(false);
    }
  }, [isLoading]);

  const handlePrevious = () => {
    const newDate = new Date(currentDate);
    if (selectedView === "week") {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setMonth(newDate.getMonth() - 1);
    }
    setCurrentDate(newDate);
    
    // Notify parent if date range changed
    if (onDateChange) {
      const endDate = new Date(newDate);
      if (selectedView === "week") {
        endDate.setDate(endDate.getDate() + 6);
      } else {
        endDate.setMonth(endDate.getMonth() + 1);
        endDate.setDate(0); // Last day of month
      }
      onDateChange(newDate, endDate);
    }
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    if (selectedView === "week") {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
    
    // Notify parent if date range changed
    if (onDateChange) {
      const endDate = new Date(newDate);
      if (selectedView === "week") {
        endDate.setDate(endDate.getDate() + 6);
      } else {
        endDate.setMonth(endDate.getMonth() + 1);
        endDate.setDate(0); // Last day of month
      }
      onDateChange(newDate, endDate);
    }
  };

  const handleToday = () => {
    setCurrentDate(new Date());
    
    // Notify parent if date range changed
    if (onDateChange) {
      const today = new Date();
      const endDate = new Date(today);
      if (selectedView === "week") {
        endDate.setDate(endDate.getDate() + 6);
      } else {
        endDate.setMonth(endDate.getMonth() + 1);
        endDate.setDate(0); // Last day of month
      }
      onDateChange(today, endDate);
    }
  };

  const handleBookingSubmit = (bookingData: any) => {
    if (onAddBooking) {
      onAddBooking(bookingData);
    }
    setShowModal(false);
  };

  // Show loading state
  if (isLoading && !loadingTimeout) {
    return <CalendarLoadingState />;
  }
  
  // Show error state
  if (error || loadingTimeout) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 text-center">
        <div className="text-red-500 mb-4">
          {error || "Loading took too long. Please try refreshing the page."}
        </div>
        <Button onClick={() => window.location.reload()}>Refresh</Button>
      </div>
    );
  }

  return (
    <Card className="shadow-sm border-primary/5">
      <CardHeader className="bg-white px-6 pt-6 pb-4 flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 border-b border-gray-100">
        <div className="flex items-center space-x-4">
          <Calendar className="h-6 w-6 text-primary" />
          <div>
            <h2 className="text-xl font-bold text-gray-900">{format(currentDate, "MMMM yyyy")}</h2>
            <p className="text-sm text-gray-500">
              {role === "artist" ? "Artist Calendar" : "Salon Calendar"}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="bg-gray-100 rounded-lg p-1 flex">
            <Button 
              variant="ghost" 
              size="icon"
              className="h-8 w-8"
              onClick={handlePrevious}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs h-8"
              onClick={handleToday}
            >
              Today
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className="h-8 w-8"
              onClick={handleNext}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          <Tabs
            defaultValue={selectedView}
            value={selectedView}
            onValueChange={(value) => setSelectedView(value as "week" | "month" | "list")}
            className="hidden sm:block"
          >
            <TabsList className="bg-gray-100">
              <TabsTrigger value="week" className="text-xs">Week</TabsTrigger>
              <TabsTrigger value="month" className="text-xs">Month</TabsTrigger>
              <TabsTrigger value="list" className="text-xs">List</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Button 
            onClick={() => setShowModal(true)}
            className="ml-2 bg-primary text-white hover:bg-primary/90"
            size="sm"
          >
            <Plus className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Add Booking</span>
            <span className="sm:hidden">Add</span>
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        {internalLoadingState ? (
          <div className="p-6">
            <CalendarLoadingState message="Preparing calendar view..." />
          </div>
        ) : (
          <>
            {selectedView === "week" && (
              <WeekView
                currentDate={currentDate}
                bookings={bookings}
                onUpdateBooking={onUpdateBooking}
                onDeleteBooking={onDeleteBooking}
              />
            )}
            
            {selectedView === "month" && (
              <MonthView
                currentDate={currentDate}
                bookings={bookings}
                onUpdateBooking={onUpdateBooking}
                onDeleteBooking={onDeleteBooking}
              />
            )}
            
            {selectedView === "list" && (
              <ListView
                currentDate={currentDate}
                bookings={bookings}
                onUpdateBooking={onUpdateBooking}
                onDeleteBooking={onDeleteBooking}
              />
            )}
          </>
        )}
      </CardContent>
      
      <EmviBookingModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleBookingSubmit}
        role={role}
      />
    </Card>
  );
};

export default EmviCalendar;
