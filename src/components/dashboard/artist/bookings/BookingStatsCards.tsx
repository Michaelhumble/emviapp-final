import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock, Users, DollarSign } from 'lucide-react';
import { useArtistBookings } from '../hooks/useArtistBookings';
import { isThisWeek, isThisMonth } from 'date-fns';

const BookingStatsCards = () => {
  const { bookings, loading } = useArtistBookings();

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="text-center">
            <CardContent className="p-4">
              <div className="h-8 w-8 mx-auto mb-2 bg-gray-200 rounded animate-pulse" />
              <div className="h-6 w-8 mx-auto mb-1 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-16 mx-auto bg-gray-200 rounded animate-pulse" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const thisWeekBookings = bookings.filter(booking => {
    if (!booking.date_requested) return false;
    const bookingDate = new Date(booking.date_requested);
    return isThisWeek(bookingDate, { weekStartsOn: 1 });
  }).length;

  const thisMonthBookings = bookings.filter(booking => {
    if (!booking.date_requested) return false;
    const bookingDate = new Date(booking.date_requested);
    return isThisMonth(bookingDate);
  }).length;

  const uniqueClients = new Set(bookings.map(b => b.sender_id)).size;

  const completedBookings = bookings.filter(b => b.status === 'completed');
  // For now, show total bookings as revenue metric until payment integration
  const totalRevenue = completedBookings.length * 75; // Average service price

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card className="text-center">
        <CardContent className="p-4">
          <Calendar className="h-8 w-8 mx-auto mb-2 text-blue-500" />
          <div className="text-2xl font-bold">{thisWeekBookings}</div>
          <div className="text-sm text-muted-foreground">This Week</div>
        </CardContent>
      </Card>
      <Card className="text-center">
        <CardContent className="p-4">
          <Clock className="h-8 w-8 mx-auto mb-2 text-green-500" />
          <div className="text-2xl font-bold">{thisMonthBookings}</div>
          <div className="text-sm text-muted-foreground">This Month</div>
        </CardContent>
      </Card>
      <Card className="text-center">
        <CardContent className="p-4">
          <Users className="h-8 w-8 mx-auto mb-2 text-purple-500" />
          <div className="text-2xl font-bold">{uniqueClients}</div>
          <div className="text-sm text-muted-foreground">Total Clients</div>
        </CardContent>
      </Card>
      <Card className="text-center">
        <CardContent className="p-4">
          <DollarSign className="h-8 w-8 mx-auto mb-2 text-emerald-500" />
          <div className="text-2xl font-bold">${totalRevenue}</div>
          <div className="text-sm text-muted-foreground">Revenue</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingStatsCards;