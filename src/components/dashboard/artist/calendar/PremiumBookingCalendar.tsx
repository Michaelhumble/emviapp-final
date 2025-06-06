
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, DollarSign, TrendingUp, Users, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useArtistUpcomingBookings } from "@/hooks/useArtistUpcomingBookings";
import { Badge } from "@/components/ui/badge";

const PremiumBookingCalendar = () => {
  const { bookings, loading } = useArtistUpcomingBookings();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Mock premium data for demonstration
  const premiumStats = {
    todayEarnings: 450,
    weeklyGrowth: 23,
    bookingRate: 89,
    averageService: 85
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const current = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    
    return days;
  };

  const days = getDaysInMonth(currentDate);
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  const getBookingsForDate = (date: Date) => {
    return bookings.filter(booking => {
      const bookingDate = new Date(booking.appointment_date || booking.date_requested);
      return bookingDate.toDateString() === date.toDateString();
    });
  };

  const getEarningsForDate = (date: Date) => {
    const dayBookings = getBookingsForDate(date);
    return dayBookings.length * 75; // Mock calculation
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

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Premium Stats Header */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div 
          className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-4 rounded-2xl text-white"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between">
            <DollarSign className="h-8 w-8" />
            <div className="text-right">
              <div className="text-2xl font-bold">${premiumStats.todayEarnings}</div>
              <div className="text-sm opacity-90">Today's Revenue</div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-2xl text-white"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between">
            <TrendingUp className="h-8 w-8" />
            <div className="text-right">
              <div className="text-2xl font-bold">+{premiumStats.weeklyGrowth}%</div>
              <div className="text-sm opacity-90">Weekly Growth</div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-2xl text-white"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between">
            <Users className="h-8 w-8" />
            <div className="text-right">
              <div className="text-2xl font-bold">{premiumStats.bookingRate}%</div>
              <div className="text-sm opacity-90">Booking Rate</div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="bg-gradient-to-br from-amber-500 to-amber-600 p-4 rounded-2xl text-white"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between">
            <Star className="h-8 w-8" />
            <div className="text-right">
              <div className="text-2xl font-bold">${premiumStats.averageService}</div>
              <div className="text-sm opacity-90">Avg Service</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Premium Calendar */}
      <Card className="bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 border-0 shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-xl">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <Calendar className="h-6 w-6" />
              Premium Booking Calendar
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigateMonth('prev')}
                className="text-white hover:bg-white/20"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-lg font-semibold min-w-[140px] text-center">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </span>
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
        <CardContent className="p-6">
          {/* Calendar Header */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center font-semibold text-gray-600 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-2">
            {days.map((day, index) => {
              const dayBookings = getBookingsForDate(day);
              const dayEarnings = getEarningsForDate(day);
              const isCurrentMonth = day.getMonth() === currentDate.getMonth();
              const isToday = day.toDateString() === new Date().toDateString();
              const isSelected = selectedDate?.toDateString() === day.toDateString();

              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedDate(day)}
                  className={`
                    relative p-2 rounded-xl cursor-pointer min-h-[80px] transition-all
                    ${isCurrentMonth ? 'bg-white' : 'bg-gray-50'}
                    ${isToday ? 'ring-2 ring-purple-500 bg-purple-50' : ''}
                    ${isSelected ? 'ring-2 ring-pink-500 bg-pink-50' : ''}
                    ${dayBookings.length > 0 ? 'shadow-md' : 'hover:shadow-md'}
                  `}
                >
                  <div className={`text-sm font-medium ${isCurrentMonth ? 'text-gray-900' : 'text-gray-400'}`}>
                    {day.getDate()}
                  </div>
                  
                  {dayBookings.length > 0 && (
                    <div className="mt-1 space-y-1">
                      <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-700">
                        {dayBookings.length} booking{dayBookings.length > 1 ? 's' : ''}
                      </Badge>
                      {dayEarnings > 0 && (
                        <div className="text-xs font-bold text-emerald-600">
                          ${dayEarnings}
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Selected Date Details */}
      <AnimatePresence>
        {selectedDate && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-purple-600" />
                  {selectedDate.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {getBookingsForDate(selectedDate).length > 0 ? (
                  <div className="space-y-3">
                    {getBookingsForDate(selectedDate).map((booking, index) => (
                      <motion.div
                        key={booking.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white p-4 rounded-xl shadow-sm border border-purple-100"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-semibold text-gray-900">
                              {booking.client_name || 'Client'}
                            </div>
                            <div className="text-sm text-gray-600">
                              {booking.service_type || 'Service'}
                            </div>
                            <div className="text-sm text-purple-600">
                              {booking.appointment_time || booking.time_requested || 'Time TBD'}
                            </div>
                          </div>
                          <Badge 
                            variant={booking.status === 'confirmed' ? 'default' : 'secondary'}
                            className="bg-emerald-100 text-emerald-700"
                          >
                            ${Math.floor(Math.random() * 100) + 50}
                          </Badge>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>No bookings scheduled for this date</p>
                    <Button className="mt-4 bg-purple-600 hover:bg-purple-700">
                      Add Booking
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PremiumBookingCalendar;
