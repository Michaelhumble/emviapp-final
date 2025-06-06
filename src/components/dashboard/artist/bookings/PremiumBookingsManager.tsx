
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Calendar, 
  Clock, 
  User, 
  Search, 
  Filter,
  CheckCircle,
  XCircle,
  AlertCircle,
  Star,
  TrendingUp,
  DollarSign
} from "lucide-react";
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

const PremiumBookingsManager = () => {
  const { bookings, loading, updateBookingStatus } = useArtistBookings();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Convert bookings to include required properties with safe fallbacks
  const bookingsWithTime: BookingWithTime[] = useMemo(() => {
    return (bookings || []).map(booking => ({
      ...booking,
      sender_id: booking.sender_id ?? "",
      recipient_id: booking.recipient_id ?? "",
      created_at: booking.created_at ?? new Date().toISOString(),
      appointment_time: booking.appointment_time ?? booking.time_requested,
      service_name: booking.service_name ?? "Service"
    }));
  }, [bookings]);

  const filteredBookings = useMemo(() => {
    return bookingsWithTime.filter(booking => {
      const matchesSearch = !searchTerm || 
        (booking.client_name?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
        (booking.service_name?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
      
      const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [bookingsWithTime, searchTerm, statusFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-amber-100 text-amber-800";
      case "accepted": return "bg-emerald-100 text-emerald-800";
      case "completed": return "bg-blue-100 text-blue-800";
      case "declined": return "bg-red-100 text-red-800";
      case "cancelled": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <AlertCircle className="h-4 w-4" />;
      case "accepted": return <CheckCircle className="h-4 w-4" />;
      case "completed": return <Star className="h-4 w-4" />;
      case "declined": return <XCircle className="h-4 w-4" />;
      case "cancelled": return <XCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const bookingStats = useMemo(() => {
    const total = bookingsWithTime.length;
    const pending = bookingsWithTime.filter(b => b.status === "pending").length;
    const accepted = bookingsWithTime.filter(b => b.status === "accepted").length;
    const completed = bookingsWithTime.filter(b => b.status === "completed").length;
    
    return { total, pending, accepted, completed };
  }, [bookingsWithTime]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="h-32 bg-gray-200 rounded-xl"></div>
          <div className="h-64 bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Premium Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-indigo-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-indigo-600">Total Bookings</p>
                <p className="text-3xl font-bold text-indigo-900">{bookingStats.total}</p>
              </div>
              <Calendar className="h-8 w-8 text-indigo-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-yellow-100 border-amber-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-amber-600">Pending</p>
                <p className="text-3xl font-bold text-amber-900">{bookingStats.pending}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-50 to-green-100 border-emerald-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-emerald-600">Accepted</p>
                <p className="text-3xl font-bold text-emerald-900">{bookingStats.accepted}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-emerald-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-violet-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Completed</p>
                <p className="text-3xl font-bold text-purple-900">{bookingStats.completed}</p>
              </div>
              <Star className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Booking Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search bookings by client or service..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="completed">Completed</option>
              <option value="declined">Declined</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Bookings List */}
          <div className="space-y-4">
            <AnimatePresence>
              {filteredBookings.map((booking) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <User className="h-5 w-5 text-gray-400" />
                        <h3 className="font-semibold text-gray-900">
                          {booking.client_name || "Client"}
                        </h3>
                        <Badge className={`${getStatusColor(booking.status)} flex items-center gap-1`}>
                          {getStatusIcon(booking.status)}
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{booking.date_requested ? new Date(booking.date_requested).toLocaleDateString() : "No date"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{booking.appointment_time || booking.time_requested || "No time"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4" />
                          <span>{booking.service_name || "Service"}</span>
                        </div>
                      </div>

                      {booking.note && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-md">
                          <p className="text-sm text-gray-700">{booking.note}</p>
                        </div>
                      )}
                    </div>

                    {booking.status === "pending" && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateBookingStatus?.(booking.id, "accepted")}
                          className="text-emerald-600 border-emerald-200 hover:bg-emerald-50"
                        >
                          Accept
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateBookingStatus?.(booking.id, "declined")}
                          className="text-red-600 border-red-200 hover:bg-red-50"
                        >
                          Decline
                        </Button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredBookings.length === 0 && (
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
                <p className="text-gray-500">
                  {searchTerm || statusFilter !== "all" 
                    ? "Try adjusting your search or filters" 
                    : "Your booking requests will appear here"}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PremiumBookingsManager;
