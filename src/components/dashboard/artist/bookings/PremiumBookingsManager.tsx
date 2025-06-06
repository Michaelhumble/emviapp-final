
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, MapPin, Phone, Mail, DollarSign, Star, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useArtistUpcomingBookings } from "@/hooks/useArtistUpcomingBookings";
import { Booking } from "@/types/booking";

interface BookingWithTime extends Booking {
  appointment_time?: string;
  price?: number;
}

const statusConfig = {
  pending: { icon: AlertCircle, color: "bg-amber-500", label: "Pending" },
  accepted: { icon: CheckCircle, color: "bg-emerald-500", label: "Confirmed" },
  declined: { icon: XCircle, color: "bg-red-500", label: "Declined" },
  completed: { icon: CheckCircle, color: "bg-blue-500", label: "Completed" },
  cancelled: { icon: XCircle, color: "bg-gray-500", label: "Cancelled" }
};

const PremiumBookingsManager = () => {
  const { bookings, loading } = useArtistUpcomingBookings();
  const [selectedBooking, setSelectedBooking] = useState<BookingWithTime | null>(null);

  const getStatusBadge = (status: string) => {
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    const Icon = config.icon;
    
    return (
      <Badge className={`${config.color} text-white border-0 px-3 py-1 font-medium`}>
        <Icon className="h-3 w-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timeString?: string) => {
    if (!timeString) return '--:--';
    return timeString;
  };

  const BookingCard = ({ booking }: { booking: BookingWithTime }) => (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="cursor-pointer"
      onClick={() => setSelectedBooking(booking)}
    >
      <Card className="border-0 bg-gradient-to-br from-white/90 to-purple-50/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {booking.client_name?.charAt(0) || 'C'}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 font-playfair">
                  {booking.client_name || 'Client'}
                </h3>
                <p className="text-sm text-gray-600">{booking.service_name || 'Service'}</p>
              </div>
            </div>
            {getStatusBadge(booking.status)}
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="h-4 w-4 mr-2 text-purple-500" />
              <span>{formatDate(booking.date_requested || booking.created_at)}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="h-4 w-4 mr-2 text-purple-500" />
              <span>{formatTime(booking.appointment_time || booking.time_requested)}</span>
            </div>
            {booking.note && (
              <div className="mt-3 p-2 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-700">{booking.note}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  if (loading) {
    return (
      <Card className="border-0 bg-gradient-to-br from-white/90 to-purple-50/50 backdrop-blur-sm">
        <CardContent className="p-8 text-center">
          <div className="animate-spin h-8 w-8 border-4 border-purple-400 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading bookings...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 bg-gradient-to-br from-emerald-400 to-emerald-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-sm">Confirmed</p>
                <p className="text-2xl font-bold">{bookings.filter(b => b.status === 'accepted').length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-emerald-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 bg-gradient-to-br from-amber-400 to-amber-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-100 text-sm">Pending</p>
                <p className="text-2xl font-bold">{bookings.filter(b => b.status === 'pending').length}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-amber-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 bg-gradient-to-br from-blue-400 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Completed</p>
                <p className="text-2xl font-bold">{bookings.filter(b => b.status === 'completed').length}</p>
              </div>
              <Star className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 bg-gradient-to-br from-purple-400 to-purple-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Total</p>
                <p className="text-2xl font-bold">{bookings.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bookings List */}
      <Card className="border-0 bg-gradient-to-br from-white/90 to-purple-50/50 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-playfair text-gray-900 flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-purple-600" />
            Recent Bookings
          </CardTitle>
        </CardHeader>
        <CardContent>
          {bookings.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings yet</h3>
              <p className="text-gray-600">Start promoting your services to attract clients!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {bookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PremiumBookingsManager;
