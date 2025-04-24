
import React, { useMemo, useState } from "react";
import { format, isToday, isTomorrow, isThisWeek, isThisMonth, compareDesc } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarDays, Clock, Search, User } from "lucide-react";
import { motion } from "framer-motion";
import { Booking } from "@/types/booking";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface ListViewProps {
  bookings: Booking[];
  isLoading?: boolean;
  onBookingClick?: (booking: Booking) => void;
}

const statusStyles: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 border-none",
  accepted: "bg-emerald-100 text-emerald-800 border-none",
  confirmed: "bg-blue-100 text-blue-800 border-none",
  completed: "bg-purple-100 text-purple-800 border-none",
  cancelled: "bg-gray-100 text-gray-700 border-none",
  declined: "bg-red-100 text-red-800 border-none",
};

const ListViewCalendar: React.FC<ListViewProps> = ({ 
  bookings,
  isLoading = false,
  onBookingClick
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [timeFilter, setTimeFilter] = useState<string>("all");
  
  const filteredBookings = useMemo(() => {
    if (!bookings) return [];
    
    return bookings.filter((booking) => {
      // Search filter
      const searchMatch = !searchTerm || 
        booking.client_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.service_name?.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Status filter
      const statusMatch = statusFilter === "all" || booking.status === statusFilter;
      
      // Time filter (today, tomorrow, this week, this month)
      let timeMatch = true;
      if (booking.date_requested && timeFilter !== "all") {
        const bookingDate = new Date(booking.date_requested);
        
        switch (timeFilter) {
          case "today":
            timeMatch = isToday(bookingDate);
            break;
          case "tomorrow":
            timeMatch = isTomorrow(bookingDate);
            break;
          case "thisWeek":
            timeMatch = isThisWeek(bookingDate);
            break;
          case "thisMonth":
            timeMatch = isThisMonth(bookingDate);
            break;
        }
      }
      
      return searchMatch && statusMatch && timeMatch;
    });
  }, [bookings, searchTerm, statusFilter, timeFilter]);
  
  // Sort bookings by date (newest first)
  const sortedBookings = useMemo(() => {
    return [...filteredBookings].sort((a, b) => {
      if (!a.date_requested && !b.date_requested) return 0;
      if (!a.date_requested) return 1;
      if (!b.date_requested) return -1;
      
      // Sort by date (newest first)
      return compareDesc(new Date(a.date_requested), new Date(b.date_requested));
    });
  }, [filteredBookings]);
  
  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="w-full md:w-auto flex-1">
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
            <Input
              placeholder="Search client or service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-gray-200"
            />
          </div>
        </div>
        
        <div className="w-full md:w-[180px]">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="border-gray-200">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
              <SelectItem value="declined">Declined</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full md:w-[180px]">
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="border-gray-200">
              <SelectValue placeholder="Time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="tomorrow">Tomorrow</SelectItem>
              <SelectItem value="thisWeek">This Week</SelectItem>
              <SelectItem value="thisMonth">This Month</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Booking list */}
      {sortedBookings.length === 0 ? (
        <div className="text-center py-12">
          <CalendarDays className="mx-auto h-12 w-12 text-gray-300" />
          <h3 className="mt-4 text-lg font-medium text-gray-700">No bookings found</h3>
          <p className="mt-1 text-gray-500">Try adjusting your filters or create a new booking</p>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedBookings.map((booking) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="border border-gray-100 rounded-lg bg-white p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onBookingClick && onBookingClick(booking)}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-100 to-pink-100 flex items-center justify-center text-lg font-medium text-purple-700">
                    {booking.client_name?.charAt(0).toUpperCase() || "C"}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{booking.client_name || "Client"}</h4>
                    <p className="text-sm text-gray-600 mt-0.5">{booking.service_name || "Service"}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-3 md:gap-6">
                  {booking.date_requested && (
                    <div className="flex items-center text-sm text-gray-600">
                      <CalendarDays className="h-4 w-4 mr-1.5 text-gray-500" />
                      <span>{format(new Date(booking.date_requested), "MMM d, yyyy")}</span>
                    </div>
                  )}
                  
                  {booking.time_requested && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-1.5 text-gray-500" />
                      <span>{booking.time_requested}</span>
                    </div>
                  )}
                  
                  <Badge className={cn(
                    "rounded-full px-3", 
                    statusStyles[booking.status] || "bg-gray-100"
                  )}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </Badge>
                </div>
              </div>
              
              {booking.note && (
                <div className="mt-3 text-sm text-gray-500 border-t border-gray-100 pt-2">
                  {booking.note}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListViewCalendar;
