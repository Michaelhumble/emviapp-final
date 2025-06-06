import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, Phone, Mail, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { useArtistBookings } from '@/hooks/artist/useArtistBookings';
import { Booking } from '@/types/booking';

const PremiumBookingsManager = () => {
  const { bookings, loading, handleAccept, handleDecline } = useArtistBookings();
  const [filter, setFilter] = useState<'all' | 'pending' | 'accepted' | 'completed'>('all');

  const filteredBookings = bookings.filter(booking => {
    if (filter === 'all') return true;
    return booking.status === filter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'declined': return 'bg-red-100 text-red-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Booking Management</h2>
        <div className="flex gap-2">
          {['all', 'pending', 'accepted', 'completed'].map((status) => (
            <Button
              key={status}
              variant={filter === status ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(status as any)}
              className="capitalize"
            >
              {status}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        {filteredBookings.map((booking) => (
          <motion.div
            key={booking.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border rounded-lg p-4 bg-white shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">{booking.client_name || 'Client'}</span>
                  <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{booking.date_requested || 'No date'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{booking.time_requested || booking.appointment_time || 'No time'}</span>
                  </div>
                </div>

                <div className="text-sm">
                  <span className="font-medium">Service:</span> {booking.service_name || booking.service_type || 'Not specified'}
                </div>

                {booking.note && (
                  <div className="flex items-start gap-1">
                    <MessageSquare className="h-4 w-4 text-gray-500 mt-0.5" />
                    <span className="text-sm text-gray-600">{booking.note}</span>
                  </div>
                )}
              </div>

              {booking.status === 'pending' && (
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleAccept(booking.id)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Accept
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDecline(booking.id)}
                    className="text-red-600 border-red-200 hover:bg-red-50"
                  >
                    Decline
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {filteredBookings.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
            <p className="text-gray-500">
              {filter === 'all' 
                ? "You don't have any bookings yet." 
                : `No ${filter} bookings at the moment.`}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PremiumBookingsManager;
