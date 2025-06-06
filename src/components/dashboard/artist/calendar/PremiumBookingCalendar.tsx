
import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  User,
  Plus,
  Filter,
  Eye,
  Star,
  TrendingUp
} from "lucide-react";
import { format, startOfWeek, endOfWeek, eachDayOfInterval, addWeeks, subWeeks, isSameDay, parseISO } from "date-fns";
import { useArtistBookings } from "@/hooks/useArtistBookings";

interface BookingWithTime {
  id: string;
  client_name?: string;
  service_name?: string;
  date_requested?: string;
  time_requested?: string;
  appointment_time?: string;
  status: string;
  note?: string;
  sender_id?: string;
  recipient_id?: string;
  created_at?: string;
}

const PremiumBookingCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"week" | "month">("week");
  const { bookings, loading } = useArtistBookings();

  // Convert bookings to include required properties with safe fallbacks
  const bookingsWithTime: BookingWithTime[] = useMemo(() => {
    return (bookings || []).map(booking => ({
      ...booking,
      sender_id: booking.sender_id ?? "",
      recipient_id: booking.recipient_id ?? "",
      created_at: booking.created_at ?? new Date().toISOString(),
      appointment_time: booking.appointment_time ?? booking.time_requested,
      service_name: (booking as any).service_name ?? "Service"
    }));
  }, [bookings]);

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

  const goToPreviousWeek = () => setCurrentDate(subWeeks(currentDate, 1));
  const goToNextWeek = () => setCurrentDate(addWeeks(currentDate, 1));
  const goToToday = () => setCurrentDate(new Date());

  const getBookingsForDay = (date: Date) => {
    return bookingsWithTime.filter(booking => {
      if (!booking.date_requested) return false;
      try {
        const bookingDate = parseISO(booking.date_requested);
        return isSameDay(bookingDate, date);
      } catch {
        return false;
      }
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-amber-100 text-amber-800 border-amber-200";
      case "accepted": return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "completed": return "bg-blue-100 text-blue-800 border-blue-200";
      case "declined": return "bg-red-100 text-red-800 border-red-200";
      case "cancelled": return "bg-gray-100 text-gray-800 border-gray-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const weekStats = useMemo(() => {
    const weekBookings = bookingsWithTime.filter(booking => {
      if (!booking.date_requested) return false;
      try {
        const bookingDate = parseISO(booking.date_requested);
        return bookingDate >= weekStart && bookingDate <= weekEnd;
      } catch {
        return false;
      }
    });

    return {
      total: weekBookings.length,
      pending: weekBookings.filter(b => b.status === "pending").length,
      accepted: weekBookings.filter(b => b.status === "accepted").length,
      completed: weekBookings.filter(b => b.status === "completed").length,
    };
  }, [bookingsWithTime, weekStart, weekEnd]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="h-32 bg-gray-200 rounded-xl"></div>
          <div className="h-96 bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Premium Calendar Header */}
      <Card className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white border-0">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold mb-2">Premium Calendar</h1>
              <p className="text-indigo-100">
                {format(weekStart, "MMMM d")} - {format(weekEnd, "MMMM d, yyyy")}
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">{weekStats.total}</div>
                  <div className="text-xs text-indigo-200">Total</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{weekStats.pending}</div>
                  <div className="text-xs text-indigo-200">Pending</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{weekStats.accepted}</div>
                  <div className="text-xs text-indigo-200">Accepted</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{weekStats.completed}</div>
                  <div className="text-xs text-indigo-200">Completed</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calendar Navigation */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Weekly View
            </CardTitle>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={goToPreviousWeek}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <Button variant="outline" size="sm" onClick={goToToday}>
                Today
              </Button>
              
              <Button variant="outline" size="sm" onClick={goToNextWeek}>
                <ChevronRight className="h-4 w-4" />
              </Button>
              
              <Button size="sm" className="bg-gradient-to-r from-indigo-500 to-purple-500">
                <Plus className="h-4 w-4 mr-2" />
                Add Booking
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-7 gap-4">
            {weekDays.map((day, index) => {
              const dayBookings = getBookingsForDay(day);
              const isToday = isSameDay(day, new Date());
              
              return (
                <motion.div
                  key={day.toISOString()}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`min-h-[200px] p-4 rounded-lg border-2 ${
                    isToday 
                      ? "bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200" 
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <div className="mb-3">
                    <div className={`text-sm font-medium ${isToday ? "text-indigo-600" : "text-gray-600"}`}>
                      {format(day, "EEE")}
                    </div>
                    <div className={`text-lg font-bold ${isToday ? "text-indigo-900" : "text-gray-900"}`}>
                      {format(day, "d")}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {dayBookings.map((booking) => (
                      <motion.div
                        key={booking.id}
                        whileHover={{ scale: 1.05 }}
                        className={`p-2 rounded-md border text-xs ${getStatusColor(booking.status)}`}
                      >
                        <div className="font-medium truncate mb-1">
                          {booking.client_name || "Client"}
                        </div>
                        <div className="flex items-center gap-1 mb-1">
                          <Clock className="h-3 w-3" />
                          <span>{booking.appointment_time || booking.time_requested || "No time"}</span>
                        </div>
                        <div className="truncate opacity-75">
                          {booking.service_name || "Service"}
                        </div>
                      </motion.div>
                    ))}
                    
                    {dayBookings.length === 0 && (
                      <div className="text-xs text-gray-400 text-center py-4">
                        No bookings
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-indigo-200">
          <CardContent className="p-6 text-center">
            <Eye className="h-8 w-8 text-indigo-500 mx-auto mb-3" />
            <h3 className="font-semibold text-indigo-900 mb-2">Week Overview</h3>
            <p className="text-sm text-indigo-600">View detailed week statistics</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-50 to-green-100 border-emerald-200">
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-8 w-8 text-emerald-500 mx-auto mb-3" />
            <h3 className="font-semibold text-emerald-900 mb-2">Growth Analytics</h3>
            <p className="text-sm text-emerald-600">Track booking trends</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-violet-100 border-purple-200">
          <CardContent className="p-6 text-center">
            <Star className="h-8 w-8 text-purple-500 mx-auto mb-3" />
            <h3 className="font-semibold text-purple-900 mb-2">Premium Features</h3>
            <p className="text-sm text-purple-600">Unlock advanced tools</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PremiumBookingCalendar;
