
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, ChevronLeft, ChevronRight, Plus, Clock, User, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { useArtistUpcomingBookings } from "@/hooks/useArtistUpcomingBookings";
import { Booking } from "@/types/booking";

interface BookingWithTime extends Booking {
  appointment_time?: string;
  appointment_date?: string;
}

const statusColors = {
  pending: "bg-amber-100 text-amber-800 border-amber-200",
  accepted: "bg-emerald-100 text-emerald-800 border-emerald-200",
  declined: "bg-red-100 text-red-800 border-red-200",
  completed: "bg-blue-100 text-blue-800 border-blue-200",
  cancelled: "bg-gray-100 text-gray-800 border-gray-200"
};

const PremiumBookingCalendar = () => {
  const { bookings, loading } = useArtistUpcomingBookings();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getBookingsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return bookings.filter(booking => {
      const bookingDate = booking.appointment_date || booking.date_requested;
      if (!bookingDate) return false;
      return new Date(bookingDate).toISOString().split('T')[0] === dateString;
    });
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const CalendarDay = ({ date, bookings: dayBookings }: { date: Date | null, bookings: BookingWithTime[] }) => {
    if (!date) {
      return <div className="h-24 border border-gray-100"></div>;
    }

    const isToday = date.toDateString() === new Date().toDateString();
    const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
    const hasBookings = dayBookings.length > 0;

    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        onClick={() => setSelectedDate(date)}
        className={`h-24 border border-gray-100 cursor-pointer transition-all duration-200 ${
          isSelected ? 'bg-purple-100 border-purple-300' : 
          isToday ? 'bg-blue-50 border-blue-200' : 
          hasBookings ? 'bg-emerald-50 border-emerald-200' : 'hover:bg-gray-50'
        }`}
      >
        <div className="p-2 h-full flex flex-col">
          <div className={`text-sm font-medium ${
            isToday ? 'text-blue-600' : 
            isSelected ? 'text-purple-600' : 
            'text-gray-900'
          }`}>
            {date.getDate()}
          </div>
          
          {dayBookings.length > 0 && (
            <div className="flex-1 mt-1 space-y-1">
              {dayBookings.slice(0, 2).map((booking, index) => (
                <div
                  key={booking.id}
                  className={`text-xs px-2 py-1 rounded ${statusColors[booking.status as keyof typeof statusColors] || statusColors.pending} truncate`}
                >
                  {booking.client_name || 'Client'}
                </div>
              ))}
              {dayBookings.length > 2 && (
                <div className="text-xs text-gray-500 font-medium">
                  +{dayBookings.length - 2} more
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  const BookingsList = ({ date }: { date: Date }) => {
    const dayBookings = getBookingsForDate(date);
    
    return (
      <Card className="border-0 bg-gradient-to-br from-white/90 to-purple-50/50 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-playfair text-gray-900">
            {formatDate(date)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {dayBookings.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-600">No appointments for this day</p>
              <Button className="mt-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add Appointment
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {dayBookings.map((booking) => (
                <motion.div
                  key={booking.id}
                  whileHover={{ x: 2 }}
                  className="p-4 bg-white rounded-lg border border-gray-100 shadow-sm"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {booking.client_name?.charAt(0) || 'C'}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{booking.client_name || 'Client'}</h4>
                        <p className="text-sm text-gray-600">{booking.service_name || 'Service'}</p>
                      </div>
                    </div>
                    <Badge className={statusColors[booking.status as keyof typeof statusColors] || statusColors.pending}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{booking.appointment_time || booking.time_requested || '--:--'}</span>
                    </div>
                  </div>
                  
                  {booking.note && (
                    <div className="mt-2 p-2 bg-gray-50 rounded text-sm text-gray-700">
                      {booking.note}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  if (loading) {
    return (
      <Card className="border-0 bg-gradient-to-br from-white/90 to-purple-50/50 backdrop-blur-sm">
        <CardContent className="p-8 text-center">
          <div className="animate-spin h-8 w-8 border-4 border-purple-400 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading calendar...</p>
        </CardContent>
      </Card>
    );
  }

  const days = getDaysInMonth(currentDate);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <Card className="border-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-playfair">
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </CardTitle>
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateMonth('prev')}
                className="text-white hover:bg-white/20"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateMonth('next')}
                className="text-white hover:bg-white/20"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Grid */}
        <div className="lg:col-span-2">
          <Card className="border-0 bg-gradient-to-br from-white/90 to-purple-50/50 backdrop-blur-sm">
            <CardContent className="p-0">
              {/* Week Days Header */}
              <div className="grid grid-cols-7 border-b border-gray-200">
                {weekDays.map(day => (
                  <div key={day} className="p-3 text-center font-medium text-gray-600 bg-gray-50">
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Calendar Days */}
              <div className="grid grid-cols-7">
                {days.map((date, index) => (
                  <CalendarDay
                    key={index}
                    date={date}
                    bookings={date ? getBookingsForDate(date) : []}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Selected Date Details */}
        <div className="lg:col-span-1">
          {selectedDate ? (
            <BookingsList date={selectedDate} />
          ) : (
            <Card className="border-0 bg-gradient-to-br from-white/90 to-purple-50/50 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Date</h3>
                <p className="text-gray-600">Click on a calendar date to view appointments</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default PremiumBookingCalendar;
